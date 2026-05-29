import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";

export default function AddProductModal({ onClose = () => {}, onProductAdded = () => {} }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: 10,
    category_id: "",
    description_short: "",
    description_long: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await apiFetch("/categories", { method: "GET" });
        const catList = response.data || response;
        
        if (Array.isArray(catList)) {
          setCategories(catList);
          if (catList.length > 0) {
            setFormData((prev) => ({ ...prev, category_id: String(catList[0].id) }));
          }
        }
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    }
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formEl = e.target;
    const nameValue = formEl.elements.name.value;
    const priceValue = formEl.elements.price.value;
    const stockValue = formEl.elements.stock.value;
    const categoryIdValue = formEl.elements.category_id.value;
    const descShortValue = formEl.elements.description_short.value;
    const descLongValue = formEl.elements.description_long.value;

    try {
      const data = new FormData();
      data.append("name", nameValue);
      data.append("price", priceValue);
      data.append("stock", stockValue);
      data.append("category_id", categoryIdValue);
      data.append("description_short", descShortValue);
      data.append("description_long", descLongValue);
      
      if (imageFile) {
        data.append("image", imageFile); 
      }

      const response = await apiFetch("/products", {
        method: "POST",
        body: data,
      });

      const newProduct = response.data || response;
      if (onProductAdded) onProductAdded(newProduct);
      onClose();
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      if (err.data && err.data.errors) {
        const msgErro = Object.values(err.data.errors).flat().join(" ");
        setError(msgErro);
      } else {
        setError(err.message || "Erro ao salvar produto.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl relative">
        <button type="button" onClick={onClose} className="absolute top-5 right-5 text-gray-400 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-black text-blue-950 mb-6">Adicionar Novo Produto</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Produto *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preço (R$) *</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Estoque *</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria *</label>
              <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl bg-white" required>
                <option value="" disabled>Selecione...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição Curta *</label>
            <input type="text" name="description_short" value={formData.description_short} onChange={handleChange} placeholder="Ex: Camisa 100% algodão" className="w-full px-4 py-2.5 border rounded-xl" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição Detalhada *</label>
            <textarea name="description_long" rows="3" value={formData.description_long} onChange={handleChange} placeholder="Instruções completas..." className="w-full px-4 py-2.5 border rounded-xl resize-none" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Imagem do Produto</label>
            <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 p-2">
              <span className="text-xs text-gray-500">{imageFile ? `📂 ${imageFile.name}` : "Selecionar Imagem"}</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-gray-100 rounded-xl font-semibold">Cancelar</button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 bg-blue-900 text-white rounded-xl font-semibold">
              {loading ? "Salvando..." : "Adicionar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}