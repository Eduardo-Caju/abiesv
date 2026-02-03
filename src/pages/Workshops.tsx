import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight, Video } from "lucide-react";

const workshops = [
  {
    slug: "workshop-vm-marco-2024",
    title: "Visual Merchandising na Prática",
    date: "22 de Março de 2024",
    isoDate: "2024-03-22",
    location: "Online",
    duration: "4 horas",
    instructor: "[Nome do Instrutor]",
    status: "upcoming",
  },
  {
    slug: "trilha-tecnologia-pdv",
    title: "Trilha: Tecnologia no PDV",
    date: "05 de Abril de 2024",
    isoDate: "2024-04-05",
    location: "Online",
    duration: "8 horas (2 dias)",
    instructor: "[Nome do Instrutor]",
    status: "upcoming",
  },
  {
    slug: "workshop-iluminacao-maio",
    title: "Iluminação para Varejo",
    date: "10 de Maio de 2024",
    isoDate: "2024-05-10",
    location: "Online",
    duration: "3 horas",
    instructor: "[Nome do Instrutor]",
    status: "upcoming",
  },
];

const Workshops = () => {
  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Eventos", url: "https://abiesv.org.br/eventos" },
      { name: "Workshops", url: "https://abiesv.org.br/eventos/workshops" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Workshops e Trilhas — ABIESV"
        description="Capacitações práticas sobre visual merchandising, tecnologia e operações no PDV."
        canonical="https://abiesv.org.br/eventos/workshops"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Capacitação</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Workshops e Trilhas
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Capacitações práticas sobre visual merchandising, tecnologia, operações 
              e outros temas do ecossistema de PDV.
            </p>
          </div>
        </div>
      </section>

      {/* Workshops List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Próximos workshops
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <Card 
                key={workshop.slug}
                className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{workshop.date}</span>
                  </div>
                  <Badge variant="outline" className="mb-3">
                    <Video className="h-3 w-3 mr-1" />
                    {workshop.location}
                  </Badge>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {workshop.title}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>⏱️ Duração: {workshop.duration}</p>
                    <p>👤 Instrutor: {workshop.instructor}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/eventos/workshops/${workshop.slug}`}>
                      Ver detalhes e inscrição
                      <ArrowRight className="ml-2 h-4 w-4" />
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
            Descontos exclusivos para associados
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Associados têm até 50% de desconto em todos os workshops e trilhas da ABIESV.
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

export default Workshops;
