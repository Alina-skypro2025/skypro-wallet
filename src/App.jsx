
import { Routes, Route, Navigate } from 'react-router-dom';


import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AddExpensePage from './pages/AddExpensePage.jsx';
import EditExpensePage from './pages/EditExpensePage.jsx';
import PeriodPage from './pages/PeriodPage.jsx';
import AnalysisPage from './pages/AnalysisPage.jsx';


import Layout from './components/Layout.jsx';


function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>

      {/* === ПУБЛИЧНЫЕ СТРАНИЦЫ === */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* === ЗАКРЫТАЯ ЧАСТЬ ПРОЕКТА: всё внутри Layout === */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="add" element={<AddExpensePage />} />
        <Route path="edit/:id" element={<EditExpensePage />} />
        <Route path="period" element={<PeriodPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
      </Route>

      {/* Редирект на dashboard при неизвестном пути */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
