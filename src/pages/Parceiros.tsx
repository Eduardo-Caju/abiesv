import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Globe, 
  Building, 
  ExternalLink,
  Handshake,
  TrendingUp,
  BarChart3,
  Network,
  MessageCircle
} from "lucide-react";
import {
  strategicPartners,
  sectorPartners,
  sectors,
  knowledgeCategories,
  internationalRegions,
  ecosystemStats,
  getBadgeLabel,
  getBadgeColor,
  getPartnerInitials,
} from "@/data/partners";

const Parceiros = () => {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filteredSectorPartners = activeFilter === "todos" 
    ? sectorPartners 
    : sectorPartners.filter(p => p.sector === activeFilter);

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Parceiros", url: "https://abiesv.org.br/parceiros" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ABIESV - Ecossistema de Parceiros",
      description: "Conectando os principais players do varejo brasileiro ao futuro do ponto de venda",
      url: "https://abiesv.org.br/parceiros",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Parceiros — Ecossistema ABIESV"
        description="Conheça o ecossistema de parceiros ABIESV: mais de 150 empresas, institutos e organizações conectando o varejo brasileiro ao futuro do PDV."
        canonical="https://abiesv.org.br/parceiros"
        schema={pageSchema}
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm font-medium px-4 py-1.5">
              <Handshake className="w-4 h-4 mr-2" />
              Ecossistema de Parceiros
            </Badge>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ecossistema de Parceiros ABIESV
            </h1>
            
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Conectando os principais players do varejo brasileiro ao futuro do ponto de venda
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <span className="block text-4xl sm:text-5xl font-bold text-white mb-2">
                  +{ecosystemStats.partners}
                </span>
                <span className="text-blue-200 text-sm uppercase tracking-wider">Parceiros</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl sm:text-5xl font-bold text-white mb-2">
                  {ecosystemStats.states}
                </span>
                <span className="text-blue-200 text-sm uppercase tracking-wider">Estados</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl sm:text-5xl font-bold text-white mb-2">
                  +{ecosystemStats.countries}
                </span>
                <span className="text-blue-200 text-sm uppercase tracking-wider">Países</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Núcleo Estratégico */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              ⭐ Parceiros Estratégicos
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Núcleo Estratégico
            </h2>
            <p className="text-lg text-muted-foreground">
              Empresas que constroem o futuro do varejo brasileiro ao lado da ABIESV
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategicPartners.map((partner) => (
              <Card 
                key={partner.id} 
                className="group relative border-0 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 overflow-visible"
              >
                {/* Badge */}
                <div className="absolute -top-3 right-4 z-10">
                  <span className={`${getBadgeColor(partner.badge)} px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg`}>
                    {partner.badge === "fundador" && "🏆 "}
                    {partner.badge === "estrategico" && "⚡ "}
                    {partner.badge === "ancora" && "🎯 "}
                    {getBadgeLabel(partner.badge)}
                  </span>
                </div>

                <CardContent className="p-8 pt-10">
                  {/* Logo */}
                  <div className="h-28 flex items-center justify-center mb-6 p-4 bg-muted/50 rounded-xl">
                    {partner.logo ? (
                      <img 
                        src={partner.logo} 
                        alt={`Logo ${partner.name}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-primary/40">
                        {getPartnerInitials(partner.name)}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {partner.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 min-h-[60px]">
                    {partner.description}
                  </p>

                  {/* Category */}
                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg mb-4">
                    <span className="text-lg">{partner.categoryIcon}</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {partner.category}
                    </span>
                  </div>

                  {/* Link */}
                  {partner.website && (
                    <a 
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                    >
                      Saiba mais
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parceiros Setoriais */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Parceiros Setoriais
            </h2>
            <p className="text-lg text-muted-foreground">
              Cobertura completa da cadeia de valor do varejo
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveFilter(sector.id)}
                className={`
                  px-5 py-3 rounded-full font-semibold text-sm transition-all
                  ${activeFilter === sector.id 
                    ? "bg-primary text-primary-foreground shadow-button" 
                    : "bg-white border-2 border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }
                `}
              >
                <span className="mr-2">{sector.icon}</span>
                {sector.name}
              </button>
            ))}
          </div>

          {/* Grid de Parceiros */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSectorPartners.map((partner) => (
              <Card 
                key={partner.id}
                className="group border hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-5 text-center">
                  {/* Logo */}
                  <div className="h-16 flex items-center justify-center mb-4 p-3 bg-muted/50 rounded-lg">
                    {partner.logo ? (
                      <img 
                        src={partner.logo} 
                        alt={`Logo ${partner.name}`}
                        className="max-h-full max-w-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all"
                      />
                    ) : (
                      <span className="text-xl font-bold text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                        {getPartnerInitials(partner.name)}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="font-semibold text-sm text-foreground mb-2 min-h-[40px] flex items-center justify-center">
                    {partner.name}
                  </h4>

                  {/* Tag */}
                  <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                    {sectors.find(s => s.id === partner.sector)?.name.split(' ')[0] || partner.sector}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSectorPartners.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Nenhum parceiro encontrado neste setor.
            </p>
          )}
        </div>
      </section>

      {/* Parceiros de Conhecimento */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20 mb-4">
              🎓 Conhecimento & Pesquisa
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Parceiros de Conhecimento
            </h2>
            <p className="text-lg text-muted-foreground">
              Universidades, institutos de pesquisa e consultoras que fortalecem a base intelectual do setor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {knowledgeCategories.map((category) => (
              <Card key={category.id} className="border-0 shadow-card hover:-translate-y-1 transition-all">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950 dark:to-purple-950 flex items-center justify-center shrink-0">
                      <span className="text-4xl">{category.icon}</span>
                    </div>

                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                        {category.title}
                      </h3>

                      {/* Partners */}
                      <div className="space-y-3 mb-4">
                        {category.partners.map((partner) => (
                          <div 
                            key={partner.id}
                            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                              <Building className="w-4 h-4 text-violet-600" />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {partner.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parceiros Internacionais */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-4">
              🌎 Alcance Global
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Parceiros Internacionais
            </h2>
            <p className="text-lg text-slate-300">
              Conectados às principais redes globais de varejo e inovação
            </p>
          </div>

          {/* Stats Internacionais */}
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 mb-16">
            <div className="text-center">
              <span className="block text-5xl font-bold text-emerald-400 mb-2">
                {ecosystemStats.countries}+
              </span>
              <span className="text-slate-400 text-sm uppercase tracking-wider">Países</span>
            </div>
            <div className="text-center">
              <span className="block text-5xl font-bold text-emerald-400 mb-2">
                {ecosystemStats.organizations}+
              </span>
              <span className="text-slate-400 text-sm uppercase tracking-wider">Organizações</span>
            </div>
            <div className="text-center">
              <span className="block text-5xl font-bold text-emerald-400 mb-2">
                {ecosystemStats.continents}
              </span>
              <span className="text-slate-400 text-sm uppercase tracking-wider">Continentes</span>
            </div>
          </div>

          {/* Regiões */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalRegions.map((region) => (
              <div 
                key={region.id}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all hover:-translate-y-1"
              >
                {/* Flag */}
                <span className="text-5xl mb-4 block">{region.flag}</span>

                {/* Name */}
                <h3 className="font-heading text-xl font-bold text-white mb-6">
                  {region.name}
                </h3>

                {/* Partners */}
                <ul className="space-y-3">
                  {region.partners.map((partner) => (
                    <li key={partner.id}>
                      <a 
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                      >
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                          {partner.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Faça Parte do Maior Ecossistema de Varejo do Brasil
            </h2>
            
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Conecte-se com +{ecosystemStats.partners} empresas, institutos e organizações que transformam o ponto de venda brasileiro
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                <Link to="/associe-se">
                  <Users className="mr-2 h-5 w-5" />
                  Quero ser Parceiro
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contato">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar com o Time
                </Link>
              </Button>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Handshake, label: "Networking Qualificado" },
                { icon: BarChart3, label: "Dados & Pesquisas" },
                { icon: TrendingUp, label: "Visibilidade de Marca" },
                { icon: Network, label: "Conexões Internacionais" },
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                >
                  <benefit.icon className="w-6 h-6 text-purple-200" />
                  <span className="text-sm font-medium text-white">{benefit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Parceiros;
