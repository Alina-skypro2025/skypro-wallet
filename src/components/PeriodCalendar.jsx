
import { useMemo } from "react";

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isInRange(date, start, end) {
  if (!start || !end) return false;
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

function buildMonth(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const result = [];

  
  for (let day = 1; day <= daysInMonth; day++) {
    result.push(new Date(year, monthIndex, day));
  }

  return {
    monthIndex,
    year,
    name: `${MONTHS[monthIndex]} ${year}`,
    days: result,
  };
}

export default function PeriodCalendar({
  startDate,
  endDate,
  onChangePeriod,
}) {
  const today = useMemo(() => new Date(), []);
  const baseYear = today.getFullYear();
  const baseMonth = today.getMonth(); 

  const months = useMemo(() => {
  return [
    buildMonth(baseYear, 7),  // Август
    buildMonth(baseYear, 8),  // Сентябрь
    buildMonth(baseYear, 9),  // Октябрь
    buildMonth(baseYear, 10), // Ноябрь
    buildMonth(baseYear, 11), // Декабрь
    buildMonth(baseYear + 1, 0), // Январь
    buildMonth(baseYear + 1, 1), // Февраль
  ];
}, [baseYear]);

  function handleDayClick(date) {
    const day = startOfDay(date);

    if (!startDate || (startDate && endDate)) {
     
      onChangePeriod(day, null);
      return;
    }

   
    const start = startOfDay(startDate);

    if (day.getTime() < start.getTime()) {
      onChangePeriod(day, start);
    } else if (day.getTime() === start.getTime()) {
      
      onChangePeriod(day, day);
    } else {
      onChangePeriod(start, day);
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="card-title">Период</h2>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map((w) => (
          <div key={w} className="calendar-weekday">
            {w}
          </div>
        ))}
      </div>

      <div className="calendar-months">
        {months.map((m) => (
          <div key={m.name} className="calendar-month">
            <div className="calendar-month-title">{m.name}</div>
            <div className="calendar-days">
              {m.days.map((dayDate) => {
                const selected =
                  isSameDay(dayDate, startDate) || isSameDay(dayDate, endDate);
                const inRange = isInRange(dayDate, startDate, endDate);

                const classNames = [
                  "calendar-day",
                  selected && "calendar-day--selected",
                  inRange && "calendar-day--in-range",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <button
                    key={dayDate.toISOString()}
                    type="button"
                    className={classNames}
                    onClick={() => handleDayClick(dayDate)}
                  >
                    {dayDate.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
