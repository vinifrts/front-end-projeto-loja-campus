import { useState } from "react";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import AppRoutes   from "./routes/AppRoutes";

export default function App() {
  const [page,            setPage]            = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes
          page={page}
          setPage={setPage}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </CartProvider>
    </AuthProvider>
  );
}