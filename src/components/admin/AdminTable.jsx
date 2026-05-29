import { EditIcon } from "../Icons";
import { formatPrice } from "../../utils/formatPrice";

// Buscamos a URL base da API e removemos o sufixo '/api' para apontar para a raiz do Laravel
// Assim, se a API for 'http://localhost:8000/api', a URL do storage será 'http://localhost:8000/storage/'
const STORAGE_URL = (import.meta.env.VITE_API_URL || "").replace("/api", "") + "/storage/";

// ==========================================
// 1. TABELA DE PRODUTOS
// ==========================================
export function ProductsTable({ products = [] }) {
  // Garante que 'products' seja sempre tratado como um array válido
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Produto", "Categoria", "Preço", "Estoque", "Ação"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {safeProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-sm text-gray-400">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              safeProducts.map((p, index) => {
                // Tratamento da imagem: Se vier do upload do Laravel, anexa a URL do Storage.
                // Se já for uma URL completa (http), mantém ela. Se não houver, usa o placeholder.
                let imageSrc = "https://placehold.co/100";
                if (p.image) {
                  imageSrc = p.image.startsWith("http") ? p.image : `${STORAGE_URL}${p.image}`;
                }

                // Resolução do aviso de chave única do React (Usa o ID do banco ou o índice como fallback)
                const rowKey = p.id || `prod-${index}`;

                return (
                  <tr key={rowKey} className="hover:bg-gray-50 transition-colors">
                    {/* Coluna: Nome e Imagem */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageSrc}
                          alt={p.name || "Produto"}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          onError={(e) => {
                            // Fallback caso a imagem dê erro de carregamento físico no servidor
                            e.target.src = "https://placehold.co/100";
                          }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {p.name || "Sem Nome"}
                        </span>
                      </div>
                    </td>

                    {/* Coluna: Categoria */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-400 block">
                        Cat: {typeof p.category === 'string' 
                          ? p.category 
                          : (p.category?.name || p.category_id || "Sem categoria")}
                      </span>
                    </td>

                    {/* Coluna: Preço */}
                    <td className="px-4 py-3 text-sm font-bold text-gray-700">
                      {formatPrice(p.price)}
                    </td>

                    {/* Coluna: Estoque */}
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {p.stock !== undefined ? `${p.stock} un` : "Disponível"}
                    </td>

                    {/* Coluna: Ação */}
                    <td className="px-4 py-3">
                      <button type="button" className="text-blue-600 hover:text-blue-800 p-1">
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 2. TABELA DE PEDIDOS
// ==========================================
const STATUS_STYLE = {
  entregue: "bg-emerald-50 text-emerald-600",
  pendente: "bg-amber-50 text-amber-600",
  preparo: "bg-blue-50 text-blue-600",
};

export function OrdersTable({ orders = [] }) {
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Pedido ID", "Cliente", "Entrega", "Valor Total", "Status"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {safeOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-sm text-gray-400">
                  Nenhum pedido realizado ainda.
                </td>
              </tr>
            ) : (
              safeOrders.map((o, index) => {
                const orderKey = o.id || `order-${index}`;

                return (
                  <tr key={orderKey} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-blue-900">
                      #UNF-{o.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {o.user?.name || `Usuário #${o.user_id}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                      {o.type_delivery || "Retirada"}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-700">
                      {formatPrice(o.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLE[o.status] || "bg-gray-100 text-gray-600"}`}>
                        {o.status || "Pendente"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}