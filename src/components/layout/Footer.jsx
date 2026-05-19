import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "../Icons";

const SOCIAL_ICONS = [InstagramIcon, FacebookIcon, WhatsAppIcon];

const LOJA_LINKS = [
  ["Produtos", "produtos"],
  ["Camisas", "produtos"],
  ["Moletons", "produtos"],
  ["Acessórios", "produtos"],
];

const SUPORTE_LINKS = [
  "Trocas e Devoluções",
  "FAQ",
  "Fale Conosco",
  "Acompanhar Pedido",
];

export default function Footer({ setPage }) {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="font-black text-white">L</span>
              </div>
              <div>
                <span className="font-black text-xl">Lojinha do </span>
                <span className="font-black text-xl text-blue-400"> Campus</span>
                <div className="text-xs text-blue-300">Universidade de Fortaleza</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              A loja oficial da Unifor. Produtos com identidade universitária,
              qualidade premium e entrega na própria campus.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_ICONS.map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-blue-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Loja */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-300 text-sm uppercase tracking-wider">
              Loja
            </h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {LOJA_LINKS.map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => setPage(page)}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-300 text-sm uppercase tracking-wider">
              Suporte
            </h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {SUPORTE_LINKS.map((label) => (
                <li key={label}>
                  <button className="hover:text-white transition-colors">{label}</button>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-3 bg-blue-900 rounded-xl text-xs text-blue-300">
              <div className="font-semibold text-white mb-1">📍 Retirada no Campus</div>
              <div>Segundo andar do Centro de Convivência</div>
              <div>Seg–Sex: 8h–22h</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <span>© 2026 Lojinha Campus Unifor. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Privacidade</button>
            <button className="hover:text-white transition-colors">Termos de Uso</button>
          </div>
        </div>
      </div>
    </footer>
  );
}