import { useState, useEffect, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import AdminStats from "../components/admin/AdminStats";
import { ProductsTable, OrdersTable } from "../components/admin/AdminTable";
import AddProductModal from "../components/admin/AddProductModal";
import { apiFetch } from "../services/api";

const TABS = [
  ["dashboard", "Dashboard"],
  ["produtos", "Produtos"],
  ["pedidos", "Pedidos"],
];

export default function AdminPage({ setPage }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const fetchProducts = useCallback(async () => {
    try {
      const response = await apiFetch("/products", { method: "GET" });

      let productList = [];
      if (Array.isArray(response)) {
        productList = response;
      } else if (response && Array.isArray(response.data)) {
        productList = response.data;
      } else if (response && response.data && Array.isArray(response.data.data)) {
        productList = response.data.data;
      } else if (response && response.products) {
        productList = response.products;
      }

      setProducts(productList);
    } catch (error) {
      console.error("Erro ao carregar produtos na administração:", error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await apiFetch("/orders", { method: "GET" });

      let orderList = [];
      if (Array.isArray(response)) {
        orderList = response;
      } else if (response && Array.isArray(response.data)) {
        orderList = response.data;
      } else if (response && response.data && Array.isArray(response.data.data)) {
        orderList = response.data.data;
      }

      setOrders(orderList);
    } catch (error) {
      console.error("Erro ao carregar pedidos na administração:", error);
    }
  }, []);

  useEffect(() => {
    if (!user || user.access_level !== "docente") return;

    if (activeTab === "produtos" || activeTab === "dashboard") {
      fetchProducts();
    }
    if (activeTab === "pedidos" || activeTab === "dashboard") {
      fetchOrders();
    }
  }, [activeTab, user, fetchProducts, fetchOrders]);

  const handleProductAdded = async (newProduct) => {
    await fetchProducts();
    setIsModalOpen(false);
  };

  if (!user || user.access_level !== "docente") {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Acesso Restrito</h2>
        <p className="text-gray-400 mb-6 text-sm">Este painel é exclusivo para usuários com nível de Docente.</p>
        <button
          onClick={() => setPage("login")}
          className="bg-blue-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Fazer Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-400">Bem-vindo, {user.name}</p>
        </div>
        <button
          onClick={() => setPage("home")}
          className="text-sm text-blue-700 font-medium hover:text-blue-900"
        >
          ← Ir para loja
        </button>
      </div>
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {TABS.map(([t, label]) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-3 text-sm font-semibold transition-colors ${activeTab === t
                ? "border-b-2 border-blue-700 text-blue-700"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      {activeTab === "dashboard" && (
        <div>
          <AdminStats products={products} orders={orders} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-4">Últimos Produtos</h3>
              <ProductsTable products={products.slice(0, 5)} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-4">Últimos Pedidos</h3>
              <OrdersTable orders={orders.slice(0, 5)} />
            </div>
          </div>
        </div>
      )}
      {activeTab === "produtos" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Todos os Produtos</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2"
            >
              + Adicionar Produto
            </button>
          </div>
          <ProductsTable products={products} />
        </div>
      )}
      {activeTab === "pedidos" && (
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Gerenciamento de Pedidos</h2>
          <OrdersTable orders={orders} />
        </div>
      )}
      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      )}

    </div>
  );
}