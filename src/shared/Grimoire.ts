// src/shared/Grimoire.ts

// [임시] 아직 DatasStoreBase 파일이 없으므로, 여기서 가짜 데이터를 만들어 연결합니다.
// 나중에 DatasStoreBase 파일을 주시면 이 부분을 실제 import로 바꾸겠습니다.

// 1. 가짜 Enchant Store (데이터 저장소)
class MockEnchantStore {
    categorys: any[] = []; // 여기에 ATK, STR 같은 카테고리가 들어갑니다.

    constructor() {
        this.categorys = [];
    }
}

// 2. 가짜 Character Store
class MockCharacterStore {
    findStatBase(baseId: string) {
        // 임시로 이름만 반환
        return { baseId, name: baseId.toUpperCase() };
    }
}

// 3. DatasStoreBase 모의 객체
const DatasStoreBase = {
    Character: new MockCharacterStore(),
    Enchant: new MockEnchantStore(),
    Items: null,
    Skill: null,
    Glossary: null,
    DamageCalculation: null,
    Registlet: null,
    Quest: null,
};

// 4. I18nStore 모의 객체
const I18nStore = {
    i18n: {
        t: (key: string) => key // 번역 키를 그대로 반환
    }
};

// =========================================================
// [원본 코드 유지] - 아래는 주신 코드 그대로입니다.
// =========================================================

const Grimoire = {
    get Character() {
        return DatasStoreBase.Character!;
    },

    get Items() {
        return DatasStoreBase.Items!;
    },

    get Skill() {
        return DatasStoreBase.Skill!;
    },

    get Glossary() {
        return DatasStoreBase.Glossary!;
    },

    get Enchant() {
        return DatasStoreBase.Enchant!;
    },

    get DamageCalculation() {
        return DatasStoreBase.DamageCalculation!;
    },

    get Registlet() {
        return DatasStoreBase.Registlet!;
    },

    get Quest() {
        return DatasStoreBase.Quest!;
    },

    get i18n() {
        return I18nStore.i18n!;
    },
};

export default Grimoire;