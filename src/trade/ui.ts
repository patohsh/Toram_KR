// src/trade/ui.ts
// 거래(홍보) 게시판. 홍보글만 올리는 용도이며 링크와 현거래는 막는다. 댓글 가능.

import { db, firebaseApp } from '../firebase';
import {
    addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc,
    type Timestamp,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth';
import { checkField } from './validate';

type Category = 'equip' | 'material' | 'socket' | 'wanted';
type Status = 'selling' | 'reserved' | 'done';

interface Trade {
    id: string;
    category: Category;
    title: string;
    body: string;
    price: string;
    gameNickname: string;
    location: string;
    saleTime: string;
    status: Status;
    ownerUid: string;
    createdAt: Timestamp | null;
}

interface TradeComment {
    id: string;
    nickname: string;
    text: string;
    ownerUid: string;
    createdAt: Timestamp | null;
}

const CATEGORY_LABEL: Record<Category, string> = {
    equip: '장비 판매',
    material: '재료·아이템',
    socket: '소켓 뚫어드림',
    wanted: '구해요',
};

const POST_COOLDOWN_MS = 30_000;
const COMMENT_COOLDOWN_MS = 10_000;

const LOAD_TIMEOUT_MS = 10_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const timer = window.setTimeout(() => reject(new Error('timeout')), ms);
        promise.then(
            v => { window.clearTimeout(timer); resolve(v); },
            e => { window.clearTimeout(timer); reject(e); },
        );
    });
}

let trades: Trade[] = [];
let activeCategory: Category | 'all' = 'all';
let keyword = '';
let myUid: string | null = null;
let isAdmin = false;

function esc(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function statusLabel(category: Category, status: Status): string {
    if (status === 'done') return category === 'wanted' ? '구매완료' : '거래완료';
    if (status === 'reserved') return '예약중';
    return category === 'wanted' ? '구매중' : '판매중';
}

function timeAgo(ts: Timestamp | null): string {
    if (!ts) return '방금 전';
    const diff = Date.now() - ts.toDate().getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return '방금 전';
    if (min < 60) return `${min}분 전`;
    const hour = Math.floor(min / 60);
    if (hour < 24) return `${hour}시간 전`;
    const day = Math.floor(hour / 24);
    if (day < 30) return `${day}일 전`;
    const d = ts.toDate();
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function storedNumber(key: string): number {
    try { return Number(localStorage.getItem(key)) || 0; } catch { return 0; }
}
function storeNumber(key: string, value: number): void {
    try { localStorage.setItem(key, String(value)); } catch { /* 저장 불가 환경은 무시 */ }
}
function storedText(key: string): string {
    try { return localStorage.getItem(key) || ''; } catch { return ''; }
}
function storeText(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch { /* 무시 */ }
}

let authInstance: Auth | null = null;

function getAuthOrNull(): Auth | null {
    if (authInstance) return authInstance;
    try {
        authInstance = getAuth(firebaseApp);
        return authInstance;
    } catch (err) {
        console.error('Firebase 인증을 사용할 수 없습니다:', err);
        return null;
    }
}

async function ensureAuth(): Promise<string | null> {
    const auth = getAuthOrNull();
    if (!auth) return null;
    if (auth.currentUser) return auth.currentUser.uid;
    try {
        const cred = await signInAnonymously(auth);
        return cred.user.uid;
    } catch (err) {
        console.error('익명 로그인 실패:', err);
        return null;
    }
}

async function checkAdmin(uid: string): Promise<boolean> {
    try {
        const snap = await withTimeout(getDoc(doc(db, 'admins', uid)), LOAD_TIMEOUT_MS);
        return snap.exists();
    } catch {
        return false;
    }
}

export async function renderTradePage(): Promise<void> {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    activeCategory = 'all';
    keyword = '';

    app.innerHTML = `
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">🏪 거래 게시판</h2>
    </div>
    <div class="container">
      <div class="trade-notice">
        홍보글 전용 게시판입니다. 거래는 게임 안에서 직접 해 주세요.<br>
        <b>링크</b>와 <b>현거래(현금·계좌·상품권 등)</b>는 올릴 수 없고, 발견되면 삭제됩니다.
      </div>

      <div class="skill-tabs" id="trade-tabs">
        <button class="skill-tab-btn active" data-cat="all">전체</button>
        ${(Object.keys(CATEGORY_LABEL) as Category[]).map(c => `<button class="skill-tab-btn" data-cat="${c}">${CATEGORY_LABEL[c]}</button>`).join('')}
      </div>

      <div class="trade-toolbar">
        <input type="text" id="trade-search" class="search-input" placeholder="제목, 닉네임, 내용 검색..." maxlength="40">
        <button class="trade-btn trade-btn-primary" id="trade-write-toggle">글쓰기</button>
      </div>

      <form class="trade-form" id="trade-form" style="display:none;" autocomplete="off">
        <div class="trade-form-grid">
          <label>구분
            <select id="tf-category">
              ${(Object.keys(CATEGORY_LABEL) as Category[]).map(c => `<option value="${c}">${CATEGORY_LABEL[c]}</option>`).join('')}
            </select>
          </label>
          <label>게임 닉네임
            <input type="text" id="tf-nick" maxlength="20" placeholder="인게임 닉네임">
          </label>
          <label>위치
            <input type="text" id="tf-location" maxlength="40" placeholder="예: 마이룸 / 어느 마을 / 채널">
          </label>
          <label>판매 시간
            <input type="text" id="tf-time" maxlength="40" placeholder="예: 평일 20시~24시">
          </label>
          <label class="trade-span2">제목
            <input type="text" id="tf-title" maxlength="40" placeholder="예: 천공망치 판매합니다">
          </label>
          <label class="trade-span2">가격 / 조건
            <input type="text" id="tf-price" maxlength="30" placeholder="예: 협의 / 스피나로 협의">
          </label>
          <label class="trade-span2">내용
            <textarea id="tf-body" maxlength="500" rows="4" placeholder="판매(구매)하는 장비·아이템과 조건을 적어 주세요. 링크와 현거래는 올릴 수 없습니다."></textarea>
          </label>
        </div>
        <div class="trade-msg" id="trade-form-msg"></div>
        <div class="trade-form-actions">
          <button type="button" class="trade-btn" id="trade-form-cancel">취소</button>
          <button type="submit" class="trade-btn trade-btn-primary">등록</button>
        </div>
      </form>

      <div id="trade-list"><div class="trade-empty">불러오는 중...</div></div>
    </div>
  `;

    document.getElementById('back-home')?.addEventListener('click', () => history.back());

    document.querySelectorAll<HTMLButtonElement>('#trade-tabs .skill-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#trade-tabs .skill-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.cat as Category | 'all';
            renderList();
        });
    });

    document.getElementById('trade-search')?.addEventListener('input', (e) => {
        keyword = (e.target as HTMLInputElement).value.trim().toLowerCase();
        renderList();
    });

    const form = document.getElementById('trade-form') as HTMLFormElement;
    document.getElementById('trade-write-toggle')?.addEventListener('click', () => {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
        const nick = document.getElementById('tf-nick') as HTMLInputElement;
        if (!nick.value) nick.value = storedText('trade-nick');
    });
    document.getElementById('trade-form-cancel')?.addEventListener('click', () => { form.style.display = 'none'; });
    form.addEventListener('submit', (e) => { e.preventDefault(); void submitTrade(); });

    myUid = await ensureAuth();
    isAdmin = myUid ? await checkAdmin(myUid) : false;
    await loadTrades();
}

async function loadTrades(): Promise<void> {
    const listEl = document.getElementById('trade-list');
    if (!listEl) return;
    try {
        const snap = await withTimeout(getDocs(query(collection(db, 'trades'), orderBy('createdAt', 'desc'), limit(100))), LOAD_TIMEOUT_MS);
        trades = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Trade, 'id'>) }));
        renderList();
    } catch (err) {
        console.error('거래글 불러오기 실패:', err);
        listEl.innerHTML = '<div class="trade-empty">거래글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</div>';
    }
}

function renderList(): void {
    const listEl = document.getElementById('trade-list');
    if (!listEl) return;

    const shown = trades.filter(t => {
        if (activeCategory !== 'all' && t.category !== activeCategory) return false;
        if (!keyword) return true;
        return `${t.title} ${t.gameNickname} ${t.body} ${t.location}`.toLowerCase().includes(keyword);
    });

    if (shown.length === 0) {
        listEl.innerHTML = '<div class="trade-empty">등록된 글이 없습니다.</div>';
        return;
    }

    listEl.innerHTML = shown.map(t => {
        const mine = !!myUid && t.ownerUid === myUid;
        const canManage = mine || isAdmin;
        return `
      <article class="trade-card" data-id="${esc(t.id)}">
        <div class="trade-head" data-toggle="${esc(t.id)}">
          <span class="trade-status trade-status-${t.status}">${statusLabel(t.category, t.status)}</span>
          <span class="trade-cat">${esc(CATEGORY_LABEL[t.category] || '')}</span>
          <span class="trade-title">${esc(t.title)}</span>
          <span class="trade-price">${esc(t.price)}</span>
        </div>
        <div class="trade-meta">
          <span>닉네임 <b>${esc(t.gameNickname)}</b></span>
          <span>위치 ${esc(t.location)}</span>
          <span>판매 시간 ${esc(t.saleTime)}</span>
          <span class="trade-time">${timeAgo(t.createdAt)}</span>
        </div>
        <div class="trade-detail" id="detail-${esc(t.id)}" style="display:none;">
          <div class="trade-body">${esc(t.body).replace(/\n/g, '<br>')}</div>
          ${canManage ? `
          <div class="trade-manage">
            <button class="trade-btn" data-status="${esc(t.id)}|selling">${t.category === 'wanted' ? '구매중' : '판매중'}</button>
            <button class="trade-btn" data-status="${esc(t.id)}|reserved">예약중</button>
            <button class="trade-btn" data-status="${esc(t.id)}|done">${t.category === 'wanted' ? '구매완료' : '거래완료'}</button>
            <button class="trade-btn trade-btn-danger" data-delete="${esc(t.id)}">삭제</button>
          </div>` : ''}
          <div class="trade-comments" id="comments-${esc(t.id)}"><div class="trade-empty">댓글 불러오는 중...</div></div>
          <form class="trade-comment-form" data-comment-form="${esc(t.id)}" autocomplete="off">
            <input type="text" class="tc-nick" maxlength="20" placeholder="닉네임" value="${esc(storedText('trade-nick'))}">
            <input type="text" class="tc-text" maxlength="200" placeholder="댓글 (링크·현거래는 올릴 수 없습니다)">
            <button type="submit" class="trade-btn trade-btn-primary">등록</button>
          </form>
          <div class="trade-msg" id="comment-msg-${esc(t.id)}"></div>
        </div>
      </article>`;
    }).join('');

    listEl.querySelectorAll<HTMLElement>('[data-toggle]').forEach(el => {
        el.addEventListener('click', () => toggleDetail(el.dataset.toggle!));
    });
    listEl.querySelectorAll<HTMLButtonElement>('[data-status]').forEach(btn => {
        btn.addEventListener('click', () => {
            const [id, status] = btn.dataset.status!.split('|');
            void changeStatus(id, status as Status);
        });
    });
    listEl.querySelectorAll<HTMLButtonElement>('[data-delete]').forEach(btn => {
        btn.addEventListener('click', () => void deleteTrade(btn.dataset.delete!));
    });
    listEl.querySelectorAll<HTMLFormElement>('[data-comment-form]').forEach(f => {
        f.addEventListener('submit', (e) => { e.preventDefault(); void submitComment(f.dataset.commentForm!, f); });
    });
}

async function toggleDetail(id: string): Promise<void> {
    const detail = document.getElementById(`detail-${id}`);
    if (!detail) return;
    const open = detail.style.display !== 'none';
    detail.style.display = open ? 'none' : 'block';
    if (!open) await loadComments(id);
}

async function loadComments(tradeId: string): Promise<void> {
    const box = document.getElementById(`comments-${tradeId}`);
    if (!box) return;
    try {
        const snap = await withTimeout(getDocs(query(collection(db, 'trades', tradeId, 'comments'), orderBy('createdAt', 'asc'), limit(100))), LOAD_TIMEOUT_MS);
        const comments: TradeComment[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<TradeComment, 'id'>) }));
        const trade = trades.find(t => t.id === tradeId);
        const tradeOwner = !!myUid && trade?.ownerUid === myUid;
        if (comments.length === 0) {
            box.innerHTML = '<div class="trade-empty">아직 댓글이 없습니다.</div>';
            return;
        }
        box.innerHTML = comments.map(c => {
            const canDelete = isAdmin || tradeOwner || (!!myUid && c.ownerUid === myUid);
            return `<div class="trade-comment">
              <b>${esc(c.nickname)}</b>
              <span class="trade-comment-text">${esc(c.text)}</span>
              <span class="trade-time">${timeAgo(c.createdAt)}</span>
              ${canDelete ? `<button class="trade-comment-del" data-del-comment="${esc(tradeId)}|${esc(c.id)}" aria-label="댓글 삭제">✕</button>` : ''}
            </div>`;
        }).join('');
        box.querySelectorAll<HTMLButtonElement>('[data-del-comment]').forEach(btn => {
            btn.addEventListener('click', () => {
                const [tid, cid] = btn.dataset.delComment!.split('|');
                void deleteComment(tid, cid);
            });
        });
    } catch (err) {
        console.error('댓글 불러오기 실패:', err);
        box.innerHTML = '<div class="trade-empty">댓글을 불러오지 못했습니다.</div>';
    }
}

function setMsg(el: HTMLElement | null, text: string, kind: 'error' | 'ok'): void {
    if (!el) return;
    el.textContent = text;
    el.className = `trade-msg trade-msg-${kind}`;
}

async function submitTrade(): Promise<void> {
    const msg = document.getElementById('trade-form-msg');
    const val = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement).value.trim();

    const category = val('tf-category') as Category;
    const fields = {
        gameNickname: val('tf-nick'),
        location: val('tf-location'),
        saleTime: val('tf-time'),
        title: val('tf-title'),
        price: val('tf-price'),
        body: val('tf-body'),
    };

    if (!fields.gameNickname) return setMsg(msg, '게임 닉네임을 입력해 주세요.', 'error');
    if (!fields.location) return setMsg(msg, '위치를 입력해 주세요.', 'error');
    if (!fields.saleTime) return setMsg(msg, '판매 시간을 입력해 주세요.', 'error');
    if (fields.title.length < 2) return setMsg(msg, '제목을 2자 이상 입력해 주세요.', 'error');
    if (!fields.price) return setMsg(msg, '가격/조건을 입력해 주세요. 협의라면 "협의"라고 적어 주세요.', 'error');
    if (fields.body.length < 5) return setMsg(msg, '내용을 5자 이상 입력해 주세요.', 'error');

    const labels: Record<keyof typeof fields, string> = {
        gameNickname: '게임 닉네임', location: '위치', saleTime: '판매 시간', title: '제목', price: '가격/조건', body: '내용',
    };
    for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
        const err = checkField(labels[key], fields[key]);
        if (err) return setMsg(msg, err, 'error');
    }

    const wait = POST_COOLDOWN_MS - (Date.now() - storedNumber('trade-last-post'));
    if (wait > 0) return setMsg(msg, `잠시 후에 다시 올려 주세요. (${Math.ceil(wait / 1000)}초)`, 'error');

    const uid = myUid || await ensureAuth();
    if (!uid) return setMsg(msg, '글쓰기 준비에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'error');
    myUid = uid;

    try {
        await addDoc(collection(db, 'trades'), {
            category,
            ...fields,
            status: 'selling' as Status,
            ownerUid: uid,
            createdAt: serverTimestamp(),
        });
        storeNumber('trade-last-post', Date.now());
        storeText('trade-nick', fields.gameNickname);
        (document.getElementById('trade-form') as HTMLFormElement).reset();
        (document.getElementById('trade-form') as HTMLFormElement).style.display = 'none';
        setMsg(msg, '', 'ok');
        await loadTrades();
    } catch (err) {
        console.error('거래글 등록 실패:', err);
        setMsg(msg, '등록하지 못했습니다. 입력 내용을 확인하거나 잠시 후 다시 시도해 주세요.', 'error');
    }
}

async function submitComment(tradeId: string, form: HTMLFormElement): Promise<void> {
    const msg = document.getElementById(`comment-msg-${tradeId}`);
    const nickname = (form.querySelector('.tc-nick') as HTMLInputElement).value.trim();
    const text = (form.querySelector('.tc-text') as HTMLInputElement).value.trim();

    if (!nickname) return setMsg(msg, '닉네임을 입력해 주세요.', 'error');
    if (!text) return setMsg(msg, '댓글을 입력해 주세요.', 'error');
    const err = checkField('닉네임', nickname) || checkField('댓글', text);
    if (err) return setMsg(msg, err, 'error');

    const wait = COMMENT_COOLDOWN_MS - (Date.now() - storedNumber('trade-last-comment'));
    if (wait > 0) return setMsg(msg, `잠시 후에 다시 올려 주세요. (${Math.ceil(wait / 1000)}초)`, 'error');

    const uid = myUid || await ensureAuth();
    if (!uid) return setMsg(msg, '댓글 준비에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'error');
    myUid = uid;

    try {
        await addDoc(collection(db, 'trades', tradeId, 'comments'), {
            nickname, text, ownerUid: uid, createdAt: serverTimestamp(),
        });
        storeNumber('trade-last-comment', Date.now());
        storeText('trade-nick', nickname);
        (form.querySelector('.tc-text') as HTMLInputElement).value = '';
        setMsg(msg, '', 'ok');
        await loadComments(tradeId);
    } catch (e) {
        console.error('댓글 등록 실패:', e);
        setMsg(msg, '댓글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.', 'error');
    }
}

async function changeStatus(id: string, status: Status): Promise<void> {
    try {
        await updateDoc(doc(db, 'trades', id), { status, updatedAt: serverTimestamp() });
        const t = trades.find(x => x.id === id);
        if (t) t.status = status;
        renderList();
        await toggleDetail(id);
    } catch (err) {
        console.error('상태 변경 실패:', err);
        alert('상태를 바꾸지 못했습니다.');
    }
}

async function deleteTrade(id: string): Promise<void> {
    if (!confirm('이 글을 삭제할까요?')) return;
    try {
        await deleteDoc(doc(db, 'trades', id));
        trades = trades.filter(t => t.id !== id);
        renderList();
    } catch (err) {
        console.error('삭제 실패:', err);
        alert('삭제하지 못했습니다.');
    }
}

async function deleteComment(tradeId: string, commentId: string): Promise<void> {
    if (!confirm('이 댓글을 삭제할까요?')) return;
    try {
        await deleteDoc(doc(db, 'trades', tradeId, 'comments', commentId));
        await loadComments(tradeId);
    } catch (err) {
        console.error('댓글 삭제 실패:', err);
        alert('삭제하지 못했습니다.');
    }
}
