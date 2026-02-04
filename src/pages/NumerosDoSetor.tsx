import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const metrics = [
  {
    value: "R$ 532,1 BI",
    description: "Movimentação projetada pelo varejo brasileiro em 2025",
    source: "IPC Maps",
  },
  {
    value: "+35%",
    description: "Aumento médio na taxa de conversão em PDVs com boas práticas de Visual Merchandising aplicadas",
    source: "Pesquisa ABIESV",
  },
  {
    value: "68%",
    description: "Das decisões de compra são tomadas dentro do ponto de venda",
    source: "POPAI Brasil",
  },
  {
    value: "2,8x",
    description: "Aumento no tempo de permanência em lojas com design orientado à experiência",
    source: "Estudo Setorial ABIESV",
  },
  {
    value: "R$ 127",
    description: "Ticket médio do varejo de moda e lifestyle no Brasil (lojas de shopping e rua)",
    source: "IBEVAR",
  },
  {
    value: "15%",
    description: "Percentual médio do faturamento investido em modernização do ponto de venda",
    source: "Pesquisa ABIESV",
  },
  {
    value: "-22%",
    description: "Redução média no custo operacional com tecnologias de automação no PDV",
    source: "Tech Retail",
  },
  {
    value: "+18%",
    description: "Crescimento nas vendas de lojas físicas que integraram canais digitais à experiência",
    source: "E-commerce Brasil",
  },
];

const trends = [
  "Visual merchandising orientado a dados e analytics",
  "Experiência omnichannel integrada",
  "Eficiência operacional e sustentabilidade",
];

const NumerosDoSetor = () => {

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Números do Setor", url: "https://abiesv.org.br/numeros-do-setor" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Números do Setor - ABIESV",
      description: "Principais indicadores de PDV com atualização periódica e fontes.",
      url: "https://abiesv.org.br/numeros-do-setor",
      creator: {
        "@type": "Organization",
        name: "ABIESV",
      },
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Números do Setor — Indicadores e Métricas do Varejo"
        description="Principais indicadores de PDV com atualização periódica e fontes."
        canonical="https://abiesv.org.br/numeros-do-setor"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Indicadores do varejo e do ponto de venda
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Métricas essenciais para orientar decisões estratégicas no ecossistema de PDV brasileiro.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Destaques do momento
          </h2>
          <Card className="border-0 shadow-card">
            <CardContent className="p-8">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Top 3 tendências para o PDV
              </h3>
              <ul className="space-y-3">
                {trends.map((trend, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{trend}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Fonte: Pesquisa ABIESV — [PLACEHOLDER ANO]
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            O Setor em Números
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Metodologia e fontes
            </h2>
            <div className="prose prose-lg text-muted-foreground">
              <p>
                Os indicadores apresentados são compilados pela equipe técnica da ABIESV a partir de 
                pesquisas próprias, estudos de parceiros e dados públicos do setor.
              </p>
              <p>
                Atualizamos os dados periodicamente e indicamos sempre a fonte e a data de referência. 
                Para metodologia detalhada de cada indicador, consulte as publicações na{" "}
                <Link to="/biblioteca" className="text-primary hover:underline">
                  Biblioteca Técnica
                </Link>.
              </p>
              <p className="text-sm italic">
                [PLACEHOLDER: Incluir detalhes sobre frequência de atualização, parceiros de pesquisa e 
                links para estudos completos.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Dados exclusivos para associados
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Associados têm acesso a relatórios completos, benchmarks personalizados e 
            atualizações em primeira mão.
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

export default NumerosDoSetor;
