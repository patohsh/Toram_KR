// migrate.mjs
// 기존 guideDB 데이터를 Firestore로 이전하는 스크립트
// 실행방법: node migrate.mjs
//
// ※ 실행 전 준비:
//    1. npm install firebase-admin
//    2. Firebase 콘솔 → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성
//    3. 다운로드된 JSON 파일을 이 파일과 같은 폴더에 serviceAccount.json 으로 저장

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccount.json');

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// =================================================
// 기존 데이터 (guideData.js, raid.js, boss.js)
// =================================================
const existingData = [
    // ── 메뉴 (기본) ──────────────────────────────
    { category: 'menu', title: "메뉴 - 캐릭터 - 스킬 - 콤보", content: "스킬 콤보를 설정하고 관리하는 메뉴입니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 캐릭터 - 스킬 - 숏컷 설정", content: "스킬 단축키를 설정합니다. 세트 변경을 슬롯에 등록할 경우 숏컷 확장이 가능합니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 설정 - 시스템", content: "시스템 설정 권장 사항:\n1. 확장 숏컷: 이용한다\n2. 타깃 시에 카메라를 돌린다: 이용하지 않는다\n3. 방어 설정: guard, avoid 사용 (avoid 추천)\n4. 장비 관리: 대장간 방문 > 장비 강화 > 방어구 개조 > 경량화", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 터미널 - 마이룸 - 갱신순 - 주소 검색 - 간이 코드", content: "주소록을 참조하여 간이 코드로 마이룸을 검색합니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 커뮤니티 - 길드 - 길드의 용병을 빌린다", content: "길드에 가입되어 있다면 길드원의 용병을 빌려 전투에 활용할 수 있습니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 맵 - 세계 지도 - 지역 선택 - 스피나 이동", content: "세계 지도를 통해 원하는 지역으로 스피나(재화)를 소모하여 즉시 이동합니다.", nickname: "관리자" },
    { category: 'menu', title: "메인퀘 요구 아이템", content: "메인 퀘스트 진행 시 필요한 아이템 목록입니다. (상세 내용은 이미지를 참조하세요)", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 방울구슬샵 - 특수 아이템", content: "보유한 유료 재화를 사용하여 특수 아이템을 구매하거나 확인합니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 공지 - 다트", content: "매일 1회 무료로 이용 가능합니다. (매일 05시 갱신)", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 캐릭터 - 패러미터 전환", content: "새로운 유형의 캐릭터를 작성하거나, 기존 캐릭터로 변경/전환합니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 캐릭터 - 레지스트렛", content: "메인 퀘스트 진행 이후, '엘 스카로' 지역에서 해금되는 기능입니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 캐릭터 - 훈장 - 위클리", content: "매주 일요일 단위로 갱신되는 과제를 수행하고 훈장 보상을 획득합니다.", nickname: "관리자" },
    { category: 'menu', title: "메뉴 - 캐릭터 - 장비 - 아바타 장비 - 능력 부여", content: "'요정의 봉재' 아이템을 활용하여 아바타 장비에 능력치를 부여합니다.", nickname: "관리자" },

    // ── 레이드 ────────────────────────────────────
    { category: 'raid', title: "레이드 속성 가이드", content: "< 표시는 ~에 강하다.\n- 불속성 < 물속성\n- 물속성 < 바람속성\n- 바람속성 < 땅속성\n- 땅속성 < 불속성\n- 빛속성 < 어둠속성\n- 어둠속성 < 빛속성", nickname: "관리자" },
    { category: 'raid', title: "뉴비 스토리 보스 쉽게 잡기", content: "1. 메인퀘 먼저 깨기\n2. 보스 입장시 조용히 뒤로 나와서 이지로 다시 들어가기\n3. 시간 줄이려면 설정에서 스토리 첫회도 스킵 on 하기", nickname: "관리자" },

    // ── 특수보스 ──────────────────────────────────
    { category: 'boss', title: "준 고난이도 상시 보스 위치", content: "✨론 볼가 - 피고의 장원\n✨사령술사 우사사마 - 검은 강 터\n✨오르고 노바 - 요르 고원\n✨게슈펜스트 - 소피아 지하수로\n✨골둔 - 자갈의 단구", nickname: "관리자" },
];

async function migrate() {
    console.log('🚀 Firestore 데이터 이전 시작...');
    const col = db.collection('guides');

    for (const item of existingData) {
        await col.add({
            ...item,
            // 관리자 글은 비밀번호 없음 (삭제 시 관리자 공통 비번으로만 삭제 가능)
            passwordHash: null,
            createdAt: Timestamp.now(),
        });
        console.log(`✅ 추가됨: [${item.category}] ${item.title}`);
    }

    console.log('\n🎉 이전 완료!');
    process.exit(0);
}

migrate().catch(err => {
    console.error('❌ 오류:', err);
    process.exit(1);
});
