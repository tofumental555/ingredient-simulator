// ================================
// 定数
// ================================
const LEVEL_TIME_COEF = 0.002;
const BASE_DIVISOR = 2.222;

const NATURE_SPEED_UP = 0.9;
const NATURE_SPEED_DOWN = 1.075;

const NATURE_FOOD_UP = 1.2;
const NATURE_FOOD_DOWN = 0.8;
const NATURE_SKILL_UP = 1.2;
const NATURE_SKILL_DOWN = 0.8;

const SUB_SPEED_M = 0.86;
const SUB_SPEED_S = 0.93;
const SUB_OTEBONUS = 0.95;

// ================================
// 食材名 正規化（表記ゆれ吸収）
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
  "ドラゴン": 35, "はがね": 33, "どく": 32, "こおり": 32,
  "あく": 31, "みず": 31, "くさ": 30, "いわ": 30,
  "じめん": 29, "ノーマル": 28, "かくとう": 27, "ほのお": 27,
  "フェアリー": 26, "ゴースト": 26, "エスパー": 26,
  "でんき": 25, "むし": 24, "ひこう": 24
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
    : ["aaa", "aab", "abb", "abc", "aac", "bbc"];

  patterns.forEach(pat => {
    const opt = document.createElement("option");
    opt.value = pat;
    opt.textContent = pat;
    patternSelect.appendChild(opt);
  });
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
// 期待値計算（1日エナジー内訳のみ）
// ================================
function calcDailyExpectation(pokemon, level, up, down, subs, pattern) {
  const subInfo = analyzeSubSkills(subs);

  // --- おてつだい間隔 ---
  const h = Number(pokemon.helpTime ?? 0);
  const levelCoef = 1 - (level - 1) * LEVEL_TIME_COEF;
  const natureTime = applyNatureToTimeFactor(up, down);
  const subTime = buildTimeSubSkillFactor(subInfo);

  const t = (h * levelCoef * natureTime * subTime) / BASE_DIVISOR;
  const hpd = 86400 / t; // 1日の行動回数

  // --- 食材確率・スキル確率 ---
  let fr = Number(pokemon.ingredientFindRate ?? 0) / 100;
  let sr = Number(pokemon.skillRate ?? 0) / 100;

  fr *= buildFoodRateFactor(subInfo);
  sr *= buildSkillRateFactor(subInfo);

  fr = applyNatureToFoodRate(fr, up, down);
  sr = applyNatureToSkillRate(sr, up, down);

  fr = Math.max(0, Math.min(1, fr));
  sr = Math.max(0, Math.min(1, sr));

  // --- きのみ ---
  const berryProb = 1 - fr;
  const berryCount = hpd * berryProb * getBerryCountFactor(pokemon, subInfo.berryPlus);
  const berryEnergyPerOne = calcBerryEnergyPerOne(pokemon, level);
  const berryEnergyDaily = berryCount * berryEnergyPerOne;

  // --- 食材 ---
  const ingCountPerHelp = calcIngredientCountPerHelp(pokemon, level, pattern);
  const foodCount = hpd * fr * ingCountPerHelp;

  const ingEnergyPerHelp = calcIngredientEnergyPerHelp(pokemon, level, pattern);
  const ingredientEnergyDaily =
    ingCountPerHelp > 0 ? foodCount * (ingEnergyPerHelp / ingCountPerHelp) : 0;

  // --- 合計 ---
  const totalEnergy = berryEnergyDaily + ingredientEnergyDaily;

  return {
    hpd,
    fr,
    sr,
    berryCount,
    foodCount,
    berryEnergyDaily,
    ingredientEnergyDaily,
    totalEnergy
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
// 結果表示（内訳のみ）
// ================================
function displayResult(r) {
  const box = document.getElementById("result");
  box.classList.add("pks-has-result");

  box.innerHTML = `
    <div class="pks-result-headline">
      <span class="pks-result-num">${Math.round(r.totalEnergy)}</span>
      <span class="pks-result-unit">エナジー / 日</span>
    </div>

    <b>▼ 内訳</b><br>
    ・きのみエナジー：${Math.round(r.berryEnergyDaily)} / 日<br>
    ・食材エナジー：${Math.round(r.ingredientEnergyDaily)} / 日<br>
    <br>

    <b>▼ 行動データ</b><br>
    ・1日の行動回数：${r.hpd.toFixed(2)} 回<br>
    ・食材確率：${(r.fr * 100).toFixed(1)} %<br>
    ・スキル確率：${(r.sr * 100).toFixed(1)} %<br>
    <br>

    <b>▼ 個数</b><br>
    ・きのみ個数：${r.berryCount.toFixed(2)} 個 / 日<br>
    ・食材個数：${r.foodCount.toFixed(2)} 個 / 日<br>
  `;
}
