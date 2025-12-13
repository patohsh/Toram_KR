// src/main.ts
import './style.css';

import {
    EnchantCategory,
    Grimoire,
    EnchantItem
} from './lib/Enchant/EnchantBase';

// ▼▼▼ 수정됨: StatTypes의 경로를 올바르게 변경했습니다 ▼▼▼
import { StatTypes } from './lib/Enchant/enums';
import { EnchantDoll } from './lib/Enchant/EnchantDoll';
import { EnchantStat } from './lib/Enchant/EnchantBuild';
import { enchantConfig } from './lib/Enchant/state';

// =================================================
// 1. 데이터베이스 구축
// =================================================

const catStatus = new EnchantCategory("Basic Stats");
const catAttack = new EnchantCategory("Attack");
const catCrit = new EnchantCategory("Critical");
const catDef = new EnchantCategory("Defense");
const catHpMp = new EnchantCategory("HP / MP");
const catSpeed = new EnchantCategory("Speed / Dodge");
const catElements = new EnchantCategory("Elements & DTE");

// 아이템 저장소 (초기 화면 렌더링용)
const items: Record<string, EnchantItem> = {};

function addItem(
    cat: EnchantCategory,
    id: string,
    name: string,
    potC: number | null,
    potM: number | null,
    limit: number,
    matType: number = 0
) {
    const item = cat.appendItem({
        baseId: id,
        potential: [potC ?? 0, potM ?? 0],
        limit: [[null, null], [limit, -1 * limit]],
        extraLimit: [[null, null], [null, null]],
        unitValue: [[1, 1], [1, 1]],
        materialPointType: matType as any,
        materialPointValue: [null, null],
        potentialConvertThreshold: [null, null]
    });

    (item.statBase as any).name = name;
    (item.statBase as any).hasMultiplier = (potM !== null && potM !== 0);

    // 아이템 저장 (나중에 쓰기 위해)
    items[id] = item;

    return item;
}

// --- 데이터 정의 (중복 제거됨) ---

// Stats
addItem(catStatus, 'str', 'STR', 5, 10, 50, 1);
addItem(catStatus, 'dex', 'DEX', 5, 10, 50, 1);
addItem(catStatus, 'int', 'INT', 5, 10, 50, 1);
addItem(catStatus, 'vit', 'VIT', 5, 10, 50, 1);
addItem(catStatus, 'agi', 'AGI', 5, 10, 50, 1);

// Attack
addItem(catAttack, 'atk', 'ATK', 3, 10, 50, 2);
addItem(catAttack, 'matk', 'MATK', 3, 10, 50, 5);
addItem(catAttack, 'ppierce', '물리관통', null, 20, 20, 2);
addItem(catAttack, 'mpierce', '마법관통', null, 20, 20, 5);

// Critical (변수 선언 대신 items 객체에 저장됨)
addItem(catCrit, 'cdmg', '크리티컬 데미지', 3, 10, 50, 5);
addItem(catCrit, 'crit', '크리티컬률', 1, 1, 50, 5);

// Defense
addItem(catDef, 'def', 'DEF', 3, 10, 50, 0);
addItem(catDef, 'mdef', 'MDEF', 3, 10, 50, 0);

// HP/MP & Speed
addItem(catHpMp, 'hp_regen', 'HP자연회복', 10, 20, 50, 4);
addItem(catHpMp, 'mp_regen', 'MP자연회복', 20, 40, 20, 5);
addItem(catSpeed, 'dodge', '회피', 3, 10, 50, 0);
addItem(catSpeed, 'acc', '명중', 10, 20, 50, 0);

// Elements
addItem(catElements, 'ele_fire', 'Element: 불', 100, null, 1, 5);
addItem(catElements, 'ele_water', 'Element: 물', 100, null, 1, 5);
addItem(catElements, 'ele_wind', 'Element: 바람', 100, null, 1, 5);
addItem(catElements, 'ele_earth', 'Element: 땅', 100, null, 1, 5);
addItem(catElements, 'ele_light', 'Element: 빛', 100, null, 1, 5);
addItem(catElements, 'ele_dark', 'Element: 어둠', 100, null, 1, 5);
addItem(catElements, 'dte_fire', '불속성 데미지 ', null, 5, 20, 5);
addItem(catElements, 'dte_water', ' 물속성 데미지 ', null, 5, 20, 5);
addItem(catElements, 'dte_wind', ' 바람속성 데미지 ', null, 5, 20, 5);
addItem(catElements, 'dte_earth', ' 땅속성 데미지 ', null, 5, 20, 5);
addItem(catElements, 'dte_light', ' 빛속성 데미지 ', null, 5, 20, 5);
addItem(catElements, 'dte_dark', ' 어둠속성 데미지 ', null, 5, 20, 5);

Grimoire.Enchant.categorys.push(catStatus, catAttack, catCrit, catDef, catHpMp, catSpeed, catElements);


// =================================================
// 2. 앱 라우팅 및 페이지 렌더링
// =================================================

const app = document.querySelector<HTMLDivElement>('#app')!;

// --- [Page 1] 홈 화면 ui결정---
function renderHomePage() {
    app.innerHTML = `
    <div class="home-container">
      <h1 class="home-title">🌸 토람 리모컨</h1>
      
      <div class="menu-grid">
        <!-- 기존 메뉴 -->
        <div class="menu-card" id="go-enchant">
          <div class="menu-icon">⚔️</div>
          <div class="menu-text">옵션 부여 시뮬레이션<br> (조정중)</div>
        </div>
        
        <div class="menu-card" id="go-crysta">
          <div class="menu-icon">💎</div>
          <div class="menu-text">크리스타 검색</div>
        </div>
        
        <div class="menu-card" id="go-skill">
          <div class="menu-icon">📖</div>
          <div class="menu-text">스킬 정보</div>
        </div>

        <!-- 신규 메뉴 4종 -->
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
          <div class="menu-icon">📖</div>
          <div class="menu-text">뉴비 가이드</div>
        </div>

        <div class="menu-card" id="go-info">
          <div class="menu-icon">⭐</div>
          <div class="menu-text">정보</div>
        </div>

      </div>
    </div>
  `;

    // 이벤트 바인딩
    document.getElementById('go-enchant')?.addEventListener('click', renderEnchantPage);
    document.getElementById('go-crysta')?.addEventListener('click', renderCrystaPage);
    document.getElementById('go-skill')?.addEventListener('click', renderSkillPage);

    // 신규 이벤트 바인딩
    document.getElementById('go-ability')?.addEventListener('click', renderAbilityPage);
    document.getElementById('go-registlet')?.addEventListener('click', renderRegistletPage);
    document.getElementById('go-food')?.addEventListener('click', renderFoodPage);
    document.getElementById('go-equip')?.addEventListener('click', renderEquipmentPage);
    document.getElementById('go-guide')?.addEventListener('click', renderGuidePage);
    document.getElementById('go-info')?.addEventListener('click', renderInfoPage);

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
          <option value="안정률%">안정률 %</option>
          <option value="명중%">명중 %</option> <option value="명중">명중 (고정)</option>
          <option value="회피%">회피 %</option> <option value="회피">회피 (고정)</option>
          <option value="물리내성%">물리내성 %</option>
          <option value="마법내성%">마법내성 %</option>
          <option value="근거리위력%">근거리위력 %</option>
          <option value="원거리위력%">원거리위력 %</option>
          <option value="발도공격%">발도공격 %</option>
          <option value="어그로%">어그로 %</option>
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
// --- [Page 4] 강화 시뮬레이터 (핵심 로직 포함) ---
function renderEnchantPage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">⚔️ 옵션부여 시뮬</h2>
    </div>

    <div>
      <div class="section">
        <h2>1. 초기설정</h2>
        <div style="margin-bottom: 15px;">
          <label><input type="radio" name="eqType" value="weapon" checked> 무기</label>
          <label><input type="radio" name="eqType" value="armor"> 방어구</label>
          <span style="margin:0 10px; color:#555">|</span>
          잠재력: <input type="number" id="base-pot" value="81">
        </div>
        <div style="display:flex; gap:15px; align-items:center;">
          <label> 캐릭터 Lv: <input type="number" id="char-lv" value="290"></label>
          <label> 스미스 Lv: <input type="number" id="smith-lv" value="290"></label>
        </div>
      </div>

      <div class="section">
        <h2>2. ➕ 옵션 (Positive)</h2>
        <div id="target-list"></div>
        <div style="text-align:center; margin-top:15px;">
          <button id="btn-add-pos">➕ 옵션 추가</button>
        </div>
      </div>

      <div class="section">
        <h2>3. -옵션 (Penalty)</h2>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <label style="cursor:pointer;">
            <input type="checkbox" id="chk-auto-neg" checked> 
            자동- 옵션 버튼 (고장났습니다.)
          </label>
          <button id="btn-add-neg" class="secondary" style="display:none;">➖ 옵션 추가</button>
        </div>
        <div id="negative-list"></div>
        <p id="auto-desc" style="font-size:0.9em; color:var(--text-dim)">
          * Automatically selects optimized penalties (DEF%, MDEF%, Dodge, etc.)
        </p>
      </div>

      <div style="text-align:center; margin:30px;">
        <button id="run-btn" style="font-size:1.2em; padding:12px 40px; box-shadow: 0 0 15px var(--accent-pink);">🚀 실행</button>
      </div>

      <div id="result-area" class="section" style="display:none;">
        <h2> 결과</h2>
        <div id="result-summary" style="font-size:1.1em; margin-bottom:15px; padding:10px; background:rgba(0,0,0,0.3); border-radius:5px;"></div>
        <h3 style="margin-top:20px; border-bottom:1px solid #444; padding-bottom:5px;">🛠️ 레시피</h3>
        <div id="material-output" style="display:grid; grid-template-columns: repeat(6, 1fr); gap:5px; margin-bottom:20px; text-align:center;"></div>
        <h3>👣 스텝</h3>
        <div id="steps-output"></div>
      </div>
    </div>

    <!-- 모달 팝업 -->
    <div id="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; justify-content:center; align-items:center;">
      <div style="background:var(--card-bg); width:500px; max-height:80vh; border:1px solid var(--accent-pink); border-radius:10px; padding:20px; display:flex; flex-direction:column;">
        <h3 id="modal-title" style="margin-top:0; color:var(--accent-light)">Select Stat</h3>
        <div id="modal-content" style="overflow-y:auto; flex:1; padding-right:5px;"></div>
        <div style="text-align:right; margin-top:15px;">
          <button class="secondary" id="btn-close-modal">Close</button>
        </div>
      </div>
    </div>
  `;

    // 뒤로가기 버튼 이벤트
    document.getElementById('back-home')?.addEventListener('click', renderHomePage);

    // 강화 로직 실행
    initEnchantLogic();
}

// =================================================
// 3. 강화 시뮬레이터 로직 (Page Logic)
// =================================================

// 상태 관리
const state = {
    positives: [] as any[],
    negatives: [] as any[],
    modalMode: 'positive' as 'positive' | 'negative'
};

function initEnchantLogic() {
    // 초기값 (리셋 방지: 이미 값이 있으면 유지)
    if (state.positives.length === 0) {
        state.positives.push(
            { item: items['cdmg'], type: StatTypes.Constant, value: 10 },
            { item: items['cdmg'], type: StatTypes.Multiplier, value: 10 },
            { item: items['crit'], type: StatTypes.Constant, value: 25 },
            { item: items['crit'], type: StatTypes.Multiplier, value: 25 }
        );
    }
    renderList();

    // 이벤트 바인딩
    document.getElementById('btn-add-pos')?.addEventListener('click', () => openModal('positive'));
    document.getElementById('btn-add-neg')?.addEventListener('click', () => openModal('negative'));
    document.getElementById('btn-close-modal')?.addEventListener('click', () => document.getElementById('modal-overlay')!.style.display = 'none');

    document.getElementById('chk-auto-neg')?.addEventListener('change', (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        document.getElementById('btn-add-neg')!.style.display = isChecked ? 'none' : 'inline-block';
        document.getElementById('auto-desc')!.style.display = isChecked ? 'block' : 'none';
        renderList();
    });

    document.getElementById('run-btn')?.addEventListener('click', runCalculation);
}

function renderList() {
    const pContainer = document.getElementById('target-list');
    const nContainer = document.getElementById('negative-list');
    // 페이지 이동 시 DOM이 사라질 수 있으므로 체크
    if (!pContainer || !nContainer) return;

    pContainer.innerHTML = '';
    state.positives.forEach((t: any, idx) => pContainer.appendChild(createRow(t, idx, 'positive')));

    nContainer.innerHTML = '';
    const isAuto = (document.getElementById('chk-auto-neg') as HTMLInputElement)?.checked;

    if (!isAuto) {
        if (state.negatives.length === 0) {
            nContainer.innerHTML = `<div style="color:#666; text-align:center; padding:10px;">No penalties selected.</div>`;
        }
        state.negatives.forEach((t: any, idx) => nContainer.appendChild(createRow(t, idx, 'negative')));
    } else {
        nContainer.innerHTML = `<div style="color:#666; text-align:center;">Auto-selecting penalties...</div>`;
    }
}

function createRow(data: any, idx: number, mode: 'positive' | 'negative') {
    const row = document.createElement('div');
    row.className = 'stat-row';
    if (mode === 'negative') row.style.borderLeftColor = '#ffaa00';

    const isPercent = (data.type === StatTypes.Multiplier);
    const name = (data.item.statBase as any).name + (isPercent ? ' %' : '');

    row.innerHTML = `
    <span style="font-weight:bold;">${name}</span>
    <div>
      <button class="secondary" data-action="dec">-</button>
      <input type="number" value="${data.value}" readonly style="width:50px;">
      <button class="secondary" data-action="inc">+</button>
      <button class="remove" data-action="del">×</button>
    </div>
  `;
    row.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = (e.target as HTMLElement).dataset.action;
            const arr = mode === 'positive' ? state.positives : state.negatives;
            if (action === 'inc') arr[idx].value++;
            if (action === 'dec') arr[idx].value--;
            if (action === 'del') arr.splice(idx, 1);
            renderList();
        });
    });
    return row;
}

function openModal(mode: 'positive' | 'negative') {
    state.modalMode = mode;
    const overlay = document.getElementById('modal-overlay')!;
    const content = document.getElementById('modal-content')!;
    document.getElementById('modal-title')!.innerText = mode === 'positive' ? 'Select Target' : 'Select Penalty';
    overlay.style.display = 'flex';
    content.innerHTML = '';

    Grimoire.Enchant.categorys.forEach(cat => {
        const title = document.createElement('div');
        title.innerText = cat.title;
        title.style.fontWeight = 'bold';
        title.style.marginTop = '10px';
        title.style.borderBottom = '1px dashed #555';
        content.appendChild(title);
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = '1fr 1fr';
        grid.style.gap = '5px';
        cat.items.forEach(item => {
            const pot = item.potential;
            if (pot[StatTypes.Constant] !== 0) createStatBtn(grid, item, StatTypes.Constant);
            if (pot[StatTypes.Multiplier] !== 0) createStatBtn(grid, item, StatTypes.Multiplier);
        });
        content.appendChild(grid);
    });
}

function createStatBtn(container: HTMLElement, item: EnchantItem, type: StatTypes) {
    const btn = document.createElement('button');
    btn.style.textAlign = 'left';
    btn.style.background = 'rgba(255,255,255,0.05)';
    const isPercent = (type === StatTypes.Multiplier);
    btn.innerText = (item.statBase as any).name + (isPercent ? ' %' : '');
    btn.onclick = () => {
        addStatToState(item, type);
        document.getElementById('modal-overlay')!.style.display = 'none';
    };
    container.appendChild(btn);
}

function addStatToState(item: EnchantItem, type: StatTypes) {
    const isPercent = (type === StatTypes.Multiplier);
    if (state.modalMode === 'positive') {
        state.positives.push({ item, type, value: isPercent ? 10 : 20 });
    } else {
        state.negatives.push({ item, type, value: -10 });
    }
    renderList();
}

function runCalculation() {
    try {
        const basePot = Number((document.getElementById('base-pot') as HTMLInputElement).value);
        const charLv = Number((document.getElementById('char-lv') as HTMLInputElement).value);
        const smithLv = Number((document.getElementById('smith-lv') as HTMLInputElement).value);
        const isAuto = (document.getElementById('chk-auto-neg') as HTMLInputElement).checked;

        enchantConfig.characterLevel = charLv;
        enchantConfig.smithLevel = smithLv;

        const doll = new EnchantDoll();
        doll.build.equipment.originalPotential = basePot;

        state.positives.forEach((t: any) => doll.appendPositiveStat(t.item, t.type, t.value));

        let result;
        if (isAuto) {
            result = doll.autoFindNegaitveStats([], basePot);
        } else {
            const manualStats = state.negatives.map((n: any) => new EnchantStat(n.item, n.type, n.value));
            result = { equipment: doll.calc(manualStats, basePot) };
        }
        renderResult(result);
    } catch (e) {
        alert("Error: " + e);
    }
}

function renderResult(result: any) {
    const area = document.getElementById('result-area')!;
    const summary = document.getElementById('result-summary')!;
    const stepsOut = document.getElementById('steps-output')!;
    const matOut = document.getElementById('material-output')!;

    area.style.display = 'block';
    stepsOut.innerHTML = '';
    matOut.innerHTML = '';

    if (!result || !result.equipment) {
        summary.innerHTML = `<span style="color:#ff4444; font-weight:bold;">Calculation Failed!</span>`;
        return;
    }

    const eq = result.equipment;
    const rate = Math.floor(eq.realSuccessRate);
    const color = rate > 95 ? '#00ff9d' : (rate > 0 ? '#ffff00' : '#ff4444');

    summary.innerHTML = `잠재 성공률: <strong style="color:${color}">${rate}%</strong> (소모 잠재: ${eq.lastStep?.remainingPotential ?? 0})`;

    const mats = eq.allMaterialPointCost;
    const matNames = ['금속', '짐승', '목재', '천', '약품', '마나'];
    mats.forEach((val: number, idx: number) => {
        const div = document.createElement('div');
        div.style.background = 'rgba(255,255,255,0.05)';
        div.style.padding = '5px';
        div.style.borderRadius = '4px';
        div.innerHTML = `<div style="font-size:0.8em; color:#aaa;">${matNames[idx]}</div><div style="font-weight:bold; color:var(--accent-light);">${val}</div>`;
        matOut.appendChild(div);
    });

    if (eq.allSteps.length === 0) stepsOut.innerHTML = "<div style='padding:10px; color:#aaa'>No steps.</div>";

    eq.allSteps.forEach((step: any, idx: number) => {
        const statsHtml = step.stats.map((s: any) => {
            const val = s.value > 0 ? `+${s.value}` : s.value;
            const isNeg = s.value < 0;
            const name = (s.itemBase.statBase as any).name;
            const isPercent = (s.type === StatTypes.Multiplier);
            return `<span class="badge ${isNeg ? 'neg' : ''}">${name}${isPercent ? '%' : ''} ${val}</span>`;
        }).join(' ');

        const div = document.createElement('div');
        div.className = 'step-item';
        div.innerHTML = `
      <div style="margin-bottom:5px;">
        <strong>순서 ${idx + 1}</strong> <span style="font-size:0.8em; color:#888;">(${step.type === 1 ? 'Each' : 'Normal'}) Cost: ${step.potentialCost} | Pot: ${step.remainingPotential}</span>
      </div>
      <div>${statsHtml}</div>
    `;
        stepsOut.appendChild(div);
    });
}

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
    "무사 스킬", "할버드 스킬", "듀얼소드 스킬", "서바이벌 스킬",
    "배틀 스킬", "민스트럴 스킬", "서포트 스킬",
    "매직 블레이드 스킬", "기사 스킬","위자드 스킬", "어쌔신 스킬", "댄서 스킬", "쉴드 스킬",
    "크러셔 스킬", "헌터 스킬", "프리스트 스킬", "닌자 스킬", "특수"
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
    'big_handed_sword': '양손검',
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

function initTheme() {
    // 1. 버튼 생성 (우측 하단 플로팅 버튼)
    const btn = document.createElement('button');
    btn.className = 'theme-toggle-btn';
    btn.id = 'theme-btn';
    btn.onclick = toggleTheme;
    document.body.appendChild(btn);

    // 2. 저장된 테마 불러오기 (localStorage)
    const savedTheme = localStorage.getItem('toram-theme');

    // 저장된 테마가 'dark'라면 밤 모드 적용
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        btn.innerText = '☀️ 낮 모드'; // 밤이니까 낮으로 가는 버튼 표시
    } else {
        // 기본은 낮 모드 (body에 클래스 없음)
        btn.innerText = '🌙 밤 모드'; // 낮이니까 밤으로 가는 버튼 표시
    }
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-btn') as HTMLButtonElement;

    // 클래스 토글
    body.classList.toggle('dark-mode');

    // 현재 상태 확인 후 버튼 텍스트 및 로컬 스토리지 저장
    if (body.classList.contains('dark-mode')) {
        btn.innerText = '☀️ 낮 모드';
        localStorage.setItem('toram-theme', 'dark');
    } else {
        btn.innerText = '🌙 밤 모드';
        localStorage.setItem('toram-theme', 'light');
    }
}

// =================================================
// [Page 8] 뉴비 가이드 (Newbie Guide)
// =================================================

let guideList: any[] = [];

function renderGuidePage() {
    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">📘 뉴비 가이드</h2>
    </div>

    <div class="container">
      <!-- 검색창 -->
      <div class="search-container" style="background:transparent; border:none; padding:0; margin-bottom:20px;">
        <input type="text" id="guide-search" class="search-input" placeholder="제목 또는 내용 검색...">
      </div>

      <!-- 가이드 리스트 (1단) -->
      <div id="guide-list" class="guide-list-container">
        <div style="text-align:center; padding:50px; color:#888;">데이터 로딩 중...</div>
      </div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', renderHomePage);
    document.getElementById('guide-search')?.addEventListener('input', (e) => {
        const keyword = (e.target as HTMLInputElement).value.trim();
        renderGuideItems(keyword);
    });

    loadGuideData();
}

async function loadGuideData() {
    const container = document.getElementById('guide-list')!;

    if (guideList.length > 0) {
        renderGuideItems('');
        return;
    }

    try {
        // ▼▼▼ 경로 수정됨 (guideDB 폴더 포함) ▼▼▼
        const res = await fetch('guideDB/guideData.js');
        if (!res.ok) throw new Error('File not found');
        const text = await res.text();

        const eqIndex = text.indexOf('=');
        let jsonContent = text.substring(eqIndex + 1).trim();
        if (jsonContent.endsWith(';')) jsonContent = jsonContent.slice(0, -1);

        guideList = new Function(`return ${jsonContent}`)();
        renderGuideItems('');

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div style="text-align:center; color:#ff4444;">가이드 데이터를 불러올 수 없습니다.</div>`;
    }
}

function renderGuideItems(keyword: string) {
    const container = document.getElementById('guide-list')!;
    container.innerHTML = '';

    const lowerKey = keyword.toLowerCase();
    const filtered = guideList.filter((item: any) => {
        return item.title.toLowerCase().includes(lowerKey) || item.description.toLowerCase().includes(lowerKey);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:30px; color:#888;">검색 결과가 없습니다.</div>';
        return;
    }

    filtered.forEach((item: any) => {
        const card = document.createElement('div');
        card.className = 'guide-card';

        // 제목 화살표 변환 로직
        const steps = item.title.split('-').map((s: string) => s.trim());
        const titleHtml = steps.join(' <span style="color:var(--accent-pink);">▶</span> ');

        // 이미지 (데이터에 image 필드가 있다고 가정)
        const imgHtml = item.image ? `<img src="GuideImg/${item.image}" class="guide-img" alt="${item.title}">` : '';

        card.innerHTML = `
      ${imgHtml}
      <div class="guide-title-box">${titleHtml}</div>
      <div class="guide-desc">${item.description.replace(/\n/g, '<br>')}</div>
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
        <h3>👑 제작 및 운영</h3>
        <p><strong>주인(Owner):</strong> Your Name</p>
        <p><strong>개발(Dev):</strong> Toram Tools Team</p>
      </div>

      <div class="info-card">
        <h3>🤝 참여해주신 분들</h3>
        <ul style="padding-left:20px; color:var(--text-dim);">
          <li>데이터 제공: User A</li>
          <li>번역 도움: User B</li>
          <li>디자인 조언: User C</li>
        </ul>
      </div>

      <div class="info-card">
        <h3>📚 참고 데이터</h3>
        <p>Toram Online Wiki, Coryn Club, Official Site</p>
      </div>

      <h3 style="margin-top:30px; border-bottom:1px solid #444; padding-bottom:10px;">🔗 관련 링크</h3>
      <div class="link-grid">
        <a href="https://github.com" target="_blank" class="link-box">
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

// 앱 시작 시 테마 초기화 실행
initTheme();
renderHomePage();