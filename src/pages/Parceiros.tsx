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
  sectorPartners,
  sectors,
  knowledgeCategories,
  internationalRegions,
  ecosystemStats,
  getPartnerInitials,
} from "@/data/partners";

const Parceiros = () => {
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

      {/* Parceiros Setoriais - Mandala */}
      <section className="py-20 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🤝 Nosso Ecossistema
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Parceiros Setoriais
            </h2>
            <p className="text-lg text-muted-foreground">
              Cobertura completa da cadeia de valor do varejo
            </p>
          </div>

          {/* Mandala Container */}
          <div className="relative w-full max-w-4xl mx-auto aspect-square flex items-center justify-center">
            {/* Centro da Mandala */}
            <div className="absolute z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl">
              <div className="text-center text-white">
                <span className="block text-3xl sm:text-4xl font-bold">{sectorPartners.length}+</span>
                <span className="text-xs sm:text-sm opacity-90">Parceiros</span>
              </div>
            </div>

            {/* Anéis da Mandala */}
            {sectors.filter(s => s.id !== "todos").map((sector, sectorIndex) => {
              const sectorPartnersFiltered = sectorPartners.filter(p => p.sector === sector.id);
              const ringRadius = 140 + sectorIndex * 90; // Raio progressivo
              const partnersInRing = sectorPartnersFiltered.slice(0, 8); // Max 8 por anel
              
              return (
                <div key={sector.id} className="absolute inset-0 flex items-center justify-center">
                  {/* Anel decorativo */}
                  <div 
                    className="absolute rounded-full border border-dashed border-primary/20"
                    style={{ 
                      width: `${ringRadius * 2}px`, 
                      height: `${ringRadius * 2}px` 
                    }}
                  />
                  
                  {/* Parceiros no anel */}
                  {partnersInRing.map((partner, index) => {
                    const angle = (index * 360) / partnersInRing.length - 90;
                    const radian = (angle * Math.PI) / 180;
                    const x = Math.cos(radian) * ringRadius;
                    const y = Math.sin(radian) * ringRadius;
                    
                    return (
                      <div
                        key={partner.id}
                        className="absolute group cursor-pointer"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden">
                          {partner.logo ? (
                            <img 
                              src={partner.logo} 
                              alt={partner.name}
                              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                            />
                          ) : (
                            <span className="text-xs sm:text-sm font-bold text-primary/60">
                              {getPartnerInitials(partner.name)}
                            </span>
                          )}
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                          <div className="bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                            {partner.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Label do setor */}
                  <div 
                    className="absolute bg-muted/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground shadow-sm"
                    style={{
                      transform: `translate(${Math.cos((-45 * Math.PI) / 180) * (ringRadius + 40)}px, ${Math.sin((-45 * Math.PI) / 180) * (ringRadius + 40)}px)`,
                    }}
                  >
                    {sector.icon} {sector.name.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {sectors.filter(s => s.id !== "todos").map((sector) => (
              <div 
                key={sector.id}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border"
              >
                <span>{sector.icon}</span>
                <span className="text-sm font-medium text-muted-foreground">{sector.name}</span>
                <span className="text-xs text-primary font-bold">
                  ({sectorPartners.filter(p => p.sector === sector.id).length})
                </span>
              </div>
            ))}
          </div>
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
