// src/enchant/data.ts
import { EnchantCatalog, type EnchantCatalogData } from './model';

let cached: EnchantCatalog | null = null;

export async function loadEnchantCatalog(): Promise<EnchantCatalog> {
    if (cached) return cached;
    const res = await fetch('EnchantData/enchant_categories.json');
    if (!res.ok) throw new Error('옵션부여 데이터를 불러오지 못했습니다.');
    const data = (await res.json()) as EnchantCatalogData;
    cached = new EnchantCatalog(data);
    return cached;
}
