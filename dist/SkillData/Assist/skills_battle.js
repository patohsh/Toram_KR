/// skills_battle.js

const battleTree = {
    id: "battle",
    name: "배틀 스킬", // (Battle Skills)
    url_param: "Battle",
    description: "공격력, 마법력, 치명타, 방어력 등 캐릭터의 기초 전투 능력을 강화하는 패시브 스킬입니다. (데이터 갱신: 20240922)",
    skills: [
        // ==================================================
        // 1차 스킬
        // ==================================================
        {
            id: "magic_up",
            name: "마법력 UP",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - MATK 증가량: +{캐릭터레벨 × (25 × 스킬렙)/10}/100
      `
        },
        {
            id: "attack_up",
            name: "공격력 UP",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - ATK 증가량: +{캐릭터레벨 × (25 × 스킬렙)/10}/100
      `
        },
        {
            id: "defense_up",
            name: "방어력 UP",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - DEF, MDEF 증가: +{캐릭터레벨 × (25 × 스킬렙)/10}/100
      `
        },

        // ==================================================
        // 2차 스킬
        // ==================================================
        {
            id: "concentrate",
            name: "집중",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        마법공격을 했을 때 최종 데미지 증가
        
        - 스킬 발동 % = 스킬 렙
        - 데미지 증가: (10 + 스킬렙)%
        
        - 장판 스킬은 효과를 받지 못한다.
        - 롱 레인지와 같은 데미지 증가와 합산하여 증가한다.
      `
        },
        {
            id: "whack",
            name: "강타",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        물리공격을 했을 때 최종 데미지 증가
        
        - 스킬 발동 % = 스킬 렙
        - 데미지 증가: (10 + 스킬렙)%
        
        - 장판 스킬은 효과를 받지 못한다.
        - 롱 레인지, 장인의 검술, 체술단련 같은 데미지 증가와 합산하여 증가한다.
      `
        },
        {
            id: "evasion_up",
            name: "회피UP",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 회피률 증가: +스킬렙
      `
        },

        // ==================================================
        // 3차 스킬
        // ==================================================
        {
            id: "desperate_resist",
            name: "필사적인 저항",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 기절, 넘어짐, 공포, 수면, 넉백에 걸렸을 때 스킬렙% 만큼 데미지 감소를 한다.
      `
        },
        {
            id: "critical_up",
            name: "크리티컬 업",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 크리티컬 확률: +(스킬렙 × 0.5)
        - 크리티컬 데미지: (스킬렙 × 0.5)%
      `
        },
        {
            id: "accuracy_up",
            name: "명중UP",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 명중률 증가: +스킬
      `
        },

        // ==================================================
        // 4차 스킬
        // ==================================================
        {
            id: "increased_energy",
            name: "한층 더한 마력",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - MATK 증가량: +{캐릭터레벨 × (25 × 스킬렙)/10}/100
      `
        },
        {
            id: "intimidating_power",
            name: "위협의 위력",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - ATK 증가량: +{캐릭터레벨 × (25 × 스킬렙)/10}/100
      `
        },
        {
            id: "defensive_stance",
            name: "수비의 마음가짐",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - DEF, MDEF 증가: +{캐릭터레벨 × (25 × 스킬렙)/10}/100
      `
        },

        // ==================================================
        // 5차 스킬
        // ==================================================
        {
            id: "spell_burst",
            name: "스펠 버스트",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 마법 크리티컬 확률, 마법 크리티컬 데미지 전환률: (2.5 × 스킬렙)%
      `
        },
        {
            id: "force_finesse",
            name: "추격의 극의",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 물리추격, 마법추격 발동률 증가: (2.5 × 스킬렙)%
      `
        },
        {
            id: "super_grip",
            name: "슈퍼그립",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 캐릭터가 사망시 넉백의 거리 감소: 소수점 내림 (스킬렙 × 7.5)%
        - (레지스트렛: 악성 댓글 감지 - 내용 없음)
      `
        }
    ]
};