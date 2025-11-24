
import { useEffect, useState } from "react";
import { getTransactionsByPeriod } from "../api/api";
import PeriodCalendar from "../components/PeriodCalendar";
import AnalysisChart from "../components/AnalysisChart";

function toApiDateString(date) {
  
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

export default function AnalysisPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadPeriod() {
    if (!startDate || !endDate) return;

    setLoading(true);
    setError("");

    try {
      const data = await getTransactionsByPeriod({
        start: toApiDateString(startDate),
        end: toApiDateString(endDate),
      });

      setTransactions(data || []);
    } catch (err) {
      setError(err.message || "Не удалось загрузить данные за период");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  
  useEffect(() => {
    if (startDate && endDate) {
      loadPeriod();
    }
   
  }, [startDate, endDate]);

  function handleChangePeriod(start, end) {
    setStartDate(start);
    setEndDate(end);
  }

  return (
    <div className="page">
      <h1 className="page-title">Анализ расходов</h1>

      <div className="analysis-grid">
        <section className="card analysis-period-card">
          <PeriodCalendar
            startDate={startDate}
            endDate={endDate}
            onChangePeriod={handleChangePeriod}
          />

          {loading && (
            <div className="card-placeholder" style={{ marginTop: 12 }}>
              Загружаем расходы за выбранный период…
            </div>
          )}
          {error && <div className="card-error">{error}</div>}
        </section>

        <section>
          <AnalysisChart
            transactions={transactions}
            startDate={startDate}
            endDate={endDate}
          />
        </section>
      </div>
    </div>
  );
}
