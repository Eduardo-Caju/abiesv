import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const practices = [
  {
    title: "Ética e Transparência",
    description: "Conduzimos todas as atividades com integridade, transparência nas decisões e prestação de contas aos associados.",
  },
  {
    title: "Qualidade e Excelência",
    description: "Buscamos a excelência em todos os produtos e serviços oferecidos, desde eventos até conteúdos técnicos.",
  },
  {
    title: "Colaboração Setorial",
    description: "Promovemos a colaboração entre empresas concorrentes em prol do desenvolvimento do setor como um todo.",
  },
  {
    title: "Sustentabilidade",
    description: "Incentivamos práticas sustentáveis no PDV e na operação das empresas associadas.",
  },
  {
    title: "Inovação Responsável",
    description: "Apoiamos a inovação tecnológica e de processos, sempre com foco no impacto positivo para o varejo.",
  },
  {
    title: "Inclusão e Diversidade",
    description: "Valorizamos a diversidade de perfis e perspectivas, promovendo um ecossistema mais inclusivo.",
  },
  {
    title: "Respeito à Concorrência",
    description: "Mantemos postura ética em relação à concorrência, evitando práticas que prejudiquem o mercado.",
  },
  {
    title: "Proteção de Dados",
    description: "Respeitamos a LGPD e as melhores práticas de proteção de dados pessoais de associados e participantes.",
  },
];

const BoasPraticas = () => {
  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Sobre", url: "https://abiesv.org.br/sobre" },
      { name: "Boas Práticas", url: "https://abiesv.org.br/sobre/boas-praticas" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Boas Práticas — ABIESV"
        description="Nosso compromisso com ética, transparência e melhores práticas no setor de PDV e varejo."
        canonical="https://abiesv.org.br/sobre/boas-praticas"
        schema={pageSchema}
      />

      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Boas Práticas
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Os princípios que orientam nossa atuação e o compromisso com a ética e 
              excelência no ecossistema de PDV.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {practices.map((practice, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {practice.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {practice.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Compromisso compartilhado
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Ao se associar à ABIESV, sua empresa se compromete com estes princípios e 
            contribui para um ecossistema mais ético e sustentável.
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

export default BoasPraticas;
