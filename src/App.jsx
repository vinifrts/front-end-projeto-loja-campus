import { useState, createContext, useContext, useEffect } from "react";

// ============================================================
// DATA / MOCK
// ============================================================
const PRODUCTS = [
  { id: 1, name: "Camisa Direito", price: 69.9, category: "Camisas", description: "Camisa oficial do curso de Direito da Unifor, confeccionada em malha 100% algodão com estampa de alta resolução.", image: "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Direito", sizes: ["P","M","G","GG"], rating: 4.8, reviews: 124, badge: "Mais Vendido" },
  { id: 2, name: "Camisa Medicina", price: 74.9, category: "Camisas", description: "Camisa oficial do curso de Medicina com logo bordado e tecido respirável anti-suor.", image: "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Medicina", sizes: ["P","M","G","GG","XGG"], rating: 4.9, reviews: 210, badge: "Top" },
  { id: 3, name: "Camisa Engenharia", price: 69.9, category: "Camisas", description: "Camisa oficial do curso de Engenharia com detalhe técnico na manga e logo Unifor.", image: "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Engenharia", sizes: ["P","M","G","GG"], rating: 4.7, reviews: 98 },
  { id: 4, name: "Moletom Unifor Classic", price: 149.9, category: "Moletons", description: "Moletom quentinho com capuz e bolso canguru. Logo Unifor em silk bordado no peito.", image: "https://placehold.co/400x400/0d2e5e/ffffff?text=Moletom+Classic", sizes: ["P","M","G","GG","XGG"], rating: 4.9, reviews: 312, badge: "Mais Vendido" },
  { id: 5, name: "Moletom Unifor Premium", price: 179.9, category: "Moletons", description: "Moletom premium fleece com zíper, dois bolsos laterais e detalhe azul nas costuras.", image: "https://placehold.co/400x400/0d2e5e/ffffff?text=Moletom+Premium", sizes: ["P","M","G","GG"], rating: 4.8, reviews: 175, badge: "Novo" },
  { id: 6, name: "Mochila Unifor Pro", price: 199.9, category: "Mochilas", description: "Mochila espaçosa com compartimento para notebook até 15,6\", USB integrada e logo Unifor.", image: "https://placehold.co/400x400/14468a/ffffff?text=Mochila+Pro", sizes: ["Único"], rating: 4.9, reviews: 440, badge: "Top" },
  { id: 7, name: "Mochila Slim Unifor", price: 129.9, category: "Mochilas", description: "Mochila slim para o dia a dia, leve e resistente à água, com compartimentos organizadores.", image: "https://placehold.co/400x400/14468a/ffffff?text=Mochila+Slim", sizes: ["Único"], rating: 4.6, reviews: 88 },
  { id: 8, name: "Garrafa Térmica Unifor", price: 89.9, category: "Garrafas", description: "Garrafa térmica inox 500ml, mantém quente por 12h e frio por 24h. Logo Unifor em relevo.", image: "https://placehold.co/400x400/1a5276/ffffff?text=Garrafa+Térmica", sizes: ["Único"], rating: 4.8, reviews: 267, badge: "Mais Vendido" },
  { id: 9, name: "Garrafa Sport 750ml", price: 59.9, category: "Garrafas", description: "Garrafa plástica sport com bico retrátil, tampa de rosca e alça ergonômica.", image: "https://placehold.co/400x400/1a5276/ffffff?text=Garrafa+Sport", sizes: ["Único"], rating: 4.5, reviews: 143 },
  { id: 10, name: "Boné Unifor Trucker", price: 69.9, category: "Bonés", description: "Boné trucker estilo premium com bordado frontal Unifor e ajuste traseiro snapback.", image: "https://placehold.co/400x400/1a3a6b/ffffff?text=Boné+Trucker", sizes: ["Único"], rating: 4.7, reviews: 189, badge: "Novo" },
  { id: 11, name: "Boné Classic Cap", price: 49.9, category: "Bonés", description: "Boné baseball clássico 100% algodão com logo Unifor bordado e fechamento velcro.", image: "https://placehold.co/400x400/1a3a6b/ffffff?text=Boné+Classic", sizes: ["Único"], rating: 4.5, reviews: 76 },
  { id: 12, name: "Kit Papelaria Unifor", price: 39.9, category: "Papelaria", description: "Kit completo com caderno universitário 200 folhas, caneta e marcador personalizado Unifor.", image: "https://placehold.co/400x400/2e4057/ffffff?text=Kit+Papelaria", sizes: ["Único"], rating: 4.6, reviews: 201, badge: "Oferta" },
  { id: 13, name: "Agenda Unifor 2025", price: 49.9, category: "Papelaria", description: "Agenda semanal capa dura 2025, com divisórias por semestre e identidade visual Unifor.", image: "https://placehold.co/400x400/2e4057/ffffff?text=Agenda+2025", sizes: ["Único"], rating: 4.8, reviews: 135 },
  { id: 14, name: "Camisa Psicologia", price: 69.9, category: "Camisas", description: "Camisa oficial do curso de Psicologia com estampa exclusiva desenvolvida pelos alunos.", image: "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Psi", sizes: ["P","M","G","GG"], rating: 4.7, reviews: 63 },
  { id: 15, name: "Camisa Administração", price: 69.9, category: "Camisas", description: "Camisa oficial de Administração, corte moderno slim fit com logo bordado.", image: "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+ADM", sizes: ["P","M","G","GG","XGG"], rating: 4.6, reviews: 91 },
  { id: 16, name: "Chaveiro Unifor", price: 19.9, category: "Papelaria", description: "Chaveiro metálico com o logo Unifor em alto relevo. Acabamento premium dourado.", image: "https://placehold.co/400x400/2e4057/ffffff?text=Chaveiro", sizes: ["Único"], rating: 4.4, reviews: 312, badge: "Oferta" },
];

const CATEGORIES = ["Todos", "Camisas", "Moletons", "Mochilas", "Garrafas", "Bonés", "Papelaria"];

// ============================================================
// CONTEXT
// ============================================================
const CartContext = createContext(null);
const AuthContext = createContext(null);
const NavContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const add = (product, size, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}-${size}`;
      const exists = prev.find(i => i.key === key);
      return exists
        ? prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { ...product, size, qty, key }];
    });
  };
  const remove = key => setItems(prev => prev.filter(i => i.key !== key));
  const update = (key, qty) => setItems(prev => qty < 1 ? prev.filter(i => i.key !== key) : prev.map(i => i.key === key ? { ...i, qty } : i));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>{children}</CartContext.Provider>;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (email, pass) => {
    if (email === "admin@unifor.br" && pass === "admin123") { setUser({ name: "Admin Unifor", email, role: "admin" }); return "admin"; }
    if (email && pass.length >= 4) { setUser({ name: "Estudante Unifor", email, role: "user" }); return "user"; }
    return null;
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

const useCart = () => useContext(CartContext);
const useAuth = () => useContext(AuthContext);
const useNav = () => useContext(NavContext);

// ============================================================
// ICONS (inline SVG)
// ============================================================
const Icon = {
  Cart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Menu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Star: ({ filled }) => <svg viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2" className="w-4 h-4"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  Trash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Minus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="9,18 15,12 9,6"/></svg>,
  Package: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12.89 1.45l8 4A2 2 0 0122 7.24v9.53a2 2 0 01-1.11 1.79l-8 4a2 2 0 01-1.79 0l-8-4A2 2 0 012 16.76V7.24a2 2 0 011.11-1.79l8-4a2 2 0 011.78 0z"/><polyline points="2.32,6.16 12,11 21.68,6.16"/><line x1="12" y1="22.76" x2="12" y2="11"/></svg>,
  TrendingUp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Truck: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><polyline points="20,6 9,17 4,12"/></svg>,
  Grid: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  Edit: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Instagram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Facebook: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  WhatsApp: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  LogOut: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
};

// ============================================================
// COMPONENTS
// ============================================================

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => <Icon.Star key={i} filled={i <= Math.round(rating)} />)}
    </div>
  );
}

function Badge({ text }) {
  const colors = { "Mais Vendido": "bg-amber-500", "Novo": "bg-emerald-500", "Top": "bg-purple-500", "Oferta": "bg-red-500" };
  return <span className={`${colors[text] || "bg-blue-500"} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>{text}</span>;
}

function ProductCard({ product, onView, onAdd }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {product.badge && <div className="absolute top-3 left-3"><Badge text={product.badge} /></div>}
        <button
          onClick={e => { e.stopPropagation(); onAdd(product); }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-900 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg"
        >+ Adicionar</button>
        <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
          <Icon.Heart />
        </button>
      </div>
      <div className="p-4" onClick={() => onView(product)}>
        <p className="text-xs text-blue-600 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-900">R$ {product.price.toFixed(2).replace(".",",")}</span>
          <div className="flex gap-1">
            {product.sizes.slice(0,3).map(s => (
              <span key={s} className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-500">{s}</span>
            ))}
            {product.sizes.length > 3 && <span className="text-xs text-gray-400">+{product.sizes.length - 3}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ setPage, currentPage }) {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const nav = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => nav("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-blue-900 text-lg leading-none">Lojinha</span>
              <span className="text-blue-500 font-black text-lg leading-none"> Campus</span>
              <div className="text-xs text-gray-400 font-medium leading-none">Unifor</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {["home","produtos","sobre"].map(p => (
              <button key={p} onClick={() => nav(p)} className={`text-sm font-medium capitalize transition-colors ${currentPage === p ? "text-blue-700 font-semibold" : "text-gray-600 hover:text-blue-700"}`}>
                {p === "home" ? "Início" : p === "produtos" ? "Produtos" : "Sobre"}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => nav("produtos")} className="text-gray-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors hidden sm:flex">
              <Icon.Search />
            </button>
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {user.role === "admin" && (
                  <button onClick={() => nav("admin")} className="flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors">
                    <Icon.Settings /><span>Admin</span>
                  </button>
                )}
                <button onClick={logout} className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors">
                  <Icon.LogOut /><span>Sair</span>
                </button>
              </div>
            ) : (
              <button onClick={() => nav("login")} className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-blue-700 transition-colors p-2">
                <Icon.User /><span>Entrar</span>
              </button>
            )}
            <button onClick={() => nav("cart")} className="relative bg-blue-900 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors">
              <Icon.Cart />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{count}</span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600">
              {menuOpen ? <Icon.X /> : <Icon.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4 space-y-2">
            {[["home","Início"],["produtos","Produtos"],["sobre","Sobre"]].map(([p, label]) => (
              <button key={p} onClick={() => nav(p)} className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">{label}</button>
            ))}
            {user ? (
              <>
                {user.role === "admin" && <button onClick={() => nav("admin")} className="block w-full text-left px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 rounded-lg">Painel Admin</button>}
                <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg">Sair</button>
              </>
            ) : (
              <button onClick={() => nav("login")} className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">Entrar / Cadastrar</button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ setPage }) {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center"><span className="font-black text-white">L</span></div>
              <div>
                <span className="font-black text-xl">Lojinha</span><span className="font-black text-xl text-blue-400"> Campus</span>
                <div className="text-xs text-blue-300">Universidade de Fortaleza</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">A loja oficial da Unifor. Produtos com identidade universitária, qualidade premium e entrega na própria campus.</p>
            <div className="flex gap-3 mt-5">
              {[Icon.Instagram, Icon.Facebook, Icon.WhatsApp].map((I, i) => (
                <button key={i} className="w-9 h-9 bg-blue-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"><I /></button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-300 text-sm uppercase tracking-wider">Loja</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {[["Produtos","produtos"],["Camisas","produtos"],["Moletons","produtos"],["Acessórios","produtos"]].map(([l, p]) => (
                <li key={l}><button onClick={() => setPage(p)} className="hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-300 text-sm uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {["Trocas e Devoluções","FAQ","Fale Conosco","Acompanhar Pedido"].map(l => (
                <li key={l}><button className="hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
            <div className="mt-5 p-3 bg-blue-900 rounded-xl text-xs text-blue-300">
              <div className="font-semibold text-white mb-1"> Retirada no Campus</div>
              <div>2º andar do Centro de Convivência – Lojinha do Campus</div>
              <div>Seg–Sex: 8h–18h</div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <span>© 2026 Lojinha do Campus Unifor. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Privacidade</button>
            <button className="hover:text-white transition-colors">Termos de Uso</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ setPage, setSelectedProduct }) {
  const { add } = useCart();
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 4);

  const handleAdd = (product) => {
    add(product, product.sizes[0]);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-700/40 border border-blue-600/40 text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Coleção 2026.2 disponível
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Vista seu<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">orgulho</span><br />Unifor
            </h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">Produtos exclusivos com identidade universitária. Qualidade premium, entrega no campus.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage("produtos")} className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-xl">
                Explorar Produtos
              </button>
              <button onClick={() => setPage("sobre")} className="border border-blue-400 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors">
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
          <div className="hidden md:grid grid-cols-2 gap-4">
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <div key={p.id} className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 ${i % 2 === 1 ? "mt-8" : ""}`}>
                <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-xl mb-3 opacity-90" />
                <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                <p className="text-blue-300 text-xs">R$ {p.price.toFixed(2).replace(".",",")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[[Icon.Truck,"Entrega no Campus","1 a 3 dias úteis"],[Icon.Shield,"Produto Oficial","Garantia Unifor"],[Icon.Heart,"Feito com Amor","Por alunos, para alunos"],[Icon.Check,"Qualidade Premium","Materiais selecionados"]].map(([I, t, s]) => (
            <div key={t} className="flex items-center gap-3 text-white">
              <div className="bg-blue-700/50 p-2.5 rounded-xl flex-shrink-0"><I /></div>
              <div><p className="text-sm font-semibold">{t}</p><p className="text-xs text-blue-300">{s}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-gray-800 mb-2">Categorias</h2>
        <p className="text-gray-400 mb-8">Encontre o que você procura</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.filter(c => c !== "Todos").map(cat => (
            <button key={cat} onClick={() => setPage("produtos")} className="group flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors text-2xl">
                {{"Camisas":"👕","Moletons":"🧥","Mochilas":"🎒","Garrafas":"🧴","Bonés":"🧢","Papelaria":"📚"}[cat]}
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700 transition-colors">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-1">Destaques</h2>
              <p className="text-gray-400 text-sm">Os mais amados da comunidade Unifor</p>
            </div>
            <button onClick={() => setPage("produtos")} className="flex items-center gap-1 text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors">
              Ver todos <Icon.ChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} onView={(prod) => { setSelectedProduct(prod); setPage("produto"); }} onAdd={handleAdd} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Seja parte da história Unifor</h3>
            <p className="text-blue-200">Vista com orgulho, conecte-se com sua turma.</p>
          </div>
          <button onClick={() => setPage("produtos")} className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap shadow-xl">
            Comprar Agora
          </button>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// PRODUCTS PAGE
// ============================================================
function ProductsPage({ setPage, setSelectedProduct }) {
  const { add } = useCart();
  const [cat, setCat] = useState("Todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  let filtered = PRODUCTS.filter(p =>
    (cat === "Todos" || p.category === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-1">Produtos</h1>
        <p className="text-gray-400">{filtered.length} produtos encontrados</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon.Search /></div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar produto..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white"
          />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300">
          <option value="default">Ordenar por</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
          <option value="rating">Melhor Avaliação</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === c ? "bg-blue-900 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700"}`}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium">Nenhum produto encontrado</p>
          <button onClick={() => { setSearch(""); setCat("Todos"); }} className="mt-4 text-blue-600 font-medium hover:underline">Limpar filtros</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p}
              onView={(prod) => { setSelectedProduct(prod); setPage("produto"); }}
              onAdd={(prod) => add(prod, prod.sizes[0])}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
function ProductDetailPage({ product, setPage }) {
  const { add } = useCart();
  const [size, setSize] = useState(product?.sizes[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) { setPage("produtos"); return null; }

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    add(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => setPage("produtos")} className="flex items-center gap-1 text-blue-700 font-medium mb-6 hover:text-blue-900 transition-colors text-sm">
        ← Voltar aos produtos
      </button>
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">{product.category}</span>
              {product.badge && <Badge text={product.badge} />}
            </div>
            <h1 className="text-3xl font-black text-gray-800 mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Stars rating={product.rating} />
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} avaliações)</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

            {product.sizes[0] !== "Único" && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Tamanho</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} className={`w-12 h-12 rounded-xl border-2 text-sm font-semibold transition-all ${size === s ? "border-blue-700 bg-blue-700 text-white" : "border-gray-200 text-gray-600 hover:border-blue-400"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Quantidade</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"><Icon.Minus /></button>
                <span className="text-lg font-bold w-8 text-center">{qty}</span>
                <button onClick={() => setQty(q => q+1)} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"><Icon.Plus /></button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-4xl font-black text-blue-900">R$ {product.price.toFixed(2).replace(".",",")}</p>
                <p className="text-sm text-gray-400">ou 3x de R$ {(product.price/3).toFixed(2).replace(".",",")} sem juros</p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${added ? "bg-emerald-500 text-white" : "bg-blue-900 hover:bg-blue-700 text-white"}`}
            >
              {added ? "✓ Adicionado ao Carrinho!" : "Adicionar ao Carrinho"}
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-black text-gray-800 mb-6">Você também pode gostar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => (
              <ProductCard key={p.id} product={p}
                onView={(prod) => { window.scrollTo(0,0); }}
                onAdd={(prod) => add(prod, prod.sizes[0])}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// LOGIN PAGE
// ============================================================
function LoginPage({ setPage }) {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("login");

  if (user) { setPage("home"); return null; }

  const handleLogin = () => {
    setErr("");
    const role = login(email, pass);
    if (!role) { setErr("Email ou senha inválidos. Tente: admin@unifor.br / admin123"); return; }
    setPage(role === "admin" ? "admin" : "home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-900 p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-blue-900 font-black text-2xl">L</span>
          </div>
          <h1 className="text-white font-black text-xl">Lojinha do Campus Unifor</h1>
          <p className="text-blue-300 text-sm">Acesse sua conta</p>
        </div>

        <div className="flex border-b border-gray-100">
          {["login","cadastro"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-sm font-semibold transition-colors capitalize ${tab === t ? "border-b-2 border-blue-700 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}>
              {t === "login" ? "Entrar" : "Criar Conta"}
            </button>
          ))}
        </div>

        <div className="p-8">
          {tab === "login" ? (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Email universitário</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="seunome@edu.unifor.br" type="email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Senha</label>
                  <input value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" type="password"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
              </div>
              {err && <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl mb-4">{err}</div>}
              <button onClick={handleLogin} className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg">
                Entrar
              </button>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700">
                <strong>Demo Admin:</strong> admin@unifor.br / admin123
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Nome completo</label>
                <input placeholder="João da Silva" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Email universitário</label>
                <input placeholder="joao@edu.unifor.br" type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Curso</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white">
                  <option>Selecione seu curso</option>
                  {["Direito","Medicina","Engenharia","Psicologia","Administração","Arquitetura"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Senha</label>
                <input placeholder="••••••••" type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <button onClick={handleLogin} className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg">
                Criar Conta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CART PAGE
// ============================================================
function CartPage({ setPage }) {
  const { items, remove, update, total, clear } = useCart();
  const [checkout, setCheckout] = useState(false);

  if (checkout) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h2 className="text-3xl font-black text-gray-800 mb-3">Pedido Confirmado!</h2>
      <p className="text-gray-500 mb-2">Seu pedido foi realizado com sucesso.</p>
      <p className="text-gray-400 text-sm mb-8">Você receberá um e-mail de confirmação em breve. Retirada disponível no Bloco S1.</p>
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-left">
        <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-1">Número do Pedido</p>
        <p className="text-2xl font-black text-blue-900">#UNF-{Math.floor(Math.random()*90000+10000)}</p>
      </div>
      <button onClick={() => { clear(); setPage("home"); }} className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors">
        Voltar à Loja
      </button>
    </div>
  );

  if (items.length === 0) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🛒</div>
      <h2 className="text-2xl font-bold text-gray-700 mb-3">Carrinho vazio</h2>
      <p className="text-gray-400 mb-8">Adicione produtos para continuar</p>
      <button onClick={() => setPage("produtos")} className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors">
        Explorar Produtos
      </button>
    </div>
  );

  const shipping = total >= 150 ? 0 : 15.9;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-800 mb-8">Carrinho</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.key} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0 bg-gray-50" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-400 mb-1">Tamanho: {item.size}</p>
                <p className="text-blue-900 font-bold">R$ {item.price.toFixed(2).replace(".",",")}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => update(item.key, item.qty - 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"><Icon.Minus /></button>
                <span className="w-6 text-center font-bold text-sm">{item.qty}</span>
                <button onClick={() => update(item.key, item.qty + 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors"><Icon.Plus /></button>
              </div>
              <button onClick={() => remove(item.key)} className="text-red-400 hover:text-red-600 p-2 transition-colors flex-shrink-0"><Icon.Trash /></button>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="font-black text-gray-800 mb-5 text-lg">Resumo do Pedido</h2>
          <div className="space-y-3 text-sm mb-5">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>R$ {total.toFixed(2).replace(".",",")}</span></div>
            <div className="flex justify-between text-gray-600">
              <span>Frete</span>
              <span className={shipping === 0 ? "text-emerald-500 font-semibold" : ""}>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2).replace(".",",")}`}</span>
            </div>
            {shipping > 0 && <p className="text-xs text-blue-500 bg-blue-50 rounded-lg p-2">Frete grátis em compras acima de R$ 150!</p>}
            <div className="border-t pt-3 flex justify-between font-black text-gray-800 text-lg">
              <span>Total</span><span>R$ {(total + shipping).toFixed(2).replace(".",",")}</span>
            </div>
          </div>
          <button onClick={() => setCheckout(true)} className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg mb-3">
            Finalizar Pedido
          </button>
          <button onClick={() => setPage("produtos")} className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN PAGE
// ============================================================
function AdminPage({ setPage }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Acesso Restrito</h2>
        <button onClick={() => setPage("login")} className="bg-blue-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Fazer Login</button>
      </div>
    );
  }

  const stats = [
    { label: "Produtos Cadastrados", value: PRODUCTS.length, icon: Icon.Package, color: "blue" },
    { label: "Pedidos do Mês", value: 247, icon: Icon.TrendingUp, color: "emerald" },
    { label: "Receita Total", value: "R$ 18.420", icon: Icon.TrendingUp, color: "purple" },
    { label: "Avaliação Média", value: "4.8 ★", icon: Icon.Star, color: "amber" },
  ];

  const tabs = [["dashboard","Dashboard"],["produtos","Produtos"],["pedidos","Pedidos"]];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-400">Bem-vindo, {user.name}</p>
        </div>
        <button onClick={() => setPage("home")} className="text-sm text-blue-700 font-medium hover:text-blue-900">← Ir para loja</button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {tabs.map(([t, l]) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-3 text-sm font-semibold transition-colors ${activeTab === t ? "border-b-2 border-blue-700 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}>{l}</button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: I, color }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className={`w-10 h-10 bg-${color}-50 rounded-xl flex items-center justify-center mb-3 text-${color}-600`}><I /></div>
                <p className="text-2xl font-black text-gray-800">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-gray-800 mb-4">Mais Vendidos</h3>
              <div className="space-y-3">
                {PRODUCTS.filter(p => p.badge).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-lg font-black text-gray-300 w-5">#{i+1}</span>
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.reviews} avaliações</p>
                    </div>
                    <span className="text-sm font-bold text-blue-900">R$ {p.price.toFixed(2).replace(".",",")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-gray-800 mb-4">Vendas por Categoria</h3>
              <div className="space-y-3">
                {[["Camisas",65],["Moletons",48],["Mochilas",31],["Garrafas",28],["Bonés",19],["Papelaria",16]].map(([cat, pct]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 font-medium">{cat}</span>
                      <span className="text-gray-400">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-700 h-2 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "produtos" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{PRODUCTS.length} produtos cadastrados</p>
            <button className="bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Icon.Plus />Novo Produto
            </button>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Produto","Categoria","Preço","Avaliação","Ação"].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PRODUCTS.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                          <span className="text-sm font-medium text-gray-700">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">{p.category}</span></td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-700">R$ {p.price.toFixed(2).replace(".",",")}</td>
                      <td className="px-4 py-3 text-sm text-amber-500 font-medium">★ {p.rating}</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors p-1"><Icon.Edit /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pedidos" && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Pedido","Aluno","Produto","Valor","Status"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["#UNF-10231","Ana Paula Lima","Moletom Unifor Classic","R$ 149,90","Entregue"],
                  ["#UNF-10230","Carlos Mendes","Camisa Medicina","R$ 74,90","Aguardando Retirada"],
                  ["#UNF-10229","Julia Ferreira","Mochila Unifor Pro","R$ 199,90","Em Preparo"],
                  ["#UNF-10228","Pedro Alves","Kit Papelaria","R$ 39,90","Entregue"],
                  ["#UNF-10227","Mariana Costa","Garrafa Térmica","R$ 89,90","Aguardando Retirada"],
                ].map(([id, aluno, prod, val, status]) => (
                  <tr key={id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-blue-900">{id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{aluno}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{prod}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-700">{val}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status === "Entregue" ? "bg-emerald-50 text-emerald-600" : status === "Aguardando Retirada" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SOBRE PAGE
// ============================================================
function SobrePage({ setPage }) {
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-950 to-blue-800 py-20 text-center text-white px-4">
        <h1 className="text-4xl font-black mb-4">Sobre a Lojinha do Campus</h1>
        <p className="text-blue-200 max-w-xl mx-auto text-lg">Um projeto universitário que conecta alunos à identidade da Unifor através de produtos de qualidade.</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-4">Nossa Missão</h2>
            <p className="text-gray-500 leading-relaxed mb-4">A Lojinha do Campus Unifor nasceu do desejo de oferecer produtos universitários de alta qualidade para toda a comunidade acadêmica da Universidade de Fortaleza.</p>
            <p className="text-gray-500 leading-relaxed">Trabalhamos com fornecedores certificados para garantir que cada produto represente dignamente o orgulho de ser Unifor.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[["","Estudantes Atendidos","2.400+"],["","Avaliação Média","4.8/5"],["","Produtos","16+"],["","Anos de Projeto","10"]].map(([e, l, v]) => (
              <div key={l} className="bg-blue-50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">{e}</div>
                <div className="text-2xl font-black text-blue-900">{v}</div>
                <div className="text-xs text-gray-400 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button onClick={() => setPage("produtos")} className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition-colors shadow-xl">
            Explorar Produtos
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "produtos": return <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "produto": return <ProductDetailPage product={selectedProduct} setPage={setPage} />;
      case "login": return <LoginPage setPage={setPage} />;
      case "cart": return <CartPage setPage={setPage} />;
      case "admin": return <AdminPage setPage={setPage} />;
      case "sobre": return <SobrePage setPage={setPage} />;
      default: return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
    }
  };

  const noLayout = page === "login";

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 font-sans">
          {!noLayout && <Navbar setPage={setPage} currentPage={page} />}
          <main className={!noLayout ? "pt-16" : ""}>
            {renderPage()}
          </main>
          {!noLayout && <Footer setPage={setPage} />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}