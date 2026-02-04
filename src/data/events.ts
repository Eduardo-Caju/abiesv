// Dados dos eventos de varejo 2026

export type EventType = "Feira" | "Congresso" | "Workshop" | "Evento ABIESV" | "Feriado";
export type EventSector = "Varejo" | "Tecnologia" | "Franquias" | "Moda e Beleza" | "E-commerce" | "Internacional" | "Multisetorial";

export interface RetailEvent {
  id: string;
  name: string;
  startDate: string; // ISO format YYYY-MM-DD
  endDate?: string;
  location?: string;
  city?: string;
  type: EventType;
  sector: EventSector;
  description?: string; // 100-200 caracteres
  registrationUrl?: string;
  isAbiestEvent?: boolean; // Eventos organizados/patrocinados pela ABIESV
  isHoliday?: boolean;
}

export const events: RetailEvent[] = [
  // Janeiro
  {
    id: "nrf-2026",
    name: "NRF Retail's Big Show",
    startDate: "2026-01-07",
    endDate: "2026-01-14",
    location: "Jacob K. Javits Convention Center",
    city: "Nova York, EUA",
    type: "Feira",
    sector: "Internacional",
    description: "Maior evento de varejo do mundo, reunindo líderes globais para debater tendências, tecnologias e o futuro do retail.",
    registrationUrl: "https://nrfbigshow.nrf.com/",
  },
  {
    id: "retail-trends-2026",
    name: "Retail Trends 2026 - Pós-NRF Gouvêa",
    startDate: "2026-01-27",
    location: "A definir",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Varejo",
    description: "Análise exclusiva das principais tendências apresentadas na NRF, traduzidas para o contexto do varejo brasileiro.",
    registrationUrl: "#",
  },
  // Fevereiro
  {
    id: "carnaval-2026",
    name: "Carnaval",
    startDate: "2026-02-14",
    endDate: "2026-02-17",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  {
    id: "euroshop-2026",
    name: "EuroShop",
    startDate: "2026-02-22",
    endDate: "2026-02-26",
    location: "Messe Düsseldorf",
    city: "Düsseldorf, Alemanha",
    type: "Feira",
    sector: "Internacional",
    description: "Principal feira mundial de equipamentos e tecnologia para o varejo, referência global em inovação para PDV.",
    registrationUrl: "https://www.euroshop.de/",
  },
  // Março/Abril
  {
    id: "autocom-2026",
    name: "Autocom",
    startDate: "2026-03-31",
    endDate: "2026-04-02",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Tecnologia",
    description: "Feira de automação comercial com foco em soluções de PDV, pagamentos, gestão e tecnologia para o varejo.",
    registrationUrl: "#",
  },
  {
    id: "sexta-santa-2026",
    name: "Sexta-feira Santa",
    startDate: "2026-04-03",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  {
    id: "websummit-rio-abril-2026",
    name: "Web Summit Rio",
    startDate: "2026-04-15",
    endDate: "2026-04-18",
    location: "Riocentro",
    city: "Rio de Janeiro, RJ",
    type: "Congresso",
    sector: "Tecnologia",
    description: "Conferência global de tecnologia e inovação, conectando startups, investidores e líderes do ecossistema digital.",
    registrationUrl: "https://rio.websummit.com/",
  },
  {
    id: "vtexday-2026",
    name: "VTEX DAY",
    startDate: "2026-04-16",
    endDate: "2026-04-17",
    location: "São Paulo Expo",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "E-commerce",
    description: "Maior evento de digital commerce da América Latina, reunindo marcas, tecnologias e estratégias omnichannel.",
    registrationUrl: "https://vtexday.com/",
  },
  {
    id: "tiradentes-2026",
    name: "Tiradentes",
    startDate: "2026-04-21",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  // Maio
  {
    id: "trabalho-2026",
    name: "Dia do Trabalho",
    startDate: "2026-05-01",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  {
    id: "bfshow-2026",
    name: "BF Show",
    startDate: "2026-05-18",
    endDate: "2026-05-20",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Moda e Beleza",
    description: "Feira de negócios para o setor de beleza e bem-estar, conectando indústria, varejo e profissionais.",
    registrationUrl: "#",
  },
  {
    id: "apas-2026",
    name: "APAS Show",
    startDate: "2026-05-18",
    endDate: "2026-05-21",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Varejo",
    description: "Maior evento supermercadista das Américas, reunindo toda a cadeia de abastecimento e varejo alimentar.",
    registrationUrl: "https://apasshow.com.br/",
  },
  // Junho
  {
    id: "corpus-christi-2026",
    name: "Corpus Christi",
    startDate: "2026-06-04",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  {
    id: "websummit-rio-junho-2026",
    name: "Web Summit Rio 2026",
    startDate: "2026-06-08",
    endDate: "2026-06-11",
    location: "Riocentro",
    city: "Rio de Janeiro, RJ",
    type: "Congresso",
    sector: "Tecnologia",
    description: "Edição de junho do Web Summit Rio, expandindo as conexões globais de tecnologia e inovação no Brasil.",
    registrationUrl: "https://rio.websummit.com/",
  },
  {
    id: "abf-2026",
    name: "ABF Franchising Expo",
    startDate: "2026-06-24",
    endDate: "2026-06-27",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Franquias",
    description: "Maior feira de franquias do mundo, apresentando oportunidades de negócios e modelos de expansão.",
    registrationUrl: "https://abfranchising.com.br/",
  },
  // Julho
  {
    id: "rev-constitucionalista-2026",
    name: "Revolução Constitucionalista",
    startDate: "2026-07-09",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
    description: "Feriado estadual em São Paulo.",
  },
  {
    id: "forum-ecommerce-2026",
    name: "Fórum E-Commerce Brasil",
    startDate: "2026-07-28",
    endDate: "2026-07-30",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "E-commerce",
    description: "Principal evento de e-commerce do Brasil, com conteúdo, networking e soluções para o varejo digital.",
    registrationUrl: "https://www.ecommercebrasil.com.br/forum/",
  },
  // Agosto
  {
    id: "ledforum-2026",
    name: "LED Forum",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    location: "A definir",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Tecnologia",
    description: "Fórum especializado em tecnologia LED, digital signage e comunicação visual para varejo e arquitetura.",
    registrationUrl: "#",
  },
  // Setembro
  {
    id: "beauty-fair-2026",
    name: "Beauty Fair",
    startDate: "2026-09-05",
    endDate: "2026-09-08",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Moda e Beleza",
    description: "Maior feira de beleza das Américas, conectando indústria, varejo e profissionais do setor cosmético.",
    registrationUrl: "https://www.beautyfair.com.br/",
  },
  {
    id: "independencia-2026",
    name: "Independência do Brasil",
    startDate: "2026-09-07",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  {
    id: "conarec-2026",
    name: "CONAREC",
    startDate: "2026-09-23",
    endDate: "2026-09-24",
    location: "Expo Transamérica",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Varejo",
    description: "Maior congresso de experiência do cliente e CX do Brasil, focado em relacionamento e fidelização.",
    registrationUrl: "https://conarec.com.br/",
  },
  {
    id: "latam-retail-2026",
    name: "Latam Retail Show",
    startDate: "2026-09-15",
    endDate: "2026-09-17",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Varejo",
    description: "Principal evento B2B do varejo latino-americano, reunindo toda a cadeia de valor do setor.",
    registrationUrl: "https://latamretailshow.com.br/",
  },
  // Outubro
  {
    id: "futurecom-2026",
    name: "Futurecom",
    startDate: "2026-10-06",
    endDate: "2026-10-08",
    location: "São Paulo Expo",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Tecnologia",
    description: "Principal evento de tecnologia, telecom e inovação digital do Brasil, conectando setores e negócios.",
    registrationUrl: "https://www.futurecom.com.br/",
  },
  {
    id: "aparecida-2026",
    name: "Nossa Senhora Aparecida",
    startDate: "2026-10-12",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  {
    id: "varejo-summit-2026",
    name: "Varejo Summit",
    startDate: "2026-10-15",
    endDate: "2026-10-16",
    location: "A definir",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Varejo",
    description: "Summit executivo com líderes do varejo brasileiro discutindo estratégias e tendências do setor.",
    registrationUrl: "#",
  },
  {
    id: "bconnected-2026",
    name: "Bconnected",
    startDate: "2026-10-20",
    location: "Teatro Santander",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Varejo",
    description: "Evento focado em conexões e networking estratégico entre líderes e profissionais do ecossistema de varejo.",
    registrationUrl: "#",
  },
  // Novembro
  {
    id: "finados-2026",
    name: "Finados",
    startDate: "2026-11-02",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  {
    id: "consciencia-negra-2026",
    name: "Consciência Negra",
    startDate: "2026-11-20",
    type: "Feriado",
    sector: "Multisetorial",
    isHoliday: true,
  },
  // Eventos ABIESV (destaque)
  {
    id: "backstage-sp-2026",
    name: "Backstage do Varejo — São Paulo",
    startDate: "2026-03-15",
    location: "A definir",
    city: "São Paulo, SP",
    type: "Evento ABIESV",
    sector: "Varejo",
    description: "Evento itinerante da ABIESV que conecta indústria, serviços e varejo através de conteúdo exclusivo e networking.",
    registrationUrl: "/eventos/backstage-do-varejo",
    isAbiestEvent: true,
  },
  {
    id: "backstage-rj-2026",
    name: "Backstage do Varejo — Rio de Janeiro",
    startDate: "2026-06-20",
    location: "A definir",
    city: "Rio de Janeiro, RJ",
    type: "Evento ABIESV",
    sector: "Varejo",
    description: "Edição carioca do Backstage do Varejo, levando conhecimento e conexões para o mercado do Rio.",
    registrationUrl: "/eventos/backstage-do-varejo",
    isAbiestEvent: true,
  },
  {
    id: "workshop-vm-2026",
    name: "Workshop Visual Merchandising",
    startDate: "2026-04-25",
    location: "Online",
    city: "Online",
    type: "Evento ABIESV",
    sector: "Varejo",
    description: "Capacitação prática em VM com especialistas do mercado. Técnicas, tendências e cases de sucesso.",
    registrationUrl: "/eventos/workshops",
    isAbiestEvent: true,
  },
  {
    id: "workshop-iluminacao-2026",
    name: "Workshop Iluminação para Varejo",
    startDate: "2026-08-15",
    location: "Online",
    city: "Online",
    type: "Evento ABIESV",
    sector: "Varejo",
    description: "Workshop sobre projetos luminotécnicos para PDV, eficiência energética e valorização de produtos.",
    registrationUrl: "/eventos/workshops",
    isAbiestEvent: true,
  },
];

// Tipos de eventos para filtros
export const eventTypes: EventType[] = ["Evento ABIESV", "Feira", "Congresso", "Workshop"];
export const eventSectors: EventSector[] = ["Varejo", "Tecnologia", "E-commerce", "Franquias", "Moda e Beleza", "Internacional", "Multisetorial"];

// Helpers
export function getUpcomingEvents(limit?: number): RetailEvent[] {
  const today = new Date().toISOString().split('T')[0];
  const upcoming = events
    .filter(e => !e.isHoliday && e.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getAbiestEvents(): RetailEvent[] {
  return events.filter(e => e.isAbiestEvent);
}

export function getEventsByMonth(month: number, year: number = 2026): RetailEvent[] {
  const monthStr = month.toString().padStart(2, '0');
  return events.filter(e => e.startDate.startsWith(`${year}-${monthStr}`));
}

export function formatEventDate(event: RetailEvent): string {
  const start = new Date(event.startDate + 'T00:00:00');
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  
  if (event.endDate) {
    const end = new Date(event.endDate + 'T00:00:00');
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} a ${end.toLocaleDateString('pt-BR', options)}`;
    }
    return `${start.toLocaleDateString('pt-BR', options)} a ${end.toLocaleDateString('pt-BR', options)}`;
  }
  
  return start.toLocaleDateString('pt-BR', options);
}

export function getEventById(id: string): RetailEvent | undefined {
  return events.find(e => e.id === id);
}
