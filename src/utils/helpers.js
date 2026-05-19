/**
 * gera um número de pedido aleatório no padrão Unifor.
 * @returns {string} Ex: "#UNF-10452"
 */
export function generateOrderId() {
  return `#UNF-${Math.floor(Math.random() * 90000 + 10000)}`;
}

/**
 * filtra produtos por categoria e texto de busca.
 * @param {Array} products
 * @param {string} category
 * @param {string} search
 * @returns {Array}
 */
export function filterProducts(products, category, search) {
  return products.filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );
}

/**
 * ordena produtos conforme critério.
 * @param {Array} products
 * @param {"default"|"price-asc"|"price-desc"|"rating"} sort
 * @returns {Array}
 */
export function sortProducts(products, sort) {
  const arr = [...products];
  if (sort === "price-asc") return arr.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return arr.sort((a, b) => b.price - a.price);
  if (sort === "rating") return arr.sort((a, b) => b.rating - a.rating);
  return arr;
}

/**
 * calcula o valor do frete com base no subtotal.
 * @param {number} subtotal
 * @returns {number}
 */
export function calcShipping(subtotal) {
  return subtotal >= 150 ? 0 : 15.9;
}