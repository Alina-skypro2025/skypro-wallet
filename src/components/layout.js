

export function initLayout() {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      if (window.renderPage) {
        window.renderPage("login");
      }
    });
  }
}
