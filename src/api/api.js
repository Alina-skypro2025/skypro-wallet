
export async function apiRequest(endpoint, options = {}) {
  const BASE_URL = "https://wedev-api.sky.pro/api";

  const token = localStorage.getItem("token");

  const fetchOptions = {
    method: options.method || "GET",
    body: options.body || null,
    headers: {}
  };

 
  if (token) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(BASE_URL + endpoint, fetchOptions);

  const text = await response.text();

  let data = null;
  try {
    data = JSON.parse(text);
  } catch {}

  if (!response.ok) {
    throw new Error(data?.error || data?.message || text || "Ошибка API");
  }

  return data ?? text;
}
