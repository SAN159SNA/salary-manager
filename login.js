const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("toggle").addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});

function setError(input, msg) {
  input.parentElement.classList.toggle("invalid", !!msg);
  document.getElementById(input.id + "-error").textContent = msg;
  return !msg;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const okEmail = setError(email, /^\S+@\S+\.\S+$/.test(email.value) ? "" : "Enter a valid email");
  const okPass = setError(password, password.value.length >= 6 ? "" : "At least 6 characters");
  if (!okEmail || !okPass) return;

  const btn = document.getElementById("submit");
  btn.textContent = "Signing in…";
  btn.classList.add("loading");
  // Demo only: no backend yet, so just continue to the app.
  setTimeout(() => (window.location.href = "index.html"), 800);
});
