import { useState } from "react";
import useAuth from "../hooks/useAuth";
import CATEGORIES from "../data/Categories";

const COURSES = [
  "Selecione seu curso",
  "Direito",
  "Medicina",
  "Engenharia",
  "Psicologia",
  "Administração",
  "Arquitetura",
];

export default function LoginPage({ setPage }) {
  const { login, user } = useAuth();
  const [tab,   setTab]   = useState("login");
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");

  if (user) { setPage("home"); return null; }

  const handleLogin = () => {
    setErr("");
    const role = login(email, pass);
    if (!role) {
      setErr("Email ou senha inválidos. Tente: admin@unifor.br / admin123");
      return;
    }
    setPage(role === "admin" ? "admin" : "home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-blue-900 p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-blue-900 font-black text-2xl">L</span>
          </div>
          <h1 className="text-white font-black text-xl">Lojinha Campus Unifor</h1>
          <p className="text-blue-300 text-sm">Acesse sua conta</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {["login", "cadastro"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors capitalize ${
                tab === t
                  ? "border-b-2 border-blue-700 text-blue-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "login" ? "Entrar" : "Criar Conta"}
            </button>
          ))}
        </div>

        <div className="p-8">
          {tab === "login" ? (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                    Email universitário
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seunome@edu.unifor.br"
                    type="email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                    Senha
                  </label>
                  <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    type="password"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              {err && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl mb-4">
                  {err}
                </div>
              )}
              <button
                onClick={handleLogin}
                className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
              >
                Entrar
              </button>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700">
                <strong>Demo Admin:</strong> admin@unifor.br / admin123
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Nome completo
                </label>
                <input
                  placeholder="João da Silva"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Email universitário
                </label>
                <input
                  placeholder="joao@edu.unifor.br"
                  type="email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Curso
                </label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white">
                  {COURSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Senha
                </label>
                <input
                  placeholder="••••••••"
                  type="password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
              >
                Criar Conta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}