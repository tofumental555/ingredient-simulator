/* ================================
   きのみエナジー（タイプ → エナジー）
   ================================ */
const BERRY_BASE = {
  "ドラゴン": 35,
  "はがね": 33,
  "どく": 32,
  "こおり": 32,
  "あく": 31,
  "みず": 31,
  "くさ": 30,
  "いわ": 30,
  "じめん": 29,
  "ノーマル": 28,
  "かくとう": 27,
  "ほのお": 27,
  "フェアリー": 26,
  "ゴースト": 26,
  "エスパー": 26,
  "でんき": 25,
  "むし": 24,
  "ひこう": 24
};

/* ================================
   DB 読み込み
   ================================ */
let pokemonDB = [];
let ingredientEnergyDB = {};

async function loadDB() {
  pokemonDB = await (await fetch("pokemon_data.json")).json();
  ingredientEnergyDB = await (await fetch("ingredient_energy.json")).json();

  populatePokemonSelect();
  populateSubSkillSelects();
  populatePatternSelect();
}

/* ================================
   UI セットアップ
   ================================ */
function populatePokemonSelect() {
  const select = document.getElementById("pokemonSelect");
  select.innerHTML = "";

  pokemonDB.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.name;
    select.appendChild(opt);
  });
}

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

function populateSubSkillSelects() {
  ["sub10", "sub25", "sub50", "sub75", "sub100"].forEach(id => {
    const sel = document.getElementById(id);
    sel.innerHTML = "";
    SUB_SKILLS.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      sel.appendChild(opt);
    });
  });
}

function populatePatternSelect() {
  const sel = document.getElementById("patternSelect");
  sel.innerHTML = "";

  // ★ 正しい配列に修正
  ["aaa", "aab", "aac", "aba", "abb", "abc"].forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    sel.appendChild(opt);
  });
}

/* ================================
   性格補正・サブスキル補正
   ================================ */
const LEVEL_TIME_COEF = 0.002;
const BASE_DIVISOR = 2.222;

const SUB_SPEED_M = 0.86;
const SUB_SPEED_S = 0.93;
const SUB_OTEBONUS = 0.95;

const NATURE_SPEED_UP = 0.9;
const NATURE_SPEED_DOWN = 1.075;
const NATURE_FOOD_UP = 1.2;
const NATURE_FOOD_DOWN = 0.8;

function applyNatureToTimeFactor(up, down) {
  let f = 1.0;
  if (up === "speedUp") f *= NATURE_SPEED_UP;
  if (down === "speedDown") f *= NATURE_SPEED_DOWN;
  return f;
}

function applyNatureToFoodRate(fr, up, down) {
  if (up === "foodUp") fr *= NATURE_FOOD_UP;
  if (down === "foodDown") fr *= NATURE_FOOD_DOWN;
  return fr;
}

function analyzeSubSkills(subs) {
  return {
    berryPlus: subs.includes("きのみの数S") ? 1 : 0,
    speedM: subs.filter(s => s === "おてスピM").length,
    speedS: subs.filter(s => s === "おてスピS").length,
    oteBonus: subs.filter(s => s === "おてぼ").length,
    foodM: subs.filter(s => s === "食材確率M").length,
    foodS: subs.filter(s => s === "食材確率S").length
  };
}

function buildTimeSubSkillFactor(info) {
  let f = 1.0;
  if (info.speedM > 0) f *= SUB_SPEED_M ** info.speedM;
  if (info.speedS > 0) f *= SUB_SPEED_S ** info.speedS;
  if (info.oteBonus > 0) f *= SUB_OTEBONUS ** info.oteBonus;
  return f;
}

function buildFoodRateFactor(info) {
  let f = 1.0;
  if (info.foodM > 0) f += 0.36 * info.foodM;
  if (info.foodS > 0) f += 0.18 * info.foodS;
  return f;
}

/* ================================
   きのみ計算（レベル補正込み）
   ================================ */
function getBerryEnergyByPokemon(pokemon, level) {
  const base = BERRY_BASE[pokemon.type] ?? 0;
  if (base === 0) return 0;
  const add = base + (level - 1);
  const mul = base * Math.pow(1.025, (level - 1));
  return Math.max(add, mul);
}

function getBerryCountFactor(pokemon, berryPlus) {
  const base = (pokemon.category === "きのみ" || pokemon.category === "オール") ? 2 : 1;
  return base + berryPlus;
}

/* ================================
   食材エナジー（名前揺れ補正）
   ================================ */
const INGREDIENT_NORMALIZE = {
  "あまいミツ": "あまいみつ",
  "あまいみつ": "あまいみつ",
  "とくせんリンゴ": "とくせんりんご",
  "とくせんりんご": "とくせんりんご"
};

function calcIngredientEnergyPerUnit(name) {
  const key = INGREDIENT_NORMALIZE[name] ?? name;
  return Number(ingredientEnergyDB[key] ?? 0);
}

/* ================================
   食材個数（正しい仕様に完全準拠）
   ================================ */
function calcIngredientCountPerHelp(pokemon, level, pattern) {
  const unlocked = getUnlockedSlots(level);
  const slotProb = 1 / unlocked.length;
  const result = {};

  // slot1 = A 固定
  const slot1Type = "a";
  const slot2Type = pattern[1]; // a or b
  const slot3Type = pattern[2]; // a or b or c

  for (const slot of unlocked) {
    let ingredient = null;
    let count = 0;

    if (slot === 1) {
      ingredient = pokemon.ingredientA;
      count = pokemon["1a"] ?? 0;
    }

    if (slot === 2) {
      if (slot2Type === "a") {
        ingredient = pokemon.ingredientA;
        count = pokemon["2a"] ?? 0;
      } else if (slot2Type === "b") {
        ingredient = pokemon.ingredientB;
        count = pokemon["2b"] ?? 0;
      }
    }

    if (slot === 3) {
      if (slot3Type === "a") {
        ingredient = pokemon.ingredientA;
        count = pokemon["3a"] ?? 0;
      } else if (slot3Type === "b") {
        ingredient = pokemon.ingredientB;
        count = pokemon["3b"] ?? 0;
      } else if (slot3Type === "c") {
        ingredient = pokemon.ingredientC;
        count = pokemon["3c"] ?? 0;
      }
    }

    if (ingredient) {
      result[ingredient] = (result[ingredient] ?? 0) + count * slotProb;
    }
  }

  return result;
}

/* ================================
   1日エナジー計算
   ================================ */
function calcDailyEnergy(pokemon, level, subs, pattern, up, down) {
  const subInfo = analyzeSubSkills(subs);

  const h = Number(pokemon.helpTime ?? 0);
  const levelCoef = 1 - (level - 1) * LEVEL_TIME_COEF;
  const natureTime = applyNatureToTimeFactor(up, down);
  const subTime = buildTimeSubSkillFactor(subInfo);

  const t = (h * levelCoef * natureTime * subTime) / BASE_DIVISOR;
  const hpd = 86400 / t;

  let fr = Number(pokemon.ingredientFindRate ?? 0) / 100;
  fr *= buildFoodRateFactor(subInfo);
  fr = applyNatureToFoodRate(fr, up, down);
  fr = Math.max(0, Math.min(1, fr));

  const berryProb = 1 - fr;
  const berryCount = hpd * berryProb * getBerryCountFactor(pokemon, subInfo.berryPlus);

  const berryEnergyPerOne = getBerryEnergyByPokemon(pokemon, level);
  const berryEnergy = berryCount * berryEnergyPerOne;

  const perHelp = calcIngredientCountPerHelp(pokemon, level, pattern);
  const ingredientCountDetail = {};
  let ingredientEnergy = 0;

  for (const [name, countPerHelp] of Object.entries(perHelp)) {
    const perDay = hpd * fr * countPerHelp;
    ingredientCountDetail[name] = perDay;
    ingredientEnergy += perDay * calcIngredientEnergyPerUnit(name);
  }

  return {
    berryEnergy,
    ingredientEnergy,
    total: berryEnergy + ingredientEnergy,
    berryCount,
    ingredientCountDetail
  };
}

/* ================================
   結果表示
   ================================ */
function displayResult(r, name) {
  const box = document.getElementById("result");

  let ingDetailHtml = "";
  for (const [iname, count] of Object.entries(r.ingredientCountDetail)) {
    ingDetailHtml += `・${iname}：${count.toFixed(2)} 個 / 日<br>`;
  }

  box.innerHTML = `
    <div class="pks-result-headline">
      <span class="pks-result-name">${name}</span><br>
      <span class="pks-result-num">${Math.round(r.total)}</span>
      <span class="pks-result-unit">エナジー / 日</span>
    </div>

    <b>▼ 内訳</b><br>
    ・きのみエナジー：${Math.round(r.berryEnergy)} / 日<br>
    ・きのみ個数：${r.berryCount.toFixed(2)} 個 / 日<br><br>

    ・食材エナジー：${Math.round(r.ingredientEnergy)} / 日<br>
    <b>▼ 食材内訳</b><br>
    ${ingDetailHtml}
  `;
}

/* ================================
   ボタンイベント
   ================================ */
document.getElementById("calcButton").addEventListener("click", () => {
  const name = document.getElementById("pokemonSelect").value;
  const level = Number(document.getElementById("levelInput").value);
  const pattern = document.getElementById("patternSelect").value;

  const up = document.getElementById("natureUpSelect").value;
  const down = document.getElementById("natureDownSelect").value;

  const subs = [
    document.getElementById("sub10").value,
    document.getElementById("sub25").value,
    document.getElementById("sub50").value,
    document.getElementById("sub75").value,
    document.getElementById("sub100").value
  ];

  const pokemon = pokemonDB.find(p => p.name === name);
  if (!pokemon) {
    document.getElementById("result").textContent = "ポケモンデータが見つかりません。";
    return;
  }

  const r = calcDailyEnergy(pokemon, level, subs, pattern, up, down);
  displayResult(r, name);
});

loadDB();
