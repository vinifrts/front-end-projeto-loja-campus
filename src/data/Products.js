const PRODUCTS = [
  {
    id: 1,
    name: "Camisa Direito",
    price: 69.9,
    category: "Camisas",
    description:
      "Camisa oficial do curso de Direito da Unifor, confeccionada em malha 100% algodão com estampa de alta resolução.",
    image:
      "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Direito",
    sizes: ["P", "M", "G", "GG"],
    rating: 4.8,
    reviews: 124,
    badge: "Mais Vendido",
  },
  {
    id: 2,
    name: "Camisa Medicina",
    price: 74.9,
    category: "Camisas",
    description:
      "Camisa oficial do curso de Medicina com logo bordado e tecido respirável anti-suor.",
    image:
      "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Medicina",
    sizes: ["P", "M", "G", "GG", "XGG"],
    rating: 4.9,
    reviews: 210,
    badge: "Top",
  },
  {
    id: 3,
    name: "Camisa Engenharia",
    price: 69.9,
    category: "Camisas",
    description:
      "Camisa oficial do curso de Engenharia com detalhe técnico na manga e logo Unifor.",
    image:
      "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Engenharia",
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    reviews: 98,
    badge: null,
  },
  {
    id: 4,
    name: "Moletom Unifor Classic",
    price: 149.9,
    category: "Moletons",
    description:
      "Moletom quentinho com capuz e bolso canguru. Logo Unifor em silk bordado no peito.",
    image:
      "https://placehold.co/400x400/0d2e5e/ffffff?text=Moletom+Classic",
    sizes: ["P", "M", "G", "GG", "XGG"],
    rating: 4.9,
    reviews: 312,
    badge: "Mais Vendido",
  },
  {
    id: 5,
    name: "Moletom Unifor Premium",
    price: 179.9,
    category: "Moletons",
    description:
      "Moletom premium fleece com zíper, dois bolsos laterais e detalhe azul nas costuras.",
    image:
      "https://placehold.co/400x400/0d2e5e/ffffff?text=Moletom+Premium",
    sizes: ["P", "M", "G", "GG"],
    rating: 4.8,
    reviews: 175,
    badge: "Novo",
  },
  {
    id: 6,
    name: "Mochila Unifor Pro",
    price: 199.9,
    category: "Mochilas",
    description:
      'Mochila espaçosa com compartimento para notebook até 15,6", USB integrada e logo Unifor.',
    image:
      "https://placehold.co/400x400/14468a/ffffff?text=Mochila+Pro",
    sizes: ["Único"],
    rating: 4.9,
    reviews: 440,
    badge: "Top",
  },
  {
    id: 7,
    name: "Mochila Slim Unifor",
    price: 129.9,
    category: "Mochilas",
    description:
      "Mochila slim para o dia a dia, leve e resistente à água, com compartimentos organizadores.",
    image:
      "https://placehold.co/400x400/14468a/ffffff?text=Mochila+Slim",
    sizes: ["Único"],
    rating: 4.6,
    reviews: 88,
    badge: null,
  },
  {
    id: 8,
    name: "Garrafa Térmica Unifor",
    price: 89.9,
    category: "Garrafas",
    description:
      "Garrafa térmica inox 500ml, mantém quente por 12h e frio por 24h. Logo Unifor em relevo.",
    image:
      "https://placehold.co/400x400/1a5276/ffffff?text=Garrafa+Térmica",
    sizes: ["Único"],
    rating: 4.8,
    reviews: 267,
    badge: "Mais Vendido",
  },
  {
    id: 9,
    name: "Garrafa Sport 750ml",
    price: 59.9,
    category: "Garrafas",
    description:
      "Garrafa plástica sport com bico retrátil, tampa de rosca e alça ergonômica.",
    image:
      "https://placehold.co/400x400/1a5276/ffffff?text=Garrafa+Sport",
    sizes: ["Único"],
    rating: 4.5,
    reviews: 143,
    badge: null,
  },
  {
    id: 10,
    name: "Boné Unifor Trucker",
    price: 69.9,
    category: "Bonés",
    description:
      "Boné trucker estilo premium com bordado frontal Unifor e ajuste traseiro snapback.",
    image:
      "https://placehold.co/400x400/1a3a6b/ffffff?text=Boné+Trucker",
    sizes: ["Único"],
    rating: 4.7,
    reviews: 189,
    badge: "Novo",
  },
  {
    id: 11,
    name: "Boné Classic Cap",
    price: 49.9,
    category: "Bonés",
    description:
      "Boné baseball clássico 100% algodão com logo Unifor bordado e fechamento velcro.",
    image:
      "https://placehold.co/400x400/1a3a6b/ffffff?text=Boné+Classic",
    sizes: ["Único"],
    rating: 4.5,
    reviews: 76,
    badge: null,
  },
  {
    id: 12,
    name: "Kit Papelaria Unifor",
    price: 39.9,
    category: "Papelaria",
    description:
      "Kit completo com caderno universitário 200 folhas, caneta e marcador personalizado Unifor.",
    image:
      "https://placehold.co/400x400/2e4057/ffffff?text=Kit+Papelaria",
    sizes: ["Único"],
    rating: 4.6,
    reviews: 201,
    badge: "Oferta",
  },
  {
    id: 13,
    name: "Agenda Unifor 2025",
    price: 49.9,
    category: "Papelaria",
    description:
      "Agenda semanal capa dura 2025, com divisórias por semestre e identidade visual Unifor.",
    image:
      "https://placehold.co/400x400/2e4057/ffffff?text=Agenda+2025",
    sizes: ["Único"],
    rating: 4.8,
    reviews: 135,
    badge: null,
  },
  {
    id: 14,
    name: "Camisa Psicologia",
    price: 69.9,
    category: "Camisas",
    description:
      "Camisa oficial do curso de Psicologia com estampa exclusiva desenvolvida pelos alunos.",
    image:
      "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+Psi",
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    reviews: 63,
    badge: null,
  },
  {
    id: 15,
    name: "Camisa Administração",
    price: 69.9,
    category: "Camisas",
    description:
      "Camisa oficial de Administração, corte moderno slim fit com logo bordado.",
    image:
      "https://placehold.co/400x400/1a3a6b/ffffff?text=Camisa+ADM",
    sizes: ["P", "M", "G", "GG", "XGG"],
    rating: 4.6,
    reviews: 91,
    badge: null,
  },
  {
    id: 16,
    name: "Chaveiro Unifor",
    price: 19.9,
    category: "Papelaria",
    description:
      "Chaveiro metálico com o logo Unifor em alto relevo. Acabamento premium dourado.",
    image:
      "https://placehold.co/400x400/2e4057/ffffff?text=Chaveiro",
    sizes: ["Único"],
    rating: 4.4,
    reviews: 312,
    badge: "Oferta",
  },
];

export default PRODUCTS;