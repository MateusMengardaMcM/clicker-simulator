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

const clickSound = new Audio("click.wav");
clickSound.volume = 0.5;
clickSound.preload = "auto";

const buySounds = Array.from({ length: 4 }, () => {
  const a = new Audio("buy.wav");
  a.volume = 0.6;
  a.preload = "auto";
  return a;
});

let buySoundIndex = 0;

const errorSounds = Array.from({ length: 4 }, () => {
  const a = new Audio("error.wav");
  a.volume = 0.6;
  a.preload = "auto";
  return a;
});

let errorSoundIndex = 0;

function playBuySound() {
  const a = buySounds[buySoundIndex];
  buySoundIndex = (buySoundIndex + 1) % buySounds.length;
  a.currentTime = 0;
  a.play().catch(() => {});
}

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

function playBgMusic() {
  bgMusic.play().catch(() => {
    document.addEventListener("pointerdown", tryStartAfterBlock, { once: true });
    document.addEventListener("keydown", tryStartAfterBlock, { once: true });
  });
}

function tryStartAfterBlock() {
  bgMusic.play().catch(() => {});
}

window.addEventListener("load", () => {
  playBgMusic();
});

const DEFAULT_SKINS = [
  { file: "potato.png", name: "Classic" },
  { file: "goldenPotato.png", name: "Golden" },
  { file: "rainbowPotato.png", name: "Rainbow" },
];

const SECRET_SKINS = [
  { file: "lagartixaPotato.png", name: "Lagartixa" },
  { file: "capypotato.png", name: "Capypotato"}
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

function isSkinUnlocked(file) {
  return getUnlockedSkins().includes(file);
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

function updateUI() {
  document.getElementById("clicks").textContent = clicks;
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

function clickButton() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  const gain = Math.floor(perClick * rebirthMultiplier);
  clicks += gain;
  updateUI();

  const img = document.querySelector(".btn-img img");
  img.classList.add("pop");
  setTimeout(() => img.classList.remove("pop"), 100);
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

function buyClickUpgrade() {
  if (clicks >= clickUpgradeCost0) {
    playBuySound();
    clicks -= clickUpgradeCost0;
    perClick += 1;
    clickUpgradeCost0 = Math.floor(clickUpgradeCost0 * 1.25);
    updateUI();
    showMessage("Click power upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Click Power upgrade.");
  }
}

function buyClickUpgrade1() {
  if (clicks >= clickUpgradeCost1) {
    playBuySound();
    clicks -= clickUpgradeCost1;
    perClick += 5;
    clickUpgradeCost1 = Math.floor(clickUpgradeCost1 * 1.25);
    updateUI();
    showMessage("Click power upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Click Power upgrade.");
  }
}

function buyClickUpgrade2() {
  if (clicks >= clickUpgradeCost2) {
    playBuySound();
    clicks -= clickUpgradeCost2;
    perClick += 10;
    clickUpgradeCost2 = Math.floor(clickUpgradeCost2 * 1.25);
    updateUI();
    showMessage("Click power upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Click Power upgrade.");
  }
}

function buyClickUpgrade3() {
  if (clicks >= clickUpgradeCost3) {
    playBuySound();
    clicks -= clickUpgradeCost3;
    perClick += 50;
    clickUpgradeCost3 = Math.floor(clickUpgradeCost3 * 1.25);
    updateUI();
    showMessage("Click power upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Click Power upgrade.");
  }
}

function buyClickUpgrade4() {
  if (clicks >= clickUpgradeCost4) {
    playBuySound();
    clicks -= clickUpgradeCost4;
    perClick += 100;
    clickUpgradeCost4 = Math.floor(clickUpgradeCost4 * 1.25);
    updateUI();
    showMessage("Click power upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Click Power upgrade.");
  }
}

function buyAutoUpgrade() {
  if (clicks >= autoUpgradeCost0) {
    playBuySound();
    clicks -= autoUpgradeCost0;
    autoClick += 1;
    autoUpgradeCost0 = Math.floor(autoUpgradeCost0 * 1.33);
    updateUI();
    showMessage("Auto clicker upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Auto Clicker.");
  }
}

function buyAutoUpgrade1() {
  if (clicks >= autoUpgradeCost1) {
    playBuySound();
    clicks -= autoUpgradeCost1;
    autoClick += 5;
    autoUpgradeCost1 = Math.floor(autoUpgradeCost1 * 1.33);
    updateUI();
    showMessage("Auto clicker upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Auto Clicker.");
  }
}

function buyAutoUpgrade2() {
  if (clicks >= autoUpgradeCost2) {
    playBuySound();
    clicks -= autoUpgradeCost2;
    autoClick += 10;
    autoUpgradeCost2 = Math.floor(autoUpgradeCost2 * 1.33);
    updateUI();
    showMessage("Auto clicker upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Auto Clicker.");
  }
}

function buyAutoUpgrade3() {
  if (clicks >= autoUpgradeCost3) {
    playBuySound();
    clicks -= autoUpgradeCost3;
    autoClick += 50;
    autoUpgradeCost3 = Math.floor(autoUpgradeCost3 * 1.33);
    updateUI();
    showMessage("Auto clicker upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Auto Clicker.");
  }
}

function buyAutoUpgrade4() {
  if (clicks >= autoUpgradeCost4) {
    playBuySound();
    clicks -= autoUpgradeCost4;
    autoClick += 100;
    autoUpgradeCost4 = Math.floor(autoUpgradeCost4 * 1.33);
    updateUI();
    showMessage("Auto clicker upgraded!");
  } else {
    playErrorSound();
    showMessage("Not enough clicks for Auto Clicker.");
  }
}

setInterval(() => {
  if (autoClick > 0) {
    const gain = Math.floor(autoClick * rebirthMultiplier);
    clicks += gain;
    updateUI();
  }
}, 1000);

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

  showMessage("REBIRTH COMPLETE! Multiplier x" + Math.round(rebirthMultiplier));
}

function enterCode() {
  const code = document.getElementById("codeInput").value.trim();

  if (code === "T3stC0d3") {
    clicks += 20000;
    updateUI();
    showMessage("CODE ACCEPTED! +20,000 potatoes");
    document.getElementById("codeInput").value = "";
    return;
  }

  if (code === "22762") {
    const newlyUnlocked = unlockSkin("lagartixaPotato.png");
    updateUI();
    showMessage(newlyUnlocked ? "SKIN UNLOCKED: Lagartixa!" : "You already unlocked Lagartixa!");
    document.getElementById("codeInput").value = "";
    return;
  }

  if (code === "Capybara") {
    const newlyUnlocked = unlockSkin("capypotato.png");
    updateUI();
    showMessage(newlyUnlocked ? "SKIN UNLOCKED: Capypotato!" : "You already unlocked Lagartixa!");
    document.getElementById("codeInput").value = "";
    return;
  }

  showMessage("Invalid code");
  document.getElementById("codeInput").value = "";
}

window.addEventListener("load", () => {
  applySavedSkin();
  updateUI();
});