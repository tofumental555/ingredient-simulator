// ================================
// 定数
// ================================
const LEVEL_TIME_COEF = 0.002;
const BASE_DIVISOR = 2.222;

const NATURE_SPEED_UP = 0.9;
const NATURE_SPEED_DOWN = 1.075;

// ★ 性格補正（食材・スキル）は 1.2 / 0.8 に統一
const NATURE_FOOD_UP = 1.2;
const NATURE_FOOD_DOWN = 0.8;
const NATURE_SKILL_UP = 1.2;
const NATURE_SKILL_DOWN = 0.8;

const SUB_SPEED_M = 0.86;
const SUB_SPEED_S = 0.93;
const SUB_OTEBONUS = 0.95;

// ================================
// 食材名 正規化マッピング（表記ゆれ吸収）
// → 必要なのは “あまいみつ” と “とくせんりんご” のみ
// ================================
const INGREDIENT_NORMALIZE = {
  "あまいミツ": "あまいみつ",
  "あまいみつ": "あまいみつ",

  "とくせんリンゴ": "とくせんりんご",
  "とくせんりんご": "とくせんりんご"
};

// ================================
// きのみ基礎値
// ================================
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

const ALL_PATTERNS = ["aaa", "aab", "abb", "abc", "aac", "bbc"];
const PATTERN_LABELS = {
  aaa: "A-A-A",
  aab: "A-A-B",
  abb: "A-B-B",
  abc: "A-B-C",
  aac: "A-A-C",
  bbc: "B-B-C"
};

// ================================
// DB読み込み
// ================================
let pokemonDB = [];
let ingredientEnergyDB = {};

async function loadDB() {
  pokemonDB = await (await fetch("pokemon_data.json")).json();
  ingredientEnergyDB = await (await fetch("ingredient_energy.json")).json();

  populatePokemonSelect();
  populateSubSkillSelects();
  populatePatternSelect();
}

loadDB();

// ================================
// UIセットアップ
// ================================
function populatePokemonSelect() {
  const select = document.getElementById("pokemonSelect");
  select.innerHTML = "";

  pokemonDB.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.name;
    select.appendChild(opt);
  });

  select.addEventListener("change", populatePatternSelect);
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
  const patternSelect = document.getElementById("patternSelect");
  const name = document.getElementById("pokemonSelect").value;
  const pokemon = pokemonDB.find(p => p.name === name);

  patternSelect.innerHTML = "";

  const patterns = (pokemon && pokemon.patterns && pokemon.patterns.length > 0)
    ? pokemon.patterns
    : ALL_PATTERNS;

  patterns.forEach(pat => {
    const opt = document.createElement("option");
    opt.value = pat;
    opt.textContent = PATTERN_LABELS[pat] || pat;
    patternSelect.appendChild(opt);
  });
}
// ================================
// 性格補正
// ================================
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

function applyNatureToSkillRate(sr, up, down) {
  if (up === "skillUp") sr *= NATURE_SKILL_UP;
  if (down === "skillDown") sr *= NATURE_SKILL_DOWN;
  return sr;
}

// ================================
// サブスキル解析
// ================================
function analyzeSubSkills(subs) {
  return {
    berryPlus: subs.includes("きのみの数S") ? 1 : 0,
    speedM: subs.filter(s => s === "おてスピM").length,
    speedS: subs.filter(s => s === "おてスピS").length,
    oteBonus: subs.filter(s => s === "おてぼ").length,
    foodM: subs.filter(s => s === "食材確率M").length,
    foodS: subs.filter(s => s === "食材確率S").length,
    skillM: subs.filter(s => s === "スキル確率M").length,
    skillS: subs.filter(s => s === "スキル確率S").length
  };
}

function buildTimeSubSkillFactor(info) {
  let f = 1.0;
  if (info.speedM > 0) f *= SUB_SPEED_M ** info.speedM;
  if (info.speedS > 0) f *= SUB_SPEED_S ** info.speedS;
  if (info.oteBonus > 0) f *= SUB_OTEBONUS ** info.oteBonus;
  return f;
}

// ================================
// 食材確率（加算方式）
// ================================
function buildFoodRateFactor(info) {
  let f = 1.0;
  if (info.foodM > 0) f += 0.36 * info.foodM;
  if (info.foodS > 0) f += 0.18 * info.foodS;
  return f;
}

// ================================
// スキル確率（加算方式）
// ================================
function buildSkillRateFactor(info) {
  let f = 1.0;
  if (info.skillM > 0) f += 0.36 * info.skillM;
  if (info.skillS > 0) f += 0.18 * info.skillS;
  return f;
}

// ================================
// きのみ個数補正
// ================================
function getBerryCountFactor(pokemon, berryPlus) {
  const base = (pokemon.category === "きのみ" || pokemon.category === "オール") ? 2 : 1;
  return base + berryPlus;
}

// ================================
// きのみ1個エナジー
// ================================
function calcBerryEnergyPerOne(pokemon, level) {
  const base = BERRY_BASE[pokemon.type] ?? 0;

  const linear = base + (level - 1);
  const exp = base * Math.pow(1.025, (level - 1));

  return Math.max(linear, exp);
}

// ================================
// 食材1個エナジー（正規化対応）
// ================================
function calcIngredientEnergyPerUnit(name) {
  const key = INGREDIENT_NORMALIZE[name] ?? name;
  return Number(ingredientEnergyDB[key] ?? 0);
}

// ================================
// 食材1回あたりの個数期待値
// ================================
function calcIngredientCountPerHelp(pokemon, level, pattern) {
  const unlocked = getUnlockedSlots(level);
  const slotProb = 1 / unlocked.length;

  let count = 0;

  for (const slot of unlocked) {
    const choices = [];

    if (slot === 1) choices.push(pokemon["1a"] ?? 0);

    if (slot === 2) {
      const a2 = pokemon["2a"] ?? 0;
      const b2 = pokemon["2b"] ?? 0;

      if (pattern === "aaa" || pattern === "aac") choices.push(a2);
      else if (pattern === "aab") choices.push(a2, b2);
      else if (pattern === "abb" || pattern === "bbc") choices.push(b2);
      else choices.push(a2, b2);
    }

    if (slot === 3) {
      const a3 = pokemon["3a"] ?? 0;
      const b3 = pokemon["3b"] ?? 0;
      const c3 = pokemon["3c"] ?? 0;

      if (pattern === "aaa") choices.push(a3);
      else if (pattern === "aab") choices.push(a3, b3);
      else if (pattern === "abb") choices.push(b3);
      else if (pattern === "abc") choices.push(a3, b3, c3);
      else if (pattern === "aac") choices.push(a3, c3);
      else if (pattern === "bbc") choices.push(b3, c3);
      else choices.push(a3, b3, c3);
    }

    if (choices.length === 0) continue;

    const choiceProb = 1 / choices.length;
    const slotCount = choices.reduce((sum, v) => sum + v * choiceProb, 0);

    count += slotProb * slotCount;
  }

  return count;
}

// ================================
// 食材1回あたりのエナジー期待値
// ================================
function calcIngredientEnergyPerHelp(pokemon, level, pattern) {
  const unlocked = getUnlockedSlots(level);
  const slotProb = 1 / unlocked.length;

  let energy = 0;

  for (const slot of unlocked) {
    const choices = [];

    if (slot === 1)
      choices.push({ ingredient: pokemon.ingredientA, count: pokemon["1a"] ?? 0 });

    if (slot === 2) {
      const a2 = pokemon["2a"] ?? 0;
      const b2 = pokemon["2b"] ?? 0;

      if (pattern === "aaa" || pattern === "aac")
        choices.push({ ingredient: pokemon.ingredientA, count: a2 });
      else if (pattern === "aab") {
        choices.push({ ingredient: pokemon.ingredientA, count: a2 });
        choices.push({ ingredient: pokemon.ingredientB, count: b2 });
      } else if (pattern === "abb" || pattern === "bbc")
        choices.push({ ingredient: pokemon.ingredientB, count: b2 });
      else {
        choices.push({ ingredient: pokemon.ingredientA, count: a2 });
        choices.push({ ingredient: pokemon.ingredientB, count: b2 });
      }
    }

    if (slot === 3) {
      const a3 = pokemon["3a"] ?? 0;
      const b3 = pokemon["3b"] ?? 0;
      const c3 = pokemon["3c"] ?? 0;

      if (pattern === "aaa")
        choices.push({ ingredient: pokemon.ingredientA, count: a3 });
      else if (pattern === "aab") {
        choices.push({ ingredient: pokemon.ingredientA, count: a3 });
        choices.push({ ingredient: pokemon.ingredientB, count: b3 });
      } else if (pattern === "abb")
        choices.push({ ingredient: pokemon.ingredientB, count: b3 });
      else if (pattern === "abc") {
        choices.push({ ingredient: pokemon.ingredientA, count: a3 });
        choices.push({ ingredient: pokemon.ingredientB, count: b3 });
        choices.push({ ingredient: pokemon.ingredientC, count: c3 });
      } else if (pattern === "aac") {
        choices.push({ ingredient: pokemon.ingredientA, count: a3 });
        choices.push({ ingredient: pokemon.ingredientC, count: c3 });
      } else if (pattern === "bbc") {
        choices.push({ ingredient: pokemon.ingredientB, count: b3 });
        choices.push({ ingredient: pokemon.ingredientC, count: c3 });
      } else {
        choices.push({ ingredient: pokemon.ingredientA, count: a3 });
        choices.push({ ingredient: pokemon.ingredientB, count: b3 });
        choices.push({ ingredient: pokemon.ingredientC, count: c3 });
      }
    }

    if (choices.length === 0) continue;

    const choiceProb = 1 / choices.length;

    for (const c of choices) {
      const per = calcIngredientEnergyPerUnit(c.ingredient);
      energy += slotProb * choiceProb * per * c.count;
    }
  }

  return energy;
}
// ================================
// 食材枠解放
// ================================
function getUnlockedSlots(level) {
  if (level < 30) return [1];
  if (level < 60) return [1, 2];
  return [1, 2, 3];
}

// ================================
// 期待値計算
// ================================
function calcDailyExpectation(pokemon, level, up, down, subs, pattern) {
  const subInfo = analyzeSubSkills(subs);

  const h = Number(pokemon.helpTime ?? 0);
  const levelCoef = 1 - (level - 1) * LEVEL_TIME_COEF;
  const natureTime = applyNatureToTimeFactor(up, down);
  const subTime = buildTimeSubSkillFactor(subInfo);

  const t = (h * levelCoef * natureTime * subTime) / BASE_DIVISOR;
  const hpd = 86400 / t;

  let fr = Number(pokemon.ingredientFindRate ?? 0) / 100;
  let sr = Number(pokemon.skillRate ?? 0) / 100;

  fr *= buildFoodRateFactor(subInfo);
  sr *= buildSkillRateFactor(subInfo);

  fr = applyNatureToFoodRate(fr, up, down);
  sr = applyNatureToSkillRate(sr, up, down);

  fr = Math.max(0, Math.min(1, fr));
  sr = Math.max(0, Math.min(1, sr));

  const berryProb = 1 - fr;

  const berryCount = hpd * berryProb * getBerryCountFactor(pokemon, subInfo.berryPlus);

  const ingCountPerHelp = calcIngredientCountPerHelp(pokemon, level, pattern);
  const foodCount = hpd * fr * ingCountPerHelp;

  const b1 = calcBerryEnergyPerOne(pokemon, level);
  const bE = berryCount * b1;

  const ingE = calcIngredientEnergyPerHelp(pokemon, level, pattern);
  const fE = ingCountPerHelp > 0 ? foodCount * (ingE / ingCountPerHelp) : 0;

  const tot = bE + fE;

  return {
    hpd,
    fr,
    sr,
    berryCount,
    foodCount,
    berryEnergyPerHelp: bE / hpd,
    ingredientEnergyPerHelp: fE / hpd,
    energyPerHelp: tot / hpd,
    dailyEnergy: tot
  };
}

// ================================
// UIイベント
// ================================
document.getElementById("calcButton").addEventListener("click", () => {
  const name = document.getElementById("pokemonSelect").value;
  const level = Number(document.getElementById("levelInput").value);

  const up = document.getElementById("natureUpSelect").value;
  const down = document.getElementById("natureDownSelect").value;

  const subs = [
    document.getElementById("sub10").value,
    document.getElementById("sub25").value,
    document.getElementById("sub50").value,
    document.getElementById("sub75").value,
    document.getElementById("sub100").value
  ];

  const pattern = document.getElementById("patternSelect").value;

  const pokemon = pokemonDB.find(p => p.name === name);
  if (!pokemon) return;

  const r = calcDailyExpectation(pokemon, level, up, down, subs, pattern);
  displayResult(r);
});

// ================================
// 結果表示
// ================================
function displayResult(r) {
  const box = document.getElementById("result");
  box.classList.add("pks-has-result");

  box.innerHTML = `
    <div class="pks-result-headline">
      <span class="pks-result-num">${Math.round(r.dailyEnergy)}</span>
      <span class="pks-result-unit">エナジー / 日</span>
    </div>

    ・1日の行動回数：${r.hpd.toFixed(2)} 回<br>
    ・食材確率：${(r.fr * 100).toFixed(1)} %<br>
    ・スキル確率：${(r.sr * 100).toFixed(1)} %<br>

    ・きのみ個数（期待値）：${r.berryCount.toFixed(2)} 個 / 日<br>
    ・食材個数（期待値）：${r.foodCount.toFixed(2)} 個 / 日<br>

    ・きのみ期待値（エナジー）：${r.berryEnergyPerHelp.toFixed(1)} / 回<br>
    ・食材期待値（エナジー）：${r.ingredientEnergyPerHelp.toFixed(1)} / 回<br>

    ・1回のおてつだい期待値：${r.energyPerHelp.toFixed(1)} エナジー<br>
  `;
}
