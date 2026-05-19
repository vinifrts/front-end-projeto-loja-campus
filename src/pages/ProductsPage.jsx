import { useState } from "react";
import useCart from "../hooks/useCart";
import ProductCard from "../components/product/ProductCard";
import { SearchIcon } from "../components/Icons";
import { getAllProducts } from "../services/productService";
import { filterProducts, sortProducts } from "../utils/helpers";
import PRODUCTS from "../data/Products";
import CATEGORIES from "../data/Categories";


export default function ProductsPage({ setPage, setSelectedProduct }) {
  const { add } = useCart();
  const [cat, setCat]     = useState("Todos");
  const [search, setSearch] = useState("");
  const [sort, setSort]   = useState("default");

  const all      = getAllProducts();
  const filtered = sortProducts(filterProducts(all, cat, search), sort);

  const handleView = (product) => {
    setSelectedProduct(product);
    setPage("produto");
  };

  const handleAdd = (product) => add(product, product.sizes[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-1">Produtos</h1>
        <p className="text-gray-400">{filtered.length} produtos encontrados</p>
      </div>

      {/* Busca + ordenação */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produto..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="default">Ordenar por</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
          <option value="rating">Melhor Avaliação</option>
        </select>
      </div>

      {/* Filtro de categorias */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              cat === c
                ? "bg-blue-900 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid de produtos */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium">Nenhum produto encontrado</p>
          <button
            onClick={() => { setSearch(""); setCat("Todos"); }}
            className="mt-4 text-blue-600 font-medium hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onView={handleView} onAdd={handleAdd} />
          ))}
        </div>
      )}
    </div>
  );
}