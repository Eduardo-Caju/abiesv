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

// Setores de parceiros (para referência futura)
export const sectors = [
  { id: "conhecimento", name: "Conhecimento & Pesquisa", icon: "🎓" },
  { id: "internacional", name: "Alcance Global", icon: "🌎" },
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
