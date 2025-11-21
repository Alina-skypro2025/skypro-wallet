
export function initAnalysis() {

  let currentDate = new Date();
  let selectedDates = [];

  const monthEl = document.getElementById("cal-month");
  const daysEl = document.getElementById("calendar-days");

  const totalEl = document.getElementById("chart-total-value");
  const periodEl = document.getElementById("chart-period-text");
  const barsEl = document.getElementById("chart-bars");

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const monthNames = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
  ];

  
  function renderCalendar() {
    daysEl.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthEl.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay + 6) % 7;

    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement("div");
      daysEl.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("calendar-day");
      dayDiv.textContent = d;

      const fullDate = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

      if (selectedDates.includes(fullDate)) dayDiv.classList.add("active");

      dayDiv.onclick = () => toggleDate(fullDate);

      daysEl.appendChild(dayDiv);
    }
  }

  
  function toggleDate(dateStr) {
    if (selectedDates.length === 0) {
      selectedDates = [dateStr];
    } else if (selectedDates.length === 1) {
      let first = new Date(selectedDates[0]);
      let second = new Date(dateStr);

      if (first > second) [dateStr, selectedDates[0]] = [selectedDates[0], dateStr];

      selectedDates = buildRange(selectedDates[0], dateStr);
    } else {
      selectedDates = [dateStr];
    }

    renderCalendar();
    renderChart();
  }

  function buildRange(startStr, endStr) {
    let range = [];
    let start = new Date(startStr);
    let end = new Date(endStr);

    while (start <= end) {
      range.push(
        `${start.getFullYear()}-${String(start.getMonth()+1).padStart(2,"0")}-${String(start.getDate()).padStart(2,"0")}`
      );
      start.setDate(start.getDate() + 1);
    }

    return range;
  }

 
  function renderChart() {
    if (selectedDates.length === 0) {
      barsEl.innerHTML = "";
      totalEl.textContent = "0 ₽";
      periodEl.textContent = "Выберите период";
      return;
    }

    const start = selectedDates[0];
    const end = selectedDates[selectedDates.length - 1];

    const filtered = expenses.filter(e => selectedDates.includes(e.date));

    const categories = {
      "Еда": 0,
      "Транспорт": 0,
      "Жильё": 0,
      "Развлечения": 0,
      "Образование": 0,
      "Другое": 0
    };

    filtered.forEach(e => {
      if (categories[e.category] !== undefined) {
        categories[e.category] += Number(e.amount);
      }
    });

    const total = filtered.reduce((s, e) => s + Number(e.amount), 0);
    totalEl.textContent = total.toLocaleString("ru-RU") + " ₽";

    periodEl.textContent = `Расходы за период ${formatDate(start)} — ${formatDate(end)}`;

    const maxValue = Math.max(...Object.values(categories), 1);

    barsEl.innerHTML = "";

    for (const [cat, value] of Object.entries(categories)) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("chart-bar-wrapper");

      const bar = document.createElement("div");
      bar.classList.add("chart-bar");
      bar.style.height = (value / maxValue) * 220 + "px";
      bar.style.background = getColor(cat);

      const val = document.createElement("div");
      val.classList.add("chart-bar-value");
      val.textContent = value.toLocaleString("ru-RU") + " ₽";

      const label = document.createElement("div");
      label.classList.add("chart-bar-label");
      label.textContent = cat;

      wrapper.appendChild(val);
      wrapper.appendChild(bar);
      wrapper.appendChild(label);

      barsEl.appendChild(wrapper);
    }
  }

  function formatDate(str) {
    const d = new Date(str);
    return d.toLocaleDateString("ru-RU");
  }

  function getColor(cat) {
    const colors = {
      "Еда": "#B39DFF",
      "Транспорт": "#FFCF70",
      "Жильё": "#6EA8FF",
      "Развлечения": "#C59BFF",
      "Образование": "#A7F29A",
      "Другое": "#FFB3B3"
    };
    return colors[cat];
  }

  // КНОПКИ МЕСЯЦЕВ
  document.getElementById("cal-prev").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  };

  document.getElementById("cal-next").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  };

  renderCalendar();
  renderChart();
}
