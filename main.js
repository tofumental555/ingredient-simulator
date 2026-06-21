// ================================
// 定数（保存版ロジック準拠）
// ================================
const LEVEL_TIME_COEF = 0.002;     // レベル補正
const BASE_DIVISOR = 2.222;        // t の分母

// 性格補正（おてスピ）
const NATURE_SPEED_UP = 0.9;
const NATURE_SPEED_DOWN = 1.075;

// 性格補正（食材・スキル）※倍率はここで調整可能
const NATURE_FOOD_UP = 1.05;
const NATURE_FOOD_DOWN = 0.95;
const NATURE_SKILL_UP = 1.05;
const NATURE_SKILL_DOWN = 0.95;

// サブスキル補正（おてスピ）
const SUB_SPEED_M = 0.86;   // -14%
const SUB_SPEED_S = 0.93;   // -7%
const SUB_OTEBONUS = 0.95;  // -5%

// 食材・スキル確率補正（保存版：1.36 / 1.18）
const SUB_FOOD_M = 1.36;
const SUB_FOOD_S = 1.18;
const SUB_SKILL_M = 1.36;
const SUB_SKILL_S = 1.18;


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
}

loadDB();


// ================================
// UIにポケモン一覧を流し込む
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
}


// ================================
// サブスキル一覧
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
    SUB_SKILLS.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      sel.appendChild(opt);
    });
  });
}


// ================================
// 性格補正の適用
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
// サブスキル補正の適用
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
// 食材枠（レベルによる解放）
// ================================
function getUnlockedSlots(level) {
  if (level < 30) return [1];
  if (level < 60) return [1, 2];
  return [1, 2, 3];
}


// ================================
// 食材1個エナジー（ここは現状：ingredient_energy.json をそのまま使用）
// ================================
function calcIngredientEnergyPerUnit(name) {
  return ingredientEnergyDB[name] ?? 0;
}


// ================================
// 期待値計算（保存版ロジックベース）
// ================================
function calcDailyExpectation(pokemon, level, natureUp, natureDown, subs, ingA, ingB, ingC) {
  const subInfo = analyzeSubSkills(subs);

  // 2. おてつだい時間 t
  const h = pokemon.helpTime; // DBの基礎おてつだい時間
  const levelCoef = 1 - (level - 1) * LEVEL_TIME_COEF;
  const natureTimeFactor = applyNatureToTimeFactor(natureUp, natureDown);
  const subTimeFactor = buildTimeSubSkillFactor(subInfo);

  const t = (h * levelCoef * natureTimeFactor * subTimeFactor) / BASE_DIVISOR;

  // 3. 1日のおてつだい回数
  const hpd = 86400 / t;

  // 4. 食材確率 / スキル確率
  let frBase = pokemon.foodRate;
  let srBase = pokemon.skillRate;

  const foodSubFactor = buildFoodRateFactor(subInfo);
  const skillSubFactor = buildSkillRateFactor(subInfo);

  let fr = frBase * foodSubFactor;
  let sr = srBase * skillSubFactor;

  fr = applyNatureToFoodRate(fr, natureUp, natureDown);
  sr = applyNatureToSkillRate(sr, natureUp, natureDown);

  if (fr > 1) fr = 1;
  if (fr < 0) fr = 0;
  if (sr > 1) sr = 1;
  if (sr < 0) sr = 0;

  const berryProb = 1 - fr;

  // 6. 個数（期待値）
  const berryCountFactor = getBerryCountFactor(pokemon, subInfo.berryPlus);
  const berryCount = hpd * berryProb * berryCountFactor;
  const foodCount = hpd * fr;

  // 7. エナジー
  // きのみエナジー：DBの berryEnergy を1個あたりとみなす（保存版のBERRY_BASE理論はここに差し替え可能）
  const b1 = pokemon.berryEnergy;
  const bE = berryCount * b1;

  // 食材1個エナジー：レベルによるfnは未導入。ingredient_energy.jsonをそのまま使用。
  const unlocked = getUnlockedSlots(level);
  const slotProb = 1 / unlocked.length;

  let foodUnitEnergy = 0;

  for (const slot of unlocked) {
    const choices = [];

    if (slot === 1) {
      choices.push({ ingredient: pokemon.ingredientA, count: ingA || pokemon["a1"] });
    } else if (slot === 2) {
      choices.push({ ingredient: pokemon.ingredientA, count: ingA || pokemon["a2"] });
      choices.push({ ingredient: pokemon.ingredientB, count: ingB || pokemon["b2"] });
    } else if (slot === 3) {
      choices.push({ ingredient: pokemon.ingredientA, count: ingA || pokemon["a3"] });
      choices.push({ ingredient: pokemon.ingredientB, count: ingB || pokemon["b3"] });
      choices.push({ ingredient: pokemon.ingredientC, count: ingC || pokemon["c3"] });
    }

    const choiceProb = 1 / choices.length;

    for (const c of choices) {
      const per = calcIngredientEnergyPerUnit(c.ingredient);
      foodUnitEnergy += slotProb * choiceProb * per * c.count;
    }
  }

  const fE = foodCount * (foodUnitEnergy / (foodCount || 1)); // 1回あたりの平均エナジー×回数

  const tot = bE + fE;

  return {
    hpd,
    fr,
    sr,
    berryCount,
    foodCount,
    berryEnergyPerHelp: bE / (hpd || 1),
    ingredientEnergyPerHelp: fE / (hpd || 1),
    energyPerHelp: tot / (hpd || 1),
    dailyEnergy: tot
  };
}


// ================================
// UIイベント
// ================================
document.getElementById("calcButton").addEventListener("click", () => {
  const name = document.getElementById("pokemonSelect").value;
  const level = Number(document.getElementById("levelInput").value);

  const natureUp = document.getElementById("natureUpSelect").value;
  const natureDown = document.getElementById("natureDownSelect").value;

  const subs = [
    document.getElementById("sub10").value,
    document.getElementById("sub25").value,
    document.getElementById("sub50").value,
    document.getElementById("sub75").value,
    document.getElementById("sub100").value
  ];

  const ingA = Number(document.getElementById("ingA").value) || 0;
  const ingB = Number(document.getElementById("ingB").value) || 0;
  const ingC = Number(document.getElementById("ingC").value) || 0;

  const pokemon = pokemonDB.find(p => p.name === name);
  if (!pokemon) return;

  const result = calcDailyExpectation(pokemon, level, natureUp, natureDown, subs, ingA, ingB, ingC);

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
