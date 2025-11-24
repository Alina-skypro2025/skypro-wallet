import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/api';

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const login = useCallback(async (loginValue, password) => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser({
        login: loginValue,
        password,
      });

      const token = data?.user?.token || data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      navigate('/');
    } catch (e) {
      setError(e.message || 'Не удалось войти');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  
  const register = useCallback(async (name, loginValue, password) => {
    setLoading(true);
    setError('');

    try {
      await registerUser({
        name,
        login: loginValue,
        password,
      });

      
      navigate('/login');
    } catch (e) {
      setError(e.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return {
    login,
    register,
    logout,
    loading,
    error,
    setError,
  };
}
