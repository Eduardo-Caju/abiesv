import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Youtube,
  ArrowRight 
} from "lucide-react";

const footerLinks = {
  institucional: [
    { name: "Sobre a ABIESV", href: "/sobre" },
    { name: "Diretoria", href: "/sobre/diretoria" },
    { name: "Boas Práticas", href: "/sobre/boas-praticas" },
    { name: "Associe-se", href: "/associe-se" },
  ],
  recursos: [
    { name: "Biblioteca Técnica", href: "/biblioteca" },
    { name: "Números do Setor", href: "/numeros-do-setor" },
    { name: "Guia de Associados", href: "/associados" },
    { name: "Notícias", href: "/noticias" },
  ],
  eventos: [
    { name: "Agenda de Eventos", href: "/eventos" },
    { name: "Backstage do Varejo", href: "/eventos/backstage-do-varejo" },
    { name: "Workshops", href: "/eventos/workshops" },
  ],
  legal: [
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "Termos de Uso", href: "/termos" },
    { name: "Contato", href: "/contato" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">
                Receba as novidades do setor
              </h3>
              <p className="text-white/70 max-w-md">
                Newsletter mensal com dados, tendências e eventos do ecossistema de PDV e varejo.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-w-[280px]"
                aria-label="E-mail para newsletter"
                required
              />
              <Button type="submit" variant="hero" size="lg" className="shrink-0">
                Inscrever-se
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">AB</span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl">ABIESV</span>
                <p className="text-xs text-white/60">Associação Brasileira da Indústria</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm mb-6 max-w-sm">
              Conhecimento, dados e conexões para transformar o ponto de venda no Brasil. 
              Conectando indústria, serviços e varejo.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/abiesv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn da ABIESV"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/abiesv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram da ABIESV"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@abiesv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="YouTube da ABIESV"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Institucional</h4>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Eventos</h4>
            <ul className="space-y-3">
              {footerLinks.eventos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>São Paulo, SP - Brasil</span>
              </li>
              <li>
                <a
                  href="mailto:contato@abiesv.org.br"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>contato@abiesv.org.br</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+551199999999"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>+55 11 9999-9999</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} ABIESV. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
