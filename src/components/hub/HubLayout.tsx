import { ReactNode } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, Gift, Wrench, Building2, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useHubAuth, type HubUser } from "@/hooks/useHubAuth";
import logoAbiesv from "@/assets/logo-abiesv.png";

interface HubLayoutProps {
  children: ReactNode;
}

const navItems = [
  { title: "Dashboard", url: "/hub", icon: LayoutDashboard, end: true },
  { title: "Benefícios", url: "/hub/beneficios", icon: Gift, end: false },
  { title: "Ferramentas", url: "/hub/ferramentas", icon: Wrench, end: false },
  { title: "Minha Empresa", url: "/hub/perfil", icon: Building2, end: false },
];

function HubSidebar({ user }: { user: HubUser }) {
  const { pathname } = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <NavLink to="/hub" className="flex items-center gap-2 px-2 py-2">
          <img src={logoAbiesv} alt="ABIESV" className="h-7" />
          <span className="font-heading font-bold text-sm">Hub</span>
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => {
                const active = item.end ? pathname === item.url : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink to={item.url} end={item.end} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user.isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Painel Admin</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/beneficios" className="flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      <span>Gerenciar Benefícios</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export function HubLayout({ children }: HubLayoutProps) {
  const { user, loading } = useHubAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/hub/login");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/20">
        <HubSidebar user={user} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 bg-background border-b flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-tight">{user.companyName ?? "Hub do Associado"}</p>
                <p className="text-xs text-muted-foreground leading-tight">{user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
