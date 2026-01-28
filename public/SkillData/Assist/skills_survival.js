// skills_survival.js

const survivalTree = {
    id: "survival",
    name: "서바이벌 스킬", // (Survival Skills)
    url_param: "Survival",
    description: "비전투 시 회복력 증가, 경험치/드랍률 상승, HP/MP 최대치 증가 등 생존과 육성에 유용한 스킬입니다. (데이터 갱신: 20240923)",
    skills: [
        // ==================================================
        // 1차 스킬
        // ==================================================
        {
            id: "play_dead",
            name: "죽은 척",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 부활 복귀 시간 단축: (스킬렙 × 5)%
      `
        },
        {
            id: "exp_gain_up",
            name: "경험치 업",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 전투로 얻는 경험치 증가: (스킬렙 × 1)%
        - 다른 경험치 증가 효과와 중첩이 됩니다.
      `
        },
        {
            id: "drop_rate_up",
            name: "수집률 업",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 드랍률 증가: (스킬렙 × 1)%
        - 다른 드랍률 증가 효과와 중첩이 됩니다.
      `
        },
        {
            id: "safe_rest",
            name: "안전한 휴식",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        비전투 시 HP 자연 회복력이 증가합니다.
        
        - HP 자연 회복력+: +(스킬렙 × 10)
        - HP 자연 회복력%: (스킬렙 × 10)%
      `
        },
        {
            id: "x",
            name: " ",
            tier: 2,
        },
        {
            id: "short_rest",
            name: "작은 휴식",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        비전투 시 MP 자연 회복력이 증가합니다.
        
        - MP 자연 회복력+: +(스킬렙 × 1)
        - MP 자연 회복력%: (스킬렙 × 5)%
      `
        },

        // ==================================================
        // 2차 스킬
        // ==================================================
        {
            id: "hp_boost",
            name: "HP 부스트",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 최대 HP 증가+: +(스킬렙 × 100)
        - 최대 HP 증가%: (스킬렙 × 2)%
      `
        },
        {
            id: "fighters_high",
            name: "여유있는 전투",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        전투중에도 HP 자연 회복이 발동 됩니다.
        
        - 회복량: HP 자연 회복량의 (스킬렙 × 1)%만큼 반영
        - 3초에 1번씩 발동 됩니다.
      `
        },
        {
            id: "mp_boost",
            name: "MP 부스트",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        
        - 최대 MP 증가: +(스킬렙 × 30)
      `
        },
        {
            id: "sober_analysis",
            name: "냉정한 전술",
            tier: 3,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브 / 모든 무기 사용가능]
        전투중에도 자연 MP 회복이 발동 됩니다.
        
        - 회복량: MP 자연 회복량 의 (스킬렙 × 5)% 만큼 반영
        - 3초에 1번씩 발동 됩니다.
      `
        }
    ]
};