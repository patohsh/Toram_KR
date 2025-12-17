// skills_pet.js

const petSkillTree = {
    id: "pet_skills",
    name: "펫 🚗스킬", // (Pet Skills)
    url_param: "Pet",
    description: "펫이 습득하여 전투 중 자동으로 사용하는 스킬들입니다. (데이터 갱신: 20241102)",
    skills: [
        // ==================================================
        // 버프 / 보조 계열
        // ==================================================
        {
            id: "pet_first_aid",
            name: "응급처치",
            tier: 1,
            type: "Active",
            mp_cost: 100,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        주인에게 응급 처치 사용
        
        [효과]
        - 부활 대기시간 감축: [30 + 스킬렙×2]%
      `
        },
        {
            id: "brave_up",
            name: "브레이브 업",
            tier: 1,
            type: "Active", // 버프
            mp_cost: 100,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [버프]
        지속시간: 10초
        
        [효과]
        - 어택% 상승: [스킬렙]%
        - 어택 상수 상승: [30 + 스킬렙×2]
        - 공격속도% 상승: [스킬렙]%
        - 공격속도 상승: [100 + 스킬렙×20]
        
        [레드버프 가산]
        - 어택+25, 공격속도+10%
      `
        },
        {
            id: "mind_up",
            name: "마인드 업",
            tier: 1,
            type: "Active", // 버프
            mp_cost: 100,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [버프]
        지속시간: 10초
        
        [효과]
        - 마택% 상승: [스킬렙]%
        - 마택 상수 상승: [30 + 스킬렙×2]
        - 시전속도% 상승: [스킬렙]%
        - 시전속도 상승: [100 + 스킬렙×20]
        
        [레드버프 가산]
        - 마택+25, 시전속도+10%
      `
        },
        {
            id: "critical_up_pet",
            name: "크리티컬 업",
            tier: 1,
            type: "Active", // 버프
            mp_cost: 200,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [버프]
        지속시간: 10초
        
        [효과]
        - 크리티컬 데미지 상승: [스킬렙]
        
        [레드버프 가산]
        - 크리티컬 데미지+2
      `
        },
        {
            id: "protection_up", // (Cut Up)
            name: "커트 업",
            tier: 1,
            type: "Active", // 버프
            mp_cost: 200,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [버프]
        지속시간: 10초
        
        [효과]
        - 물리내성% 상승: [3 × 스킬렙]%
        - 마법내성% 상승: [3 × 스킬렙]%
        
        [레드버프 가산]
        - 물리내성% 상승: 5%
        - 마법내성% 상승: 5%
      `
        },
        {
            id: "kreis_heal",
            name: "클라이스 힐",
            tier: 1,
            type: "Active",
            mp_cost: 600,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브 / 회복]
        회복반경: 10M
        
        [회복량 공식]
        10×스킬렙 + [펫 마택치 ÷ 인원수] × 0.05 + 스킬렙×0.01 + 0.01×스킬렙
      `
        },
        {
            id: "pet_healing",
            name: "힐링",
            tier: 1,
            type: "Active",
            mp_cost: 400,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브 / 회복]
        팀에서 가장 HP비율이 낮은 사람 회복
        
        [회복량 공식]
        30×스킬렙 + [펫 마택치 × (5+스킬렙) × 0.01 + 0.01×스킬렙]
      `
        },

        // ==================================================
        // 공격 계열 (물리/마법)
        // ==================================================
        {
            id: "sneak_attack_pet",
            name: "스니크 어택",
            tier: 1,
            type: "Active",
            mp_cost: 100,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리 제한 없음
        어그로가 발생하지 않는다.
        
        [데미지 (어택/마택 유리한 쪽 적용)]
        • 계수: 1 + 0.1×스킬렙
        • 상수: 50 + 5×스킬렙
      `
        },
        {
            id: "rage_attack",
            name: "레이지 어택",
            tier: 1,
            type: "Active",
            mp_cost: 100,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 펫 무기 사거리
        
        [데미지 (어택/마택 유리한 쪽 적용)]
        • 계수: 1 + 0.1×스킬렙
        • 상수: 50 + 5×스킬렙
        
        [효과]
        - 대상에게 [스킬렙 × 25]의 어그로 발생
        - 헌신의 효과가 있다면 400%의 추가 어그로 발생
      `
        },
        {
            id: "heavy_attack",
            name: "해비 어택",
            tier: 1,
            type: "Active",
            mp_cost: 400,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 펫 무기 사거리
        관성: 물리
        
        [데미지 (어택 기반)]
        • 계수: 3 + 0.2×스킬렙
        • 상수: 40 × 스킬렙
      `
        },
        {
            id: "magic_shot",
            name: "매직 샷",
            tier: 1,
            type: "Active",
            mp_cost: 400,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 펫 무기 사거리
        관성: 마법
        
        [데미지 (마택 기반)]
        • 계수: 2 + 0.2×스킬렙
        • 상수: 25 × 스킬렙 + 250
      `
        },
        {
            id: "blind_eye",
            name: "블라인드 아이",
            tier: 1,
            type: "Active",
            mp_cost: 200,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 제한 없음
        관성: 마법
        
        [데미지 (마택 기반)]
        • 계수: 0.5 + 0.1×스킬렙
        • 상수: 10 × 스킬렙 + 100
        
        [효과]
        - 대상에게 [70 + 3×스킬렙]% 확률로 어둠 부여
      `
        },
        {
            id: "down_blow",
            name: "다운 블로우",
            tier: 1,
            type: "Active",
            mp_cost: 200,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 펫 무기 사거리
        관성: 물리
        
        [데미지 (어택 기반)]
        • 계수: 1.5 + 0.05×스킬렙
        • 상수: 20 × 스킬렙
        
        [효과]
        - 대상에게 [50 + 5×스킬렙]% 확률로 기죽음 부여
      `
        },
        {
            id: "stun_attack",
            name: "스턴 어택",
            tier: 1,
            type: "Active",
            mp_cost: 600,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 펫 무기 사거리
        관성: 물리
        
        [데미지 (어택 기반)]
        • 계수: 1.5 + 0.15×스킬렙
        • 상수: 60 × 스킬렙
        
        [효과]
        - 대상에게 [10 + 5×스킬렙]% 확률로 기절 부여
      `
        },
        {
            id: "sweep_attack",
            name: "스위프 어택",
            tier: 1,
            type: "Active",
            mp_cost: 400,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 펫 무기 사거리
        관성: 물리
        
        [데미지 (어택 기반)]
        • 계수: 1.5 + 0.1×스킬렙
        • 상수: 40 × 스킬렙
        
        [효과]
        - 대상에게 [30 + 5×스킬렙]% 확률로 넘어짐 부여
      `
        },
        {
            id: "buster_attack",
            name: "버스터 어택",
            tier: 1,
            type: "Active",
            mp_cost: 800,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 펫 무기 사거리
        관성: 물리
        
        [데미지 (어택 기반)]
        • 계수: 4 + 0.3×스킬렙
        • 상수: 1000 + 100×스킬렙
      `
        },
        {
            id: "sorcery_lance",
            name: "소르시에 랜스",
            tier: 1,
            type: "Active",
            mp_cost: 800,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 제한 없음
        관성: 마법
        
        [데미지 (마택 기반)]
        • 계수: 3 + 0.3×스킬렙
        • 상수: 2000 + 100×스킬렙
      `
        },
        {
            id: "blast_flare",
            name: "블레스트 플레어",
            tier: 1,
            type: "Active",
            mp_cost: 600,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 제한 없음
        관성: 마법
        범위: 적 중심 반경 [3 + 0.5×스킬렙]M
        
        [데미지 (마택 기반)]
        • 계수: 1.5 + 0.15×스킬렙
        • 상수: 300 + 30×스킬렙
      `
        },
        {
            id: "shell_break_pet",
            name: "실 브레이커",
            tier: 1,
            type: "Active",
            mp_cost: 600,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [액티브]
        사거리: 제한 없음
        관성: 마법
        
        [데미지 (마택 기반)]
        • 계수: 1 + 0.1×스킬렙
        • 상수: 300 + 30×스킬렙
        
        [효과]
        - 대상에게 [60 + 4×스킬렙]% 확률로 파괴 부여
      `
        },

        // ==================================================
        // 패시브 계열
        // ==================================================
        {
            id: "devotion",
            name: "감싸기", // (Cover / Devotion)
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [패시브]
        
        - 플레이어는 50%의 데미지만 받는다.
        - 펫은 전이된 피해를 입는다: [110 - 2×스킬렙]%
        
        - 무적으로 피해를 막더라도 펫은 데미지가 들어간다.
        - 생츄어리 같은 데미지 감소 효과는 감소 된 후의 피해량을 받는다.
      `
        },
        {
            id: "hide",
            name: "숨기", // (Hide) - 이미지상 감싸기와 설명이 동일함
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [패시브]
        
        - 플레이어는 50%의 데미지만 받는다.
        - 펫은 전이된 피해를 입는다: [110 - 2×스킬렙]%
        
        - 무적으로 피해를 막더라도 펫은 데미지가 들어간다.
        - 생츄어리 같은 데미지 감소 효과는 감소 된 후의 피해량을 받는다.
        (※ 원본 데이터의 설명이 감싸기와 동일함)
      `
        },
        {
            id: "hp_up_pet",
            name: "HP 업",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [패시브]
        
        - 최대HP 상승: [500 × 스킬렙]
        - 최대HP 상승: [2 × 스킬렙]%
      `
        },
        {
            id: "mp_up_pet",
            name: "MP 업",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [패시브]
        
        - 최대MP 상승: [100 × 스킬렙]
      `
        },
        {
            id: "absorb_mp",
            name: "MP 흡수",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [패시브]
        
        - 공격MP회복 상승: [10 × 스킬렙]%
        - 공격MP회복 상승: [스킬렙]
        - (정의 특성의 펫이라면 공격MP회복 100% 효과 중첩)
      `
        },
        {
            id: "absorb_hp",
            name: "HP 흡수",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["펫 전용"],
            description: `
        [패시브]
        입힌 피해 만큼의 HP 회복
        
        - 회복량: 100 + 피해량×10%
      `
        }
    ]
};