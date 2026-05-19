/**
 * Serviço de autenticação mock, substituir por chamadas reais à API quando implementar o backend.
 */

export const ADMIN_CREDENTIALS = {
  email: "admin@unifor.br",
  password: "admin123",
};

/**
 * simulacao de validação de credenciais.
 * @param {string} email
 * @param {string} password
 * @returns {"admin"|"user"|null}
 */
export function validateCredentials(email, password) {
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    return "admin";
  }
  if (email && password.length >= 4) return "user";
  return null;
}