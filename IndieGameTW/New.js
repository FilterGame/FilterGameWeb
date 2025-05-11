// --- 模擬的遊戲發售資料（直接複製自 game-data.ts） ---
const gameReleasesData = [
  {
    id: "1",
    title: "Bionic Bay: 換影循跡",
    description: "科學家藉由一種特殊的「交換」裝置，在這充滿奇幻科技與致命陷阱的古生化機械世界中，尋找逃生的出路並揭開藏匿其中的秘密。",
    releaseDate: "2025-04-17",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1928690/header.jpg",
    developer: "Psychoflow Studio, Mureena Oy",
    tags: ["平台解謎", "解謎", "2D"],
    steamUrl: "https://store.steampowered.com/app/1928690/Bionic_Bay/",
  },
  {
    id: "2",
    title: "節奏魔女 舞動的骷髏",
    description: "《節奏魔女 舞動的骷髏》一款結合類倖存者與音樂節奏的遊戲。你需要跟隨著音樂律動打擊，閃躲隨著音樂節拍移動、攻擊的怪物們。在通往永恆之美的旅程中，擊敗跳舞怪人、食屍鬼、巨龍...！",
    releaseDate: "2025-05-09",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2951580/header_tchinese.jpg",
    developer: "Dusklight CO., LTD.",
    tags: ["節奏", "彈幕", "女主人翁"],
    steamUrl: "https://store.steampowered.com/app/2951580/_/",
  },
  {
    id: "3",
    title: "百劍討妖傳綺譚",
    description: "在絢爛的和風Roguelite世界揮灑武藝、斬盡天下惡逆非道！《百劍討妖傳綺譚》是一款以妖魔橫行的江戶時代為舞台的動作RPG。操使千變萬化的妖刀、討伐各路魑魅魍魎，你將在一次次生死輪迴中殺出通往真相的血路...",
    releaseDate: "2025-05-15",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2169950/header_tchinese.jpg",
    developer: "7QUARK",
    tags: ["動作類Rogue", "探索", "3D"],
    steamUrl: "https://store.steampowered.com/app/2169950/_/",
  },
  {
    id: "4",
    title: "Herogue",
    description: "這是一款將回合制戰鬥與Roguelike結合的遊戲，你將扮演一隻隊伍的領隊，透過升級建構隊伍的技能流派。在不同的角色以及升級選擇中不斷嘗試，最終找到屬於你的致勝方法!",
    releaseDate: "2025-03-24",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2067270/header.jpg",
    developer: "巴豆肥工作室",
    tags: ["類Rogue", "回合制戰鬥", "2D"],
    steamUrl: "https://store.steampowered.com/app/2067270/Herogue/",
  },
  {
    id: "5",
    title: "Recall: Empty Wishes 空願",
    description: "基於2010年代臺灣背景的心理驚悚作品。自從弟弟子維神秘地失蹤後，姊姊子晴決定尋找其失蹤真相。子晴越是深入調查，越是陷入現實與幻境的邊界之中，令人不安的秘密也將被一層層揭開。",
    releaseDate: "2025-2-13",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1683270/header.jpg",
    developer: "Puff Hook Studio",
    tags: ["心理恐怖", "劇情豐富", "冒險"],
    steamUrl: "https://store.steampowered.com/app/1683270/Recall_Empty_Wishes/",
  },
  {
    id: "6",
    title: "都市傳說冒險團2 ：分身",
    description: "《都市傳說冒險團2：分身》是一款以現代城市為舞台，探尋都市傳說的沉浸式冒險遊戲",
    releaseDate: "2025-4-25",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2651290/header_tchinese.jpg",
    developer: "Toii Games",
    tags: ["冒險", "視覺小說", "探索"],
    steamUrl: "https://store.steampowered.com/app/2651290/2/",
  },
	{
    id: "7",
    title: "英勇紋章",
    description: "英勇紋章是一款 Roguelike 牌組構築遊戲。你可以組成多達三人的小隊或是孤身前行，運用不同角色與職業的卡牌組合為你的牌組帶來千變萬化的戰術。打造獨一無二的牌組以克服在黯霧所籠罩的碎域中隱藏的重重阻礙，並證明你的英勇！",
    releaseDate: "2025-3-24",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1864830/header_tchinese.jpg",
    developer: "Far Star Studio",
    tags: ["卡牌對戰", "輕度Rouge", "卡牌遊戲"],
    steamUrl: "https://store.steampowered.com/app/1864830/_/",
  },
	{
    id: "8",
    title: "靈能哨衛 : 無限 Psionic Sentry : Infinite",
    description: "[靈能哨衛:無限]是一款第三人稱的美少女動作射擊Rougelike， 爽快但任何玩家都能上手的反擊系統是遊戲操作的核心， 在戰鬥中觀察敵人的弱點將其破除則是遊戲策略的重點。",
    releaseDate: "2025-2-3",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2598800/header_tchinese.jpg",
    developer: "Roy, 響雨互動娛樂,",
    tags: ["女主人翁", "日本動畫", "第三人稱射擊"],
    steamUrl: "https://store.steampowered.com/app/2598800/___Psionic_Sentry__Infinite/",
  },

];

// --- 未發售關注遊戲資料（依定義順序顯示） ---
const unreleasedGamesData = [
  {
    id: "a1",
    title: "AirBoost:天空機士",
    description: "像素風少女動作遊戲，預定 2025 Q4 發售。",
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2325390/header_tchinese.jpg",
    developer: "FilterGame",
    tags: ["日本動畫", "女主人翁", "可愛"],
    steamUrl: "https://store.steampowered.com/app/2325390/AirBoost/"
  },
  // ...其他未發售項目
];


// 取得「近期發售」並依日期降冪排序
function getRecentReleases() {
  return gameReleasesData
    .slice()
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
}

// 簡易的日期格式化：'dd' & 'MMM yyyy'
function formatDate(dateString, formatStr) {
  const date = new Date(dateString);
  if (formatStr === "dd") {
    return String(date.getDate()).padStart(2, "0");
  }
  if (formatStr === "MMM yyyy") {
    // 使用瀏覽器區域設定，短月份 + 年份
    return date.toLocaleDateString("default", {
      month: "short",
      year: "numeric",
    });
  }
  return dateString;
}

// 畫面載入後，動態建立時間軸
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("timeline-container");
  getRecentReleases().forEach((release) => {
    // 外層項目
    const item = document.createElement("div");
    item.className = "flex mb-16 relative";

    // 左側日期
    const dateBox = document.createElement("div");
    dateBox.className = "w-[120px] pr-4 pt-4 flex flex-col items-end";
    const day = document.createElement("div");
    day.className = "text-lg font-bold";
    day.textContent = formatDate(release.releaseDate, "dd");
    const mon = document.createElement("div");
    mon.className = "text-sm text-gray-600";
    mon.textContent = formatDate(release.releaseDate, "MMM yyyy");
    dateBox.append(day, mon);
    item.append(dateBox);

    // 連接點
    const dot = document.createElement("div");
    dot.className =
      "absolute left-[120px] top-[30px] w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 z-10";
    item.append(dot);

    // 連接線
    const line = document.createElement("div");
    line.className =
      "absolute left-[120px] top-[30px] h-0.5 w-[40px] border-t-2 border-dashed border-gray-400";
    item.append(line);

    // 右側內容卡片
    const card = document.createElement("div");
    card.className =
      "ml-10 flex-1 bg-white rounded-lg shadow-md overflow-hidden";
    const flex = document.createElement("div");
    flex.className = "flex flex-col md:flex-row";
    // 圖片
    const imgWrap = document.createElement("div");
    imgWrap.className = "md:w-1/3 relative h-[200px]";
    const img = document.createElement("img");
    img.src = release.imageUrl;
    img.alt = release.title;
    img.className = "object-contain w-full h-full bg-white";
    imgWrap.append(img);
    // 文字內容
    const info = document.createElement("div");
    info.className = "p-4 md:w-2/3";
    const title = document.createElement("h3");
    title.className = "text-xl font-bold mb-2";
    title.textContent = release.title;
    const desc = document.createElement("p");
    desc.className = "text-gray-700 mb-3";
    desc.textContent = release.description;
    // 標籤
    const tags = document.createElement("div");
    tags.className = "flex flex-wrap gap-2 mb-3";
    release.tags.forEach((t) => {
      const span = document.createElement("span");
      span.className = "bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm";
      span.textContent = t;
      tags.append(span);
    });
    // 底部：開發商 + Steam 連結
    const footer = document.createElement("div");
    footer.className = "flex justify-between items-center";
    const dev = document.createElement("div");
    dev.className = "text-sm text-gray-600";
    dev.textContent = "開發商: " + release.developer;
    const a = document.createElement("a");
    a.href = release.steamUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.className =
      "bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition";
    a.textContent = "Steam頁面";
    footer.append(dev, a);

    // 組裝卡片
    info.append(title, desc, tags, footer);
    flex.append(imgWrap, info);
    card.append(flex);
    item.append(card);

    container.append(item);
  });
  
    // ==== 新增：渲染「未發售關注列表」 ====
  const unreleasedContainer = document.getElementById("unreleased-container");
  unreleasedGamesData.forEach((game) => {
    // 複用時間軸樣式：但不排序、直接按照陣列順序
    const item = document.createElement("div");
    item.className = "flex mb-16 relative";

    // 左側只顯示「待」字，不顯示日期
    const dateBox = document.createElement("div");
    dateBox.className = "w-[120px] pr-4 pt-4 flex flex-col items-end";
    const label = document.createElement("div");
    label.className = "text-lg font-bold text-gray-500";
    label.textContent = "待"; // 或你想要的標示
    dateBox.append(label);
    item.append(dateBox);

    // 連接點 & 線（可跟已發售相同）
    const dot = document.createElement("div");
    dot.className = "absolute left-[120px] top-[30px] w-3 h-3 bg-gray-400 rounded-full transform -translate-x-1/2 z-10";
    const line = document.createElement("div");
    line.className = "absolute left-[120px] top-[30px] h-0.5 w-[40px] border-t-2 border-dashed border-gray-300";
    item.append(dot, line);

    // 右側卡片，同已發售邏輯
    const card = document.createElement("div");
    card.className = "ml-10 flex-1 bg-white rounded-lg shadow-md overflow-hidden";
    const flex = document.createElement("div");
    flex.className = "flex flex-col md:flex-row";
    const imgWrap = document.createElement("div");
    imgWrap.className = "md:w-1/3 relative h-[200px]";
    const img = document.createElement("img");
    img.src = game.imageUrl;
    img.alt = game.title;
    img.className = "object-cover w-full h-full";
    imgWrap.append(img);

    const info = document.createElement("div");
    info.className = "p-4 md:w-2/3";
    info.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${game.title}</h3>
      <p class="text-gray-700 mb-3">${game.description}</p>
      <div class="flex flex-wrap gap-2 mb-3">
        ${game.tags.map(t => `<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">${t}</span>`).join("")}
      </div>
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-600">開發商: ${game.developer}</div>
        <a href="${game.steamUrl}"
           target="_blank" rel="noopener"
           class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
          詳細
        </a>
      </div>
    `;
    flex.append(imgWrap, info);
    card.append(flex);
    item.append(card);

    unreleasedContainer.append(item);
  });
	
  
});
