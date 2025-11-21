export function initAddExpense() {
  console.log("Add expense page loaded");

  const desc = document.getElementById("exp-desc");
  const date = document.getElementById("exp-date");
  const amount = document.getElementById("exp-amount");
  const btn = document.getElementById("btn-save-expense");

  let selectedCategory = null;

  // Выбор категории
  document.querySelectorAll(".cat-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      document.querySelectorAll(".cat-tag").forEach(t => t.classList.remove("active"));
      tag.classList.add("active");
      selectedCategory = tag.dataset.value;
    });
  });

  btn.addEventListener("click", () => {
    if (!desc.value.trim()) {
      alert("Введите описание");
      return;
    }

    if (!selectedCategory) {
      alert("Выберите категорию");
      return;
    }

    if (!date.value) {
      alert("Выберите дату");
      return;
    }

    if (!amount.value || amount.value <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const newExp = {
      id: Date.now(), 
      description: desc.value.trim(),
      category: selectedCategory,
      date: date.value,
      amount: Number(amount.value)
    };

    expenses.push(newExp);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    navigate("dashboard");
  });
}
