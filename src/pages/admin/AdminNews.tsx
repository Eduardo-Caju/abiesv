import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, Plus, Pencil, Trash2, Newspaper, ArrowLeft, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoAbiesv from "@/assets/logo-abiesv.png";
import type { NewsArticle } from "@/hooks/useNewsArticles";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

type FormData = {
  title: string;
  excerpt: string;
  source: string;
  source_url: string;
  published_date: string;
  category: string;
  sector: string;
  featured: boolean;
};

const emptyForm: FormData = {
  title: "",
  excerpt: "",
  source: "",
  source_url: "",
  published_date: new Date().toISOString().split("T")[0],
  category: "",
  sector: "",
  featured: false,
};

const AdminNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchArticles();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("published_date", { ascending: false });
    if (!error && data) setArticles(data as NewsArticle[]);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (article: NewsArticle) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      source: article.source,
      source_url: article.source_url,
      published_date: article.published_date,
      category: article.category,
      sector: article.sector,
      featured: article.featured,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.excerpt || !form.source || !form.source_url || !form.category || !form.sector) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    setSaving(true);
    const slug = slugify(form.title);
    const payload = { ...form, slug };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("news_articles").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("news_articles").insert(payload));
    }

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Notícia atualizada!" : "Notícia publicada!" });
      setDialogOpen(false);
      fetchArticles();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("news_articles").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Notícia excluída" });
      fetchArticles();
    }
  };

  const updateField = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logoAbiesv} alt="ABIESV" className="h-8" />
            <span className="font-heading font-bold text-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Cadastros
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Newspaper className="h-6 w-6" /> Notícias do Varejo
            </h1>
            <p className="text-muted-foreground">{articles.length} notícia(s) publicada(s)</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-1" /> Nova Notícia
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : articles.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Nenhuma notícia cadastrada.</p>
        ) : (
          <div className="space-y-3">
            {articles.map((a) => (
              <Card key={a.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-foreground truncate">{a.title}</h3>
                      {a.featured && (
                        <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      <Badge variant="outline" className="mr-2 text-xs">{a.category}</Badge>
                      <Badge variant="outline" className="mr-2 text-xs">{a.sector}</Badge>
                      {a.source} • {new Date(a.published_date + "T12:00:00").toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(a)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir notícia?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(a.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Form Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Notícia" : "Nova Notícia"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={form.title} onChange={(e) => updateField("title", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo *</Label>
                <Textarea id="excerpt" rows={3} value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Fonte *</Label>
                  <Input id="source" value={form.source} onChange={(e) => updateField("source", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="published_date">Data *</Label>
                  <Input id="published_date" type="date" value={form.published_date} onChange={(e) => updateField("published_date", e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="source_url">URL da matéria *</Label>
                <Input id="source_url" value={form.source_url} onChange={(e) => updateField("source_url", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Input id="category" value={form.category} onChange={(e) => updateField("category", e.target.value)} placeholder="Ex: Tendências" />
                </div>
                <div>
                  <Label htmlFor="sector">Setor *</Label>
                  <Input id="sector" value={form.sector} onChange={(e) => updateField("sector", e.target.value)} placeholder="Ex: Omnichannel" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="featured" checked={form.featured} onCheckedChange={(v) => updateField("featured", v)} />
                <Label htmlFor="featured">Destaque</Label>
              </div>
              <Button className="w-full" onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Publicar notícia"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminNews;
