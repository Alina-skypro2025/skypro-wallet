
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <span className="app-logo-icon">💰</span>
          <span className="app-logo-text">Skypro.Wallet</span>
        </div>

        <nav className="app-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "app-nav-link" + (isActive ? " app-nav-link--active" : "")
            }
          >
            Мои расходы
          </NavLink>

          <NavLink
            to="/analysis"
            className={({ isActive }) =>
              "app-nav-link" + (isActive ? " app-nav-link--active" : "")
            }
          >
            Анализ расходов
          </NavLink>
        </nav>

        <button className="app-logout-button" onClick={handleLogout}>
          Выйти
        </button>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
