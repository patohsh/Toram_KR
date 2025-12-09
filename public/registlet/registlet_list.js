const registletDB = {
    id: "registlet_list",
    name: "📍레지스트릿(박스) 리스트📍", // (Registlet List)
    url_param: "Registlet",
    description: "레지스트릿(Gem Case)의 전체 목록입니다. 종류, 획득 레벨, 상세 효과, 최대 레벨 및 변동 수치를 포함합니다. (데이터 출처: 레지스트릿 퍼스트 이미지)",
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
            name: "버서크:분노",
            obtain_lv: [90, 110, 130, 150, 228],
            description: "버서크 상태 중 틱데미지 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "블레이드 스킬",
            name: "워 크라이:안티 피어",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "워 크라이 버프의 지속시간 1초 연장",
            max_lv_info: "Lv.10/10초"
        },
        {
            category: "블레이드 스킬",
            name: "트리거 슬래시:가속",
            obtain_lv: [70, 110, 130, 190, 228],
            description: "트리거 슬래시가 불속성에서 회피 불가 속성으로 변경",
            max_lv_info: "Lv.1/Max"
        },
        {
            category: "블레이드 스킬",
            name: "스파이럴 에어:강타",
            obtain_lv: [90, 110, 130, 150, 190],
            description: "스파이럴 에어 틱데미지 2% 증가",
            max_lv_info: "Lv.20/40%"
        },
        {
            category: "블레이드 스킬",
            name: "소드 템페스트:연장",
            obtain_lv: [210, 228],
            description: "소드 템페스트 횟수가 1회 증가",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "블레이드 스킬",
            name: "램페이지:회복",
            obtain_lv: [150, 170, 190, 210],
            description: "소울 헌터의 피니시 어택 시(또는 대신) Hp를 50 회복하게 된다",
            max_lv_info: "Lv.10/500"
        },
        {
            category: "블레이드 스킬",
            name: "메테오 브레이크:파괴",
            obtain_lv: [170, 190, 210, 228],
            description: "스킬(메테오)이 공포에 피해 방해를 받지 않는다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "블레이드 스킬",
            name: "버서크:억제",
            obtain_lv: [170, 190, 210, 228],
            description: "스킬(버서크) 지속 레벨 1당 10%의 확률로 램페이지 상태가 해제되지 않음",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "블레이드 스킬",
            name: "오라 블레이드:연장",
            obtain_lv: [228],
            description: "오라 블레이드의 대상이 퀵 코스트가 사라지면 버프하면 술식/피날레 준비할 때 0.05%의 데미지 부여",
            max_lv_info: "Lv.8/40%"
        },
        {
            category: "블레이드 스킬",
            name: "소울 블레이드:가디언 회피 불가",
            obtain_lv: [258],
            description: "소울 블레이드 공격에 가드 불가 추가하며, 가드에 성공 시 Mp회복량 두 배 증가",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 슛 스킬
        // ==================================================
        {
            category: "슛 스킬",
            name: "파워 슈트:공격",
            obtain_lv: [30, 50, 70, 110, 190, 130],
            description: "스킬(파워 슈트)에서 스킬 성공 시 카이팅 15% 증가",
            max_lv_info: "Lv.20/300%"
        },
        {
            category: "슛 스킬",
            name: "원 휠:보호",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬 원 휠의 위력을 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "슛 스킬",
            name: "메로 레:우회",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(메로 레)의 원격 횟수를 1회 증가",
            max_lv_info: "Lv.2/2회"
        },
        {
            category: "슛 스킬",
            name: "패러럴라이즈 샷:연장",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "감화효과 1초 연장",
            max_lv_info: "Lv.10/10초"
        },
        {
            category: "슛 스킬",
            name: "스모크 더스트:보조 딜",
            obtain_lv: [150, 170, 190, 210],
            description: "스모크 더스트 대상의 암흑 효과를 1초 연장",
            max_lv_info: "Lv.10/10초"
        },
        {
            category: "슛 스킬",
            name: "하이드 어택:시선",
            obtain_lv: [258],
            description: "스킬(하이드 어택)이 남은 횟수가 아니라 시간 버프로 변환",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "슛 스킬",
            name: "디코이 슈터:위치 변환",
            obtain_lv: [258],
            description: "디코이 슈터의 주위에 원격 공격이 되는 대신 위력을 10% 증가",
            max_lv_info: "Lv.4/40%"
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
            name: "술식/랜스:가속",
            obtain_lv: [70, 90, 110, 130, 150],
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
            name: "술식/월:베리어:추가",
            obtain_lv: [220, 258],
            description: "스킬(술식/월)을 돌진형으로 변경",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "매직 스킬",
            name: "술식/스톰:연장",
            obtain_lv: [258],
            description: "스킬(술식/스톰)의 위력이 50% 감소하는 대신 지속시간 5초 증가",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "매직 스킬",
            name: "술식/폴:속성",
            obtain_lv: [220],
            description: "스킬(술식/폴) 사용부, 사이즈가 크게 줄어드는 대신 작열학적인 시간이 60초 단축되며 발동하지 않아도 모든 몬스터 낙하",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "매직 스킬",
            name: "맥시마이저:전환",
            obtain_lv: [228],
            description: "스킬(맥시마이저)을 단일 개체로 사용했을 때 급전 받는 조건을 충족하지 않으면 자힐 활동으로 변경",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "매직 스킬",
            name: "파워 웨이브:선회",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "사월 영창 효과 삭제 및 통상공격 위력 0% 증가(스킬레벨에 따라 증가치 변동)",
            max_lv_info: "Lv.10/10%"
        },
        // ==================================================
        // 마샬 스킬
        // ==================================================
        {
            category: "마샬 스킬",
            name: "스매시:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(스매시)을 도시로 사용 시 위력 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "소닉 웨이브:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(소닉 웨이브)을 도시로 사용 시 위력 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "마샬 스킬",
            name: "쉘 브레이크:강화",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(쉘 브레이크)의 파괴확률 5% 증가",
            max_lv_info: "Lv.10/50%"
        },
        {
            category: "마샬 스킬",
            name: "어스 바인드:강화",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(어스바인드)을 연격으로 사용했을 때 위력을 5% 증가",
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
            description: "스킬(일섬)의 2타 격의 위력이 5% 증가",
            max_lv_info: "Lv.20/100%"
        },
        {
            category: "무사 스킬",
            name: "하쿠쿠:치기:방해",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(하쿠쿠 치기)의 넉백 부여 시간을 1초 연장",
            max_lv_info: "Lv.5/5초"
        },
        {
            category: "무사 스킬",
            name: "궤모:파기:부적",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(궤모:파기)의 마비 확률 5% 증가",
            max_lv_info: "Lv.6/30%"
        },
        {
            category: "무사 스킬",
            name: "명경지수:상처",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬 사용으로 힐수 제어 X",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "무사 스킬",
            name: "삼단찌르기:무한",
            obtain_lv: [70, 90, 110, 130, 150, 220],
            description: "스킬(삼단찌르기)로 이동하지 않음",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "무사 스킬",
            name: "참인:불가시",
            obtain_lv: [228],
            description: "스킬(참인)을 다수 사용했을 때, 페널티를 받지 않고 스킬 발동에 성공하면 Mp를 10 회복",
            max_lv_info: "Lv.10/100"
        },
        {
            category: "무사 스킬",
            name: "납도이동:석재",
            obtain_lv: [228],
            description: "납도 이동을 발동하지 않게 된다(스킬 종료 효과의 카운트 업)",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "무사 스킬",
            name: "불요불굴:불패",
            obtain_lv: [258],
            description: "1로 떨어지지만 죽음에 달하는 카운터가 1감소 하지만 Guard 및 특정 무사 스킬로 데미지를 받으면 횟수 적립소",
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
            name: "캐논 스피어:포격",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "1발씩 100% 확률로 기피함",
            max_lv_info: "Lv.10/100%"
        },
        {
            category: "할버드 스킬",
            name: "드래곤 테일:강화",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(드래곤 테일)의 2동작의 위력을 5% 증가",
            max_lv_info: "Lv.10/50%"
        },
        {
            category: "할버드 스킬",
            name: "역경의 사자후:격려",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(역경의 사자후)로 회복하는 HP 500 증가",
            max_lv_info: "Lv.20/10000"
        },
        {
            category: "할버드 스킬",
            name: "다이브 임팩트:무적",
            obtain_lv: [150, 170, 190, 210, 228],
            description: "대상에 박혀, 유예 공격으로 변화함. 시전 중 2초 무적된다",
            max_lv_info: "Lv.1/Max"
        },
        {
            category: "할버드 스킬",
            name: "크로노스 드라이브:급유",
            obtain_lv: [258],
            description: "스킬(크로노스 드라이브) 시전 Mp가 부족할 시 Hp를 소비해 발동가능. 부족 Mp100당 Hp 50% 소모",
            max_lv_info: "Lv.1/Max"
        },
        {
            category: "할버드 스킬",
            name: "버스터 랜스:거리 단축",
            obtain_lv: [228],
            description: "스킬(버스터 랜스)의 위력 10% 증가, 사정거리와 위력 감소 거리 2M 연장되어 항상 유리한 속성 고정",
            max_lv_info: "Lv.10/100%"
        },
        // ==================================================
        // 듀얼소드 스킬
        // ==================================================
        {
            category: "듀얼소드 스킬",
            name: "트윈 슬래시:유혈",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(트윈 슬래시)의 크리티컬 데미지 1% 증가",
            max_lv_info: "Lv.20/20%"
        },
        {
            category: "듀얼소드 스킬",
            name: "패링 소드:강화",
            obtain_lv: [30, 50, 70, 90, 110, 130],
            description: "스킬(패링 소드)의 위력을 5% 증가",
            max_lv_info: "Lv.10/50%"
        },
        {
            category: "듀얼소드 스킬",
            name: "팬텀 슬래시:흡입",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(팬텀 슬래시)의 효과 1발이 감소 때 삭제되지만 1격당 위력 5% 증가",
            max_lv_info: "Lv.10/50%"
        },
        {
            category: "듀얼소드 스킬",
            name: "드래곤 소드:파심",
            obtain_lv: [70, 90, 110, 130, 150],
            description: "스킬(드래곤 소드)의 위력이 100% 증가하는 대신 확정 크리티컬 불가능",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "듀얼소드 스킬",
            name: "필로 에클레르:연장",
            obtain_lv: [150, 170, 190, 228],
            description: "스킬(필로 에클레르)의 버프를 5초 연장",
            max_lv_info: "Lv.6/30초"
        },
        {
            category: "듀얼소드 스킬",
            name: "샤이닝 크로스:강화",
            obtain_lv: [228],
            description: "아크 세이버가 생성될 5M 이내는 후진. 이외 어그로가 15% 감소. 단, M직일 경우 발생안함X",
            max_lv_info: "Lv.5/75%"
        },
        // ==================================================
        // 크러셔 스킬
        // ==================================================
        {
            category: "크러셔 스킬",
            name: "우발:부활",
            obtain_lv: [228],
            description: "스킬(우발)로 회복하는 Mp 100당 코스트 1 감소. 최대 Mp 소모 100까지",
            max_lv_info: "Lv.10/10"
        },
        // ==================================================
        // 스프라이트 스킬 (매직 디바이스)
        // ==================================================
        {
            category: "매직 디바이스 스킬",
            name: "정령:안식",
            obtain_lv: [170, 190, 210, 228],
            description: "스킬(정령)의 발동률이 1% 증가",
            max_lv_info: "Lv.5/5%"
        },
        {
            category: "매직 디바이스 스킬",
            name: "집중:국의",
            obtain_lv: [170, 190, 210, 228],
            description: "스킬(집중)의 발동률이 1% 증가",
            max_lv_info: "Lv.5/5%"
        },
        {
            category: "매직 디바이스 스킬",
            name: "주박의 체인:파괴",
            obtain_lv: [170, 190, 210, 228],
            description: "스킬(주박의 체인) 추가 발동률 스킬 레벨 1당 1% 증가",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 민스트럴 스킬
        // ==================================================
        {
            category: "민스트럴 스킬",
            name: "기타리스트",
            obtain_lv: [210, 228, 250],
            description: "노래 스킬(민스트럴)의 지속 재생력, 술법 해제의 시간이 짧아지는 대신 데미지 위그로만이 됨. 볼륨의 노래는 제외",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "민스트럴 스킬",
            name: "대전 코러스:수축",
            obtain_lv: [210, 228, 250],
            description: "스킬(대전 코러스)의 범위 100% 축소되는 대신, 인지범위의 적 1명당 스킬(블러드 바이트)의 위력을 30% 증가",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 다크파워 스킬
        // ==================================================
        {
            category: "다크파워 스킬",
            name: "새크리파이스:회복",
            obtain_lv: [170, 190, 210, 228],
            description: "스킬(새크리파이스)에 힐 무효 효과를 추가한다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "다크파워 스킬",
            name: "이터널 나이트메어:약화",
            obtain_lv: [170, 190, 210, 228],
            description: "스킬(이터널 나이트메어)의 Mp소모가 100 감소",
            max_lv_info: "Lv.10/1000"
        },
        {
            category: "다크파워 스킬",
            name: "블러디 바이트:강화",
            obtain_lv: [210, 220],
            description: "스킬(블러디 바이트) 사용 시 1개당 10%씩 위력이 증가 (최대 10개까지)",
            max_lv_info: "Lv.10/각각 10%"
        },
        // ==================================================
        // 기사 스킬
        // ==================================================
        {
            category: "기사 스킬",
            name: "오더 블레스:가호",
            obtain_lv: [210],
            description: "스킬(오더 블레스) 성공 시 발생하는 어그로를 10% 저하",
            max_lv_info: "Lv.5/50%"
        },
        {
            category: "기사 스킬",
            name: "소닉 쓰러스트:각격",
            obtain_lv: [228],
            description: "스킬(소닉 쓰러스트) 시전 시 에는 없는 대신 Avoid 공포 효과 획득",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "기사 스킬",
            name: "레이지 소드:강타",
            obtain_lv: [190, 220],
            description: "스킬(레이지 소드)의 위력이 10% 증가하며 어그로가 자신에게 있는 경우 어그로 양이 두 배 증가",
            max_lv_info: "Lv.10/100%"
        },
        // ==================================================
        // 위자드 스킬
        // ==================================================
        {
            category: "위자드 스킬",
            name: "메테오 스트라이크:신법",
            obtain_lv: [170, 220, 230],
            description: "스킬(메테오 스트라이크)의 공격 수가 1회의 비례 상태이상 부여는 없지만 낙하대점의 행동/날림 없다",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "위자드 스킬",
            name: "마나 크리스탈:가속",
            obtain_lv: [210, 220],
            description: "스킬(마나 크리스탈)의 Mp회복량이 100저하되는 대신 영창 시간이 100 빨라진다",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 어쌔신 스킬
        // ==================================================
        {
            category: "어쌔신 스킬",
            name: "쉐도우 워크:은형",
            obtain_lv: [190, 220],
            description: "스킬(쉐도우 워크)의 추격타가 더 이상 발생하지 않고 1회 한정으로 절대 회피",
            max_lv_info: "Lv.1/1회"
        },
        // ==================================================
        // 댄서 스킬
        // ==================================================
        {
            category: "댄서 스킬",
            name: "오토 퍼포먼스",
            obtain_lv: [190, 220],
            description: "댄서 스킬의 효과지속 시간이 5초 감소(공용 외 2종 제외)",
            max_lv_info: "Lv.1 Max"
        },
        // ==================================================
        // 쉴드 스킬
        // ==================================================
        {
            category: "쉴드 스킬",
            name: "쉴드 캐논:연장",
            obtain_lv: [228],
            description: "스킬(쉴드 캐논) 성공 기절부여에 성공했을 때 Mp를 10 회복",
            max_lv_info: "Lv.10/100"
        },
        // ==================================================
        // 특수 (노-스킬, 액티브 등)
        // ==================================================
        {
            category: "특수",
            name: "가사의 꿈",
            obtain_lv: [258],
            description: "한수(꿈)을 소비하면 패력이 1% 증가",
            max_lv_info: "Lv.5/5%"
        },
        {
            category: "특수",
            name: "구세주",
            obtain_lv: [130, 220],
            description: "방패 장비 시, 중상을 3회 10초동안 무적상태, 전투가능",
            max_lv_info: "Lv.1 Max"
        },
        {
            category: "특수",
            name: "고양이 눈",
            obtain_lv: [30, 70, 220],
            description: "Miss시 Graze가 발생했을 때 Mp 1 회복 (최대 10)",
            max_lv_info: "Lv.10/10"
        },
        {
            category: "특수",
            name: "스타트 대시",
            obtain_lv: [170, 220],
            description: "대상 몬스터 어그로를 끈 직후 폭발을 1회 30초간 공격력이 60% 증가하고 발동 후 60초간 재발동 하지 않음",
            max_lv_info: "Lv.10/5%"
        },
        {
            category: "특수",
            name: "스페어",
            obtain_lv: [110, 130],
            description: "화살 1개를 소비하고 재장전하지 않는다",
            max_lv_info: "Lv.50/50%"
        },
        {
            category: "특수",
            name: "산업 폐기물",
            obtain_lv: [50, 70, 150],
            description: "피격 시 ASPD와 저항율 2%경감",
            max_lv_info: "Lv.30/60%"
        },
        {
            category: "특수",
            name: "소프트 슬라이딩",
            obtain_lv: [90, 220],
            description: "수면의 지속 시간 10% 단축. Avoid를 사용할 수 없는 장비여도 사용가능",
            max_lv_info: "Lv.5/50%"
        },
        {
            category: "특수",
            name: "언더",
            obtain_lv: [110, 150],
            description: "기절이나 넉백 시, 기절 중으로 받는 데미지를 1% 경감",
            max_lv_info: "Lv.20/20%"
        },
        {
            category: "특수",
            name: "운명 공동체",
            obtain_lv: [70, 220],
            description: "자신을 제외한 파티원이 1명당 ATK와 MATK이 1% 감소하지만 파티 멤버가 전투불능이 될 때 마다 HP를 100% 힐(자신이 HP소비로 전투 불능이 아님)",
            max_lv_info: "Lv.2/99%"
        },
        {
            category: "특수",
            name: "철악슬",
            obtain_lv: [110, 150],
            description: "방어막 파괴 부여 시 공격력이 2배로 증가, 발동 후 30초 동안 재발동 하지 않음",
            max_lv_info: "Lv.10/300초"
        },
        {
            category: "특수",
            name: "자유의 숲길",
            obtain_lv: [228],
            description: "무무가 연출 시 몸이 무거워 1% 증가 - 보조무기가 맨손일 시 추가로 3배 복병 자샌 1회(어시스트) 파괴되어 일부 불가능 해진다",
            max_lv_info: "Lv.1/3%"
        },
        {
            category: "특수",
            name: "최후의 저항",
            obtain_lv: [50, 170, 220],
            description: "마지막으로 힘을 내서 즉시 무릎꿇지 않고 10초 후 전투불가 상태가 된다",
            max_lv_info: "Lv.1/10초"
        },
        {
            category: "특수",
            name: "트랜스퍼",
            obtain_lv: [150, 250],
            description: "파티원을 지원하는 Hp소비로 전환. 최대 Hp가 1000 저하되지만 자신의 전투 불능 시 파티원 Mp를 회복(이 효과로 Mp를 회복한 플레이어는 180초 동안 동일한 효과를 받지않음)",
            max_lv_info: "Lv.1 Max"
        }
    ]
};