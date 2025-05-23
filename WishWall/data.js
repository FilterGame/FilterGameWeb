export const mockPosts = [
  {
    id: "1",
    content:
      "大家好!這裡是台灣遊戲開發組FilterGame,正在努力製作AirBoost:天空機士,是個像素動作+美少女風格的遊戲! 希望大家也會喜歡!",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2325390/header_tchinese.jpg?t=1747810688", 
    url: "https://store.steampowered.com/app/2325390/AirBoost/",
    date: "2025-05-23",
    author: {
      id: "user1",
      name: "FilterGame遊戲開發",
      avatar: "https://placehold.co/50x50/CBD5E0/4A5568?text=KO", // Using placehold.co for demo
    },
	officialUrl: "https://filtergame.com/",
	category: "遊戲",
  },
  {
    id: "2",
    content: "這裡是系統！歡迎大家使用表單投稿！這裡是給2025從事ACG相關創作作者說說自己進展跟生存報告的地方，一個人理論上是一篇，等新年會再開新的板塊！也希望能讓大家有一個溫馨的地方，一起努力創作！",
    date: "2025-05-23",
    author: {
      id: "系統",
      name: "系統",
      avatar: "https://placehold.co/50x50/C7D2FE/3730A3?text=INFO",
    },
	category: "系統",
  },
    {
    id: "3",
    content: "2個月把原本的遊戲架構大改了一番，並參加了巴哈ACG創作大賽",
    date: "2025-05-23",
    author: {
      id: "HS",
      name: "地獄貓工作室",
      avatar: "https://placehold.co/50x50/C7D2FE/3730A3?text=HS",
    },
    url: "https://www.facebook.com/share/v/15nBuWyp99/",
	category: "遊戲",
  },
    {
    id: "4",
    content: "大家好~我們5/31那天以「兔子茶會」名義，在台北圓山舉辦的「CooMIC二元創庫3」同人場攤位準備三款我開發的以Vtuber社團「米克斯學園」的二創小遊戲給大家試玩，目前也正在努力開發今年8月新的二創小遊戲哦~",
    date: "2025-05-23",
    author: {
      id: "Mirai",
      name: "兔子茶會",
      avatar: "https://placehold.co/50x50/C7D2FE/3730A3?text=Mirai",
    },
    url: "https://x.com/Mirai_so_Sad/status/1924412309667193132",
	category: "遊戲",
	officialUrl: "https://miraisosad.itch.io",
    image: "https://filtergame.com/WishWall/Img/ID_4.png", 
  },
    {
    id: "5",
    content: "有充足的肌肉，才能繼續開發遊戲！我要吃肉！",
    date: "2025-05-23",
    author: {
      id: "YOH",
      name: "葉開罐工作室",
      avatar: "https://placehold.co/50x50/C7D2FE/3730A3?text=YOH",
    },
    url: "https://www.threads.com/@yohcanstudio/post/DJ-mMtzyznk?xmt=AQF04nqNi0HqsBiTpr20BOY8kzeEn45wajU8WrKYr5t_OQ",
	category: "遊戲",
	officialUrl: "https://linktr.ee/yohcanstudio",
    image: "https://filtergame.com/WishWall/Img/ID_5.png", 
  },
    {
    id: "6",
    content: "努力生存，努力製作百合遊戲！",
    date: "2025-05-23",
    author: {
      id: "Yurif",
      name: "Yurif",
      avatar: "https://placehold.co/50x50/C7D2FE/3730A3?text=Yurif",
    },
    url: "https://www.facebook.com/yurif.original",
	category: "遊戲",
	officialUrl: "https://www.facebook.com/yurif.original",
    image: "https://filtergame.com/WishWall/Img/ID_6.jpg", 
  },

  
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
