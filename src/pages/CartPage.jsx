import { useState } from "react";
import useCart from "../hooks/useCart";
import { TrashIcon, PlusIcon, MinusIcon } from "../components/Icons";
import { formatPrice } from "../utils/formatPrice";
import { calcShipping } from "../utils/helpers";
import { generateOrderId } from "../utils/helpers";
import CATEGORIES from "../data/Categories";

export default function CartPage({ setPage }) {
  const { items, remove, update, total, clear } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [orderId]  = useState(generateOrderId);

  // Confirmação 
  if (checkout) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6"></div>
        <h2 className="text-3xl font-black text-gray-800 mb-3">Pedido Confirmado!</h2>
        <p className="text-gray-500 mb-2">Seu pedido foi realizado com sucesso.</p>
        <p className="text-gray-400 text-sm mb-8">
          Você receberá um e-mail de confirmação em breve. Retirada disponível no Bloco S1.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-left">
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-1">
            Número do Pedido
          </p>
          <p className="text-2xl font-black text-blue-900">{orderId}</p>
        </div>
        <button
          onClick={() => { clear(); setPage("home"); }}
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors"
        >
          Voltar à Loja
        </button>
      </div>
    );
  }

  // Carrinho vazio
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Carrinho vazio</h2>
        <p className="text-gray-400 mb-8">Adicione produtos para continuar</p>
        <button
          onClick={() => setPage("produtos")}
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors"
        >
          Explorar Produtos
        </button>
      </div>
    );
  }

  const shipping = calcShipping(total);

  // Carrinho com itens
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-800 mb-8">Carrinho</h1>
      <div className="grid md:grid-cols-3 gap-8">

        {/* Lista de itens */}
        <div className="md:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.key} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0 bg-gray-50"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-400 mb-1">Tamanho: {item.size}</p>
                <p className="text-blue-900 font-bold">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => update(item.key, item.qty - 1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"
                >
                  <MinusIcon />
                </button>
                <span className="w-6 text-center font-bold text-sm">{item.qty}</span>
                <button
                  onClick={() => update(item.key, item.qty + 1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"
                >
                  <PlusIcon />
                </button>
              </div>
              <button
                onClick={() => remove(item.key)}
                className="text-red-400 hover:text-red-600 p-2 transition-colors flex-shrink-0"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="font-black text-gray-800 mb-5 text-lg">Resumo do Pedido</h2>
          <div className="space-y-3 text-sm mb-5">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frete</span>
              <span className={shipping === 0 ? "text-emerald-500 font-semibold" : ""}>
                {shipping === 0 ? "Grátis 🎉" : formatPrice(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-blue-500 bg-blue-50 rounded-lg p-2">
                Frete grátis em compras acima de R$ 150!
              </p>
            )}
            <div className="border-t pt-3 flex justify-between font-black text-gray-800 text-lg">
              <span>Total</span>
              <span>{formatPrice(total + shipping)}</span>
            </div>
          </div>
          <button
            onClick={() => setCheckout(true)}
            className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg mb-3"
          >
            Finalizar Pedido
          </button>
          <button
            onClick={() => setPage("produtos")}
            className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}