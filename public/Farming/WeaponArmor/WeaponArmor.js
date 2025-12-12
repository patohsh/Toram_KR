const Armor = {
    id: "armor",
    name: "옷 (Armor)",
    url_param: "Armor",
    description: "캐릭터의 방어력을 담당하는 주 방어구입니다. 다양한 속성과 능력치를 제공합니다.",
    items: [
        {
            category: "", // 예: 제작, 드랍, 보스, 이벤트
            name: "",     // 아이템 이름
            name_en: "",  // 영문 이름 (선택)
            def: 0,       // 방어력
            stats: [],    // ["ATK+1%", "STR+2"] 형태의 옵션 배열
            drop: "",     // 획득처
            image: ""     // 이미지 파일명 (예: armor_image.png)
        }
        // 여기에 데이터를 추가하세요
    ]
};