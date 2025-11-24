
import { useEffect, useState } from "react";
import { getTransactions } from "../api/api";
import ExpensesTable from "../components/ExpensesTable";
import NewExpenseForm from "../components/NewExpenseForm";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.message || "Не удалось загрузить расходы");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Мои расходы</h1>

      <div className="expenses-grid">
        {/* Левая карточка — таблица */}
        <section className="card card--wide">
          <h2 className="card-title">Таблица расходов</h2>

          {error && <div className="card-error">{error}</div>}

          {loading ? (
            <p className="card-placeholder">Загружаем ваши расходы…</p>
          ) : (
            <ExpensesTable transactions={transactions} onRefresh={loadData} />
          )}
        </section>

        {/* Правая карточка — форма */}
        <section className="card card--form">
          <NewExpenseForm onAdded={loadData} />
        </section>
      </div>
    </div>
  );
}
