

export function initEditExpense() {
  console.log("Edit expense loaded");

  const id = localStorage.getItem("edit-id");
  if (!id) {
    alert("Ошибка: расход не найден");
    window.navigate && window.navigate("dashboard");
    return;
  }

  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  const exp = expenses.find((e) => e.id === id);

  if (!exp) {
    alert("Ошибка: расход не найден");
    window.navigate && window.navigate("dashboard");
    return;
  }

  
  document.getElementById("exp-desc").value = exp.description;
  document.getElementById("exp-date").value = exp.date;
  document.getElementById("exp-amount").value = exp.amount;

  const radio = document.querySelector(
    `input[name="exp-cat"][value="${exp.category}"]`
  );
  if (radio) radio.checked = true;

  
  const btn = document.getElementById("btn-update-expense");
  if (!btn) return;

  btn.onclick = () => {
    const desc = document.getElementById("exp-desc").value.trim();
    const date = document.getElementById("exp-date").value;
    const amount = +document.getElementById("exp-amount").value;
    const category = document.querySelector(
      `input[name="exp-cat"]:checked`
    )?.value;

    if (!desc || !date || !amount || !category) {
      alert("Заполните все поля");
      return;
    }

    exp.description = desc;
    exp.date = date;
    exp.amount = amount;
    exp.category = category;

    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.removeItem("edit-id");

    window.navigate && window.navigate("dashboard");
  };
}
