import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogOut, Eye, CheckCircle, XCircle, Clock, Newspaper, Users, Image, Gift } from "lucide-react";
import logoAbiesv from "@/assets/logo-abiesv.png";

type Submission = {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  categoria: string;
  estado: string;
  cidade: string;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-800",
  aprovado: "bg-green-100 text-green-800",
  rejeitado: "bg-red-100 text-red-800",
};

const statusIcons: Record<string, React.ReactNode> = {
  pendente: <Clock className="h-3 w-3" />,
  aprovado: <CheckCircle className="h-3 w-3" />,
  rejeitado: <XCircle className="h-3 w-3" />,
};

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { can } = useAdminAuth("submissions");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("associate_submissions")
      .select("id, nome_fantasia, razao_social, categoria, estado, cidade, status, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) setSubmissions(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filtered = filterStatus === "todos"
    ? submissions
    : submissions.filter(s => s.status === filterStatus);

  const counts = submissions.reduce(
    (acc, s) => {
      acc.todos++;
      if (s.status === "pendente") acc.pendente++;
      else if (s.status === "aprovado") acc.aprovado++;
      else if (s.status === "rejeitado") acc.rejeitado++;
      return acc;
    },
    { todos: 0, pendente: 0, aprovado: 0, rejeitado: 0 }
  );

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
              <Link to="/admin/noticias">
                <Newspaper className="h-4 w-4 mr-1" /> Notícias
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/equipe">
                <Users className="h-4 w-4 mr-1" /> Equipe
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/social-cards">
                <Image className="h-4 w-4 mr-1" /> Social Cards
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/beneficios">
                <Gift className="h-4 w-4 mr-1" /> Benefícios
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Cadastros de Associados</h1>
            <p className="text-muted-foreground">{counts.pendente} pendente(s)</p>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos ({counts.todos})</SelectItem>
              <SelectItem value="pendente">Pendentes ({counts.pendente})</SelectItem>
              <SelectItem value="aprovado">Aprovados ({counts.aprovado})</SelectItem>
              <SelectItem value="rejeitado">Rejeitados ({counts.rejeitado})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Nenhum cadastro encontrado.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map(sub => (
              <Card key={sub.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-foreground truncate">{sub.nome_fantasia}</h3>
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[sub.status]}`}>
                        {statusIcons[sub.status]}
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {sub.categoria} • {sub.cidade}, {sub.estado} • {new Date(sub.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/admin/cadastros/${sub.id}`}>
                      <Eye className="h-4 w-4 mr-1" /> Ver
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
