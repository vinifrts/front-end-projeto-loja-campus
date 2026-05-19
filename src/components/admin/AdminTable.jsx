import { EditIcon } from "../Icons";
import { formatPrice } from "../../utils/formatPrice";

// Tabela de Produtos 
export function ProductsTable({ products }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Produto", "Categoria", "Preço", "Avaliação", "Ação"].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                    />
                    <span className="text-sm font-medium text-gray-700">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-700">
                  {formatPrice(p.price)}
                </td>
                <td className="px-4 py-3 text-sm text-amber-500 font-medium">
                  ★ {p.rating}
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors p-1">
                    <EditIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// tabela de pedidos fake 
const STATUS_STYLE = {
  Entregue:            "bg-emerald-50 text-emerald-600",
  "Aguardando Retirada": "bg-amber-50 text-amber-600",
  "Em Preparo":        "bg-blue-50 text-blue-600",
};

const MOCK_ORDERS = [
  ["#UNF-10231", "Ana Paula Lima",  "Moletom Unifor Classic", "R$ 149,90", "Entregue"],
  ["#UNF-10230", "Carlos Mendes",   "Camisa Medicina",        "R$ 74,90",  "Aguardando Retirada"],
  ["#UNF-10229", "Julia Ferreira",  "Mochila Unifor Pro",     "R$ 199,90", "Em Preparo"],
  ["#UNF-10228", "Pedro Alves",     "Kit Papelaria",          "R$ 39,90",  "Entregue"],
  ["#UNF-10227", "Mariana Costa",   "Garrafa Térmica",        "R$ 89,90",  "Aguardando Retirada"],
];

export function OrdersTable() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Pedido", "Aluno", "Produto", "Valor", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_ORDERS.map(([id, aluno, prod, val, status]) => (
              <tr key={id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-bold text-blue-900">{id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{aluno}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{prod}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-700">{val}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLE[status]}`}>
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}