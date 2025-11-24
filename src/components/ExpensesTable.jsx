
import { deleteTransaction } from "../api/api";

const CATEGORY_LABELS = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жильё",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое",
};

export default function ExpensesTable({ transactions, onRefresh }) {
  async function handleDelete(id) {
    if (!window.confirm("Удалить этот расход?")) return;

    try {
      await deleteTransaction(id);
      onRefresh();
    } catch (err) {
      alert(err.message || "Не удалось удалить расход");
    }
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="card-placeholder" style={{ marginTop: 12 }}>
        Пока нет ни одного расхода. Добавьте первый справа в форме «Новый
        расход».
      </div>
    );
  }

  return (
    <div className="expenses-table-wrapper">
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Описание</th>
            <th>Категория</th>
            <th>Дата</th>
            <th className="expenses-table-sum-header">Сумма</th>
            <th className="expenses-table-actions"></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.description}</td>
              <td>{CATEGORY_LABELS[t.category] || t.category}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td className="expenses-table-sum-cell">{t.sum} ₽</td>
              <td className="expenses-table-actions">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => handleDelete(t._id)}
                  aria-label="Удалить расход"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
