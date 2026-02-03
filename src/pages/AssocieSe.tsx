import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  Store, 
  Users, 
  BookOpen, 
  Calendar,
  BarChart3,
  Award
} from "lucide-react";
import { toast } from "sonner";

const benefitsIndustry = [
  { icon: Users, text: "Networking qualificado com varejistas e outros fornecedores" },
  { icon: BarChart3, text: "Acesso exclusivo a dados e pesquisas do setor" },
  { icon: Calendar, text: "Participação em eventos como o Backstage do Varejo" },
  { icon: BookOpen, text: "Biblioteca técnica com guias e normas" },
  { icon: Award, text: "Visibilidade no Guia de Associados" },
];

const benefitsRetail = [
  { icon: Building2, text: "Diretório de fornecedores qualificados para o PDV" },
  { icon: BookOpen, text: "Conteúdo técnico sobre VM, store design e operações" },
  { icon: Calendar, text: "Convites para eventos e workshops" },
  { icon: BarChart3, text: "Benchmarks e indicadores do setor" },
  { icon: Users, text: "Comunidade de profissionais do varejo" },
];

const faqs = [
  {
    question: "Qual o valor da anuidade?",
    answer: "O valor da anuidade varia conforme o porte da empresa e o perfil (Indústria/Serviços ou Varejo). Entre em contato para receber uma proposta personalizada.",
  },
  {
    question: "Quais são os critérios para se associar?",
    answer: "A ABIESV aceita empresas que atuam no ecossistema de PDV, incluindo fabricantes de mobiliário, tecnologia, comunicação visual, iluminação, refrigeração, obras e serviços relacionados, além de varejistas de todos os portes.",
  },
  {
    question: "Quanto tempo leva o processo de associação?",
    answer: "Após o envio do formulário, nossa equipe entra em contato em até 48 horas úteis para apresentar os benefícios e formalizar a associação.",
  },
  {
    question: "Posso participar de eventos antes de me associar?",
    answer: "Sim, alguns eventos são abertos ao público. Porém, associados têm acesso prioritário, descontos exclusivos e benefícios adicionais.",
  },
];

const AssocieSe = () => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    perfil: "",
    email: "",
    telefone: "",
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
    
    toast.success("Formulário enviado com sucesso! Entraremos em contato em breve.");
    setFormData({
      nome: "",
      empresa: "",
      perfil: "",
      email: "",
      telefone: "",
      mensagem: "",
      lgpd: false,
    });
    setIsSubmitting(false);
  };

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Associe-se", url: "https://abiesv.org.br/associe-se" },
    ]),
    createFAQSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Associação ABIESV",
      description: "Faça parte da ABIESV. Benefícios, networking, dados e visibilidade no ecossistema de PDV.",
      provider: {
        "@type": "Organization",
        name: "ABIESV",
      },
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Associe-se — Benefícios para Indústria/Serviços e Varejistas"
        description="Faça parte da ABIESV. Benefícios, networking, dados e visibilidade. Formulário de associação."
        canonical="https://abiesv.org.br/associe-se"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Associe-se à ABIESV
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Faça parte do ecossistema que conecta indústria, serviços e varejo. 
              Acesse conhecimento exclusivo, dados setoriais e networking qualificado.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Industry Benefits */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-foreground">
                      Indústria e Serviços
                    </h2>
                    <p className="text-muted-foreground">Fornecedores para o PDV</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {benefitsIndustry.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <benefit.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Retail Benefits */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                    <Store className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-foreground">
                      Varejistas
                    </h2>
                    <p className="text-muted-foreground">Redes e lojas</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {benefitsRetail.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <benefit.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-12 text-center">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Preencha o formulário", desc: "Informe seus dados e o perfil da empresa" },
              { step: "2", title: "Receba a proposta", desc: "Nossa equipe entra em contato em até 48h" },
              { step: "3", title: "Acesse os benefícios", desc: "Comece a aproveitar todos os recursos" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-2xl text-white">{item.step}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Formulário de Associação
            </h2>
            <Card className="border-0 shadow-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
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
                      <Label htmlFor="empresa">Empresa *</Label>
                      <Input
                        id="empresa"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        required
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Perfil *</Label>
                    <RadioGroup
                      value={formData.perfil}
                      onValueChange={(value) => setFormData({ ...formData, perfil: value })}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="industria" id="industria" />
                        <Label htmlFor="industria" className="cursor-pointer">Indústria/Serviços</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="varejo" id="varejo" />
                        <Label htmlFor="varejo" className="cursor-pointer">Varejo</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
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
                      <Label htmlFor="telefone">Telefone (WhatsApp)</Label>
                      <Input
                        id="telefone"
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                    <Textarea
                      id="mensagem"
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Conte-nos mais sobre sua empresa e interesse na associação"
                      rows={4}
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
                      e autorizo o contato da ABIESV.
                    </Label>
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar solicitação"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-card rounded-lg px-6 border-0 shadow-sm"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="font-heading font-semibold text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AssocieSe;
