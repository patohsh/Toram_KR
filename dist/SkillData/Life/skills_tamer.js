// skills_tamer.js

const tamerTree = {
    id: "tamer",
    name: "테이머 스킬", // (Tamer Skills)
    url_param: "Tamer",
    description: "월드맵의 몬스터를 포획하여 펫으로 삼거나, 펫을 회복/보조하는 생활형 스킬입니다. (데이터 갱신: 20241102)",
    skills: [
        // ==================================================
        // 1차 스킬
        // ==================================================
        {
            id: "taming",
            name: "테이밍",
            tier: 1,
            type: "Active",
            mp_cost: 300, // + 펫 케이지 1개
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [액티브 / 모든무기 사용가능]
        소모값: MP300 + 펫 케이지 1개
        사거리: 8M
        
        [효과]
        - 몬스터 포획을 시도한다.
        - 대상의 HP가 낮을수록 포획 확률 증가
        
        [포획 가능 시간 제한]
        - 1~5타: +[스킬렙]초
        - 6~10타: +[2 × 스킬렙]초
        - (10렙 기준 15초)
        
        [포획 가능 레벨]
        - 대상 레벨이 [플레이어Lv - 10 + 스킬렙] 이하인 몬스터만 포획 가능
      `
        },
        {
            id: "capture_technique_1",
            name: "포획기술I",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 펫 포획 가능 시간 연장
        - 1~5렙: +[스킬렙]초
        - 6~10렙: +[2 × 스킬렙]초
        - (10렙 기준 15초)
        
        - 펫 타겟 가능Lv 상승: 소숫점내림((스킬렙+1)/2)
      `
        },
        {
            id: "good_tame",
            name: "굿 테임",
            tier: 1,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 획득한 펫의 최대Lv 상승 (5~10렙)
        - (포획 시 펫의 한계 레벨이 더 높게 책정될 확률 증가)
      `
        },
        {
            id: "pet_heal",
            name: "펫 힐",
            tier: 1,
            type: "Active",
            mp_cost: 100,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [액티브 / 모든무기 사용가능]
        사거리: 제한없음
        차지시간: 3 - 소숫점내림((스킬렙-1)/3) × 0.5초
        (시전속도의 영향을 받지 않는다)
        
        [효과]
        - 소환된 펫의 HP를 회복시킨다.
        - 회복량: 100 × 스킬렙 + 최대HP × 0.15 + 0.025 × 스킬렙
      `
        },

        // ==================================================
        // 2차 스킬
        // ==================================================
        {
            id: "capture_technique_2",
            name: "포획기술II",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 펫 포획 가능 시간 연장
        - 1~5렙: +[스킬렙]초
        - 6~10렙: +[2 × 스킬렙]초
        - (10렙 기준 15초)
        
        - 펫 타겟 가능Lv 상승: 소숫점내림((스킬렙+1)/2)
      `
        },
        {
            id: "careful_capture",
            name: "조심조심 포획",
            tier: 2,
            type: "Passive",
            mp_cost: 0,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [패시브]
        
        - 획득한 펫의 잠재력 상승 (1~10렙)
        - (포획한 펫의 스탯 잠재력 수치가 높게 나올 확률 증가)
      `
        },
        {
            id: "pet_charge",
            name: "펫 차지",
            tier: 2,
            type: "Active",
            mp_cost: 300,
            element: "Neutral",
            weapon: ["모든무기"],
            description: `
        [액티브 / 모든무기 사용가능]
        사거리: 제한없음
        차지시간: 4.5 - 소숫점내림((스킬렙-1)/3) × 0.5초
        (시전속도의 영향을 받지 않는다)
        
        [효과]
        - 소환된 펫의 MP를 회복시킨다.
        - 회복량: 100 × 스킬렙
      `
        }
    ]
};