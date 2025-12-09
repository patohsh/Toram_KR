// skills_guard.js

const guardTree = {
    id: "guard",
    name: "가드 스킬", // (Guard Skills)
    url_param: "Guard",
    description: "갑옷 종류에 따라 방어력(Guard)과 회피율(Avoid)을 강화하는 스킬입니다. (데이터 갱신: 20240927)",
    skills: [
        // ==================================================
        // 1차 스킬
        // ==================================================
        {
            id: "heavy_armor_mastery",
            name: "중갑옷 마스터리",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["중량화 갑옷"],
            description: `
        [패시브 / 중량화 장비 전용]
        효과: 가드(Guard) 회복력 증가: (스킬렙 × 1)%
      `
        },
        {
            id: "light_armor_mastery",
            name: "경갑옷 마스터리",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["경량화 갑옷"],
            description: `
        [패시브 / 경량화 장비 전용]
        효과: 회피 회복력(Avoid 확률) 증가: (스킬렙 × 1)%
      `
        },

        // ==================================================
        // 2차 스킬
        // ==================================================
        {
            id: "advanced_guard",
            name: "어드밴스 가드",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["중량화 갑옷"],
            description: `
        [패시브 / 중량화 장비 전용]
        효과: 가드(Guard) 회복력 증가: (스킬렙 × 1)%
        효과: 가드력(Guard) 증가: {(1+스킬렙)/2}%
      `
        },
        {
            id: "advanced_evasion",
            name: "어드밴스 프리", // (Advanced Free / Evasion)
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["경량화 갑옷"],
            description: `
        [패시브 / 경량화 장비 전용]
        효과: 회피 회복력(Avoid 확률) 증가: (스킬렙 × 1)%
      `
        },

        // ==================================================
        // 3차 스킬
        // ==================================================
        {
            id: "physical_guard",
            name: "피지컬 가드",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["중량화 갑옷"],
            description: `
        [패시브 / 중량화 장비 전용]
        남은 HP가 적을 수록 가드(Guard)로 인한 이상내성이 2배 증가합니다.
        발동 조건: 남은 HP (스킬렙 × 5)%
      `
        },
        {
            id: "mirage_step",
            name: "미라쥬 스텝", // (Mirage Step)
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["경량화 갑옷"],
            description: `
        [패시브 / 경량화 장비 전용]
        차징 혹은 영창중에 회피(Avoid)가 가능하게 됩니다.
        쿨타임 중에는 사용이 불가 합니다.
        쿨타임: (20 - 스킬렙)초
      `
        }
    ]
};