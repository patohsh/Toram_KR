/**
 * 게임 가이드 데이터베이스
 * 구성:
 * - id: 순서 (1, 2, 3...)
 * - title: 메뉴 경로 및 제목 (텍스트)
 * - description: 상세 설명
 * - image: 해당 항목에 필요한 이미지 파일명 (placeholder)
 */

export const guideData = [
    {
        id: 1,
        title: "메뉴 - 캐릭터 - 스킬 - 콤보",
        description: "✨스킬 콤보를 설정하고 관리하는 메뉴입니다.",
        image: "guide_01_combo.png"
    },
    {
        id: 2,
        title: "메뉴 - 캐릭터 - 스킬 - 숏컷 설정",
        description: "스킬 단축키를 설정합니다. 세트 변경을 슬롯에 등록할 경우 숏컷 확장이 가능합니다.",
        image: "guide_02_shortcut.png"
    },
    {
        id: 3,
        title: "메뉴 - 설정 - 시스템",
        description: `시스템 설정 권장 사항:
1. 확장 숏컷: 이용한다
2. 타깃 시에 카메라를 돌린다: 이용하지 않는다
3. 방어 설정: guard, avoid 사용 (avoid 추천)
4. 장비 관리: 대장간 방문 > 장비 강화 > 방어구 개조 > 경량화`,
        image: "guide_03_system.png"
    },
    {
        id: 4,
        title: "메뉴 - 터미널 - 마이룸 - 갱신순 - 주소 검색 - 간이 코드",
        description: "주소록을 참조하여 간이 코드로 마이룸을 검색합니다.",
        image: "guide_04_myroom.png"
    },
    {
        id: 5,
        title: "메뉴 - 커뮤니티 - 길드 - 길드의 용병을 빌린다",
        description: "길드에 가입되어 있다면 길드원의 용병을 빌려 전투에 활용할 수 있습니다.",
        image: "guide_05_guild_merc.png"
    },
    {
        id: 6,
        title: "메뉴 - 맵 - 세계 지도 - 지역 선택 - 스피나 이동",
        description: "세계 지도를 통해 원하는 지역으로 스피나(재화)를 소모하여 즉시 이동합니다.",
        image: "guide_06_map_move.png"
    },
    {
        id: 7,
        title: "메인퀘 요구 아이템",
        description: "메인 퀘스트 진행 시 필요한 아이템 목록입니다. (상세 내용은 이미지를 참조하세요)",
        image: "guide_07_quest_items.jpg"
    },
    {
        id: 8,
        title: "메뉴 - 방울구슬샵 - 특수 아이템",
        description: "보유한 유료 재화를 사용하여 특수 아이템을 구매하거나 확인합니다.",
        image: "guide_08_shop.png"
    },
    {
        id: 9,
        title: "메뉴 - 공지 - 다트",
        description: "매일 1회 무료로 이용 가능합니다. (매일 05시 갱신)",
        image: "guide_09_darts.png"
    },
    {
        id: 10,
        title: "메뉴 - 캐릭터 - 패러미터 전환",
        description: "새로운 유형의 캐릭터를 작성하거나, 기존 캐릭터로 변경/전환합니다.",
        image: "guide_10_parameter.png"
    },
    {
        id: 11,
        title: "메뉴 - 캐릭터 - 레지스트렛",
        description: "메인 퀘스트 진행 이후, '엘 스카로' 지역에서 해금되는 기능입니다.",
        image: "guide_11_regislet.png"
    },
    {
        id: 12,
        title: "메뉴 - 캐릭터 - 훈장 - 위클리",
        description: "매주 일요일 단위로 갱신되는 과제를 수행하고 훈장 보상을 획득합니다.",
        image: "guide_12_weekly.png"
    },
    {
        id: 13,
        title: "메뉴 - 캐릭터 - 장비 - 아바타 장비 - 능력 부여",
        description: "'요정의 봉재' 아이템을 활용하여 아바타 장비에 능력치를 부여합니다.",
        image: "guide_13_avatar_stats.png"
    }
];