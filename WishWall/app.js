// app.js
import { mockPosts, fetchPosts as apiFetchInitialPosts, fetchMorePosts as apiFetchMorePosts } from './data.js';

// --- 工具函式 ---
// 將 ISO 時間字串轉成「2024年5月20日」這類格式
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
}

// --- 常量定義 ---
const CATEGORIES = ['全部', '遊戲', '漫畫', '插畫', '小說', 'Vtubr'];
// 為各分類指定顏色（Tailwind color class，可自行調整）
const CATEGORY_COLORS = {
  '遊戲': 'bg-blue-200 text-blue-800',
  '漫畫': 'bg-red-200 text-red-800',
  '插畫': 'bg-green-200 text-green-800',
  '小說': 'bg-yellow-200 text-yellow-800',
  'Vtubr': 'bg-purple-200 text-purple-800',
  '全部': 'bg-gray-200 text-gray-800',
};


// --- SVG ICON (Lucide) ---
// 喜歡按鈕已移除，只保留留言/分享
const messageCircleIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       class="h-4 w-4 mr-1">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </svg>`;
const share2IconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       class="h-4 w-4 mr-1">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>`;
// 新增：地球圖標 (官方網站)
const globeIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       class="h-4 w-4 mr-1">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15 15 0 0 1 0 20"/>
    <path d="M12 2a15 15 0 0 0 0 20"/>
  </svg>`;

// --- DOM 參考 --- 
const postsContainerWrapper = document.getElementById('posts-container-wrapper');
const loadMoreTrigger = document.getElementById('load-more-trigger');
const loadingIndicator = document.getElementById('loading-indicator');

// --- 全域狀態 --- 
let allPosts = [];        // 原始所有貼文
let displayedPosts = [];  // 目前畫面上要顯示的貼文
let positions = {};       // { postId: { x, y, element } }
let currentFilter = '全部';  // 目前篩選

let isLoading = false;
let allPostsLoaded = false;

const CARD_WIDTH = 280;
const CARD_HEIGHT = 300;

// ------------------------------
// 拖曳：支援滑鼠 + 觸控
// ------------------------------
let draggedElement = null;
let offsetX = 0, offsetY = 0;

// 啟用拖曳功能：同時綁定滑鼠與觸控事件
function enableDragging(element) {
  // 滑鼠拖曳
  element.addEventListener('mousedown', onDragStart);
  // 觸控拖曳，需要 passive:false 才能 preventDefault()
  element.addEventListener('touchstart', onTouchStart, { passive: false });
}

// 滑鼠按下
function onDragStart(e) {
  if (e.target.closest('button') || e.target.closest('a')) return;  // 按鈕或連結不觸發拖曳
  e.preventDefault();
  startDragging(e.clientX, e.clientY, e.currentTarget);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
}

// 觸控開始
function onTouchStart(e) {
  if (e.target.closest('button') || e.target.closest('a')) return;
  e.preventDefault();  // 阻止畫面滾動
  const touch = e.touches[0];
  startDragging(touch.clientX, touch.clientY, e.currentTarget);
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd);
}

// 初始化拖曳狀態
function startDragging(clientX, clientY, element) {
  draggedElement = element;
  draggedElement.classList.add('dragging');
  const rect = element.getBoundingClientRect();
  offsetX = clientX - rect.left;
  offsetY = clientY - rect.top;
}

// 滑鼠移動
function onDragMove(e) {
  e.preventDefault();
  handleDragging(e.clientX, e.clientY);
}

// 觸控移動
function onTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  handleDragging(touch.clientX, touch.clientY);
}

// 共用的拖曳計算邏輯
function handleDragging(clientX, clientY) {
  if (!draggedElement) return;
  const containerRect = postsContainerWrapper.getBoundingClientRect();

  // 計算新的左上角座標
  let newX = clientX - offsetX;
  let newY = clientY - offsetY;

  // 轉成相對於容器的座標（含捲軸）
  let relativeX = newX - containerRect.left + postsContainerWrapper.scrollLeft;
  let relativeY = newY - containerRect.top + postsContainerWrapper.scrollTop;

  // 邊界檢查
  relativeX = Math.max(0, Math.min(relativeX, postsContainerWrapper.scrollWidth - draggedElement.offsetWidth));
  relativeY = Math.max(0, Math.min(relativeY, postsContainerWrapper.scrollHeight - draggedElement.offsetHeight));

  draggedElement.style.left = `${relativeX}px`;
  draggedElement.style.top = `${relativeY}px`;
}

// 結束滑鼠拖曳
function onDragEnd() {
  finishDragging();
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
}

// 結束觸控拖曳
function onTouchEnd() {
  finishDragging();
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
}

// 完成拖曳：更新 state、移除樣式
function finishDragging() {
  if (!draggedElement) return;
  const postId = draggedElement.dataset.postId;
  const finalX = parseFloat(draggedElement.style.left);
  const finalY = parseFloat(draggedElement.style.top);

  if (positions[postId]) {
    positions[postId].x = finalX;
    positions[postId].y = finalY;
    updateContainerHeight();  // 調整容器高度，避免元素拖出範圍
  }

  draggedElement.classList.remove('dragging');
  draggedElement = null;
}

// ------------------------------
// 版面渲染 & 無限滾動
// ------------------------------
function updateContainerHeight() {
  let maxHeight = window.innerHeight * 1.5;
  Object.values(positions).forEach(pos => {
    if (pos.element) {
      maxHeight = Math.max(maxHeight, pos.y + pos.element.offsetHeight + 50);
    }
  });
  postsContainerWrapper.style.height = `${maxHeight}px`;
}

// ------------------------------
// 建立上方篩選列
// ------------------------------
function buildFilterBar() {
  const bar = document.createElement('div');
  bar.className = 'flex flex-wrap gap-2 mb-4 justify-center';
  
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.dataset.filter = cat;
    btn.className = `
      px-3 py-1 rounded-full text-xs 
      ${CATEGORY_COLORS[cat]} 
      hover:opacity-80
    `;
    // 預設「全部」加粗
    if (cat === currentFilter) {
      btn.classList.add('font-semibold', 'ring-2', 'ring-offset-1');
    }
    btn.addEventListener('click', () => {
      if (currentFilter === cat) return;
      currentFilter = cat;
      // 更新按鈕樣式
      bar.querySelectorAll('button').forEach(b => {
        b.classList.toggle('font-semibold', b.dataset.filter === cat);
        b.classList.toggle('ring-2', b.dataset.filter === cat);
      });
      // 重新渲染
      refreshDisplayedPosts();
    });
    bar.appendChild(btn);
  });

  // 插入到 container 之前
  postsContainerWrapper.parentNode.insertBefore(bar, postsContainerWrapper);
}

// ------------------------------
// 重新依 filter 產生並渲染貼文
// ------------------------------
function refreshDisplayedPosts() {
  // 清空
  postsContainerWrapper.innerHTML = '';
  positions = {};
  // 根據 filter 決定要顯示哪些
  if (currentFilter === '全部') {
    displayedPosts = allPosts.slice();
  } else {
    displayedPosts = allPosts.filter(p => p.category === currentFilter);
  }
  // 重新 scatter & render
  generateInitialPositions(displayedPosts);
  renderPosts(displayedPosts);
}


// 隨機產生不重疊的初始位置
function generateInitialPositions(newPosts) {
  const containerWidth = postsContainerWrapper.clientWidth;
  const containerVisibleHeight = window.innerHeight * 1.2;

  newPosts.forEach(post => {
    if (!positions[post.id]) {
      let attempts = 0, valid = false, x, y;
      while (!valid && attempts < 100) {
        x = Math.random() * (containerWidth - CARD_WIDTH - 20);
        y = Math.random() * (containerVisibleHeight - CARD_HEIGHT - 20);
        valid = true;
        for (const pid in positions) {
          const p = positions[pid];
          const dist = Math.hypot(p.x - x, p.y - y);
          if (dist < (CARD_WIDTH + CARD_HEIGHT) * 0.3) {
            valid = false; break;
          }
        }
        attempts++;
      }
      positions[post.id] = { x, y, element: null };
    }
  });
}

// 建立一張貼文卡片的 DOM
function createPostCardElement(post) {
  const card = document.createElement('div');
  card.className = "w-[280px] shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-grab bg-white dark:bg-slate-800 select-none post-card-enter";
  card.dataset.postId = post.id;

  // 預設頭像與貼圖
  const avatarSrc = post.author.avatar || 'https://placehold.co/50x50/E2E8F0/4A5568?text=??';
  const postImageSrc = post.image || '';

  // 圖片區塊（若有）
  let imageHtml = '';
  if (post.image) {
    imageHtml = `
      <div class="relative h-[160px] w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700">
        <img src="${postImageSrc}" alt="Post image" class="object-cover w-full h-full" onerror="this.onerror=null; this.src='https://placehold.co/280x160/E2E8F0/4A5568?text=Error';" />
      </div>`;
  }

  // 內容包一層連結或純文字
  let contentHtml = `<p class="text-sm mb-2 text-slate-700 dark:text-slate-300">${post.content}</p>${imageHtml}`;
  if (post.url) {
    contentHtml = `<a href="${post.url}" target="_blank">${contentHtml}</a>`;
  }

  // 分類標籤
  const tagClass = CATEGORY_COLORS[post.category] || CATEGORY_COLORS['全部'];
  const categoryBadge = `
    <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] ${tagClass}">
      ${post.category}
    </span>`;

  // 按鈕區塊：新增官方網站按鈕，若沒有 officialUrl 就不顯示
  let buttonsHtml = `<div class="flex space-x-3 text-slate-500 dark:text-slate-400">`;
  if (post.officialUrl) {
    buttonsHtml += `
      <a href="${post.officialUrl}" target="_blank"
         class="flex items-center text-xs hover:text-green-500 dark:hover:text-green-400">
        ${globeIconSVG}
      </a>`;
  }
  buttonsHtml += `
      <button class="flex items-center text-xs hover:text-blue-500 dark:hover:text-blue-400">
        ${messageCircleIconSVG}${post.comments}
      </button>
      <button class="flex items-center text-xs hover:text-gray-500 dark:hover:text-gray-400">
        ${share2IconSVG}
      </button>
    </div>`;

  // 組合整張卡片
  card.innerHTML = `
    <div class="relative">
      ${categoryBadge}
      <div class="p-3 pb-0 flex items-center space-x-2">
        <div class="h-8 w-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
          <img src="${avatarSrc}" alt="${post.author.name}" class="h-full w-full object-cover"
               onerror="this.style.display='none'; this.parentElement.innerHTML='${post.author.name.slice(0,2)}';" />
        </div>
        <div class="flex flex-col">
          <p class="text-sm font-medium text-slate-900 dark:text-slate-100">${post.author.name}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">${formatDate(post.date)}</p>
        </div>
      </div>
      <div class="p-3">${contentHtml}</div>
		<div class="p-3 pt-0 flex justify-between items-center">
		  ${buttonsHtml}
		</div>
    </div>`;

  enableDragging(card);
  return card;
}

// 將新貼文渲染到畫面
function renderPosts(postList) {
  const frag = document.createDocumentFragment();
  postList.forEach((post, idx) => {
    const pos = positions[post.id];
    if (!pos.element) {
      const cardEl = createPostCardElement(post);
      cardEl.style.position = 'absolute';
      cardEl.style.left = `${pos.x}px`;
      cardEl.style.top = `${pos.y}px`;
      positions[post.id].element = cardEl;
      frag.appendChild(cardEl);
      // 淡入動畫
      setTimeout(() => cardEl.classList.add('post-card-enter-active'), 50 + idx * 50);
    }
  });
  postsContainerWrapper.appendChild(frag);
  updateContainerHeight();
}

// 無限滾動觀察器
const observer = new IntersectionObserver(async ([ent]) => {
  if (ent.isIntersecting && !isLoading && !allPostsLoaded) {
    isLoading = true; loadingIndicator.style.display = 'block';
    try {
      const more = await apiFetchMorePosts(allPosts.length);
      if (more.length) {
        allPosts.push(...more);
        // 只有「全部」時才動態載入更多；若有篩選，需再 refresh
        if (currentFilter === '全部') {
          displayedPosts.push(...more);
          generateInitialPositions(more);
          renderPosts(more);
        }
      } else {
        allPostsLoaded = true;
        loadMoreTrigger.style.display = 'none';
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading = false; loadingIndicator.style.display = 'none';
    }
  }
}, { threshold: 0.5 });



// 初始化應用
async function initializeApp() {
  // 建立篩選列
  buildFilterBar();

  // 載入初始貼文
  isLoading = true; loadingIndicator.style.display = 'block';
  try {
    const initial = await apiFetchInitialPosts(0, 10);
    allPosts = initial;
    displayedPosts = initial.slice();
    generateInitialPositions(displayedPosts);
    renderPosts(displayedPosts);
    observer.observe(loadMoreTrigger);
  } catch (err) {
    console.error(err);
  } finally {
    isLoading = false; loadingIndicator.style.display = 'none';
  }

  // 視窗調整時更新高度
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateContainerHeight, 200);
  });
}

// 啟動
initializeApp();
