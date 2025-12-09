// skills_alchemy.js

const alchemyTree = {
    id: "alchemy",
    name: "연금술 스킬", // (Alchemy Skills)
    url_param: "Alchemy",
    description: "소재를 가공하거나 아이템, 장비, 염색 등을 합성하는 생산 스킬입니다. (데이터 갱신: 20241102)",
    skills: [
        // ==================================================
        // 1차 스킬
        // ==================================================
        {
            id: "item_synthesis",
            name: "아이템 합성",
            tier: 1,
            type: "Active", // EX스킬
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [EX스킬 / 메뉴에서 사용]
        
        - 소비 아이템을 합성할 수 있다.
        - NPC와 달리 스피나를 사용하지 않는다.
        - (성공 확률은 숙련도와 난이도에 따름)
      `
        },
        {
            id: "process_material",
            name: "소재 가공",
            tier: 1,
            type: "Active", // EX스킬
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [EX스킬 / 인벤토리에서 사용]
        
        - 불필요한 아이템을 소재 포인트로 가공한다.
        - 소재 획득량: [80 + 스킬렙]% ~ 100%
        - (스미스 스킬의 '소재 가공'과 레벨을 공유한다.)
      `
        },
        {
            id: "novice_bottle",
            name: "초보의 약병",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 연금술 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 50까지 해방)
      `
        },

        // ==================================================
        // 2차 스킬
        // ==================================================
        {
            id: "craftsman_bottle",
            name: "장인의 약병",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 연금술 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 100까지 해방)
      `
        },
        {
            id: "mid_synthesis",
            name: "중급 합성술",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 아이템 합성 성공률 [스킬렙]% 증가
      `
        },
        {
            id: "equip_synthesis",
            name: "장비 합성",
            tier: 2,
            type: "Active", // EX스킬
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [EX스킬 / 메뉴에서 사용]
        장비의 외형, 염색, 성능을 합성한다.
        
        [확정 가능 수 (잠금)]
        - 1확정: 장비합성 1레벨 해금
        - 2확정: 연금술 숙련도 50 해금
        - 3확정: 연금술 숙련도 100 해금
        - 4확정: 연금술 숙련도 150 해금
        - 5확정: 연금술 숙련도 200 해금
        
        - 기본 성공률: [스킬렙 × 10]%
      `
        },

        // ==================================================
        // 3차 스킬
        // ==================================================
        {
            id: "blacksmith_bottle",
            name: "대장간의 약병",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 연금술 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 150까지 해방)
      `
        },
        {
            id: "high_synthesis",
            name: "상급 합성술",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 아이템 합성 성공률 [스킬렙]% 증가
      `
        },
        {
            id: "synthesis_tech_1",
            name: "합성기술 향상 I",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 합성 시 염색 저장 기능 사용 가능
        - 기본 성공률 증가: [스킬렙 × 1.5]%
        - 염색 저장 한도: 99피스
      `
        },

        // ==================================================
        // 4차 스킬
        // ==================================================
        {
            id: "master_bottle",
            name: "달인의 약병",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 연금술 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 200까지 해방)
      `
        },
        {
            id: "expert_synthesis",
            name: "장인 합성술",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 아이템 합성 성공률 [스킬렙]% 증가
      `
        },
        {
            id: "synthesis_tech_2",
            name: "합성기술 향상 II",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 기본 성공률 증가: [스킬렙 × 2.0]%
        - 이 스킬까지 10렙 습득 시 5확정 합성 성공률: 80%
      `
        },

        // ==================================================
        // 5차 스킬
        // ==================================================
        {
            id: "master_bottle_2",
            name: "달인의 약병II",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 연금술 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 250까지 해방)
      `
        },
        {
            id: "expert_synthesis_2",
            name: "장인 합성술II",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 아이템 합성 성공률 [스킬렙]% 증가
      `
        },
        {
            id: "synthesis_tech_3",
            name: "합성기술 향상 III",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 기본 성공률 증가: [스킬렙 × 2.5]%
        - 이 스킬까지 10렙 습득 시 5확정 합성 성공률: 96%
        - (개인 장비합성 시 성공률이 비약적으로 상승)
      `
        }
    ]
};