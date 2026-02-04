// Dados dos parceiros ABIESV

export type PartnerBadge = "fundador" | "estrategico" | "ancora";

export interface StrategicPartner {
  id: string;
  name: string;
  logo?: string;
  description: string;
  category: string;
  categoryIcon: string;
  badge: PartnerBadge;
  website?: string;
}

export interface SectorPartner {
  id: string;
  name: string;
  logo?: string;
  sector: string;
  website?: string;
}

export interface KnowledgePartner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

export interface KnowledgeCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  partners: KnowledgePartner[];
}

export interface InternationalPartner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

export interface Region {
  id: string;
  name: string;
  flag: string;
  partners: InternationalPartner[];
}

// Parceiros Estratégicos (Núcleo)
export const strategicPartners: StrategicPartner[] = [
  {
    id: "fast-construtora",
    name: "FAST Construtora",
    logo: "/associates/fast-construtora.png",
    description: "Referência em obras rápidas para varejo, com mais de 1.100 obras entregues e cobertura nacional para projetos turnkey.",
    category: "Construção & Arquitetura",
    categoryIcon: "🏗️",
    badge: "fundador",
    website: "https://www.fastconstrutora.com.br",
  },
  {
    id: "kt-arquitetura",
    name: "KT Arquitetura",
    logo: undefined,
    description: "Escritório especializado em store design há mais de 20 anos, referência em projetos de varejo e ambientes comerciais.",
    category: "Arquitetura & Design",
    categoryIcon: "🏛️",
    badge: "estrategico",
    website: "https://kt.com.br/",
  },
  {
    id: "creative-display",
    name: "Creative Display",
    logo: undefined,
    description: "Indústria líder em mobiliário e displays para PDV, atendendo grandes redes varejistas em todo o Brasil.",
    category: "Mobiliário & Equipamentos",
    categoryIcon: "🪑",
    badge: "estrategico",
    website: "https://www.creativedisplay.com.br/",
  },
  {
    id: "omega-light",
    name: "Omega Light",
    logo: undefined,
    description: "Mais de 20 anos de expertise em iluminação LED para varejo, com soluções inovadoras em projetos luminotécnicos.",
    category: "Iluminação",
    categoryIcon: "💡",
    badge: "ancora",
    website: "https://www.omegalight.com.br/pt/",
  },
  {
    id: "expor-manequins",
    name: "Expor Manequins",
    logo: undefined,
    description: "Fabricante de referência em manequins e displays para visual merchandising, com décadas de expertise no setor.",
    category: "Visual Merchandising",
    categoryIcon: "👗",
    badge: "estrategico",
    website: "https://expormanequins.com.br/site/",
  },
  {
    id: "sesami-brasil",
    name: "Sesami Brasil",
    logo: undefined,
    description: "Tecnologia de ponta em cash management e prevenção de perdas, protegendo operações de grandes varejistas.",
    category: "Tecnologia & Segurança",
    categoryIcon: "🔐",
    badge: "fundador",
    website: "https://www.sesami.io/pt-br",
  },
];

// Setores disponíveis
export const sectors = [
  { id: "todos", name: "Todos os Setores", icon: "📋" },
  { id: "mobiliario", name: "Mobiliário & Equipamentos", icon: "🪑" },
  { id: "tecnologia", name: "Tecnologia & Inovação", icon: "💻" },
  { id: "servicos", name: "Serviços para PDV", icon: "🛠️" },
  { id: "iluminacao", name: "Iluminação", icon: "💡" },
  { id: "comunicacao", name: "Comunicação Visual", icon: "🎨" },
  { id: "arquitetura", name: "Arquitetura Comercial", icon: "🏛️" },
];

// Parceiros Setoriais
export const sectorPartners: SectorPartner[] = [
  // Mobiliário
  { id: "creative-display", name: "Creative Display", sector: "mobiliario", website: "https://www.creativedisplay.com.br/" },
  { id: "expor-manequins", name: "Expor Manequins", sector: "mobiliario", website: "https://expormanequins.com.br/site/" },
  { id: "atual-pdv", name: "Atual PDV", sector: "mobiliario", website: "https://atualpdv.com.br/" },
  { id: "mao-colorida", name: "Mão Colorida", sector: "mobiliario", website: "https://maocolorida.com/" },
  
  // Tecnologia
  { id: "global-led", name: "Global LED Experience", sector: "tecnologia", website: "https://www.globalledexperience.com/" },
  { id: "ledwave", name: "Ledwave", sector: "tecnologia", website: "https://ledwave.com.br/" },
  { id: "leyard", name: "Leyard", sector: "tecnologia", website: "https://leyard.com.br/" },
  { id: "the-led", name: "The LED", sector: "tecnologia", website: "https://theled.com.br/" },
  { id: "arvore-digital", name: "Árvore Digital", sector: "tecnologia", website: "https://arvoredigital.com.br/" },
  { id: "sesami", name: "Sesami Brasil", sector: "tecnologia", website: "https://www.sesami.io/pt-br" },
  
  // Serviços
  { id: "fast-construtora", name: "FAST Construtora", sector: "servicos", logo: "/associates/fast-construtora.png", website: "https://www.fastconstrutora.com.br" },
  { id: "renabian", name: "Renabian Engenharia", sector: "servicos", website: "https://www.renabian.com.br/" },
  { id: "fjf-advogados", name: "FJF Advogados", sector: "servicos" },
  { id: "gm7", name: "GM7", sector: "servicos", website: "https://www.gm7.com.br/" },
  { id: "cyberdoc", name: "Cyberdoc", sector: "servicos", website: "https://www.cyberdoc.com.br/" },
  
  // Iluminação
  { id: "alfalux", name: "Alfalux Iluminação", sector: "iluminacao", website: "https://alfalux.com.br/" },
  { id: "lemca", name: "Lemca Iluminação", sector: "iluminacao", website: "https://www.lemca.com.br/" },
  { id: "omega-light", name: "Omega Light", sector: "iluminacao", website: "https://www.omegalight.com.br/pt/" },
  
  // Comunicação Visual
  { id: "cyberdoc-cv", name: "Cyberdoc", sector: "comunicacao", website: "https://www.cyberdoc.com.br/" },
  { id: "mao-colorida-cv", name: "Mão Colorida", sector: "comunicacao", website: "https://maocolorida.com/" },
  
  // Arquitetura
  { id: "kt-arq", name: "KT Arquitetura", sector: "arquitetura", website: "https://kt.com.br/" },
  { id: "purchase", name: "Purchase Comunicação", sector: "arquitetura" },
  { id: "soudoug", name: "Estúdio Soudoug", sector: "arquitetura" },
  { id: "ppa", name: "PPA Motopar", sector: "arquitetura", website: "https://www.ppa.com.br/brasil" },
];

// Parceiros de Conhecimento
export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: "pesquisa",
    title: "Pesquisa & Desenvolvimento",
    icon: "🔬",
    description: "Estudos sobre tendências, comportamento do consumidor e inovação no ponto de venda",
    partners: [
      { id: "sbvc", name: "SBVC - Sociedade Brasileira de Varejo e Consumo" },
      { id: "ibevar", name: "IBEVAR - Instituto Brasileiro de Executivos de Varejo" },
    ],
  },
  {
    id: "formacao",
    title: "Formação & Capacitação",
    icon: "🎓",
    description: "Programas de treinamento, cursos e certificações para profissionais do setor",
    partners: [
      { id: "fgv", name: "FGV - Fundação Getúlio Vargas" },
      { id: "espm", name: "ESPM" },
    ],
  },
  {
    id: "mercado",
    title: "Análise de Mercado",
    icon: "📊",
    description: "Dados, métricas e inteligência de mercado para tomada de decisões estratégicas",
    partners: [
      { id: "euromonitor", name: "Euromonitor International" },
      { id: "nielsen", name: "NielsenIQ" },
    ],
  },
];

// Parceiros Internacionais por Região
export const internationalRegions: Region[] = [
  {
    id: "america-norte",
    name: "América do Norte",
    flag: "🇺🇸",
    partners: [
      { id: "nrf", name: "NRF - National Retail Federation", website: "https://nrf.com" },
      { id: "shop", name: "Shop! Association", website: "https://shopassociation.org" },
    ],
  },
  {
    id: "europa",
    name: "Europa",
    flag: "🇪🇺",
    partners: [
      { id: "euroshop", name: "EuroShop", website: "https://www.euroshop.de" },
      { id: "popai-europe", name: "POPAI Europe" },
    ],
  },
  {
    id: "asia-pacifico",
    name: "Ásia-Pacífico",
    flag: "🌏",
    partners: [
      { id: "retail-asia", name: "Retail Asia" },
      { id: "shop-japan", name: "Shop! Japan" },
    ],
  },
  {
    id: "america-latina",
    name: "América Latina",
    flag: "🌎",
    partners: [
      { id: "alshop", name: "ALSHOP - Associação Brasileira de Lojistas de Shopping" },
      { id: "abrasce", name: "ABRASCE" },
    ],
  },
];

// Estatísticas do Ecossistema
export const ecosystemStats = {
  partners: 150,
  states: 12,
  countries: 12,
  continents: 3,
  organizations: 25,
};

// Helper para obter label do badge
export function getBadgeLabel(badge: PartnerBadge): string {
  const labels: Record<PartnerBadge, string> = {
    fundador: "Parceiro Fundador",
    estrategico: "Parceiro Estratégico",
    ancora: "Parceiro Âncora",
  };
  return labels[badge];
}

// Helper para obter cor do badge
export function getBadgeColor(badge: PartnerBadge): string {
  const colors: Record<PartnerBadge, string> = {
    fundador: "bg-gradient-to-r from-amber-400 to-amber-500 text-white",
    estrategico: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    ancora: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
  };
  return colors[badge];
}

// Helper para obter iniciais
export function getPartnerInitials(name: string): string {
  return name
    .split(' ')
    .filter(word => word.length > 2 || word === word.toUpperCase())
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}
