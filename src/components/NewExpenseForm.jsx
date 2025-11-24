
import { useState } from "react";
import { createTransaction } from "../api/api";

const CATEGORY_CONFIG = {
  food: { label: "Еда", icon: "🍔" },
  transport: { label: "Транспорт", icon: "🚗" },
  housing: { label: "Жильё", icon: "🏠" },
  joy: { label: "Развлечения", icon: "🎉" },
  education: { label: "Образование", icon: "🎓" },
  others: { label: "Другое", icon: "📦" },
};

export default function NewExpenseForm({ onAdded }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");
  const [sum, setSum] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!description || !date || !sum) {
      setError("Заполните описание, дату и сумму");
      return;
    }

    const numericSum = Number(sum);

    if (!Number.isFinite(numericSum) || numericSum <= 0) {
      setError("Сумма должна быть положительным числом");
      return;
    }

    try {
      await createTransaction({
        description: description.trim(),
        category,
        date, 
        sum: numericSum,
      });

     
      setDescription("");
      setDate("");
      setSum("");
      setCategory("food");

      onAdded();
    } catch (err) {
      setError(err.message || "Не удалось добавить расход");
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2 className="card-title">Новый расход</h2>

      {error && <div className="card-error">{error}</div>}

      <div className="form-field">
        <label className="form-label">Описание</label>
        <input
          className="form-input"
          placeholder="Введите описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Категория</label>
        <div className="category-pills">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              className={
                "category-pill" +
                (category === key ? " category-pill--active" : "")
              }
              onClick={() => setCategory(key)}
            >
              <span className="category-pill-icon">{cfg.icon}</span>
              <span>{cfg.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Дата</label>
        <input
          type="date"
          className="form-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Сумма</label>
        <input
          type="number"
          className="form-input"
          placeholder="Введите сумму"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
        />
      </div>

      <button type="submit" className="primary-button">
        Добавить новый расход
      </button>
    </form>
  );
}
