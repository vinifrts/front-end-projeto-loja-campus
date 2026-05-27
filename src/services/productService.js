import { apiFetch } from "./api";

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  const response = await apiFetch(
    `/products${query ? `?${query}` : ""}`
  );

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

export function getRelatedProducts(
  currentProduct,
  allProducts = [],
  limit = 4
) {
  if (!currentProduct) {
    return [];
  }

  return allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category === currentProduct.category
    )
    .slice(0, limit);
}