import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminStats from "../components/admin/AdminStats";
import { ProductsTable, OrdersTable } from "../components/admin/AdminTable";
import AddProductModal from "../components/admin/AddProductModal";
import { PlusIcon } from "../components/Icons";
import PRODUCTS from "../data/Products";
import CATEGORIES from "../data/Categories";

const TABS = [
  ["dashboard", "Dashboard"],
  ["produtos",  "Produtos"],
  ["pedidos",   "Pedidos"],
];

const CATEGORY_BARS = [
  ["Camisas",   65],
  ["Moletons",  48],
  ["Mochilas",  31],
  ["Garrafas",  28],
  ["Bonés",     19],
  ["Papelaria", 16],
];

export default function AdminPage({ setPage }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);


  /* Acesso negado */
  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Acesso Restrito</h2>
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

      {/* Header */}
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

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {TABS.map(([t, label]) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-3 text-sm font-semibold transition-colors ${
              activeTab === t
                ? "border-b-2 border-blue-700 text-blue-700"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div>
          <AdminStats />
          <div className="grid md:grid-cols-2 gap-6">

            {/* Mais Vendidos */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-gray-800 mb-4">Mais Vendidos</h3>
              <div className="space-y-3">
                {PRODUCTS.filter((p) => p.badge).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-lg font-black text-gray-300 w-5">#{i + 1}</span>
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.reviews} avaliações</p>
                    </div>
                    <span className="text-sm font-bold text-blue-900">
                      R$ {p.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendas por Categoria */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-gray-800 mb-4">Vendas por Categoria</h3>
              <div className="space-y-3">
                {CATEGORY_BARS.map(([cat, pct]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 font-medium">{cat}</span>
                      <span className="text-gray-400">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-700 h-2 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      
      {activeTab === "produtos" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{PRODUCTS.length} produtos cadastrados</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <PlusIcon /> Novo Produto
            </button>
          </div>
          <ProductsTable products={PRODUCTS} />
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* ── Pedidos */}
      {activeTab === "pedidos" && <OrdersTable />}
    </div>
  );
}