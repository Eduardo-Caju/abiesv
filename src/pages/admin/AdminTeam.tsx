import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, ArrowLeft, UserPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoAbiesv from "@/assets/logo-abiesv.png";

type AdminUser = {
  user_id: string;
  email?: string;
  created_at?: string;
};

const AdminTeam = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useAdminAuth("team");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const { data } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");
    if (data) setAdmins(data.map(r => ({ user_id: r.user_id })));
    setFetching(false);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    const { data, error } = await supabase.functions.invoke("invite-admin", {
      body: { email: email.trim() },
    });

    if (error || data?.error) {
      toast({ title: "Erro", description: data?.error || error?.message || "Erro ao convidar", variant: "destructive" });
    } else {
      toast({ title: "Convite enviado!", description: `E-mail de convite enviado para ${email}` });
      setEmail("");
      fetchAdmins();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logoAbiesv} alt="ABIESV" className="h-8" />
            <span className="font-heading font-bold text-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Cadastros</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Equipe Administrativa</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="h-5 w-5" /> Convidar Novo Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="flex gap-3">
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Convidar"}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-2">
              A pessoa receberá um e-mail com link para definir a senha e acessar o painel.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Administradores Atuais</CardTitle>
          </CardHeader>
          <CardContent>
            {fetching ? (
              <p className="text-muted-foreground">Carregando...</p>
            ) : admins.length === 0 ? (
              <p className="text-muted-foreground">Nenhum administrador encontrado.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID do Usuário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map(admin => (
                    <TableRow key={admin.user_id}>
                      <TableCell className="font-mono text-sm">{admin.user_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminTeam;
