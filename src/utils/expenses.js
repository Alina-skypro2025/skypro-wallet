export function saveExpenses(list) {
  localStorage.setItem("expenses", JSON.stringify(list));
}

export function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses") || "[]");
}
