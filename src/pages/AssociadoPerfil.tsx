import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MessageCircle, 
  Globe, 
  Linkedin, 
  Instagram,
  MapPin,
  Calendar,
  Building,
  Users,
  Briefcase
} from "lucide-react";
import { getAssociateBySlug, getLogoInitials } from "@/data/associates";

const AssociadoPerfil = () => {
  const { slug } = useParams<{ slug: string }>();
  const associate = slug ? getAssociateBySlug(slug) : undefined;

  if (!associate) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Associado não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O associado que você procura não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/associados">Voltar ao Guia de Associados</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Associados", url: "https://abiesv.org.br/associados" },
      { name: associate.name, url: `https://abiesv.org.br/associados/${associate.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: associate.name,
      description: associate.shortDescription || `Empresa especializada em ${associate.category}`,
      url: `https://abiesv.org.br/associados/${associate.slug}`,
      address: associate.state ? {
        "@type": "PostalAddress",
        addressRegion: associate.state,
        addressLocality: associate.city,
        addressCountry: "BR",
      } : undefined,
      contactPoint: associate.contacts[0] ? {
        "@type": "ContactPoint",
        email: associate.contacts[0].email,
        telephone: associate.contacts[0].phone || associate.contacts[0].mobile,
      } : undefined,
    },
  ];

  return (
    <Layout>
      <SEOHead
        title={`${associate.name} — Associado ABIESV`}
        description={associate.shortDescription || `${associate.name} - Empresa associada ABIESV especializada em ${associate.category}.`}
        canonical={`https://abiesv.org.br/associados/${associate.slug}`}
        schema={pageSchema}
      />

      {/* Header */}
      <section className="py-12 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/associados" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Guia de Associados
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
              {associate.logo ? (
                <img 
                  src={associate.logo} 
                  alt={`Logo ${associate.name}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="font-heading font-bold text-3xl text-primary">
                  {getLogoInitials(associate.name)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary">{associate.category}</Badge>
                {associate.state && (
                  <span className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {associate.city ? `${associate.city}, ${associate.state}` : associate.state}
                  </span>
                )}
                <span className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Associado desde {new Date(associate.joinedDate).toLocaleDateString('pt-BR', { year: 'numeric' })}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {associate.name}
              </h1>

              <p className="text-lg text-muted-foreground max-w-3xl">
                {associate.shortDescription || `Empresa especializada em ${associate.category.toLowerCase()}.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sobre */}
              {associate.fullDescription && (
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Sobre a Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {associate.fullDescription}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Soluções */}
              {associate.solutions && associate.solutions.length > 0 && (
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Soluções e Serviços
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {associate.solutions.map((solution) => (
                        <Badge key={solution} variant="secondary" className="text-sm py-1.5 px-3">
                          {solution}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Setores */}
              {associate.sectors && associate.sectors.length > 0 && (
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Setores Atendidos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {associate.sectors.map((sector) => (
                        <Badge key={sector} variant="outline" className="text-sm py-1.5 px-3">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Placeholder para Cases */}
              <Card className="border-0 shadow-card bg-muted/30">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Cases e projetos em breve.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Contato */}
            <div className="space-y-6">
              <Card className="border-0 shadow-card sticky top-28">
                <CardHeader>
                  <CardTitle>Entre em Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contatos */}
                  {associate.contacts.map((contact, index) => (
                    <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                      <p className="font-medium text-foreground">{contact.name}</p>
                      {contact.role && (
                        <p className="text-sm text-muted-foreground mb-2">{contact.role}</p>
                      )}
                      
                      <div className="space-y-2 mt-3">
                        {contact.email && (
                          <a 
                            href={`mailto:${contact.email}`}
                            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Mail className="h-4 w-4 mr-2 shrink-0" />
                            <span className="truncate">{contact.email}</span>
                          </a>
                        )}
                        {contact.phone && (
                          <a 
                            href={`tel:${contact.phone.replace(/\D/g, '')}`}
                            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Phone className="h-4 w-4 mr-2 shrink-0" />
                            {contact.phone}
                          </a>
                        )}
                        {contact.mobile && (
                          <a 
                            href={`https://wa.me/55${contact.mobile.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
                            {contact.mobile}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Links */}
                  <div className="pt-4 space-y-3">
                    {associate.website && (
                      <Button asChild variant="outline" className="w-full justify-start">
                        <a href={associate.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Visitar site
                        </a>
                      </Button>
                    )}
                    {associate.linkedin && (
                      <Button asChild variant="outline" className="w-full justify-start">
                        <a href={associate.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {associate.instagram && (
                      <Button asChild variant="outline" className="w-full justify-start">
                        <a href={associate.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* CTA WhatsApp */}
                  {associate.contacts[0]?.mobile && (
                    <Button asChild className="w-full mt-4" size="lg">
                      <a 
                        href={`https://wa.me/55${associate.contacts[0].mobile.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Falar no WhatsApp
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Quer aparecer no Guia de Associados?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Associe-se à ABIESV e ganhe visibilidade junto a varejistas de todo o Brasil.
          </p>
          <Button asChild size="lg">
            <Link to="/associe-se">Quero me associar</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AssociadoPerfil;
