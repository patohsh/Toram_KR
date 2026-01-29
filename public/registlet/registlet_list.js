const registletDB = {
    id: "registlet_list",
    name: "📍레지스트릿(박스) 리스트📍", // (Registlet List)
    url_param: "registlet",
    description: "레지스트릿(Gem Case)의 전체 목록입니다. 종류",
    items: [
        // ==================================================
        // 패시브 (공용)
        // ==================================================
        {
            category: "패시브",
            name: "최대 HP Up",
            obtain_lv: ["All"],
            description: "최대 Hp를 10 증가",
            max_lv_info: "Lv.100/1000"
        },
        {
            category: "패시브",
            name: "최대 MP Up",
            obtain_lv: ["All"],
            description: "최대 Mp를 1 증가",
            max_lv_info: "Lv.100/100"
        },
        {
            category: "패시브",
            name: "물리공격 Up",
            obtain_lv: ["All"],
            description: "Atk를 1 증가",
            max_lv_info: "Lv.50/50"
        },
        {
            category: "패시브",
            name: "마법공격 Up",
            obtain_lv: ["All"],
            description: "Matk를 1 증가",
            max_lv_info: "Lv.50/50"
        },
        {
            category: "패시브",
            name: "물리방어 Up",
            obtain_lv: ["All"],
            description: "Def를 1 증가",
            max_lv_info: "Lv.50/50"
        },
        {
            category: "패시브",
            name: "마법방어 Up",
            obtain_lv: ["All"],
            description: "Mdef를 1 증가",
            max_lv_info: "Lv.50/50"
        },
        {
            category: "패시브",
            name: "공격속도 Up",
            obtain_lv: ["All"],
            description: "Aspd를 1 증가",
            max_lv_info: "Lv.100/100"
        },
        {
            category: "패시브",
            name: "시전속도 Up",
            obtain_lv: ["All"],
            description: "Cspd를 1 증가",
            max_lv_info: "Lv.100/100"
        },
        {
            category: "패시브",
            name: "명중 Up",
            obtain_lv: ["All"],
            description: "명중을 1 증가",
            max_lv_info: "Lv.10/10"
        },
        {
            category: "패시브",
            name: "회피 Up",
            obtain_lv: ["All"],
            description: "회피를 1 증가",
            max_lv_info: "Lv.10/10"
        },
        // ==================================================
        // 블레이드 스킬
        // ==================================================
        {
            category: "블레이드 스킬",
            name: "하드히트:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(하드히트)의 위력을 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "블레이드 스킬",
            name: "엑섹 블레이드:연장",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "렉셀 블레이드의 파워업 판정을 1초 연장",
            max_lv_info: "Lv.20/20초"
        },
        {
            category: "블레이드 스킬",
            name: "트리거 슬래시:속성",
            obtain_lv: [90, 110, 130, 150, 220],
            description: "트리거 슬래시가 불속성에서 장비 무기 속성으로 변경",
            max_lv_info: "Lv.1/Max"
        },
        {
            category: "블레이드 스킬",
            name: "스파이럴 에어:강화",
            obtain_lv: [90, 110, 130, 150],
            description: "스파이럴 에어 위력을 2% 증가",
            max_lv_info: "Lv.20/40%"
        },
        {
            category: "블레이드 스킬",
            name: "소드 템페스트:연장",
            obtain_lv: [150, 170, 190, 210, 220],
            description: "소드 템페스트 횟수가 1회 증가",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "블레이드 스킬",
            name: "램페이지:회복",
            obtain_lv: [150, 170, 190, 210],
            description: "스킬:램페이지의 피니시 어택이 삭제되는 대신Hp를 50 회복하게 된다",
            max_lv_info: "Lv.10/500"
        },
        {
            category: "블레이드 스킬",
            name: "워크라이:극복",
            obtain_lv: [170, 190, 210, 220],
            description: "스킬:워크라이 발동이 공포에 방해를 받지 않는다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "블레이드 스킬",
            name: "버서크:억제",
            obtain_lv: [170, 190, 210, 220],
            description: "스킬:버서크 습득레벨 1당 10%의 확률로 램페이지 상태가 해제되지 않음",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "블레이드 스킬",
            name: "오라 블레이드:검압",
            obtain_lv: [220],
            description: "스킬:오라 블레이드의 대상이된 몬스터가 사정거리 밖이라면 충격파(단일공격)을 쏴 80%의 데미지 부여",
            max_lv_info: "Lv.8/80%"
        },
        {
            category: "블레이드 스킬",
            name: "소톰 블레이저:받아 넘기기",
            obtain_lv: [250],
            description: "스킬:스톰 블레이저에 가드체크가 추가되며, 가드에 성공 시 Mp회복량 두 배 증가",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 슛 스킬
        // ==================================================
        {
            category: "슛 스킬",
            name: "파워 슈트:강격",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬:파워 슈트에서 쓰러짐 성공 시 위력 15% 증가",
            max_lv_info: "Lv.20/300%"
        },
        {
            category: "슛 스킬",
            name: "원 휠:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬 원 휠의 위력을 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "슛 스킬",
            name: "애로 레인:추격",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬:애로 레인의 공격 횟수를 1회 증가",
            max_lv_info: "Lv.2/2회"
        },
        {
            category: "슛 스킬",
            name: "패러럴라이즈 샷:연장",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "강화효과 1초 연장",
            max_lv_info: "Lv.10/10초"
        },
        {
            category: "슛 스킬",
            name: "스모크 더스트:연장",
            obtain_lv: [150, 170, 190, 210],
            description: "스킬:스모크 더스트 대상의 강화 효과를 1초 연장",
            max_lv_info: "Lv.10/10초"
        },
        {
            category: "슛 스킬",
            name: "하이드 어택:시한",
            obtain_lv: [250],
            description: "스킬(하이드 어택)이 남은 횟수가 아니라 시간 버프로 변환",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "슛 스킬",
            name: "디코이 슈터:압축",
            obtain_lv: [250],
            description: "디코이 슈터의 지속시간이 절반이 되는 대신 위력을 10% 증가",
            max_lv_info: "Lv.10/100%"
        },
        // ==================================================
        // 매직 스킬
        // ==================================================
        {
            category: "매직 스킬",
            name: "술식/애로:추격",
            obtain_lv: [30, 50, 70, 90, 110, 130, 150],
            description: "스킬(술식/애로)에 원격 횟수 1회 추가",
            max_lv_info: "Lv.4/4발"
        },
        {
            category: "매직 스킬",
            name: "술식/월:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(술식/월)의 위력을 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "매직 스킬",
            name: "술식/랜서:가속",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(술식/랜스)의 발사 간격이 0.1초 빨라진다",
            max_lv_info: "Lv.5/0.5초"
        },
        {
            category: "매직 스킬",
            name: "술식/블래스트:가속",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(술식/블래스트)의 캐스팅 속도 0.2초 감소",
            max_lv_info: "Lv.5/1.0초"
        },
        {
            category: "매직 스킬",
            name: "술식/임팩트:투기",
            obtain_lv: [220, 250],
            description: "스킬(술식/임팩트)를 물리관성으로 변경",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "매직 스킬",
            name: "술식/스톰:연장",
            obtain_lv: [250],
            description: "스킬(술식/스톰)의 위력이 50% 감소하는 대신 지속시간 5초 증가",
            max_lv_info: "Lv.5/5초"
        },
        {
            category: "매직 스킬",
            name: "술식/폴:유성",
            obtain_lv: [230],
            description: "스킬(술식/폴) 이상부여, 사이즈가 크게 줄어드는 대신 착탄까지의 시간이 (0.0)초 단축되며 명중하지 않아도 모든 운석이 낙하",
            max_lv_info: "Lv.5/0.4초"
        },
        {
            category: "매직 스킬",
            name: "맥시마이저:전환",
            obtain_lv: [220],
            description: "스킬(맥시마이저)을 단일 개체로 사용했을 때 순간 발동 조건을 충족하지 않으면 차징 발동으올 전환",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "매직 스킬",
            name: "파워 웨이브:변화",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "사정 영창 효과 삭제 및 통상공격 위력 0% 증가(스킬레벨에 따라 증가치 변동)",
            max_lv_info: "Lv.10/10%"
        },
        // ==================================================
        // 마샬 스킬
        // ==================================================
        {
            category: "마샬 스킬",
            name: "스매시:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(스매시)을 토시로 사용 시 위력 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "소닉 웨이브:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(소닉 웨이브)을 토시로 사용 시 위력 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "마샬 스킬",
            name: "셸 브레이크:강화",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(쉘 브레이크)의 파괴확률 5% 증가",
            max_lv_info: "Lv.5/25%"
        },
        {
            category: "마샬 스킬",
            name: "어스 바인드:강화",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(어스바인드)을 권갑으로 사용했을 때 위력을 5% 증가",
            max_lv_info: "Lv.10/50%"
        },
        {
            category: "마샬 스킬",
            name: "마샬 마스터리:집중",
            obtain_lv: [150, 170, 190, 210],
            description: "권갑으로 사용했을 때 물리관통을 5% 추가",
            max_lv_info: "Lv.10/50%"
        },
        // ==================================================
        // 무사 스킬 (Mononofu)
        // ==================================================
        {
            category: "무사 스킬",
            name: "일섬:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(일섬)의 2타의 위력이 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "무사 스킬",
            name: "칼자루치기:방해",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬칼자루 치기의 넉백 부여 시간을 1초 연장",
            max_lv_info: "Lv.5/5초"
        },
        {
            category: "무사 스킬",
            name: "재앙베기:부적",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(재앙베기)의 마비 확률 5% 증가",
            max_lv_info: "Lv.6/30%"
        },
        {
            category: "무사 스킬",
            name: "명경지수:상투",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬 사용으로 횟수 제한X",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "무사 스킬",
            name: "삼단뚫기:부동",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(삼단뚫기)로 이동하지 않음",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "무사 스킬",
            name: "삼단뚫기:회피",
            obtain_lv: [220],
            description: "스킬(삼단뚫기)를 다수 사용했을 때, 대미지를 받지 않고 스킬 발동에 성공하면 Mp를 10 회복",
            max_lv_info: "Lv.10/100"
        },
        {
            category: "무사 스킬",
            name: "납도이동:삭재",
            obtain_lv: [230],
            description: "납도 이동을 발동하지 않게 된다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "무사 스킬",
            name: "불요불굴:불패",
            obtain_lv: [250],
            description: "1초 빨라지지만 데미지를 받으면 카운트가 9감소 하지만 Guard 및 특정 무사 스킬로 대미지를 방어할 경우 미감소",
            max_lv_info: "Lv.3/3"
        },
        // ==================================================
        // 할버드 스킬
        // ==================================================
        {
            category: "할버드 스킬",
            name: "플래시 스탭:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(플래시 스탭)의 위력을 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "할버드 스킬",
            name: "캐논 스피어:방해",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "1발째 100% 확률로 기죽음",
            max_lv_info: "Lv.10/100%"
        },
        {
            category: "할버드 스킬",
            name: "드래곤 테일:강화",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(드래곤 테일)의 2번째의 위력을 5% 증가",
            max_lv_info: "Lv.10/100%"
        },
        {
            category: "할버드 스킬",
            name: "역경의 사자후:적의",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(역경의 사자후)에서 발생하는 어그로량 300증가",
            max_lv_info: "Lv.10/3000"
        },
        {
            category: "할버드 스킬",
            name: "다이브 임팩트:수속",
            obtain_lv: [150, 170, 190, 210, 220],
            description: "대상에 박혀, 전체 공격으로 변화함. 섬광 내성 시간이 2초 짧아진다.",
            max_lv_info: "Lv.5/10초"
        },
        {
            category: "할버드 스킬",
            name: "크로노스 시프트:집념",
            obtain_lv: [250],
            description: "스킬(크로노스 시프트) 시전 Mp가 부족할 시 Hp를 소비해 발동가능. 부족 Mp100당 Hp 50% 소모",
            max_lv_info: "Lv.5/10%"
        },
        {
            category: "할버드 스킬",
            name: "버스터 랜스:멀리 던지기",
            obtain_lv: [220],
            description: "스킬(버스터 랜스)의 위력 10% 증가, 사정거리와 위력 감쇠 개시 거리 연장되어 항상 원거리 속성 고정",
            max_lv_info: "Lv.10/100%"
        },
        // ==================================================
        // 듀얼소드 스킬
        // ==================================================
        {
            category: "듀얼소드 스킬",
            name: "트윈 슬래시:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(트윈 슬래시)의 크리티컬 데미지 1% 증가",
            max_lv_info: "Lv.20/20%"
        },
        {
            category: "듀얼소드 스킬",
            name: "패링 소드:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(패링 소드)의 위력을 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "듀얼소드 스킬",
            name: "에어 슬라이드:압축",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(에어 슬라이드)의 효과 범위 감소, 넉백 삭제, 위력 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "듀얼소드 스킬",
            name: "드래곤 소드:회심",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(드레곤 소드)의 위력이 100% 자하하는 대신 확정 크리티컬 가능",
            max_lv_info: "Lv.10/10%"
        },
        {
            category: "듀얼소드 스킬",
            name: "팬텀 레이브:강화",
            obtain_lv: [150, 170, 190, 210],
            description: "스킬(팬텀 레이브)의 위력을 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "듀얼소드 스킬",
            name: "아크세이버:월영",
            obtain_lv: [230],
            description: "아크 세이버가 활성화 되어있는 동안 모든 어그로가 15% 감소. 단, 표적일 경우 활성화X",
            max_lv_info: "Lv.5/75%"
        },
        // ==================================================
        // 서바이벌 스킬
        // ==================================================
        {
            category: "서바이벌 스킬",
            name: "구명구급",
            obtain_lv: [230],
            description: "스킬(응급처치)에 발생하는 mp어그로를 1 감소. 최저 Mp 소모 100까지",
            max_lv_info: "Lv.10/10"
        },
        // ==================================================
        // 배틀 스킬 (매직 디바이스)
        // ==================================================
        {
            category: "배틀 스킬",
            name: "강타:극의",
            obtain_lv: [170, 190, 210, 220],
            description: "스킬:강타의 발동률이 1% 증가",
            max_lv_info: "Lv.5/5%"
        },
        {
            category: "배틀 스킬",
            name: "집중:극의",
            obtain_lv: [170, 190, 210, 220],
            description: "스킬:집중의 발동률이 1% 증가",
            max_lv_info: "Lv.5/5%"
        },
        {
            category: "배틀 스킬",
            name: "추격의 극의:강화",
            obtain_lv: [170, 190, 210, 220],
            description: "스킬:추격의 극의의 추격 발생률의 습득 레벨 1당 1% 증가",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 민스트럴 스킬
        // ==================================================
        {
            category: "민스트럴 스킬",
            name: "기타리스트",
            obtain_lv: [210, 220, 250],
            description: "노래 스킬(민스트럴)의 지속 재생력, 술법 해제의 시간이 짧아지는 대신 데미지 위그로만이 됨. 볼륨의 노래는 제외",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 다크파워 스킬
        // ==================================================
        {
            category: "다크파워 스킬",
            name: "대몬 크로우:수속",
            obtain_lv: [210, 220, 250],
            description: "스킬(대전 코러스)의 범위 100% 축소되는 대신, 인지범위의 적 1명당 스킬(블러드 바이트)의 위력을 30% 증가",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 서포트 스킬
        // ==================================================
        {
            category: "서포트 스킬",
            name: "리커버리:회복",
            obtain_lv: [170, 190, 210, 220],
            description: "스킬:리커버리에 HP회복 효과를 추가한다 회복량은 습득한 작은 힐의 10%",
            max_lv_info: "Lv.5/50%"
        },
        {
            category: "서포트 스킬",
            name: "힐:절약",
            obtain_lv: [170, 190, 210, 220],
            description: "스킬:힐의 Mp소모가 100 감소",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "서포트 스킬",
            name: "힐:비축",
            obtain_lv: [210, 220],
            description: "스킬:작은 힐과 힐의 회복량이 절반으로 감소하나 3초마다 버프스택 1개까지 쌓이며 파티원에게 해당 스킬 사용시 소비mp대신 스택을 소비",
            max_lv_info: "Lv.10/10개 까지 쌓이며"
        },
        // ==================================================
        // 매직 블레이드 스킬
        // ==================================================
        {
            category: "매직 블레이드 스킬",
            name: "레조넌스:집중",
            obtain_lv: [210],
            description: "스킬:레조넌스의 강화내용이 집중타입으로 고정되나 증가률은 90% 저하",
            max_lv_info: "Lv.9/50%"
        },
        {
            category: "매직 블레이드 스킬",
            name: "레조넌스:가속",
            obtain_lv: [190, 250],
            description: "스킬:레조넌스의 강화내용이 가속타입으로 고정되나 증가률은 90% 저하",
            max_lv_info: "Lv.9/50%"
        },
        {
            category: "매직 블레이드 스킬",
            name: "레조넌스:화력",
            obtain_lv: [170, 230],
            description: "스킬:레조넌스의 강화내용이 화력입으로 고정되나 증가률은 90% 저하",
            max_lv_info: "Lv.9/50%"
        },
        {
            category: "매직 블레이드 스킬",
            name: "에텔플레아:만능",
            obtain_lv: [170],
            description: "스킬:에테르 플레어는 대상에게 약점 속성으로 공격을 안해도 공격Mp회복이 가능해진다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "매직 블레이드 스킬",
            name: "에텔플레아:연장",
            obtain_lv: [220],
            description: "스킬:에텔플레아의 효과시간이 늘어나는 대신 공격Mp회복이 떨어진다",
            max_lv_info: "Lv.10/100%"
        },

        // ==================================================
        // 기사 스킬
        // ==================================================
        {
            category: "기사 스킬",
            name: "P디펜스:저소음",
            obtain_lv: [210],
            description: "스킬:P디펜스의 성공 시 발생하는 어그로를 10% 저하",
            max_lv_info: "Lv.10/100%",
        },
        {
            category: "기사 스킬",
            name: "소닉 스러스트:직격",
            obtain_lv: [230],
            description: "스킬:소닉 쓰러스트는 신속을 잃는 대신 Aboid 관통 효과 획득",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "기사 스킬",
            name: "레이지 소드:강화",
            obtain_lv: [190, 250],
            description: "스킬:레이지 소드 위력이 10% 증가하며 어그로가 자신에게 있는 경우 어그로 양이 두 배 증가",
            max_lv_info: "Lv.10/100%"
        },
        {
            category: "기사 스킬",
            name: "바인드 스트라이크:변화",
            obtain_lv: [210, 220],
            description: "스킬:바인드 스트라이크가 변화해 해당 대상에게만 기절을 가하고 정지효과를 제거",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "기사 스킬",
            name: "어솔트 어택:급행",
            obtain_lv: [190, 250],
            description: "스킬:어솔트 어택의 넉백과 둔족효과가 삭제되는 대신 위력이 10%증가",
            max_lv_info: "Lv.10/100%"
        },
        // ==================================================
        // 위자드 스킬
        // ==================================================
        {
            category: "위자드 스킬",
            name: "메테오 스트라이크:단발",
            obtain_lv: [170, 220, 230],
            description: "스킬:메테오 스트라이크의 운석 수가 1발이 되며 상태이상 부여도 없지만 낙하지점의 랜덤성이 없다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "위자드 스킬",
            name: "마나 크리스탈:가속",
            obtain_lv: [210, 220],
            description: "스킬:마나 크리스탈의 Mp회복량이 100저하되는 대신 영창 시간이 10%빨라진다",
            max_lv_info: "Lv.5/50%"
        },
        {
            category: "위자드 스킬",
            name: "패밀리어:전우",
            obtain_lv: [190, 220, 250],
            description: "스킬:패밀리어의 패밀리어가 도망갈 확률을 1%감소하고 하이 패밀리어 시전시 행동속도가 1초 빨라짐",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 어쌔신 스킬
        // ==================================================
        {
            category: "어쌔신 스킬",
            name: "쉐도우 워크:환혹",
            obtain_lv: [190, 220],
            description: "스킬:쉐도우 워크의 추가타가 관성을 발생하지 않음",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "어쌔신 스킬",
            name: "어쌔신 스탭:강화",
            obtain_lv: [210, 230],
            description: "스킬:어쌔신 스탭의 위력을 1%증가 추가로 백 스탭중 명중률10%증가",
            max_lv_info: "Lv.10/10%, 100%"
        },
        // ==================================================
        // 댄서 스킬
        // ==================================================
        {
            category: "댄서 스킬",
            name: "쇼트 퍼포먼스",
            obtain_lv: [190, 220],
            description: "댄서 스킬의 효과지속 시간이 5초 감소(응원의 춤 제외)",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 쉴드 스킬
        // ==================================================
        {
            category: "쉴드 스킬",
            name: "쉴드배쉬:절약",
            obtain_lv: [170, 230],
            description: "스킬:쉴드배쉬로 기절부여에 성공했을 때 Mp를 10 회복",
            max_lv_info: "Lv.10/100"
        },
        {
            category: "쉴드 스킬",
            name: "프로텍션 이지스",
            obtain_lv: [220],
            description: "스킬:프로텍션을 발동하면 습득한 이지스도 동시 발동 ※발동 스킬은 반대로도 가능",
            max_lv_info: "Lv.1 Max"
        },

        // ==================================================
        // 크러셔
        // ==================================================
        {
            category: "크러셔 스킬",
            name: "집기공:전력",
            obtain_lv: [170,230],
            description: "스킬:집기공의 효과가 없을 떄 Mp2000을 소비해 발동하면 기공의 수가 10%증가",
            max_lv_info: "Lv.10/100%"
        },
        {
            category: "크러셔 스킬",
            name: "플로팅 킥:회피",
            obtain_lv: [220],
            description: "스킬:플로팅 킥을 이동입력과 함께 사용시, 1초간 무적",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "크러셔 스킬",
            name: "집기공:전력",
            obtain_lv: [170, 230],
            description: "스킬:호흡법의 100Mp감소",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 헌터
        // ==================================================
        {
            category: "헌터 스킬",
            name: "페일 트래퍼",
            obtain_lv: [210, 220],
            description: "스킬:헌터스킬의 트랩을 몹 밑에 설치도 가능하지만 트랩이 즉발시 본인도 트랩효과 적용",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 프리스트
        // ==================================================
        {
            category: "프리스트 스킬",
            name: "하이네스 힐:확대",
            obtain_lv: [190, 230],
            description: "스킬:하이네스 힐의 유효범위가 1M증가, Hp회복량이 절반으로 감소",
            max_lv_info: "Lv.8/8m"
        },
        {
            category: "프리스트 스킬",
            name: "홀리 라이트:신벌",
            obtain_lv: [210, 250],
            description: "스킬:홀리라이트 명중시 1%확률로 빛속성 술식/피날레 lv1 발동",
            max_lv_info: "Lv.10/10"
        },
        // ==================================================
        // 닌자
        // ==================================================
        {
            category: "닌자 스킬",
            name: "풍마 수리검:강화",
            obtain_lv: [220],
            description: "스킬:풍마 수리검의 소비Mp 200증가 ,위력 상승횟수 1증가",
            max_lv_info: "Lv.2/100"
        },
        {
            category: "닌자 스킬",
            name: "화둔술:용염",
            obtain_lv: [220, 250],
            description: "스킬:화둔술의 영창 시간이 1초 증가하는 대신 2.5%의 마법관통을 얻습니다 변화시 마법관통의 증가량 2배",
            max_lv_info: "Lv.10/25%"
        },
        {
            category: "닌자 스킬",
            name: "풍둔술:발도",
            obtain_lv: [230],
            description: "스킬:풍둔술에 마관 5% 추가 변화스킬 발도속성 획득",
            max_lv_info: "Lv.10/50%"
        },
        // ==================================================
        // 특수 (노-스킬, 액티브 등)
        // ==================================================
        {
            category: "특수",
            name: "가사의 감",
            obtain_lv: [250],
            description: "한손검 장비시 예측 1%증가/ 방패 장비시 증가율 3배",
            max_lv_info: "Lv.5/5%"
        },
        {
            category: "특수",
            name: "구세주",
            obtain_lv: [130, 220],
            description: "파티 전멸상태일 때 부활시 10초간 무적상태로 전투",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "고양이 눈",
            obtain_lv: [30, 70, 220],
            description: "어둠 중에 Graze가능한 공격이 Miss인 경우 Graze로 승격",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "고체온",
            obtain_lv: [110, 220],
            description: "동결상태에서 통상공격 시 5% 확률로 동결해제",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "특수",
            name: "긴급Hp회복",
            obtain_lv: [30, 150],
            description: "몬스터에게 대미지를 받아 Hp가 25%이하기 됐을 때, 바로 Hp를 11%회복 발동후 60초간 재발동x",
            max_lv_info: "Lv.10/20%회복"
        },
        {
            category: "특수",
            name: "긴급Mp회복",
            obtain_lv: [50, 150],
            description: "Mp 부족시 바로 Mp10회복 60초 쿨타임",
            max_lv_info: "Lv.10/100 회복"
        },
        {
            category: "특수",
            name: "다크 달란트",
            obtain_lv: [250],
            description: "속성에 따라 변하는 스킬 효과를 어둠 속성으로 고정한다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "라이트 달란트",
            obtain_lv: [230],
            description: "속성에 따라 변화하는 스킬의 효과를 빛으로 고정",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "대미지 체크",
            obtain_lv: [250],
            description: "경고 에리어 밟을시 공격이 현재 Hp50%를 넘는 위력이면 채팅에 경고 메시지 표시",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "라스트히어로",
            obtain_lv: [90, 190],
            description: "파티원들이 자신을 제외하고 전멸시 자신의 Hp와 Mp를 전투불능 맴버1당 11%회복 300초 쿨타임",
            max_lv_info: "Lv.10/20%회복"
        },
        {
            category: "특수",
            name: "마력 불발",
            obtain_lv: [130, 150, 220],
            description: "마력 폭발시 살아남은 경우 즉시 mp100 회복",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "마력 후려치기",
            obtain_lv: [110, 220, 230],
            description: "공격 Mp회복을 잃는 대신 통상공격의 위력 증가 마회가 높을수록 위력증가",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "무의 자세",
            obtain_lv: [170, 250],
            description: "콤보 사용하지 않고 발동한 스킬 데미지1.01배 증가",
            max_lv_info: "Lv.10/1.10배"
        },
        {
            category: "특수",
            name: "몬스터 헌트",
            obtain_lv: [150, 250],
            description: "몹을 잡을시 Mp100회복 30초 쿨타임",
            max_lv_info: "Lv.10/20초"
        },
        {
            category: "특수",
            name: "맹독 회복",
            obtain_lv: [30, 50],
            description: "맹독에 의한 데미지 입을시 1%확률 맹독해제",
            max_lv_info: "Lv.30/30%"
        },
        {
            category: "특수",
            name: "불타는 투지",
            obtain_lv: [150,230],
            description: "발화로 데미지 받을시 공마회 Mp회복의 5%만큼 회복",
            max_lv_info: "Lv.10/50%"
        },
        {
            category: "특수",
            name: "사일런트 리차지",
            obtain_lv: [110,230],
            description: "침묵중 스킬:차징 사용시 Mp회복량 5%증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "특수",
            name: "실력확인",
            obtain_lv: [250],
            description: "자신의 부여 대미지를 대폭 억제 대신 파티 멤버의 exp획득 1%증가",
            max_lv_info: "Lv.10/10%"
        },
        {
            category: "특수",
            name: "수행자",
            obtain_lv: [10, 30, 50, 70, 90],
            description: "exp획득 10%증가 데미지14%감소",
            max_lv_info: "Lv.10/5% 감소"
        },
        {
            category: "특수",
            name: "스타트 대시",
            obtain_lv: [170, 220],
            description: "대상 몬스터의 어그로 획득시 6초간 통상공격 딜레이 0초 60초 쿨타임",
            max_lv_info: "Lv.5/10초"
        },
        {
            category: "특수",
            name: "스파이크",
            obtain_lv: [110, 130],
            description: "둔족으로 인한 이동저하 5% 경감",
            max_lv_info: "Lv.10/50%"
        },
        {
            category: "특수",
            name: "신경 제어",
            obtain_lv: [50, 70, 150],
            description: "마비에 의한 ASPD와 저항율 2%경감",
            max_lv_info: "Lv.30/60%"
        },
        {
            category: "특수",
            name: "쇼트 슬리퍼",
            obtain_lv: [90, 220],
            description: "수면의 지속 시간 10% 단축.",
            max_lv_info: "Lv.5/50%"
        },
        {
            category: "특수",
            name: "어보이드 세트",
            obtain_lv: [250],
            description: "Avoid를 사용할 수 없는 장비여도 사용가능",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "연타경감",
            obtain_lv: [150, 250],
            description: "기죽음이나 쓰러짐 기절등으로 행동 불가시 받는 대미지 1%경감",
            max_lv_info: "Lv.20/20%"
        },
        {
            category: "특수",
            name: "운명 공동체",
            obtain_lv: [70, 220],
            description: "자신을 제외한 파티원이 1명당 ATK와 MATK이 1% 증가, 파티 멤버가 전투불능이 될 때 마다 HP를 100% 감소(HP소비로 인한 전투 불능가능)",
            max_lv_info: "Lv.2/99%"
        },
        {
            category: "특수",
            name: "우뚝 버티고 서다",
            obtain_lv: [70, 90],
            description: "멈춰 서있으면 데미지 3% 경감",
            max_lv_info: "Lv.10/30%"
        },
        {
            category: "특수",
            name: "응급 수리",
            obtain_lv: [130, 250],
            description: "파괴의 효과로 받는 대미지 증가시 5%확률로 파괴 해제",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "특수",
            name: "외로움쟁이",
            obtain_lv: [90, 170, 250],
            description: "파티맴버가 근처에 있으면 10초마다 Hp100회복 / 없으면 10초마다 Hp100감소 (전투불능 x)",
            max_lv_info: "Lv.5"
        },
        {
            category: "특수",
            name: "절악슬",
            obtain_lv: [110, 250],
            description: "자동아이템 발동시 아이템 소모안하고 대신 딜레이2배 39초 쿨타임",
            max_lv_info: "Lv.10/30초"
        },
        {
            category: "특수",
            name: "철권",
            obtain_lv: [230],
            description: "맨손, 권갑(MAIN 온리)을 장비하면 방어 무너뜨리기가 5%증가한다 서브핸드가 맨손이라면 증가량이 3배가 된다",
            max_lv_info: "Lv.5/5%"
        },
        {
            category: "특수",
            name: "치유의 숲길",
            obtain_lv: [230],
            description: "힐 관련 레지스트릿의 회복 저하를 10%완화",
            max_lv_info: "Lv.10/100%"
        },
        {
            category: "특수",
            name: "최후의 저항",
            obtain_lv: [50, 170, 220],
            description: "파티원들이 전투불능시 마지막으로 힘을 내서 즉시 부활 6초 후 전투불가 상태가 된다 (부물 사용x)",
            max_lv_info: "Lv.5/10초"
        },
        {
            category: "특수",
            name: "커피 브레이크",
            obtain_lv: [130, 230],
            description: "몬스터를 죽일 때 Hp10% 회복 29초 쿨타임",
            max_lv_info: "Lv.10/20초"
        },
        {
            category: "특수",
            name: "트랜스퍼",
            obtain_lv: [150, 250],
            description: "최대 Mp 1000저하 자신이 전투 불능시 남은 Mp를 파티원에게 전송 (이 효과를 받은 플레이어는 180초 쿨타임 부여)",
            max_lv_info: "Lv.10/100"
        },
        {
            category: "특수",
            name: "타깃 신고",
            obtain_lv: [230],
            description: "자신에게 어그로시 파티채팅 자진신고, 길레시 say (겁나 시끄러움)",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "퇴근 연락",
            obtain_lv: [230],
            description: "전투 불능시 파티 채팅에 자진 신고, 길레시 say (매우 효과적임)",
            max_lv_info: "Lv.10/20초"
        },
        {
            category: "특수",
            name: "파이어 달란트",
            obtain_lv: [220],
            description: "속성에 따라 변화하는 스킬의 효과를 불속성으로 고정",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "워터 달란트",
            obtain_lv: [220],
            description: "속성에 따라 변화하는 스킬의 효과를 물속성으로 고정",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "원드 달란트",
            obtain_lv: [220],
            description: "속성에 따라 변화하는 스킬의 효과를 바람속으로 고정",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "랜드 달란트",
            obtain_lv: [220],
            description: "속성에 따라 변화하는 스킬의 효과를 땅속으로 고정",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "피투성이 전사",
            obtain_lv: [150],
            description: "출혈중 통상공격의 위력과 공격Mp회복 5%증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "특수",
            name: "패닉",
            obtain_lv: [150, 230],
            description: "3초마다 Mp 11회복, 어그로시 모든Mp 삭제 30초간 쿨타임 on",
            max_lv_info: "Lv.10/20회복"
        },
        {
            category: "특수",
            name: "펫 오브 어태커",
            obtain_lv: [110, 250],
            description: "주인의 데미지 저하, 펫 데미지 3%증가",
            max_lv_info: "Lv.10/30%"
        },
        {
            category: "특수",
            name: "펫 오브 탱커",
            obtain_lv: [90, 230],
            description: "주인이 받는 데미지 증가, 펫이 받는 데미지 3%감소",
            max_lv_info: "Lv.10/30%"
        },
        {
            category: "특수",
            name: "하이드 콤보",
            obtain_lv: [170, 230],
            description: "어그로량 1콤당 1%감소, 긴 콤보일수록 효과 증대",
            max_lv_info: "Lv.10/10%"
        },
        {
            category: "특수",
            name: "후방경계",
            obtain_lv: [130, 230],
            description: "카메라 방향의 후방에서 받는 데미지 1%감소, 바로 뒤일때 더욱 감소",
            max_lv_info: "Lv.10/10%"
        },
        {
            category: "특수",
            name: "햇볕 쬐기",
            obtain_lv: [10, 30, 50, 70, 220],
            description: "자연 회복 이모션 사용시 Mp회복량 25%증가",
            max_lv_info: "Lv.4/100%"
        },
    ]
};