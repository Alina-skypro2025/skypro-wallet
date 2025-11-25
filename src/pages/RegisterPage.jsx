
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !loginValue.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        name: name.trim(),
        login: loginValue.trim(),
        password: password.trim(),
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (e) {
      setError(e.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      

      <div className="auth-card">
        <h1 className="auth-title">Регистрация</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Ева Иванова"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="auth-input"
            type="text"
            placeholder="Логин"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
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
            {loading ? "Создаём..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="auth-bottom-text">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="auth-link">
            Войдите здесь
          </Link>
        </p>
      </div>
    </div>
  );
}
