import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, organizationSchema, createBreadcrumbSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Linkedin, Instagram, Youtube, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const subjects = [
  { value: "associacao", label: "Quero me associar" },
  { value: "eventos", label: "Dúvidas sobre eventos" },
  { value: "imprensa", label: "Imprensa" },
  { value: "parcerias", label: "Parcerias" },
  { value: "outros", label: "Outros assuntos" },
];

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
    lgpd: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.lgpd) {
      toast.error("É necessário aceitar a política de privacidade.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    setFormData({
      nome: "",
      email: "",
      assunto: "",
      mensagem: "",
      lgpd: false,
    });
    setIsSubmitting(false);
  };

  const pageSchema = [
    organizationSchema,
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Contato", url: "https://abiesv.org.br/contato" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contato - ABIESV",
      description: "Entre em contato com a ABIESV. Formulário de contato e informações institucionais.",
      url: "https://abiesv.org.br/contato",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Contato — ABIESV"
        description="Entre em contato com a ABIESV. Formulário de contato e informações institucionais."
        canonical="https://abiesv.org.br/contato"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Entre em contato
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dúvidas, sugestões ou interesse em se associar? 
              Nossa equipe está pronta para ajudar.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Envie sua mensagem
              </h2>
              <Card className="border-0 shadow-card">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                        placeholder="Seu nome"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assunto">Assunto *</Label>
                      <Select
                        value={formData.assunto}
                        onValueChange={(value) => setFormData({ ...formData, assunto: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o assunto" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        required
                        placeholder="Como podemos ajudar?"
                        rows={5}
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="lgpd"
                        checked={formData.lgpd}
                        onCheckedChange={(checked) => setFormData({ ...formData, lgpd: checked as boolean })}
                      />
                      <Label htmlFor="lgpd" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        Li e concordo com a{" "}
                        <Link to="/privacidade" className="text-primary hover:underline">
                          Política de Privacidade
                        </Link>{" "}
                        da ABIESV.
                      </Label>
                    </div>

                    <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Informações de contato
              </h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">E-mail</h3>
                    <a 
                      href="mailto:secretaria@abiesv.org.br"
                      className="text-primary hover:underline"
                    >
                      secretaria@abiesv.org.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">Telefone</h3>
                    <a 
                      href="tel:+5511961744269"
                      className="text-primary hover:underline"
                    >
                      (11) 96174-4269
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Segunda a sexta, 9h às 18h
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Siga a ABIESV
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/company/abiesv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label="LinkedIn da ABIESV"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/abiesv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label="Instagram da ABIESV"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com/@abiesv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label="YouTube da ABIESV"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
            Quer se associar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Conheça os benefícios de fazer parte da ABIESV e preencha o formulário de associação.
          </p>
          <Button asChild variant="cta" size="lg">
            <Link to="/associe-se">
              Quero me associar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
