const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  // 1. Criamos um objeto de headers limpo
  const headers = {};

  // 2. Sempre aceitamos JSON como resposta do Laravel
  headers["Accept"] = "application/json";

  // 3. Adiciona o Token de Autenticação se ele existir
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 4. Se o body NÃO for FormData, nós injetamos o Content-Type JSON
  // Se FOR FormData, NÃO mexemos no Content-Type (o fetch faz isso sozinho)
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // 5. Mesclamos com headers adicionais que venham por parâmetro, se houver
  const finalHeaders = {
    ...headers,
    ...options.headers,
  };

  // 6. Montamos a configuração final de forma explícita
  const config = {
    ...options,          // Traz o method, body, etc.
    headers: finalHeaders // Substitui os headers pelo nosso objeto tratado
  };

  // Executa a requisição
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