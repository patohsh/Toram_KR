// src/folder1/state.ts

import type { MaterialPointTypeRange } from './EnchantBase';

// ========================================================
// [설정 시뮬레이션] 외부 Store 의존성 제거를 위한 로컬 설정
// ========================================================
export const enchantConfig = {
    characterLevel: 310, // 캐릭터 만렙 기준
    smithLevel: 100,     // 대장장이 레벨
    materialSkillLevels: [10, 10, 10, 10, 10, 10], // 소재 가공 스킬 레벨
    // 금속/짐승/목재/천/약품/마소 순서
    get materialAnvilSkillLevelSum() {
        return 50; // 모루 스킬 합계 (예시)
    }
};

// ========================================================
// [메인 상태 객체]
// ========================================================
export const enchantStates = {
    PotentialCapacity: 100,                 // 잠재력 용량
    EquipmentBasePotentialMinimum: 30,      // 장비 최소 잠재력
    EquipmentItemMaximumNumber: 8,          // 최대 부여 옵션 수
    PotentialConvertDefaultThreshold: 20,   // 잠재력 전환 임계값

    Character: {
        // 캐릭터 레벨
        get level() {
            return enchantConfig.characterLevel;
        },
        // 대장장이 레벨
        get smithLevel() {
            return enchantConfig.smithLevel;
        },
        // TEC (솜씨) 스탯
        tec: 255,

        // 소재 가공 스킬 레벨 가져오기
        getMaterialSkillLevel(type: MaterialPointTypeRange) {
            return enchantConfig.materialSkillLevels[type] || 0;
        },

        // 소재 모루 스킬 합계
        get materialAnvilSkillLevelSum() {
            return enchantConfig.materialAnvilSkillLevelSum;
        },
    },
};