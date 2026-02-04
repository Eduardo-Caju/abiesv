import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Newspaper, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  newsArticles,
  getNewsCategories,
  getNewsSectors,
  getFeaturedNews,
  type NewsArticle,
} from "@/data/news";

const Noticias = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");

  const categories = getNewsCategories();
  const sectors = getNewsSectors();
  const featuredNews = getFeaturedNews();

  const filteredNews = useMemo(() => {
    return newsArticles
      .filter((article) => {
        const matchesCategory =
          selectedCategory === "all" || article.category === selectedCategory;
        const matchesSector =
          selectedSector === "all" || article.sector === selectedSector;
        return matchesCategory && matchesSector;
      })
      .sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
      );
  }, [selectedCategory, selectedSector]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSector("all");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedSector !== "all";

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Notícias", url: "https://abiesv.org.br/noticias" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Notícias do Varejo — ABIESV"
        description="Fique por dentro das novidades do ecossistema de PDV e varejo. Tendências, tecnologia, visual merchandising e estratégias para o ponto de venda."
        canonical="https://abiesv.org.br/noticias"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Newspaper className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Curadoria ABIESV
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Notícias do Varejo
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Acompanhe as principais tendências e novidades do ecossistema de PDV, 
              visual merchandising e varejo no Brasil e no mundo.
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Em Destaque
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredNews.map((article) => (
                <FeaturedCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>

            <div className="flex flex-wrap gap-4 flex-1">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedCategory("all")}
                >
                  Todas Categorias
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Sector Filter */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedSector === "all" ? "secondary" : "outline"}
                  className="cursor-pointer hover:bg-secondary transition-colors"
                  onClick={() => setSelectedSector("all")}
                >
                  Todos Setores
                </Badge>
                {sectors.map((sector) => (
                  <Badge
                    key={sector}
                    variant={selectedSector === sector ? "secondary" : "outline"}
                    className="cursor-pointer hover:bg-secondary transition-colors"
                    onClick={() => setSelectedSector(sector)}
                  >
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {filteredNews.length}{" "}
              {filteredNews.length === 1 ? "notícia encontrada" : "notícias encontradas"}
            </p>
          </div>

          <div className="grid gap-6">
            {filteredNews.map((article, index) => (
              <NewsCard key={article.slug} article={article} featured={index === 0} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhuma notícia encontrada com os filtros selecionados.
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Explore por Categoria
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const count = newsArticles.filter((a) => a.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="p-6 bg-background rounded-lg border hover:border-primary hover:shadow-md transition-all text-left group"
                >
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {count} {count === 1 ? "artigo" : "artigos"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Featured Card Component
const FeaturedCard = ({ article }: { article: NewsArticle }) => (
  <a
    href={article.sourceUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
  >
    <Card className="h-full border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="default" className="text-xs">
            {article.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {article.sector}
          </Badge>
        </div>
        <h3 className="font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {article.date}
          </span>
          <span className="flex items-center gap-1 text-primary group-hover:underline">
            {article.source}
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </CardContent>
    </Card>
  </a>
);

// News Card Component
const NewsCard = ({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) => (
  <a
    href={article.sourceUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
  >
    <Card
      className={`border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden ${
        featured ? "bg-gradient-to-r from-primary/5 to-transparent" : ""
      }`}
    >
      <CardContent className="p-0">
        <div className={`grid ${featured ? "lg:grid-cols-3" : "md:grid-cols-4"}`}>
          <div
            className={`p-6 ${featured ? "lg:col-span-3" : "md:col-span-4"}`}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="default">{article.category}</Badge>
              <Badge variant="outline">{article.sector}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {article.date}
              </span>
            </div>
            <h2
              className={`font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${
                featured ? "text-2xl" : "text-xl"
              }`}
            >
              {article.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Fonte: {article.source}
              </span>
              <span className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1">
                Ler matéria completa
                <ExternalLink className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </a>
);

export default Noticias;
