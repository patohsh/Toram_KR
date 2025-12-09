// skills_smith.js

const smithTree = {
    id: "smith",
    name: "스미스 스킬", // (Smith Skills)
    url_param: "Smith",
    description: "장비 제작, 강화, 제련을 수행하는 생산 스킬입니다. 스탯에 따라 잠재력과 성공률이 달라집니다. (데이터 갱신: 20241102)",
    skills: [
        // ==================================================
        // 1차 스킬
        // ==================================================
        {
            id: "refine_equipment",
            name: "장비 제련",
            tier: 1,
            type: "Active", // EX스킬
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [EX스킬 / 메뉴에서 사용]
        
        - 직접 장비를 제련한다. (대장간보다 저렴)
        - 스피나 제련 대비 성공률: +[2 × 스킬렙]%
        - (TEC 스탯이나 LUK 스탯에 영향받음)
      `
        },
        {
            id: "process_material_smith",
            name: "소재 가공",
            tier: 1,
            type: "Active", // EX스킬
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [EX스킬 / 인벤토리에서 사용]
        
        - 소재 획득량: [80 + 스킬렙]% ~ 100%
        - (연금술 스킬의 '소재 가공'과 레벨을 공유한다.)
      `
        },
        {
            id: "novice_anvil",
            name: "초보의 모루",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 대장장이 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 50까지 해방)
      `
        },
        {
            id: "create_equipment",
            name: "장비 제작",
            tier: 1,
            type: "Active", // EX스킬
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [EX스킬 / 메뉴에서 사용]
        
        - 장비를 제작한다.
        - 플레이어 제작 장비는 '잠재력' 수치가 존재하여 스탯 부여가 가능하다.
        - 일정 확률로 2슬롯(구멍) 장비가 제작된다.
        
        [생산력(난이도) 공식]
        - 0.01 × (50 + 5×스킬렙) × (10 + 캐릭터레벨 - 제작난이도 + STR/10)
      `
        },

        // ==================================================
        // 2차 스킬
        // ==================================================
        {
            id: "craftsman_anvil",
            name: "장인의 모루",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 대장장이 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 100까지 해방)
      `
        },
        {
            id: "mid_refine",
            name: "중급 제련 기술",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 제련 보정값: +[스킬렙 / 2] (소숫점 버림)
        - 제련 보정값: +[0.5 × 스킬렙]%
      `
        },
        {
            id: "careful_creation",
            name: "신중한 제작",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 제작 시 잠재력 보너스
        - 보너스: 기본 잠재 × [스킬렙]%
      `
        },
        {
            id: "equip_reinforce",
            name: "장비 강화",
            tier: 2,
            type: "Active", // EX스킬
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [EX스킬 / 메뉴에서 사용]
        
        - 플레이어 제작 장비(잠재력이 있는 장비)에 옵션을 부여한다.
        - 잠재력 1 이상이어야 강화 가능 (0이 되면 불가)
        - 옵션 부여 가능 수: 3개
        - 통계 성공률: +[스킬렙] 상승
      `
        },

        // ==================================================
        // 3차 스킬
        // ==================================================
        {
            id: "blacksmith_anvil",
            name: "대장간의 모루",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 대장장이 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 150까지 해방)
      `
        },
        {
            id: "high_refine",
            name: "상급 제련기술",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 제련 보정값: +[스킬렙]
        - 제련 보정값: +[0.5 × 스킬렙]%
      `
        },
        {
            id: "accurate_reinforce",
            name: "정확한 강화",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 통계 성공률: +[2 × 스킬렙] 상승
        - 추가 부여 가능 옵션 수: 3개 (총 6개 가능)
      `
        },

        // ==================================================
        // 4차 스킬
        // ==================================================
        {
            id: "master_anvil",
            name: "달인의 모루",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 대장장이 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 200까지 해방)
      `
        },
        {
            id: "expert_refine",
            name: "장인의 제련기술",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 제련 보정값: +[소숫점 버림(1.5 × 스킬렙)]
        - 제련 보정값: +[스킬렙 × 0.5]%
      `
        },
        {
            id: "expert_creation",
            name: "장인의 제작기술",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 제작 시 잠재력 보너스
        - 보너스: 기본 잠재 × [2 × 스킬렙]%
      `
        },
        {
            id: "expert_reinforce",
            name: "장인의 강화기술",
            tier: 4,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 통계 성공률: +[3 × 스킬렙] 상승
        - 추가 부여 가능 옵션 수: 2개 (총 8개 가능)
      `
        },

        // ==================================================
        // 5차 스킬
        // ==================================================
        {
            id: "master_anvil_2",
            name: "달인의 모루II",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 대장장이 숙련도 상한 [5 × 스킬렙] 상승
        - (10레벨 시 숙련도 250까지 해방)
      `
        },
        {
            id: "expert_reinforce_2",
            name: "장인의 강화기술II",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 강화 실패 하더라도 첫번째 옵션은 확정으로 붙는다.
        - (패널티 감소 효과 등 안정성 증가)
      `
        },
        {
            id: "metal_understanding",
            name: "금속 이해",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 강화로 소비하는 금속 소비량 감소
        - 감소량: [스킬렙]%
      `
        },
        {
            id: "fabric_understanding",
            name: "패브릭 이해",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 강화로 소비하는 천 소비량 감소
        - 감소량: [스킬렙]%
      `
        },
        {
            id: "beast_understanding",
            name: "짐승 이해",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 강화로 소비하는 짐승 소비량 감소
        - 감소량: [스킬렙]%
      `
        },
        {
            id: "wood_understanding",
            name: "목재 이해",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 강화로 소비하는 목재 소비량 감소
        - 감소량: [스킬렙]%
      `
        },
        {
            id: "medicine_understanding",
            name: "약품 이해",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 강화로 소비하는 약품 소비량 감소
        - 감소량: [스킬렙]%
      `
        },
        {
            id: "mana_understanding",
            name: "마법 이해",
            tier: 5,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 장비 강화로 소비하는 마소 소비량 감소
        - 감소량: [스킬렙]%
      `
        }
    ]
};