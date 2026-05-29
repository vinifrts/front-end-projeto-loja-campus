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
  const { login, register, user } = useAuth();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [registerCpf, setRegisterCpf] = useState("");
  const [registerCourse, setRegisterCourse] = useState("");
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState("");

  if (user) { setPage("home"); return null; }

  const handleLogin = async () => {
    setErr("");
    setLoginErrors({});

    const response = await login(
      email,
      pass
    );

    if (!response.success) {
      setErr(response.message);

      setLoginErrors(
        response.errors || {}
      );

      return;
    }

    setPage(
      response.role === "admin"
        ? "admin"
        : "home"
    );
  };

  const handleCpfChange = (value) => {
    value = value.replace(/\D/g, "");

    value = value.replace(
      /(\d{3})(\d)/,
      "$1.$2"
    );

    value = value.replace(
      /(\d{3})(\d)/,
      "$1.$2"
    );

    value = value.replace(
      /(\d{3})(\d{1,2})$/,
      "$1-$2"
    );

    setRegisterCpf(value);
  };

  const handleRegister = async () => {
    setErr("");
    setRegisterErrors({});

    const response = await register({
      name: registerName,
      email: registerEmail,
      password: registerPass,
      password_confirmation: registerPasswordConfirmation,
      cpf: registerCpf,
    });

    if (!response.success) {
      setErr(response.message);
      setRegisterErrors(response.errors || {});
      return;
    }

    setPage("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-900 p-6 text-center">
          <div className="w-28 h-20 overflow-hidden flex items-center justify-center mx-auto mb-3">
            <img src="/lgunifor-branca.png" alt="Unifor" className="h-20 w-auto object-contain scale-110"
            />
          </div>
          <h1 className="text-white font-black text-xl">
            Lojinha Campus Unifor
          </h1>
          <p className="text-blue-300 text-sm">
            Acesse sua conta
          </p>
        </div>
        <div className="flex border-b border-gray-100">
          {["login", "cadastro"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors capitalize ${tab === t
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
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
                      ${loginErrors.email
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-200 focus:ring-blue-300"
                      }`}
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.email[0]}
                    </p>
                  )}
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
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
                      ${loginErrors.password
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-200 focus:ring-blue-300"
                      }`}
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.password[0]}
                    </p>
                  )}
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
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Nome completo
                </label>
                <input
                  value={registerName}
                  onChange={(e) =>
                    setRegisterName(e.target.value)
                  }
                  placeholder="João da Silva"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
                    ${registerErrors.name
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-200 focus:ring-blue-300"
                    }`}
                />
                {registerErrors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerErrors.name[0]}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Email universitário
                </label>
                <input
                  value={registerEmail}
                  onChange={(e) =>
                    setRegisterEmail(e.target.value)
                  }
                  placeholder="joao@edu.unifor.br"
                  type="email"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
                    ${registerErrors.name
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-200 focus:ring-blue-300"
                    }`}
                />
                {registerErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerErrors.email[0]}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  CPF
                </label>
                <input
                  value={registerCpf}
                  onChange={(e) =>
                    handleCpfChange(e.target.value)
                  }
                  placeholder="000.000.000-00"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
                    ${registerErrors.name
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-200 focus:ring-blue-300"
                    }`}
                />
                {registerErrors.cpf && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerErrors.cpf[0]}
                  </p>
                )}
              </div>
              {/* <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Curso
                </label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white">
                  {COURSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div> */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Senha
                </label>
                <input
                  value={registerPass}
                  onChange={(e) =>
                    setRegisterPass(e.target.value)
                  }
                  placeholder="••••••••"
                  type="password"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
                    ${registerErrors.name
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-200 focus:ring-blue-300"
                    }`}
                />
                {registerErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerErrors.password[0]}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Confirmar senha
                </label>
                <input
                  value={
                    registerPasswordConfirmation
                  }

                  onChange={(e) =>
                    setRegisterPasswordConfirmation(
                      e.target.value
                    )
                  }

                  placeholder="••••••••"
                  type="password"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
                    ${registerErrors.name
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-200 focus:ring-blue-300"
                    }`}
                />
                {registerErrors.password_confirmation && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerErrors.password_confirmation[0]}
                  </p>
                )}
              </div>
              <button
                onClick={handleRegister}
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