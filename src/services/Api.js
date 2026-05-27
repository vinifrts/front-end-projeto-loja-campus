const BASE_URL =
  import.meta.env.VITE_API_URL;

export async function apiFetch(
  endpoint,
  options = {}
) {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },

      ...options,
    }
  );

  const data = await response.json();

  if (!response.ok) {

    const error = new Error(
      data.message || "Erro na API"
    );

    error.data = data;

    error.status = response.status;

    throw error;
  }

  return data;
}