const form = document.querySelector("#bet-form");
const payoutOutput = document.querySelector("#payout-output");
const profitOutput = document.querySelector("#profit-output");
const toggleButton = document.querySelector("#toggle-button");
const speakerIcon = document.querySelector("#speaker-icon");
const toggleSwitch = document.querySelector("#toggle-switch");

let confetti;

function switchMode() {
  document.body.dataset.mode = toggleSwitch.checked ? "light" : "dark";
}

toggleSwitch.addEventListener("change", switchMode);

let audioMuted = false;

toggleButton.addEventListener("click", () => {
  audioMuted = !audioMuted;
  speakerIcon.innerHTML = audioMuted ? `<i class="fas fa-volume-mute"></i>` : `<i class="fas fa-volume-up"></i>`;
});

let profit;

form.addEventListener("submit", e => {
  e.preventDefault();
  const odds = parseFloat(document.querySelector("#odds").value);
  const stake = parseFloat(document.querySelector("#stake").value);
  const oddsType = document.querySelector("#odds-type").value;
  let payout;

  if (oddsType === "decimal") {
    payout = odds * stake;
    profit = payout - stake
  } else {
    if (odds < 0) {
      profit = (100 / Math.abs(odds)) * stake;
      payout = profit + stake
    } else {
      profit = (odds / 100) * stake;
      payout = profit + stake
    }
  }

  payoutOutput.textContent = `Payout: $${payout.toFixed(2)}`;
  profitOutput.textContent = `Profit: $${profit.toFixed(2)}`;


  if (!audioMuted) {
    const audio = new Audio("sound.mp3");
    audio.volume = 0.25;
    audio.play();
  }
  
  if (profit >= 100 && !confetti) {
    const confettiSettings = { target: "confetti-canvas" };
    confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    setTimeout(() => {
      confetti.clear();
      confetti = null;
    }, 5000);
  }
});
