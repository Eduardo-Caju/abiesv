import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sanitizeDbError } from "@/lib/sanitizeError";
import { ArrowLeft, Plus, Pencil, Trash2, Star } from "lucide-react";

type Benefit = {
  id: string;
  title: string;
  description: string;
  partner_name: string;
  partner_logo_url: string | null;
  category: string;
  benefit_type: string;
  promo_code: string | null;
  link_url: string | null;
  valid_until: string | null;
  featured: boolean;
  active: boolean;
};

const empty: Omit<Benefit, "id"> = {
  title: "",
  description: "",
  partner_name: "",
  partner_logo_url: "",
  category: "",
  benefit_type: "desconto",
  promo_code: "",
  link_url: "",
  valid_until: "",
  featured: false,
  active: true,
};

const AdminBenefits = () => {
  useAdminAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Benefit | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("member_benefits")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data as Benefit[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (b: Benefit) => {
    setEditing(b);
    setForm({
      ...b,
      partner_logo_url: b.partner_logo_url ?? "",
      promo_code: b.promo_code ?? "",
      link_url: b.link_url ?? "",
      valid_until: b.valid_until ?? "",
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title || !form.description || !form.partner_name || !form.category) {
      toast({ title: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description,
      partner_name: form.partner_name,
      partner_logo_url: form.partner_logo_url || null,
      category: form.category,
      benefit_type: form.benefit_type || "desconto",
      promo_code: form.promo_code || null,
      link_url: form.link_url || null,
      valid_until: form.valid_until || null,
      featured: !!form.featured,
      active: !!form.active,
    };
    const { error } = editing
      ? await supabase.from("member_benefits").update(payload).eq("id", editing.id)
      : await supabase.from("member_benefits").insert(payload);

    if (error) {
      toast({ title: "Erro", description: sanitizeDbError(error), variant: "destructive" });
    } else {
      toast({ title: editing ? "Benefício atualizado" : "Benefício criado" });
      setOpen(false);
      load();
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir este benefício?")) return;
    const { error } = await supabase.from("member_benefits").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: sanitizeDbError(error), variant: "destructive" });
    } else {
      toast({ title: "Excluído" });
      load();
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Voltar</Link>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew} size="sm"><Plus className="h-4 w-4 mr-1" /> Novo Benefício</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Benefício" : "Novo Benefício"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Título *</Label>
                    <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label>Parceiro *</Label>
                    <Input value={form.partner_name} onChange={e => setForm({ ...form, partner_name: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Descrição *</Label>
                  <Textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Categoria *</Label>
                    <Input placeholder="Ex.: Software, Educação, Eventos" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label>Tipo</Label>
                    <Select value={form.benefit_type} onValueChange={v => setForm({ ...form, benefit_type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desconto">Desconto</SelectItem>
                        <SelectItem value="condição especial">Condição especial</SelectItem>
                        <SelectItem value="brinde">Brinde</SelectItem>
                        <SelectItem value="acesso gratuito">Acesso gratuito</SelectItem>
                        <SelectItem value="trial estendido">Trial estendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>URL do Logo do parceiro</Label>
                  <Input placeholder="https://..." value={form.partner_logo_url} onChange={e => setForm({ ...form, partner_logo_url: e.target.value })} />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Código promocional</Label>
                    <Input value={form.promo_code} onChange={e => setForm({ ...form, promo_code: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label>Link de ativação</Label>
                    <Input placeholder="https://..." value={form.link_url} onChange={e => setForm({ ...form, link_url: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Válido até</Label>
                    <Input type="date" value={form.valid_until} onChange={e => setForm({ ...form, valid_until: e.target.value })} />
                  </div>
                  <div className="flex items-end gap-6">
                    <div className="flex items-center gap-2">
                      <Switch checked={form.featured} onCheckedChange={v => setForm({ ...form, featured: v })} />
                      <Label>Destaque</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} />
                      <Label>Ativo</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={save} disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-heading text-2xl font-bold mb-6">Benefícios & Parcerias</h1>
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Nenhum benefício cadastrado. Clique em "Novo Benefício" para começar.</p>
        ) : (
          <div className="space-y-3">
            {items.map(b => (
              <Card key={b.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  {b.partner_logo_url ? (
                    <img src={b.partner_logo_url} alt={b.partner_name} className="w-12 h-12 rounded-lg object-contain border" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {b.partner_name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{b.title}</h3>
                      {b.featured && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      {!b.active && <Badge variant="outline">Inativo</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {b.partner_name} • {b.category} • {b.benefit_type}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openEdit(b)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => remove(b.id)}><Trash2 className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBenefits;
