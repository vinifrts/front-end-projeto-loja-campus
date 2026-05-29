import { createContext, useState, useEffect, useCallback } from "react";
import { apiFetch } from "../services/api"; // Usando o seu padrão apiFetch

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  // Busca o carrinho do Laravel
  const fetchCart = useCallback(async () => {
    setLoadingCart(true);
    try {
      const response = await apiFetch("/cart", { method: "GET" });
      if (response.success) {
        setItems(response.data.items);
        setTotal(Number(response.data.subtotal));
      }
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
    } finally {
      setLoadingCart(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const add = async (product, size, qty = 1) => {
    try {
      // Rota real do seu back-end: POST /cart/items
      await apiFetch("/cart/items", {
        method: "POST",
        body: JSON.stringify({
          product_id: product.id,
          quantity: qty,
          size: size
        })
      });
      await fetchCart();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  const remove = async (key) => {
    const targetItem = items.find((i) => i.key === key);
    if (!targetItem) return;

    try {
      // Rota real do seu back-end: DELETE /cart/items/{item}
      await apiFetch(`/cart/items/${targetItem.id}`, { method: "DELETE" });
      await fetchCart();
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  const update = async (key, qty) => {
    const targetItem = items.find((i) => i.key === key);
    if (!targetItem) return;

    if (qty < 1) {
      await remove(key);
      return;
    }

    try {
      // Rota real do seu back-end: PUT /cart/items/{item}
      await apiFetch(`/cart/items/${targetItem.id}`, {
        method: "PUT",
        body: JSON.stringify({ amount: qty })
      });
      await fetchCart();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  const clear = async () => {
    try {
      // Rota real do seu back-end: DELETE /cart/clear
      await apiFetch("/cart/clear", { method: "DELETE" });
      setItems([]);
      setTotal(0);
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
    }
  };

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count, loadingCart, refreshCart: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}