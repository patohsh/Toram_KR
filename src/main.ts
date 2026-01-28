// src/main.ts
import './style.css';
// =================================================
// 0. 전역 상태 및 라우팅 설정 (신규 추가)
// =================================================

// 페이지 키 타입 정의
type PageKey = 'home' | 'schedule' | 'crysta' | 'skill' | 'ability' | 'registlet' | 'food' | 'equip' | 'guide' | 'info';

// 라우터 맵: 페이지 키와 렌더링 함수를 매핑
const routes: Record<PageKey, () => void> = {
    home: renderHomePage,
    schedule: renderSchedulePage,
    crysta: renderCrystaPage,
    skill: renderSkillPage,
    ability: renderAbilityPage,
    registlet: renderRegistletPage,
    food: renderFoodPage,
    equip: renderEquipmentPage,
    guide: renderGuidePage,
    info: renderInfoPage
};

// [기능] 페이지 이동 (History API 사용)
function navigate(page: PageKey) {
    // 현재 페이지와 같으면 무시 (중복 쌓임 방지)
    if (history.state && history.state.page === page) return;

    // 히스토리 스택에 추가
    history.pushState({ page }, '', `#${page}`);

    // 해당 페이지 렌더링
    routes[page]();

    // 페이지 이동 시 스크롤 최상단으로
    window.scrollTo(0, 0);
}

// [기능] 뒤로가기 핸들러 (PopState)
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        // 히스토리에 상태가 있으면 해당 페이지 렌더링
        const page = event.state.page as PageKey;
        if (routes[page]) routes[page]();
    } else {
        // 상태가 없으면(초기 진입 등) 홈으로
        renderHomePage();
    }
});

// [기능] PC 마우스 백버튼 이벤트 (mouseup)
function initMouseBackEvent() {
    window.addEventListener('mouseup', (e) => {
        // e.button === 3 : Browser Back Button (마우스 엄지 버튼 뒤로)
        // e.button === 4 : Browser Forward Button
        if (e.button === 3) {
            e.preventDefault(); // 기본 동작 방지 (일부 브라우저)
            history.back();
        }
    });
}

// =================================================
// 1. 토람 이벤트 스케줄 데이터
// =================================================
const eventSchedule = [
    { month: "연초", title: "신년맞이 이벤트" },
    { month: "1월", title: "메기스톤 & 고난도 (1분기)" },
    { month: "2월", title: "눈싸움 이벤트 / 발렌타인" },
    { month: "3월", title: "화이트데이" },
    { month: "4월", title: "벚꽃맞이 이벤트 / 고난도 (2분기)" },
    { month: "5월", title: "골든위크 / 황금 이벤트" },
    { month: "6월", title: "장마 이벤트" },
    { month: "7월", title: "여름 이벤트 / 주년제 이벤트 / 고난도 (3분기)" },
    { month: "8월", title: "이스터에그" },
    { month: "9월", title: "가을미각 / 황금포툼 / 고난도 (4분기)" },
    { month: "10월", title: "할로윈 이벤트" },
    { month: "11월", title: "크리스마스 이벤트" },
    { month: "상시/비정기", title: "N만명 다운로드 기념 / 콜라보 이벤트 / 복각" }
];

// =================================================
// 2. 앱 라우팅 및 렌더링
// =================================================

const app = document.querySelector<HTMLDivElement>('#app')!;

// --- [Page 1] 홈 화면 ---
function renderHomePage() {
    app.innerHTML = `
    <div class="home-container">
      <h1 class="home-title">🌸 토람 종합 정보정리 가이드</h1>
      
      <div class="menu-grid">
        <!-- 이벤트 스케줄 (구 옵션부여) -->
        <div class="menu-card" id="go-schedule">
          <div class="menu-icon">📅</div>
          <div class="menu-text">이벤트 스케줄</div>
        </div>
        
        <div class="menu-card" id="go-crysta">
          <div class="menu-icon">💎</div>
          <div class="menu-text">크리스타 검색</div>
        </div>
        
        <div class="menu-card" id="go-skill">
          <div class="menu-icon">📖</div>
          <div class="menu-text">스킬 정보</div>
        </div>

        <div class="menu-card" id="go-ability">
          <div class="menu-icon">🔮</div>
          <div class="menu-text">장비 어빌리티</div>
        </div>

        <div class="menu-card" id="go-registlet">
          <div class="menu-icon">💍</div>
          <div class="menu-text">레지스트릿</div>
        </div>

        <div class="menu-card" id="go-food">
          <div class="menu-icon">🍳</div>
          <div class="menu-text">요리 주소</div>
        </div>

        <div class="menu-card" id="go-equip">
          <div class="menu-icon">🛡️</div>
          <div class="menu-text">장비 검색</div>
        </div>

        <div class="menu-card" id="go-guide">
          <div class="menu-icon">📘</div>
          <div class="menu-text">뉴비 가이드</div>
        </div>

        <div class="menu-card" id="go-info">
          <div class="menu-icon">⭐</div>
          <div class="menu-text">참가자</div>
        </div>
      </div>
    </div>
  `;
    // 이벤트 바인딩 (navigate 함수 사용)
    document.getElementById('go-schedule')?.addEventListener('click', () => navigate('schedule'));
    document.getElementById('go-crysta')?.addEventListener('click', () => navigate('crysta'));
    document.getElementById('go-skill')?.addEventListener('click', () => navigate('skill'));
    document.getElementById('go-ability')?.addEventListener('click', () => navigate('ability'));
    document.getElementById('go-registlet')?.addEventListener('click', () => navigate('registlet'));
    document.getElementById('go-food')?.addEventListener('click', () => navigate('food'));
    document.getElementById('go-equip')?.addEventListener('click', () => navigate('equip'));
    document.getElementById('go-guide')?.addEventListener('click', () => navigate('guide'));
    document.getElementById('go-info')?.addEventListener('click', () => navigate('info'));
}
// --- [Page 2] 이벤트 스케줄 페이지 ---
function renderSchedulePage() {
    const listHtml = eventSchedule.map(item => `
    <div class="event-row" style="display:flex; padding:15px; border-bottom:1px dashed var(--border-color); align-items:center;">
      <div class="event-month" style="width:80px; font-weight:bold; color:var(--accent-pink); background:rgba(255,0,127,0.1); padding:5px 10px; border-radius:20px; text-align:center; margin-right:15px; flex-shrink:0;">
        ${item.month}
      </div>
      <div class="event-title" style="font-size:1.1rem; color:var(--text-main); line-height:1.4;">
        ${item.title}
      </div>
    </div>
  `).join('');

    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">📅 이벤트 스케줄</h2>
    </div>

    <div class="container" style="max-width:800px;">
      <div class="schedule-box" style="background:var(--card-bg); border:1px solid var(--border-color); border-radius:15px; padding:20px; box-shadow:0 4px 15px rgba(0,0,0,0.2);">
        ${listHtml}
      </div>

      <div style="text-align:center; margin-top:30px; color:#888; font-size:0.9rem;">
        ※ 일정은 운영사 사정에 따라 변경될 수 있습니다.
      </div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);
}

// --- [Page 2] 크리스타 페이지 (기능 구현 완료) ---
function renderCrystaPage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">💎 크리스타 검색기</h2>
    </div>

    <div class="search-container">
      <!-- 검색어 입력 -->
      <input type="text" id="nameInput" class="search-input" placeholder="크리스타 이름을 입력하세요 (실시간 검색)">

      <!-- 카테고리 필터 -->
      <div class="checkbox-group" id="category-filters">
        <input type="checkbox" id="normal" value="normal" checked> <label for="normal">노말</label>
        <input type="checkbox" id="weapon" value="weapon" checked> <label for="weapon">무기</label>
        <input type="checkbox" id="armor" value="armor" checked> <label for="armor">갑옷</label>
        <input type="checkbox" id="hat" value="hat" checked> <label for="hat">모자</label>
        <input type="checkbox" id="ring" value="ring" checked> <label for="ring">반지</label>
        
        <input type="checkbox" id="enhanced_normal" value="enhanced_normal"> <label for="enhanced_normal">노말(강화)</label>
        <input type="checkbox" id="enhanced_weapon" value="enhanced_weapon"> <label for="enhanced_weapon">무기(강화)</label>
        <input type="checkbox" id="enhanced_armor" value="enhanced_armor"> <label for="enhanced_armor">갑옷(강화)</label>
        <input type="checkbox" id="enhanced_hat" value="enhanced_hat"> <label for="enhanced_hat">모자(강화)</label>
        <input type="checkbox" id="enhanced_ring" value="enhanced_ring"> <label for="enhanced_ring">반지(강화)</label>
      </div>

      <!-- 옵션 필터 -->
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:center; width:100%;">
        <select id="optionType" style="padding:8px; border-radius:5px; background:var(--input-bg); color:white; border:1px solid var(--border-color);">
          <option value="none">옵션 선택 (전체)</option>
          <option value="STR%">STR %</option> <option value="STR">STR (고정)</option>
          <option value="DEX%">DEX %</option> <option value="DEX">DEX (고정)</option>
          <option value="INT%">INT %</option> <option value="INT">INT (고정)</option>
          <option value="AGI%">AGI %</option> <option value="AGI">AGI (고정)</option>
          <option value="VIT%">VIT %</option> <option value="VIT">VIT (고정)</option>
          <option value="ATK%">ATK %</option> <option value="ATK">ATK (고정)</option>
          <option value="MATK%">MATK %</option> <option value="MATK">MATK (고정)</option>
          <option value="크리티컬률%">크리티컬률 %</option> <option value="크리티컬률">크리티컬률 (고정)</option>
          <option value="크리티컬데미지%">크리티컬데미지 %</option> <option value="크리티컬데미지">크리티컬데미지 (고정)</option>
          <option value="최대HP%">최대HP %</option> <option value="최대HP">최대HP (고정)</option>
          <option value="최대MP%">최대MP %</option> <option value="최대MP">최대MP (고정)</option>
          <option value="공격속도%">공격속도 %</option> <option value="공격속도">공격속도 (고정)</option>
          <option value="시전속도%">시전속도 %</option> <option value="시전속도">시전속도 (고정)</option>
          <option value="행동속도%">행동속도 %</option> <option value="행동속도">행동속도 (고정)</option>
          <option value="안정률%">안정률 %</option>
          <option value="명중%">명중 %</option> <option value="명중">명중 (고정)</option>
          <option value="절대명중%">절대명중 %</option>
          <option value="회피%">회피 %</option> <option value="회피">회피 (고정)</option>
          <option value="물리내성%">물리내성 %</option>
          <option value="마법내성%">마법내성 %</option>
          <option value="이상내성%">이상내성 %</option>
          <option value="근거리위력%">근거리위력 %</option>
          <option value="원거리위력%">원거리위력 %</option>
          <option value="발도공격%">발도공격 %</option>
          <option value="어그로%">어그로 %</option>
          <option value="마법배리어">마법배리어</option> 
          <option value="물리배리어">물리배리어</option>
          <option value="비율배리어%">비율배리어 %</option>
          <option value="공격MP회복%">공격MP회복 %</option>
          <option value="공격MP회복">공격MP회복</option>
          <option value="MP자연회복%">MP자연회복 %</option>
          <option value="HP자연회복%">HP자연회복 %</option>

        </select>

        <select id="symbol" style="padding:8px; border-radius:5px; background:var(--input-bg); color:white; border:1px solid var(--border-color);">
          <option value="=">같음 (=)</option>
          <option value=">">큼 (>)</option>
          <option value="<">작음 (<)</option>
          <option value=">=">크거나 같음 (>=)</option>
          <option value="<=">작거나 같음 (<=)</option>
        </select>

        <input type="number" id="valueInput" placeholder="수치 입력" style="width:80px; padding:8px;">
      </div>
    </div>

    <div style="text-align:center; margin-bottom:20px;">
      <button id="randomButton" class="secondary">🎲 랜덤 크리스타 뽑기</button>
    </div>

    <!-- 결과 리스트 -->
    <div id="searchResults">
      <div style="text-align:center; padding:20px; color:#888;">검색 조건을 입력하거나 카테고리를 선택하세요.</div>
    </div>
  `;

    // 이벤트 바인딩
    document.getElementById('back-home')?.addEventListener('click', renderHomePage);

    // 실시간 검색 이벤트 연결
    const inputs = ['nameInput', 'optionType', 'symbol', 'valueInput'];
    inputs.forEach(id => {
        document.getElementById(id)?.addEventListener('input', performSearch);
        document.getElementById(id)?.addEventListener('change', performSearch);
    });

    // 체크박스 변경 시 검색
    document.querySelectorAll('#category-filters input').forEach(chk => {
        chk.addEventListener('change', performSearch);
    });

    document.getElementById('randomButton')?.addEventListener('click', performRandomPick);

    // 초기 검색 실행
    performSearch();
}

// --- [로직] 크리스타 검색 ---
const imageMap: Record<string, string> = {
    normal: 'CrystaImg/normal.png',
    enhanced_normal: 'CrystaImg/enhanced_normal.png',
    weapon: 'CrystaImg/weapon.png',
    enhanced_weapon: 'CrystaImg/enhanced_weapon.png',
    armor: 'CrystaImg/armor.png',
    enhanced_armor: 'CrystaImg/enhanced_armor.png',
    hat: 'CrystaImg/hat.png',
    enhanced_hat: 'CrystaImg/enhanced_hat.png',
    ring: 'CrystaImg/ring.png',
    enhanced_ring: 'CrystaImg/enhanced_ring.png'
};

// JSON 데이터 캐싱 (매번 fetch 안 하도록)
let crystaCache: Record<string, any[]> = {};

async function performSearch() {
    const nameQuery = (document.getElementById('nameInput') as HTMLInputElement).value.toLowerCase();
    const optionType = (document.getElementById('optionType') as HTMLSelectElement).value;
    const symbol = (document.getElementById('symbol') as HTMLSelectElement).value;
    const valueStr = (document.getElementById('valueInput') as HTMLInputElement).value;
    const value = parseFloat(valueStr);

    // 체크된 카테고리 확인
    const checkedBoxes = Array.from(document.querySelectorAll('#category-filters input:checked')) as HTMLInputElement[];
    const categories = checkedBoxes.map(cb => cb.value);

    if (categories.length === 0) {
        document.getElementById('searchResults')!.innerHTML = '<div style="text-align:center; padding:20px;">카테고리를 하나 이상 선택해주세요.</div>';
        return;
    }

    const resultsContainer = document.getElementById('searchResults')!;
    resultsContainer.innerHTML = '<div style="text-align:center; padding:20px;">검색 중...</div>';

    try {
        // 데이터 로드 (병렬 처리)
        const allData = await Promise.all(categories.map(async (cat) => {
            if (!crystaCache[cat]) {
                try {
                    const res = await fetch(`CrystaData/${cat}.json`);
                    if (!res.ok) throw new Error('File not found');
                    crystaCache[cat] = await res.json();
                } catch (e) {
                    console.warn(`Failed to load ${cat}.json`);
                    crystaCache[cat] = [];
                }
            }
            // 카테고리 정보 포함해서 리턴
            return crystaCache[cat].map(item => ({ ...item, _category: cat }));
        }));

        // 데이터 평탄화
        const flatData = allData.flat();

        // 필터링
        const filtered = flatData.filter(item => {
            // 1. 이름 검색
            if (nameQuery && !item.name.toLowerCase().includes(nameQuery)) return false;

            // 2. 옵션 검색
            if (optionType !== 'none') {
                // 옵션 문자열 분석 (예: "ATK+5%")
                // 정규식: 옵션명 뒤에 숫자가 오는지 확인
                // 주의: STR 검색 시 STR%가 걸리지 않도록 처리해야 함

                // 옵션 텍스트에 해당 옵션명이 있는지 확인
                if (!item.option.includes(optionType.replace('%', ''))) return false;

                // 정확한 매칭을 위해 파싱 (간이 파싱)
                // 옵션 문자열을 줄바꿈이나 쉼표로 분리해서 확인
                const stats = item.option.split(/\n|&|,/);
                const match = stats.some((statStr: string) => {
                    if (!statStr.includes(optionType.replace('%', ''))) return false;

                    // % 여부 체크
                    const hasPercent = statStr.includes('%');
                    const targetHasPercent = optionType.includes('%');
                    if (hasPercent !== targetHasPercent) return false;

                    // 수치 비교 (값이 입력되었을 때만)
                    if (!isNaN(value)) {
                        const numMatch = statStr.match(/-?\d+(\.\d+)?/);
                        if (!numMatch) return false;
                        const num = parseFloat(numMatch[0]);

                        if (symbol === '=') return num === value;
                        if (symbol === '>') return num > value;
                        if (symbol === '<') return num < value;
                        if (symbol === '>=') return num >= value;
                        if (symbol === '<=') return num <= value;
                    }
                    return true;
                });

                if (!match) return false;
            }
            return true;
        });

        // 결과 렌더링
        renderSearchResults(filtered);

    } catch (err) {
        console.error(err);
        resultsContainer.innerHTML = '<div style="text-align:center; color:red;">데이터 로딩 오류 발생</div>';
    }
}

function renderSearchResults(data: any[]) {
    const container = document.getElementById('searchResults')!;

    if (data.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px;">검색 결과가 없습니다.</div>';
        return;
    }

    container.innerHTML = data.map(item => {
        const imgSrc = imageMap[item._category] || 'CrystaImg/normal.png';
        // 옵션 텍스트 줄바꿈 처리
        const formattedOption = item.option.replace(/&/g, '<br>');

        return `
      <div class="crysta-item">
        <img src="${imgSrc}" alt="icon" onerror="this.src='CrystaImg/normal.png'">
        <h3>${item.name}</h3>
        <p style="margin-top:5px; font-size:0.9em; color:var(--text-main); font-weight:500;">${formattedOption}</p>

        ${item.enhance ? `<p style="margin-top:5px; font-size:0.8em; color:var(--accent-light);">[강화 전: ${item.enhance}]</p>` : ''}
      </div>
    `;
    }).join('');
}

async function performRandomPick() {
    const categories = Object.keys(imageMap); // 모든 카테고리
    const randomCat = categories[Math.floor(Math.random() * categories.length)];

    // 해당 카테고리 데이터 로드
    if (!crystaCache[randomCat]) {
        try {
            const res = await fetch(`CrystaData/${randomCat}.json`);
            crystaCache[randomCat] = await res.json();
        } catch {
            alert("데이터 로딩 실패");
            return;
        }
    }

    const list = crystaCache[randomCat];
    if (list.length === 0) {
        alert("해당 카테고리에 데이터가 없습니다.");
        return;
    }

    const item = list[Math.floor(Math.random() * list.length)];
    renderSearchResults([{ ...item, _category: randomCat }]);
}

// --- [Page 3] 스킬 정보 페이지 ---
// =================================================
// [Page 3] 스킬 정보 페이지 (한글화 + 경로 수정 완료)
// =================================================

// 1. 파일 매핑 (키: 한글 화면 표시용 / 값: 실제 파일 이름)
const skillFileMap: Record<string, Record<string, string>> = {
    '주무기': {
        '블레이드': 'skills_blade',
        '슛': 'skills_shot',
        '매직': 'skills_magic',
        '마샬': 'skills_martial',
        '듀얼소드': 'skills_dual_sword',
        '할버드': 'skills_halberd',
        '모노노후': 'skills_mononofu',
        '크러셔': 'skills_crusher',
        '스프라이트': 'skills_sprite'
    },
    '보조/생존': {
        '배틀': 'skills_battle',
        '서포트': 'skills_support',
        '서바이벌': 'skills_survival'
    },
    '강화/직업': {
        '대거': 'skills_dagger',
        '쉴드': 'skills_shield',
        '나이트': 'skills_knight',
        '헌터': 'skills_hunter',
        '프리스트': 'skills_priest',
        '어쌔신': 'skills_assassin',
        '위저드': 'skills_wizard',
        '가드': 'skills_guard'
    },
    '특수/책': {
        '닌자': 'skills_ninja',
        '인술': 'skills_ninjutsu',
        '민스트럴': 'skills_minstrel',
        '댄서': 'skills_dancer',
        '다크파워': 'skills_darkpower',
        '매직블레이드': 'skills_magicblade',
        '베어핸드': 'skills_barehand',
        '파르티잔': 'skills_partisan'
    },
    '생활': {
        '스미스': 'skills_smith',
        '연금술': 'skills_alchemy',
        '테이머': 'skills_tamer',
        '펫': 'skills_pet'
    }
};

// 2. 폴더 매핑 (한글 카테고리 -> 실제 영어 폴더명)
const folderMap: Record<string, string> = {
    '주무기': 'Main',
    '보조/생존': 'Assist',
    '강화/직업': 'Enforce',
    '특수/책': 'Book',
    '생활': 'Life'
};

function renderSkillPage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">📖 스킬정보</h2>
    </div>

    <div class="container">
      <!-- 대분류 탭 -->
      <div class="skill-tabs" id="main-category-tabs">
        <button class="skill-tab-btn active" data-cat="주무기">주무기</button>
        <button class="skill-tab-btn" data-cat="보조/생존">보조/생존</button>
        <button class="skill-tab-btn" data-cat="강화/직업">강화/직업</button>
        <button class="skill-tab-btn" data-cat="특수/책">특수/책</button>
        <button class="skill-tab-btn" data-cat="생활">생활</button>
      </div>

      <!-- 소분류 탭 -->
      <div class="skill-tabs" id="sub-category-tabs" style="background:transparent; padding-top:0;"></div>

      <!-- 스킬 트리 영역 -->
      <div class="skill-tree-wrapper">
        <div id="skill-grid" class="skill-columns-container">
          <div style="grid-column:1/-1; text-align:center; padding:50px; color:#888;">
            카테고리를 선택하세요.
          </div>
        </div>

        <!-- 하단 고정 상세 정보 -->
        <div id="skill-detail-view">
          <div style="text-align:center; color:#888;">스킬을 클릭하면 상세 정보가 여기에 표시됩니다.</div>
        </div>
      </div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);
    setupSkillTabs();
}

function setupSkillTabs() {
    const mainTabs = document.querySelectorAll('#main-category-tabs .skill-tab-btn');

    mainTabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            mainTabs.forEach(b => b.classList.remove('active'));
            (e.target as HTMLElement).classList.add('active');

            const cat = (e.target as HTMLElement).dataset.cat!;
            renderSubTabs(cat);
        });
    });

    // 초기 실행
    renderSubTabs('주무기');
}

function renderSubTabs(mainCat: string) {
    const container = document.getElementById('sub-category-tabs')!;
    container.innerHTML = '';

    const subCats = Object.keys(skillFileMap[mainCat]);

    subCats.forEach((subCat, idx) => {
        const btn = document.createElement('button');
        btn.className = `skill-tab-btn ${idx === 0 ? 'active' : ''}`;
        btn.innerText = subCat;
        btn.onclick = () => {
            document.querySelectorAll('#sub-category-tabs .skill-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadSkillData(mainCat, subCat);
        };
        container.appendChild(btn);
    });

    if (subCats.length > 0) loadSkillData(mainCat, subCats[0]);
}

async function loadSkillData(mainCat: string, subCat: string) {
    const grid = document.getElementById('skill-grid')!;
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px;">데이터 로딩 중...</div>';

    document.getElementById('skill-detail-view')!.classList.remove('active');

    const fileName = skillFileMap[mainCat][subCat];
    const folderName = folderMap[mainCat]; // 한글 -> 영어 폴더명 변환
    const filePath = `SkillData/${folderName}/${fileName}.js`;

    try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error('File not found');
        const text = await res.text();

        // JS 배열 파싱
        let jsonText = text.substring(text.indexOf('['), text.lastIndexOf(']') + 1);
        const skillsData = new Function(`return ${jsonText}`)();

        renderSkillColumns(skillsData, folderName, fileName);

    } catch (err) {
        console.error(err);
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:red;">데이터 로딩 실패<br>(${filePath})</div>`;
    }
}

function renderSkillColumns(skills: any[], mainCatFolder: string, fileName: string) {
    const grid = document.getElementById('skill-grid')!;
    grid.innerHTML = '';

    // Tier 분류
    const tiers: any[][] = [[], [], [], [], [], []];

    skills.forEach(skill => {
        const t = skill.tier || 1;
        if (t >= 1 && t <= 5) {
            tiers[t].push(skill);
        }
    });

    // 이미지 폴더명 추출 (예: skills_blade -> blade)
    const subFolder = fileName.replace('skills_', '');

    for (let i = 1; i <= 5; i++) {
        const col = document.createElement('div');
        col.className = 'skill-tier-column';

        col.innerHTML = `<div class="tier-label">Tier ${i}</div>`;

        if (tiers[i].length > 0) {
            tiers[i].forEach((skill: any) => {
                const card = document.createElement('div');
                card.className = 'skill-card';

                const imgName = (skill.id || skill.name).replace(/\s+/g, '_');
                const imgPath = `SkillImg/${mainCatFolder}/${subFolder}/${imgName}.png`;
                const fallbackImg = 'https://toram-id.info/img/skill/unknown.png';

                card.innerHTML = `
          <img src="${imgPath}" onerror="this.onerror=null; this.src='${fallbackImg}';" alt="${skill.name}">
          <div class="skill-name">${skill.name}</div>
        `;

                card.onclick = () => {
                    document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    showSkillDetail(skill, imgPath, fallbackImg);
                };

                col.appendChild(card);
            });
        } else {
            const empty = document.createElement('div');
            empty.style.height = '50px';
            empty.style.border = '1px dashed rgba(255,255,255,0.1)';
            empty.style.borderRadius = '6px';
            col.appendChild(empty);
        }

        grid.appendChild(col);
    }
}

function showSkillDetail(skill: any, imgSrc: string, fallback: string) {
    const view = document.getElementById('skill-detail-view')!;
    view.classList.add('active');

    const description = skill.description ? skill.description.replace(/\n/g, '<br>') : '설명 없음';

    let tags = '';
    if (skill.mp_cost) tags += `<span class="meta-tag" style="color:#4a90e2">MP ${skill.mp_cost}</span>`;
    if (skill.type) tags += `<span class="meta-tag">${skill.type}</span>`;
    if (skill.element) tags += `<span class="meta-tag" style="color:#e24a4a">${skill.element}</span>`;
    if (skill.weapon) tags += `<span class="meta-tag">${Array.isArray(skill.weapon) ? skill.weapon.join(', ') : skill.weapon}</span>`;

    view.innerHTML = `
    <div class="detail-header">
      <img src="${imgSrc}" onerror="this.onerror=null; this.src='${fallback}';" class="detail-icon">
      <div>
        <div class="detail-title">${skill.name}</div>
        <div class="detail-meta">${tags}</div>
      </div>
    </div>
    <div class="detail-desc">${description}</div>
  `;
}

// =================================================
// [초기화]
// =================================================
renderHomePage();

// =================================================
// [초기 실행] 홈 화면 표시
// =================================================
// --- [Page 4] 장비 어빌리티 검색 ---

let traitData: any[] = [];
let traitMeta: any = {};

function renderAbilityPage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">🔮 장비 어빌리티 검색</h2>
    </div>

    <div class="section">
      <!-- 1. 티어 정보 (범례) -->
      <h4 style="margin-bottom:10px;">📋 티어(Tier) 정보</h4>
      <div class="trait-legend" id="trait-legend-container">
        <span style="color:#888;">데이터 로딩 중...</span>
      </div>

      <!-- 2. 카테고리 선택 -->
      <div class="trait-tabs">
        <button class="trait-tab-btn active" data-cat="all">ALL</button>
        <button class="trait-tab-btn" data-cat="basic">기본 스탯</button>
        <button class="trait-tab-btn" data-cat="combat">전투/HP/MP</button>
        <button class="trait-tab-btn" data-cat="special">특수</button>
      </div>

      <!-- 3. 검색창 -->
      <div class="search-container" style="background:transparent; border:none; box-shadow:none; padding:0; margin-bottom:20px;">
        <input type="text" id="trait-search" class="search-input" placeholder="이름, 설명, 공식으로 검색..." style="width:100%; max-width:100%;">
      </div>

      <!-- 4. 결과 리스트 -->
      <div id="trait-results">
        <div style="grid-column:1/-1; text-align:center; padding:30px; color:#888;">
          데이터를 불러오는 중입니다...
        </div>
      </div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);

    // 탭 클릭
    const tabs = document.querySelectorAll('.trait-tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            (e.target as HTMLElement).classList.add('active');
            filterAndRenderTraits();
        });
    });

    // 검색어 입력
    document.getElementById('trait-search')?.addEventListener('input', filterAndRenderTraits);

    loadTraitData();
}

async function loadTraitData() {
    const resultsContainer = document.getElementById('trait-results');
    const legendContainer = document.getElementById('trait-legend-container');

    if (traitData.length > 0) {
        renderTraitLegend(legendContainer);
        filterAndRenderTraits();
        return;
    }

    try {
        const res = await fetch('traitDB/traitDB.js');
        if (!res.ok) throw new Error('Trait DB File not found');
        const text = await res.text();

        const objectText = text.substring(text.indexOf('{'));
        const db = new Function(`return ${objectText}`)();

        if (db && Array.isArray(db.items)) {
            traitData = db.items.map((item: any, index: number) => {
                let category = 'special';
                if (index < 5) category = 'basic';
                else if (index < 20) category = 'combat';
                return { ...item, category };
            });
            traitMeta = db.meta_info || {};

            renderTraitLegend(legendContainer);
            filterAndRenderTraits();
        } else {
            throw new Error('Invalid Data');
        }

    } catch (err) {
        console.error(err);
        if (resultsContainer) {
            resultsContainer.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#ff4444;">데이터 로딩 실패 (${err})</div>`;
        }
    }
}

function renderTraitLegend(container: HTMLElement | null) {
    if (!container || !traitMeta.circles) return;
    const circles = traitMeta.circles;
    const html = Object.entries(circles).map(([icon, desc]) =>
        `<div class="legend-item">
            <span style="font-size:1.4em; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));">${icon}</span>
            <span>${desc}</span>
        </div>`
    ).join('');
    container.innerHTML = html;
}

function filterAndRenderTraits() {
    const container = document.getElementById('trait-results');
    if (!container) return;

    const activeTab = document.querySelector('.trait-tab-btn.active') as HTMLElement;
    const currentCat = activeTab ? activeTab.dataset.cat : 'all';
    const searchInput = document.getElementById('trait-search') as HTMLInputElement;
    const keyword = searchInput.value.trim().toLowerCase();

    const filtered = traitData.filter(item => {
        if (currentCat !== 'all' && item.category !== currentCat) return false;
        if (keyword) {
            return item.name.toLowerCase().includes(keyword) ||
                item.name_en.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword) ||
                (item.formula && item.formula.toLowerCase().includes(keyword));
        }
        return true;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:#888;">검색 결과가 없습니다.</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="trait-card">
        <!-- 1. 헤더 (카테고리 텍스트 + 이름) -->
        <div class="trait-header">
            <span class="trait-cat-text" style="color:${getCatColor(item.category)}">
                [${getCatName(item.category)}]
            </span>
            <div style="flex:1;">
                <span class="trait-name">${item.name}</span>
                <span class="trait-en">(${item.name_en})</span>
            </div>
        </div>
        
        <!-- 2. 설명 박스 (요청하신 부분) -->
        <div class="trait-desc">${item.description}</div>
        
        <!-- 3. 하단 정보 박스 (공식, 티어 수치) -->
        ${(item.formula || item.tier_value) ? `
          <div class="trait-footer-box">
            ${item.formula ? `<div class="trait-formula">📐 공식: ${item.formula}</div>` : ''}
            ${item.tier_value ? `<div class="trait-tier-val">📊 수치: ${item.tier_value}</div>` : ''}
          </div>
        ` : ''}
      </div>
    `).join('');
}

function getCatColor(cat: string) {
    if (cat === 'basic') return '#8D6E63'; // Brown
    if (cat === 'combat') return '#E57373'; // Red
    return '#9575CD'; // Purple
}

function getCatName(cat: string) {
    if (cat === 'basic') return '기본';
    if (cat === 'combat') return '전투';
    return '특수';
}
// =================================================
// [Page 5] 레지스트릿 검색 (Registlet Search) - 수정됨
// =================================================

const REGISTLET_CATEGORIES = [
    "패시브", "블레이드 스킬", "슛 스킬", "매직 스킬", "마샬 스킬",
    "무사 스킬", "할버드 스킬", "듀얼소드 스킬", "크러셔 스킬",
    "매직 디바이스 스킬", "민스트럴 스킬", "다크파워 스킬",
    "기사 스킬", "어쌔신 스킬", "댄서 스킬", "쉴드 스킬", "특수"
];

const LEVEL_RANGES = {
    "All": (lv: any) => checkLevelRange(lv, 0, 300),
    "0~30": (lv: any) => checkLevelRange(lv, 0, 30),
    "30~100": (lv: any) => checkLevelRange(lv, 30, 100),
    "100~150": (lv: any) => checkLevelRange(lv, 100, 150),
    "150~200": (lv: any) => checkLevelRange(lv, 150, 200),
    "200~300": (lv: any) => checkLevelRange(lv, 200, 300)
};

function checkLevelRange(obtain_lv: any[], min: number, max: number) {
    if (obtain_lv.includes("All")) return true;
    return obtain_lv.some(val => typeof val === 'number' && val >= min && val <= max);
}

let registletData: any[] = [];

function renderRegistletPage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">💍 레지스트릿 검색</h2>
    </div>

    <div class="reg-search-container">
      
      <!-- 1. 레벨 필터 -->
      <div style="text-align:center; margin-bottom:10px; color:var(--accent-light); font-weight:bold;">획득 레벨 (Obtain Lv)</div>
      <div class="reg-lv-group">
        ${Object.keys(LEVEL_RANGES).map((range, idx) => `
          <input type="radio" name="lv-range" id="lv-${idx}" value="${range}" ${range === 'All' ? 'checked' : ''}>
          <label for="lv-${idx}">${range}</label>
        `).join('')}
      </div>

      <hr style="border:0; border-top:1px solid var(--border-color); margin:20px 0;">

      <!-- 2. 스킬 종류 (Category) - 버튼형 -->
      <div style="text-align:center; margin-bottom:10px; color:var(--accent-light); font-weight:bold;">스킬 종류 (Category)</div>
      <div class="reg-cat-group" id="reg-cat-filters">
        <!-- '전체' 버튼 -->
        <input type="radio" name="cat-select" id="cat-all" value="All" checked>
        <label for="cat-all">전체</label>
        
        <!-- 카테고리 버튼들 -->
        ${REGISTLET_CATEGORIES.map((cat, idx) => `
          <input type="radio" name="cat-select" id="cat-${idx}" value="${cat}">
          <label for="cat-${idx}">${cat}</label>
        `).join('')}
      </div>

      <hr style="border:0; border-top:1px solid var(--border-color); margin:20px 0;">

      <!-- 3. 이름 검색 -->
      <div class="reg-control-row">
        <span style="font-weight:bold;">이름 검색: </span>
        <input type="text" id="reg-name-input" class="search-input" style="margin:0; width:200px;" placeholder="검색어 입력...">
        <button id="btn-reg-search" style="padding:8px 20px;">검색</button>
      </div>
    </div>

    <!-- 결과 리스트 -->
    <div id="registlet-results">
      <div style="grid-column:1/-1; text-align:center; padding:20px; color:#888;">데이터 로딩 중...</div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);

    // 검색 버튼 이벤트
    document.getElementById('btn-reg-search')?.addEventListener('click', filterRegistlets);

    // 엔터키 지원
    document.getElementById('reg-name-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') filterRegistlets();
    });

    // 라디오 버튼(레벨, 카테고리) 변경 시 자동 검색 (선택사항: 원치 않으면 제거 가능)
    document.querySelectorAll('input[name="lv-range"], input[name="cat-select"]').forEach(el => {
        el.addEventListener('change', filterRegistlets);
    });

    loadRegistletData();
}

async function loadRegistletData() {
    const container = document.getElementById('registlet-results');
    if (!container) return;

    if (registletData.length > 0) {
        filterRegistlets();
        return;
    }

    try {
        const res = await fetch('registlet/registlet_list.js');
        if (!res.ok) throw new Error('File not found');
        const text = await res.text();

        const objectText = text.substring(text.indexOf('{'));
        const db = new Function(`return ${objectText}`)();

        if (db && Array.isArray(db.items)) {
            registletData = db.items;
            filterRegistlets();
        } else {
            throw new Error('Invalid data format');
        }

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#ff4444;">데이터 로딩 실패</div>`;
    }
}

function filterRegistlets() {
    const container = document.getElementById('registlet-results');
    if (!container) return;

    // 1. 검색어 (공백 제거 및 소문자 변환)
    const nameInput = document.getElementById('reg-name-input') as HTMLInputElement;
    const nameQuery = nameInput.value.trim().toLowerCase(); // ★ trim() 추가

    // 2. 카테고리 (라디오 버튼)
    const catRadio = document.querySelector('input[name="cat-select"]:checked') as HTMLInputElement;
    const selectedCat = catRadio ? catRadio.value : 'All';

    // 3. 레벨 (라디오 버튼)
    const lvRadio = document.querySelector('input[name="lv-range"]:checked') as HTMLInputElement;
    const selectedLvRange = lvRadio ? lvRadio.value : 'All';

    const filtered = registletData.filter(item => {
        // 이름 필터링 (★ item.name이 존재하는지 확인)
        if (nameQuery && (!item.name || !item.name.toLowerCase().includes(nameQuery))) {
            return false;
        }

        // 카테고리 필터링
        if (selectedCat !== 'All' && item.category !== selectedCat) return false;

        // 레벨 필터링
        // @ts-ignore
        const rangeCheck = LEVEL_RANGES[selectedLvRange];
        if (rangeCheck && !rangeCheck(item.obtain_lv)) return false;

        return true;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:20px; color:#888;">검색 결과가 없습니다.</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => {
        const lvText = Array.isArray(item.obtain_lv) ? item.obtain_lv.join(', ') : item.obtain_lv;
        return `
      <div class="registlet-card">
        <div class="reg-header">
          <span class="reg-category">${item.category}</span>
          <span class="reg-name">${item.name}</span>
        </div>
        <div class="reg-body">
          <div class="reg-desc">${item.description}</div>
          <div class="reg-meta">
            <span>🆙 ${item.max_lv_info}</span>
            <span>📍 Lv: ${lvText}</span>
          </div>
        </div>
      </div>
    `;
    }).join('');
}
// =================================================
// [Page 6] 요리 주소 검색 (Food Code)
// =================================================

const FOOD_CATEGORIES = [
    "전체 보기",
    "HP / MP / AMPR",
    "기본 스탯",
    "공격 관련",
    "속성 데미지 (유리)",
    "내성 / 방어 / 회피",
    "속성 내성",
    "기타"
];

let foodData: any[] = [];

function renderFoodPage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">🍳 요리 주소 검색</h2>
    </div>

    <div class="reg-search-container">
      <!-- 1. 카테고리 필터 (버튼형) -->
      <div class="reg-cat-group" id="food-cat-filters">
        ${FOOD_CATEGORIES.map((cat, idx) => `
          <input type="radio" name="food-cat" id="f-cat-${idx}" value="${cat}" ${idx === 0 ? 'checked' : ''}>
          <label for="f-cat-${idx}">${cat}</label>
        `).join('')}
      </div>

      <hr style="border:0; border-top:1px solid var(--border-color); margin:20px 0;">

      <!-- 2. 검색어 입력 -->
      <div class="reg-control-row" style="justify-content:center;">
        <input type="text" id="food-search-input" class="search-input" placeholder="요리 이름 검색..." style="width:100%; max-width:400px;">
      </div>
    </div>

    <!-- 결과 리스트 -->
    <div id="food-results" class="food-list-container">
      <div style="text-align:center; padding:20px; color:#888;">데이터 로딩 중...</div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);

    // 이벤트 연결
    document.querySelectorAll('input[name="food-cat"]').forEach(el => {
        el.addEventListener('change', filterFoodCodes);
    });

    document.getElementById('food-search-input')?.addEventListener('input', filterFoodCodes);

    loadFoodData();
}
async function loadFoodData() {
    const container = document.getElementById('food-results')!;

    if (foodData.length > 0) {
        filterFoodCodes();
        return;
    }

    try {
        const res = await fetch('FoodCode.js');
        if (!res.ok) throw new Error('File not found');
        const text = await res.text();

        // 1. "const FoodCode =" 부분 찾기
        const eqIndex = text.indexOf('=');
        if (eqIndex === -1) throw new Error('Invalid JS format');

        // 2. 등호 뒤의 객체 내용만 추출 ({ ... })
        let jsonContent = text.substring(eqIndex + 1).trim();

        // 3. 끝에 세미콜론(;) 제거
        if (jsonContent.endsWith(';')) {
            jsonContent = jsonContent.slice(0, -1);
        }

        // 4. 문자열을 실제 자바스크립트 객체로 변환
        const dataObj = new Function(`return ${jsonContent}`)();

        // 5. 객체 내부의 'items' 배열을 가져옴
        if (dataObj && Array.isArray(dataObj.items)) {
            foodData = dataObj.items; // ★ 여기가 핵심 수정 포인트
            filterFoodCodes();
        } else {
            throw new Error('Data structure mismatch: .items array not found');
        }

    } catch (err) {
        console.error('Food Data Load Error:', err);
        container.innerHTML = `<div style="text-align:center; color:#ff4444;">
      데이터 로딩 실패<br>
      <span style="font-size:0.8rem; color:#aaa;">${err}</span>
    </div>`;
    }
}
function filterFoodCodes() {
    const container = document.getElementById('food-results');
    if (!container) return;

    const searchInput = document.getElementById('food-search-input') as HTMLInputElement;
    const keyword = searchInput.value.trim().toLowerCase();

    const catRadio = document.querySelector('input[name="food-cat"]:checked') as HTMLInputElement;
    const selectedCat = catRadio ? catRadio.value : "전체 보기";

    const filtered = foodData.filter((item: any) => {
        // 카테고리 필터
        if (selectedCat !== "전체 보기" && item.category !== selectedCat) return false;

        // 검색어 필터
        if (keyword) {
            const matchName = item.name.toLowerCase().includes(keyword);
            const matchEn = item.name_en ? item.name_en.toLowerCase().includes(keyword) : false;
            return matchName || matchEn;
        }
        return true;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:#888;">검색 결과가 없습니다.</div>`;
        return;
    }

    container.innerHTML = filtered.map((item: any) => {
        // 코드 버튼 생성
        const codesHtml = item.codes.map((codeObj: any) => `
      <button class="code-btn" onclick="copyToClipboard('${codeObj.code}')">
        <span class="code-val">${codeObj.code}</span>
        <span class="code-lv">Lv ${codeObj.lv}</span>
      </button>
    `).join('');

        return `
      <div class="food-card">
        <div class="food-header">
          <span class="food-cat-badge">${item.category}</span>
          <div class="food-name">
            ${item.name} <span class="food-en">(${item.name_en})</span>
          </div>
        </div>
        <div class="food-codes">
          ${codesHtml}
        </div>
      </div>
    `;
    }).join('');
}

// 전역 함수로 등록 (onclick에서 호출하기 위해)
(window as any).copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        alert(`코드 복사 완료: ${text}`);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
};

// =================================================
// [Page 7] 장비 & 파밍 검색 (Advanced)
// =================================================

// 1. 일반 장비 카테고리
const EQUIP_CATEGORIES: Record<string, string> = {
    'Handed_Sword': '한손검',
    'Two_Handed_Sword': '양손검',
    'bow': '활',
    'bowgun': '보우건',
    'staff': '지팡이',
    'magicdevice': '마도구',
    'knuckle': '너클',
    'halberd': '선풍창',
    'katana': '발도검',
    'armor': '몸장비',
    'additional': '추가장비',
    'shield': '방패'
};
// 2. 파밍 장비 카테고리 (폴더명 : 화면 표시 이름)
const FARMING_CATEGORIES: Record<string, string> = {
    'Weapon': '무기 (Weapon)',
    'Armor': '옷 (Armor)',
    'Arrow': '화살 (Arrow)',
    'Dagger': '단검 (Dagger)',
    'Farming_Additional': '추가장비 (Farming_Additional)'
};

// 3. 파밍용 하위 태그 (Sub-filters)
const FARMING_TAGS: Record<string, string[]> = {
    'Weapon': ['전체'],
    'Armor': ['전체'],
    'Arrow': [
        '전체',
        '무속성', '불속성', '물속성', '바람속성', '땅속성', '빛속성', '어둠속성'
    ],
    'Dagger': [
        '전체',
        '대장간/드랍', '퀘스트', '필드/보스', '한정/이벤트'
    ],
    'Farming_Additional': [
        '전체', '근거리', '원거리', '마법', '탱커', '발도', '서포터'
    ]
};
// 상태 변수
let currentEquipData: any[] = [];
let filteredEquipData: any[] = [];
let currentCategory = 'Handed_Sword';
let currentSubTag = '전체';
let isFarmingMode = false;
let equipCurrentPage = 1;
const ITEMS_PER_PAGE = 9;

function renderEquipmentPage() {
    const categories = isFarmingMode ? FARMING_CATEGORIES : EQUIP_CATEGORIES;
    const modeBtnText = isFarmingMode ? "🔄 일반 장비 보기" : "🌿 파밍 장비 보기";
    const modeBtnClass = isFarmingMode ? "btn-mode-farming active" : "btn-mode-farming";

    // 파밍 모드일 때만 태그 버튼 표시
    let tagsHtml = '';
    if (isFarmingMode && FARMING_TAGS[currentCategory] && FARMING_TAGS[currentCategory].length > 1) {
        tagsHtml = `<div class="skill-tabs sub-tags" id="farming-sub-tags" style="margin-top:10px;">
      ${FARMING_TAGS[currentCategory].map(tag => `
        <button class="skill-tab-btn ${tag === currentSubTag ? 'active' : ''}" data-tag="${tag}">
          ${tag.replace('화살: ', '').replace('단검: ', '')}
        </button>
      `).join('')}
    </div>`;
    }

    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">
        ${isFarmingMode ? '🌿 파밍 장비 도감' : '🛡️ 일반 장비 검색'}
      </h2>
    </div>

    <div class="container">
      <div style="text-align:right; margin-bottom:10px;">
        <button id="btn-toggle-mode" class="${modeBtnClass}">${modeBtnText}</button>
      </div>

      <!-- 메인 카테고리 -->
      <div class="skill-tabs" id="equip-category-tabs">
        ${Object.entries(categories).map(([key, name]) => `
          <button class="skill-tab-btn ${key === currentCategory ? 'active' : ''}" data-cat="${key}">
            ${name}
          </button>
        `).join('')}
      </div>

      <!-- 파밍용 서브 태그 -->
      ${tagsHtml}

      <div class="search-container" style="background:transparent; border:none; padding:0; margin-bottom:20px;">
        <input type="text" id="equip-search" class="search-input" placeholder="이름 검색 (한글/영어)...">
      </div>

      <div id="equip-grid" class="equip-grid-container">
        <div style="grid-column:1/-1; text-align:center; padding:50px; color:#888;">데이터 로딩 중...</div>
      </div>

      <div class="pagination" id="equip-pagination"></div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);

    // 모드 전환
    document.getElementById('btn-toggle-mode')?.addEventListener('click', () => {
        isFarmingMode = !isFarmingMode;
        currentCategory = isFarmingMode ? 'WeaponArmor' : 'Handed_Sword';
        currentSubTag = '전체';
        equipCurrentPage = 1;
        renderEquipmentPage();
    });

    // 카테고리 탭 클릭
    document.querySelectorAll('#equip-category-tabs .skill-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            currentCategory = target.dataset.cat!;
            currentSubTag = '전체';
            renderEquipmentPage();
        });
    });

    // 서브 태그 클릭
    document.querySelectorAll('#farming-sub-tags .skill-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            document.querySelectorAll('#farming-sub-tags .skill-tab-btn').forEach(b => b.classList.remove('active'));
            target.classList.add('active');

            currentSubTag = target.dataset.tag!;
            filterEquipment('');
        });
    });

    document.getElementById('equip-search')?.addEventListener('input', (e) => {
        const keyword = (e.target as HTMLInputElement).value.trim();
        filterEquipment(keyword);
    });

    loadEquipmentData(currentCategory);
}

async function loadEquipmentData(categoryName: string) {
    const grid = document.getElementById('equip-grid')!;
    const pagination = document.getElementById('equip-pagination')!;

    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:50px;">데이터 로딩 중...</div>';
    pagination.innerHTML = '';

    let filePath = '';

    if (isFarmingMode) {
        // [파밍 모드] 폴더는 'Farming' 하나로 고정!
        // 파일명만 카테고리 이름(Weapon, Armor...)을 따라감
        // 구조: public/Farming/Weapon.js

        // 만약 폴더 구조가 public/Farming/WeaponArmor/Weapon.js 라면:
        // filePath = `Farming/WeaponArmor/${categoryName}.js`;

        // 하지만 "폴더는 합쳐져 있다"고 하셨으므로:
        // 1. Weapon, Armor -> public/Farming/WeaponArmor/Weapon.js 
        // 2. Arrow, Dagger -> public/Farming/ArrowDagger/Arrow.js
        // 3. Additional -> public/Farming/Additional/Additional.js

        let subFolder = '';
        if (['Weapon', 'Armor'].includes(categoryName)) subFolder = 'WeaponArmor';
        else if (['Arrow', 'Dagger'].includes(categoryName)) subFolder = 'ArrowDagger';
        else subFolder = 'Farming_Additional';

        filePath = `Farming/${subFolder}/${categoryName}.js`;

    } else {
        // [일반 모드] 기존 방식 유지 (폴더명 = 파일명)
        filePath = `Equipment/${categoryName}/${categoryName}.js`;
    }

    try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`File not found: ${filePath}`);
        const text = await res.text();

        // JS 파싱 (기존 로직 유지)
        // 1. 등호(=) 찾기
        const eqIndex = text.indexOf('=');
        if (eqIndex === -1) throw new Error("Invalid JS format");

        // 2. 객체 부분 추출
        let jsonContent = text.substring(eqIndex + 1).trim();
        if (jsonContent.endsWith(';')) jsonContent = jsonContent.slice(0, -1);

        const dataObj = new Function(`return ${jsonContent}`)();

        let items = [];
        if (dataObj.items && Array.isArray(dataObj.items)) {
            items = dataObj.items;
        } else if (Array.isArray(dataObj)) {
            items = dataObj;
        } else {
            items = [];
        }

        currentEquipData = items.reverse();

        // 로드 후 필터링
        const searchInput = document.getElementById('equip-search') as HTMLInputElement;
        if (searchInput) searchInput.value = '';
        filterEquipment('');

    } catch (err) {
        console.error(err);
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#ff4444;">
      데이터 로딩 실패<br>(${filePath})<br>
      <span style="font-size:0.8rem; color:#aaa;">${err}</span>
    </div>`;
    }
}

function filterEquipment(keyword: string) {
    let filtered = currentEquipData;

    // 1. 태그 필터링 (파밍 모드일 때만)
    if (isFarmingMode && currentSubTag !== '전체') {
        filtered = filtered.filter((item: any) => {
            // 데이터의 category 필드가 존재하는지 확인 후 검사
            if (!item.category) return false;

            // 태그 이름에서 불필요한 접두사 제거 (UI와 데이터 매칭)
            // 예: "화살: 불속성" -> "불속성"
            let tagKey = currentSubTag;
            if (tagKey.includes(': ')) {
                tagKey = tagKey.split(': ')[1];
            }

            // 데이터의 카테고리 문자열에 태그 키워드가 포함되어 있는지 확인
            return item.category.includes(tagKey);
        });
    }

    // 2. 검색어 필터링 (이름 + 영문명 + ★스탯★)
    if (keyword) {
        const lowerKey = keyword.toLowerCase();
        filtered = filtered.filter((item: any) => {
            // 이름 검색
            const name = item.name ? item.name.toLowerCase() : '';
            const nameEn = item.name_en ? item.name_en.toLowerCase() : '';

            // ★ 스탯 검색 추가
            let statsText = '';
            if (item.stats) {
                if (Array.isArray(item.stats)) {
                    statsText = item.stats.join(' ').toLowerCase();
                } else {
                    statsText = item.stats.toLowerCase();
                }
            }

            // 이름이나 스탯 중에 키워드가 있으면 통과
            return name.includes(lowerKey) || nameEn.includes(lowerKey) || statsText.includes(lowerKey);
        });
    }

    filteredEquipData = filtered;

    // 검색 결과가 바뀌었으니 1페이지로 초기화
    equipCurrentPage = 1;
    renderEquipGrid();
    renderPagination();
}
function renderEquipGrid() {
    const grid = document.getElementById('equip-grid')!;
    grid.innerHTML = '';

    if (filteredEquipData.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:50px; color:#888;">검색 결과가 없습니다.</div>';
        return;
    }

    const start = (equipCurrentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filteredEquipData.slice(start, end);

    // 현재 카테고리가 이미지 숨김 대상인지 확인 (화살, 단검, 추가장비)
    const isNoImageCategory = isFarmingMode && ['Arrow', 'Dagger', 'Additional'].includes(currentCategory);

    // 그리드 스타일 변경 (이미지 없으면 좀 더 촘촘하게 보여주기 위해 클래스 추가 가능)
    // 여기선 기존 그리드 유지하되 내용물만 바꿈

    pageItems.forEach((item: any) => {
        const card = document.createElement('div');
        card.className = 'equip-card';

        // 스탯 텍스트 처리
        let statsHtml = '';
        if (item.stats) {
            const sText = Array.isArray(item.stats) ? item.stats.join('<br>') : item.stats.replace(/\n/g, '<br>');
            statsHtml = `<div class="equip-stats highlight" style="margin-top:10px;">${sText}</div>`;
        } else if (item.base_def || item.base_atk) {
            statsHtml = `<div class="equip-stats">${item.base_atk ? 'ATK: ' + item.base_atk : 'DEF: ' + item.base_def}</div>`;
        }

        // 카테고리 뱃지
        const catBadge = isFarmingMode && item.category ? `<span class="trait-cat-badge" style="margin-bottom:5px; display:inline-block;">${item.category}</span>` : '';

        // ★ 핵심 수정: 이미지가 필요한 경우에만 img 태그 생성
        let imgContent = '';
        if (!isNoImageCategory) {
            const rootFolder = isFarmingMode ? 'Farming' : 'Equipment';
            const subFolder = isFarmingMode && ['Weapon', 'Armor'].includes(currentCategory) ? 'WeaponArmor' : currentCategory;

            let imgFileName = item.image || (item.id ? (item.id.includes('.') ? item.id : `${item.id}.png`) : 'unknown.png');
            const basePath = `${rootFolder}/${subFolder}/${imgFileName}`;

            imgContent = `
        <div class="equip-img-box">
          <img src="${basePath}" 
            onerror="this.onerror=null; this.src='${basePath.replace('.png', '.jpg')}'; this.onerror=function(){this.src='https://toram-id.info/img/skill/unknown.png'}" 
            alt="${item.name}">
        </div>
      `;
        }

        card.innerHTML = `
      ${imgContent}
      <div class="equip-info" style="${isNoImageCategory ? 'width:100%; text-align:left;' : ''}">
        ${catBadge}
        <div class="equip-name" style="font-size:1.1rem;">${item.name}</div>
        <div class="equip-name-en" style="margin-bottom:5px;">${item.name_en || ''}</div>
        ${statsHtml}
      </div>
    `;
        grid.appendChild(card);
    });
}

function renderPagination() {
    const container = document.getElementById('equip-pagination')!;
    container.innerHTML = '';

    const totalPages = Math.ceil(filteredEquipData.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) return;

    const createBtn = (text: string, onClick: () => void, disabled: boolean) => {
        const btn = document.createElement('button');
        btn.innerText = text;
        btn.disabled = disabled;
        btn.onclick = onClick;
        return btn;
    };

    container.appendChild(createBtn('Prev', () => { equipCurrentPage--; renderEquipGrid(); renderPagination(); }, equipCurrentPage === 1));

    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.innerText = `${equipCurrentPage} / ${totalPages}`;
    container.appendChild(pageInfo);

    container.appendChild(createBtn('Next', () => { equipCurrentPage++; renderEquipGrid(); renderPagination(); }, equipCurrentPage === totalPages));
}
// =================================================
// [기능] 낮/밤 테마 토글 (Day/Night Switch)
// =================================================
function initGlobalFeatures() {
    // 1. 테마 버튼 (기존)
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle-btn';
    themeBtn.id = 'theme-btn';
    themeBtn.onclick = toggleTheme;
    document.body.appendChild(themeBtn);

    const savedTheme = localStorage.getItem('toram-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.innerText = '☀️ 낮 모드';
    } else {
        themeBtn.innerText = '🌙 밤 모드';
    }

    // 2. 상단 이동 버튼 (Top)
    const topBtn = document.createElement('button');
    topBtn.className = 'scroll-top-btn';
    topBtn.innerText = '⬆️ Top';
    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(topBtn);

    // 3. 홈 이동 버튼 (Home) - [추가됨]
    const homeBtn = document.createElement('button');
    homeBtn.className = 'float-home-btn';
    homeBtn.innerText = '🏠 Home';
    homeBtn.onclick = () => {
        navigate('home'); // 라우터 함수 호출
    };
    document.body.appendChild(homeBtn);

    // 스크롤 이벤트 감지 -> 버튼 2개 동시 표시/숨김
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            topBtn.classList.add('show');
            homeBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
            homeBtn.classList.remove('show');
        }
    });
}

function toggleTheme() {
    // (기존 동일)
    const body = document.body;
    const btn = document.getElementById('theme-btn') as HTMLButtonElement;
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        btn.innerText = '☀️ 낮 모드';
        localStorage.setItem('toram-theme', 'dark');
    } else {
        btn.innerText = '🌙 밤 모드';
        localStorage.setItem('toram-theme', 'light');
    }
}

// =================================================
// [Page 8] 뉴비 가이드 (Newbie Guide) - 탭 기능 추가
// =================================================

// 가이드 카테고리 설정
const GUIDE_TABS = [
    { id: 'menu', name: '메뉴 (기본)', file: 'guideData.js' },
    { id: 'money', name: '돈 벌기', file: 'money.js' },
    { id: 'raid', name: '레이드', file: 'raid.js' },
    { id: 'myroom', name: '마이룸', file: 'myroom.js' },
    { id: 'boss', name: '특수보스', file: 'boss.js' },
    { id: 'empty', name: '(준비중)', file: '' } // 공란
];

let currentGuideTab = 'menu'; // 현재 선택된 탭
let guideDataCache: Record<string, any[]> = {}; // 데이터 캐싱

function renderGuidePage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">📘 뉴비 가이드</h2>
    </div>

    <div class="container">
      
      <!-- 1. 상단 탭 (포스트잇 스타일) -->
      <div class="guide-tabs">
        ${GUIDE_TABS.map(tab => `
          <button class="guide-tab-btn ${tab.id === currentGuideTab ? 'active' : ''}" 
                  data-id="${tab.id}" 
                  ${!tab.file ? 'disabled' : ''}>
            ${tab.name}
          </button>
        `).join('')}
      </div>

      <!-- 2. 검색창 -->
      <div class="search-container" style="background:transparent; border:none; padding:0; margin-bottom:20px;">
        <input type="text" id="guide-search" class="search-input" placeholder="제목 또는 내용 검색...">
      </div>

      <!-- 3. 가이드 리스트 -->
      <div id="guide-list" class="guide-list-container">
        <div style="text-align:center; padding:50px; color:#888;">데이터 로딩 중...</div>
      </div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);

    // 탭 클릭 이벤트
    document.querySelectorAll('.guide-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.getAttribute('disabled') !== null) return;

            // UI 업데이트
            document.querySelectorAll('.guide-tab-btn').forEach(b => b.classList.remove('active'));
            target.classList.add('active');

            // 데이터 로드
            currentGuideTab = target.dataset.id!;
            loadGuideData(currentGuideTab);
        });
    });

    // 검색 이벤트
    document.getElementById('guide-search')?.addEventListener('input', (e) => {
        const keyword = (e.target as HTMLInputElement).value.trim();
        renderGuideItems(keyword);
    });

    // 초기 로드
    loadGuideData(currentGuideTab);
}

async function loadGuideData(tabId: string) {
    const container = document.getElementById('guide-list')!;

    // 캐시에 있으면 바로 사용
    if (guideDataCache[tabId]) {
        renderGuideItems('');
        return;
    }

    container.innerHTML = '<div style="text-align:center; padding:50px;">로딩 중...</div>';

    const tabInfo = GUIDE_TABS.find(t => t.id === tabId);
    if (!tabInfo || !tabInfo.file) {
        container.innerHTML = '<div style="text-align:center; padding:50px;">준비 중인 컨텐츠입니다.</div>';
        return;
    }

    try {
        // guideDB 폴더에서 파일 로드
        const res = await fetch(`guideDB/${tabInfo.file}`);
        if (!res.ok) throw new Error('File not found');
        const text = await res.text();

        // JS 파일 파싱 (const data = [...] 형태)
        const eqIndex = text.indexOf('=');
        let jsonContent = text.substring(eqIndex + 1).trim();
        if (jsonContent.endsWith(';')) jsonContent = jsonContent.slice(0, -1);

        const data = new Function(`return ${jsonContent}`)();

        // 캐시 저장 및 렌더링
        guideDataCache[tabId] = data;
        renderGuideItems('');

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div style="text-align:center; color:#ff4444;">가이드 데이터를 불러올 수 없습니다.<br>(${tabInfo.file})</div>`;
    }
}

function renderGuideItems(keyword: string) {
    const container = document.getElementById('guide-list');
    if (!container) return;

    container.innerHTML = '';

    const data = guideDataCache[currentGuideTab] || [];
    const lowerKey = keyword.toLowerCase();

    const filtered = data.filter((item: any) => {
        return item.title.toLowerCase().includes(lowerKey) || item.description.toLowerCase().includes(lowerKey);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:30px; color:#888;">검색 결과가 없습니다.</div>';
        return;
    }

    filtered.forEach((item: any) => {
        const card = document.createElement('div');
        card.className = 'guide-card';

        // 제목 화살표 변환
        const steps = item.title.split('-').map((s: string) => s.trim());
        const titleHtml = steps.join(' <span style="color:var(--accent-pink);">▶</span> ');

        // ★ 수정됨: 이미지가 있으면 <img> 태그 생성, 없으면 빈 문자열
        // onerror 제거: 이미지가 깨져도 엑박이나 빈 공간이 보여야 오류를 인지함.
        // 만약 이미지가 정말 없을 때만 숨기고 싶다면, 데이터에 image 필드가 있는지 체크하는 것만으로 충분.

        let imgContent = '';
        if (item.image) {
            // 이미지가 있으면 꽉 채워서 보여줌
            imgContent = `<div class="guide-img-box"><img src="GuideImg/${item.image}" alt="${item.title}"></div>`;
        }

        card.innerHTML = `
      ${imgContent}
      <div class="guide-content">
        <div class="guide-title-box">${titleHtml}</div>
        <div class="guide-desc">${item.description.replace(/\n/g, '<br>')}</div>
      </div>
    `;
        container.appendChild(card);
    });
}


// =================================================
// [Page 9] 정보 페이지 (Credits)
// =================================================

function renderInfoPage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">ℹ️ 정보 (Credits)</h2>
    </div>

    <div class="container" style="max-width:600px;">
      
      <div class="info-card">
        <h3>👑 제작</h3>
        <p><strong>제작/개발:</strong> patohsi </p>
        <p><strong>토람 닉네임 (toram name):</strong> aoiusagi </p>
      </div>

      <div class="info-card">
        <h3>🤝 참여자 (토람온라인 닉네임) </h3>
        <ul style="padding-left:20px; color:var(--text-dim);">
          <li>데이터 제공: 스왈로 </li>
          <li>이미지 도움: cat </li>
          <li>디자인 조언: last night C</li>
        </ul>
      </div>

      <div class="info-card">
        <h3>📚 참고 데이터</h3>
        <p>Toram Online Wiki, Coryn Club, 토람온라인 연구소, Aries 길드 </p>
      </div>

      <h3 style="margin-top:30px; border-bottom:1px solid #444; padding-bottom:10px;">🔗 관련 링크</h3>
      <div class="link-grid">
        <a href="https://github.com/patohsh/Toram_KR" target="_blank" class="link-box">
          <div class="link-icon">🐙</div>
          <div>GitHub</div>
        </a>
        <a href="https://toram.jp" target="_blank" class="link-box">
          <div class="link-icon">🌐</div>
          <div>Official Site</div>
        </a>
        <a href="https://coryn.club" target="_blank" class="link-box">
          <div class="link-icon">🛡️</div>
          <div>Coryn Club</div>
        </a>
        <a href="https://discord.com" target="_blank" class="link-box">
          <div class="link-icon">💬</div>
          <div>Discord</div>
        </a>
        <a href="https://youtube.com" target="_blank" class="link-box">
          <div class="link-icon">▶️</div>
          <div>YouTube</div>
        </a>
      </div>

      <div style="text-align:center; margin-top:50px; color:#666; font-size:0.8rem;">
        © 2025 Toram Tools. All rights reserved.<br>
        This is a fan-made site and is not affiliated with Asobimo Inc.
      </div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);
}

// 1. 마우스 백버튼 감지 시작
initMouseBackEvent();

// 2. 테마 및 탑버튼 초기화
initGlobalFeatures();

// 3. 앱 시작 (초기 진입 시 홈 화면)
// History 상태가 있으면 그 페이지로, 없으면 홈으로
if (history.state && history.state.page) {
    const page = history.state.page as PageKey;
    if (routes[page]) routes[page]();
    else renderHomePage();
} else {
    // 초기 URL 해시 확인 (예: #schedule)
    const hash = window.location.hash.replace('#', '') as PageKey;
    if (hash && routes[hash]) {
        // 해시가 있으면 해당 페이지로 이동 및 히스토리 대체
        history.replaceState({ page: hash }, '', `#${hash}`);
        routes[hash]();
    } else {
        // 기본 홈
        history.replaceState({ page: 'home' }, '', '#home');
        renderHomePage();
    }
}