import {
  useState,
  useEffect
} from "react";

import useCart from "../hooks/useCart";

import ProductCard from "../components/product/ProductCard";
import Badge from "../components/product/Badge";
import Stars from "../components/product/Stars";

import {
  PlusIcon,
  MinusIcon
} from "../components/Icons";

import {
  getRelatedProducts
} from "../services/productService";

import {
  formatPrice,
  formatInstallment
} from "../utils/formatPrice";

export default function ProductPage({
  product,
  setPage,
  setSelectedProduct
}) {

  const { add } = useCart();

  const [size, setSize] =
    useState(
      product?.sizes?.[0] || ""
    );

  const [qty, setQty] =
    useState(1);

  const [added, setAdded] =
    useState(false);

  const [related, setRelated] =
    useState([]);

  useEffect(() => {

    if (product) {
      loadRelated();
    }

  }, [product]);

  const loadRelated =
    async () => {

      const data =
        await getRelatedProducts(
          product,
          4
        );

      setRelated(data);
    };

  if (!product) {

    setPage("produtos");

    return null;
  }

  const handleAdd = () => {

    add(
      product,
      size,
      qty
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleViewRelated =
    (prod) => {

      setSelectedProduct(prod);

      window.scrollTo(0, 0);
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <button
        onClick={() =>
          setPage("produtos")
        }
        className="flex items-center gap-1 text-blue-700 font-medium mb-6 hover:text-blue-900 transition-colors text-sm"
      >
        ← Voltar aos produtos
      </button>

      <div className="grid md:grid-cols-2 gap-10 mb-16">

        {/* Imagem */}
        <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

        </div>

        {/* Detalhes */}
        <div className="flex flex-col justify-between">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <span className="text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">
                {product.category}
              </span>

              {product.badge && (
                <Badge
                  text={product.badge}
                />
              )}

            </div>

            <h1 className="text-3xl font-black text-gray-800 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">

              <Stars
                rating={
                  product.rating || 5
                }
              />

              <span className="text-sm text-gray-500">
                {product.rating || 5}
                {" "}
                (
                {product.reviews || 0}
                {" "}
                avaliações)
              </span>

            </div>

            <p className="text-gray-500 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Tamanhos */}
            {product.sizes?.[0] !==
              "Único" && (

                <div className="mb-6">

                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Tamanho
                  </p>

                  <div className="flex gap-2 flex-wrap">

                    {product.sizes?.map(
                      (s) => (

                        <button
                          key={s}
                          onClick={() =>
                            setSize(s)
                          }
                          className={`w-12 h-12 rounded-xl border-2 text-sm font-semibold transition-all ${size === s
                            ? "border-blue-700 bg-blue-700 text-white"
                            : "border-gray-200 text-gray-600 hover:border-blue-400"
                            }`}
                        >
                          {s}
                        </button>
                      )
                    )}

                  </div>

                </div>
              )}

            {/* Quantidade */}
            <div className="mb-6">

              <p className="text-sm font-semibold text-gray-700 mb-2">
                Quantidade
              </p>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setQty((q) =>
                      Math.max(
                        1,
                        q - 1
                      )
                    )
                  }
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"
                >
                  <MinusIcon />
                </button>

                <span className="text-lg font-bold w-8 text-center">
                  {qty}
                </span>

                <button
                  onClick={() =>
                    setQty(
                      (q) => q + 1
                    )
                  }
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"
                >
                  <PlusIcon />
                </button>

              </div>

            </div>

          </div>

          {/* Preço */}
          <div>

            <div className="mb-5">

              <p className="text-4xl font-black text-blue-900">
                {formatPrice(
                  product.price
                )}
              </p>

              <p className="text-sm text-gray-400">
                {formatInstallment(
                  product.price,
                  3
                )}
              </p>

            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${added
                ? "bg-emerald-500 text-white"
                : "bg-blue-900 hover:bg-blue-700 text-white"
                }`}
            >
              {added
                ? "✓ Adicionado ao Carrinho!"
                : "Adicionar ao Carrinho"}
            </button>

          </div>

        </div>

      </div>

      {/* Relacionados */}
      {related.length > 0 && (

        <div>

          <h2 className="text-xl font-black text-gray-800 mb-6">
            Você também pode gostar
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {related.map((p) => (

              <ProductCard
                key={p.id}
                product={p}
                onView={
                  handleViewRelated
                }
                onAdd={(prod) =>
                  add(
                    prod,
                    prod.sizes?.[0]
                  )
                }
              />
            ))}

          </div>

        </div>
      )}

    </div>
  );
}