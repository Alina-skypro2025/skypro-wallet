

export function initDashboard() {
  console.log("Dashboard loaded");

  
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  
  const ensureIds = () => {
    let changed = false;
    expenses = expenses.map((e) => {
      if (e.id) return e;
      changed = true;
      return {
        ...e,
        id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now() + Math.random()),
      };
    });
    if (changed) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  };

  ensureIds();

  

 
  const tbody = document.getElementById("transactions-body");
  const noData = document.getElementById("no-transactions");

  
  const filterCategory = document.getElementById("filter-category");
  const filterSort = document.getElementById("filter-sort");
  const btnApply = document.getElementById("btn-apply");
  const btnReset = document.getElementById("btn-reset");

  
  const descInput = document.getElementById("exp-desc");
  const dateInput = document.getElementById("exp-date");
  const amountInput = document.getElementById("exp-amount");
  const btnSave = document.getElementById("btn-save-expense");

  

  function renderTable(list) {
    tbody.innerHTML = "";

    if (!list || list.length === 0) {
      noData.style.display = "block";
      return;
    }

    noData.style.display = "none";

    list.forEach((item) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${item.category}</td>
        <td>${item.description}</td>
        <td>${item.amount} ₽</td>
        <td class="table-icons">
          <span class="icon-btn js-delete-expense" data-id="${item.id}">🗑</span>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  

  function applyFilters() {
    let filtered = [...expenses];

    const cat = filterCategory.value;
    const sort = filterSort.value;

    
    if (cat !== "all") {
      filtered = filtered.filter((e) => e.category === cat);
    }

   
    if (sort === "date-new") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "date-old") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "sum-max") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sort === "sum-min") {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    renderTable(filtered);
  }

  function resetFilters() {
    filterCategory.value = "all";
    filterSort.value = "none";
    renderTable(expenses);
  }

  

  function handleAddExpense() {
    if (!descInput || !dateInput || !amountInput) return;

    const desc = descInput.value.trim();
    const date = dateInput.value;
    const amount = Number(amountInput.value);
    const categoryRadio = document.querySelector("input[name='exp-cat']:checked");

    if (!desc) {
      alert("Введите описание расхода");
      return;
    }
    if (!categoryRadio) {
      alert("Выберите категорию");
      return;
    }
    if (!date) {
      alert("Выберите дату");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    const newExpense = {
      id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now() + Math.random()),
      description: desc,
      category: categoryRadio.value,
      date,
      amount,
    };

    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    
    descInput.value = "";
    dateInput.value = "";
    amountInput.value = "";
    categoryRadio.checked = false;

    
    applyFilters();
  }

  

  tbody.addEventListener("click", (event) => {
    const btn = event.target.closest(".js-delete-expense");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    if (!confirm("Удалить этот расход?")) return;

    expenses = expenses.filter((e) => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    applyFilters();
  });

 

  if (btnApply) btnApply.addEventListener("click", applyFilters);
  if (btnReset) btnReset.addEventListener("click", resetFilters);
  if (btnSave) btnSave.addEventListener("click", handleAddExpense);

  
  renderTable(expenses);
}
