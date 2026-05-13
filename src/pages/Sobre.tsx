import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, organizationSchema, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Users, BookOpen, BarChart3, Handshake, Award } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Conhecimento",
    description: "Biblioteca técnica com guias, pesquisas e normas para orientar decisões no PDV.",
  },
  {
    icon: BarChart3,
    title: "Dados",
    description: "Números do setor atualizados e métricas essenciais para o ecossistema de varejo.",
  },
  {
    icon: Handshake,
    title: "Conexões",
    description: "Eventos e comunidade que conectam indústria, serviços e varejo.",
  },
];

const Sobre = () => {
  const pageSchema = [
    organizationSchema,
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Sobre", url: "https://abiesv.org.br/sobre" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Sobre a ABIESV",
      description: "Missão, diretoria e governança. Compromisso com ética e impacto no PDV.",
      url: "https://abiesv.org.br/sobre",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Sobre a ABIESV — Quem Somos, Governança e Boas Práticas"
        description="Missão, diretoria e governança. Compromisso com ética e impacto no PDV."
        canonical="https://abiesv.org.br/sobre"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Quem somos e como atuamos
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A ABIESV é a Associação Brasileira da Indústria de Equipamentos e Serviços para o Varejo, 
              conectando empresas que transformam o ponto de venda no Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Propósito e Pilares
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Nossa missão é fortalecer o ecossistema de PDV brasileiro através de conhecimento técnico, 
                dados setoriais e conexões estratégicas entre indústria, serviços e varejo.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Atuamos como ponte entre fornecedores de soluções para o ponto de venda e varejistas 
                que buscam inovação, eficiência e experiências memoráveis para seus clientes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" size="lg">
                  <Link to="/associe-se">
                    Associe-se
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/sobre/boas-praticas">
                    Boas Práticas
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-6">
              {pillars.map((pillar, index) => (
                <Card key={index} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <pillar.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance Links */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-12 text-center">
            Governança e Transparência
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/sobre/diretoria" className="group">
              <Card className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    Diretoria e Governança
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Conheça os líderes que conduzem a ABIESV e nosso modelo de governança participativa.
                  </p>
                  <span className="text-primary font-medium flex items-center">
                    Conhecer a diretoria
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/sobre/boas-praticas" className="group">
              <Card className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    Boas Práticas
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nosso compromisso com ética, transparência e melhores práticas no setor.
                  </p>
                  <span className="text-primary font-medium flex items-center">
                    Ver princípios
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
              Impacto no Ecossistema
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Desde 2002, a ABIESV tem sido referência na disseminação de conhecimento técnico 
              e na conexão entre empresas do setor. Nossos eventos já reuniram mais de 500 
              profissionais, e nossa biblioteca técnica é consultada por centenas de empresas mensalmente.
            </p>
            <div className="grid grid-cols-3 gap-8 py-8 border-y border-border">
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">+100</div>
                <p className="text-sm text-muted-foreground">Empresas associadas</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">+2.000</div>
                <p className="text-sm text-muted-foreground">Profissionais impactados</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">+50</div>
                <p className="text-sm text-muted-foreground">Eventos realizados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Faça parte desta história
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Junte-se às empresas que estão transformando o varejo brasileiro.
          </p>
          <Button asChild variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
            <Link to="/associe-se">
              Associe-se agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
