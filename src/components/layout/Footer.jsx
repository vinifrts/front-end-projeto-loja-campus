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
              {/* Box da logo integrado com a identidade visual */}
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
                <img src="/lgunifor-azul.png" alt="Unifor Logo" className="h-7 w-auto object-contain brightness-0 invert" />
              </div>
              <div>
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-black text-lg text-white">Lojinha</span>
                  <span className="font-black text-lg text-blue-400">Campus</span>
                </div>
                <div className="text-[10px] text-blue-300 font-medium tracking-wide uppercase mt-0.5">Universidade de Fortaleza</div>
              </div>
            </div>
            
            {/* Correção gramatical realizada aqui: "no próprio campus" */}
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              A loja oficial da Unifor. Produtos com identidade universitária,
              qualidade premium e entrega no próprio campus.
            </p>
            
            <div className="flex gap-3 mt-5">
              {SOCIAL_ICONS.map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-blue-900/50 hover:bg-blue-600 border border-white/5 text-blue-200 hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Loja */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400 text-xs uppercase tracking-wider">
              Loja
            </h4>
            <ul className="space-y-2 text-sm text-blue-200/80">
              {LOJA_LINKS.map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => setPage(page)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400 text-xs uppercase tracking-wider">
              Suporte
            </h4>
            <ul className="space-y-2 text-sm text-blue-200/80 mb-5">
              {SUPORTE_LINKS.map((label) => (
                <li key={label}>
                  <button className="hover:text-white transition-colors text-left">{label}</button>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-blue-900/40 border border-white/5 rounded-xl text-xs text-blue-300">
              <div className="font-semibold text-white mb-1">📍 Retirada no Campus</div>
              <div>Segundo andar do Centro de Convivência</div>
              <div className="opacity-75 mt-0.5">Seg–Sex: 8h–22h</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400/60">
          <span>© 2026 Lojinha Campus Unifor. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <button className="hover:text-blue-300 transition-colors">Privacidade</button>
            <button className="hover:text-blue-300 transition-colors">Termos de Uso</button>
          </div>
        </div>
      </div>
    </footer>
  );
}