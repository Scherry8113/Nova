// quests.js
let quests = JSON.parse(localStorage.getItem("novaaQuests")) || [];
let xp = parseInt(localStorage.getItem("novaaXP")) || 0;

function getTitleFromXP(xp) {
  if (xp >= 100) return "⚔️ Legend";
  if (xp >= 75) return "🔥 Champion";
  if (xp >= 50) return "🧠 Expert";
  if (xp >= 30) return "🎯 Skilled";
  if (xp >= 10) return "📘 Apprentice";
  return "🥚 Newbie";
}

function updateTitle() {
  const titleBox = document.getElementById("xpTitle");
  titleBox.textContent = `Title: ${getTitleFromXP(xp)} (${xp} XP)`;
}

function saveQuests() {
  localStorage.setItem("novaaQuests", JSON.stringify(quests));
  localStorage.setItem("novaaXP", xp);
}

function renderQuests() {
  const questList = document.getElementById("questList");
  questList.innerHTML = "";

  quests.forEach((quest, index) => {
    const li = document.createElement("li");
    li.className = quest.done ? "done" : "";

    const text = document.createElement("span");
    text.textContent = quest.text;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = quest.done ? "Undo" : "Done ✅";
    doneBtn.className = "done-btn";
    doneBtn.onclick = () => {
      quests[index].done = !quests[index].done;
      if (quests[index].done) {
        xp += 10;
      } else {
        xp = Math.max(0, xp - 10);
      }
      saveQuests();
      renderQuests();
      updateTitle();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      if (confirm("Delete this quest?")) {
        if (quests[index].done) {
          xp = Math.max(0, xp - 10);
        }
        quests.splice(index, 1);
        saveQuests();
        renderQuests();
        updateTitle();
      }
    };

    li.appendChild(text);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    questList.appendChild(li);
  });
}


function addQuest() {
  const input = document.getElementById("newQuest");
  const text = input.value.trim();
  if (text !== "") {
    quests.push({ text, done: false });
    input.value = "";
    saveQuests();
    renderQuests();
  }
}

window.onload = () => {
  renderQuests();
  updateTitle();
};
