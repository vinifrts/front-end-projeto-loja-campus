import { useState, useEffect } from "react";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import {
  CartIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
} from "../Icons";

export default function Navbar({ setPage, currentPage }) {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = (p) => { setPage(p); setMenuOpen(false); };

  const NAV_LINKS = [
    ["home", "Início"],
    ["produtos", "Produtos"],
    ["sobre", "Sobre"],
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => nav("home")} className="flex items-center gap-2">
            <div className="w-26 h-20 overflow-hidden flex items-center justify-center">
              <img
                src="/lgunifor-azul.png"
                alt="Unifor"
                className="h-20 w-auto object-contain scale-110"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-blue-900 text-lg leading-none">
                Lojinha
              </span>

              <span className="text-blue-500 font-black text-lg leading-none">
                {" "}Campus
              </span>

              <div className="text-xs text-gray-400 font-medium leading-none">
                Unifor
              </div>
            </div>
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(([p, label]) => (
              <button
                key={p}
                onClick={() => nav(p)}
                className={`text-sm font-medium capitalize transition-colors ${currentPage === p
                    ? "text-blue-700 font-semibold"
                    : "text-gray-600 hover:text-blue-700"
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => nav("produtos")}
              className="text-gray-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors hidden sm:flex"
            >
              <SearchIcon />
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {user && user.access_level === "docente" && (
                  <button
                    onClick={() => nav("admin")}
                    className="flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <SettingsIcon />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOutIcon />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => nav("login")}
                className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-blue-700 transition-colors p-2"
              >
                <UserIcon />
                <span>Entrar</span>
              </button>
            )}
            <button
              onClick={() => nav("cart")}
              className="relative bg-blue-900 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4 space-y-2">
            {NAV_LINKS.map(([p, label]) => (
              <button
                key={p}
                onClick={() => nav(p)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                {label}
              </button>
            ))}
            {user ? (
              <>
                {user && user.access_level === "docente" && (
                  <button
                    onClick={() => nav("admin")}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 rounded-lg"
                  >
                    Painel Admin
                  </button>
                )}
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => nav("login")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
              >
                Entrar / Cadastrar
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}