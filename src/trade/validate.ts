// src/trade/validate.ts
// 거래(홍보) 게시판 입력 검사: 링크와 현거래(현금) 관련 표현을 막는다.
// 같은 기준을 firestore-trade-rules.txt 에도 넣어 서버(Firestore)에서도 한 번 더 막는다.

const URL_RE = /(https?:|ftp:|www\.|[a-z0-9-]{2,}\.(com|net|kr|co|io|me|gg|tv|xyz|link|org|be|ly|app|dev|info|site|shop|cc|to|ai)\b|discord\.gg|open\.kakao|t\.me|bit\.ly)/i;

// 띄어쓰기/기호를 끼워 넣어 피하는 경우를 잡기 위해 공백과 구분 기호를 뺀 문자열에서 검사한다.
const MONEY_WORDS = [
    '현거래', '현금', '계좌', '입금', '송금', '이체', '원화', '페이팔', 'paypal', '카카오페이', '네이버페이', '토스',
    '상품권', '기프티콘', '기프트카드', '비트코인', '리얼머니', 'rmt', '현질',
];
const MONEY_NUM_RE = /\d+(만|천)?원|₩|krw|usd|달러/i;

function compact(text: string): string {
    return text.toLowerCase().replace(/[\s​ .,·\-_~!@#$%^&*()+=|\\/:;'"`?<>[\]{}]+/g, '');
}

export type BlockedReason = 'link' | 'money';

export function findBlockedReason(text: string): BlockedReason | null {
    const raw = text.toLowerCase();
    const flat = text.toLowerCase().replace(/[\s​ ]+/g, '');
    if (URL_RE.test(raw) || URL_RE.test(flat)) return 'link';

    const c = compact(text);
    if (MONEY_WORDS.some(w => c.includes(w))) return 'money';
    if (MONEY_NUM_RE.test(c)) return 'money';
    return null;
}

export const BLOCKED_MESSAGE: Record<BlockedReason, string> = {
    link: '링크(주소)는 올릴 수 없습니다.',
    money: '현거래(현금·계좌·상품권 등)는 올릴 수 없습니다. 게임 안 스피나로만 협의해 주세요.',
};

export function checkField(label: string, value: string): string | null {
    const reason = findBlockedReason(value);
    return reason ? `${label}: ${BLOCKED_MESSAGE[reason]}` : null;
}
