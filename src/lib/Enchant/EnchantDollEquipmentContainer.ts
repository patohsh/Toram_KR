import { lastElement } from './utils';
import {
    EnchantCategory,
    EnchantEquipment,
    EnchantStat,
    EnchantStep,
    EnchantStepStat,
    EnchantStepTypes,
} from './index';
import { EnchantDollCategory } from './EnchantDollCategory';

interface MostUsePotentialStatItemUnused {
    type: 'unused';
    stat: EnchantStat;
    value: number;
    existedAndNoRate: boolean;
}
interface MostUsePotentialStatItemStep {
    type: 'step';
    stat: EnchantStepStat;
    value: number;
    existedAndNoRate: boolean;
}
type MostUsePotentialStatItem = MostUsePotentialStatItemUnused | MostUsePotentialStatItemStep;

interface EnchantDollEquipmentContainerParams {
    itemCategorys: EnchantCategory[];
    equipment: EnchantEquipment;
    positiveStats: EnchantStat[];
    negativeStats: EnchantStat[];
}

export default class EnchantDollEquipmentContainer {
    itemCategorys: EnchantCategory[];
    equipment: EnchantEquipment;
    positiveStats: EnchantStat[];
    negativeStats: EnchantStat[];
    virtualStats: EnchantStat[];
    flags: {
        error: null | string;
        hasHandleFirstStep: boolean;
    };
    clones: EnchantDollEquipmentContainer[];
    copyFrom: null | EnchantDollEquipmentContainer;

    constructor({
        itemCategorys,
        equipment,
        positiveStats,
        negativeStats,
    }: EnchantDollEquipmentContainerParams) {
        this.itemCategorys = itemCategorys;
        this.equipment = equipment.clone(itemCategorys);
        this.positiveStats = positiveStats.map(stat => stat.clone());
        this.negativeStats = negativeStats.map(stat => stat.clone());
        this.virtualStats = [];
        this.flags = { error: null, hasHandleFirstStep: false };
        this.clones = [];
        this.copyFrom = null;
    }

    get cloneId(): string {
        if (!this.copyFrom) return '@';
        return this.copyFrom.cloneId + '-' + this.copyFrom.clones.indexOf(this).toString();
    }

    findPositiveStat(stat: EnchantStat) {
        return this.positiveStats.find(_stat => _stat.equals(stat));
    }

    beforeFillNegative(): EnchantDollEquipmentContainer[] {
        if (this.equipment.stats().length === 0) {
            const newDollEq = this.clone();
            const res1 = this.handleBeforeFillNegative({ positivesFilter: 'positive' });
            const res2 = newDollEq.handleBeforeFillNegative({ positivesFilter: 'both' });
            return [...res1, newDollEq, ...res2];
        }
        return this.handleBeforeFillNegative({ positivesFilter: 'positive' });
    }

    handleBeforeFillNegative({
        positivesFilter = 'positive',
    }: { positivesFilter?: 'positive' | 'both' } = {}) {
        const positives = EnchantDollCategory.classifyStats(this.positiveStats);
        const negatives = EnchantDollCategory.classifyStats(this.negativeStats);

        positives.forEach(category => category.sortStats('max-cost', { equipment: this.equipment }));
        negatives.forEach(category => category.sortStats('max-effect'));

        const eq = this.equipment;
        const resultEqs: EnchantDollEquipmentContainer[] = [];

        negatives.sort((item1, item2) => item1.stats.length - item2.stats.length);

        const rateBetweenBoth = positives.find(category =>
            negatives.some(ncategory => ncategory.category === category.category)
        );
        if (positivesFilter === 'both' && !rateBetweenBoth) return [];

        const positivesHasRate =
            positivesFilter === 'positive'
                ? positives.filter(category => category.stats.length > 1)
                : positives.filter(
                    category =>
                        category.stats.length > 1 ||
                        negatives.some(ncategory => ncategory.category === category.category)
                );

        if (positivesHasRate.length === 0) return [];

        const allPositivesHasRate = positivesHasRate.length === positives.length || rateBetweenBoth;

        this.refreshCategorys(positives);
        this.refreshCategorys(negatives);

        positivesHasRate.sort((item1, item2) => {
            const av = item1.stats.length;
            const bv = item2.stats.length;
            if (av === bv) {
                const _av = item1.stats.reduce((cur, stat) => cur + stat.itemBase.getPotential(stat.type, this.equipment), 0);
                const _bv = item2.stats.reduce((cur, stat) => cur + stat.itemBase.getPotential(stat.type, this.equipment), 0);
                return _bv - _av;
            }
            return av - bv;
        });

        if (eq.steps().length === 0 && allPositivesHasRate) {
            const currentCategory = positivesHasRate[0];
            const pstat = currentCategory.stats[0];
            const newStep = eq.appendStep();
            newStep.appendStat(pstat.itemBase, pstat.type, 1);
            pstat.value -= 1;

            {
                let newDollEq: EnchantDollEquipmentContainer = this;
                const newDollEqs = [];
                while (true) {
                    newDollEq = newDollEq.clone();

                    // ★ [수정됨] 안전 장치 추가: firstStep이 없으면 루프 탈출 ★
                    const cstep = newDollEq.equipment.firstStep;
                    if (!cstep) break;

                    const cstat = cstep.firstStat;
                    if (!cstat) break;

                    cstat.value += 1;

                    const newDollEqPstat = newDollEq.positiveStats.find(_pstat => _pstat.equals(cstat));
                    if (!newDollEqPstat) break;

                    newDollEqPstat.value -= 1;

                    if (cstep.remainingPotential <= 0 || newDollEqPstat.value === 0) break;

                    newDollEq.flags.hasHandleFirstStep = true;
                    newDollEqs.push(newDollEq);
                }
                newDollEqs.forEach(dollEq => resultEqs.push(dollEq, ...dollEq.beforeFillNegative()));
            }

            this.checkMakeUpPotential();

            if (positivesFilter === 'both' && currentCategory.stats.length > 1) {
                const newDollEq = this.clone();
                const fakeStat = lastElement(currentCategory.stats).clone();
                newDollEq.virtualStats.push(fakeStat);
                resultEqs.push(newDollEq, ...newDollEq.beforeFillNegative());
            }

            const special = positivesHasRate.find(
                (category, idx) =>
                    idx !== 0 && category.stats.length > 2 && category.stats[1].originalPotential === 3
            );

            if (special) {
                const newDollEq = this.clone();
                const originalPositiveStats = this.positiveStats.map(stat => stat.clone());
                special.stats.slice(0, 2).forEach(_pstat => {
                    const step = eq.appendStep();
                    step.appendStat(_pstat.itemBase, _pstat.type, 1);
                    _pstat.value -= 1;
                    this.checkMakeUpPotential();
                });
                if (eq.lastStep!.potentialExtraRate > 120) {
                    while (eq.allSteps.length !== 1) lastElement(eq.allSteps).remove();
                    this.positiveStats = originalPositiveStats;
                } else {
                    resultEqs.push(newDollEq, ...newDollEq.beforeFillNegative());
                }
            }
        }

        let appendFlag = false;
        positivesHasRate.forEach(category => {
            category.stats.forEach(pstat => {
                if (!this.checkFillNegativeStats() && !appendFlag) {
                    appendFlag = true;
                    resultEqs.push(this.clone());
                }
                if (eq.hasStat(pstat) || this.virtualStats.some(_stat => _stat.equals(pstat))) return;

                const step = eq.appendStep();
                step.appendStat(pstat.itemBase, pstat.type, 1);
                pstat.value -= 1;
                const currentExtraRate = step.potentialExtraRate;

                if (pstat.originalPotential === 3 && currentExtraRate === 120 && step.remainingPotential > 0) {
                    const newDollEq = this.clone();
                    newDollEq.checkMakeUpPotential();
                    resultEqs.push(newDollEq, ...newDollEq.beforeFillNegative());
                    const newStep = eq.appendStep();
                    newStep.type = EnchantStepTypes.Each;
                    const value = Math.min(pstat.value, pstat.potentialConvertThreshold - 1);
                    newStep.appendStat(pstat.itemBase, pstat.type, value);
                    pstat.value -= value;
                }
                this.checkMakeUpPotential();
            });
        });
        return resultEqs;
    }

    clearVirtualStats() { this.virtualStats = []; }

    checkFillNegativeStats(): boolean {
        const cstats = this.equipment.stats();
        const numNegs = cstats.filter(stat => this.negativeStats.some(nstat => nstat.equals(stat))).length;
        return cstats.length + this.negativeStats.length - numNegs < 7;
    }

    checkMakeUpPotential() {
        const eq = this.equipment;
        const steps = this.equipment.steps();
        if (steps.length === 0) return;
        const step = lastElement(steps);
        const negatives = EnchantDollCategory.classifyStats(this.negativeStats);
        this.refreshCategorys(negatives);

        const restore = () => {
            const cstat = step.firstStat;
            if (!cstat) return;
            const pstat = this.positiveStats.find(stat => stat.equals(cstat));
            if (pstat) pstat.value += cstat.value;
            step.remove();
        };

        if (step.remainingPotential <= 0) {
            const errorFlag = (() => {
                if (negatives.length === 0) {
                    restore();
                    return 'base-potential-not-enough';
                }
                const bstep = eq.insertStepBefore(step);
                const originalNegativeStats = this.negativeStats.map(stat => stat.clone());
                const restoreNegative = () => {
                    this.negativeStats = originalNegativeStats;
                    bstep.remove();
                };
                while (step.remainingPotential <= 0) {
                    if (negatives.length === 0) {
                        restoreNegative();
                        restore();
                        return 'base-potential-not-enough';
                    }
                    const nstat = lastElement(negatives).stats[0];
                    const find = bstep.stat(nstat.itemBase, nstat.type);
                    if (find) {
                        find.value -= 1;
                    } else {
                        const append = bstep.appendStat(nstat.itemBase, nstat.type, -1);
                        if (!append) {
                            restoreNegative();
                            restore();
                            return 'base-potential-not-enough';
                        }
                    }
                    nstat.value += 1;
                    this.refreshCategorys(negatives);
                }
                return null;
            })();
            if (errorFlag) this.flags.error = errorFlag;
        }
    }

    refreshCategorys(target: EnchantDollCategory[]) {
        const removes: number[] = [];
        target.forEach((category, idx) => {
            category.stats = category.stats.filter(stat => stat.value !== 0);
            if (category.stats.length === 0) removes.push(idx);
        });
        while (removes.length !== 0) target.splice(removes.pop()!, 1);
    }

    mostUseRemainingPotential(): EnchantDollEquipmentContainer[] {
        this.equipment.steps().forEach(step => step.optimizeType(-1));
        return [
            ...this.handleMostUseRemainingPotential(true),
            ...this.handleMostUseRemainingPotential(false),
        ];
    }

    handleMostUseRemainingPotential(checkSpecial: boolean): EnchantDollEquipmentContainer[] {
        const resultEqs = [];
        const newDollEq = this.clone();
        const originalPotentialList = newDollEq.getMostUsePotentialStatlList();

        if (originalPotentialList.length > 0) {
            const ceq = newDollEq.equipment;
            const positiveStats = newDollEq.positiveStats;
            const currentStatsMap = newDollEq.equipment.statsMap();
            let special = checkSpecial ? originalPotentialList.find(item => {
                const value = currentStatsMap.get(item.stat.statId)?.value ?? 0;
                return (item.type === 'step' && item.stat.potential === 3 && item.stat.belongStep.potentialExtraRate <= 120 && value < item.stat.potentialConvertThreshold);
            }) || null : null;

            let cur = lastElement(originalPotentialList);
            const allSteps = ceq.steps();
            const firstStep = allSteps[0];
            const checkStepsRemainingPotential = () => allSteps.every(step => step.remainingPotential > 0);

            while (originalPotentialList.length !== 0) {
                const pstat = positiveStats.find(stat => stat.equals(cur.stat));
                if (!pstat) {
                    originalPotentialList.pop();
                    if (originalPotentialList.length > 0) cur = lastElement(originalPotentialList);
                    continue;
                }

                while (checkStepsRemainingPotential() && pstat.value !== 0) {
                    if (cur.type === 'step') {
                        cur.stat.value += 1;
                        pstat.value -= 1;
                    } else {
                        pstat.value -= 1;
                        cur = {
                            stat: firstStep.appendStat(cur.stat.itemBase, cur.stat.type, 1)!,
                            type: 'step',
                            value: pstat.value,
                            existedAndNoRate: cur.existedAndNoRate,
                        };
                    }
                }
                originalPotentialList.pop();
                const next = lastElement(originalPotentialList);
                if (!checkStepsRemainingPotential()) {
                    cur.stat.value -= 1;
                    pstat.value += 1;
                }
                if (cur.type === 'step' && cur.stat.value === 0) cur.stat.remove();

                if (special !== null && cur.type === 'step' && cur.stat.value > 1) {
                    const POTENTIAL = 3;
                    const statOriginalValue = cur.stat.value;
                    let specialFlag = false;
                    const currentSpecial = special as MostUsePotentialStatItemStep;
                    while (cur.stat.value !== 0) {
                        const lastRemainingPotential = ceq.lastStep!.remainingPotential;
                        if (lastRemainingPotential !== 1 && (lastRemainingPotential - 1) % POTENTIAL === 0) {
                            const _pstat = positiveStats.find(stat => stat.equals(currentSpecial.stat))!;
                            const maxv = (lastRemainingPotential - 1) / POTENTIAL;
                            if (maxv + special.stat.value <= special.stat.potentialConvertThreshold && maxv <= _pstat.value && maxv * POTENTIAL < currentSpecial.stat.belongStep.remainingPotential) {
                                originalPotentialList.splice(originalPotentialList.indexOf(special), 1);
                                pstat.value += statOriginalValue - cur.stat.value;
                                _pstat.value -= maxv;
                                special.stat.value += maxv;
                                specialFlag = true;
                                break;
                            }
                        }
                        cur.stat.value -= 1;
                    }
                    if (!specialFlag) cur.stat.value = statOriginalValue;
                    else break;
                }
                cur = next;
                if (special === cur) special = null;
            }
            resultEqs.push(newDollEq);
        }
        return resultEqs;
    }

    checkRemainingPotentialBeforeFillNegative(): void {
        const eq = this.equipment;
        const steps = eq.steps();
        const stepPotentials = (steps.map(step => step.firstStat).filter(stat => stat && stat.value > 0) as EnchantStepStat[]).map(stat => stat.potential).filter(potential => potential > 1);
        if (stepPotentials.length === 0) return;
        const minPotential = Math.min(...stepPotentials);
        const lastStep = eq.lastStep!;
        if (lastStep.remainingPotential > minPotential) {
            const firstNegativeStep = steps.find(step => (step.firstStat as EnchantStepStat).value < -1);
            if (firstNegativeStep && firstNegativeStep !== lastStep) {
                const nextStep = firstNegativeStep.nextStep!;
                const nstat = firstNegativeStep.firstStat!;
                const pstat = nextStep.firstStat!;
                if (pstat.value > 1 && nextStep !== lastStep) {
                    const lastStepStat = lastStep.firstStat!;
                    const lastStepStatValueOffset = lastStepStat.value - 1;
                    nstat.value += 1;
                    lastStepStat.value = 1;
                    let pv = 0;
                    while (nextStep.remainingPotential < 1 || lastStep.remainingPotential < 1) {
                        if (pstat.value === 1) {
                            pstat.value += pv;
                            nstat.value -= 1;
                            lastStepStat.value += lastStepStatValueOffset;
                            return;
                        }
                        pstat.value -= 1;
                        pv += 1;
                    }
                    this.positiveStats.find(stat => stat.equals(pstat))!.value += pv;
                    this.positiveStats.find(stat => stat.equals(lastStepStat))!.value += lastStepStatValueOffset;
                    this.negativeStats.find(stat => stat.equals(nstat))!.value -= 1;
                }
            }
        }
    }

    checkMergeStepToFillNegative() {
        const lastStep = this.equipment.lastStep;
        if (!lastStep) return [];
        const resultEqs: EnchantDollEquipmentContainer[] = [];
        const lastStepStat = lastStep.firstStat!;
        if (lastStepStat.potential === 1) {
            const previousStep = lastStep.previousStep;
            if (previousStep) {
                const preStepStat = previousStep.firstStat!;
                const prePstat = this.findPositiveStat(preStepStat);
                const lastPstat = this.findPositiveStat(lastStepStat);
                if (prePstat && prePstat.value > 0 && lastPstat) {
                    const lastStatValueOffset = lastStepStat.value - 1;
                    lastStepStat.value = 1;
                    preStepStat.value += 1;
                    lastPstat.value += lastStatValueOffset;
                    prePstat.value -= 1;
                    if (previousStep.remainingPotential > 0 && lastStep.remainingPotential === 0) resultEqs.push(this.clone());
                    lastStepStat.value += lastStatValueOffset;
                    lastPstat.value -= lastStatValueOffset;
                    preStepStat.value -= 1;
                    prePstat.value += 1;
                }
            }
        }
        return resultEqs;
    }

    checkStepTypeEach() {
        const resultEqs: EnchantDollEquipmentContainer[] = [];
        const finds = this.positiveStats.filter(stat => stat.value !== 0 && stat.originalPotential === 1);
        if (finds.length !== 0) {
            const handle = (checkPotentialConvertThreshold: boolean) => {
                const newDollEq = this.clone();
                const ceq = newDollEq.equipment;
                const noChange = finds.every(find => {
                    if (this.equipment.stats().length === 7 && !this.equipment.hasStat(find)) return true;
                    const pstat = newDollEq.positiveStats.find(stat => stat.equals(find)) as EnchantStat;
                    if (pstat.value > 0) {
                        const tstep = ceq.appendStep();
                        tstep.type = EnchantStepTypes.Each;
                        const tstat = tstep.appendStat(pstat.itemBase, pstat.type, 0) as EnchantStepStat;
                        const potentialConvertThreshold = tstat.potentialConvertThreshold;
                        const preStat = ceq.stat(tstat.itemBase, tstat.type);
                        const prev = preStat ? preStat.value : 0;
                        while ((!checkPotentialConvertThreshold || prev + tstat.value < potentialConvertThreshold) && ceq.stepRemainingPotential() > 0 && pstat.value > 0) {
                            tstat.value += 1;
                            pstat.value -= 1;
                        }
                        if (ceq.stepRemainingPotential() <= 0) {
                            tstat.value -= 1;
                            pstat.value += 1;
                        }
                        if (tstat.value === 0) tstep.remove();
                    }
                    return false;
                });
                if (!noChange) resultEqs.push(newDollEq);
            };
            handle(true);
            handle(false);
        }
        return resultEqs;
    }

    getMostUsePotentialStatlList(): MostUsePotentialStatItem[] {
        const targetEq = this.equipment;
        const positiveStats = this.positiveStats;
        const list: MostUsePotentialStatItem[] = targetEq.steps().map((step, idx) => {
            const potentialExtraRate = step.potentialExtraRate;
            if (step.type !== EnchantStepTypes.Each) {
                if (idx === 0 && this.flags.hasHandleFirstStep) return null;
                if (potentialExtraRate !== 100 || step.stats.length !== 1) return null;
            }
            const stat = step.firstStat as EnchantStepStat;
            if (stat.value !== 1) return null;
            const pstat = positiveStats.find(_pstat => _pstat.equals(stat));
            if (!pstat || pstat.value === 0) return null;
            return { type: 'step', stat, value: stat.potentialCost, existedAndNoRate: potentialExtraRate === 100 };
        }).filter(item => item) as MostUsePotentialStatItemStep[];

        if (list.length === 0) return [];

        if (this.checkFillNegativeStats()) {
            const positives = EnchantDollCategory.classifyStats(positiveStats);
            const noRatePositiveStats = positives.filter(category => category.stats.length === 1 && category.stats[0].value !== 0).map(category => category.stats[0]);
            if (noRatePositiveStats.length !== 0) {
                noRatePositiveStats.sort((item1, item2) => {
                    const value1 = item1.originalPotential;
                    const value2 = item2.originalPotential;
                    if (value1 === value2) return item2.value - item1.value;
                    return value1 - value2;
                });
                noRatePositiveStats.forEach(tstat => {
                    const value = tstat.itemBase.getPotential(tstat.type, targetEq);
                    list.push({ type: 'unused', stat: tstat, value, existedAndNoRate: false });
                });
            }
        }
        return list.sort((item1, item2) => {
            if (item1.existedAndNoRate !== item2.existedAndNoRate) {
                if (item1.existedAndNoRate || item2.existedAndNoRate) {
                    const target = item1.existedAndNoRate ? item1 : item2;
                    const cstat = target.stat as EnchantStepStat;
                    const pstat = positiveStats.find(_pstat => _pstat.equals(cstat))!;
                    if (target.value * pstat.value >= cstat.belongStep.remainingPotential) return item1.existedAndNoRate ? 1 : -1;
                } else {
                    return item1.existedAndNoRate ? 1 : -1;
                }
            }
            return item1.value - item2.value;
        });
    }

    fillNegative() {
        const eq = this.equipment;
        const lastStep = eq.lastStep;
        let step: EnchantStep;
        if (lastStep && lastStep.remainingPotential === 0) {
            lastStep.type = EnchantStepTypes.Normal;
            step = lastStep;
        } else {
            step = eq.appendStep();
        }
        const boths = EnchantDollCategory.classifyStats([...this.negativeStats, ...this.positiveStats]);
        boths.sort((item1, item2) => item2.stats.length - item1.stats.length);
        const nstats: EnchantStat[] = [];
        boths.forEach(category => nstats.push(...category.stats.filter(stat => stat.value < 0)));
        nstats.forEach(stat => {
            if (this.equipment.stats().length === 7 && !this.equipment.hasStat(stat)) return;
            step.appendStat(stat.itemBase, stat.type, stat.value);
            stat.value = 0;
        });
    }

    finalFill() {
        const step = this.equipment.appendStep();
        this.positiveStats.filter(stat => stat.value !== 0).forEach(stat => {
            step.appendStat(stat.itemBase, stat.type, stat.value);
            stat.value = 0;
        });
        this.negativeStats.filter(stat => stat.value !== 0).forEach(stat => {
            step.appendStat(stat.itemBase, stat.type, stat.value);
            stat.value = 0;
        });
    }

    clone() {
        const newContainer = new EnchantDollEquipmentContainer({
            itemCategorys: this.itemCategorys,
            equipment: this.equipment,
            positiveStats: this.positiveStats,
            negativeStats: this.negativeStats,
        });
        newContainer.virtualStats = this.virtualStats.map(_stat => _stat.clone());
        this.clones.push(newContainer);
        newContainer.copyFrom = this;
        return newContainer;
    }

    log(errorOnly = false) {
        const steps = this.equipment.steps();
        if (!errorOnly) {
            console.group(`[ ${this.cloneId} ]`);
        } else {
            if (steps.some(step => step.remainingPotential < 1)) {
                console.group(`[ ${this.cloneId} ]`);
            } else {
                console.groupCollapsed(`[ ${this.cloneId} ]`);
            }
        }
        steps.forEach(step => console.log(step.toString()));
        console.log(' [pos] ' + this.positiveStats.map(stat => stat.show()).join('|'));
        console.log(' [neg] ' + this.negativeStats.map(stat => stat.show()).join('|'));
        console.groupEnd();
    }
}