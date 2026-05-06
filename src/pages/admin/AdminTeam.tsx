import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth, type AdminPermission } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { LogOut, ArrowLeft, UserPlus, Loader2, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoAbiesv from "@/assets/logo-abiesv.png";

type AdminUser = {
  user_id: string;
  email: string;
  created_at: string;
  permissions: AdminPermission[];
};

const PERMISSIONS: { id: AdminPermission; label: string; desc: string }[] = [
  { id: "submissions", label: "Cadastros de Associados", desc: "Aprovar/rejeitar/editar cadastros" },
  { id: "news", label: "Notícias e Social Cards", desc: "Publicar e editar notícias" },
  { id: "benefits", label: "Benefícios", desc: "Gerenciar benefícios para associados" },
  { id: "team", label: "Equipe (Super-admin)", desc: "Convidar e gerenciar outros admins" },
];

const AdminTeam = () => {
  const { userId } = useAdminAuth("team");
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [newPerms, setNewPerms] = useState<Set<AdminPermission>>(new Set(["news"]));
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [editPerms, setEditPerms] = useState<Set<AdminPermission>>(new Set());
  const [savingEdit, setSavingEdit] = useState(false);
  const [tempPasswordInfo, setTempPasswordInfo] = useState<{ email: string; password: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { fetchAdmins(); }, []);

  const fetchAdmins = async () => {
    setFetching(true);
    const { data, error } = await supabase.rpc("get_admin_users");
    if (!error && data) setAdmins(data as AdminUser[]);
    setFetching(false);
  };

  const togglePerm = (set: Set<AdminPermission>, p: AdminPermission, setSetter: (s: Set<AdminPermission>) => void) => {
    const next = new Set(set);
    if (next.has(p)) next.delete(p); else next.add(p);
    setSetter(next);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || newPerms.size === 0) return;
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("invite-admin", {
      body: { email: email.trim(), permissions: Array.from(newPerms) },
    });
    if (error || (data as any)?.error) {
      toast({ title: "Erro", description: (data as any)?.error || error?.message || "Erro ao convidar", variant: "destructive" });
    } else {
      const reactivated = (data as any)?.reactivated;
      toast({
        title: reactivated ? "Permissões reatribuídas!" : "Convite enviado!",
        description: reactivated
          ? `Link de acesso enviado para ${email}.`
          : `E-mail enviado para ${email}`,
      });
      setEmail("");
      setNewPerms(new Set(["news"]));
      fetchAdmins();
    }
    setLoading(false);
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    const arr = new Uint32Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, n => chars[n % chars.length]).join("");
  };

  const handleCreateDirect = async () => {
    if (!email.trim() || newPerms.size === 0) return;
    if (!confirm(`Criar admin ${email} com senha temporária? A senha será mostrada apenas uma vez.`)) return;
    setLoading(true);
    const password = generatePassword();
    const { data, error } = await supabase.functions.invoke("invite-admin", {
      body: { email: email.trim(), permissions: Array.from(newPerms), mode: "direct", password },
    });
    if (error || (data as any)?.error) {
      toast({ title: "Erro", description: (data as any)?.error || error?.message || "Erro ao criar", variant: "destructive" });
    } else {
      setTempPasswordInfo({ email: email.trim(), password });
      setEmail("");
      setNewPerms(new Set(["news"]));
      fetchAdmins();
    }
    setLoading(false);
  };

  const openEdit = (admin: AdminUser) => {
    setEditing(admin);
    setEditPerms(new Set(admin.permissions));
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSavingEdit(true);
    const { data, error } = await supabase.functions.invoke("update-admin-permissions", {
      body: { action: "update", user_id: editing.user_id, permissions: Array.from(editPerms) },
    });
    if (error || (data as any)?.error) {
      toast({ title: "Erro", description: (data as any)?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: "Permissões atualizadas" });
      setEditing(null);
      fetchAdmins();
    }
    setSavingEdit(false);
  };

  const revokeAccess = async (admin: AdminUser) => {
    if (!confirm(`Revogar acesso de ${admin.email}?`)) return;
    const { data, error } = await supabase.functions.invoke("update-admin-permissions", {
      body: { action: "revoke", user_id: admin.user_id },
    });
    if (error || (data as any)?.error) {
      toast({ title: "Erro", description: (data as any)?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: "Acesso revogado" });
      fetchAdmins();
    }
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Equipe Administrativa</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="h-5 w-5" /> Convidar Novo Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <Label htmlFor="invite-email">E-mail</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Permissões</Label>
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  {PERMISSIONS.map(p => (
                    <label key={p.id} className="flex items-start gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted/50">
                      <Checkbox
                        checked={newPerms.has(p.id)}
                        onCheckedChange={() => togglePerm(newPerms, p.id, setNewPerms)}
                        className="mt-0.5"
                      />
                      <div className="text-sm">
                        <div className="font-medium">{p.label}</div>
                        <div className="text-muted-foreground text-xs">{p.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={loading || newPerms.size === 0}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                  Enviar convite por e-mail
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={loading || newPerms.size === 0 || !email.trim()}
                  onClick={handleCreateDirect}
                >
                  Criar com senha temporária
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Convite por e-mail:</strong> a pessoa recebe um link para definir a senha.<br />
                <strong>Senha temporária:</strong> cria a conta na hora — você copia a senha e envia por outro canal (WhatsApp, etc.).
              </p>
            </form>
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
                    <TableHead>E-mail</TableHead>
                    <TableHead>Permissões</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map(admin => (
                    <TableRow key={admin.user_id}>
                      <TableCell className="text-sm">
                        {admin.email}
                        {admin.user_id === userId && (
                          <Badge variant="outline" className="ml-2 text-xs">você</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {admin.permissions.length === 0 ? (
                            <span className="text-xs text-muted-foreground">nenhuma</span>
                          ) : (
                            admin.permissions.map(p => (
                              <Badge key={p} variant="secondary" className="text-xs">
                                {PERMISSIONS.find(x => x.id === p)?.label ?? p}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(admin)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {admin.user_id !== userId && (
                          <Button variant="ghost" size="sm" onClick={() => revokeAccess(admin)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar permissões</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{editing?.email}</p>
          <div className="grid gap-3 mt-2">
            {PERMISSIONS.map(p => (
              <label key={p.id} className="flex items-start gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted/50">
                <Checkbox
                  checked={editPerms.has(p.id)}
                  onCheckedChange={() => togglePerm(editPerms, p.id, setEditPerms)}
                  className="mt-0.5"
                />
                <div className="text-sm">
                  <div className="font-medium">{p.label}</div>
                  <div className="text-muted-foreground text-xs">{p.desc}</div>
                </div>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button onClick={saveEdit} disabled={savingEdit || editPerms.size === 0}>
              {savingEdit && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeam;
