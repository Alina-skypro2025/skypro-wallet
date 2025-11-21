
import { apiRequest } from "../api/api.js";

export function initLogin() {
  const btn = document.getElementById("login-btn");
  if (!btn) return;

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
      const data = await apiRequest("/user/login", {
        method: "POST",
        body: JSON.stringify({ login: email, password }),
      });

      localStorage.setItem("token", data.user.token);

      
      window.renderPage && window.renderPage("dashboard");
    } catch (err) {
      alert(err.message);
    }
  });

  const link = document.getElementById("go-register");
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.renderPage && window.renderPage("register");
    });
  }
}
