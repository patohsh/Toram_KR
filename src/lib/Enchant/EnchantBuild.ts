// src/lib/Enchant/EnchantBuild.ts

import {
    EnchantCategory,
    EnchantItem,
} from './EnchantBase';

import { enchantStates } from './state';

import {
    EnchantEquipmentTypes,
    EnchantStepTypes,
    StatTypes,
    type StatNormalTypes,
    type MaterialPointTypeRange // enums에서 가져오는지 확인
} from './enums';

import { calcPotentialExtraRate } from './utils';

// ========================================================================
// [Stat Mock Class]
// ========================================================================
export class Stat {
    baseId: string;
    type: string;
    value: number;

    constructor(baseId: string, type: string, value: number) {
        this.baseId = baseId;
        this.type = type;
        this.value = value;
    }
    show(v?: number): string {
        return `${this.baseId} ${v ?? this.value}`;
    }
    add(v: number): number {
        this.value += v;
        return this.value;
    }
    equals(other: Stat): boolean {
        return this.baseId === other.baseId && this.type === other.type;
    }
}

// ========================================================================
// [Enchant Classes]
// ========================================================================

class EnchantBuild {
    name: string;
    equipment: EnchantEquipment;
    categorys: EnchantCategory[];

    constructor(name: string, equipment: EnchantEquipment | null = null) {
        this.name = name;
        this.equipment = equipment || new EnchantEquipment();
        this.categorys = [];
    }
}

class EnchantEquipment {
    private _steps: EnchantStep[];
    basePotential: number;
    originalPotential: number;
    fieldType: EnchantEquipmentTypes;
    isOriginalElement: boolean;

    constructor() {
        this._steps = [];
        this.basePotential = 15;
        this.originalPotential = 1;
        this.fieldType = EnchantEquipmentTypes.MainWeapon;
        this.isOriginalElement = false;
    }

    clone(_categorys: EnchantCategory[]) {
        const newEq = new EnchantEquipment();
        newEq.basePotential = this.basePotential;
        newEq.originalPotential = this.originalPotential;
        newEq.fieldType = this.fieldType;
        newEq.isOriginalElement = this.isOriginalElement;

        newEq._steps = this._steps.map(step => {
            const newStep = new EnchantStep(newEq);
            newStep.type = step.type;
            newStep.stats = step.stats.map(stat => {
                return new EnchantStepStat(newStep, stat.itemBase, stat.type, stat.value);
            });
            return newStep;
        });
        return newEq;
    }

    loadSteps(steps: EnchantStep[]) { this._steps = steps; }
    get allSteps(): EnchantStep[] { return this._steps; }

    steps(stepIdx?: number): EnchantStep[] {
        stepIdx = stepIdx === undefined ? this._steps.length - 1 : stepIdx;
        return stepIdx < 0 ? [] : this._steps.slice(0, stepIdx + 1);
    }

    // ▼▼▼ [필수] 이 Getter가 있어야 에러가 안 납니다 ▼▼▼
    get firstStep(): EnchantStep | null {
        return this.steps()[0] || null;
    }

    get lastStep(): EnchantStep | null {
        return this._steps.length > 0 ? this._steps[this._steps.length - 1] : null;
    }

    // ▼▼▼ [필수] 이 Getter가 있어야 에러가 안 납니다 ▼▼▼
    get operationStepsQuantity(): number {
        if (!this.lastStep) {
            return 0;
        }
        return this.steps(this.lastStep.index).reduce((cur, step) => {
            if (!step.firstStat) {
                return cur;
            }
            if (step.type === EnchantStepTypes.Each) {
                return cur + Math.ceil(step.firstStat.value / step.step);
            }
            return cur + 1;
        }, 0);
    }

    appendStep(): EnchantStep {
        const step = new EnchantStep(this);
        this._steps.push(step);
        return step;
    }

    insertStepBefore(target: EnchantStep): EnchantStep {
        const step = new EnchantStep(this);
        this._steps.splice(target.index, 0, step);
        return step;
    }

    stepRemainingPotential(stepIdx?: number): number {
        return this.steps(stepIdx).reduce(
            (cur, step) => cur - step.potentialCost,
            this.originalPotential
        );
    }

    stepPotentialExtraRate(stepIdx?: number): number {
        const categorys: { category: EnchantCategory; cnt: number }[] = [];
        this.stats(stepIdx).forEach(stat => {
            const category = stat.itemBase.belongCategory;
            const check = categorys.find(_category => _category.category === category);
            if (check) check.cnt += 1;
            else categorys.push({ category, cnt: 1 });
        });
        return calcPotentialExtraRate(categorys.map(category => category.cnt));
    }

    stat(itemBase: EnchantItem, type: StatNormalTypes, stepIdx?: number): EnchantStat {
        const value = this.steps(stepIdx).reduce((cur, step) => {
            const stepStat = step.stat(itemBase, type);
            return stepStat ? cur + stepStat.value : cur;
        }, 0);
        return new EnchantStat(itemBase, type, value);
    }

    stats(stepIdx?: number): EnchantStat[] {
        const stats: EnchantStat[] = [];
        this.steps(stepIdx).forEach(step => {
            step.stats.forEach(stat => {
                const find = stats.find(_stat => _stat.equals(stat));
                if (find) find.add(stat.value);
                else stats.push(stat.pure());
            });
        });
        return stats;
    }

    statsMap(stepIdx?: number): Map<string, EnchantStat> {
        const map = new Map<string, EnchantStat>();
        this.stats(stepIdx).forEach(s => map.set(s.statId, s));
        return map;
    }

    checkStats(stepIdx?: number): boolean { return this.stats(stepIdx).length < enchantStates.EquipmentItemMaximumNumber; }
    hasStat(stat: EnchantStat | EnchantStepStat, stepIdx?: number) {
        return !!this.stats(stepIdx).find(_stat => _stat.equals(stat));
    }

    get realSuccessRate(): number {
        if (!this.lastStep) return 160;
        const lastIndex = this.lastStep.index;
        const pot = this.stepRemainingPotential(lastIndex);
        const prevStepPot = Math.max(this.stepRemainingPotential(lastIndex - 1), this.basePotential);
        return Math.max(160 + (pot * 230) / prevStepPot, 0);
    }

    get allMaterialPointCost(): number[] {
        const mats = [0, 0, 0, 0, 0, 0];
        this.steps().forEach(step =>
            step.stats.forEach(stat => {
                const item = stat.materialPointCost;
                if (item) mats[item.type] += item.value;
            })
        );
        return mats;
    }

    refreshStats() { }
    checkMergeSteps() { }
}

class EnchantStep {
    private _parent: EnchantEquipment;
    stats: EnchantStepStat[];
    type: EnchantStepTypes;
    step: number;
    hidden: boolean;

    constructor(parent: EnchantEquipment) {
        this._parent = parent;
        this.stats = [];
        this.type = EnchantStepTypes.Normal;
        this.step = 1;
        this.hidden = false;
    }

    get belongEquipment(): EnchantEquipment { return this._parent; }
    get potentialExtraRate() { return this.belongEquipment.stepPotentialExtraRate(this.index); }
    get index() { return this._parent.allSteps.indexOf(this); }

    get potentialCost() {
        if (this.stats.length === 0) return 0;
        const er = this.potentialExtraRate;

        if (this.type === EnchantStepTypes.Normal) {
            const potentialCostBase = this.stats.reduce((cur, stat) => cur + stat.potentialCost, 0);
            return this.realPotentialCost((potentialCostBase * er) / 100);
        }
        if (this.type === EnchantStepTypes.Each) {
            return this.firstStat ? this.firstStat.potentialCost : 0;
        }
        return 0;
    }

    get remainingPotential() { return this.belongEquipment.stepRemainingPotential(this.index); }
    get previousStep(): EnchantStep | null { return this.index > 0 ? this.belongEquipment.allSteps[this.index - 1] : null; }
    get nextStep(): EnchantStep | null { return this.belongEquipment.allSteps[this.index + 1] || null; }
    get firstStat(): EnchantStepStat | null { return this.stats[0] || null; }

    appendStat(itemBase: EnchantItem, type: StatNormalTypes, value: number): EnchantStepStat | null {
        const stat = new EnchantStepStat(this, itemBase, type, value);
        this.stats.push(stat);
        return stat;
    }

    stat(itemBase: EnchantItem, type: StatTypes): EnchantStepStat | null {
        return this.stats.find(stat => stat.itemBase === itemBase && stat.type === type) ?? null;
    }

    remove() {
        if (this.index > -1) {
            this.belongEquipment.allSteps.splice(this.index, 1);
        }
    }

    realPotentialCost(potential: number): number {
        return potential >= 0 ? Math.floor(potential) : Math.ceil(potential);
    }

    optimizeType(_autoFix: number) {
        return 0;
    }

    toString() {
        return `Step ${this.index + 1}: ${this.remainingPotential}pt`;
    }
}

class EnchantStat {
    readonly itemBase: EnchantItem;
    readonly stat: Stat;

    constructor(itemBase: EnchantItem, type: StatNormalTypes, value: number) {
        this.itemBase = itemBase;
        this.stat = new Stat(itemBase.statBase.baseId, type, value);
    }

    get value(): number { return this.stat.value; }
    set value(v: number) { this.stat.value = v; }
    get type(): StatNormalTypes { return this.stat.type as StatNormalTypes; }
    get statId(): string { return `${this.itemBase.statBase.baseId}_${this.type}`; }
    get originalPotential() { return this.itemBase.getOriginalPotential(this.type); }
    get limit() { return this.itemBase.getLimit(this.type); }
    get potentialConvertThreshold() { return this.itemBase.getPotentialConvertThreshold(this.type); }

    show(): string { return this.stat.show(); }
    add(v: number) { return this.stat.add(v); }
    equals(estat: EnchantStat | EnchantStepStat): boolean { return this.stat.equals(estat.stat); }
    clone() { return new EnchantStat(this.itemBase, this.type, this.value); }
    pure() { return this.clone(); }

    calcMaterialPointCost(current: number, target: number): number {
        if (current > target) [current, target] = [target, current];

        const smithlv = enchantStates.Character.smithLevel;
        const baseRate = 100 - Math.floor(smithlv / 10) - Math.floor(smithlv / 50);
        const materialSkillRate = enchantStates.Character.getMaterialSkillLevel(this.itemBase.materialPointType);

        const baseValue = this.itemBase.getMaterialPointValue(this.type);

        const calc = (from: number, to: number) => {
            to = Math.abs(to);
            from = Math.abs(from);
            if (from > to) [from, to] = [to, from];

            let sum = 0;
            for (let i = from; i < to; i++) {
                let nextLv = i + 1;
                let cost = Math.floor(nextLv * nextLv * baseValue * baseRate / 100);
                cost = Math.floor(cost * (100 - materialSkillRate) / 100);
                sum += cost;
            }
            return sum;
        }

        if (current * target >= 0) {
            return calc(current, target);
        } else {
            return calc(current, 0) + calc(0, target);
        }
    }
}

class EnchantStepStat extends EnchantStat {
    private _parent: EnchantStep;

    constructor(parent: EnchantStep, itemBase: EnchantItem, type: StatNormalTypes, value: number) {
        super(itemBase, type, value);
        this._parent = parent;
    }

    get belongEquipment() { return this._parent.belongEquipment; }
    get belongStep() { return this._parent; }
    get potential() { return this.itemBase.getPotential(this.type, this.belongEquipment); }

    get previousStepStatValue(): number {
        const stat = this.belongEquipment.stat(this.itemBase, this.type, this._parent.index - 1);
        return stat ? stat.value : 0;
    }

    get potentialCost(): number {
        const prev = this.previousStepStatValue;

        if (this._parent.type === EnchantStepTypes.Normal) {
            return this.calcPotentialCost(this.value, prev);
        } else {
            const er = this._parent.potentialExtraRate;
            let sv = 1;
            const targetValue = this.value;
            let res = 0;
            let cur = 0;

            if (targetValue < 0) sv = -1;

            while (cur !== targetValue) {
                let nextCost = this.calcPotentialCost(sv, prev + cur);
                res += this._parent.realPotentialCost(nextCost * er / 100);
                cur += sv;
            }
            return res;
        }
    }

    calcPotentialCost(delta: number, pre: number = 0): number {
        const potentialUnit = this.potential;
        if (delta > 0 && pre >= 0) {
            return delta * potentialUnit;
        }
        if (delta < 0 && pre <= 0) {
            const tec = enchantStates.Character.tec;
            const returnRate = 0.05 + (tec / 1000);
            const cost = delta * potentialUnit;
            return Math.ceil(cost * returnRate);
        }
        return delta * potentialUnit;
    }

    get materialPointCost(): { type: MaterialPointTypeRange; value: number } {
        const from = this.previousStepStatValue;
        const to = from + this.value;
        return {
            type: this.itemBase.materialPointType,
            value: this.calcMaterialPointCost(from, to),
        };
    }

    remove(): void {
        if (this.index > -1) {
            this._parent.stats.splice(this.index, 1);
        }
    }

    get index(): number {
        return this._parent.stats.indexOf(this);
    }
}

export { EnchantStat, EnchantStepStat, EnchantStep, EnchantEquipment, EnchantBuild };