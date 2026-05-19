const BADGE_COLORS = {
  "Mais Vendido": "bg-amber-500",
  Novo: "bg-emerald-500",
  Top: "bg-purple-500",
  Oferta: "bg-red-500",
};

export default function Badge({ text }) {
  const color = BADGE_COLORS[text] || "bg-blue-500";
  return (
    <span className={`${color} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
      {text}
    </span>
  );
}