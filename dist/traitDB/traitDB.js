const traitDB = {
    id: "equipment_trait_list",
    name: "장비 어빌리티(Trait) 리스트", // Equipment Trait List
    url_param: "Trait",
    description: "드랍 장비에 부여되는 특수 능력(Trait) 목록입니다. 총 66종, 318가지의 변형이 존재합니다.",
    meta_info: {
        circles: {
            "⚪": "Tier 1 (White) - 회피(Flinch) 부여 불가",
            "🟢": "Tier 2 (Green) - 기절(Stun) 부여 불가",
            "🔵": "Tier 3 (Blue) - 넘어짐(Tumble) 부여 불가",
        }
    },
    items: [
        // ==================================================
        // 기본 스탯 (Basic Stats)
        // ==================================================
        {
            id: "str_up",
            name: "STR 증가",
            name_en: "STR",
            formula: "1 × Tier",
            description: "STR이 티어당 1 증가합니다."
        },
        {
            id: "int_up",
            name: "INT 증가",
            name_en: "INT",
            formula: "1 × Tier",
            description: "INT가 티어당 1 증가합니다."
        },
        {
            id: "vit_up",
            name: "VIT 증가",
            name_en: "VIT",
            formula: "1 × Tier",
            description: "VIT가 티어당 1 증가합니다."
        },
        {
            id: "agi_up",
            name: "AGI 증가",
            name_en: "AGI",
            formula: "1 × Tier",
            description: "AGI가 티어당 1 증가합니다."
        },
        {
            id: "dex_up",
            name: "DEX 증가",
            name_en: "DEX",
            formula: "1 × Tier",
            description: "DEX가 티어당 1 증가합니다."
        },
        // ==================================================
        // HP / MP / 전투 스탯
        // ==================================================
        {
            id: "maxhp_up",
            name: "MaxHP 증가",
            name_en: "MaxHP",
            formula: "200 × Tier",
            description: "최대 HP가 티어당 200 증가합니다."
        },
        {
            id: "maxmp_up",
            name: "MaxMP 증가",
            name_en: "MaxMP",
            formula: "10 × Tier",
            description: "최대 MP가 티어당 10 증가합니다."
        },
        {
            id: "atk_up",
            name: "ATK 증가",
            name_en: "ATK",
            formula: "5 × Tier",
            description: "ATK(물리공격력)가 티어당 5 증가합니다."
        },
        {
            id: "matk_up",
            name: "MATK 증가",
            name_en: "MATK",
            formula: "5 × Tier",
            description: "MATK(마법공격력)가 티어당 5 증가합니다."
        },
        {
            id: "def_up",
            name: "DEF 증가",
            name_en: "DEF",
            formula: "10 × Tier",
            description: "DEF(물리방어력)가 티어당 10 증가합니다."
        },
        {
            id: "mdef_up",
            name: "MDEF 증가",
            name_en: "MDEF",
            formula: "10 × Tier",
            description: "MDEF(마법방어력)가 티어당 10 증가합니다."
        },
        {
            id: "accuracy_up",
            name: "명중 증가",
            name_en: "Accuracy",
            formula: "3 × Tier",
            description: "명중이 티어당 3 증가합니다."
        },
        {
            id: "dodge_up",
            name: "회피 증가",
            name_en: "Dodge",
            formula: "3 × Tier",
            description: "회피가 티어당 3 증가합니다."
        },
        {
            id: "aspd_up",
            name: "ASPD 증가",
            name_en: "ASPD",
            formula: "50 × Tier",
            description: "공격속도(ASPD)가 티어당 50 증가합니다."
        },
        {
            id: "cspd_up",
            name: "CSPD 증가",
            name_en: "CSPD",
            formula: "50 × Tier",
            description: "시전속도(CSPD)가 티어당 50 증가합니다."
        },
        {
            id: "natural_hp_regen",
            name: "자연 HP 회복",
            name_en: "Natural HP Regen",
            formula: "15 × Tier",
            description: "자연 HP 회복력이 티어당 15 증가합니다."
        },
        {
            id: "natural_mp_regen",
            name: "자연 MP 회복",
            name_en: "Natural MP Regen",
            formula: "5 × Tier",
            description: "자연 MP 회복력이 티어당 5 증가합니다."
        },
        {
            id: "critical_rate",
            name: "크리티컬 확률",
            name_en: "Critical Rate",
            formula: "1 × Tier",
            description: "크리티컬 확률이 티어당 1 증가합니다."
        },
        {
            id: "critical_damage",
            name: "크리티컬 데미지",
            name_en: "Critical Damage",
            formula: "1 × Tier",
            description: "크리티컬 데미지가 티어당 1 증가합니다."
        },
        {
            id: "exp_gain",
            name: "획득 경험치 증가",
            name_en: "Exp Gain",
            formula: "3% × Tier",
            description: "몬스터로부터 획득하는 경험치가 티어당 3% 증가합니다."
        },
        {
            id: "pet_exp_gain",
            name: "펫 획득 경험치 증가",
            name_en: "Pet EXP Gain",
            formula: "6% × Tier",
            description: "펫이 획득하는 경험치가 티어당 6% 증가합니다."
        },
        // ==================================================
        // 특수 어빌리티 (Special Traits)
        // ==================================================
        {
            id: "battlecast",
            name: "배틀 캐스트",
            name_en: "Battlecast",
            description: "대상에게 데미지를 입히면 6초간 CSPD가 [20 × Tier] 증가합니다. (최대 20 중첩)"
        },
        {
            id: "blood_regen",
            name: "블러드 리젠",
            name_en: "Blood Regen",
            formula: "회복량 증가: +총 STR 수치",
            description: "대상에게 데미지를 입히면 [200 × Tier]의 HP를 회복합니다. STR 스탯에 따라 회복량이 증가합니다. (3초마다 1회 발동)"
        },
        {
            id: "blood_spell",
            name: "블러드 스펠",
            name_en: "Blood Spell",
            formula: "회복량 증가: +총 INT 수치",
            description: "대상에게 데미지를 입히면 [200 × Tier]의 HP를 회복합니다. INT 스탯에 따라 회복량이 증가합니다. (3초마다 1회 발동)"
        },
        {
            id: "bunker_edge",
            name: "벙커 엣지",
            name_en: "Bunker Edge",
            formula: "발동 위력: 20 × Tier",
            description: "대상에게 데미지를 입히면 5초간 물리 관통이 1% 증가합니다. (최대 10 중첩)"
        },
        {
            id: "bunker_magica",
            name: "벙커 매지카",
            name_en: "Bunker Magica",
            formula: "발동 위력: 20 × Tier",
            description: "대상에게 데미지를 입히면 5초간 마법 관통이 1% 증가합니다. (최대 10 중첩)"
        },
        {
            id: "counter_evasion_mana",
            name: "카운터 이베이전 마나",
            name_en: "Counter Evasion Mana",
            formula: "INT 비례 회복량: +기본 INT / (20 - 3 × Tier)",
            description: "대상이 회피(Evasion)를 했을 때 [20 × Tier] MP를 회복합니다. INT 스탯에 따라 회복량이 증가합니다. (6초마다 1회 발동, 이벤트 제외)"
        },
        {
            id: "counter_evasion_power",
            name: "카운터 이베이전 파워",
            name_en: "Counter Evasion Power",
            formula: "DEX 비례 ATK 증가량: +기본 DEX / 5",
            description: "대상이 회피(Evasion)를 했을 때 [5 + 5 × Tier]초 동안 ATK가 100 증가합니다. DEX가 높을수록 증가량이 커집니다. (20초마다 1회 발동, 이벤트 제외)"
        },
        {
            id: "counter_rage",
            name: "카운터 레이지",
            name_en: "Counter Rage",
            description: "대상에게 데미지를 입으면 12초간 어그로(Aggro)가 [10% × Tier] 증가합니다."
        },
        {
            id: "counter_speed",
            name: "카운터 스피드",
            name_en: "Counter Speed",
            description: "대상에게 데미지를 입으면 3초간 ASPD, CSPD, 행동 속도가 [2% × Tier] 증가합니다."
        },
        {
            id: "critical_trait",
            name: "크리티컬(특성)",
            name_en: "Critical",
            formula: "지속시간 증가: +CRT / 15",
            description: "대상에게 데미지를 입히면 3초간 크리티컬 확률이 1 증가합니다. CRT 스탯에 따라 지속시간이 증가합니다. (최대 [10 × Tier] 중첩, 타격 시 지속시간 갱신)"
        },
        {
            id: "critical_rebound",
            name: "크리티컬 리바운드",
            name_en: "Critical Rebound",
            description: "공격이 빗나갈(MISS) 경우, 60초간 크리티컬 확률이 [4 × Tier] 증가합니다. (최대 5 중첩)"
        },
        {
            id: "cursed_weapon",
            name: "커스드 웨폰",
            name_en: "Cursed Weapon",
            description: "대상에게 데미지를 입히면 3초간 최대 HP가 1% 감소하지만, ATK와 MATK가 [1 × Tier] 증가합니다. (최대 99 중첩, Max HP는 장비/스킬 %옵션 기준)"
        },
        {
            id: "dash_defence",
            name: "대시 디펜스",
            name_en: "Dash Defence",
            description: "회피(Evasion) 사용 시 3초간 물리 및 마법 내성이 [2% × Tier] 증가합니다. (최대 3 중첩)"
        },
        {
            id: "dash_power",
            name: "대시 파워",
            name_en: "Dash Power",
            description: "회피(Evasion) 사용 시 3초간 ATK가 [10 × Tier], ASPD가 [50 + 50 × Tier] 증가합니다. (최대 3 중첩)"
        },
        {
            id: "engineer",
            name: "엔지니어",
            name_en: "Engineer",
            formula: "ATK/MATK 증가: +TEC/(6-Tier) | CSPD 증가: +TEC×5/(6-Tier)",
            description: "대상에게 데미지를 입히면 20초간 ATK/MATK가 [5 + 5 × Tier], CSPD가 10 증가합니다. TEC 스탯이 높을수록 효과가 증가합니다. (10초마다 1회 발동)"
        },
        {
            id: "fighting_magica",
            name: "파이팅 매지카",
            name_en: "Fighting Magica",
            description: "대상에게 데미지를 입히면 4초간 MATK가 [1 × Tier] 증가합니다. (최대 [300 ÷ Tier] 중첩)"
        },
        {
            id: "fighting_power",
            name: "파이팅 파워",
            name_en: "Fighting Power",
            description: "대상에게 데미지를 입히면 2초간 ATK가 [1 × Tier] 증가합니다. (최대 [300 ÷ Tier] 중첩)"
        },
        {
            id: "foreseen_evasion",
            name: "포신 이베이전(간파)",
            name_en: "Foreseen Evasion",
            description: "대상이 회피(Evasion)를 했을 때 12초간 간파(Anticipate)가 [5% × Tier] 증가합니다. (이벤트 제외)"
        },
        {
            id: "gearshift",
            name: "기어 시프트",
            name_en: "Gearshift",
            description: "대상에게 데미지를 입히면 3초간 ASPD가 [20 × Tier] 증가합니다. (최대 20 중첩)"
        },
        {
            id: "graze_mana",
            name: "그레이즈 마나",
            name_en: "Graze Mana",
            formula: "발동 위력: 10 × Tier",
            description: "공격이 그레이즈(Graze)가 났을 때 MP를 10 회복합니다."
        },
        {
            id: "graze_mana_boost",
            name: "그레이즈 마나 부스트",
            name_en: "Graze Mana Boost",
            description: "공격이 그레이즈(Graze)가 났을 때 15초간 MaxMP가 [350 - 50 × Tier] 감소하지만, 근/원거리 위력이 1%, 명중이 [60 × Tier] 증가합니다. (최대 3 중첩)"
        },
        {
            id: "graze_precision",
            name: "그레이즈 프리시전",
            name_en: "Graze Precision",
            description: "공격이 그레이즈(Graze)가 났을 때 30초간 명중이 [20 × Tier] 증가합니다. (최대 5 중첩)"
        },
        {
            id: "guarded_advantage",
            name: "가디드 어드밴티지",
            name_en: "Guarded Advantage",
            description: "대상이 가드(Guard)를 했을 때 12초간 가드 파괴(Guard Break)가 [5% × Tier] 증가합니다. (이벤트 제외)"
        },
        {
            id: "guarded_magica",
            name: "가디드 매지카",
            name_en: "Guarded Magica",
            formula: "DEX 비례 MATK 증가: +기본 DEX / 10",
            description: "대상이 가드(Guard)를 했을 때 [5 + 5 × Tier]초 동안 MATK가 50 증가합니다. DEX가 높을수록 증가량이 커집니다. (20초마다 1회 발동, 이벤트 제외)"
        },
        {
            id: "guarded_recovery",
            name: "가디드 리커버리",
            name_en: "Guarded Recovery",
            formula: "STR 비례 HP 회복: +기본 STR × 2^(Tier-1) / 2",
            description: "대상이 가드(Guard)를 했을 때 [500 + 500 × Tier] HP를 회복합니다. STR 스탯에 따라 회복량이 증가합니다. (6초마다 1회 발동, 이벤트 제외)"
        },
        {
            id: "health_barrier",
            name: "헬스 배리어",
            name_en: "Health Barrier",
            formula: "MTL 비례 배리어 증가: +MTL / (6 - Tier)",
            description: "대상에게 데미지를 입히면 6초간 물리/마법 배리어가 [2 × Tier] 증가합니다. MTL 스탯이 높을수록 증가합니다. (최대 100 중첩)"
        },
        {
            id: "life_purge",
            name: "라이프 퍼지",
            name_en: "Life Purge",
            description: "대상에게 데미지를 입으면 20초간 MaxHP가 [1% × 2^(Tier-1)] 감소하지만, ASPD가 [50 × 2^(Tier-1)] 증가합니다. (최대 5 중첩)"
        },
        {
            id: "lucky_experience",
            name: "럭키 익스피리언스",
            name_en: "Lucky Experience",
            formula: "LUK 비례 최대 중첩 증가: +LUK / (30 - 5 × Level)",
            description: "대상에게 데미지를 입히면 77초간 경험치 획득량이 [1% × Tier] 증가합니다. LUK 스탯에 따라 최대 중첩 수가 증가합니다. (기본 최대 10 중첩)"
        },
        {
            id: "magica_rebound",
            name: "매지카 리바운드",
            name_en: "Magica Rebound",
            description: "공격이 빗나갈(MISS) 경우 30초간 MATK가 [10 × Tier] 증가합니다. (최대 10 중첩)"
        },
        {
            id: "mana_combat",
            name: "마나 컴뱃",
            name_en: "Mana Combat",
            formula: "VIT 비례 MP 회복: +기본 VIT / (20 × (6 - Tier))",
            description: "대상에게 데미지를 입으면 [1 × Tier] MP를 회복합니다. VIT 스탯에 따라 회복량이 증가합니다."
        },
        {
            id: "mana_rebound",
            name: "마나 리바운드",
            name_en: "Mana Rebound",
            tier_value: "[10⚪ / 20🟢 / 30🔵 / 50🟣 / 100🟠]",
            description: "공격이 빗나갈(MISS) 경우 100 MP를 회복합니다. 발동 위력은 티어에 따라 다릅니다."
        },
        {
            id: "mega_power_rebound",
            name: "메가 파워 리바운드",
            name_en: "Mega Power Rebound",
            description: "공격이 빗나갈(MISS) 경우 90초간 ATK가 [100 × Tier], 크리티컬 확률이 [25 + 25 × Tier] 증가하지만, 명중이 9999 감소합니다."
        },
        {
            id: "nimble",
            name: "님블",
            name_en: "Nimble",
            description: "대상에게 데미지를 입히면 6초간 회피(Dodge)가 [1 × Tier] 증가합니다. (최대 30 중첩)"
        },
        {
            id: "power_rebound",
            name: "파워 리바운드",
            name_en: "Power Rebound",
            description: "공격이 빗나갈(MISS) 경우 30초간 ATK가 [10 × Tier] 증가합니다. (최대 10 중첩)"
        },
        {
            id: "precision",
            name: "프리시전",
            name_en: "Precision",
            description: "대상에게 데미지를 입히면 6초간 명중(Accuracy)이 [1 × Tier] 증가합니다. (최대 30 중첩)"
        },
        {
            id: "spirit_blow",
            name: "스피릿 블로우",
            name_en: "Spirit Blow",
            formula: "AGI 비례 MP 회복: +총 AGI / (90 - 15 × Tier)",
            description: "대상에게 데미지를 입히면 [2 × Tier] MP를 회복합니다. AGI 스탯에 따라 회복량이 증가합니다. (6초마다 1회 발동)"
        },
        {
            id: "spirit_shot",
            name: "스피릿 샷",
            name_en: "Spirit Shot",
            formula: "DEX 비례 MP 회복: +총 DEX / (90 - 15 × Tier)",
            description: "대상에게 데미지를 입히면 [2 × Tier] MP를 회복합니다. DEX 스탯에 따라 회복량이 증가합니다. (6초마다 1회 발동)"
        },
        {
            id: "vengeful_life",
            name: "벤지풀 라이프",
            name_en: "Vengeful Life",
            description: "대상에게 데미지를 입으면 180초간 MaxHP가 [50 × 2^(Tier-1)] 증가합니다. (최대 [140 - 20 × Tier] 중첩)"
        },
        {
            id: "vengeful_magica",
            name: "벤지풀 매지카",
            name_en: "Vengeful Magica",
            tier_value: "증가량: [10⚪|15🟢|30🔵|60🟣|90🟠] / 최대 중첩: [90⚪|60🟢|30🔵|15🟣|10🟠]",
            description: "대상에게 데미지를 입으면 30초간 MATK가 증가합니다. 티어별로 증가량과 최대 중첩수가 다릅니다."
        },
        {
            id: "vengeful_mana",
            name: "벤지풀 마나",
            name_en: "Vengeful Mana",
            description: "대상에게 데미지를 입으면 180초간 MaxMP가 [5 × 2^(Tier-1)] 증가합니다. (최대 [35 - 5 × Tier] 중첩)"
        },
        {
            id: "vengeful_power",
            name: "벤지풀 파워",
            name_en: "Vengeful Power",
            tier_value: "증가량: [10⚪|15🟢|30🔵|60🟣|90🟠] / 최대 중첩: [90⚪|60🟢|30🔵|15🟣|10🟠]",
            description: "대상에게 데미지를 입으면 30초간 ATK가 증가합니다. 티어별로 증가량과 최대 중첩수가 다릅니다."
        },
        {
            id: "vengeful_samurai",
            name: "벤지풀 사무라이",
            name_en: "Vengeful Samurai",
            description: "대상에게 데미지를 입으면 9초간 발도 공격력(Unsheathe)이 100 증가합니다. (최대 [1 × Tier] 중첩)"
        }
    ]
};