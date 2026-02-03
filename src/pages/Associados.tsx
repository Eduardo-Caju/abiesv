import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ExternalLink, MessageCircle, Mail, MapPin } from "lucide-react";

const categories = [
  "Todas",
  "Mobiliário",
  "Comunicação Visual",
  "Tecnologia",
  "Obras e Reforma",
  "Iluminação",
  "Refrigeração",
];

const states = [
  "Todos",
  "SP",
  "RJ",
  "MG",
  "RS",
  "PR",
  "SC",
];

const associates = [
  {
    slug: "loja-conceito",
    name: "Loja Conceito",
    logo: "LC",
    category: "Mobiliário",
    state: "SP",
    description: "Especializada em mobiliário para varejo de moda e lifestyle, com mais de 20 anos de experiência em projetos completos de PDV.",
    tags: ["Mobiliário", "Varejo de Moda", "Store Design"],
    website: "https://exemplo.com",
    email: "contato@lojaconceito.com.br",
    whatsapp: "5511999999999",
  },
  {
    slug: "tech-retail",
    name: "Tech Retail",
    logo: "TR",
    category: "Tecnologia",
    state: "SP",
    description: "Soluções tecnológicas para o PDV: self-checkout, analytics, digital signage e integração omnichannel para varejistas.",
    tags: ["Tecnologia", "Digital Signage", "Analytics"],
    website: "https://exemplo.com",
    email: "contato@techretail.com.br",
    whatsapp: "5511999999999",
  },
  {
    slug: "visual-store",
    name: "Visual Store",
    logo: "VS",
    category: "Comunicação Visual",
    state: "RJ",
    description: "Comunicação visual e sinalização para grandes redes varejistas. Produção, instalação e manutenção em todo o Brasil.",
    tags: ["Comunicação Visual", "Sinalização", "Produção"],
    website: "https://exemplo.com",
    email: "contato@visualstore.com.br",
    whatsapp: "5521999999999",
  },
  {
    slug: "ilumina-varejo",
    name: "Ilumina Varejo",
    logo: "IV",
    category: "Iluminação",
    state: "MG",
    description: "Projetos de iluminação para varejo com foco em eficiência energética e valorização de produtos. LED e automação.",
    tags: ["Iluminação", "LED", "Eficiência"],
    website: "https://exemplo.com",
    email: "contato@iluminavarejo.com.br",
    whatsapp: "5531999999999",
  },
  {
    slug: "frio-comercial",
    name: "Frio Comercial",
    logo: "FC",
    category: "Refrigeração",
    state: "RS",
    description: "Refrigeração comercial para supermercados, farmácias e food service. Projetos turnkey e manutenção preventiva.",
    tags: ["Refrigeração", "Supermercados", "Food Service"],
    website: "https://exemplo.com",
    email: "contato@friocomercial.com.br",
    whatsapp: "5551999999999",
  },
  {
    slug: "obras-express",
    name: "Obras Express",
    logo: "OE",
    category: "Obras e Reforma",
    state: "SP",
    description: "Construção e reforma de lojas com cronograma acelerado. Gestão de obra, acabamentos e entrega no prazo.",
    tags: ["Obras", "Reforma", "Gestão"],
    website: "https://exemplo.com",
    email: "contato@obrasexpress.com.br",
    whatsapp: "5511999999999",
  },
];

const Associados = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedState, setSelectedState] = useState("Todos");

  const filteredAssociates = associates.filter((associate) => {
    const matchesSearch = associate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         associate.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || associate.category === selectedCategory;
    const matchesState = selectedState === "Todos" || associate.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Associados", url: "https://abiesv.org.br/associados" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Guia de Associados ABIESV",
      description: "Encontre fornecedores por categoria e estado. Contato direto com associados ABIESV.",
      itemListElement: associates.map((associate, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Organization",
          name: associate.name,
          description: associate.description,
          url: `https://abiesv.org.br/associados/${associate.slug}`,
        },
      })),
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Guia de Associados — Fornecedores e Parceiros para PDV"
        description="Encontre fornecedores por categoria e estado. Contato direto com associados ABIESV."
        canonical="https://abiesv.org.br/associados"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Encontre fornecedores e parceiros para o PDV
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Diretório de empresas associadas à ABIESV, especializadas em soluções para o ponto de venda.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground mb-8">
            {filteredAssociates.length} {filteredAssociates.length === 1 ? "empresa encontrada" : "empresas encontradas"}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssociates.map((associate) => (
              <Card 
                key={associate.slug}
                className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <span className="font-heading font-bold text-xl text-muted-foreground">
                          {associate.logo}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-lg text-foreground mb-1 truncate">
                          <Link to={`/associados/${associate.slug}`} className="hover:text-primary transition-colors">
                            {associate.name}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{associate.state}</span>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            {associate.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {associate.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {associate.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-muted/30 border-t border-border flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href={associate.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Site
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href={`mailto:${associate.email}`}>
                        <Mail className="h-4 w-4 mr-1" />
                        E-mail
                      </a>
                    </Button>
                    <Button asChild variant="default" size="sm" className="flex-1">
                      <a 
                        href={`https://wa.me/${associate.whatsapp}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAssociates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nenhuma empresa encontrada com os filtros selecionados.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todas");
                  setSelectedState("Todos");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Sua empresa no Guia de Associados
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Associe-se à ABIESV e ganhe visibilidade junto a varejistas de todo o Brasil.
          </p>
          <Button asChild variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
            <Link to="/associe-se">
              Quero me associar
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Associados;
