const FoodCode = {
    id: "food_code",
    name: "요리 주소 모음🦽 (Food Addresses)",
    url_param: "FoodCode",
    description: "토람 온라인 요리 주소 코드 목록입니다. (갱신일: 2024.12.15 / 출처: Discord ToramXenSei & 이미지 제보)",
    items: [
        // ==============================================================================
        // HP / MP / AMPR
        // ==============================================================================
        {
            category: "HP / MP / AMPR",
            name: "최대 MP",
            name_en: "MaxMP",
            codes: [
                { code: "1010216", lv: 10 }, { code: "1011212", lv: 10 }, { code: "1020808", lv: 10 },
                { code: "1027777", lv: 10 }, { code: "2010510", lv: 10 }, { code: "2020101", lv: 10 },
                { code: "3017676", lv: 10 }, { code: "3204544", lv: 10 }, { code: "4261111", lv: 10 },
                { code: "6053838", lv: 10 }, { code: "7100720", lv: 10 }, { code: "7150029", lv: 10 },
                { code: "1234005", lv: 10 }
            ]
        },
        {
            category: "HP / MP / AMPR",
            name: "최대 HP",
            name_en: "MaxHP",
            codes: [
                { code: "1010032", lv: 10 }, { code: "1010084", lv: 10 }, { code: "1010356", lv: 10 },
                { code: "1250015", lv: 10 }, { code: "2010228", lv: 10 }, { code: "3090618", lv: 10 },
                { code: "3092003", lv: 10 }, { code: "3191130", lv: 10 }, { code: "3260178", lv: 10 },
                { code: "4262222", lv: 10 }, { code: "6010062", lv: 10 }, { code: "6199999", lv: 10 },
                { code: "2012403", lv: 10 }
            ]
        },
        {
            category: "HP / MP / AMPR",
            name: "공마회 (공격 MP 회복)",
            name_en: "AMPR",
            codes: [
                { code: "1010017", lv: 10 }, { code: "1010596", lv: 10 }, { code: "1011010", lv: 10 },
                { code: "1023040", lv: 10 }, { code: "1047777", lv: 10 }, { code: "3020777", lv: 10 },
                { code: "3201003", lv: 10 }, { code: "4040404", lv: 10 }, { code: "4206969", lv: 10 },
                { code: "4233333", lv: 10 }, { code: "5236969", lv: 10 }, { code: "7069420", lv: 10 },
                { code: "7088807", lv: 10 }, { code: "7220777", lv: 10 }, { code: "8120000", lv: 10 },
                { code: "1234004", lv: 10 }, { code: "1120025", lv: 10 }, { code: "7123456", lv: 10 }
            ]
        },
        // ==============================================================================
        // 기본 스탯 (Stats)
        // ==============================================================================
        {
            category: "기본 스탯",
            name: "STR",
            name_en: "STR",
            codes: [
                { code: "1010055", lv: 10 }, { code: "1010968", lv: 10 }, { code: "1011069", lv: 10 },
                { code: "1110033", lv: 10 }, { code: "2017890", lv: 10 }, { code: "2020303", lv: 10 },
                { code: "2180000", lv: 10 }, { code: "4010024", lv: 10 }, { code: "5261919", lv: 10 }
            ]
        },
        {
            category: "기본 스탯",
            name: "DEX",
            name_en: "DEX",
            codes: [
                { code: "1010058", lv: 10 }, { code: "1010106", lv: 10 }, { code: "1010261", lv: 10 },
                { code: "1074649", lv: 10 }, { code: "1112220", lv: 10 }, { code: "2020222", lv: 10 },
                { code: "3111999", lv: 10 }, { code: "3220777", lv: 10 }, { code: "7011001", lv: 10 },
                { code: "7140777", lv: 10 }, { code: "1234009", lv: 10 }
            ]
        },
        {
            category: "기본 스탯",
            name: "INT",
            name_en: "INT",
            codes: [
                { code: "1010140", lv: 10 }, { code: "1010498", lv: 10 }, { code: "1032222", lv: 10 },
                { code: "1047777", lv: 10 }, { code: "2020707", lv: 10 }, { code: "5190001", lv: 10 },
                { code: "6010701", lv: 10 }, { code: "7130001", lv: 10 }, { code: "1234002", lv: 10 }
            ]
        },
        {
            category: "기본 스탯",
            name: "AGI",
            name_en: "AGI",
            codes: [
                { code: "1220777", lv: 10 }, { code: "2020037", lv: 10 }, { code: "4262222", lv: 10 },
                { code: "7162029", lv: 10 }, { code: "1234009", lv: 10 }
            ]
        },
        {
            category: "기본 스탯",
            name: "VIT",
            name_en: "VIT",
            codes: [
                { code: "4032850", lv: 10 }, { code: "1234010", lv: 9 }
            ]
        },
        // ==============================================================================
        // 공격 관련 (Attack)
        // ==============================================================================
        {
            category: "공격 관련",
            name: "무기 ATK",
            name_en: "Weapon ATK",
            codes: [
                { code: "1010810", lv: 10 }, { code: "1011122", lv: 10 }, { code: "1011126", lv: 10 },
                { code: "1067777", lv: 10 }, { code: "1080020", lv: 10 }, { code: "1200020", lv: 10 },
                { code: "2020404", lv: 10 }, { code: "3010777", lv: 10 }, { code: "3180777", lv: 10 },
                { code: "4170999", lv: 10 }, { code: "4240242", lv: 10 }, { code: "5110834", lv: 10 },
                { code: "6010024", lv: 10 }, { code: "6130623", lv: 10 }, { code: "6269999", lv: 10 },
                { code: "7050301", lv: 10 }, { code: "1234003", lv: 10 }, { code: "7123456", lv: 10 }
            ]
        },
        {
            category: "공격 관련",
            name: "ATK",
            name_en: "ATK",
            codes: [
                { code: "1119876", lv: 10 }, { code: "7170717", lv: 10 }
            ]
        },
        {
            category: "공격 관련",
            name: "MATK",
            name_en: "MATK",
            codes: [
                { code: "1024649", lv: 10 }
            ]
        },
        {
            category: "공격 관련",
            name: "크리티컬률",
            name_en: "Critical Rate",
            codes: [
                { code: "1037777", lv: 10 }, { code: "1100000", lv: 10 }, { code: "1181140", lv: 10 },
                { code: "2022020", lv: 10 }, { code: "3010777", lv: 10 }, { code: "3030159", lv: 10 },
                { code: "3149696", lv: 10 }, { code: "4010000", lv: 10 }, { code: "5119105", lv: 10 },
                { code: "6021230", lv: 10 }, { code: "7050705", lv: 10 }, { code: "7162029", lv: 10 },
                { code: "1234001", lv: 10 }, { code: "1060123", lv: 10 }, { code: "7111412", lv: 10 },
                { code: "6241210", lv: 10 }
            ]
        },
        {
            category: "공격 관련",
            name: "명중",
            name_en: "Accuracy",
            codes: [
                { code: "2010308", lv: 10 }, { code: "4261111", lv: 10 },
                { code: "1181220", lv: 9 }, { code: "7160030", lv: 9 }
            ]
        },
        // ==============================================================================
        // 속성 데미지 (DTE - Damage To Element)
        // ==============================================================================
        {
            category: "속성 데미지 (유리)",
            name: "무속성 데미지%",
            name_en: "DTE Neutral%",
            codes: [
                { code: "1018530", lv: 10 }, { code: "1014999", lv: 8 }, { code: "1234007", lv: 7 }
            ]
        },
        {
            category: "속성 데미지 (유리)",
            name: "불속성 데미지%",
            name_en: "DTE Fire%",
            codes: [
                { code: "1121212", lv: 9 }, { code: "3210106", lv: 9 }, { code: "7088807", lv: 9 },
                { code: "9181111", lv: 9 }, { code: "8120000", lv: 9 }, { code: "1234002", lv: 7 }
            ]
        },
        {
            category: "속성 데미지 (유리)",
            name: "물속성 데미지%",
            name_en: "DTE Water%",
            codes: [
                { code: "1110111", lv: 10 }, { code: "3210100", lv: 10 }, { code: "7150030", lv: 10 },
                { code: "7011001", lv: 9 }, { code: "1234005", lv: 7 }
            ]
        },
        {
            category: "속성 데미지 (유리)",
            name: "바람속성 데미지%",
            name_en: "DTE Wind%",
            codes: [
                { code: "3030303", lv: 10 }, { code: "1234004", lv: 7 }
            ]
        },
        {
            category: "속성 데미지 (유리)",
            name: "땅속성 데미지%",
            name_en: "DTE Earth%",
            codes: [
                { code: "2020202", lv: 10 }, { code: "4111113", lv: 10 }, { code: "7100666", lv: 10 },
                { code: "1011001", lv: 9 }, { code: "4233333", lv: 9 },
                { code: "1010216", lv: 8 }, { code: "1234004", lv: 7 }
            ]
        },
        {
            category: "속성 데미지 (유리)",
            name: "빛속성 데미지%",
            name_en: "DTE Light%",
            codes: [
                { code: "1020345", lv: 9 }, { code: "3111999", lv: 8 }, { code: "1234008", lv: 7 }
            ]
        },
        {
            category: "속성 데미지 (유리)",
            name: "어둠속성 데미지%",
            name_en: "DTE Dark%",
            codes: [
                { code: "1190020", lv: 10 }, { code: "2130776", lv: 10 }, { code: "6116116", lv: 10 },
                { code: "5010092", lv: 9 }, { code: "1204007", lv: 7 }
            ]
        },
        // ==============================================================================
        // 내성 및 방어 (Resistance & Defense)
        // ==============================================================================
        {
            category: "내성 / 방어 / 회피",
            name: "물리 내성%",
            name_en: "Physical Resistance%",
            codes: [
                { code: "1010081", lv: 10 }, { code: "1020001", lv: 10 }, { code: "1231776", lv: 10 },
                { code: "2020111", lv: 10 }, { code: "2020345", lv: 10 }, { code: "2200117", lv: 10 },
                { code: "4010051", lv: 10 }, { code: "6010701", lv: 10 }, { code: "1234006", lv: 10 }
            ]
        },
        {
            category: "내성 / 방어 / 회피",
            name: "마법 내성%",
            name_en: "Magic Resistance%",
            codes: [
                { code: "1111575", lv: 10 }, { code: "1181220", lv: 10 }, { code: "2020505", lv: 10 },
                { code: "5200025", lv: 10 }, { code: "6190007", lv: 10 }, { code: "7010016", lv: 10 },
                { code: "8010016", lv: 10 }, { code: "1234008", lv: 10 }
            ]
        },
        {
            category: "내성 / 방어 / 회피",
            name: "회피",
            name_en: "Dodge",
            codes: [
                { code: "2020808", lv: 7 }
            ]
        },
        {
            category: "내성 / 방어 / 회피",
            name: "물리 베리어",
            name_en: "Physical Barrier",
            codes: [
                { code: "2020111", lv: 7 }
            ]
        },
        {
            category: "내성 / 방어 / 회피",
            name: "마법 베리어",
            name_en: "Magic Barrier",
            codes: [
                { code: "2020505", lv: 8 }
            ]
        },
        // ==============================================================================
        // 속성 내성 (Element Resistance)
        // ==============================================================================
        {
            category: "속성 내성",
            name: "무속성 내성",
            name_en: "Neutral Resistance",
            codes: [{ code: "2020303", lv: 9 }]
        },
        {
            category: "속성 내성",
            name: "불속성 내성",
            name_en: "Fire Resistance",
            codes: [{ code: "2020101", lv: 9 }]
        },
        {
            category: "속성 내성",
            name: "물속성 내성",
            name_en: "Water Resistance",
            codes: [{ code: "2020606", lv: 9 }]
        },
        {
            category: "속성 내성",
            name: "바람속성 내성",
            name_en: "Wind Resistance",
            codes: [{ code: "2020222", lv: 9 }]
        },
        {
            category: "속성 내성",
            name: "땅속성 내성",
            name_en: "Earth Resistance",
            codes: [{ code: "6150029", lv: 9 }]
        },
        {
            category: "속성 내성",
            name: "빛속성 내성",
            name_en: "Light Resistance",
            codes: [{ code: "1023040", lv: 9 }]
        },
        {
            category: "속성 내성",
            name: "어둠속성 내성",
            name_en: "Dark Resistance",
            codes: [{ code: "2020707", lv: 9 }]
        },
        // ==============================================================================
        // 기타 (Aggro / Drop / EXP)
        // ==============================================================================
        {
            category: "기타",
            name: "어그로% (증가)",
            name_en: "Aggro +%",
            codes: [
                { code: "1010207", lv: 10 }, { code: "1130832", lv: 10 }, { code: "1140002", lv: 10 },
                { code: "2020606", lv: 10 }, { code: "3053131", lv: 10 }, { code: "3158668", lv: 10 },
                { code: "4220777", lv: 10 }, { code: "1234007", lv: 10 }, { code: "2010136", lv: 10 }
            ]
        },
        {
            category: "기타",
            name: "어그로% (감소)",
            name_en: "Aggro -%",
            codes: [
                { code: "1010038", lv: 10 }, { code: "1010147", lv: 10 }, { code: "1010261", lv: 10 },
                { code: "2020808", lv: 10 }, { code: "3190038", lv: 10 }, { code: "1234010", lv: 9 }
            ]
        },
        {
            category: "기타",
            name: "드롭률%",
            name_en: "Drop Rate%",
            codes: [
                { code: "4032850", lv: 6 }, { code: "4196969", lv: 6 }, { code: "4245922", lv: 6 },
                { code: "7057777", lv: 6 }
            ]
        },
        {
            category: "기타",
            name: "경험치%",
            name_en: "EXP Gain%",
            codes: [
                { code: "4040404", lv: 4 }
            ]
        }
    ]
};