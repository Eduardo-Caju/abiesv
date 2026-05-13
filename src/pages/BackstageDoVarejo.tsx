import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema, createEventSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight, CheckCircle } from "lucide-react";

const editions = [
  {
    slug: "2024-03-sao-paulo",
    city: "São Paulo",
    date: "15 de Março de 2024",
    isoDate: "2024-03-15",
    status: "upcoming",
    venue: "São Paulo, SP",
    capacity: 80,
  },
  {
    slug: "2024-04-rio-de-janeiro",
    city: "Rio de Janeiro",
    date: "10 de Abril de 2024",
    isoDate: "2024-04-10",
    status: "upcoming",
    venue: "São Paulo, SP",
    capacity: 60,
  },
  {
    slug: "2024-05-belo-horizonte",
    city: "Belo Horizonte",
    date: "15 de Maio de 2024",
    isoDate: "2024-05-15",
    status: "upcoming",
    venue: "São Paulo, SP",
    capacity: 50,
  },
  {
    slug: "2023-11-sao-paulo",
    city: "São Paulo",
    date: "20 de Novembro de 2023",
    isoDate: "2023-11-20",
    status: "past",
    venue: "Magazine Luiza - Centro Logístico",
    capacity: 80,
  },
  {
    slug: "2023-09-curitiba",
    city: "Curitiba",
    date: "15 de Setembro de 2023",
    isoDate: "2023-09-15",
    status: "past",
    venue: "Boticário - Fábrica",
    capacity: 60,
  },
];

const benefits = [
  "Visita técnica aos bastidores de grandes varejistas",
  "Networking com profissionais do setor",
  "Palestras com executivos e especialistas",
  "Material exclusivo e certificado de participação",
  "Coffee break e almoço inclusos",
];

const BackstageDoVarejo = () => {
  const upcomingEditions = editions.filter(e => e.status === "upcoming");
  const pastEditions = editions.filter(e => e.status === "past");

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Eventos", url: "https://abiesv.org.br/eventos" },
      { name: "Backstage do Varejo", url: "https://abiesv.org.br/eventos/backstage-do-varejo" },
    ]),
    ...upcomingEditions.map(edition => createEventSchema({
      name: `Backstage do Varejo — ${edition.city}`,
      description: "Visita técnica aos bastidores de grandes operações de varejo.",
      startDate: edition.isoDate,
      location: edition.venue,
      url: `https://abiesv.org.br/eventos/backstage-do-varejo/${edition.slug}`,
    })),
  ];

  return (
    <Layout>
      <SEOHead
        title="Backstage do Varejo — Visitas Técnicas ao PDV"
        description="Série de eventos itinerantes que levam profissionais para conhecer os bastidores das maiores operações de varejo do Brasil."
        canonical="https://abiesv.org.br/eventos/backstage-do-varejo"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Série de Eventos</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Backstage do Varejo
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Eventos itinerantes que levam profissionais para conhecer os bastidores das maiores 
              operações de varejo do Brasil. Uma experiência única de aprendizado e networking.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>50-80 participantes por edição</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Principais capitais do Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            O que você vai encontrar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Editions */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Próximas edições
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEditions.map((edition) => (
              <Card 
                key={edition.slug}
                className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{edition.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    Backstage do Varejo — {edition.city}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {edition.venue}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {edition.capacity} vagas
                  </p>
                  <Button asChild variant="cta" className="w-full">
                    <Link to={`/eventos/backstage-do-varejo/${edition.slug}`}>
                      Inscreva-se
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Editions */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Edições anteriores
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pastEditions.map((edition) => (
              <Card 
                key={edition.slug}
                className="border border-border bg-muted/20"
              >
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">Realizado</Badge>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    Backstage do Varejo — {edition.city}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {edition.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {edition.venue}
                    </span>
                  </div>
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
            Leve o Backstage para sua cidade
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Sua empresa pode sediar uma edição do Backstage do Varejo. 
            Entre em contato e saiba como participar.
          </p>
          <Button asChild variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
            <Link to="/contato">
              Fale conosco
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default BackstageDoVarejo;
