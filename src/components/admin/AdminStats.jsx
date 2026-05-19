import { PackageIcon, TrendingUpIcon } from "../Icons";
import PRODUCTS from "../../data/Products";

const STATS = [
  { label: "Produtos Cadastrados", value: PRODUCTS.length, Icon: PackageIcon, color: "blue" },
  { label: "Pedidos do Mês",       value: 247,             Icon: TrendingUpIcon, color: "emerald" },
  { label: "Receita Total",        value: "R$ 18.420",     Icon: TrendingUpIcon, color: "purple" },
  { label: "Avaliação Média",      value: "4.8 ★",         Icon: PackageIcon,   color: "amber" },
];

const COLOR_MAP = {
  blue:    "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  purple:  "bg-purple-50 text-purple-600",
  amber:   "bg-amber-50 text-amber-600",
};

export default function AdminStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {STATS.map(({ label, value, Icon, color }) => (
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