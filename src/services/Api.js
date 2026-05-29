const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {};

  headers["Accept"] = "application/json";

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const finalHeaders = {
    ...headers,
    ...options.headers,
  };

  const config = {
    ...options,         
    headers: finalHeaders 
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 204) return null;

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Erro na API");
    error.data = data;
    error.status = response.status;
    throw error;
  }

  return data;
}