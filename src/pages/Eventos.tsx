import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema, createEventSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight, Video, Presentation } from "lucide-react";

const featuredEvent = {
  title: "Backstage do Varejo — São Paulo",
  date: "15 de Março de 2024",
  location: "São Paulo, SP",
  description: "O principal evento da ABIESV que leva profissionais para conhecer os bastidores das maiores operações de varejo do Brasil.",
  slug: "2024-03-sao-paulo",
};

const upcomingEvents = [
  {
    title: "Backstage do Varejo — Rio de Janeiro",
    date: "10 de Abril de 2024",
    isoDate: "2024-04-10",
    location: "Rio de Janeiro, RJ",
    type: "Presencial",
    slug: "2024-04-rio-de-janeiro",
    series: "backstage",
  },
  {
    title: "Workshop: Visual Merchandising na Prática",
    date: "22 de Março de 2024",
    isoDate: "2024-03-22",
    location: "Online",
    type: "Workshop",
    slug: "workshop-vm-marco-2024",
    series: "workshop",
  },
  {
    title: "Backstage do Varejo — Belo Horizonte",
    date: "15 de Maio de 2024",
    isoDate: "2024-05-15",
    location: "Belo Horizonte, MG",
    type: "Presencial",
    slug: "2024-05-belo-horizonte",
    series: "backstage",
  },
  {
    title: "Trilha: Tecnologia no PDV",
    date: "05 de Abril de 2024",
    isoDate: "2024-04-05",
    location: "Online",
    type: "Trilha Online",
    slug: "trilha-tecnologia-pdv",
    series: "workshop",
  },
];

const Eventos = () => {
  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Eventos", url: "https://abiesv.org.br/eventos" },
    ]),
    ...upcomingEvents.map(event => createEventSchema({
      name: event.title,
      description: `${event.type} da ABIESV em ${event.location}`,
      startDate: event.isoDate,
      location: event.location,
      url: `https://abiesv.org.br/eventos/${event.series === "backstage" ? "backstage-do-varejo/" : "workshops/"}${event.slug}`,
    })),
  ];

  return (
    <Layout>
      <SEOHead
        title="Eventos ABIESV — Backstage do Varejo, Workshops e Agenda"
        description="Participe dos eventos que conectam o ecossistema do varejo. Inscreva-se."
        canonical="https://abiesv.org.br/eventos"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Eventos e Comunidade ABIESV
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conecte-se com profissionais e líderes do ecossistema de varejo em eventos presenciais e online.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <Badge variant="default" className="mb-4">Destaque</Badge>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                    {featuredEvent.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredEvent.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>
                  <Button asChild variant="cta" size="lg">
                    <Link to={`/eventos/backstage-do-varejo/${featuredEvent.slug}`}>
                      Inscreva-se
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-muted lg:min-h-[300px] flex items-center justify-center">
                  <div className="p-8 text-center">
                    <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">[Imagem do evento]</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Hubs */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/eventos/backstage-do-varejo" className="group">
              <Card className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Presentation className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    Backstage do Varejo
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Série de eventos itinerantes que levam profissionais para conhecer os bastidores das maiores operações de varejo do Brasil.
                  </p>
                  <span className="text-primary font-medium flex items-center">
                    Ver todas as edições
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/eventos/workshops" className="group">
              <Card className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Video className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    Workshops e Trilhas
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Capacitações práticas sobre visual merchandising, tecnologia, operações e outros temas do ecossistema de PDV.
                  </p>
                  <span className="text-primary font-medium flex items-center">
                    Ver calendário
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Próximos Eventos
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{event.date}</span>
                  </div>
                  <Badge variant="outline" className="mb-3">{event.type}</Badge>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link 
                      to={event.series === "backstage" 
                        ? `/eventos/backstage-do-varejo/${event.slug}` 
                        : `/eventos/workshops/${event.slug}`
                      }
                    >
                      Ver detalhes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Não perca nenhum evento
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Associados têm acesso prioritário e descontos exclusivos em todos os eventos ABIESV.
          </p>
          <Button asChild variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
            <Link to="/associe-se">
              Associe-se
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Eventos;
