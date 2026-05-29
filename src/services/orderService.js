import { apiFetch } from "./api";

/**
 * Envia os dados de entrega e pagamento para finalizar o pedido no Laravel
 * @param {Object} checkoutData - Deve conter { type_delivery, type_payment }
 */
export async function createCheckout(checkoutData) {
  return await apiFetch("/orders/checkout", {
    method: "POST",
    body: JSON.stringify(checkoutData),
  });
}