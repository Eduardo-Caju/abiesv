import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import logoAbiesv from "@/assets/logo-abiesv.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Sobre",
    href: "/sobre",
    children: [
      { name: "Quem Somos", href: "/sobre" },
      { name: "Nossa História", href: "/sobre/historia" },
      { name: "Diretoria e Governança", href: "/sobre/diretoria" },
      { name: "Boas Práticas", href: "/sobre/boas-praticas" },
    ],
  },
  { name: "Associados", href: "/associados" },
  {
    name: "Eventos",
    href: "/eventos",
    children: [
      { name: "Todos os Eventos", href: "/eventos" },
      { name: "Backstage do Varejo", href: "/eventos/backstage-do-varejo" },
      { name: "Workshops", href: "/eventos/workshops" },
    ],
  },
  { name: "Biblioteca", href: "/biblioteca" },
  { name: "Números do Setor", href: "/numeros-do-setor" },
  { name: "Notícias", href: "/noticias" },
  { name: "Parceiros", href: "/parceiros" },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="ABIESV - Página inicial">
            <img 
              src={logoAbiesv} 
              alt="ABIESV" 
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                            location.pathname.startsWith(item.href) && "text-primary"
                          )}
                        >
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-48 gap-1 p-2">
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.href}
                                    className={cn(
                                      "block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground",
                                      location.pathname === child.href && "bg-secondary text-secondary-foreground"
                                    )}
                                  >
                                    {child.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                          location.pathname === item.href && "text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link to="/hub/login"><LogIn className="h-4 w-4 mr-1" /> Hub</Link>
            </Button>
            <Button asChild variant="cta" size="default" className="hidden sm:flex">
              <Link to="/associe-se">Associe-se</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu de navegação"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      location.pathname === item.href
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={cn(
                            "block px-4 py-2 text-sm rounded-lg transition-colors",
                            location.pathname === child.href
                              ? "bg-secondary/50 text-secondary-foreground"
                              : "text-muted-foreground hover:bg-muted"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4">
                <Button asChild variant="cta" size="lg" className="w-full">
                  <Link to="/associe-se" onClick={() => setMobileMenuOpen(false)}>
                    Associe-se
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
