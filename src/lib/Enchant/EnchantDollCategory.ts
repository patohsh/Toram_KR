import type { EnchantCategory } from './EnchantBase';
import type { EnchantEquipment, EnchantStat } from './EnchantBuild';

/**
 * 강화 옵션(Stat)들을 카테고리별로 그룹화하여 관리하는 클래스
 */
class EnchantDollCategory {
    category: EnchantCategory;
    stats: EnchantStat[];

    constructor(category: EnchantCategory) {
        this.category = category;
        this.stats = [];
    }

    /**
     * 스탯 목록을 받아 카테고리별로 분류하여 EnchantDollCategory 배열로 반환합니다.
     */
    static classifyStats(stats: EnchantStat[]): EnchantDollCategory[] {
        const target: EnchantDollCategory[] = [];
        stats.forEach(stat => {
            const statCategory = stat.itemBase.belongCategory;
            const find = target.find(category => category.category === statCategory);
            if (find) {
                find.stats.push(stat);
            } else {
                const category = new EnchantDollCategory(statCategory);
                category.stats.push(stat);
                target.push(category);
            }
        });
        return target;
    }

    /**
     * 스탯 정렬
     * @param type 정렬 기준
     *  - 'max-effect': 잠재력 반환량이 큰 순서 (퇴잠용)
     *  - 'max-cost': 잠재력 소모량이 큰 순서
     *  - 'negaitve--min-material-cost': (부정속성) 소재 소모량이 적은 순서
     */
    sortStats(
        type: 'max-effect' | 'max-cost' | 'negaitve--min-material-cost', // 원본 오타(negaitve) 유지 (다른 파일과의 호환성 위함)
        payload?: { equipment: EnchantEquipment }
    ) {
        if (type === 'max-effect') {
            this.stats.sort((item1, item2) => {
                const av = -1 * item1.originalPotential * item1.limit.min;
                const bv = -1 * item2.originalPotential * item2.limit.min;
                return bv - av;
            });
        } else if (type === 'max-cost') {
            const { equipment } = payload as { equipment: EnchantEquipment };
            this.stats.sort((item1, item2) => {
                const av = item1.itemBase.getPotential(item1.type, equipment);
                const bv = item2.itemBase.getPotential(item2.type, equipment);
                if (av === bv) {
                    return item2.value - item1.value;
                }
                return bv - av;
            });
        } else if (type === 'negaitve--min-material-cost') {
            this.stats.sort((item1, item2) => {
                const av = item1.calcMaterialPointCost(item1.limit.min, 0);
                const bv = item2.calcMaterialPointCost(item2.limit.min, 0);
                return av - bv;
            });
        }
    }

    /**
     * 스탯들의 잠재력 효과(반환량) 최대 합계 계산
     * (주로 퇴잠 계산 시 사용)
     */
    originalPotentialEffectMaximumSum(num?: number): number {
        num = num === undefined ? this.stats.length : num;
        return (
            -1 *
            this.stats
                .slice(0, num)
                .reduce((cur, stat) => cur + stat.originalPotential * stat.limit.min, 0)
        );
    }

    /**
     * 스탯들의 소재 포인트 최대 소모량 합계 계산
     * @param type 'min' (최소 한계치 기준) | 'max' (최대 한계치 기준)
     */
    materialPointMaximumSum(type: 'min' | 'max', num?: number): number {
        num = num === undefined ? this.stats.length : num;
        return this.stats
            .slice(0, num)
            .reduce((cur, stat) => cur + stat.calcMaterialPointCost(stat.limit[type], 0), 0);
    }
}

export { EnchantDollCategory };