

console.log("APP STARTED");

let layoutLoaded = false;


async function loadLayout() {
  const response = await fetch("./pages/layout.html");
  const layoutHtml = await response.text();

  document.querySelector("#app").outerHTML = layoutHtml;

  
  import("./components/layout.js").then((m) => m.initLayout());
}


async function renderInner(page) {
  const response = await fetch(`./pages/${page}.html`);
  const html = await response.text();

  const container = document.querySelector("#inner-page");
  if (!container) return;

  container.innerHTML = html;

  initPageLogic(page);
}


async function renderPage(page) {
  console.log("NAVIGATE:", page);

  
  if (page === "login" || page === "register") {
    const response = await fetch(`./pages/${page}.html`);
    const html = await response.text();

    
    document.body.innerHTML = `
      <div id="app" class="center">
        ${html}
      </div>
    `;

    initPageLogic(page);
    layoutLoaded = false;
    return;
  }

  
  if (!layoutLoaded) {
    
    document.body.innerHTML = `<div id="app" class="layout"></div>`;
    await loadLayout();
    layoutLoaded = true;
  }

  await renderInner(page);
}


function initPageLogic(page) {
  const load = (path, fn) => import(path).then((m) => m[fn]());

  if (page === "login") load("./components/login.js", "initLogin");
  if (page === "register") load("./components/register.js", "initRegister");
  if (page === "dashboard") load("./components/dashboard.js", "initDashboard");
  if (page === "analysis") load("./components/analysis.js", "initAnalysis");
  if (page === "add-expense") load("./components/add-expense.js", "initAddExpense");
  if (page === "edit-expense") load("./components/edit-expense.js", "initEditExpense");
  if (page === "period") load("./components/period.js", "initPeriod");
}


window.renderPage = renderPage;
window.navigate = renderPage;


renderPage("login");
