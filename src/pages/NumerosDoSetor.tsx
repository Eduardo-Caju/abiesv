import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowRight,
  ShoppingCart,
  Users,
  Store,
  DollarSign,
  Package,
  Zap
} from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "+35%",
    label: "Aumento de conversão",
    description: "PDVs com boas práticas de VM aplicadas registram aumento médio de 35% na taxa de conversão.",
    source: "[PLACEHOLDER - Pesquisa ABIESV]",
    date: "[ANO]",
    trend: "up",
  },
  {
    icon: DollarSign,
    value: "R$ 127",
    label: "Ticket médio",
    description: "Ticket médio do varejo de moda e lifestyle no Brasil, considerando lojas de shopping e rua.",
    source: "[PLACEHOLDER - IBEVAR]",
    date: "[ANO]",
    trend: "neutral",
  },
  {
    icon: Store,
    value: "15%",
    label: "Investimento em PDV",
    description: "Percentual médio do faturamento que varejistas investem em modernização do ponto de venda.",
    source: "[PLACEHOLDER - Pesquisa ABIESV]",
    date: "[ANO]",
    trend: "up",
  },
  {
    icon: Users,
    value: "2,8x",
    label: "Tempo de permanência",
    description: "Lojas com design orientado à experiência aumentam o tempo de permanência do cliente em até 2,8 vezes.",
    source: "[PLACEHOLDER - Estudo Setorial]",
    date: "[ANO]",
    trend: "up",
  },
  {
    icon: ShoppingCart,
    value: "68%",
    label: "Decisão no PDV",
    description: "Percentual de decisões de compra que são tomadas dentro do ponto de venda.",
    source: "[PLACEHOLDER - POPAI Brasil]",
    date: "[ANO]",
    trend: "neutral",
  },
  {
    icon: Package,
    value: "-22%",
    label: "Custo de operação",
    description: "Redução média no custo operacional com implementação de tecnologias de automação no PDV.",
    source: "[PLACEHOLDER - Tech Retail]",
    date: "[ANO]",
    trend: "down",
  },
  {
    icon: Zap,
    value: "45%",
    label: "Eficiência energética",
    description: "Economia média com modernização de sistemas de iluminação para LED em lojas físicas.",
    source: "[PLACEHOLDER - ABIESV]",
    date: "[ANO]",
    trend: "up",
  },
  {
    icon: TrendingUp,
    value: "+18%",
    label: "Vendas omnichannel",
    description: "Crescimento nas vendas de lojas físicas que integraram canais digitais à experiência do cliente.",
    source: "[PLACEHOLDER - E-commerce Brasil]",
    date: "[ANO]",
    trend: "up",
  },
];

const trends = [
  "Visual merchandising orientado a dados e analytics",
  "Experiência omnichannel integrada",
  "Eficiência operacional e sustentabilidade",
];

const NumerosDoSetor = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

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
            Métricas essenciais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <metric.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">
                    {metric.value}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {metric.description}
                  </p>
                  <div className="text-xs text-muted-foreground/70">
                    <p>Fonte: {metric.source}</p>
                    <p>Data: {metric.date}</p>
                  </div>
                </CardContent>
              </Card>
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
