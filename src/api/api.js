
const BASE_URL = "https://wedev-api.sky.pro/api";


async function parseJson(response) {
  const text = await response.text();

  try {
    const data = text ? JSON.parse(text) : null;
    return data;
  } catch {
    throw new Error("Ошибка: сервер вернул невалидный JSON");
  }
}



export async function loginUser({ login, password }) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    
    body: JSON.stringify({ login, password }),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.error || "Ошибка авторизации");
  }

  
  return data.user;
}

export async function registerUser({ name, login, password }) {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    body: JSON.stringify({ name, login, password }),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.error || "Ошибка регистрации");
  }

  return data.user;
}



function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}




export async function getTransactions(params = {}) {
  const headers = getAuthHeaders();

  let url = `${BASE_URL}/transactions`;
  const search = new URLSearchParams();

  if (params.sortBy) search.append("sortBy", params.sortBy);
  if (params.filterBy) search.append("filterBy", params.filterBy);

  if ([...search].length) {
    url += `?${search.toString()}`;
  }

  const response = await fetch(url, { headers });
  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.error || "Не удалось загрузить расходы");
  }

 
  return data;
}


export async function createTransaction(transaction) {
  const headers = getAuthHeaders();

  const response = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers,
    body: JSON.stringify(transaction),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.error || "Не удалось добавить расход");
  }

  return data;
}


export async function deleteTransaction(id) {
  const headers = getAuthHeaders();

  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
    headers,
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.error || "Не удалось удалить расход");
  }

  return data;
}


export async function updateTransaction(id, payload) {
  const headers = getAuthHeaders();

  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.error || "Не удалось обновить расход");
  }

  return data;
}


export async function getTransactionsByPeriod({ start, end }) {
  const headers = getAuthHeaders();

  const response = await fetch(`${BASE_URL}/transactions/period`, {
    method: "POST",
    headers,
    body: JSON.stringify({ start, end }),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(
      data?.error || "Не удалось загрузить расходы за выбранный период"
    );
  }

 
  return data;
}
