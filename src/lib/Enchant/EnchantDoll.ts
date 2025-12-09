import { lastElement } from './utils'; // 

// Folder 1에서 가져오기
import {
    EnchantBuild,
    EnchantEquipment,
    EnchantEquipmentTypes,
    EnchantItem,
    EnchantStat,
    enchantStates,
    StatTypes,            // StatNormalTypes 등은 여기서
    type StatNormalTypes, // 타입
    EnchantCategory,      // Grimoire 모의 객체용
} from '.';

// Folder 2 내부 파일들 (곧 만드실 파일들)
import { EnchantDollCategory } from './EnchantDollCategory';
import EnchantDollEquipmentContainer from './EnchantDollEquipmentContainer';
import { AutoFindNegaitveStatsTypes, EnchantDollBaseTypes } from './enums';

// ==========================================
// [임시 유틸리티 및 모의 객체]
// 나머지 파일들이 없을 때 에러를 방지하기 위한 임시 코드입니다.
// ==========================================

// Grimoire 모의 객체 (데이터베이스 역할)
const Grimoire = {
    Enchant: {
        // 실제 데이터는 main.ts 등에서 주입되어야 하지만, 여기선 빈 배열로 둡니다.
        categorys: [] as EnchantCategory[]
    }
};

// ==========================================
// [메인 코드] EnchantDoll
// ==========================================

export interface AutoFindNegaitveStatsResult {
    stats: EnchantStat[];
    realSuccessRate: number;
    equipment: EnchantEquipment | null;
}

class EnchantDoll {
    private _positiveStats: EnchantStat[];

    build: EnchantBuild;
    lastResults: EnchantEquipment[];
    config: {
        baseType: EnchantDollBaseTypes;
        autoFindNegaitveStatsType: AutoFindNegaitveStatsTypes;
        containsNaturalMpRegenConstant: boolean;
    };

    constructor() {
        this.build = new EnchantBuild('Potum'); // 기본 이름
        this._positiveStats = [];
        this.lastResults = [];
        this.config = {
            baseType: EnchantDollBaseTypes.None,
            autoFindNegaitveStatsType: AutoFindNegaitveStatsTypes.SuccessRate,
            containsNaturalMpRegenConstant: false,
        };
    }

    get numPositiveStats() {
        return this._positiveStats.length;
    }

    get numNegativeStats() {
        return enchantStates.EquipmentItemMaximumNumber - this.numPositiveStats;
    }

    get positiveStats() {
        return this._positiveStats;
    }

    /**
     * 부여하고 싶은 긍정 속성(옵션) 추가
     */
    appendPositiveStat(itemBase: EnchantItem, type: StatNormalTypes, value: number) {
        const stat = new EnchantStat(itemBase, type, value);
        if (this._positiveStats.length === enchantStates.EquipmentItemMaximumNumber) {
            return null;
        }
        this._positiveStats.push(stat);
        return stat;
    }

    removePositiveStat(stat: EnchantStat) {
        const index = this.positiveStats.indexOf(stat);
        this._positiveStats.splice(index, 1);
    }

    getPositiveStat(itemBase: EnchantItem, type: StatNormalTypes) {
        return this._positiveStats.find(stat => stat.itemBase === itemBase && stat.type === type);
    }

    hasPositiveStat(itemBase: EnchantItem, type: StatNormalTypes) {
        return this.getPositiveStat(itemBase, type) ? true : false;
    }

    /**
     * 강화 시뮬레이션 계산 실행
     * @param originalNegativeStats 부여할 부정 속성 목록
     * @param originalPotential 장비의 초기 잠재력
     */
    calc(
        originalNegativeStats: EnchantStat[],
        originalPotential: number = 0
    ): EnchantEquipment | null {
        // 부여할 능력 임시 저장. 능력이 모두 소진되면 계산 완료로 간주.
        const negativeStats = originalNegativeStats.map(item => item.clone());
        const positiveStats = this._positiveStats.map(item => item.clone());

        if (
            negativeStats.find(stat => stat.value === 0) ||
            positiveStats.find(stat => stat.value === 0)
        ) {
            console.warn('[enchant-doll] 제공된 일부 스탯의 값이 0입니다.');
            return null;
        }
        if (negativeStats.length > 7) {
            console.warn('[enchant-doll] 부정 속성은 7개를 초과할 수 없습니다.');
            return null;
        }

        /**
         * 같은 카테고리끼리 분류합니다.
         * - positiveStats와 negativeStats는 베이스 창고입니다.
         * - negatives와 positives는 메인 창고입니다.
         * - stat은 복제되지 않으므로 두 창고의 stat.value는 동기화됩니다.
         * - stat.value가 0인 능력은 모두 사용된 것을 의미합니다.
         */
        // const negatives = EnchantDollCategory.classifyStats(negativeStats);
        // const positives = EnchantDollCategory.classifyStats(positiveStats);

        const dollEq = new EnchantDollEquipmentContainer({
            itemCategorys: this.build.categorys,
            equipment: this.build.equipment,
            positiveStats,
            negativeStats,
        });

        if (originalPotential !== 0) {
            dollEq.equipment.originalPotential = originalPotential;
        }

        const firstResultEqs = [dollEq];
        firstResultEqs.push(...dollEq.beforeFillNegative());

        let resultEqs = firstResultEqs.filter(eq => eq.flags.error === null);
        const errorEqs = firstResultEqs.filter(eq => eq.flags.error !== null);

        const clearRepeatEquipment = () => {
            const results = resultEqs;
            const map = new Map();
            results.forEach(res => {
                const eq = res.equipment;
                const steps = eq.steps();
                const stepsId = steps
                    .filter((step, idx) => idx === steps.length - 1 || step.stats[0].value < 0)
                    .map(step => step.stats.map(stat => stat.statId + stat.value).join(','))
                    .join('->');
                const pre = eq.lastStep
                    ? `${eq.lastStep.remainingPotential}/${eq.lastStep.potentialExtraRate}`
                    : 'none';
                const id = `${pre}/${steps.length}::${stepsId}`;
                if (!map.has(id)) {
                    map.set(id, res);
                }
            });
            resultEqs = Array.from(map.values());
        };

        const sortResult = (
            build1: EnchantDollEquipmentContainer,
            build2: EnchantDollEquipmentContainer
        ) => {
            const sr2 = Math.floor(build2.equipment.realSuccessRate);
            const sr1 = Math.floor(build1.equipment.realSuccessRate);
            if (sr2 === sr1) {
                // 단계 수가 적은 순서
                return build1.equipment.operationStepsQuantity - build2.equipment.operationStepsQuantity;
            }
            // 성공률 높은 순서
            return sr2 - sr1;
        };

        if (resultEqs.length !== 0) {
            resultEqs.forEach(cdollEq => cdollEq.clearVirtualStats());
            clearRepeatEquipment();

            // 남은 잠재력을 최대한 활용
            resultEqs.forEach(cdollEq => resultEqs.push(...cdollEq.mostUseRemainingPotential()));
            clearRepeatEquipment();

            // 부정 속성(패널티) 모두 부여
            resultEqs.forEach(cdollEq => cdollEq.checkRemainingPotentialBeforeFillNegative());
            resultEqs.forEach(cdollEq => resultEqs.push(...cdollEq.checkMergeStepToFillNegative()));
            resultEqs.forEach(cdollEq => cdollEq.fillNegative());

            resultEqs.forEach(cdollEq => resultEqs.push(...cdollEq.checkStepTypeEach()));

            // 긍정 속성과 남은 부정 속성 모두 부여
            resultEqs.forEach(cdollEq => cdollEq.finalFill());

            // 성공률이 가장 높은 장비 순으로 정렬하여 반환
            resultEqs.sort(sortResult);

            this.lastResults = resultEqs.slice(0, 11).map(res => res.equipment);
            return this.lastResults[0];
        } else {
            errorEqs.forEach(item => item.finalFill());
            errorEqs.sort(sortResult);

            this.lastResults = resultEqs.slice(0, 11).map(res => res.equipment);
            return this.lastResults[0];
        }
    }

    optimizeResults() {
        this.lastResults.forEach(eq => {
            eq.checkMergeSteps();
            eq.steps().forEach(step => step.optimizeType(0));
        });
    }

    /**
     * 최적의 부정 속성(패널티) 자동 탐색
     */
    autoFindNegaitveStats(
        manuallyStats: EnchantStat[] = [],
        originalPotential: number = 0
    ): AutoFindNegaitveStatsResult {
        const limit = this.numNegativeStats;
        const categorys = Grimoire.Enchant.categorys;

        const buildEquipment = this.build.equipment;

        // 장비 종류에 따른 우선순위 목록 설정
        const prioritizedShortList = {
            [EnchantEquipmentTypes.MainWeapon]: [
                'def',
                'mdef',
                'dodge',
                'natural_hp_regen',
                this.config.containsNaturalMpRegenConstant
                    ? 'natural_mp_regen'
                    : {
                        baseId: 'natural_mp_regen',
                        types: [StatTypes.Multiplier] as StatNormalTypes[],
                    },
            ],
            [EnchantEquipmentTypes.BodyArmor]: ['accuracy'],
        }[buildEquipment.fieldType] || []; // Default fallback

        if (buildEquipment.fieldType === EnchantEquipmentTypes.BodyArmor) {
            switch (this.config.baseType) {
                case EnchantDollBaseTypes.Physical:
                    prioritizedShortList.unshift('matk', 'magic_pierce');
                    break;
                case EnchantDollBaseTypes.Magic:
                    prioritizedShortList.unshift('atk', 'physical_pierce');
                    break;
                case EnchantDollBaseTypes.None:
                    prioritizedShortList.unshift('atk', 'matk', 'physical_pierce', 'magic_pierce');
            }
        }

        const shortlist: EnchantStat[] = [];
        const defaultStatTypes: StatNormalTypes[] = [StatTypes.Constant, StatTypes.Multiplier];

        categorys.forEach(category => {
            category.items.forEach(item => {
                const find = prioritizedShortList.find(statBaseItem => {
                    if (typeof statBaseItem === 'object') {
                        // @ts-ignore
                        return statBaseItem.baseId === item.statBase.baseId;
                    }
                    return statBaseItem === item.statBase.baseId;
                });
                if (find) {
                    const types = typeof find === 'object' ? (find as any).types : defaultStatTypes;
                    types.forEach((type: StatNormalTypes) => {
                        // @ts-ignore
                        if (type === StatTypes.Multiplier && !item.statBase.hasMultiplier) {
                            return;
                        }
                        if (this.hasPositiveStat(item, type)) {
                            return;
                        }
                        const stat = new EnchantStat(item, type, item.getLimit(type).min);
                        shortlist.push(stat);
                    });
                }
            });
        });

        const negatives: EnchantDollCategory[] = EnchantDollCategory.classifyStats(shortlist);

        // 능력 정렬
        negatives.forEach(category => {
            if (this.config.autoFindNegaitveStatsType === AutoFindNegaitveStatsTypes.SuccessRate) {
                category.sortStats('negaitve--min-material-cost'); // 소재 소모량 낮은 순
                category.sortStats('max-effect'); // 최대 퇴잠(잠재력 확보량) 높은 순
            } else {
                category.sortStats('negaitve--min-material-cost');
            }
        });

        const tshortlist = negatives.map(category => category.stats).flat();
        manuallyStats = manuallyStats.filter(mstat => !tshortlist.find(nstat => nstat.equals(mstat)));

        const numNegativeStats = Math.min(
            Math.max(this.numNegativeStats - manuallyStats.length, tshortlist.length),
            this.numNegativeStats
        );

        if (tshortlist.length >= numNegativeStats) {
            manuallyStats = manuallyStats.slice(0, this.numNegativeStats - numNegativeStats);
            const originalNegativeStatsList = this.getNegativeStatsList(tshortlist, numNegativeStats);

            const parseStats = (stats: EnchantStat[]) => {
                const tmpCategorys = EnchantDollCategory.classifyStats(stats).sort(
                    (item1, item2) => item2.stats.length - item1.stats.length
                );
                tmpCategorys.forEach(_category => _category.sortStats('max-effect'));
                const categoryEffectSum = tmpCategorys
                    .map(_category => _category.originalPotentialEffectMaximumSum())
                    .reduce((cur, effect) => cur + effect, 0);
                const materialPointSum = tmpCategorys
                    .map(_category => _category.materialPointMaximumSum('min'))
                    .reduce((cur, mpt) => cur + mpt, 0);
                const categorysId = tmpCategorys.map(_category => _category.stats.length).join('|');
                return {
                    categorysId,
                    potentialEffect: categoryEffectSum,
                    materialPoint: materialPointSum,
                };
            };

            const statsMap = new Map();
            originalNegativeStatsList.forEach(stats => {
                const { categorysId, potentialEffect, materialPoint } = parseStats(stats);
                if (statsMap.has(categorysId)) {
                    const data = statsMap.get(categorysId);
                    if (data.potentialEffect === potentialEffect && data.materialPoint <= materialPoint) {
                        return; // 퇴잠량 동일 시 소재 적게 드는 것 유지
                    }
                    if (data.potentialEffect > potentialEffect) {
                        return; // 퇴잠량 높은 것 유지
                    }
                }
                statsMap.set(categorysId, {
                    potentialEffect,
                    materialPoint,
                    stats,
                });
            });

            const negativeStatsList = Array.from(statsMap, el => el[1].stats);
            const finaleList = negativeStatsList
                .map(stats => {
                    const _stats = [...stats, ...manuallyStats];
                    const eq = this.calc(_stats, originalPotential);
                    if (!eq) {
                        return null;
                    }
                    return {
                        realSuccessRate: eq.realSuccessRate,
                        stats: _stats,
                        equipment: eq,
                    };
                })
                .filter(item => item !== null) as AutoFindNegaitveStatsResult[];

            return finaleList.sort((item1, item2) => item2.realSuccessRate - item1.realSuccessRate)[0];
        }

        return {
            realSuccessRate: 0,
            equipment: null,
            stats: this.parseNegativeCategorys(negatives, limit),
        };
    }

    parseNegativeCategorys(negatives: EnchantDollCategory[], limit: number): EnchantStat[] {
        const numNegatives = limit;

        const calcPotentialPriority = (category: EnchantDollCategory, num: number) => {
            return category.originalPotentialEffectMaximumSum(num);
        };

        const calcMaterialPriority = (category: EnchantDollCategory, num: number) => {
            return category.materialPointMaximumSum('min', num);
        };

        const calcPriority = (category: EnchantDollCategory, nums: number) => {
            return this.config.autoFindNegaitveStatsType === AutoFindNegaitveStatsTypes.SuccessRate
                ? calcPotentialPriority(category, nums)
                : calcMaterialPriority(category, nums);
        };

        negatives.sort((cat1, cat2) => {
            for (let idx = 1; idx <= numNegatives; ++idx) {
                if (idx >= cat1.stats.length && idx >= cat2.stats.length) {
                    return 0;
                }
                const av = calcPriority(cat1, idx);
                const bv = calcPriority(cat2, idx);
                if (av > bv) {
                    return -1;
                }
                if (av < bv) {
                    return 1;
                }
            }
            return 0;
        });

        const negativeStats: EnchantStat[] = [];
        negatives.find(category => {
            return category.stats.find(stat => {
                negativeStats.push(stat.clone());
                return negativeStats.length === numNegatives;
            });
        });

        return negativeStats;
    }

    getNegativeStatsList(stats: EnchantStat[], length: number) {
        const finaleRes = [];

        const merge = (ary: number[][]) => {
            const res = [];
            for (let idx = 0; idx < ary.length - 1; ++idx) {
                for (let idx2 = 0; idx2 < stats.length; ++idx2) {
                    const items = ary[idx];
                    if (lastElement(items) < idx2) {
                        const newEl = items.slice();
                        newEl.push(idx2);
                        res.push(newEl);
                    }
                }
            }
            return res;
        };

        let res = Array(stats.length)
            .fill([])
            .map((_value, idx) => [idx]);

        while (res.length !== 0 && res[0].length !== stats.length) {
            res = merge(res);
            if (res[0].length === length) {
                finaleRes.push(...res);
                break;
            }
        }

        return finaleRes.map(item => item.map(idx => stats[idx]));
    }
}

export { EnchantDoll };