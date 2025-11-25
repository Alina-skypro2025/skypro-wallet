
import { useState } from "react";
import { loginUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser({ login, password });

      if (result.error) {
        setError(result.error);
        return;
      }

      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Произошла ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      

      <div className="auth-card">
        <h1 className="auth-title">Вход</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>

        <p className="auth-bottom-text">
          Нужно зарегистрироваться?{" "}
          <Link to="/register" className="auth-link">
            Зарегистрируйтесь здесь
          </Link>
        </p>
      </div>
    </div>
  );
}
