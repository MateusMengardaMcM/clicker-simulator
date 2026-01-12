let clicks = 0;
let perClick = 1;
let autoClick = 0;
let rebirthMultiplier = 1;

let clickUpgradeCost0 = 50;
let clickUpgradeCost1 = 275;
let clickUpgradeCost2 = 500;
let clickUpgradeCost3 = 3000;
let clickUpgradeCost4 = 7500;

let autoUpgradeCost0 = 75;
let autoUpgradeCost1 = 350;
let autoUpgradeCost2 = 625;
let autoUpgradeCost3 = 3000;
let autoUpgradeCost4 = 8750;

function saveGame() {
  const data = {
    clicks,
    perClick,
    autoClick,
    rebirthMultiplier,
    clickUpgradeCost0,
    clickUpgradeCost1,
    clickUpgradeCost2,
    clickUpgradeCost3,
    clickUpgradeCost4,
    autoUpgradeCost0,
    autoUpgradeCost1,
    autoUpgradeCost2,
    autoUpgradeCost3,
    autoUpgradeCost4
  };
  localStorage.setItem("potatoGameSave", JSON.stringify(data));
}

function loadGame() {
  try {
    const data = JSON.parse(localStorage.getItem("potatoGameSave") || "null");
    if (!data) return;

    clicks = data.clicks ?? 0;
    perClick = data.perClick ?? 1;
    autoClick = data.autoClick ?? 0;
    rebirthMultiplier = data.rebirthMultiplier ?? 1;

    clickUpgradeCost0 = data.clickUpgradeCost0 ?? 50;
    clickUpgradeCost1 = data.clickUpgradeCost1 ?? 275;
    clickUpgradeCost2 = data.clickUpgradeCost2 ?? 500;
    clickUpgradeCost3 = data.clickUpgradeCost3 ?? 3000;
    clickUpgradeCost4 = data.clickUpgradeCost4 ?? 7500;

    autoUpgradeCost0 = data.autoUpgradeCost0 ?? 75;
    autoUpgradeCost1 = data.autoUpgradeCost1 ?? 350;
    autoUpgradeCost2 = data.autoUpgradeCost2 ?? 625;
    autoUpgradeCost3 = data.autoUpgradeCost3 ?? 3000;
    autoUpgradeCost4 = data.autoUpgradeCost4 ?? 8750;
  } catch {}
}

const clickSounds = Array.from({ length: 6 }, () => {
  const a = new Audio("click.wav");
  a.volume = 0.5;
  a.preload = "auto";
  return a;
});
let clickSoundIndex = 0;

function playClickSound() {
  const a = clickSounds[clickSoundIndex];
  clickSoundIndex = (clickSoundIndex + 1) % clickSounds.length;
  a.currentTime = 0;
  a.play().catch(() => {});
}

const buySounds = Array.from({ length: 4 }, () => {
  const a = new Audio("buy.wav");
  a.volume = 0.6;
  a.preload = "auto";
  return a;
});
let buySoundIndex = 0;

function playBuySound() {
  const a = buySounds[buySoundIndex];
  buySoundIndex = (buySoundIndex + 1) % buySounds.length;
  a.currentTime = 0;
  a.play().catch(() => {});
}

const errorSounds = Array.from({ length: 4 }, () => {
  const a = new Audio("error.wav");
  a.volume = 0.6;
  a.preload = "auto";
  return a;
});
let errorSoundIndex = 0;

function playErrorSound() {
  const a = errorSounds[errorSoundIndex];
  errorSoundIndex = (errorSoundIndex + 1) % errorSounds.length;
  a.currentTime = 0;
  a.play().catch(() => {});
}

const bgMusic = new Audio("background.wav");
bgMusic.loop = true;
bgMusic.volume = 0.25;
bgMusic.preload = "auto";

let bgStarted = false;

function tryStartAfterBlock() {
  bgMusic.play().then(() => {
    bgStarted = true;
  }).catch(() => {});
}

function playBgMusic() {
  if (bgStarted) return;
  bgMusic.play().then(() => {
    bgStarted = true;
  }).catch(() => {
    document.addEventListener("pointerdown", tryStartAfterBlock, { once: true });
    document.addEventListener("keydown", tryStartAfterBlock, { once: true });
  });
}

const TROPHY_NAMES = {
  first_click: "First Click",
  first_buy: "First Purchase",
  rebirth_1: "First Rebirth",
  viced_on_potatos: "Viced on Potatoes"
};

function getUnlockedTrophies() {
  try {
    return JSON.parse(localStorage.getItem("trophies") || "[]");
  } catch {
    return [];
  }
}

function checkProgressTrophies() {
  if (clicks >= 1_000_000) {
    unlockTrophy("million_potatoes");
  }
}

function setUnlockedTrophies(arr) {
  localStorage.setItem("trophies", JSON.stringify(arr));
}

function unlockTrophy(id) {
  const unlocked = getUnlockedTrophies();
  if (unlocked.includes(id)) return false;

  unlocked.push(id);
  setUnlockedTrophies(unlocked);

  function millionPotatoes() {
  if (clicks >= 1_000_000) {
    unlockTrophy("Viced on Potatoes");
  }
}

  const el = document.getElementById("message");
  if (el) {
    const prev = el.textContent;
    const name = TROPHY_NAMES[id] || id;
    el.textContent = (prev ? prev + " | " : "") + "TROPHY UNLOCKED: " + name;
    setTimeout(() => {
      if (el.textContent.includes("TROPHY UNLOCKED: " + name)) el.textContent = prev;
    }, 1200);
  }

  return true;
}

const DEFAULT_SKINS = [
  { file: "potato.png", name: "Classic" },
];

const SECRET_SKINS = [
  { file: "lagartixaPotato.png", name: "Lagartixa" },
  { file: "capypotato.png", name: "Capypotato" }
];

function getUnlockedSkins() {
  try {
    return JSON.parse(localStorage.getItem("unlockedSkins") || "[]");
  } catch {
    return [];
  }
}

function setUnlockedSkins(arr) {
  localStorage.setItem("unlockedSkins", JSON.stringify(arr));
}

function unlockSkin(file) {
  const unlocked = getUnlockedSkins();
  if (!unlocked.includes(file)) {
    unlocked.push(file);
    setUnlockedSkins(unlocked);
    return true;
  }
  return false;
}

function applySavedSkin() {
  const savedSkin = localStorage.getItem("selectedSkin");
  const potatoImg = document.getElementById("potatoImg");
  if (savedSkin && potatoImg) potatoImg.src = savedSkin;
}

function seeSkin() {
  window.location.href = "skins.html";
}

function seeTrophies() {
  window.location.href = "trophies.html";
}

function updateUI() {
  const elClicks = document.getElementById("clicks");
  if (!elClicks) return;

  elClicks.textContent = clicks;
  document.getElementById("perClick").textContent = perClick;
  document.getElementById("autoClick").textContent = autoClick;

  document.getElementById("clickUpgradeCost0").textContent = clickUpgradeCost0;
  document.getElementById("clickUpgradeCost1").textContent = clickUpgradeCost1;
  document.getElementById("clickUpgradeCost2").textContent = clickUpgradeCost2;
  document.getElementById("clickUpgradeCost3").textContent = clickUpgradeCost3;
  document.getElementById("clickUpgradeCost4").textContent = clickUpgradeCost4;

  document.getElementById("autoUpgradeCost0").textContent = autoUpgradeCost0;
  document.getElementById("autoUpgradeCost1").textContent = autoUpgradeCost1;
  document.getElementById("autoUpgradeCost2").textContent = autoUpgradeCost2;
  document.getElementById("autoUpgradeCost3").textContent = autoUpgradeCost3;
  document.getElementById("autoUpgradeCost4").textContent = autoUpgradeCost4;
}

function showMessage(text) {
  const el = document.getElementById("message");
  if (el) el.textContent = text;
}

function applyAutoGain() {
  if (autoClick <= 0) return;
  const gain = Math.floor(autoClick * rebirthMultiplier);
  clicks += gain;
  updateUI();
  saveGame();
}

function clickButton() {
  playBgMusic();
  playClickSound();

  unlockTrophy("first_click");

  const gain = Math.floor(perClick * rebirthMultiplier);
  clicks += gain;

  checkProgressTrophies();
  
  updateUI();
  saveGame();

  const img = document.querySelector(".btn-img img");
  if (img) {
    img.classList.add("pop");
    setTimeout(() => img.classList.remove("pop"), 100);
  }
}

function handlePurchase(okCallback, failMessage) {
  if (okCallback()) {
    playBuySound();
    unlockTrophy("first_buy");
    updateUI();
    saveGame();
    return;
  }
  playErrorSound();
  showMessage(failMessage);
}

function buyClickUpgrade() {
  handlePurchase(() => {
    if (clicks < clickUpgradeCost0) return false;
    clicks -= clickUpgradeCost0;
    perClick += 1;
    clickUpgradeCost0 = Math.floor(clickUpgradeCost0 * 1.25);
    showMessage("Click power upgraded!");
    return true;
  }, "Not enough clicks for Click Power upgrade.");
}

function buyClickUpgrade1() {
  handlePurchase(() => {
    if (clicks < clickUpgradeCost1) return false;
    clicks -= clickUpgradeCost1;
    perClick += 5;
    clickUpgradeCost1 = Math.floor(clickUpgradeCost1 * 1.25);
    showMessage("Click power upgraded!");
    return true;
  }, "Not enough clicks for Click Power upgrade.");
}

function buyClickUpgrade2() {
  handlePurchase(() => {
    if (clicks < clickUpgradeCost2) return false;
    clicks -= clickUpgradeCost2;
    perClick += 10;
    clickUpgradeCost2 = Math.floor(clickUpgradeCost2 * 1.25);
    showMessage("Click power upgraded!");
    return true;
  }, "Not enough clicks for Click Power upgrade.");
}

function buyClickUpgrade3() {
  handlePurchase(() => {
    if (clicks < clickUpgradeCost3) return false;
    clicks -= clickUpgradeCost3;
    perClick += 50;
    clickUpgradeCost3 = Math.floor(clickUpgradeCost3 * 1.25);
    showMessage("Click power upgraded!");
    return true;
  }, "Not enough clicks for Click Power upgrade.");
}

function buyClickUpgrade4() {
  handlePurchase(() => {
    if (clicks < clickUpgradeCost4) return false;
    clicks -= clickUpgradeCost4;
    perClick += 100;
    clickUpgradeCost4 = Math.floor(clickUpgradeCost4 * 1.25);
    showMessage("Click power upgraded!");
    return true;
  }, "Not enough clicks for Click Power upgrade.");
}

function buyAutoUpgrade() {
  handlePurchase(() => {
    if (clicks < autoUpgradeCost0) return false;
    clicks -= autoUpgradeCost0;
    autoClick += 1;
    autoUpgradeCost0 = Math.floor(autoUpgradeCost0 * 1.33);
    showMessage("Auto clicker upgraded!");
    return true;
  }, "Not enough clicks for Auto Clicker.");
}

function buyAutoUpgrade1() {
  handlePurchase(() => {
    if (clicks < autoUpgradeCost1) return false;
    clicks -= autoUpgradeCost1;
    autoClick += 5;
    autoUpgradeCost1 = Math.floor(autoUpgradeCost1 * 1.33);
    showMessage("Auto clicker upgraded!");
    return true;
  }, "Not enough clicks for Auto Clicker.");
}

function buyAutoUpgrade2() {
  handlePurchase(() => {
    if (clicks < autoUpgradeCost2) return false;
    clicks -= autoUpgradeCost2;
    autoClick += 10;
    autoUpgradeCost2 = Math.floor(autoUpgradeCost2 * 1.33);
    showMessage("Auto clicker upgraded!");
    return true;
  }, "Not enough clicks for Auto Clicker.");
}

function buyAutoUpgrade3() {
  handlePurchase(() => {
    if (clicks < autoUpgradeCost3) return false;
    clicks -= autoUpgradeCost3;
    autoClick += 50;
    autoUpgradeCost3 = Math.floor(autoUpgradeCost3 * 1.33);
    showMessage("Auto clicker upgraded!");
    return true;
  }, "Not enough clicks for Auto Clicker.");
}

function buyAutoUpgrade4() {
  handlePurchase(() => {
    if (clicks < autoUpgradeCost4) return false;
    clicks -= autoUpgradeCost4;
    autoClick += 100;
    autoUpgradeCost4 = Math.floor(autoUpgradeCost4 * 1.33);
    showMessage("Auto clicker upgraded!");
    return true;
  }, "Not enough clicks for Auto Clicker.");
}

function tryRebirth() {
  if (clicks < 20000) {
    alert("You need at least 20,000 potatoes to rebirth!");
    return;
  }

  const confirmRebirth = confirm(
    "Are you sure you want to rebirth?\n\n" +
      "You will lose ALL potatoes, upgrades and auto-clickers,\n" +
      "but you will gain a permanent multiplier!"
  );

  if (!confirmRebirth) return;

  unlockTrophy("rebirth_1");

  const gainedMultiplier = clicks / 10000;
  rebirthMultiplier += gainedMultiplier;

  clicks = 0;
  perClick = 1;
  autoClick = 0;

  clickUpgradeCost0 = 50;
  clickUpgradeCost1 = 275;
  clickUpgradeCost2 = 500;
  clickUpgradeCost3 = 3000;
  clickUpgradeCost4 = 7500;

  autoUpgradeCost0 = 75;
  autoUpgradeCost1 = 350;
  autoUpgradeCost2 = 625;
  autoUpgradeCost3 = 3000;
  autoUpgradeCost4 = 8750;

  updateUI();
  saveGame();

  showMessage("REBIRTH COMPLETE! Multiplier x" + Math.round(rebirthMultiplier));
}

function enterCode() {
  const input = document.getElementById("codeInput");
  const code = (input ? input.value : "").trim();

  if (code === "T3stC0d3") {
    clicks += 1000000;
    updateUI();
    saveGame();
    showMessage("CODE ACCEPTED! +1,000,000 potatoes");
    if (input) input.value = "";
    return;
  }

  if (code === "22762") {
    const newlyUnlocked = unlockSkin("lagartixaPotato.png");
    showMessage(newlyUnlocked ? "SKIN UNLOCKED: Lagartixa!" : "You already unlocked Lagartixa!");
    if (input) input.value = "";
    return;
  }

  if (code === "Capybara") {
    const newlyUnlocked = unlockSkin("capypotato.png");
    showMessage(newlyUnlocked ? "SKIN UNLOCKED: Capypotato!" : "You already unlocked Capypotato!");
    if (input) input.value = "";
    return;
  }

  showMessage("Invalid code");
  if (input) input.value = "";
}

setInterval(applyAutoGain, 1000);
setInterval(saveGame, 5000);

window.addEventListener("load", () => {
  loadGame();
  applySavedSkin();
  updateUI();
  playBgMusic();
});