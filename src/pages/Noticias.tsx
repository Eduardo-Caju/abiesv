import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    slug: "tendencias-pdv-2024",
    title: "5 Tendências que vão transformar o PDV em 2024",
    excerpt: "Do visual merchandising orientado a dados à experiência omnichannel integrada, conheça as principais tendências para o ponto de venda.",
    author: "[Autor]",
    date: "15 de Janeiro de 2024",
    category: "Tendências",
    image: null,
  },
  {
    slug: "backstage-varejo-sp-sucesso",
    title: "Backstage do Varejo São Paulo reúne 80 profissionais",
    excerpt: "Edição paulista do evento levou participantes aos bastidores de grandes operações de varejo. Confira os destaques.",
    author: "[Autor]",
    date: "25 de Novembro de 2023",
    category: "Eventos",
    image: null,
  },
  {
    slug: "novo-guia-visual-merchandising",
    title: "ABIESV lança novo Guia de Visual Merchandising",
    excerpt: "Material técnico completo com estratégias comprovadas para aumentar a conversão no ponto de venda.",
    author: "[Autor]",
    date: "10 de Novembro de 2023",
    category: "Biblioteca",
    image: null,
  },
  {
    slug: "iluminacao-led-economia",
    title: "Como a iluminação LED pode reduzir custos operacionais",
    excerpt: "Estudo de caso mostra economia de até 45% na conta de energia com modernização de sistemas de iluminação.",
    author: "[Autor]",
    date: "28 de Outubro de 2023",
    category: "Tecnologia",
    image: null,
  },
  {
    slug: "nova-diretoria-abiesv",
    title: "ABIESV elege nova diretoria para o biênio 2024-2025",
    excerpt: "Conheça os novos líderes que vão conduzir a associação nos próximos dois anos.",
    author: "[Autor]",
    date: "15 de Outubro de 2023",
    category: "Institucional",
    image: null,
  },
];

const Noticias = () => {
  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Notícias", url: "https://abiesv.org.br/noticias" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Notícias — ABIESV"
        description="Fique por dentro das novidades do ecossistema de PDV e varejo. Notícias, eventos e lançamentos."
        canonical="https://abiesv.org.br/noticias"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Notícias
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Fique por dentro das novidades do ecossistema de PDV e varejo.
            </p>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {posts.map((post, index) => (
              <Card 
                key={post.slug}
                className={`border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className={`grid ${index === 0 ? 'lg:grid-cols-2' : 'md:grid-cols-3'}`}>
                    <div className="bg-muted flex items-center justify-center min-h-[200px]">
                      <div className="text-muted-foreground text-sm">
                        [Imagem do post]
                      </div>
                    </div>
                    <div className={`p-6 ${index === 0 ? '' : 'md:col-span-2'}`}>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                      </div>
                      <h2 className={`font-heading font-bold text-foreground mb-3 hover:text-primary transition-colors ${
                        index === 0 ? 'text-2xl' : 'text-xl'
                      }`}>
                        <Link to={`/noticias/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <Link
                          to={`/noticias/${post.slug}`}
                          className="text-sm font-medium text-primary hover:underline flex items-center"
                        >
                          Ler mais
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Categorias
          </h2>
          <div className="flex flex-wrap gap-3">
            {["Tendências", "Eventos", "Biblioteca", "Tecnologia", "Institucional", "Cases"].map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="text-base px-4 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Noticias;
