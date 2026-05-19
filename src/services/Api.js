/**
 * camada base de API, por enquanto é um mock quando a gente implementar backend vamo botar as implementações aqui.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}