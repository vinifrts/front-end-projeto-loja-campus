import { apiFetch } from "./api";

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await apiFetch(`/products${query ? `?${query}` : ""}`);
  return response.data || [];
}

export async function getFeaturedProducts(limit = 4) {
  const response = await apiFetch("/products");
  const products = response.data || [];
  return products.slice(0, limit);
}

export async function getCategories() {
  const response = await apiFetch("/categories");
  return response.data || [];
}

/**
 * Retorna produtos relacionados baseados na categoria
 */
export function getRelatedProducts(currentProduct, allProducts = [], limit = 4) {
  if (!currentProduct) {
    return [];
  }

  // Defesa extra: Garante que se passarem os argumentos invertidos ou um objeto envelopado da API,
  // o código se auto-corrige e não quebra a tela do usuário.
  let productsArray = Array.isArray(allProducts) ? allProducts : [];
  let targetProduct = currentProduct;

  // Se por acaso inverterem e o primeiro parâmetro for o Array e o segundo o Objeto:
  if (Array.isArray(currentProduct) && typeof allProducts === "object" && !Array.isArray(allProducts)) {
    productsArray = currentProduct;
    targetProduct = allProducts;
  } else if (!Array.isArray(allProducts) && allProducts?.data) {
    // Se passarem a resposta bruta da API do Laravel sem o .data
    productsArray = allProducts.data;
  }

  return productsArray
    .filter(
      (p) =>
        p.id !== targetProduct.id &&
        (p.category_id === targetProduct.category_id || p.category === targetProduct.category)
    )
    .slice(0, limit);
}