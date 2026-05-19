import useCart from "../hooks/useCart";
import ProductCard from "../components/product/ProductCard";
import { ChevronRightIcon, TruckIcon, ShieldIcon, HeartIcon, CheckIcon } from "../components/Icons";
import { getFeaturedProducts } from "../services/productService";
import PRODUCTS from "../data/Products";
import CATEGORIES from "../data/Categories";

const FEATURES = [
  [TruckIcon,  "Entrega no Campus",   "1 a 3 dias úteis"],
  [ShieldIcon, "Produto Oficial",     "Garantia Unifor"],
  [HeartIcon,  "Feito com Amor",      "Por alunos, para alunos"],
  [CheckIcon,  "Qualidade Premium",   "Materiais selecionados"],
];

export default function HomePage({ setPage, setSelectedProduct }) {
  const { add } = useCart();
  const featured = getFeaturedProducts(4);

  const handleAdd = (product) => add(product, product.sizes[0]);

  const handleView = (product) => {
    setSelectedProduct(product);
    setPage("produto");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-700/40 border border-blue-600/40 text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Coleção 2026.2 disponível
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Vista seu
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                orgulho
              </span>
              <br />
              Unifor
            </h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">
              Produtos exclusivos com identidade universitária. Qualidade premium, entrega no campus.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setPage("produtos")}
                className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-xl"
              >
                Explorar Produtos
              </button>
              <button
                onClick={() => setPage("sobre")}
                className="border border-blue-400 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors"
              >
                Sobre a Loja
              </button>
            </div>
            <div className="flex gap-8 mt-10">
              {[["2.400+","Alunos atendidos"],["98%","Satisfação"],["1-3 dias","Entrega no campus"]].map(([n, l]) => (
                <div key={n}>
                  <div className="text-2xl font-black text-white">{n}</div>
                  <div className="text-blue-300 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini-grid de produtos */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 ${i % 2 === 1 ? "mt-8" : ""}`}
              >
                <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-xl mb-3 opacity-90" />
                <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                <p className="text-blue-300 text-xs">R$ {p.price.toFixed(2).replace(".", ",")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features  */}
      <section className="bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map(([Icon, title, sub]) => (
            <div key={title} className="flex items-center gap-3 text-white">
              <div className="bg-blue-700/50 p-2.5 rounded-xl flex-shrink-0">
                <Icon />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-blue-300">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorias  */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-gray-800 mb-2">Categorias</h2>
        <p className="text-gray-400 mb-8">Encontre o que você procura</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.filter((c) => c !== "Todos").map((cat) => (
            <button
              key={cat}
              onClick={() => setPage("produtos")}
              className="group flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all"
            >
              
              <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700 transition-colors">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Destaques ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-1">Destaques</h2>
              <p className="text-gray-400 text-sm">Os mais amados da comunidade Unifor</p>
            </div>
            <button
              onClick={() => setPage("produtos")}
              className="flex items-center gap-1 text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors"
            >
              Ver todos <ChevronRightIcon />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onView={handleView} onAdd={handleAdd} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner CTA ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              Seja parte da história Unifor
            </h3>
            <p className="text-blue-200">Vista com orgulho, conecte-se com sua turma.</p>
          </div>
          <button
            onClick={() => setPage("produtos")}
            className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap shadow-xl"
          >
            Comprar Agora
          </button>
        </div>
      </section>
    </div>
  );
}