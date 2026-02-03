import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

const directors = [
  {
    name: "[Nome do Presidente]",
    role: "Presidente",
    company: "[Empresa]",
    bio: "Profissional com mais de 20 anos de experiência no setor de varejo e PDV. Lidera iniciativas de inovação e transformação digital.",
  },
  {
    name: "[Nome do Vice-Presidente]",
    role: "Vice-Presidente",
    company: "[Empresa]",
    bio: "Especialista em visual merchandising e store design, com atuação em grandes redes varejistas nacionais e internacionais.",
  },
  {
    name: "[Nome do Diretor Financeiro]",
    role: "Diretor Financeiro",
    company: "[Empresa]",
    bio: "Responsável pela gestão financeira e sustentabilidade da associação, com background em gestão empresarial.",
  },
  {
    name: "[Nome do Diretor de Eventos]",
    role: "Diretor de Eventos",
    company: "[Empresa]",
    bio: "Coordena a agenda de eventos da ABIESV, incluindo o Backstage do Varejo e workshops técnicos.",
  },
  {
    name: "[Nome do Diretor de Conteúdo]",
    role: "Diretor de Conteúdo",
    company: "[Empresa]",
    bio: "Lidera a produção de conhecimento técnico e a curadoria da biblioteca da associação.",
  },
  {
    name: "[Nome do Diretor de Associados]",
    role: "Diretor de Associados",
    company: "[Empresa]",
    bio: "Responsável pelo relacionamento com associados e prospecção de novas empresas para o ecossistema.",
  },
];

const Diretoria = () => {
  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Sobre", url: "https://abiesv.org.br/sobre" },
      { name: "Diretoria", url: "https://abiesv.org.br/sobre/diretoria" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Diretoria e Governança — ABIESV"
        description="Conheça os líderes que conduzem a ABIESV e nosso modelo de governança participativa e transparente."
        canonical="https://abiesv.org.br/sobre/diretoria"
        schema={pageSchema}
      />

      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Diretoria e Governança
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A ABIESV é conduzida por profissionais experientes do setor, comprometidos com o 
              desenvolvimento do ecossistema de PDV no Brasil.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((director, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 mx-auto">
                    <span className="font-heading font-bold text-2xl text-muted-foreground">
                      {director.name.split(' ').slice(0, 2).map(n => n[0] || '').join('')}
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                      {director.name}
                    </h3>
                    <p className="text-primary font-medium mb-1">{director.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{director.company}</p>
                    <p className="text-sm text-muted-foreground">{director.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6 text-center">
              Modelo de Governança
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                A ABIESV opera com um modelo de governança participativa, onde as decisões estratégicas 
                são tomadas em conjunto pela diretoria e validadas em assembleias com os associados.
              </p>
              <p>
                Nosso mandato é de [PLACEHOLDER] anos, com possibilidade de reeleição. As eleições 
                são realizadas de forma transparente, com direito a voto para todos os associados 
                em dia com suas obrigações.
              </p>
              <p>
                Acreditamos que a diversidade de perspectivas fortalece nossa atuação e garante 
                que as iniciativas da associação reflitam as necessidades reais do ecossistema.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Diretoria;
