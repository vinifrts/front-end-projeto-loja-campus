import { PackageIcon, TrendingUpIcon } from "../Icons";

const COLOR_MAP = {
  blue:    "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  purple:  "bg-purple-50 text-purple-600",
  amber:   "bg-amber-50 text-amber-600",
};

export default function AdminStats({ products = [], orders = [] }) {
  // Calcula a receita total real iterando pela sua lista de pedidos dinâmicos da API
  const totalRevenue = orders.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);

  const statsList = [
    { label: "Produtos Cadastrados", value: products.length, Icon: PackageIcon, color: "blue" },
    { label: "Pedidos Totais",       value: orders.length,   Icon: TrendingUpIcon, color: "emerald" },
    { label: "Receita Calculada",    value: `R$ ${totalRevenue.toFixed(2).replace(".", ",")}`, Icon: TrendingUpIcon, color: "purple" },
    { label: "Avaliação Média",      value: "5.0 ★",         Icon: PackageIcon,   color: "amber" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsList.map(({ label, value, Icon, color }) => (
        <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className={`w-10 h-10 ${COLOR_MAP[color]} rounded-xl flex items-center justify-center mb-3`}>
            <Icon />
          </div>
          <p className="text-2xl font-black text-gray-800">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}