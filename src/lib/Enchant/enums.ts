// src/lib/Enchant/enums.ts

// ★ StatTypes를 여기서 정의합니다 (EnchantBase가 아님) ★
export enum StatTypes {
    Constant = 'constant',
    Multiplier = 'multiplier'
}

export type StatNormalTypes = StatTypes.Constant | StatTypes.Multiplier;

export enum EnchantItemConditions {
    MainWeapon = 'main-weapon',
    BodyArmor = 'body-armor',
    OriginalElement = 'original-element',
}

export enum EnchantEquipmentTypes {
    MainWeapon = 'main-weapon',
    BodyArmor = 'body-armor',
}

export enum EnchantStepTypes {
    Normal = 'normal',
    Each = 'each',
}

export enum EnchantDollBaseTypes {
    Physical = 'physical',
    Magic = 'magic',
    None = 'none',
}

export enum AutoFindNegaitveStatsTypes {
    SuccessRate = 'success-rate',
    Material = 'material',
}

export type MaterialPointTypeRange = 0 | 1 | 2 | 3 | 4 | 5;
