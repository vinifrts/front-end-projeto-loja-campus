import { createContext, useState } from "react";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = (product, size, qty = 1) => {
    setItems((prev) => {
      const key = `${product.id}-${size}`;
      const exists = prev.find((i) => i.key === key);
      return exists
        ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { ...product, size, qty, key }];
    });
  };

  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));

  const update = (key, qty) =>
    setItems((prev) =>
      qty < 1
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}