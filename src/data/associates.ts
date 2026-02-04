// Dados dos associados ABIESV (extraídos da base oficial)

export interface Associate {
  slug: string;
  name: string;
  tradingName: string;
  cnpj: string;
  category: string;
  contacts: {
    name: string;
    role: string;
    phone?: string;
    mobile?: string;
    email?: string;
  }[];
  joinedDate: string;
  // Campos para preenchimento pelo associado
  shortDescription?: string; // 150-200 caracteres
  fullDescription?: string;  // 500-800 caracteres
  website?: string;
  linkedin?: string;
  instagram?: string;
  logo?: string;             // Caminho para o logo
  solutions?: string[];      // Tags de soluções oferecidas
  sectors?: string[];        // Setores atendidos
  city?: string;
  state?: string;
}

export const associates: Associate[] = [
  {
    slug: "alfalux-iluminacao",
    name: "Alfalux Iluminação",
    tradingName: "Alfalux Iluminação EIRELI",
    cnpj: "12.970.897/0001-65",
    category: "Iluminação",
    joinedDate: "2025-06-06",
    contacts: [
      { name: "Rafael Cunha", role: "Gerente de Marketing", phone: "11 5666-4857", mobile: "85 9713-5126", email: "marketing@alfalux.com.br" }
    ],
    shortDescription: "Soluções em iluminação LED para ambientes comerciais e varejo, com foco em eficiência energética e valorização de produtos.",
    state: "SP",
    solutions: ["LED", "Iluminação Comercial", "Eficiência Energética"],
    sectors: ["Varejo", "Moda", "Supermercados"],
  },
  {
    slug: "amarilis-formigoni",
    name: "Amarilis Formigoni",
    tradingName: "Amarilis Formigoni de Oliveira",
    cnpj: "180.626.928-76",
    category: "Especificadora",
    joinedDate: "2018-09-08",
    contacts: [
      { name: "Amarilis Formigoni", role: "Especificadora", mobile: "11-98410-9414", email: "amarilis.oliveira@tarkett.com" }
    ],
    shortDescription: "Consultoria especializada em especificação de materiais e soluções para projetos de varejo e ambientes comerciais.",
    state: "SP",
    solutions: ["Especificação", "Consultoria", "Projetos"],
    sectors: ["Varejo", "Comercial"],
  },
  {
    slug: "arvore-digital",
    name: "Árvore Digital",
    tradingName: "Belgica Digital EIRELI",
    cnpj: "28.997.850/0001-25",
    category: "Conteúdo Digital",
    joinedDate: "2023-03-31",
    contacts: [
      { name: "Marcos Xavier", role: "CEO", phone: "11 5171-7600", mobile: "11 98414-8118", email: "marcos.xavier@arvore-digital.com" },
      { name: "Diego Aguiar", role: "Gerente de atendimento", phone: "11 5171-7600" }
    ],
    shortDescription: "Produção de conteúdo digital e soluções multimídia para comunicação visual no ponto de venda e ambientes comerciais.",
    state: "SP",
    solutions: ["Digital Signage", "Conteúdo Multimídia", "Comunicação Visual"],
    sectors: ["Varejo", "Shopping Centers", "Redes"],
  },
  {
    slug: "creative-display",
    name: "Creative Display",
    tradingName: "Creative Display Indústria e Comércio LTDA",
    cnpj: "02.175.187/0001-90",
    category: "Mobiliário e Equipamentos",
    joinedDate: "2019-08-15",
    contacts: [
      { name: "Andreia Taba", role: "Diretora", phone: "11-4646-7500", mobile: "11-99255-8787", email: "andreia@creativedisplay.com.br" },
      { name: "Sérgio Shimada", role: "Diretor Comercial", phone: "11-4646-7500", mobile: "11 98837-1297", email: "shimada@creativedisplay.com.br" },
      { name: "Álvaro Taba", role: "Diretor", phone: "11-4646-7500", mobile: "11-99988-7500", email: "alvaro@creativedisplay.com.br" }
    ],
    shortDescription: "Indústria especializada em mobiliário, displays e equipamentos para PDV, com soluções personalizadas para grandes redes varejistas.",
    state: "SP",
    solutions: ["Mobiliário", "Displays", "Expositores", "Equipamentos PDV"],
    sectors: ["Varejo", "Moda", "Cosméticos", "Farmácias"],
  },
  {
    slug: "cyberdoc",
    name: "Cyberdoc",
    tradingName: "Cyberdoc Document Center - Central de Documentos Eletrônicos e Com. Papeis LTDA",
    cnpj: "02.499.405/0001-41",
    category: "Gráfica Digital",
    joinedDate: "2015-04-28",
    contacts: [
      { name: "Alexandre Abreu", role: "Gestor", phone: "19-3325-9169", mobile: "19-99368-9783", email: "alexandre@cyberdoc.com.br" },
      { name: "Israel Geraldi", role: "CEO", email: "israel@cyberdoc.com.br" }
    ],
    shortDescription: "Gráfica digital especializada em comunicação visual, impressão de grande formato e soluções gráficas para PDV.",
    state: "SP",
    city: "Campinas",
    solutions: ["Impressão Digital", "Comunicação Visual", "Grande Formato"],
    sectors: ["Varejo", "Eventos", "PDV"],
  },
  {
    slug: "estudio-soudoug",
    name: "Estúdio Soudoug",
    tradingName: "Douglas de Souza",
    cnpj: "309.323.098-52",
    category: "Visual Merchandising",
    joinedDate: "2020-07-20",
    contacts: [
      { name: "Douglas de Souza", role: "CEO", mobile: "11 98359-2057", email: "estudiosoudoug@gmail.com" }
    ],
    shortDescription: "Consultoria e projetos de visual merchandising para varejo de moda, lifestyle e experiências de marca no PDV.",
    state: "SP",
    solutions: ["Visual Merchandising", "Vitrinismo", "Store Design"],
    sectors: ["Moda", "Lifestyle", "Luxo"],
  },
  {
    slug: "expor-manequins",
    name: "Expor Manequins",
    tradingName: "Expor Manequins, Displays e Acessórios LTDA",
    cnpj: "62.412.564/0001-99",
    category: "Fabricação de Manequins e Displays",
    joinedDate: "2003-08-19",
    contacts: [
      { name: "Marcos Andrade", role: "Diretor de Marketing", phone: "11-3887-3205", mobile: "11-99290-4412", email: "marcos@expor.com" },
      { name: "Octaviano Andrade", role: "", phone: "11-3887-3205", mobile: "11-99300-9135", email: "octaviano@expor.com" }
    ],
    shortDescription: "Fabricante de manequins, displays e acessórios para visual merchandising, atendendo grandes redes há mais de 20 anos.",
    state: "SP",
    solutions: ["Manequins", "Displays", "Acessórios VM", "Bustos"],
    sectors: ["Moda", "Varejo", "Departamentos"],
  },
  {
    slug: "fast-gerenciamento",
    name: "Fast Gerenciamento e Construtora",
    tradingName: "Fast Qualy Gerenciamento de Obras LTDA",
    cnpj: "11.276.915/0001-40",
    category: "Construção Civil",
    joinedDate: "2011-08-15",
    contacts: [
      { name: "Eduardo Aguiar", role: "Diretor", phone: "11-3034-3210", mobile: "11-98475-0205", email: "eduardo@fastconstrutora.com.br" },
      { name: "Felipe Magrini", role: "Sócio Diretor", phone: "11-3034-3210", mobile: "11-98475-0195", email: "felipe@fastgerenciadora.com.br" }
    ],
    shortDescription: "Especialista em obras rápidas para varejo e corporativo, a FAST entrega soluções end‑to‑end — do projeto à inauguração — com transparência, pontualidade e cobertura nacional.",
    fullDescription: "A FAST Construtora é referência em obras rápidas para varejo e ambientes corporativos, com 15+ anos de mercado, 1.100+ obras entregues e mais de 1 milhão de m² construídos em todo o Brasil. Atuamos no modelo turnkey, integrando todo o ciclo do projeto à inauguração: projetos técnicos, obra civil completa, instalações elétricas, hidráulicas, HVAC e PCI, mezaninos, acabamentos, mobiliário, comunicação visual e luminárias. Nossa metodologia de transparência garante orçamento detalhado, cronograma realista, relatórios fotográficos semanais, termo de entrega e guia de uso. Entregamos padrão, previsibilidade e velocidade — reduzindo riscos, evitando retrabalhos e preservando o capital de giro do cliente (com opção de parcelamento em até 36x via parceiro financeiro).",
    website: "https://www.fastconstrutora.com.br",
    linkedin: "https://www.linkedin.com/company/fast-construtora/",
    instagram: "https://www.instagram.com/fastconstrutora/",
    logo: "/associates/fast-construtora.png",
    state: "SP",
    solutions: ["Obras rápidas", "Turnkey (do projeto à inauguração)", "Projetos técnicos", "Gestão de obras", "Instalações elétricas e HVAC", "Parcelamento em até 36x"],
    sectors: ["Varejo", "Corporativo", "Shoppings", "Hotéis"],
  },
  {
    slug: "fjf-advogados",
    name: "Fernando José Fernandes Advogados",
    tradingName: "Fernando José Fernandes Advogados",
    cnpj: "61.181.285/0001-07",
    category: "Escritório de Advocacia",
    joinedDate: "2003-08-19",
    contacts: [
      { name: "Fernando José Fernandes Junior", role: "Sócio Diretor - Advogado", phone: "11-3032-2144", mobile: "11-99983-3676", email: "fj.fernandes@fjf.com.br" }
    ],
    shortDescription: "Escritório de advocacia especializado em direito empresarial, contratos comerciais e assessoria jurídica para o setor varejista.",
    state: "SP",
    solutions: ["Assessoria Jurídica", "Contratos", "Direito Empresarial"],
    sectors: ["Varejo", "Indústria", "Serviços"],
  },
  {
    slug: "atual-pdv",
    name: "Atual PDV",
    tradingName: "GB Instalações Comerciais LTDA",
    cnpj: "26.831.249/0001-32",
    category: "Fabricação de Móveis",
    joinedDate: "2025-12-04",
    contacts: [
      { name: "Gustavo Motta", role: "Diretor Executivo", mobile: "17 98111-1368", email: "gustavo.motta@atualpdv.com.br" }
    ],
    shortDescription: "Fabricação de móveis e instalações comerciais para PDV, com soluções sob medida para lojas e ambientes de varejo.",
    state: "SP",
    solutions: ["Móveis Comerciais", "Instalações", "PDV"],
    sectors: ["Varejo", "Lojas", "Franquias"],
  },
  {
    slug: "global-led-experience",
    name: "Global LED Experience",
    tradingName: "Global LED Experience Comércio de Painéis Digitais LTDA",
    cnpj: "28.157.120/0001-16",
    category: "Tecnologia para Varejo",
    joinedDate: "2023-05-17",
    contacts: [
      { name: "Sérgio Gouveia", role: "CEO", mobile: "11 -99587-7373", email: "sergio@globalledexperience.com" }
    ],
    shortDescription: "Comercialização e instalação de painéis LED e soluções de digital signage para comunicação visual em ambientes comerciais.",
    state: "SP",
    solutions: ["Painéis LED", "Digital Signage", "Tecnologia Visual"],
    sectors: ["Varejo", "Shopping Centers", "Eventos"],
  },
  {
    slug: "gm7",
    name: "GM7",
    tradingName: "GM7 Trade & Marketing LTDA",
    cnpj: "06.257.933/0001-45",
    category: "Consultoria",
    joinedDate: "2019-11-06",
    contacts: [
      { name: "Giovanni Maddaloni", role: "Diretor", phone: "19-3251-4742", mobile: "19 98132-7777", email: "gm@gm7.com.br" }
    ],
    shortDescription: "Consultoria especializada em trade marketing, estratégias de PDV e ativação de marca no ambiente de varejo.",
    state: "SP",
    city: "Campinas",
    solutions: ["Trade Marketing", "Consultoria", "Ativação"],
    sectors: ["Varejo", "Indústria", "Bens de Consumo"],
  },
  {
    slug: "kt-arquitetura",
    name: "KT Arquitetura",
    tradingName: "Kawahara & Takano Arquitetura LTDA",
    cnpj: "69.095.248/0001-80",
    category: "Escritório de Arquitetura",
    joinedDate: "2003-11-04",
    contacts: [
      { name: "Julio Takano", role: "Sócio Diretor-Arquiteto", phone: "11-5694-1043", mobile: "11-98122-8059", email: "julio.takano@kt.com.br" },
      { name: "Rosely Kawahara", role: "Sócia Diretora-Arquiteta", phone: "11-5694-1043", mobile: "11-98122-8054", email: "rosely.kawahara@kt.com.br" }
    ],
    shortDescription: "Escritório de arquitetura especializado em projetos de varejo, store design e ambientes comerciais há mais de 20 anos.",
    state: "SP",
    solutions: ["Arquitetura", "Store Design", "Projetos Comerciais"],
    sectors: ["Varejo", "Moda", "Shopping Centers"],
  },
  {
    slug: "ledwave",
    name: "Ledwave",
    tradingName: "Ledwave Painéis Eletrônicos LTDA",
    cnpj: "13.045.186/0001-47",
    category: "Tecnologia para Varejo",
    joinedDate: "2023-10-10",
    contacts: [
      { name: "Alessandro Batista", role: "Vice Presidente", phone: "0800 943 7800" },
      { name: "Bruno Cardia", role: "Diretor Comercial", phone: "0800 943 7800", email: "bruno.cardia@ledwave.com.br" }
    ],
    shortDescription: "Fabricante de painéis eletrônicos e soluções de LED para comunicação visual e digital signage no varejo.",
    state: "GO",
    solutions: ["Painéis LED", "Digital Signage", "Comunicação Visual"],
    sectors: ["Varejo", "Publicidade", "Eventos"],
  },
  {
    slug: "lemca-iluminacao",
    name: "Lemca Iluminação",
    tradingName: "Lemca Lâmpadas Especiais LTDA",
    cnpj: "60.089.919/0001-25",
    category: "Iluminação",
    joinedDate: "2013-01-08",
    contacts: [
      { name: "João Carlos Gaya", role: "Diretor", phone: "11-2827-0656", email: "gaya@lemca.com.br" },
      { name: "Carlos Pacheco", role: "Gerente de Vendas", phone: "11-2827-0656", mobile: "11-97329-5011", email: "pacheco@lemca.com.br" }
    ],
    shortDescription: "Especialista em iluminação comercial e industrial, com soluções em LED e projetos luminotécnicos para varejo.",
    state: "SP",
    solutions: ["Iluminação LED", "Projetos Luminotécnicos", "Lâmpadas Especiais"],
    sectors: ["Varejo", "Indústria", "Comercial"],
  },
  {
    slug: "leyard",
    name: "Leyard",
    tradingName: "Leyard do Brasil",
    cnpj: "20.596.494/0001-26",
    category: "Tecnologia para Varejo",
    joinedDate: "2023-05-17",
    contacts: [
      { name: "Odair Tremante", role: "CEO", phone: "41 3059-5100", mobile: "11 98114-0246", email: "odair.tremante@leyardgroup.com" },
      { name: "Thayna Valeriano", role: "Marketing", phone: "41 3059-5100", mobile: "11 95823-0113", email: "thayna.valeriano@leyardgroup.com" }
    ],
    shortDescription: "Líder global em displays LED e soluções de visualização para ambientes comerciais, eventos e espaços públicos.",
    state: "PR",
    city: "Curitiba",
    solutions: ["Displays LED", "Videowall", "Visualização Digital"],
    sectors: ["Varejo", "Corporativo", "Eventos"],
  },
  {
    slug: "mao-colorida",
    name: "Mão Colorida",
    tradingName: "Mão Colorida Comunicação Visual LTDA",
    cnpj: "01.933.903/0001-98",
    category: "Comunicação Visual, Mobiliário e Expositores",
    joinedDate: "2009-09-25",
    contacts: [
      { name: "Sérgio Carvalho", role: "CEO", phone: "41-3122-7540", mobile: "41-98402-7225", email: "sergio@maocolorida.com.br" },
      { name: "Marcos Fernando Vargas", role: "Diretor", phone: "41-3122-7540", mobile: "41-99153-0161", email: "marcos@maocolorida.com.br" }
    ],
    shortDescription: "Soluções integradas em comunicação visual, mobiliário e expositores para PDV, com atuação nacional e projetos turnkey.",
    state: "PR",
    city: "Curitiba",
    solutions: ["Comunicação Visual", "Mobiliário", "Expositores", "Sinalização"],
    sectors: ["Varejo", "Redes", "Franquias"],
  },
  {
    slug: "omega-light",
    name: "Omega Light",
    tradingName: "Omega Iluminação LTDA",
    cnpj: "01.640.086/0001-80",
    category: "Iluminação",
    joinedDate: "2004-07-23",
    contacts: [
      { name: "Fábio Keiti Nagata", role: "Diretor de Marketing", phone: "11-4055-5455", mobile: "11-99908-9147", email: "fabio.nagata@omegalight.com.br" },
      { name: "Fernando Akira Nagata", role: "Diretor Comercial", phone: "11-5034.1233", mobile: "11-99452-9796", email: "akira@omegalight.com.br" }
    ],
    shortDescription: "Indústria de iluminação com mais de 20 anos, especializada em soluções LED para varejo, arquitetura e projetos especiais.",
    state: "SP",
    solutions: ["Iluminação LED", "Projetos Luminotécnicos", "Iluminação Comercial"],
    sectors: ["Varejo", "Arquitetura", "Residencial"],
  },
  {
    slug: "purchase-comunicacao",
    name: "Purchase Comunicação e Marketing",
    tradingName: "Purchase Comunicação e Marketing S/C LTDA",
    cnpj: "02.754.795/0001-59",
    category: "Visual Merchandising",
    joinedDate: "2024-11-22",
    contacts: [
      { name: "Sonia Paloschi", role: "Diretora", phone: "11-3231-1710", mobile: "11-99930-7008", email: "sonia.paloschi@purchase.com.br" }
    ],
    shortDescription: "Consultoria em visual merchandising e marketing de varejo, com foco em estratégias de PDV e experiência do consumidor.",
    state: "SP",
    solutions: ["Visual Merchandising", "Marketing de Varejo", "Estratégia PDV"],
    sectors: ["Moda", "Varejo", "Lifestyle"],
  },
  {
    slug: "ppa-motopar",
    name: "PPA Motopar",
    tradingName: "Portal Portões Automáticos S/C LTDA",
    cnpj: "52.605.821/0001-55",
    category: "Automatizadores de Portas e Portões",
    joinedDate: "2003-12-04",
    contacts: [
      { name: "Samuel Peres", role: "Diretor Administrativo", phone: "14-3407-1004", email: "samuel@ppa.com.br" },
      { name: "Reinaldo Junior", role: "Gerente Comercial", phone: "14-3407-1004", email: "reinaldo.junior@ppa.com.br" }
    ],
    shortDescription: "Fabricante líder em automatizadores de portas e portões, com soluções para segurança e controle de acesso comercial.",
    state: "SP",
    city: "Garça",
    solutions: ["Automatização", "Portões Automáticos", "Controle de Acesso"],
    sectors: ["Comercial", "Varejo", "Indústria"],
  },
  {
    slug: "renabian-engenharia",
    name: "Renabian Engenharia",
    tradingName: "Renabian Prestadora de Serviços LTDA",
    cnpj: "01.393.712/0001-80",
    category: "Engenharia",
    joinedDate: "2017-08-16",
    contacts: [
      { name: "Renan Moraes", role: "Diretor", phone: "11-2028-0816", mobile: "11-94717-1787", email: "renan@renabian.com.br" }
    ],
    shortDescription: "Engenharia especializada em projetos comerciais, instalações elétricas e infraestrutura para ambientes de varejo.",
    state: "SP",
    solutions: ["Engenharia", "Instalações", "Infraestrutura"],
    sectors: ["Varejo", "Comercial", "Redes"],
  },
  {
    slug: "sesami-brasil",
    name: "Sesami Brasil",
    tradingName: "Sesami Cash Management Technologies Brasil S.A",
    cnpj: "04.676.871/0001-80",
    category: "Prevenção de Perdas",
    joinedDate: "2010-12-06",
    contacts: [
      { name: "Luiz Fernando Sambugaro", role: "Diretor", phone: "11-3732-6626", mobile: "11-98326-8506", email: "luiz.sambugaro@gunnebo.com" },
      { name: "Marta Alcarde", role: "Gerente de Atendimento", phone: "11-3732-6626", mobile: "11-98200-9833", email: "marta.alcarde@gunnebo.com" }
    ],
    shortDescription: "Soluções em gestão de numerário e prevenção de perdas para varejo, com tecnologia de ponta em cash management.",
    state: "SP",
    solutions: ["Cash Management", "Prevenção de Perdas", "Segurança"],
    sectors: ["Varejo", "Supermercados", "Bancos"],
  },
  {
    slug: "the-led",
    name: "The LED",
    tradingName: "RDA Importação, Exportação e Serviços LTDA",
    cnpj: "12.647.827/0001-70",
    category: "Painéis Eletrônicos",
    joinedDate: "2019-04-16",
    contacts: [
      { name: "Bruno Marmo", role: "Diretor Executivo", phone: "11-2604-9090", mobile: "11-99114-3849", email: "bruno.marmo@theled.com.br" },
      { name: "Elaine Dias", role: "Diretora de Marketing", phone: "11-2604-9090", mobile: "11-98929-8759", email: "elaine.dias@theled.com.br" }
    ],
    shortDescription: "Especializada em painéis eletrônicos e soluções LED para comunicação visual, fachadas e digital signage no varejo.",
    state: "SP",
    solutions: ["Painéis LED", "Fachadas Digitais", "Digital Signage"],
    sectors: ["Varejo", "Publicidade", "Eventos"],
  },
];

// Categorias únicas extraídas dos associados
export const categories = [
  "Todas",
  "Iluminação",
  "Especificadora",
  "Conteúdo Digital",
  "Mobiliário e Equipamentos",
  "Gráfica Digital",
  "Visual Merchandising",
  "Fabricação de Manequins e Displays",
  "Construção Civil",
  "Escritório de Advocacia",
  "Fabricação de Móveis",
  "Tecnologia para Varejo",
  "Consultoria",
  "Escritório de Arquitetura",
  "Comunicação Visual, Mobiliário e Expositores",
  "Automatizadores de Portas e Portões",
  "Engenharia",
  "Prevenção de Perdas",
  "Painéis Eletrônicos",
];

// Estados únicos
export const states = [
  "Todos",
  "SP",
  "PR",
  "GO",
];

// Helper para obter associado por slug
export function getAssociateBySlug(slug: string): Associate | undefined {
  return associates.find(a => a.slug === slug);
}

// Helper para obter iniciais do logo
export function getLogoInitials(name: string): string {
  return name
    .split(' ')
    .filter(word => word.length > 2 || word === word.toUpperCase())
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}
