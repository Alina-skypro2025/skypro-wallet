

export function initPeriod() {
  console.log("Period (week analysis) loaded");

  
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

  
  let date = new Date();
  date.setDate(1); 

  const monthNames = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
  ];

  const m1Title = document.getElementById("m1-title");
  const m2Title = document.getElementById("m2-title");
  const m1Days  = document.getElementById("m1-days");
  const m2Days  = document.getElementById("m2-days");

  const periodTitle = document.getElementById("period-title");
  const chartCanvas = document.getElementById("period-chart");

  let chart = null; 

  

  function clearActive() {
    document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
  }

  function markActive(el) {
    clearActive();
    el.classList.add("active");
  }

  
  function formatDate(dateObj) {
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yy = dateObj.getFullYear();
    return `${dd}.${mm}.${yy}`;
  }

 

  function fillMonth(container, titleEl, year, month) {
    container.innerHTML = "";
    titleEl.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    
    const startOffset = (firstDay + 6) % 7;

    
    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement("div");
      container.appendChild(empty);
    }

   
    for (let d = 1; d <= daysInMonth; d++) {
      const day = document.createElement("div");
      day.className = "day";
      day.textContent = d;

      day.onclick = () => {
        
        const clicked = new Date(year, month, d);

        
        const start = new Date(clicked);
        const end   = new Date(clicked);
        end.setDate(end.getDate() + 6);

        markActive(day);
        updateChartForPeriod(start, end);
      };

      container.appendChild(day);
    }
  }

 

  function renderCalendars() {
    const y = date.getFullYear();
    const m = date.getMonth();

    fillMonth(m1Days, m1Title, y, m);
    fillMonth(m2Days, m2Title, y, m + 1);
  }

  

  function updateChartForPeriod(startDate, endDate) {
    
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end   = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    
    periodTitle.textContent = `Расходы за период ${formatDate(start)} — ${formatDate(end)}`;

    const categories = ["Еда", "Транспорт", "Жильё", "Развлечения", "Образование", "Другое"];
    const sums = [0, 0, 0, 0, 0, 0];

    expenses.forEach((exp) => {
      if (!exp.date) return;

      const d = new Date(exp.date);
      
      const dayOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());

      if (dayOnly >= start && dayOnly <= end) {
        const idx = categories.indexOf(exp.category);
        if (idx !== -1) {
          sums[idx] += Number(exp.amount) || 0;
        }
      }
    });

    
    if (!chartCanvas) return;
    const ctx = chartCanvas.getContext("2d");

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Сумма расходов, ₽",
            data: sums,
            
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  

  renderCalendars();
 
  periodTitle.textContent = "Выберите любую дату в календаре (будет показана неделя расходов)";
}
