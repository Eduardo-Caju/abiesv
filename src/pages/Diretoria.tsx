import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Director {
  name: string;
  role: string;
  email?: string;
  photo?: string;
}

const leadership: Director[] = [
  { name: "Roberto Gabrielli", role: "Presidente", email: "presidente@abiesv.org.br" },
  { name: "Sonia Paloschi", role: "Vice-Presidente", email: "vice-presidente@abiesv.org.br" },
];

const vicePresidents: Director[] = [
  { name: "Claudio Elias Conz", role: "VP - Educação", email: "educacao@abiesv.org.br" },
  { name: "Cristina Souza", role: "VP - Foodservice", email: "foodservice@abiesv.org.br" },
  { name: "Emerson Carrijo", role: "VP - Mobilidade", email: "mobilidade@abiesv.org.br" },
  { name: "Flávia Montes", role: "VP - Comunicação", email: "comunicacao@abiesv.org.br", photo: "/directors/flavia-montes.jpg" },
  { name: "Francisco José Ritondaro", role: "VP - Malls & Integração", photo: "/directors/francisco-ritondaro.jpg" },
  { name: "Gabriela Jardim", role: "VP - Trade Marketing", email: "trademarketing@abiesv.org.br", photo: "/directors/gabriela-jardim.jpg" },
  { name: "José Fugice", role: "VP - Varejo", email: "varejo@abiesv.org.br", photo: "/directors/jose-fugice.jpg" },
  { name: "Olegário Araújo", role: "VP - Inteligência de Mercado", photo: "/directors/olegario-araujo.jpg" },
  { name: "Vanessa Mendonça", role: "VP - Relações Institucionais", photo: "/directors/vanessa-mendonca.jpg" },
];

const directors: Director[] = [
  { name: "Carolina Tonegutti", role: "Diretoria - Fiscal e Tributário", email: "fiscal@abiesv.org.br" },
  { name: "Eduardo Aguiar", role: "Diretor Administrativo Financeiro", email: "financeiro@abiesv.org.br" },
  { name: "Fernanda Bortoluzzi", role: "Diretoria - Planejamento", email: "planejamento@abiesv.org.br", photo: "/directors/fernanda-bortoluzzi.jpg" },
  { name: "Fernando Fernandes", role: "Diretor Jurídico", email: "juridico@abiesv.org.br" },
  { name: "Karina Duarte", role: "Diretoria - Projetos", email: "projeto@abiesv.org.br", photo: "/directors/karina-duarte.jpg" },
  { name: "Leonardo Blumm", role: "Diretoria - Regional RS", email: "regionalrs@abiesv.org.br" },
  { name: "Raquel Monreal Zeppelini", role: "Diretoria - Criação, Campanhas e Parcerias", photo: "/directors/raquel-monreal.jpg" },
  { name: "Rubens Nista", role: "Diretor de Processo Industrial e Precificações" },
  { name: "Sara Elydio", role: "Diretoria - Tendências e Inovações", photo: "/directors/sara-elydio.jpg" },
  { name: "Thais Pizzi", role: "Diretoria - Startups", email: "startup@abiesv.org.br" },
  { name: "Wander Miranda", role: "Diretoria - Regional ES", email: "regionales@abiesv.org.br" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function DirectorCard({ director }: { director: Director }) {
  return (
    <Card className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardContent className="p-6 text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          {director.photo ? (
            <AvatarImage src={director.photo} alt={director.name} className="object-cover" />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-heading font-bold">
            {getInitials(director.name)}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-heading font-bold text-lg text-foreground mb-1">
          {director.name}
        </h3>
        <p className="text-primary font-medium text-sm mb-2">{director.role}</p>
        {director.email && (
          <a
            href={`mailto:${director.email}`}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {director.email}
          </a>
        )}
      </CardContent>
    </Card>
  );
}

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
          {/* Presidência */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
              Presidência
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {leadership.map((director, index) => (
                <DirectorCard key={index} director={director} />
              ))}
            </div>
          </div>

          {/* Vice-Presidências e Diretorias em Tabs */}
          <Tabs defaultValue="vps" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="vps">Vice-Presidências</TabsTrigger>
              <TabsTrigger value="directors">Diretorias</TabsTrigger>
            </TabsList>

            <TabsContent value="vps">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vicePresidents.map((director, index) => (
                  <DirectorCard key={index} director={director} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="directors">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {directors.map((director, index) => (
                  <DirectorCard key={index} director={director} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
                Nosso mandato é de 2 anos, com possibilidade de reeleição. As eleições são realizadas
                de forma transparente, com direito a voto para todos os associados em dia com suas
                obrigações.
              </p>
              <p>
                Acreditamos que a diversidade de perspectivas fortalece nossa atuação e garante que
                as iniciativas da associação reflitam as necessidades reais do ecossistema.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Diretoria;
