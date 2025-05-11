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
    title: "Rocket Penguin",
    description: "一款可愛的飛行遊戲，玩家控制一隻帶著火箭背包的企鵝飛越各種障礙。",
    releaseDate: "2024-12-20",
    imageUrl: "images/games/rocket-penguin.jpg",
    developer: "冰原企鵝",
    tags: ["休閒", "動作", "飛行"],
    steamUrl: "https://store.steampowered.com/app/example5",
  },
  {
    id: "6",
    title: "鍛鐵之路：鐵匠傳奇",
    description: "一款關於鐵匠工藝的模擬遊戲，玩家將學習鍛造技術，打造各種武器裝備。",
    releaseDate: "2024-11-15",
    imageUrl: "images/games/path-of-gear.jpg",
    developer: "鐵匠工作室",
    tags: ["模擬", "工藝", "角色扮演"],
    steamUrl: "https://store.steampowered.com/app/example6",
  },
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
    img.className = "object-cover w-full h-full";
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
});
