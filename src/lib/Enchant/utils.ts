// src/lib/Enchant/utils.ts

/**
 * 잠재력 페널티 비율 계산
 * 토람 공식: 20 + (중복개수^2)
 * 예) 1개: 20 + 1 = 21 -> *5 = 105 (근데 보통 100% 시작이므로 보정 필요)
 * 실제 토람:
 * 1개: 100%
 * 2개: 120% (20 + 4 = 24 -> 120)
 * 3개: 145% (20 + 9 = 29 -> 145)
 * 4개: 180% (20 + 16 = 36 -> 180)
 */
export function calcPotentialExtraRate(statsNumList: number[]): number {
    // 공식: 각 카테고리별 (개수 제곱)의 합 + 20
    const res = statsNumList.reduce((cur, value) => cur + (value * value), 20);
    return res * 5;
}

export function lastElement<T>(arr: T[]): T {
    return arr[arr.length - 1];
}