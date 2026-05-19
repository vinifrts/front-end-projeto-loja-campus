/**
 * formata um número para o padrão monetário brasileiro.
 * @param {number} value
 * @returns {string} Ex: "R$ 149,90"
 */
export function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/**
 * formata preço parcelado sem juros.
 * @param {number} value
 * @param {number} installments
 * @returns {string} Ex: "3x de R$ 49,97 sem juros"
 */
export function formatInstallment(value, installments = 3) {
  const part = value / installments;
  return `${installments}x de ${formatPrice(part)} sem juros`;
}