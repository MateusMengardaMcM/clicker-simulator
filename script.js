let clicks = 0;
let perClick = 1;
let autoClick = 0;

let clickUpgradeCost0 = 50;
let clickUpgradeCost1 = 275;
let clickUpgradeCost2 = 500;
let clickUpgradeCost3 = 3000;
let clickUpgradeCost4 = 7500;
let autoUpgradeCost0 = 75;
let autoUpgradeCost1 = 350;
let autoUpgradeCost2 = 625;
let autoUpgradeCost3 = 3000;

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
}


function clickButton() {
    clicks += perClick;
    updateUI();
}

function showMessage(text) {
    document.getElementById("message").textContent = text;
}

function buyClickUpgrade() {
    if (clicks >= clickUpgradeCost0) {
        clicks -= clickUpgradeCost0;
        perClick += 1;
        clickUpgradeCost0 = Math.floor(clickUpgradeCost0 * 1.25);
        updateUI();
        showMessage("Click power upgraded!");
    } else {
        showMessage("Not enough clicks for Click Power upgrade.");
    }
}

function buyClickUpgrade1() {
    if (clicks >= clickUpgradeCost1) {
        clicks -= clickUpgradeCost1;
        perClick += 5;
        clickUpgradeCost1 = Math.floor(clickUpgradeCost1 * 1.25);
        updateUI();
        showMessage("Click power upgraded!");
    } else {
        showMessage("Not enough clicks for Click Power upgrade.");
    }
}

function buyClickUpgrade2() {
    if (clicks >= clickUpgradeCost2) {
        clicks -= clickUpgradeCost2;
        perClick += 10;
        clickUpgradeCost2 = Math.floor(clickUpgradeCost2 * 1.25);
        updateUI();
        showMessage("Click power upgraded!");
    } else {
        showMessage("Not enough clicks for Click Power upgrade.");
    }
}

function buyClickUpgrade3() {
    if (clicks >= clickUpgradeCost3) {
        clicks -= clickUpgradeCost3;
        perClick += 50;
        clickUpgradeCost3 = Math.floor(clickUpgradeCost3 * 1.25);
        updateUI();
        showMessage("Click power upgraded!");
    } else {
        showMessage("Not enough clicks for Click Power upgrade.");
    }
}

function buyClickUpgrade4() {
    if (clicks >= clickUpgradeCost4) {
        clicks -= clickUpgradeCost4;
        perClick += 100;
        clickUpgradeCost4 = Math.floor(clickUpgradeCost3 * 1.25);
        updateUI();
        showMessage("Click power upgraded!");
    } else {
        showMessage("Not enough clicks for Click Power upgrade.");
    }
}

function buyAutoUpgrade() {
    if (clicks >= autoUpgradeCost0) {
        clicks -= autoUpgradeCost0;
        autoClick += 1;
        autoUpgradeCost0 = Math.floor(autoUpgradeCost0 * 1.33);
        updateUI();
        showMessage("Auto clicker upgraded!");
    } else {
        showMessage("Not enough clicks for Auto Clicker.");
    }
}

function buyAutoUpgrade1() {
    if (clicks >= autoUpgradeCost1) {
        clicks -= autoUpgradeCost1;
        autoClick += 5;
        autoUpgradeCost1 = Math.floor(autoUpgradeCost1 * 1.33);
        updateUI();
        showMessage("Auto clicker upgraded!");
    } else {
        showMessage("Not enough clicks for Auto Clicker.");
    }
}

function buyAutoUpgrade2() {
    if (clicks >= autoUpgradeCost2) {
        clicks -= autoUpgradeCost2;
        autoClick += 10;
        autoUpgradeCost2 = Math.floor(autoUpgradeCost2 * 1.33);
        updateUI();
        showMessage("Auto clicker upgraded!");
    } else {
        showMessage("Not enough clicks for Auto Clicker.");
    }
}

function buyAutoUpgrade3() {
    if (clicks >= autoUpgradeCost3) {
        clicks -= autoUpgradeCost3;
        autoClick += 50;
        autoUpgradeCost3 = Math.floor(autoUpgradeCost3 * 1.33);
        updateUI();
        showMessage("Auto clicker upgraded!");
    } else {
        showMessage("Not enough clicks for Auto Clicker.");
    }
}

setInterval(() => {
    if (autoClick > 0) {
        clicks += autoClick;
        updateUI();
    }
}, 1000);

function clickButton() {
    clicks += perClick;
    document.getElementById("clicks").textContent = clicks;

    const img = document.querySelector(".btn-img img");

    img.classList.add("pop");

    setTimeout(() => {
        img.classList.remove("pop");
    }, 100);
}

updateUI();