import CATEGORIES from "../data/Categories";

const STATS = [
  ["Estudantes Atendidos", "2.400+"],
  ["Avaliação Média",       "4.8/5"],
  ["Produtos",              "16+"],
  ["Anos de Projeto",       "3"],
];

export default function SobrePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-950 to-blue-800 py-20 text-center text-white px-4">
        <h1 className="text-4xl font-black mb-4">Sobre a Lojinha Campus</h1>
        <p className="text-blue-200 max-w-xl mx-auto text-lg">
          Um projeto universitário que conecta alunos à identidade da Unifor
          através de produtos de qualidade.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-4">Nossa Missão</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              A Lojinha Campus Unifor nasceu do desejo de oferecer produtos
              universitários de alta qualidade para toda a comunidade acadêmica da
              Universidade de Fortaleza.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Trabalhamos com fornecedores certificados para garantir que cada
              produto represente dignamente o orgulho de ser Unifor.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map(([emoji, label, value]) => (
              <div key={label} className="bg-blue-50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="text-2xl font-black text-blue-900">{value}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setPage("produtos")}
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition-colors shadow-xl"
          >
            Explorar Produtos
          </button>
        </div>
      </div>
    </div>
  );
}