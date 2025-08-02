// Signup
document.getElementById("signupForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const recovery = document.getElementById("recovery").value;
  const target = document.getElementById("target").value;

  if (!username || !password || !recovery || !target) {
    alert("Please fill out all fields.");
    return;
  }

  const userData = {
    password: password,
    recovery: recovery,
    target: target,
  };

  localStorage.setItem(`user-${username}`, JSON.stringify(userData));
  alert("Signup successful! You can now log in.");
  window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const stored = JSON.parse(localStorage.getItem(`user-${username}`));
  if (!stored) {
    alert("User not found.");
    return;
  }

  if (stored.password !== password) {
    alert("Wrong password.");
    return;
  }

  alert("Login successful!");
  localStorage.setItem("loggedInUser", username);
  window.location.href = "dashboard.html";
});

// Recovery (very basic for now)
function recoverAccount() {
  const username = prompt("Enter your username:");
  const recoveryAns = prompt("What was your recovery answer?");
  const stored = JSON.parse(localStorage.getItem(`user-${username}`));

  if (!stored) return alert("User not found.");
  if (stored.recovery === recoveryAns) {
    alert(`✅ Your password is: ${stored.password}`);
  } else {
    alert("Wrong recovery answer.");
  }
}
