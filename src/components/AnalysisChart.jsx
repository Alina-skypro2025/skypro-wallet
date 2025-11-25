

const CATEGORY_CONFIG = {
  food: {
    label: "Еда",
    color: "linear-gradient(180deg, #c4b5fd 0%, #6366f1 100%)",
  },
  transport: {
    label: "Транспорт",
    color: "linear-gradient(180deg, #facc15 0%, #f97316 100%)",
  },
  housing: {
    label: "Жильё",
    color: "linear-gradient(180deg, #6ee7b7 0%, #22c55e 100%)",
  },
  joy: {
    label: "Развлечения",
    color: "linear-gradient(180deg, #a5b4fc 0%, #6366f1 100%)",
  },
  education: {
    label: "Образование",
    color: "linear-gradient(180deg, #bef264 0%, #a3e635 100%)",
  },
  others: {
    label: "Другое",
    color: "linear-gradient(180deg, #fecaca 0%, #fb7185 100%)",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function formatPeriod(start, end) {
  if (!start || !end) return "Выберите период слева";

  const opts = { day: "numeric", month: "long", year: "numeric" };
  const s = start.toLocaleDateString("ru-RU", opts);
  const e = end.toLocaleDateString("ru-RU", opts);

  if (s === e) {
    return `Расходы за ${s}`;
  }

  return `Расходы за ${s} — ${e}`;
}

export default function AnalysisChart({ transactions, startDate, endDate }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="analysis-chart-card card">
        <div className="analysis-chart-header">
          <div>
            <div className="analysis-chart-total-label">Всего за период</div>
            <div className="analysis-chart-total-value">0 ₽</div>
          </div>
          <div className="analysis-chart-period-text">
            Выберите период слева
          </div>
        </div>
        <div className="card-placeholder">
          Пока нет данных для выбранного периода.
        </div>
      </div>
    );
  }

  const sumsByCategory = Object.keys(CATEGORY_CONFIG).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  for (const t of transactions) {
    if (sumsByCategory[t.category] !== undefined) {
      sumsByCategory[t.category] += Number(t.sum) || 0;
    }
  }

  const values = Object.values(sumsByCategory);
  const total = values.reduce((a, b) => a + b, 0);

  const max = Math.max(...values, 1);
  const maxHeight = 220; 

  return (
    <div className="analysis-chart-card card">
      <div className="analysis-chart-header">
        <div>
          <div className="analysis-chart-total-label">Всего за период</div>
          <div className="analysis-chart-total-value">
            {formatCurrency(total)}
          </div>
        </div>
        <div className="analysis-chart-period-text">
          {formatPeriod(startDate, endDate)}
        </div>
      </div>

      <div className="analysis-chart-bars">
        {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
          const sum = sumsByCategory[key];
          const height = (sum / max) * maxHeight;

          return (
            <div key={key} className="analysis-bar">
              <div
                className="analysis-bar-column"
                style={{ height: `${height}px`, background: cfg.color }}
              >
                <div className="analysis-bar-value">
                  {sum > 0 ? formatCurrency(sum) : "0 ₽"}
                </div>
              </div>
              <div className="analysis-bar-label">{cfg.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
