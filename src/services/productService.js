import PRODUCTS from "../data/Products";

/**
 * retorna todos os produtos.
 * @returns {Array}
 */
export function getAllProducts() {
  return PRODUCTS;
}

/**
 * Busca produto pelo ID.
 * @param {number} id
 * @returns {object|undefined}
 */
export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

/**
 * Retorna produtos de destaque (que possuem badge).
 * @param {number} limit
 * @returns {Array}
 */
export function getFeaturedProducts(limit = 4) {
  return PRODUCTS.filter((p) => p.badge).slice(0, limit);
}

/**
 * Retorna produtos relacionados (mesma categoria, excluindo o atual).
 * @param {object} product
 * @param {number} limit
 * @returns {Array}
 */
export function getRelatedProducts(product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}