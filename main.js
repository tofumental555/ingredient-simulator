// ================================
// 定数（保存版ロジック準拠）
// ================================
const LEVEL_TIME_COEF = 0.002;
const BASE_DIVISOR = 2.222;

const NATURE_SPEED_UP = 0.9;
const NATURE_SPEED_DOWN = 1.075;

const NATURE_FOOD_UP = 1.05;
const NATURE_FOOD_DOWN = 0.95;
const NATURE_SKILL_UP = 1.05;
const NATURE_SKILL_DOWN = 0.95;

const SUB_SPEED_M = 0.86;
const SUB_SPEED_S = 0.93;
const SUB_OTEBONUS = 0.95;

const SUB_FOOD_M = 1.36;
const SUB_FOOD_S = 1.18;
const SUB_SKILL_M = 1.36;
const SUB_SKILL_S = 1.18;

// 食材配列パターン
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
  populatePatternSelect(); // 初期ポケモン用
}

loadDB();

// ================================
// ポケモン選択
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

// ================================
// サブスキル選択
// ================================
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

// ================================
// 食材配列セレクト（6パターン）
// ================================
function populatePatternSelect() {
  const patternSelect = document.getElementById("patternSelect");
  const name = document.getElementById("pokemonSelect").value;
  const pokemon = pokemonDB.find(p => p.name === name);

  patternSelect.innerHTML = "";

  // DBにパターン情報があればそれを使う（例: p.patterns = ["aaa","aab"]）
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
function applyNatureToTimeFactor(natureUp, natureDown) {
  let factor = 1.0;
  if (natureUp === "speedUp") factor *= NATURE_SPEED_UP;
  if (natureDown === "speedDown") factor *= NATURE_SPEED_DOWN;
  return factor;
}

function applyNatureToFoodRate(fr, natureUp, natureDown) {
  let res = fr;
  if (natureUp === "foodUp") res *= NATURE_FOOD_UP;
  if (natureDown === "foodDown") res *= NATURE_FOOD_DOWN;
  return res;
}

function applyNatureToSkillRate(sr, natureUp, natureDown) {
  let res = sr;
  if (natureUp === "skillUp") res *= NATURE_SKILL_UP;
  if (natureDown === "skillDown") res *= NATURE_SKILL_DOWN;
  return res;
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
  let factor = 1.0;
  if (info.speedM > 0) factor *= SUB_SPEED_M ** info.speedM;
  if (info.speedS > 0) factor *= SUB_SPEED_S ** info.speedS;
  if (info.oteBonus > 0) factor *= SUB_OTEBONUS ** info.oteBonus;
  return factor;
}

function buildFoodRateFactor(info) {
  let factor = 1.0;
  if (info.foodM > 0) factor *= SUB_FOOD_M ** info.foodM;
  if (info.foodS > 0) factor *= SUB_FOOD_S ** info.foodS;
  return factor;
}

function buildSkillRateFactor(info) {
  let factor = 1.0;
  if (info.skillM > 0) factor *= SUB_SKILL_M ** info.skillM;
  if (info.skillS > 0) factor *= SUB_SKILL_S ** info.skillS;
  return factor;
}

// ================================
// きのみ個数補正
// ================================
function getBerryCountFactor(pokemon, berryPlus) {
  const base = (pokemon.category === "きのみ" || pokemon.category === "オール") ? 2 : 1;
  return base + berryPlus;
}

// ================================
// 食材枠
// ================================
function getUnlockedSlots(level) {
  if (level < 30) return [1];
  if (level < 60) return [1, 2];
  return [1, 2, 3];
}

// ================================
// 食材1個エナジー
// ================================
function calcIngredientEnergyPerUnit(name) {
  return Number(ingredientEnergyDB[name] ?? 0);
}

// ================================
// 食材1回あたりの期待エナジー（食材が出たとき）
// ================================
function calcIngredientEnergyPerHelp(pokemon, level, pattern) {
  const unlocked = getUnlockedSlots(level);
  const slotProb = 1 / unlocked.length;

  let energyPerHelp = 0;

  for (const slot of unlocked) {
    const choices = [];

    if (slot === 1) {
      // 1枠目は常にA
      const count = pokemon["a1"] ?? 0;
      choices.push({ ingredient: pokemon.ingredientA, count });
    } else if (slot === 2) {
      // 2枠目：DBの a2 / b2 をそのまま使用
      const a2 = pokemon["a2"] ?? 0;
      const b2 = pokemon["b2"] ?? 0;
      if (a2 > 0) choices.push({ ingredient: pokemon.ingredientA, count: a2 });
      if (b2 > 0) choices.push({ ingredient: pokemon.ingredientB, count: b2 });
    } else if (slot === 3) {
      // 3枠目：DBの a3 / b3 / c3 をそのまま使用
      const a3 = pokemon["a3"] ?? 0;
      const b3 = pokemon["b3"] ?? 0;
      const c3 = pokemon["c3"] ?? 0;
      if (a3 > 0) choices.push({ ingredient: pokemon.ingredientA, count: a3 });
      if (b3 > 0) choices.push({ ingredient: pokemon.ingredientB, count: b3 });
      if (c3 > 0) choices.push({ ingredient: pokemon.ingredientC, count: c3 });
    }

    if (choices.length === 0) continue;

    const choiceProb = 1 / choices.length;

    for (const c of choices) {
      const per = calcIngredientEnergyPerUnit(c.ingredient);
      energyPerHelp += slotProb * choiceProb * per * c.count;
    }
  }

  return energyPerHelp;
}

// ================================
// 期待値計算
// ================================
function calcDailyExpectation(pokemon, level, natureUp, natureDown, subs, pattern) {
  const subInfo = analyzeSubSkills(subs);

  // 2. おてつだい時間 t
  const h = Number(pokemon.helpTime ?? 0);
  const levelCoef = 1 - (level - 1) * LEVEL_TIME_COEF;
  const natureTimeFactor = applyNatureToTimeFactor(natureUp, natureDown);
  const subTimeFactor = buildTimeSubSkillFactor(subInfo);

  const t = (h * levelCoef * natureTimeFactor * subTimeFactor) / BASE_DIVISOR;
  if (!isFinite(t) || t <= 0) {
    return null;
  }

  // 3. 1日のおてつだい回数
  const hpd = 86400 / t;

  // 4. 食材確率 / スキル確率
  const frBase = Number(pokemon.foodRate ?? pokemon.food_rate ?? 0);
  const srBase = Number(pokemon.skillRate ?? pokemon.skill_rate ?? 0);

  const foodSubFactor = buildFoodRateFactor(subInfo);
  const skillSubFactor = buildSkillRateFactor(subInfo);

  let fr = frBase * foodSubFactor;
  let sr = srBase * skillSubFactor;

  fr = applyNatureToFoodRate(fr, natureUp, natureDown);
  sr = applyNatureToSkillRate(sr, natureUp, natureDown);

  if (!isFinite(fr)) fr = 0;
  if (!isFinite(sr)) sr = 0;

  fr = Math.max(0, Math.min(1, fr));
  sr = Math.max(0, Math.min(1, sr));

  const berryProb = 1 - fr;

  // 6. 個数（期待値）
  const berryCountFactor = getBerryCountFactor(pokemon, subInfo.berryPlus);
  const berryCount = hpd * berryProb * berryCountFactor;
  const foodCount = hpd * fr;

  // 7. エナジー
  const b1 = Number(pokemon.berryEnergy ?? 0);
  const bE = berryCount * b1;

  const ingredientEnergyPerHelp = calcIngredientEnergyPerHelp(pokemon, level, pattern);
  const fE = hpd * fr * ingredientEnergyPerHelp;

  const tot = bE + fE;

  return {
    hpd,
    fr,
    sr,
    berryCount,
    foodCount,
    berryEnergyPerHelp: hpd > 0 ? bE / hpd : 0,
    ingredientEnergyPerHelp: hpd > 0 ? fE / hpd : 0,
    energyPerHelp: hpd > 0 ? tot / hpd : 0,
    dailyEnergy: tot
  };
}

// ================================
// UIイベント
// ================================
document.getElementById("calcButton").addEventListener("click", () => {
  const name = document.getElementById("pokemonSelect").value;
  const level = Number(document.getElementById("levelInput").value) || 1;

  const natureUp = document.getElementById("natureUpSelect").value;
  const natureDown = document.getElementById("natureDownSelect").value;

  const subs = [
    document.getElementById("sub10").value,
    document.getElementById("sub25").value,
    document.getElementById("sub50").value,
    document.getElementById("sub75").value,
    document.getElementById("sub100").value
  ];

  const pattern = document.getElementById("patternSelect").value || "aaa";

  const pokemon = pokemonDB.find(p => p.name === name);
  if (!pokemon) return;

  const result = calcDailyExpectation(pokemon, level, natureUp, natureDown, subs, pattern);
  if (!result) {
    displayError("計算に必要なデータが不足しています（helpTime など）");
    return;
  }

  displayResult(result);
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
    ・きのみ期待値：${r.berryEnergyPerHelp.toFixed(1)} / 回<br>
    ・食材期待値：${r.ingredientEnergyPerHelp.toFixed(1)} / 回<br>
    ・1回のおてつだい期待値：${r.energyPerHelp.toFixed(1)}<br>
  `;
}

function displayError(msg) {
  const box = document.getElementById("result");
  box.classList.remove("pks-has-result");
  box.textContent = msg;
}
