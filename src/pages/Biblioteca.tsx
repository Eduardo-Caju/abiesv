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
import { Search, Download, ArrowRight, FileText, BarChart, Briefcase } from "lucide-react";

const types = ["Todos", "Guia", "Pesquisa", "Case", "Norma"];
const themes = ["Todos", "Visual Merchandising", "Store Design", "Tecnologia", "Operações"];
const profiles = ["Todos", "Indústria/Serviços", "Varejo"];

const libraryItems = [
  {
    slug: "guia-visual-merchandising-2024",
    title: "Guia de Visual Merchandising 2024",
    type: "Guia",
    theme: "Visual Merchandising",
    profile: "Varejo",
    description: "Estratégias comprovadas para maximizar a conversão através do visual merchandising orientado a dados. Inclui checklists práticos e exemplos de grandes redes.",
    date: "Janeiro 2024",
    downloadUrl: "#",
    icon: FileText,
  },
  {
    slug: "pesquisa-comportamento-consumidor-pdv",
    title: "Pesquisa: Comportamento do Consumidor no PDV",
    type: "Pesquisa",
    theme: "Operações",
    profile: "Todos",
    description: "Estudo aprofundado sobre jornadas de compra e pontos de decisão no ambiente físico de varejo. Dados de mais de 5.000 consumidores entrevistados.",
    date: "Dezembro 2023",
    downloadUrl: "#",
    icon: BarChart,
  },
  {
    slug: "case-transformacao-digital-lojas",
    title: "Case: Transformação Digital em Lojas Físicas",
    type: "Case",
    theme: "Tecnologia",
    profile: "Indústria/Serviços",
    description: "Como uma rede varejista integrou tecnologia e design para criar experiências memoráveis e aumentar o ticket médio em 28%.",
    date: "Novembro 2023",
    downloadUrl: "#",
    icon: Briefcase,
  },
  {
    slug: "norma-iluminacao-varejo",
    title: "Norma Técnica: Iluminação para Varejo",
    type: "Norma",
    theme: "Store Design",
    profile: "Indústria/Serviços",
    description: "Diretrizes técnicas para projetos de iluminação em ambientes comerciais, com foco em eficiência energética e valorização de produtos.",
    date: "Outubro 2023",
    downloadUrl: "#",
    icon: FileText,
  },
  {
    slug: "guia-refrigeracao-comercial",
    title: "Guia de Refrigeração Comercial",
    type: "Guia",
    theme: "Operações",
    profile: "Indústria/Serviços",
    description: "Tudo sobre sistemas de refrigeração para supermercados, farmácias e food service. Manutenção, eficiência e sustentabilidade.",
    date: "Setembro 2023",
    downloadUrl: "#",
    icon: FileText,
  },
  {
    slug: "pesquisa-tendencias-pdv-2024",
    title: "Pesquisa: Tendências do PDV para 2024",
    type: "Pesquisa",
    theme: "Visual Merchandising",
    profile: "Todos",
    description: "As principais tendências que vão impactar o ponto de venda no próximo ano, segundo especialistas do setor.",
    date: "Dezembro 2023",
    downloadUrl: "#",
    icon: BarChart,
  },
];

const Biblioteca = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedTheme, setSelectedTheme] = useState("Todos");
  const [selectedProfile, setSelectedProfile] = useState("Todos");

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "Todos" || item.type === selectedType;
    const matchesTheme = selectedTheme === "Todos" || item.theme === selectedTheme;
    const matchesProfile = selectedProfile === "Todos" || item.profile === selectedProfile || item.profile === "Todos";
    return matchesSearch && matchesType && matchesTheme && matchesProfile;
  });

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Biblioteca", url: "https://abiesv.org.br/biblioteca" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Biblioteca Técnica — Guias, Normas e Pesquisas de Varejo"
        description="Acesso a materiais técnicos sobre PDV, VM e operações. Baixe e compartilhe."
        canonical="https://abiesv.org.br/biblioteca"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Biblioteca técnica do varejo
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Guias, pesquisas, normas e cases para transformar sua operação de PDV.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Tema" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedProfile} onValueChange={setSelectedProfile}>
              <SelectTrigger className="w-full lg:w-44">
                <SelectValue placeholder="Perfil" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((profile) => (
                  <SelectItem key={profile} value={profile}>{profile}</SelectItem>
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
            {filteredItems.length} {filteredItems.length === 1 ? "item encontrado" : "itens encontrados"}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.slug}
                className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{item.type}</Badge>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/biblioteca/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                        {item.theme}
                      </span>
                      <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                        {item.profile}
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-between items-center">
                    <Link
                      to={`/biblioteca/${item.slug}`}
                      className="text-sm font-medium text-primary hover:underline flex items-center"
                    >
                      Ver conteúdo
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    <Button asChild variant="ghost" size="sm">
                      <a href={item.downloadUrl}>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nenhum conteúdo encontrado com os filtros selecionados.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("Todos");
                  setSelectedTheme("Todos");
                  setSelectedProfile("Todos");
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
            Acesso completo à biblioteca
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Associados têm acesso ilimitado a todos os materiais e recebem novos conteúdos em primeira mão.
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

export default Biblioteca;
