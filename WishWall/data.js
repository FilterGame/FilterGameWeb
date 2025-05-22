export const mockPosts = [
  {
    id: "1",
    content:
      "少女たちが危険な道路を探索するピクセル風アクション「AirBoost エアシップの旅士」の続報が「TOKYO INDIE GAMES SUMMIT 2025」に出展！",
    image: "https://placehold.co/600x400/E2E8F0/4A5568?text=Post+Image+1", // Using placehold.co for demo
    url: "https://example.com/post1",
    date: "2024-05-20T10:30:00Z",
    author: {
      id: "user1",
      name: "Gamer@ゲーム情報",
      avatar: "https://placehold.co/50x50/CBD5E0/4A5568?text=A1", // Using placehold.co for demo
    },
    likes: 277,
    comments: 10,
  },
  {
    id: "2",
    content: "探索未来的前端技术：WebAssembly 与 JavaScript 的融合之路。性能与可移植性的新高度！",
    image: "https://placehold.co/600x400/D1FAE5/065F46?text=Tech+Post",
    url: "https://example.com/post2",
    date: "2024-05-21T12:00:00Z",
    author: {
      id: "user2",
      name: "前端开发者",
      avatar: "https://placehold.co/50x50/C7D2FE/3730A3?text=前端",
    },
    likes: 152,
    comments: 25,
  },
  {
    id: "3",
    content: "今日的午后甜点：自制草莓芝士蛋糕，配上一杯手冲咖啡，完美！ #美食 #甜点",
    image: "https://placehold.co/600x400/FEF3C7/92400E?text=Dessert",
    // no url for this one
    date: "2024-05-22T15:45:00Z",
    author: {
      id: "user3",
      name: "美食家小李",
      avatar: "https://placehold.co/50x50/FCE7F3/831843?text=小李",
    },
    likes: 301,
    comments: 40,
  },
  // Add 10-20 more posts here to test infinite scroll
  {
    id: "4",
    content: "GitHub Pages 新功能发布：现在支持更复杂的静态站点部署流程。",
    image: "https://placehold.co/600x400/E0E7FF/3730A3?text=GitHub",
    url: "https://example.com/post4",
    date: "2024-05-23T09:15:00Z",
    author: {
      id: "user4",
      name: "DevOps 先锋",
      avatar: "https://placehold.co/50x50/D1FAE5/065F46?text=DO",
    },
    likes: 99,
    comments: 5,
  },
  {
    id: "5",
    content: "周末徒步计划：征服城市周边的XX山，风景绝佳，空气清新。",
    // no image for this one
    url: "https://example.com/post5",
    date: "2024-05-24T18:00:00Z",
    author: {
      id: "user5",
      name: "户外爱好者",
      avatar: "https://placehold.co/50x50/E0E7FF/3730A3?text=户外",
    },
    likes: 120,
    comments: 18,
  },
  // Add more posts...
  { id: "6", content: "Post 6 content...", image: "https://placehold.co/600x400/cccccc/333333?text=P6", date: "2024-05-25T10:00:00Z", author: { id: "user6", name: "Author 6", avatar: "https://placehold.co/50x50/cccccc/333333?text=A6" }, likes: 50, comments: 3 },
  { id: "7", content: "Post 7 content...", image: "https://placehold.co/600x400/cccccc/333333?text=P7", date: "2024-05-26T11:00:00Z", author: { id: "user7", name: "Author 7", avatar: "https://placehold.co/50x50/cccccc/333333?text=A7" }, likes: 60, comments: 6 },
  { id: "8", content: "Post 8 content...", date: "2024-05-27T12:00:00Z", author: { id: "user8", name: "Author 8", avatar: "https://placehold.co/50x50/cccccc/333333?text=A8" }, likes: 70, comments: 7 },
  { id: "9", content: "Post 9 content...", image: "https://placehold.co/600x400/cccccc/333333?text=P9", date: "2024-05-28T13:00:00Z", author: { id: "user9", name: "Author 9", avatar: "https://placehold.co/50x50/cccccc/333333?text=A9" }, likes: 80, comments: 8 },
  { id: "10", content: "Post 10 content...", date: "2024-05-29T14:00:00Z", author: { id: "user10", name: "Author 10", avatar: "https://placehold.co/50x50/cccccc/333333?text=A10" }, likes: 90, comments: 9 },
  { id: "11", content: "Post 11 content...", image: "https://placehold.co/600x400/cccccc/333333?text=P11", date: "2024-05-30T15:00:00Z", author: { id: "user11", name: "Author 11", avatar: "https://placehold.co/50x50/cccccc/333333?text=A11" }, likes: 100, comments: 10 },
  { id: "12", content: "Post 12 content...", date: "2024-05-31T16:00:00Z", author: { id: "user12", name: "Author 12", avatar: "https://placehold.co/50x50/cccccc/333333?text=A12" }, likes: 110, comments: 11 },
];

// Simulate fetching posts
export async function fetchPosts(skip = 0, limit = 10) {
  console.log(`Fetching posts: skip=${skip}, limit=${limit}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const paginatedPosts = mockPosts.slice(skip, skip + limit);
      resolve(paginatedPosts);
    }, 500); // Simulate network delay
  });
}

export async function fetchMorePosts(currentPostCount) {
    console.log(`Fetching more posts, current count: ${currentPostCount}`);
    // For this demo, let's fetch 5 more posts each time
    const newPosts = await fetchPosts(currentPostCount, 5);
    return newPosts;
}
