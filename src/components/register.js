
import { apiRequest } from "../api/api.js";

export function initRegister() {
  const btn = document.getElementById("register-btn");
  if (!btn) return;

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const repeat = document.getElementById("reg-password-repeat").value.trim();

    if (password !== repeat) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      await apiRequest("/user", {
        method: "POST",
        body: JSON.stringify({
          login: email,
          password,
          name: email.split("@")[0],
          imageUrl: "https://placekitten.com/200/200",
        }),
      });

      alert("Аккаунт создан!");
      window.renderPage && window.renderPage("login");
    } catch (err) {
      alert(err.message);
    }
  });

  const link = document.getElementById("go-login");
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.renderPage && window.renderPage("login");
    });
  }
}
