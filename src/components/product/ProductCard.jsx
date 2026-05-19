import { useState } from "react";
import { HeartIcon } from "../Icons";
import Badge from "./Badge";
import Stars from "./Stars";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product, onView, onAdd }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagem */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge text={product.badge} />
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-900 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg"
        >
          + Adicionar
        </button>
        <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
          <HeartIcon />
        </button>
      </div>

      {/* Info */}
      <div className="p-4" onClick={() => onView(product)}>
        <p className="text-xs text-blue-600 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-900">{formatPrice(product.price)}</span>
          <div className="flex gap-1">
            {product.sizes.slice(0, 3).map((s) => (
              <span key={s} className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-500">
                {s}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-gray-400">+{product.sizes.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}