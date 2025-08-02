let interval;
let totalSeconds = 0;
let isPaused = false;

function startTimer() {
  const minutesInput = document.getElementById("minutes");
  const display = document.getElementById("countdown");
  const pauseBtn = document.getElementById("pauseBtn");

  const minutes = parseInt(minutesInput.value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter valid minutes.");
    return;
  }

  totalSeconds = minutes * 60;
  isPaused = false;
  pauseBtn.innerText = "Pause";

  clearInterval(interval);
  interval = setInterval(() => {
    if (!isPaused) {
      const min = Math.floor(totalSeconds / 60);
      const sec = totalSeconds % 60;
      display.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

      // quarter alert
      if (totalSeconds === Math.floor((minutes * 60) * 0.75)) {
        alert("⚠️ 1/4 time passed. Stay focused!");
      }

      if (totalSeconds <= 0) {
        clearInterval(interval);
        alert("⏰ Time’s up!");
      }

      totalSeconds--;
    }
  }, 1000);
}

function togglePause() {
  const pauseBtn = document.getElementById("pauseBtn");
  if (isPaused) {
    isPaused = false;
    pauseBtn.innerText = "Pause";
  } else {
    isPaused = true;
    pauseBtn.innerText = "Resume";
  }
}

function getTitleFromXP(xp) {
  if (xp >= 100) return "⚔️ Legend";
  if (xp >= 75) return "🔥 Champion";
  if (xp >= 50) return "🧠 Expert";
  if (xp >= 30) return "🎯 Skilled";
  if (xp >= 10) return "📘 Apprentice";
  return "🥚 Newbie";
}

function updateXPDisplay() {
  const xp = parseInt(localStorage.getItem("novaaXP")) || 0;
  const xpBox = document.getElementById("xpDisplay");
  if (xpBox) {
    xpBox.textContent = `Title: ${getTitleFromXP(xp)} (${xp} XP)`;
  }
}

window.onload = () => {
  updateXPDisplay();
  // add more if needed later
};
