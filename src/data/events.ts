// Dados dos eventos de varejo 2026

export type EventType = "Feira" | "Congresso" | "Workshop" | "Evento ABIESV" | "Feriado";
export type EventSector =
  | "Varejo"
  | "Tecnologia"
  | "Franquias"
  | "Moda e Beleza"
  | "E-commerce"
  | "Internacional"
  | "Multisetorial"
  | "Construção"
  | "Casa e Decoração";

export interface RetailEvent {
  id: string;
  name: string;
  startDate: string; // ISO format YYYY-MM-DD
  endDate?: string;
  location?: string;
  city?: string;
  type: EventType;
  sector: EventSector;
  description?: string;
  registrationUrl?: string;
  isAbiestEvent?: boolean;
  isHoliday?: boolean;
}

export const events: RetailEvent[] = [
  {
    id: "bett-brasil-2026",
    name: "Bett Brasil",
    startDate: "2026-05-05",
    endDate: "2026-05-08",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Tecnologia",
    description: "Maior evento de inovação e tecnologia para educação na América Latina, abordando edtechs, gestão, inteligência artificial e transformação digital.",
    registrationUrl: "https://brasil.bettshow.com/",
  },
  {
    id: "apas-show-2026",
    name: "APAS Show",
    startDate: "2026-05-18",
    endDate: "2026-05-21",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Varejo",
    description: "Maior feira supermercadista das Américas, reunindo varejo alimentar, atacarejo, foodservice, indústria e soluções para o ponto de venda.",
    registrationUrl: "https://www.apasshow.com/",
  },
  {
    id: "enic-2026",
    name: "ENIC – Encontro Nacional da Indústria da Construção",
    startDate: "2026-05-19",
    endDate: "2026-05-21",
    location: "Distrito Anhembi",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Construção",
    description: "O evento mais importante da indústria da construção, reunindo lideranças, especialistas e empresas do setor.",
    registrationUrl: "https://cbic.org.br/enic/",
  },
  {
    id: "feira-brasileira-varejo-2026",
    name: "Feira Brasileira do Varejo",
    startDate: "2026-05-20",
    endDate: "2026-05-22",
    city: "Porto Alegre, RS",
    type: "Feira",
    sector: "Varejo",
    description: "Evento voltado a varejo, inovação, empreendedorismo e gestão, reunindo empresários, especialistas e soluções para o crescimento dos negócios no Brasil.",
    registrationUrl: "https://feirabrasileiradovarejo.com.br/",
  },
  {
    id: "rio2c-2026",
    name: "Rio2C",
    startDate: "2026-05-26",
    endDate: "2026-05-31",
    city: "Rio de Janeiro, RJ",
    type: "Congresso",
    sector: "Multisetorial",
    description: "Evento de criatividade e inovação que conecta audiovisual, música, marketing, tecnologia e economia criativa, com forte presença de marcas e produtores de conteúdo.",
    registrationUrl: "https://www.rio2c.com/",
  },
  {
    id: "construsul-bc-2026",
    name: "Feira Construsul BC",
    startDate: "2026-05-26",
    endDate: "2026-05-29",
    location: "Expocentro",
    city: "Balneário Camboriú, SC",
    type: "Feira",
    sector: "Construção",
    description: "O Circuito Construsul chega para fazer parte da Construsul BC, com palestras, painéis e debates de alto nível com grandes nomes da construção civil e da arquitetura.",
    registrationUrl: "https://feiraconstrusulbc.com.br/home/",
  },
  {
    id: "websummit-rio-2026",
    name: "Web Summit Rio",
    startDate: "2026-06-08",
    endDate: "2026-06-11",
    city: "Rio de Janeiro, RJ",
    type: "Congresso",
    sector: "Tecnologia",
    description: "Conecta uma nova geração de fundadores do Brasil e de toda a América Latina com investidores, jornalistas e líderes de tecnologia de todo o mundo.",
    registrationUrl: "https://rio.websummit.com/pt-br/",
  },
  {
    id: "expo-construcao-offsite-2026",
    name: "Expo Construção Offsite",
    startDate: "2026-06-16",
    endDate: "2026-06-19",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Construção",
    description: "Maior evento de construção modular offsite da América Latina, com tecnologias, palestras e novas conexões para o setor de construção.",
    registrationUrl: "https://www.expoconstrucaooffsite.com.br/",
  },
  {
    id: "interior-lifestyle-2026",
    name: "Interior Lifestyle South America",
    startDate: "2026-06-22",
    endDate: "2026-06-25",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Casa e Decoração",
    description: "Evento com tendências em design de interiores, decoração e lifestyle. O ponto de encontro para o mercado premium na América Latina.",
    registrationUrl: "https://interiorlifestyle.com.br/",
  },
  {
    id: "abf-franchising-2026",
    name: "ABF Franchising Expo",
    startDate: "2026-06-24",
    endDate: "2026-06-27",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Franquias",
    description: "Marcas em expansão, conversa direta com as redes e comparação de modelos de franquia. Quatro dias com centenas de marcas expositoras, conteúdo especializado e milhares de empreendedores.",
    registrationUrl: "https://www.abfexpo.com.br/",
  },
  {
    id: "exposhopping-2026",
    name: "ExpoShopping",
    startDate: "2026-06-24",
    endDate: "2026-06-26",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Varejo",
    description: "Maior feira da América Latina voltada ao setor de shopping centers e varejo, reunindo expositores, investidores, varejistas e empreendedores para debater tendências, tecnologia, gestão e negócios.",
    registrationUrl: "https://congresso.abrasce.com.br/",
  },
  {
    id: "forum-ecommerce-brasil-2026",
    name: "Fórum E-Commerce Brasil",
    startDate: "2026-07-28",
    endDate: "2026-07-30",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "E-commerce",
    description: "Maior evento de e-commerce da América Latina. Reúne mais de 45 mil profissionais em três dias de conteúdo estratégico, networking e negócios.",
    registrationUrl: "https://doity.com.br/forum-2026",
  },
  {
    id: "scanntech-inmotion-2026",
    name: "Scanntech (In) Motion",
    startDate: "2026-08-05",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Varejo",
    description: "Evento estratégico de performance em dados que conecta líderes de varejo para transformar inteligência em ação.",
    registrationUrl: "https://www.scanntech.com.br/inmotion/",
  },
  {
    id: "rio-innovation-week-2026",
    name: "Rio Innovation Week",
    startDate: "2026-08-04",
    endDate: "2026-08-07",
    city: "Rio de Janeiro, RJ",
    type: "Congresso",
    sector: "Tecnologia",
    description: "Maior conferência global de tecnologia e inovação, com experiências, conexões e conteúdos que democratizam o acesso à tecnologia e à inovação.",
    registrationUrl: "https://www.dateahome.com/it-IT/events/rio-innovation-week-2026",
  },
  {
    id: "home-show-brazil-2026",
    name: "Home Show Brazil",
    startDate: "2026-08-11",
    endDate: "2026-08-13",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Casa e Decoração",
    description: "Evento B2B de utilidades domésticas e decoração. Tendências globais e parcerias diretas com grandes fabricantes.",
    registrationUrl: "https://www.homeshowbrazil.com/",
  },
  {
    id: "abcasa-2026",
    name: "AB Casa",
    startDate: "2026-08-12",
    endDate: "2026-08-15",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Casa e Decoração",
    description: "Maior feira da América Latina nos setores de casa e decoração — referência para decoração, presentes, utilidades domésticas, festas, papelaria, flores e têxteis. Exclusiva para lojistas e profissionais.",
    registrationUrl: "https://www.abcasa.org.br/abcasa-fair",
  },
  {
    id: "concrete-show-2026",
    name: "Concrete Show",
    startDate: "2026-08-25",
    endDate: "2026-08-27",
    location: "São Paulo Expo",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Construção",
    description: "Tecnologia, inovação e negócios conectando toda a cadeia construtiva do concreto. Integrante do circuito World of Concrete, com conteúdo técnico, networking e tendências.",
    registrationUrl: "https://www.concreteshow.com.br/",
  },
  {
    id: "omni-varejo-2026",
    name: "Omni Varejo",
    startDate: "2026-08-27",
    endDate: "2026-08-29",
    city: "João Pessoa, PB",
    type: "Congresso",
    sector: "Varejo",
    description: "Maior encontro do varejo nacional, com palestras, painéis e momentos de interação que conectam inovação, estratégia e tendências globais.",
    registrationUrl: "https://omnivarejo2026.com.br/",
  },
  {
    id: "aws-summit-2026",
    name: "AWS Summit",
    startDate: "2026-09-02",
    endDate: "2026-09-03",
    location: "São Paulo Expo",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Tecnologia",
    description: "Evento de tecnologia focado em computação em nuvem, com líderes do setor, especialistas da AWS, sessões alinhadas ao negócio, workshops, casos de clientes e networking.",
    registrationUrl: "https://aws.amazon.com/pt/events/summits/sao-paulo/",
  },
  {
    id: "latam-retail-show-2026",
    name: "Latam Retail Show 2026",
    startDate: "2026-09-15",
    endDate: "2026-09-17",
    location: "Anhembi",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Varejo",
    description: "Plataforma essencial de conteúdo e conexões organizada pela Gouvêa Experience, reunindo líderes para debater as transformações do mercado brasileiro e latino-americano.",
    registrationUrl: "https://www.latamretailshow.com.br/",
  },
  {
    id: "expolux-2026",
    name: "Expolux",
    startDate: "2026-09-15",
    endDate: "2026-09-18",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Casa e Decoração",
    description: "Principal feira internacional da indústria da iluminação da América Latina. Reúne expositores, profissionais, arquitetos e designers em torno de iluminação técnica e decorativa.",
    registrationUrl: "https://www.expolux.com.br/pt-br/o-evento.html",
  },
  {
    id: "conarec-2026",
    name: "Conarec",
    startDate: "2026-09-23",
    endDate: "2026-09-24",
    location: "Transamerica Expo Center",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Varejo",
    description: "Maior evento de Experiência do Cliente (CX) do mundo, focado no relacionamento entre marcas e consumidores, inovações, tecnologia, IA e estratégias de CX.",
    registrationUrl: "https://conarec.com.br/",
  },
  {
    id: "universo-totvs-2026",
    name: "Universo TOTVS",
    startDate: "2026-10-13",
    endDate: "2026-10-14",
    location: "Expo Center Norte",
    city: "São Paulo, SP",
    type: "Congresso",
    sector: "Tecnologia",
    description: "Maior evento de tecnologia e negócios do Brasil. Espaço para explorar conteúdos, descobrir pontos de vista, encontrar inovação e estabelecer conexões.",
    registrationUrl: "https://universo.totvs.com/",
  },
  {
    id: "construlev-expo-2026",
    name: "Construlev Expo",
    startDate: "2026-10-14",
    endDate: "2026-10-16",
    location: "São Paulo Expo",
    city: "São Paulo, SP",
    type: "Feira",
    sector: "Construção",
    description: "Encontro focado em soluções inovadoras e tecnológicas para construção leve, reunindo profissionais, empresas e especialistas para apresentar tendências, produtos e sistemas construtivos modernos.",
    registrationUrl: "https://construlevexpo.com.br/",
  },
];

// Tipos de eventos para filtros
export const eventTypes: EventType[] = ["Evento ABIESV", "Feira", "Congresso", "Workshop"];
export const eventSectors: EventSector[] = [
  "Varejo",
  "Tecnologia",
  "E-commerce",
  "Construção",
  "Casa e Decoração",
  "Franquias",
  "Moda e Beleza",
  "Internacional",
  "Multisetorial",
];

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
