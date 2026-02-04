import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, organizationSchema, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Target, 
  Users, 
  Lightbulb, 
  Rocket,
  Calendar,
  Building2,
  Award,
  Globe,
  Handshake,
  Search,
  Scale,
  Sparkles,
  TrendingUp,
  Briefcase,
  Wrench,
  Store,
  Leaf
} from "lucide-react";

// Founding companies data
const foundingCompanies = [
  "Falzoni Alves Lima Projetos Ltda",
  "Wiring Line",
  "Immergut Mobiliário Industrial e Comercial Ltda",
  "Olver do Brasil Industrial Ltda",
  "Motoppar Indústria e Comércio de Automatizadores Ltda",
  "A6 Arquitetura + Design",
  "Expor Manequins",
  "Metalúrgica Ariam Ltda",
  "Kawahara e Takano soluções para varejo",
  "K2 Comércio e Serviços Ltda",
  "FJ Fernandes Advogados",
  "Meglio Consultoria & Design",
];

const foundingBoard = [
  { initials: "MA", name: "Marcos Andrade", role: "Presidente", company: "Expor Manequins" },
  { initials: "GG", name: "Guglielmo Gafforini", role: "Vice-Presidente", company: "Ariam" },
  { initials: "JT", name: "Julio Takano", role: "Diretor Administrativo Financeiro", company: "KT Soluções para Varejo" },
  { initials: "LL", name: "Luis Fernando Lucas", role: "Diretor de Marketing", company: "Meglio Consultoria" },
  { initials: "FF", name: "Fernando José Fernandes", role: "Diretor Jurídico", company: "FJF Advocacia" },
  { initials: "MM", name: "Mário Mugnaini", role: "Secretário Geral", company: "Camex" },
];

const objectives = [
  { icon: Lightbulb, title: "Informar", description: "SER fonte relevante de informações sobre experiências bem sucedidas para seus associados e varejistas convidados." },
  { icon: Users, title: "Formar Lideranças", description: "FORMAR lideranças e consolidar um grupo de intercâmbio entre a indústria de equipamentos e serviços para o varejo e os representantes dos varejistas em seus mais diversos setores." },
  { icon: Rocket, title: "Promover", description: "PROMOVER, apoiar institucionalmente e participar de eventos que provoquem a discussão de questões voltadas à cadeia de fornecimentos de soluções para o varejo." },
];

const values = [
  { icon: Scale, label: "Ética" },
  { icon: Handshake, label: "Pluralidade" },
  { icon: Search, label: "Transparência" },
  { icon: Lightbulb, label: "Inovação" },
];

const sectors = [
  "🏗️ Arquitetura", "🏢 Construtoras", "👤 Manequins", "📦 Embalagens",
  "⚖️ Assessoria Jurídica", "🪑 Mobiliário", "⚙️ Equipamentos", "🍽️ Alimentos",
  "🖨️ Impressão", "🔒 Segurança", "💡 Iluminação", "🎨 Comunicação Visual",
  "✨ Visual Merchandising", "🔧 Engenharia", "💻 Softwares", "🌱 Sustentabilidade", "🎭 Cenografia"
];

const growthData = [
  { value: 11, label: "Fundação" },
  { value: 23, label: "2º Ano" },
  { value: 43, label: "Consolidação" },
  { value: 50, label: "2012" },
];

const timelineEvents = [
  { year: "2003", title: "Brasilshop", description: "Primeira participação da ABIESV no principal evento do setor", highlight: false },
  { year: "2004", title: "1º Congresso do Varejo", description: "Marco inicial dos eventos de conhecimento promovidos pela ABIESV", highlight: true },
  { year: "2004", title: "Brasilshop 2004", description: null, highlight: false },
  { year: "2005", title: "Brasilshop 2005", description: null, highlight: false },
  { year: "2005", title: "Tendências das Cores", description: "Evento especializado em design e visual merchandising", highlight: false },
  { year: "2006", title: "Luminotécnica", description: "Foco em iluminação para pontos de venda", highlight: false },
  { year: "2006", title: "Global Shop", description: "Participação em evento internacional", highlight: true },
  { year: "2007", title: "Obras e Reformas para o Varejo", description: "Evento técnico sobre construção e reforma", highlight: false },
  { year: "2008", title: "Green Buildings 3M", description: "Início do foco em sustentabilidade no varejo", highlight: true },
  { year: "2009", title: "Brasilshop 2009", description: null, highlight: false },
  { year: "2010", title: "3º Marketing Business", description: null, highlight: false },
];

const board2011 = [
  { initials: "JT", name: "Júlio Takano", role: "Presidente" },
  { initials: "LF", name: "Luiz Fernando", role: "Vice-Presidente" },
  { initials: "RZ", name: "Ronald Von Zimermann", role: "Diretor Executivo" },
  { initials: "RK", name: "Rosely Kawahara", role: "Diretora Adm. Financeira" },
  { initials: "IJ", name: "Iara Jatene", role: "Diretora de Marketing" },
  { initials: "FN", name: "Fernando Akira Nagata", role: "Diretor de Eventos" },
  { initials: "FF", name: "Fernando Fernandes", role: "Diretor Jurídico" },
  { initials: "CB", name: "Carlos Alberto de Barros", role: "Diretor de Expansão" },
  { initials: "MA", name: "Marcos Andrade", role: "Conselheiro", isAdvisor: true },
  { initials: "RC", name: "Ricardo Caetano", role: "Conselheiro", isAdvisor: true },
  { initials: "JM", name: "José Manuel", role: "Conselheiro", isAdvisor: true },
];

const committees = [
  { icon: Briefcase, title: "Comitê Econômico", description: "Análises de mercado e cenários econômicos" },
  { icon: Wrench, title: "Comitê Técnico", description: "Normas, padrões e melhores práticas" },
  { icon: Store, title: "Comitê do Varejo", description: "Conexão direta com varejistas" },
  { icon: Leaf, title: "Comitê de Sustentabilidade", description: "Práticas ESG para o setor" },
];

const initiatives = [
  { icon: Globe, title: "Portal do Varejo", description: "Plataforma digital de conteúdo e networking" },
  { icon: Globe, title: "Projeto APEX", description: "Internacionalização do setor" },
  { icon: Sparkles, title: "Nova Marca 10 Anos", description: "Redesenho da identidade visual" },
  { icon: TrendingUp, title: "Nova Linha de Comunicação", description: "Posicionamento estratégico renovado" },
];

const Historia = () => {
  const pageSchema = [
    organizationSchema,
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Sobre", url: "https://abiesv.org.br/sobre" },
      { name: "Nossa História", url: "https://abiesv.org.br/sobre/historia" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Nossa História — ABIESV | Mais de 20 Anos Transformando o Varejo"
        description="Conheça a trajetória da ABIESV desde 2002: fundação, marcos históricos, eventos e a evolução da associação que conecta indústria, serviços e varejo."
        canonical="https://abiesv.org.br/sobre/historia"
        schema={pageSchema}
      />

      {/* Hero Section */}
      <section className="py-24 gradient-hero text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full font-semibold mb-6">
            2002 - 2026
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Nossa História
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Mais de duas décadas conectando indústria, serviços e varejo 
            para transformar o ponto de venda brasileiro
          </p>
        </div>
      </section>

      {/* Section 1: Origin */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-5 py-2 bg-primary text-primary-foreground rounded-full font-bold text-lg mb-6">
                2002
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Onde Tudo Começou
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Em 2002 surgiu a ideia de uma associação que englobasse indústria 
                de equipamentos e serviços para o varejo, oferecendo aos varejistas 
                informações primordiais (cursos, palestras, pesquisas, apresentações 
                de novas tecnologias, enfim, inovações) para a melhoria do trabalho.
              </p>
              <p className="text-lg text-foreground font-semibold mb-8">
                Nascia assim a <span className="text-primary">ABIESV</span>: Associação Brasileira da 
                Indústria de Equipamentos e Serviços para o Varejo.
              </p>
              <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                <Calendar className="h-8 w-8 text-primary mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">04 de Dezembro de 2002</div>
                <p className="text-muted-foreground">Fundação oficial no Auditório da FIESP</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Building2 className="h-24 w-24 text-primary/40 mx-auto mb-4" />
                  <p className="text-muted-foreground italic">Diretoria Fundadora no Auditório da FIESP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Mission and Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Propósito Fundador
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os pilares que guiaram a criação da ABIESV
            </p>
          </div>

          {/* Mission Card */}
          <Card className="border-0 shadow-card max-w-4xl mx-auto mb-12">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Target className="h-12 w-12 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Missão</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A ABIESV nasceu com o objetivo de se tornar fonte 
                principal de informações e conteúdo para os varejistas 
                e público geral e ser uma referência no mercado, 
                com reconhecimento para seus associados e consolidação de novos negócios.
              </p>
              <div className="p-6 bg-primary/5 rounded-xl">
                <p className="text-sm font-semibold text-primary mb-2">Missão Consolidada (Gestão 2002-2012):</p>
                <p className="text-foreground leading-relaxed">
                  <strong>REPRESENTAR, AGLUTINAR e INFORMAR</strong> as indústrias 
                  de equipamentos e serviços para o varejo, comprometidas com a 
                  <strong> ÉTICA, A CIDADANIA, A LIVRE INICIATIVA</strong>, buscando 
                  o aprimoramento contínuo para a construção de um 
                  <strong> VAREJO RELEVANTE DE RECONHECIMENTO INTERNACIONAL</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Objectives */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {objectives.map((obj, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <obj.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h4 className="font-heading text-xl font-bold text-foreground mb-3">{obj.title}</h4>
                  <p className="text-muted-foreground">{obj.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Values */}
          <div className="text-center">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-8">Nossos Valores</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-card border-2 border-border rounded-full font-semibold text-lg text-foreground hover:border-primary hover:shadow-md transition-all duration-300"
                >
                  <value.icon className="h-5 w-5 text-primary" />
                  {value.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Founding Companies */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
              <Award className="h-4 w-4" /> Legado Fundador
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Empresas Fundadoras
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A ABIESV surgiu dos ideais de algumas empresas do varejo que não 
              estavam satisfeitas com a minúscula quantidade de informações sobre o setor.
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {foundingCompanies.map((company, index) => (
              <div 
                key={index}
                className="p-6 bg-card border-2 border-border rounded-xl text-center hover:border-amber-400 hover:shadow-md transition-all duration-300"
              >
                <div className="h-16 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-semibold text-foreground leading-tight">{company}</p>
              </div>
            ))}
          </div>

          {/* Founding Board */}
          <div className="bg-muted/50 rounded-2xl p-8">
            <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-8">
              Diretoria Fundadora
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {foundingBoard.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {member.initials}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{member.name}</h4>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                  <p className="text-xs text-primary font-medium">{member.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Growth */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Crescimento Sustentável
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Uma das grandes vantagens da ABIESV é o fato de ser uma 
                <strong className="text-foreground"> Associação multisetorial</strong>, ou seja, abrange 
                diferentes frentes do mercado de indústria e serviço para o varejo.
              </p>
              
              {/* Growth Chart */}
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-6">Crescimento de Associados</h4>
                  <div className="flex items-end justify-between gap-4 h-48">
                    {growthData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full gradient-primary rounded-t-lg flex items-start justify-center pt-3 transition-all duration-300 hover:opacity-90"
                          style={{ height: `${(item.value / 50) * 100}%`, minHeight: '40px' }}
                        >
                          <span className="text-white font-bold">{item.value}</span>
                        </div>
                        <span className="text-xs text-muted-foreground text-center">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-0 shadow-card">
                <CardContent className="p-8">
                  <h4 className="font-heading text-xl font-bold text-foreground mb-6">Setores Representados</h4>
                  <div className="flex flex-wrap gap-3">
                    {sectors.map((sector, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-muted rounded-full text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Marcos Históricos
            </h2>
            <p className="text-lg text-muted-foreground">
              Uma década de eventos, conhecimento e networking
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-border" />

            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex gap-6 md:gap-8 mb-8 pl-20 md:pl-28">
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-4 md:left-8 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                    event.highlight 
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg' 
                      : 'bg-white border-4 border-primary text-primary'
                  }`}
                >
                  {event.year.slice(2)}
                </div>

                {/* Content */}
                <div className={`flex-1 ${event.highlight ? 'bg-primary/5 p-6 rounded-xl -ml-4' : ''}`}>
                  <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full mb-2">
                    {event.year}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">{event.title}</h3>
                  {event.description && (
                    <p className="text-muted-foreground">{event.description}</p>
                  )}
                </div>
              </div>
            ))}

            {/* 2011 Highlight */}
            <div className="relative flex gap-6 md:gap-8 mb-8 pl-20 md:pl-28">
              <div className="absolute left-4 md:left-8 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg">
                11
              </div>
              <div className="flex-1 bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl -ml-4">
                <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full mb-3">
                  2011
                </span>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Ano de Consolidação</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white/50 rounded-lg border-l-4 border-primary">
                    <strong className="text-foreground">Pós-Euroshop</strong>
                    <p className="text-sm text-muted-foreground">31 de Março - 250 congressistas - Hotel Renaissance</p>
                    <p className="text-sm text-primary">Marcou o reposicionamento estratégico da ABIESV</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg border-l-4 border-primary">
                    <strong className="text-foreground">1ª Rodada de Valores</strong>
                    <p className="text-sm text-muted-foreground">25 de Maio - "Para onde caminha o Varejo?"</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg border-l-4 border-primary">
                    <strong className="text-foreground">Lightstyle 2011</strong>
                    <p className="text-sm text-muted-foreground">29 de Setembro - Philips Alphaville</p>
                    <p className="text-sm text-primary">Palestra, Workshop e visita técnica</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-800 mb-2">+9 eventos apoiados</p>
                    <p className="text-green-700">Divulgação para +16.000 lojistas</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-800 mb-2">Mailing reestruturado</p>
                    <p className="text-blue-700">+3.000 nomes do varejo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2012 Highlight */}
            <div className="relative flex gap-6 md:gap-8 mb-8 pl-20 md:pl-28">
              <div className="absolute left-4 md:left-8 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg">
                12
              </div>
              <div className="flex-1 bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl -ml-4">
                <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full mb-3">
                  2012
                </span>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Maturidade e Expansão</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-white/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-foreground">1ª Convenção com Associados</strong>
                      <p className="text-sm text-muted-foreground">01 de Março - Café com Associados</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-foreground">1º Fórum de Sustentabilidade</strong>
                      <p className="text-sm text-muted-foreground">29 de Março - Hotel Renaissance</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg border-l-4 border-amber-400">
                      <strong className="text-foreground">1º Backstage do Varejo</strong>
                      <p className="text-sm text-muted-foreground">29 de Junho - Hotel Renaissance</p>
                      <p className="text-sm text-primary">"Processos, Pessoas e Tecnologias"</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-foreground">15º Fórum do Varejo da América Latina</strong>
                      <p className="text-sm text-muted-foreground">16-17 de Agosto - Fecomércio</p>
                      <p className="text-sm text-primary">ABIESV âncora da 1ª FICSEL</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg border-l-4 border-amber-400">
                      <strong className="text-foreground">2º e 3º Backstage do Varejo</strong>
                      <p className="text-sm text-muted-foreground">Expansão e Visual Merchandising</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Governance */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Plano Diretor 2011-2012
            </h2>
            <p className="text-xl text-white/80">
              Estruturação profissional e criação de comitês especializados
            </p>
          </div>

          {/* Board */}
          <div className="mb-16">
            <h3 className="font-heading text-2xl font-bold text-center mb-8">Diretoria 2011-2012</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {board2011.slice(0, 8).map((member, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-xl text-center border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="w-16 h-16 mx-auto mb-3 gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                    {member.initials}
                  </div>
                  <h4 className="font-semibold text-sm">{member.name}</h4>
                  <p className="text-xs text-white/70">{member.role}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              {board2011.slice(8).map((member, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-xl text-center border border-amber-400/50 hover:bg-white/20 transition-colors"
                >
                  <div className="w-14 h-14 mx-auto mb-2 bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center text-amber-200 font-bold">
                    {member.initials}
                  </div>
                  <h4 className="font-semibold text-sm">{member.name}</h4>
                  <p className="text-xs text-amber-200">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Committees */}
          <div className="mb-16">
            <h3 className="font-heading text-2xl font-bold text-center mb-8">Criação dos Comitês ABIESV</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {committees.map((committee, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-xl text-center border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <committee.icon className="h-10 w-10 mx-auto mb-4 text-white/80" />
                  <h4 className="font-semibold mb-2">{committee.title}</h4>
                  <p className="text-sm text-white/70">{committee.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Initiatives */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-center mb-8">Iniciativas Estratégicas 2011</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {initiatives.map((initiative, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl text-center border border-white/10"
                >
                  <initiative.icon className="h-8 w-8 mx-auto mb-3 text-white/60" />
                  <h4 className="font-semibold text-sm mb-1">{initiative.title}</h4>
                  <p className="text-xs text-white/60">{initiative.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Legacy */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-semibold mb-4">
              <Sparkles className="h-5 w-5" /> Legado
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Uma Década de Transformação
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              De 2002 a 2012, a ABIESV consolidou-se como a principal referência 
              em equipamentos e serviços para o varejo brasileiro, conectando 
              indústria e comércio em um ecossistema de inovação e conhecimento.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: "50+", label: "Associados" },
              { value: "17", label: "Setores Representados" },
              { value: "100+", label: "Eventos Realizados" },
              { value: "16.000+", label: "Lojistas Alcançados" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-muted/50 rounded-xl">
                <div className="text-4xl font-heading font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Award, title: "Referência Nacional", description: "Reconhecida como fonte principal de informação e networking para o setor de varejo" },
              { icon: Handshake, title: "Ecossistema Multisetorial", description: "Única associação que conecta todos os elos da cadeia de fornecimento para o varejo" },
              { icon: Globe, title: "Alcance Internacional", description: "Parcerias globais e participação em eventos internacionais de referência" },
            ].map((achievement, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-8">
                  <achievement.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Faça Parte Desta História
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Continue escrevendo o futuro do varejo brasileiro ao lado da ABIESV
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="cta" size="lg">
                <Link to="/associe-se">
                  Associe-se Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contato">
                  Fale Conosco
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Historia;
