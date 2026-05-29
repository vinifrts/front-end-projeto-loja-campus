import { EditIcon } from "../Icons";
import { formatPrice } from "../../utils/formatPrice";
const STORAGE_URL = (import.meta.env.VITE_API_URL || "").replace("/api", "") + "/storage/";
export function ProductsTable({ products = [] }) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Produto", "Categoria", "Preço", "Estoque"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {safeProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-sm text-gray-400">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              safeProducts.map((p, index) => {
                let imageSrc = "https://placehold.co/100";
                if (p.image) {
                  imageSrc = p.image.startsWith("http") ? p.image : `${STORAGE_URL}${p.image}`;
                }

                const rowKey = p.id || `prod-${index}`;

                return (
                  <tr key={rowKey} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageSrc}
                          alt={p.name || "Produto"}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/100";
                          }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {p.name || "Sem Nome"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-400 block">
                        Cat: {typeof p.category === 'string' 
                          ? p.category 
                          : (p.category?.name || p.category_id || "Sem categoria")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-700">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {p.stock !== undefined ? `${p.stock} un` : "Disponível"}
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