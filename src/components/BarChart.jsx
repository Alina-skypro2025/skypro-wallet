
import React from "react";
import "../styles/styles.css";

export default function BarChart({ data, total, periodText }) {
  const categories = [
    { key: "food", label: "Еда", color: "linear-gradient(180deg, #C6A7FF 0%, #8F7BFF 100%)" },
    { key: "transport", label: "Транспорт", color: "linear-gradient(180deg, #F8C25C 0%, #E8A72D 100%)" },
    { key: "housing", label: "Жильё", color: "linear-gradient(180deg, #6EE7B7 0%, #34D399 100%)" },
    { key: "joy", label: "Развлечения", color: "linear-gradient(180deg, #A5B4FC 0%, #818CF8 100%)" },
    { key: "education", label: "Образование", color: "linear-gradient(180deg, #B8FF6A 0%, #A3E635 100%)" },
    { key: "others", label: "Другое", color: "linear-gradient(180deg, #FFB0B8 0%, #FCA5A5 100%)" },
  ];

  const maxValue = Math.max(...Object.values(data), 1);

  return (
    <div className="analysis-chart-card card">
      <div className="analysis-chart-header">
        <div>
          <div className="analysis-chart-total-value">{total} ₽</div>
          <div className="analysis-chart-period-text">{periodText}</div>
        </div>
      </div>

      <div className="analysis-chart-bars">
        {categories.map((c) => {
          const value = data[c.key] || 0;
          const height = (value / maxValue) * 180;

          return (
            <div key={c.key} className="analysis-bar">
              <div className="analysis-bar-value">{value} ₽</div>

              <div
                className="analysis-bar-column"
                style={{
                  height: `${height}px`,
                  background: c.color,
                }}
              ></div>

              <div className="analysis-bar-label">{c.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
