import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, organizationSchema, websiteSchema, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Calendar,
  ChevronRight,
  BarChart3
} from "lucide-react";
import heroImage from "@/assets/hero-retail.jpg";

// Metrics data
const metrics = [
  {
    value: "R$ 532,1 BI",
    description: "Movimentação projetada pelo varejo brasileiro em 2025",
    source: "IPC Maps",
  },
  {
    value: "2,8x",
    description: "Aumento no tempo de permanência em lojas com design orientado à experiência",
    source: "Estudo Setorial ABIESV",
  },
  {
    value: "68%",
    description: "Das decisões de compra são tomadas dentro do ponto de venda",
    source: "POPAI Brasil",
  },
];

// Featured library items
const libraryItems = [
  {
    title: "Guia de Visual Merchandising 2024",
    category: "Guia",
    description: "Estratégias comprovadas para maximizar a conversão através do visual merchandising orientado a dados.",
    tags: ["VM", "Store Design", "Conversão"],
    slug: "guia-visual-merchandising-2024",
  },
  {
    title: "Pesquisa: Comportamento do Consumidor no PDV",
    category: "Pesquisa",
    description: "Estudo aprofundado sobre jornadas de compra e pontos de decisão no ambiente físico de varejo.",
    tags: ["Pesquisa", "Consumidor", "PDV"],
    slug: "pesquisa-comportamento-consumidor-pdv",
  },
  {
    title: "Case: Transformação Digital em Lojas Físicas",
    category: "Case",
    description: "Como uma rede varejista integrou tecnologia e design para criar experiências memoráveis.",
    tags: ["Digital", "Tecnologia", "Case"],
    slug: "case-transformacao-digital-lojas",
  },
];

// Importar eventos reais
import { events, formatEventDate } from "@/data/events";

// Próximos eventos (não-feriados, ordenados por data)
const upcomingEvents = events
  .filter(e => !e.isHoliday)
  .sort((a, b) => {
    if (a.isAbiestEvent && !b.isAbiestEvent) return -1;
    if (!a.isAbiestEvent && b.isAbiestEvent) return 1;
    return a.startDate.localeCompare(b.startDate);
  })
  .slice(0, 3);

// Importar associados reais (do banco)
import { getLogoInitials } from "@/data/associates";
import { useApprovedAssociates } from "@/hooks/useApprovedAssociates";

const Index = () => {
  const { data: dbAssociates = [] } = useApprovedAssociates();
  const featuredAssociates = dbAssociates.slice(0, 12);
  const pageSchema = [
    organizationSchema,
    websiteSchema,
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "ABIESV — Conhecimento, Dados e Conexões para o Varejo",
      description: "Biblioteca técnica, números do setor e eventos como o Backstage do Varejo. Conecte-se ao ecossistema. Associe-se.",
      url: "https://abiesv.org.br/",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="ABIESV — Conhecimento, Dados e Conexões para o Varejo (PDV)"
        description="Biblioteca técnica, números do setor e eventos como o Backstage do Varejo. Conecte-se ao ecossistema. Associe-se."
        canonical="https://abiesv.org.br/"
        schema={pageSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={heroImage}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 text-sm font-medium px-4 py-2">
              Associação Brasileira da Indústria de Equipamentos e Serviços para o Varejo
            </Badge>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Conhecimento e conexões para transformar o{" "}
              <span className="font-impact italic">PDV no Brasil</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              Biblioteca técnica, números do setor e eventos exclusivos. 
              Conectamos indústria, serviços e varejo para impulsionar o ecossistema de ponto de venda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/associe-se">
                  Associe-se à ABIESV
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/biblioteca">
                  Explorar Biblioteca
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse-soft" />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Números do Setor
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Indicadores e métricas que orientam decisões no ecossistema de PDV
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="gradient-primary rounded-xl p-8 text-white shadow-lg hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="text-4xl sm:text-5xl font-heading font-bold mb-4 leading-none">
                  {metric.value}
                </div>
                <p className="text-base leading-relaxed mb-5 opacity-90">
                  {metric.description}
                </p>
                <div className="text-xs opacity-70 italic border-t border-white/30 pt-3">
                  Fonte: {metric.source}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/numeros-do-setor">
                Ver todos os indicadores
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Biblioteca Técnica
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Guias, pesquisas e cases para transformar sua operação de varejo
              </p>
            </div>
            <Button asChild variant="ghost" className="self-start sm:self-auto">
              <Link to="/biblioteca">
                Ver tudo
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {libraryItems.map((item, index) => (
              <Card 
                key={index}
                className="group hover:shadow-card-hover transition-all duration-300 border-0 shadow-card overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-4">
                      {item.category}
                    </Badge>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/biblioteca/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-muted/30 border-t border-border">
                    <Link
                      to={`/biblioteca/${item.slug}`}
                      className="flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Acessar conteúdo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Eventos e Comunidade
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Conecte-se com profissionais e líderes do ecossistema de varejo
              </p>
            </div>
            <Button asChild variant="ghost" className="self-start sm:self-auto">
              <Link to="/eventos">
                Ver agenda completa
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card 
                key={event.id}
                className={`group hover:shadow-card-hover transition-all duration-300 border bg-card ${
                  event.isAbiestEvent ? 'border-primary/30 bg-primary/5' : 'border-border/50'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {formatEventDate(event)}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {event.isAbiestEvent && (
                      <Badge variant="default" className="text-xs">ABIESV</Badge>
                    )}
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    📍 {event.city || event.location || "A definir"}
                  </p>
                  <Button asChild variant={event.isAbiestEvent ? "default" : "outline"} size="sm" className="w-full">
                    <Link to={event.registrationUrl?.startsWith("/") ? event.registrationUrl : "/eventos"}>
                      {event.isAbiestEvent ? "Inscreva-se" : "Ver detalhes"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Quem faz parte
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empresas líderes do ecossistema de varejo confiam na ABIESV
            </p>
          </div>

          {/* Associate Logos */}
          {featuredAssociates.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {featuredAssociates.map((associate) => (
              <Link
                key={associate.slug}
                to={`/associados/${associate.slug}`}
                className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-xl hover:bg-muted hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors overflow-hidden">
                  {associate.logo ? (
                    <img 
                      src={associate.logo} 
                      alt={`Logo ${associate.name}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="font-heading font-bold text-lg text-primary">
                      {getLogoInitials(associate.name)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                  {associate.name}
                </span>
              </Link>
            ))}
          </div>
          )}

          <div className="text-center mb-12">
            <Button asChild variant="outline">
              <Link to="/associados">
                Ver todos os associados
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="relative">
              <div className="text-6xl text-primary/20 font-impact absolute -top-4 -left-4">"</div>
              <p className="text-xl md:text-2xl text-foreground font-medium italic leading-relaxed mb-6">
                A ABIESV foi fundamental para conectar nossa empresa com as melhores práticas do setor e 
                fornecedores qualificados. O networking nos eventos é inestimável.
              </p>
              <footer className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <cite className="font-heading font-semibold text-foreground not-italic">
                    [Nome do Executivo]
                  </cite>
                  <p className="text-sm text-muted-foreground">
                    [Cargo], [Empresa Associada]
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Faça parte do ecossistema
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Associe-se à ABIESV e tenha acesso a conhecimento exclusivo, 
            networking qualificado e visibilidade no mercado de PDV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
              <Link to="/associe-se">
                Quero me associar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/contato">
                Falar com a equipe
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
