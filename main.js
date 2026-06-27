/* ============================================
   GitHub JSON 読み込み先（あなた専用）
============================================ */

const POKEMON_JSON_URL =
  "https://tofumental555.github.io/ingredient-simulator/pokemon_data.json";

const ING_JSON_URL =
  "https://tofumental555.github.io/ingredient-simulator/ingredient_energy.json";

/* ============================================
   レシピデータ
============================================ */

const RECIPE_DATA = {
  genres: ["カレー", "サラダ", "デザート"],
  recipes: {
    "カレー": {
      "とくせんリンゴカレー": { "とくせんリンゴ": 7 },
      "あぶりテールカレー": { "おいしいしっぽ": 8, "げきからハーブ": 25 },
      "サンパワートマトカレー": { "あんみんトマト": 10, "げきからハーブ": 5 },
      "ぜったいねむりバターカレー": {
        "ほっこりポテト": 18,
        "あんみんトマト": 15,
        "リラックスカカオ": 12,
        "モーモーミルク": 10
      },
      "からくちネギもりカレー": {
        "ふといナガネギ": 14,
        "あったかジンジャー": 10,
        "げきからハーブ": 8
      },
      "キノコのほうしカレー": {
        "あじわいキノコ": 14,
        "ほっこりポテト": 9
      },
      "おやこあいカレー": {
        "あまいミツ": 12,
        "とくせんリンゴ": 11,
        "とくせんエッグ": 8,
        "ほっこりポテト": 4
      },
      "満腹チーズバーグカレー": {
        "モーモーミルク": 8,
        "マメミート": 8
      },
      "ほっこりホワイトシチュー": {
        "モーモーミルク": 10,
        "ほっこりポテト": 8,
        "あじわいキノコ": 4
      },
      "たんじゅんホワイトシチュー": { "モーモーミルク": 7 },
      "マメバーグカレー": { "マメミート": 7 },
      "ベイビィハニーカレー": { "あまいミツ": 7 },
      "ニンジャカレー": {
        "ワカクサ大豆": 24,
        "マメミート": 9,
        "ふといナガネギ": 12,
        "あじわいキノコ": 5
      },
      "ひでりカツレツカレー": {
        "マメミート": 10,
        "ピュアなオイル": 5
      },
      "とけるオムカレー": {
        "とくせんエッグ": 10,
        "あんみんトマト": 6
      },
      "ビルドアップマメカレー": {
        "ワカクサ大豆": 12,
        "マメミート": 6,
        "げきからハーブ": 4,
        "とくせんエッグ": 4
      },
      "じゅうなんコーンシチュー": {
        "ワカクサコーン": 14,
        "モーモーミルク": 8,
        "ほっこりポテト": 8
      },
      "れんごくコーンキーマカレー": {
        "げきからハーブ": 27,
        "マメミート": 24,
        "ワカクサコーン": 14,
        "あったかジンジャー": 12
      },
      "ピヨピヨパンチ辛口カレー": {
        "めざましコーヒー": 11,
        "げきからハーブ": 11,
        "あまいミツ": 11
      },
      "めざめるパワーシチュー": {
        "ワカクサ大豆": 28,
        "あんみんトマト": 25,
        "あじわいキノコ": 23,
        "めざましコーヒー": 16
      },
      "いあいぎりすき焼きカレー": {
        "ふといナガネギ": 27,
        "マメミート": 26,
        "あまいミツ": 26,
        "とくせんエッグ": 22
      },
      "なりきりバケッチャシチュー": {
        "ずっしりカボチャ": 10,
        "マメミート": 16,
        "ほっこりポテト": 18,
        "あじわいキノコ": 25
      },
      "しんりょくアボカドグラタン": {
        "つやつやアボカド": 22,
        "ほっこりポテト": 20,
        "モーモーミルク": 41,
        "ピュアなオイル": 32
      }
    },

    /* --- サラダ・デザートは長いので PART2 に続く --- */
  }
};
    /* ===== サラダ ===== */
    "サラダ": {
      "とくせんリンゴサラダ": { "とくせんリンゴ": 8 },
      "マメハムサラダ": { "マメミート": 8 },
      "あんみんトマトサラダ": { "あんみんトマト": 8 },
      "ゆきかきシーザーサラダ": { "モーモーミルク": 10, "マメミート": 6 },
      "ねっぷうとうふサラダ": { "ワカクサ大豆": 10, "げきからハーブ": 6 },
      "うるおいとうふサラダ": { "ワカクサ大豆": 15, "あんみんトマト": 9 },
      "みだれづきコーンサラダ": { "ワカクサコーン": 9, "ピュアなオイル": 8 },
      "メロメロりんごのチーズサラダ": {
        "とくせんリンゴ": 15,
        "モーモーミルク": 5,
        "ピュアなオイル": 3
      },
      "めんえきネギサラダ": {
        "ふといナガネギ": 10,
        "あったかジンジャー": 5
      },
      "モーモーカプレーゼ": {
        "モーモーミルク": 12,
        "ピュアなオイル": 5,
        "あんみんトマト": 6
      },
      "ばかぢからワイルドサラダ": {
        "マメミート": 9,
        "ほっこりポテト": 3,
        "とくせんエッグ": 5,
        "あったかジンジャー": 6
      },
      "ムラっけチョコミートサラダ": {
        "リラックスカカオ": 14,
        "マメミート": 9
      },
      "くいしんぼうポテトサラダ": {
        "ほっこりポテト": 14,
        "とくせんエッグ": 9,
        "マメミート": 7,
        "とくせんリンゴ": 6
      },
      "オーバーヒートサラダ": {
        "げきからハーブ": 17,
        "あんみんトマト": 8,
        "あったかジンジャー": 10
      },
      "キノコのほうしサラダ": {
        "あじわいキノコ": 17,
        "あんみんトマト": 8,
        "ピュアなオイル": 8
      },
      "ヤドンテールのペッパーサラダ": {
        "おいしいしっぽ": 10,
        "げきからハーブ": 10,
        "ピュアなオイル": 15
      },
      "めいそうスイートサラダ": {
        "とくせんリンゴ": 21,
        "あまいミツ": 16,
        "ワカクサコーン": 12
      },
      "ニンジャサラダ": {
        "ワカクサ大豆": 19,
        "ふといナガネギ": 15,
        "あったかジンジャー": 11,
        "あじわいキノコ": 12
      },
      "ワカクササラダ": {
        "ほっこりポテト": 9,
        "ピュアなオイル": 22,
        "あんみんトマト": 14,
        "ワカクサコーン": 17
      },
      "クロスチョップドサラダ": {
        "マメミート": 15,
        "とくせんエッグ": 20,
        "あんみんトマト": 10,
        "ワカクサコーン": 11
      },
      "まけんきコーヒーサラダ": {
        "めざましコーヒー": 28,
        "マメミート": 28,
        "ピュアなオイル": 22,
        "ほっこりポテト": 22
      },
      "ごろごろねっとうサラダ": {
        "ほっこりポテト": 30,
        "あじわいキノコ": 27,
        "ワカクサコーン": 18,
        "ずっしりカボチャ": 20
      },
      "じならしワカモレチップス": {
        "ワカクサ大豆": 22,
        "げきからハーブ": 30,
        "ワカクサコーン": 25,
        "つやつやアボカド": 28
      },
      "りんごさんヨーグルトサラダ": {
        "モーモーミルク": 18,
        "とくせんリンゴ": 28,
        "とくせんエッグ": 35,
        "あんみんトマト": 23
      },
      "はなふぶきミモザサラダ": {
        "マメミート": 12,
        "ほっこりポテト": 15,
        "ピュアなオイル": 17,
        "とくせんエッグ": 25
      }
    },

    /* ===== デザート ===== */
    "デザート": {
      "みつあつめチョコワッフル": {
        "あまいミツ": 38,
        "ピュアなオイル": 28,
        "ワカクサコーン": 28,
        "リラックスカカオ": 21
      },
      "ドキドキこわいかおパンケーキ": {
        "あまいミツ": 32,
        "あんみんトマト": 29,
        "とくせんエッグ": 24,
        "ずっしりカボチャ": 18
      },
      "ドオーのエクレア": {
        "リラックスカカオ": 30,
        "モーモーミルク": 26,
        "めざましコーヒー": 24,
        "あまいミツ": 22
      },
      "スパークスパイスコーラ": {
        "とくせんリンゴ": 35,
        "ふといナガネギ": 20,
        "あったかジンジャー": 20,
        "めざましコーヒー": 12
      },
      "フラワーギフトマカロン": {
        "とくせんエッグ": 25,
        "リラックスカカオ": 25,
        "あまいミツ": 17,
        "モーモーミルク": 10
      },
      "おちゃかいコーンスコーン": {
        "とくせんリンゴ": 20,
        "あったかジンジャー": 20,
        "ワカクサコーン": 18,
        "モーモーミルク": 9
      },
      "グラスミキサースムージー": {
        "つやつやアボカド": 18,
        "あんみんトマト": 16,
        "モーモーミルク": 14
      },
      "プリンのプリンアラモード": {
        "あまいミツ": 20,
        "とくせんエッグ": 15,
        "とくせんリンゴ": 10,
        "モーモーミルク": 10
      },
      "かたやぶりコーンティラミス": {
        "めざましコーヒー": 14,
        "ワカクサコーン": 14,
        "モーモーミルク": 12
      },
      "はやおきコーヒーゼリー": {
        "めざましコーヒー": 16,
        "あまいミツ": 12,
        "モーモーミルク": 14
      },
      "だいばくはつポップコーン": {
        "ワカクサコーン": 15,
        "ピュアなオイル": 14,
        "モーモーミルク": 7
      },
      "ちからもちソイドーナッツ": {
        "ワカクサ大豆": 16,
        "ピュアなオイル": 12,
        "リラックスカカオ": 7
      },
      "ネロリのデトックスティー": {
        "とくせんリンゴ": 15,
        "あったかジンジャー": 11,
        "あじわいキノコ": 9
      },
      "ふくつのジンジャークッキー": {
        "あまいミツ": 14,
        "あったかジンジャー": 12,
        "リラックスカカオ": 5,
        "とくせんエッグ": 4
      },
      "あくまのキッスフルーツオレ": {
        "とくせんリンゴ": 11,
        "モーモーミルク": 9,
        "リラックスカカオ": 8,
        "あまいミツ": 7
      },
      "あまいかおりチョコケーキ": {
        "あまいミツ": 9,
        "リラックスカカオ": 8,
        "モーモーミルク": 7
      },
      "はなびらのまいチョコタルト": {
        "とくせんリンゴ": 11,
        "リラックスカカオ": 11
      },
      "はりきりプロテインスムージー": {
        "ワカクサ大豆": 15,
        "リラックスカカオ": 8
      },
      "おおきいマラサダ": {
        "ピュアなオイル": 10,
        "モーモーミルク": 7,
        "あまいミツ": 6
      },
      "マイペースやさいジュース": {
        "あんみんトマト": 9,
        "とくせんリンゴ": 7
      },
      "かるわざソイケーキ": {
        "とくせんエッグ": 8,
        "ワカクサ大豆": 7
      },
      "ひのこのジンジャーティー": {
        "あったかジンジャー": 9,
        "とくせんリンゴ": 7
      },
      "じゅくせいスイートポテト": {
        "ほっこりポテト": 9,
        "モーモーミルク": 5
      },
      "ねがいごとアップルパイ": {
        "とくせんリンゴ": 12,
        "モーモーミルク": 4
      },
      "クラフトサイコソーダ": { "あまいミツ": 9 }
    }
  }
};
/* ============================================
   食材名 正規化
============================================ */

const ING_NORM = {
  "あまいみつ": "あまいミツ",
  "あまいミツ": "あまいミツ",
  "とくせんりんご": "とくせんリンゴ",
  "とくせんリンゴ": "とくせんリンゴ",
  "ふといながねぎ": "ふといナガネギ",
  "ふといナガネギ": "ふといナガネギ",
  "おいしいしっぽ": "おいしいしっぽ",
  "おいしいシッポ": "おいしいしっぽ"
};

function normIng(n) {
  return ING_NORM[n] ?? n;
}

/* ============================================
   定数
============================================ */

const SUB_SKILLS = [
  "その他",
  "きのみの数S",
  "おてスピM",
  "おてスピS",
  "おてぼ",
  "食材確率M",
  "食材確率S",
  "スキル確率M",
  "スキル確率S"
];

const PATTERNS = ["aaa", "aab", "aac", "aba", "abb", "abc"];

const NATURES_UP = [
  ["other", "その他（補正なし）"],
  ["speedUp", "おてスピ↑"],
  ["foodUp", "食材確率↑"],
  ["skillUp", "スキル確率↑"]
];

const NATURES_DOWN = [
  ["other", "その他（補正なし）"],
  ["speedDown", "おてスピ↓"],
  ["foodDown", "食材確率↓"],
  ["skillDown", "スキル確率↓"]
];

const SUB_IDS = ["sub10", "sub25", "sub50", "sub75", "sub100"];
const SUB_LABELS = ["Lv10", "Lv25", "Lv50", "Lv75", "Lv100"];

const SLOT_CONFIG = [
  { key: "berry", label: "きのみ", emoji: "🍒", cls: "berry" },
  { key: "ing", label: "食材", emoji: "🍳", cls: "ing" },
  { key: "skill", label: "スキル", emoji: "⚡", cls: "skill" },
  { key: "healer", label: "ヒーラー", emoji: "💚", cls: "healer" }
];

const WEEK_SECONDS = 7 * 86400;
const LEVEL_TIME_COEF = 0.002;
const BASE_DIVISOR = 2.222;

/* ============================================
   状態
============================================ */

let pokemonDB = [];
let ingredientEnergyDB = {};
let recipeRows = [];
let uid = 0;

const comp = { berry: 0, ing: 0, skill: 0, healer: 0 };
let pokemonSlots = [];

/* ============================================
   DB 読み込み
============================================ */

async function loadDB() {
  try {
    pokemonDB = await (await fetch(POKEMON_JSON_URL)).json();
  } catch (e) {
    console.warn("pokemon_data.json 読み込みエラー:", e);
    pokemonDB = [];
  }

  try {
    ingredientEnergyDB = await (await fetch(ING_JSON_URL)).json();
  } catch (e) {
    console.warn("ingredient_energy.json 読み込みエラー:", e);
    ingredientEnergyDB = {};
  }

  initEvents();
}

/* ============================================
   イベント初期化
============================================ */

function initEvents() {
  document.getElementById("btnToStep1").addEventListener("click", () => {
    buildPokemonSlots();
    goStep(1);
  });

  document.getElementById("btnBack0").addEventListener("click", () => goStep(0));
  document.getElementById("btnToStep2").addEventListener("click", () => goStep(2));
  document.getElementById("btnBack1").addEventListener("click", () => goStep(1));
  document.getElementById("btnToStep3").addEventListener("click", () => goStep(3));
  document.getElementById("btnBack2").addEventListener("click", () => goStep(2));

  document.getElementById("btnRestart").addEventListener("click", () => {
    comp.berry = comp.ing = comp.skill = comp.healer = 0;
    updateCompUI();
    recipeRows = [];
    document.getElementById("recipeList").innerHTML = "";
    updateRecipeTotal();
    goStep(0);
  });

  document.getElementById("btnAddRecipe").addEventListener("click", addRecipeRow);

  addRecipeRow(); // 初期料理行
}

/* ============================================
   ステップ切替
============================================ */

function goStep(n) {
  ["step0", "step1", "step2", "step3"].forEach((id, i) => {
    document.getElementById(id).classList.toggle("pks-hidden", i !== n);
  });

  ["stepTab0", "stepTab1", "stepTab2", "stepTab3"].forEach((id, i) => {
    const el = document.getElementById(id);
    el.className =
      "pks-step" + (i < n ? " done" : i === n ? " active" : "");
  });

  if (n === 3) calculate();
}

/* ============================================
   編成カウンター
============================================ */

function changeComp(key, delta) {
  const total = comp.berry + comp.ing + comp.skill + comp.healer;
  const next = comp[key] + delta;

  if (next < 0) return;
  if (delta > 0 && total >= 5) return;

  comp[key] = next;
  updateCompUI();
}

function updateCompUI() {
  const total = comp.berry + comp.ing + comp.skill + comp.healer;

  SLOT_CONFIG.forEach((s) => {
    document.getElementById(`compVal_${s.key}`).textContent = comp[s.key];
  });

  const totalEl = document.getElementById("compTotal");
  totalEl.textContent = `合計 ${total} / 5 体`;
  totalEl.className = "pks-comp-total " + (total === 5 ? "ok" : "ng");

  document.getElementById("btnToStep1").disabled = total !== 5;
}
/* ============================================
   ポケモンスロット生成
============================================ */

let ingPanel = null;

function buildPokemonSlots() {
  pokemonSlots = [];
  ingPanel = null;

  const section = document.getElementById("pokemonSections");
  section.innerHTML = "";

  SLOT_CONFIG.forEach((cfg) => {
    const count = comp[cfg.key];
    if (count === 0) return;

    const panel = document.createElement("div");
    panel.className = "pks-panel";

    if (cfg.key === "ing") {
      ingPanel = panel;

      const titleBar = document.createElement("div");
      titleBar.style.cssText =
        "display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;";
      titleBar.innerHTML = `
        <span class="pks-panel-title" style="margin-bottom:0" id="ingPanelTitle">
          ${cfg.emoji} ${cfg.label}ポケモン（枠${count}・登録${count}体）
        </span>
        <button class="pks-btn-add" style="width:auto;margin:0;padding:6px 14px;font-size:12px;"
          onclick="addIngPokemonCard()">＋ 追加</button>
      `;
      panel.appendChild(titleBar);
      panel.setAttribute("id", "ingPanelInner");

      for (let i = 0; i < count; i++) {
        addIngPokemonCard(panel);
      }
    } else {
      panel.innerHTML = `<div class="pks-panel-title">${cfg.emoji} ${cfg.label}ポケモン（${count}体）</div>`;

      for (let i = 0; i < count; i++) {
        const id = uid++;
        const prefix = `slot_${id}`;
        pokemonSlots.push({ slotType: cfg.key, prefix, cls: cfg.cls });

        const card = document.createElement("div");
        card.className = "pks-pokemon-card";
        card.innerHTML = `
          <div class="pks-card-header">
            <span class="pks-card-label ${cfg.cls}">${cfg.emoji} ${cfg.label} ${i + 1}</span>
          </div>
          ${pokemonFormHTML(prefix)}
        `;
        panel.appendChild(card);
      }
    }

    section.appendChild(panel);
  });
}

function addIngPokemonCard(panel) {
  const target = panel || document.getElementById("ingPanelInner");
  if (!target) return;

  const id = uid++;
  const prefix = `slot_${id}`;
  pokemonSlots.push({ slotType: "ing", prefix, cls: "ing", cardId: id });

  const cfg = SLOT_CONFIG.find((c) => c.key === "ing");
  const ingSlots = pokemonSlots.filter((s) => s.slotType === "ing");
  const num = ingSlots.length;

  const card = document.createElement("div");
  card.className = "pks-pokemon-card";
  card.id = `ingCard_${id}`;
  card.innerHTML = `
    <div class="pks-card-header">
      <span class="pks-card-label ing" id="ingCardLabel_${id}">
        ${cfg.emoji} 食材 ${num}
      </span>
      <button class="pks-remove-btn" onclick="removeIngPokemonCard(${id})">削除</button>
    </div>
    ${pokemonFormHTML(prefix)}
  `;
  target.appendChild(card);

  updateIngPanelTitle();
}

function removeIngPokemonCard(cardId) {
  const ingSlots = pokemonSlots.filter((s) => s.slotType === "ing");
  if (ingSlots.length <= comp.ing) return;

  pokemonSlots = pokemonSlots.filter(
    (s) => !(s.slotType === "ing" && s.cardId === cardId)
  );

  document.getElementById(`ingCard_${cardId}`)?.remove();

  renumberIngCards();
  updateIngPanelTitle();
}

function renumberIngCards() {
  const cfg = SLOT_CONFIG.find((c) => c.key === "ing");

  pokemonSlots
    .filter((s) => s.slotType === "ing")
    .forEach((s, i) => {
      const el = document.getElementById(`ingCardLabel_${s.cardId}`);
      if (el) el.textContent = `${cfg.emoji} 食材 ${i + 1}`;
    });
}

function updateIngPanelTitle() {
  const ingCount = pokemonSlots.filter((s) => s.slotType === "ing").length;
  const el = document.getElementById("ingPanelTitle");
  if (el)
    el.textContent = `🍳 食材ポケモン（枠${comp.ing}・登録${ingCount}体）`;
}

/* ============================================
   ポケモンフォーム HTML
============================================ */

function optsPokemon() {
  if (!pokemonDB.length)
    return `<option value="">（データなし）</option>`;
  return pokemonDB
    .map((p) => `<option value="${p.name}">${p.name}</option>`)
    .join("");
}

function optsSub() {
  return SUB_SKILLS.map((s) => `<option value="${s}">${s}</option>`).join("");
}

function optsNature(list) {
  return list.map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
}

function optsPattern() {
  return PATTERNS.map((p) => `<option value="${p}">${p}</option>`).join("");
}

function pokemonFormHTML(pre) {
  return `
    <div class="field">
      <label>ポケモン</label>
      <div class="pks-sw"><select id="${pre}_p">${optsPokemon()}</select></div>
    </div>

    <div class="pks-row2">
      <div class="field">
        <label>レベル</label>
        <input type="number" id="${pre}_lv" min="1" max="60" value="50">
      </div>

      <div class="field">
        <label>食材配列</label>
        <div class="pks-sw"><select id="${pre}_pat">${optsPattern()}</select></div>
      </div>
    </div>

    <div class="pks-row2">
      <div class="field">
        <label>性格↑</label>
        <div class="pks-sw"><select id="${pre}_nu">${optsNature(NATURES_UP)}</select></div>
      </div>

      <div class="field">
        <label>性格↓</label>
        <div class="pks-sw"><select id="${pre}_nd">${optsNature(NATURES_DOWN)}</select></div>
      </div>
    </div>

    <div class="field">
      <label>サブスキル（${SUB_LABELS.join(" / ")}）</label>
      <div class="pks-subs">
        ${SUB_IDS.map(
          (sid) =>
            `<div class="pks-sw"><select id="${pre}_${sid}">${optsSub()}</select></div>`
        ).join("")}
      </div>
    </div>
  `;
}

/* ============================================
   料理行
============================================ */

function buildGenreOpts(sel) {
  return RECIPE_DATA.genres
    .map((g) => `<option value="${g}"${g === sel ? " selected" : ""}>${g}</option>`)
    .join("");
}

function buildRecipeOpts(genre) {
  return Object.keys(RECIPE_DATA.recipes[genre] ?? {})
    .map((n) => `<option value="${n}">${n}</option>`)
    .join("");
}

function addRecipeRow() {
  const id = uid++;
  recipeRows.push(id);

  const g0 = RECIPE_DATA.genres[0];

  const row = document.createElement("div");
  row.className = "pks-recipe-row";
  row.id = `rr_${id}`;

  row.innerHTML = `
    <div class="field" style="margin:0">
      <label style="font-size:10px">ジャンル</label>
      <div class="pks-sw">
        <select id="rg_${id}" onchange="onGenreChange(${id})">
          ${buildGenreOpts(g0)}
        </select>
      </div>
    </div>

    <div class="field" style="margin:0">
      <label style="font-size:10px">料理名</label>
      <div class="pks-sw">
        <select id="rn_${id}" onchange="updateRecipeTotal()">
          ${buildRecipeOpts(g0)}
        </select>
      </div>
    </div>

    <div class="field" style="margin:0">
      <label style="font-size:10px">食数</label>
      <input type="number" id="rc_${id}" min="1" max="21" value="1"
        onchange="updateRecipeTotal()">
    </div>

    <button class="pks-recipe-remove" onclick="removeRecipeRow(${id})">✕</button>
  `;

  document.getElementById("recipeList").appendChild(row);
  updateRecipeTotal();
}

function onGenreChange(id) {
  const g = document.getElementById(`rg_${id}`)?.value;
  const sel = document.getElementById(`rn_${id}`);
  if (sel && g) sel.innerHTML = buildRecipeOpts(g);
  updateRecipeTotal();
}

function removeRecipeRow(id) {
  recipeRows = recipeRows.filter((x) => x !== id);
  document.getElementById(`rr_${id}`)?.remove();
  updateRecipeTotal();
}

function updateRecipeTotal() {
  const total = recipeRows.reduce(
    (s, id) => s + (Number(document.getElementById(`rc_${id}`)?.value) || 0),
    0
  );

  const el = document.getElementById("recipeTotal");
  el.textContent = `合計：${total} 食`;
  el.className = "pks-total-line " + (total === 21 ? "ok" : "ng");
}

/* ============================================
   計算
============================================ */

function getEntry(pre) {
  const name = document.getElementById(`${pre}_p`)?.value;
  if (!name) return null;

  const pokemon = pokemonDB.find((p) => p.name === name);
  if (!pokemon) return null;

  return {
    pokemon,
    level: Number(document.getElementById(`${pre}_lv`)?.value || 50),
    pattern: document.getElementById(`${pre}_pat`)?.value || "aab",
    natureUp: document.getElementById(`${pre}_nu`)?.value || "other",
    natureDown: document.getElementById(`${pre}_nd`)?.value || "other",
    subs: SUB_IDS.map(
      (sid) => document.getElementById(`${pre}_${sid}`)?.value || "その他"
    )
  };
}

function calcWeekly(entry) {
  if (!entry) return {};

  const { pokemon, level, pattern, natureUp, natureDown, subs } = entry;

  const speedM = subs.filter((s) => s === "おてスピM").length;
  const speedS = subs.filter((s) => s === "おてスピS").length;
  const oteBonus = subs.filter((s) => s === "おてぼ").length;
  const foodM = subs.filter((s) => s === "食材確率M").length;
  const foodS = subs.filter((s) => s === "食材確率S").length;

  let tf = 1.0;
  if (natureUp === "speedUp") tf *= 0.9;
  if (natureDown === "speedDown") tf *= 1.075;
  tf *= 0.86 ** speedM;
  tf *= 0.93 ** speedS;
  tf *= 0.95 ** oteBonus;

  const levelCoef = 1 - (level - 1) * LEVEL_TIME_COEF;
  const interval = (pokemon.helpTime * levelCoef * tf) / BASE_DIVISOR;
  const hpw = WEEK_SECONDS / interval;

  let fr = (pokemon.ingredientFindRate ?? 0) / 100;
  fr += 0.36 * foodM + 0.18 * foodS;

  if (natureUp === "foodUp") fr *= 1.2;
  if (natureDown === "foodDown") fr *= 0.8;

  fr = Math.max(0, Math.min(1, fr));

  const slots = level < 30 ? [1] : level < 60 ? [1, 2] : [1, 2, 3];
  const sp = 1 / slots.length;

  const result = {};

  for (const slot of slots) {
    let ing = null,
      cnt = 0;

    if (slot === 1) {
      ing = pokemon.ingredientA;
      cnt = pokemon["1a"] ?? 0;
    } else if (slot === 2) {
      const t = pattern[1];
      ing = t === "a" ? pokemon.ingredientA : pokemon.ingredientB;
      cnt = t === "a" ? pokemon["2a"] ?? 0 : pokemon["2b"] ?? 0;
    } else {
      const t = pattern[2];
      if (t === "a") {
        ing = pokemon.ingredientA;
        cnt = pokemon["3a"] ?? 0;
      } else if (t === "b") {
        ing = pokemon.ingredientB;
        cnt = pokemon["3b"] ?? 0;
      } else {
        ing = pokemon.ingredientC;
        cnt = pokemon["3c"] ?? 0;
      }
    }

    if (ing && cnt > 0) {
      const k = normIng(ing);
      result[k] = (result[k] ?? 0) + hpw * fr * cnt * sp;
    }
  }

  return result;
}

function mergeIng(a, b) {
  const r = { ...a };
  for (const [k, v] of Object.entries(b)) r[k] = (r[k] ?? 0) + v;
  return r;
}

function calculate() {
  let have = {};
  const perPokemon = [];

  for (const slot of pokemonSlots) {
    const e = getEntry(slot.prefix);
    if (!e) continue;

    const weekly = calcWeekly(e);
    have = mergeIng(have, weekly);

    const daily = {};
    for (const [k, v] of Object.entries(weekly)) daily[k] = v / 7;

    perPokemon.push({
      name: e.pokemon.name,
      slotType: slot.slotType,
      daily
    });
  }

  const need = {};

  for (const id of recipeRows) {
    const genre = document.getElementById(`rg_${id}`)?.value;
    const name = document.getElementById(`rn_${id}`)?.value;
    const count = Number(document.getElementById(`rc_${id}`)?.value || 0);

    if (!genre || !name || count === 0) continue;

    const recipe = RECIPE_DATA.recipes[genre]?.[name];
    if (!recipe) continue;

    for (const [ing, perR] of Object.entries(recipe)) {
      const k = normIng(ing);
      need[k] = (need[k] ?? 0) + perR * count;
    }
  }

  const needKeys = Object.keys(need);
  let allOk = true,
    minRatio = Infinity;

  for (const k of needKeys) {
    const ratio = (have[k] ?? 0) / need[k];
    if (ratio < 1) allOk = false;
    if (ratio < minRatio) minRatio = ratio;
  }

  if (needKeys.length === 0) {
    minRatio = 1;
    allOk = true;
  }

  const surplus = {};
  for (const [k, v] of Object.entries(have)) {
    const leftover = v - (need[k] ?? 0);
    if (leftover > 0.05) surplus[k] = leftover;
  }

  const surplusDays = allOk ? 7 * (minRatio - 1) : 0;

  renderResult(have, need, surplus, perPokemon, allOk, minRatio, surplusDays);
}

/* ============================================
   結果描画
============================================ */

function renderResult(have, need, surplus, perPokemon, allOk, minRatio, surplusDays) {
  const needKeys = Object.keys(need);

  const ingHtml = needKeys
    .map((k) => {
      const h = have[k] ?? 0;
      const n = need[k];
      const ok = h >= n;
      const pct = Math.round(Math.min(h / n, 1) * 100);

      return `
        <div class="pks-ing-card">
          <div class="pks-ing-name">${k}</div>
          <div class="pks-ing-bar-bg">
            <div class="pks-ing-bar ${ok ? "ok" : "ng"}" style="width:${pct}%"></div>
          </div>
          <div class="pks-ing-nums">
            <span class="pks-ing-have ${ok ? "ok" : "ng"}">${h.toFixed(1)}個</span>
            <span class="pks-ing-need">必要:${n}</span>
          </div>
        </div>
      `;
    })
    .join("");

  let detailHtml = "";

    const shortages = needKeys
      .filter((k) => (have[k] ?? 0) < need[k])
      .map(
        (k) =>
          `・${k}：あと ${(need[k] - (have[k] ?? 0)).toFixed(1)} 個不足`
      )
      .join("<br>");

    detailHtml = `
      <div class="pks-shortage">
        <div class="pks-shortage-label">⚠️ 不足している食材</div>
        <div class="pks-shortage-item">${shortages}</div>
      </div>
    `;
  }

  const slotEmoji = {
    berry: "🍒",
    ing: "🍳",
    skill: "⚡",
    healer: "💚"
  };

  const pbHtml = perPokemon
    .map((p) => {
      const lines = Object.entries(p.daily)
        .filter(([, v]) => v > 0.01)
        .map(
          ([k, v]) =>
            `<div class="pks-pb-row"><span class="pks-pb-ing">${k}</span><span class="pks-pb-val">${v.toFixed(
              2
            )}個/日</span></div>`
        )
        .join("");

      return `
        <div class="pks-pb-card">
          <div class="pks-pb-name">${slotEmoji[p.slotType] ?? ""} ${
        p.name
      }</div>
          ${
            lines ||
            '<div style="font-size:11px;color:var(--pks-text-dim)">食材なし</div>'
          }
        </div>
      `;
    })
    .join("");

  const surplusEntries = Object.entries(surplus).sort((a, b) => b[1] - a[1]);
  const surplusListHtml = surplusEntries.length
    ? surplusEntries
        .map(([k, v]) => `・${k}：${v.toFixed(1)}個/週`)
        .join("<br>")
    : "なし";

  document.getElementById("resultContent").innerHTML = `
    <div class="pks-verdict">
      <div class="pks-verdict-main ${allOk ? "ok" : "ng"}">
        ${allOk ? "✅ 21食分 準備OK！" : "❌ 食材が不足しています"}
      </div>
      <div class="pks-verdict-sub">1週間（7日）・21食分シミュレーション結果</div>
    </div>

    ${
      needKeys.length
        ? `<div class="pks-result-section-title">食材ごとの充足状況（週間）</div>
           <div class="pks-ing-grid">${ingHtml}</div>`
        : ""
    }

    ${detailHtml}

    <div class="pks-result-section-title" style="margin-top:16px;">
      🐾 ポケモン別 食材獲得量（1日あたり）
    </div>
    <div class="pks-pb-list">${pbHtml}</div>

    <div class="pks-extra">
      <div class="pks-extra-label">📦 余剰食材（週間・料理使用後の残り）</div>
      <div class="pks-extra-item">${surplusListHtml}</div>
    </div>
  `;
}

loadDB();
  if (allOk) {
    detailHtml = `
      <div class="pks-surplus">
        <div class="pks-surplus-label">⏱ 時間的余力（最もきつい食材基準）</div>
        <div class="pks-surplus-val">+${surplusDays.toFixed(1)} 日分</div>
        <div class="pks-surplus-desc">
          21食分を約 ${(7 - surplusDays).toFixed(1)} 日で集められる計算です。
          充足率：${(minRatio * 100).toFixed(0)}%
        </div>
      </div>
    `;
  } else {
        const shortages = needKeys
      .filter((k) => (have[k] ?? 0) < need[k])
      .map(
        (k) =>
          `・${k}：あと ${(need[k] - (have[k] ?? 0)).toFixed(1)} 個不足`
      )
      .join("<br>");

    detailHtml = `
      <div class="pks-shortage">
        <div class="pks-shortage-label">⚠️ 不足している食材</div>
        <div class="pks-shortage-item">${shortages}</div>
      </div>
    `;
  }

  const slotEmoji = {
    berry: "🍒",
    ing: "🍳",
    skill: "⚡",
    healer: "💚"
  };

  const pbHtml = perPokemon
    .map((p) => {
      const lines = Object.entries(p.daily)
        .filter(([, v]) => v > 0.01)
        .map(
          ([k, v]) =>
            `<div class="pks-pb-row"><span class="pks-pb-ing">${k}</span><span class="pks-pb-val">${v.toFixed(
              2
            )}個/日</span></div>`
        )
        .join("");

      return `
        <div class="pks-pb-card">
          <div class="pks-pb-name">${slotEmoji[p.slotType] ?? ""} ${
        p.name
      }</div>
          ${
            lines ||
            '<div style="font-size:11px;color:var(--pks-text-dim)">食材なし</div>'
          }
        </div>
      `;
    })
    .join("");

  const surplusEntries = Object.entries(surplus).sort((a, b) => b[1] - a[1]);
  const surplusListHtml = surplusEntries.length
    ? surplusEntries
        .map(([k, v]) => `・${k}：${v.toFixed(1)}個/週`)
        .join("<br>")
    : "なし";

  document.getElementById("resultContent").innerHTML = `
    <div class="pks-verdict">
      <div class="pks-verdict-main ${allOk ? "ok" : "ng"}">
        ${allOk ? "✅ 21食分 準備OK！" : "❌ 食材が不足しています"}
      </div>
      <div class="pks-verdict-sub">1週間（7日）・21食分シミュレーション結果</div>
    </div>

    ${
      needKeys.length
        ? `<div class="pks-result-section-title">食材ごとの充足状況（週間）</div>
           <div class="pks-ing-grid">${ingHtml}</div>`
        : ""
    }

    ${detailHtml}

    <div class="pks-result-section-title" style="margin-top:16px;">
      🐾 ポケモン別 食材獲得量（1日あたり）
    </div>
    <div class="pks-pb-list">${pbHtml}</div>

    <div class="pks-extra">
      <div class="pks-extra-label">📦 余剰食材（週間・料理使用後の残り）</div>
      <div class="pks-extra-item">${surplusListHtml}</div>
    </div>
  `;
}

loadDB();
window.addEventListener("DOMContentLoaded", loadDB);


