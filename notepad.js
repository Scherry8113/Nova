const noteArea = document.getElementById("noteArea");

// Load saved note on page load
window.onload = () => {
  const savedNote = localStorage.getItem("novaaNote");
  if (savedNote) {
    noteArea.value = savedNote;
  }
};

function saveNote() {
  localStorage.setItem("novaaNote", noteArea.value);
  alert("✅ Note saved!");
}

function clearNote() {
  if (confirm("Are you sure you want to clear this note?")) {
    noteArea.value = "";
    localStorage.removeItem("novaaNote");
  }
}
