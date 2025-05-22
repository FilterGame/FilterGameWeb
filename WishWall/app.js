// app.js
import { mockPosts, fetchPosts as apiFetchInitialPosts, fetchMorePosts as apiFetchMorePosts } from './data.js';

// --- UTILITIES ---
function formatDate(dateString) {
  const date = new Date(dateString);
  // Simple date formatting, you can make this more sophisticated
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
}

// --- SVGs for Icons (from Lucide) ---
const heartIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>`;
const messageCircleIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </svg>`;
const share2IconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
  </svg>`;

// --- DOM Elements ---
const postsContainerWrapper = document.getElementById('posts-container-wrapper');
const loadMoreTrigger = document.getElementById('load-more-trigger');
const loadingIndicator = document.getElementById('loading-indicator');

// --- STATE ---
let posts = [];
let positions = {}; // { postId: { x, y, element } }
let isLoading = false;
let allPostsLoaded = false; // To prevent further fetches if all data is loaded

const CARD_WIDTH = 280;
const CARD_HEIGHT = 300; // Approximate, can vary. Used for collision avoidance.
const MIN_DISTANCE = 20; // Min distance between posts for initial placement


// --- POST CARD CREATION ---
function createPostCardElement(post) {
  const card = document.createElement('div');
  card.className = "w-[280px] shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-grab bg-white dark:bg-slate-800 select-none post-card-enter";
  card.dataset.postId = post.id;

  const avatarSrc = post.author.avatar || 'https://placehold.co/50x50/E2E8F0/4A5568?text=??'; // Fallback placeholder
  const postImageSrc = post.image || 'https://placehold.co/280x160/E2E8F0/4A5568?text=No+Image'; // Fallback placeholder for post image

  let imageHtml = '';
  if (post.image) {
    imageHtml = `
      <div class="relative h-[160px] w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700">
        <img
          src="${postImageSrc}"
          alt="Post image"
          class="object-cover w-full h-full transition-opacity duration-300"
          onerror="this.onerror=null;this.src='https://placehold.co/280x160/E2E8F0/4A5568?text=Error';"
        />
      </div>`;
  }

  let contentHtml = `<p class="text-sm mb-2 text-slate-700 dark:text-slate-300">${post.content}</p>${imageHtml}`;
  if (post.url) {
    contentHtml = `
      <a href="${post.url}" target="_blank" class="block">
        ${contentHtml}
      </a>`;
  }

  card.innerHTML = `
    <div class="p-3 pb-0 flex flex-row items-center space-x-2">
      <div class="h-8 w-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
        <img src="${avatarSrc}" alt="${post.author.name}" class="h-full w-full object-cover" onerror="this.style.display='none'; this.parentElement.innerHTML = '${post.author.name.substring(0, 2)}';">
      </div>
      <div class="flex flex-col">
        <p class="text-sm font-medium text-slate-900 dark:text-slate-100">${post.author.name}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">${formatDate(post.date)}</p>
      </div>
    </div>
    <div class="p-3">
      ${contentHtml}
    </div>
    <div class="p-3 pt-0 flex justify-between">
      <div class="flex space-x-3 text-slate-500 dark:text-slate-400">
        <button class="flex items-center text-xs hover:text-pink-500 dark:hover:text-pink-400">
          ${heartIconSVG}
          ${post.likes}
        </button>
        <button class="flex items-center text-xs hover:text-blue-500 dark:hover:text-blue-400">
          ${messageCircleIconSVG}
          ${post.comments}
        </button>
        <button class="flex items-center text-xs hover:text-green-500 dark:hover:text-green-400">
          ${share2IconSVG}
        </button>
      </div>
    </div>
  `;
  
  // Add drag functionality
  enableDragging(card);
  
  return card;
}

// --- RENDERING & POSITIONING ---
function updateContainerHeight() {
    let maxHeight = window.innerHeight * 1.5; // Minimum height
    Object.values(positions).forEach(pos => {
        if (pos.element) { // Ensure element exists
            maxHeight = Math.max(maxHeight, pos.y + pos.element.offsetHeight + 50); // 50px buffer
        }
    });
    postsContainerWrapper.style.height = `${maxHeight}px`;
}


function generateInitialPositions(newPosts) {
    if (!postsContainerWrapper) return;

    const containerWidth = postsContainerWrapper.clientWidth;
    // Calculate initial "view" height. This might need adjustment if content loads later.
    // For now, use a large enough area to scatter initial posts.
    const containerVisibleHeight = window.innerHeight * 1.2; // Area for initial scatter

    newPosts.forEach(post => {
        if (!positions[post.id]) {
            let attempts = 0;
            let validPosition = false;
            let x = 0, y = 0;

            while (!validPosition && attempts < 100) {
                x = Math.random() * Math.max(0, containerWidth - CARD_WIDTH - 20); // 20px padding
                y = Math.random() * Math.max(0, containerVisibleHeight - CARD_HEIGHT - 20);

                validPosition = true;
                for (const existingPostId in positions) {
                    if (positions[existingPostId]) { // Ensure position exists
                        const pos = positions[existingPostId];
                        const distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
                        if (distance < (CARD_WIDTH / 2 + CARD_HEIGHT / 2) * 0.6 ) { // Simplified collision check
                            validPosition = false;
                            break;
                        }
                    }
                }
                attempts++;
            }
            positions[post.id] = { x, y, element: null }; // Element will be assigned when rendered
        }
    });
}


function renderPosts(newPosts = []) {
    const fragment = document.createDocumentFragment();
    
    newPosts.forEach((post, index) => {
        if (!positions[post.id] || !positions[post.id].element) { // Only render if not already rendered or position needs element
            const cardElement = createPostCardElement(post);
            const pos = positions[post.id];

            if (!pos) { // Should have been created by generateInitialPositions
                console.warn("Position missing for post:", post.id);
                positions[post.id] = { x: Math.random()*100, y: Math.random()*100, element: null };
            }
            
            cardElement.style.position = 'absolute';
            cardElement.style.left = `${positions[post.id].x}px`;
            cardElement.style.top = `${positions[post.id].y}px`;
            cardElement.style.zIndex = '10';
            
            positions[post.id].element = cardElement; // Store reference to the element

            fragment.appendChild(cardElement);

            // Staggered animation
            setTimeout(() => {
                cardElement.classList.add('post-card-enter-active');
            }, 50 + index * 50); // Add base delay + stagger
        }
    });
    postsContainerWrapper.appendChild(fragment);
    updateContainerHeight();
}


// --- DRAGGING ---
let draggedElement = null;
let offsetX, offsetY;

function enableDragging(element) {
    element.addEventListener('mousedown', (e) => {
        // Prevent dragging if clicking on a button or link inside the card
        if (e.target.closest('button') || e.target.closest('a')) {
            return;
        }
        e.preventDefault(); // Prevent text selection, etc.
        draggedElement = element;
        draggedElement.classList.add('dragging');

        const rect = draggedElement.getBoundingClientRect();
        const containerRect = postsContainerWrapper.getBoundingClientRect();
        
        // Calculate offset from mouse pointer to element's top-left
        // This considers the element's current position relative to viewport
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

function onMouseMove(e) {
    if (!draggedElement) return;
    e.preventDefault();

    const containerRect = postsContainerWrapper.getBoundingClientRect();

    // New position for top-left of element, relative to viewport
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;
    
    // Convert to position relative to the postsContainerWrapper
    // newX is already relative to viewport, containerRect.left is viewport offset of container
    let relativeX = newX - containerRect.left + postsContainerWrapper.scrollLeft;
    let relativeY = newY - containerRect.top + postsContainerWrapper.scrollTop;

    // Boundary checks (optional, but good to have)
    relativeX = Math.max(0, Math.min(relativeX, postsContainerWrapper.scrollWidth - draggedElement.offsetWidth));
    relativeY = Math.max(0, Math.min(relativeY, postsContainerWrapper.scrollHeight - draggedElement.offsetHeight));


    draggedElement.style.left = `${relativeX}px`;
    draggedElement.style.top = `${relativeY}px`;
}

function onMouseUp(e) {
    if (!draggedElement) return;

    const postId = draggedElement.dataset.postId;
    // Final position is already set by onMouseMove. Now update the 'positions' state.
    // The style.left and style.top are already relative to the container parent.
    const finalX = parseFloat(draggedElement.style.left);
    const finalY = parseFloat(draggedElement.style.top);

    if (positions[postId] && (positions[postId].x !== finalX || positions[postId].y !== finalY)) {
        positions[postId].x = finalX;
        positions[postId].y = finalY;
        console.log(`Post ${postId} dragged to x:${finalX}, y:${finalY}`);
        updateContainerHeight(); // Update height in case it was dragged lower
    }
    
    draggedElement.classList.remove('dragging');
    draggedElement = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}


// --- INFINITE SCROLL ---
const observer = new IntersectionObserver(async (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && !isLoading && !allPostsLoaded) {
        isLoading = true;
        loadingIndicator.style.display = 'block';
        try {
            const newPostsData = await apiFetchMorePosts(posts.length);
            if (newPostsData && newPostsData.length > 0) {
                posts = [...posts, ...newPostsData];
                generateInitialPositions(newPostsData); // Generate positions for new ones
                renderPosts(newPostsData); // Render only the new ones
            } else {
                allPostsLoaded = true; // No more posts to load
                loadMoreTrigger.style.display = 'none'; // Hide trigger if no more posts
                console.log("All posts loaded.");
            }
        } catch (error) {
            console.error("Failed to fetch more posts:", error);
        } finally {
            isLoading = false;
            loadingIndicator.style.display = 'none';
        }
    }
}, { threshold: 0.5 }); // Trigger when 50% visible


// --- INITIALIZATION ---
async function initializeApp() {
    isLoading = true;
    loadingIndicator.style.display = 'block';
    try {
        const initialPostsData = await apiFetchInitialPosts(0, 10); // Fetch initial 10 posts
        if (initialPostsData && initialPostsData.length > 0) {
            posts = initialPostsData;
            generateInitialPositions(posts);
            renderPosts(posts); // Render all initial posts
        } else {
            allPostsLoaded = true;
            loadMoreTrigger.style.display = 'none';
        }
        if (posts.length < mockPosts.length && loadMoreTrigger) { // Only observe if more posts might exist
             observer.observe(loadMoreTrigger);
        } else {
            loadMoreTrigger.style.display = 'none'; // No more posts potentially
        }
    } catch (error) {
        console.error("Failed to initialize app:", error);
    } finally {
        isLoading = false;
        loadingIndicator.style.display = 'none';
    }

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // On resize, we might want to re-evaluate positions if cards go out of bounds,
            // or simply update container height. For now, just update container height.
            // The initial random positioning logic doesn't re-run on resize in original.
            updateContainerHeight();
        }, 250);
    });
}

// Start the app
initializeApp();
