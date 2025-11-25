

const CATEGORY_CONFIG = {
  food: {
    label: "Еда",
    color: "#D9B6FF",
  },
  transport: {
    label: "Транспорт",
    color: "#FFB53D",
  },
  housing: {
    label: "Жильё",
    color: "#6EE4FE",
  },
  joy: {
    label: "Развлечения",
    color: "#B0AEFF",
  },
  education: {
    label: "Образование",
    color: "#BCEC30",
  },
  others: {
    label: "Другое",
    color: "#FFB9B8",
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
                style={{
    height: `${height}px`,
    background: cfg.color,
    width: "48px",       
    borderRadius: "12px" 
  }}
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
