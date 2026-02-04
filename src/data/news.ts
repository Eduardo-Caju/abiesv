export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl: string;
  date: string;
  dateISO: string;
  category: string;
  sector: string;
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "nrf-2026-omnichannel-base-operacional",
    title: "NRF 2026: Omnichannel deixa de ser tendência para se tornar base operacional do varejo",
    excerpt: "A NRF 2026 consolidou que o omnichannel não é mais diferencial, mas sim obrigação operacional. Destaque para o case da Dick's Sporting Goods, onde mais de 80% dos pedidos online são atendidos pelas lojas físicas.",
    source: "Varejo S.A - CNDL",
    sourceUrl: "https://cndl.org.br/varejosa/omnichannel-deixou-de-ser-tendencia-para-se-tornar-base-operacional-do-varejo/",
    date: "14 de Janeiro de 2026",
    dateISO: "2026-01-14",
    category: "Tendências",
    sector: "Omnichannel",
    featured: true,
  },
  {
    slug: "varejo-2026-tecnologia-experiencia-proposito",
    title: "Varejo em 2026: tecnologia, experiência e propósito como pilares de crescimento",
    excerpt: "Inovação digital, omnichannel avançado e sustentabilidade se consolidam como pontos estratégicos para o varejo brasileiro. A integração entre canais físicos e digitais e o uso de dados ganham papel central.",
    source: "Jornal do Brás",
    sourceUrl: "https://jornaldobras.com.br/noticia/107146/varejo-em-2026-tecnologia-experiencia-e-proposito-como-pilares-de-crescimento",
    date: "13 de Janeiro de 2026",
    dateISO: "2026-01-13",
    category: "Tendências",
    sector: "Estratégia",
  },
  {
    slug: "nrf-2026-integracao-silenciosa",
    title: "NRF 2026: O varejo entra na era da integração silenciosa",
    excerpt: "O ponto de venda físico assume funções ampliadas de logística, mídia e dados. A loja física se consolida como infraestrutura crítica do omnichannel, com impacto direto na eficiência operacional.",
    source: "Meio & Mensagem",
    sourceUrl: "https://www.meioemensagem.com.br/nrf/conexao-nova-york/integracao-silenciosa",
    date: "12 de Janeiro de 2026",
    dateISO: "2026-01-12",
    category: "Tendências",
    sector: "Omnichannel",
  },
  {
    slug: "tendencias-visual-merchandising-2026",
    title: "Tendências de Visual Merchandising para 2026: modular, sensorial e sustentável",
    excerpt: "O visual merchandising de 2026 será marcado por flexibilidade modular, materiais sustentáveis, integração digital com QR codes e telas interativas, além de microzonas de imersão sensorial.",
    source: "Display Style",
    sourceUrl: "https://displaystyle.com.br/blog/tendencias-de-visual-merchandising-para-2026/",
    date: "10 de Janeiro de 2026",
    dateISO: "2026-01-10",
    category: "Visual Merchandising",
    sector: "PDV",
    featured: true,
  },
  {
    slug: "retail-media-loja-fisica-vira-midia",
    title: "Retail Media: quando a loja física vira mídia",
    excerpt: "A loja física está se tornando o 'meio' mais valioso do DOOH, adicionando dados comportamentais e capacidade de mensuração. Retail media se torna motor de lucro e nova fonte de receita.",
    source: "Meio & Mensagem",
    sourceUrl: "https://www.meioemensagem.com.br/nrf/quando-a-loja-vira-midia-retail-media-entra-em-fase-decisiva",
    date: "11 de Janeiro de 2026",
    dateISO: "2026-01-11",
    category: "Tecnologia",
    sector: "Retail Media",
  },
  {
    slug: "inteligencia-artificial-linha-frente-varejo",
    title: "Inteligência Artificial assume a linha de frente do varejo",
    excerpt: "A IA deixa de ser novidade visível para se consolidar como infraestrutura silenciosa que conecta dados, canais e operações. O 'Agentic Commerce' redefine a jornada de compra.",
    source: "Valor Econômico",
    sourceUrl: "https://valor.globo.com/impresso/noticia/2026/01/14/inteligencia-artificial-assume-a-linha-de-frente-do-varejo.ghtml",
    date: "14 de Janeiro de 2026",
    dateISO: "2026-01-14",
    category: "Tecnologia",
    sector: "Inteligência Artificial",
  },
  {
    slug: "loja-fisica-hub-experiencias",
    title: "A loja física como hub de experiências: o varejo que vai além da venda",
    excerpt: "Lojas físicas funcionam como hubs de experiências, oferecendo vivências que criam conexão emocional. Cases como Nespresso, LEGO e Tomorrowland Store mostram espaços como plataformas de experimentação.",
    source: "Varejo S.A - CNDL",
    sourceUrl: "https://cndl.org.br/varejosa/a-loja-fisica-como-hub-de-experiencias-o-varejo-que-vai-alem-da-venda/",
    date: "09 de Janeiro de 2026",
    dateISO: "2026-01-09",
    category: "Experiência",
    sector: "PDV",
  },
  {
    slug: "sustentabilidade-modo-execucao-2026",
    title: "Sustentabilidade entra no modo execução e redefine gestão dos negócios em 2026",
    excerpt: "ESG deixa de ser narrativa institucional e passa a exigir práticas reais. A sustentabilidade se torna critério para conseguir crédito, fechar contratos e conquistar clientes.",
    source: "Fecomércio SP",
    sourceUrl: "https://www.fecomercio.com.br/noticia/sustentabilidade-entra-no-modo-execucao-e-redefine-gestao-dos-negocios-em-2026",
    date: "08 de Janeiro de 2026",
    dateISO: "2026-01-08",
    category: "Sustentabilidade",
    sector: "ESG",
  },
  {
    slug: "relatorio-varejo-2026-ia-integracao",
    title: "Relatório do Varejo 2026: integração de canais e soluções de IA serão decisivas",
    excerpt: "A evolução das estratégias omnichannel e a ascensão de novas tecnologias de IA estão entre os movimentos que devem moldar o varejo. Personalização em escala e retail media se tornam prioridades.",
    source: "Adyen",
    sourceUrl: "https://www.adyen.com/pt_BR/centro-de-conhecimento/solucoes-ia-decisivas-varejo",
    date: "07 de Janeiro de 2026",
    dateISO: "2026-01-07",
    category: "Tendências",
    sector: "Tecnologia",
  },
  {
    slug: "tendencias-desafios-varejo-alimentar-2026",
    title: "Tendências e desafios para o varejo alimentar em 2026",
    excerpt: "Competição phygital, uso da inteligência artificial e foco na experiência do cliente são algumas das tendências. A integração tecnológica no PDV e a transformação de lojas em centros de dados ganham relevância.",
    source: "Rocken Cantech",
    sourceUrl: "https://rockencantech.com.br/tendencias-e-desafios-para-o-varejo-alimentar-em-2026/",
    date: "06 de Janeiro de 2026",
    dateISO: "2026-01-06",
    category: "Tendências",
    sector: "Alimentar",
  },
  {
    slug: "comunicacao-visual-2026-tendencias",
    title: "Comunicação Visual 2026: Tendências que decidem o mercado",
    excerpt: "A nova era da impressão traz produtividade, versatilidade e agilidade como vantagem competitiva. Soluções avançadas de impressão digital e comunicação visual se consolidam como diferenciais para o PDV.",
    source: "Serilon",
    sourceUrl: "https://serilon.com.br/blog/comunicacao-visual-2026-tendencias-que-decidem-o-mercado/",
    date: "05 de Janeiro de 2026",
    dateISO: "2026-01-05",
    category: "Visual Merchandising",
    sector: "Comunicação Visual",
  },
  {
    slug: "5-tendencias-nrf-2026-varejo-brasileiro",
    title: "5 tendências da NRF 2026 para o varejo brasileiro",
    excerpt: "Comércio agêntico muda quem decide a compra; dados limpos valem mais que modelos avançados; consumidor não enxerga canal, apenas experiência fluida; IA generativa sai do laboratório para o chão de loja.",
    source: "Varejo S.A - CNDL",
    sourceUrl: "https://cndl.org.br/varejosa/5-tendencias-nrf-2026-varejo-brasileiro/",
    date: "15 de Janeiro de 2026",
    dateISO: "2026-01-15",
    category: "Tendências",
    sector: "Estratégia",
    featured: true,
  },
];

// Get unique categories
export function getNewsCategories(): string[] {
  const categories = new Set(newsArticles.map((article) => article.category));
  return Array.from(categories).sort();
}

// Get unique sectors
export function getNewsSectors(): string[] {
  const sectors = new Set(newsArticles.map((article) => article.sector));
  return Array.from(sectors).sort();
}

// Get featured articles
export function getFeaturedNews(): NewsArticle[] {
  return newsArticles.filter((article) => article.featured);
}

// Get recent articles (sorted by date)
export function getRecentNews(limit?: number): NewsArticle[] {
  const sorted = [...newsArticles].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}
