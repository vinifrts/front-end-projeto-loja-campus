import {
  useEffect,
  useState
} from "react";

import useCart from "../hooks/useCart";

import ProductCard from "../components/product/ProductCard";

import {
  SearchIcon
} from "../components/Icons";

import {
  getProducts,
  getCategories
} from "../services/productService";

export default function ProductsPage({
  setPage,
  setSelectedProduct
}) {

  const { add } = useCart();

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [cat, setCat] =
    useState("Todos");

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("default");

  useEffect(() => {

    loadCategories();

  }, []);

  useEffect(() => {

    loadProducts();

  }, [search, cat, sort]);

  const loadCategories =
    async () => {

      try {

        const categoriesData =
          await getCategories();

        setCategories([
          "Todos",
          ...categoriesData.map(
            (c) => c.name
          ),
        ]);

      } catch (error) {

        console.error(error);
      }
    };

  const loadProducts =
    async () => {

      try {

        setLoading(true);

        const params = {};

        if (
          search &&
          search.trim() !== ""
        ) {
          params.search = search;
        }

        if (cat !== "Todos") {
          params.category = cat;
        }

        if (sort === "price-asc") {
          params.sort = "price_asc";
        }

        if (sort === "price-desc") {
          params.sort = "price_desc";
        }

        const data =
          await getProducts(params);

        setProducts(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  const handleView =
    (product) => {

      setSelectedProduct(product);

      setPage("produto");
    };

  const handleAdd =
    (product) => {

      add(
        product,
        product.sizes?.[0]
      );
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-1">
          Produtos
        </h1>
        <p className="text-gray-400">
          {products.length}
          {" "}
          produtos encontrados
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Buscar produto..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl"
          />
        </div>
        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="border border-gray-200 rounded-xl px-4 py-3"
        >
          <option value="default">
            Ordenar por
          </option>
          <option value="price-asc">
            Menor preço
          </option>
          <option value="price-desc">
            Maior preço
          </option>
        </select>
      </div>
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() =>
              setCat(c)
            }
            className={`px-4 py-2 rounded-full text-sm ${cat === c
              ? "bg-blue-900 text-white"
              : "bg-white border"
              }`}
          >
            {c}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center py-20">
          Carregando produtos...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onAdd={handleAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
}