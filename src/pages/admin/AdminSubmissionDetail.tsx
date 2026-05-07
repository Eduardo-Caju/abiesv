import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sanitizeDbError } from "@/lib/sanitizeError";
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, Pencil, Plus, Trash2, Save, X } from "lucide-react";
import { categories } from "@/data/associates";

function safeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "#";
    return url;
  } catch {
    return "#";
  }
}

const ESTADOS_BR = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const SOLUCOES_OPCOES = [
  "Iluminação LED","Visual Merchandising","Mobiliário","Displays","Digital Signage",
  "Comunicação Visual","Arquitetura","Engenharia","Consultoria","Projetos Comerciais",
  "Manequins","Expositores","Store Design","Tecnologia","Automação",
];

const SETORES_OPCOES = [
  "Varejo","Moda","Supermercados","Shopping Centers","Franquias",
  "Farmácias","Cosméticos","Corporativo","Eventos","Indústria",
];

const filteredCategories = categories.filter(c => c !== "Todas");

type Submission = {
  id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  categoria: string;
  descricao_curta: string;
  descricao_completa: string | null;
  estado: string;
  cidade: string;
  website: string | null;
  linkedin: string | null;
  instagram: string | null;
  solucoes: string[];
  setores: string[];
  logo_url: string | null;
  status: string;
  observacao_admin: string | null;
  created_at: string;
};

type Contact = {
  id: string;
  nome: string;
  cargo: string | null;
  telefone_fixo: string | null;
  celular: string | null;
  email: string;
};

type EditableContact = Contact & { _isNew?: boolean };

const emptyContact = (): EditableContact => ({
  id: crypto.randomUUID(),
  nome: "",
  cargo: "",
  telefone_fixo: "",
  celular: "",
  email: "",
  _isNew: true,
});

const AdminSubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [observacao, setObservacao] = useState("");
  const [updating, setUpdating] = useState(false);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Submission | null>(null);
  const [draftContacts, setDraftContacts] = useState<EditableContact[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useAdminAuth("submissions");

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    const { data: sub } = await supabase
      .from("associate_submissions")
      .select("*")
      .eq("id", id!)
      .single();

    if (sub) {
      setSubmission(sub as Submission);
      setObservacao(sub.observacao_admin || "");
    }

    const { data: cts } = await supabase
      .from("associate_submission_contacts")
      .select("*")
      .eq("submission_id", id!);

    if (cts) setContacts(cts as Contact[]);
  };

  const startEdit = () => {
    if (!submission) return;
    setDraft({ ...submission });
    setDraftContacts(contacts.map(c => ({ ...c })));
    setLogoFile(null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(null);
    setDraftContacts([]);
    setLogoFile(null);
  };

  const setDraftField = <K extends keyof Submission>(key: K, value: Submission[K]) => {
    setDraft(prev => (prev ? { ...prev, [key]: value } : prev));
  };

  const toggleTag = (tag: string, key: "solucoes" | "setores", max: number) => {
    if (!draft) return;
    const list = draft[key] || [];
    if (list.includes(tag)) setDraftField(key, list.filter(t => t !== tag) as any);
    else if (list.length < max) setDraftField(key, [...list, tag] as any);
  };

  const updateDraftContact = (idx: number, patch: Partial<EditableContact>) => {
    setDraftContacts(prev => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  };

  const addDraftContact = () => setDraftContacts(prev => [...prev, emptyContact()]);
  const removeDraftContact = (idx: number) =>
    setDraftContacts(prev => prev.filter((_, i) => i !== idx));

  const saveEdit = async () => {
    if (!draft || !id) return;
    setSaving(true);
    try {
      // 1. Upload new logo if selected
      let logo_url = draft.logo_url;
      if (logoFile) {
        const fd = new FormData();
        fd.append("file", logoFile);
        fd.append("submission_id", id);
        const { data: uploadData, error: uploadErr } = await supabase.functions.invoke(
          "upload-logo",
          { body: fd },
        );
        if (uploadErr) throw uploadErr;
        logo_url = (uploadData as any)?.url ?? logo_url;
      }

      // 2. Update submission
      const { error: subErr } = await supabase
        .from("associate_submissions")
        .update({
          razao_social: draft.razao_social,
          nome_fantasia: draft.nome_fantasia,
          cnpj: draft.cnpj,
          categoria: draft.categoria,
          descricao_curta: draft.descricao_curta,
          descricao_completa: draft.descricao_completa || null,
          estado: draft.estado,
          cidade: draft.cidade,
          website: draft.website || null,
          linkedin: draft.linkedin || null,
          instagram: draft.instagram || null,
          solucoes: draft.solucoes || [],
          setores: draft.setores || [],
          logo_url,
        })
        .eq("id", id);
      if (subErr) throw subErr;

      // 3. Sync contacts (insert new, update existing, delete removed)
      const originalIds = new Set(contacts.map(c => c.id));
      const draftIds = new Set(draftContacts.filter(c => !c._isNew).map(c => c.id));
      const toDelete = contacts.filter(c => !draftIds.has(c.id)).map(c => c.id);
      const toInsert = draftContacts
        .filter(c => c._isNew && c.nome.trim() && c.email.trim())
        .map(c => ({
          submission_id: id,
          nome: c.nome,
          cargo: c.cargo || null,
          telefone_fixo: c.telefone_fixo || null,
          celular: c.celular || null,
          email: c.email,
        }));
      const toUpdate = draftContacts.filter(c => !c._isNew && originalIds.has(c.id));

      if (toDelete.length > 0) {
        const { error: delErr } = await supabase
          .from("associate_submission_contacts")
          .delete()
          .in("id", toDelete);
        if (delErr) throw delErr;
      }

      for (const c of toUpdate) {
        const { error: upErr } = await supabase
          .from("associate_submission_contacts")
          .update({
            nome: c.nome,
            cargo: c.cargo || null,
            telefone_fixo: c.telefone_fixo || null,
            celular: c.celular || null,
            email: c.email,
          })
          .eq("id", c.id);
        if (upErr) throw upErr;
      }

      if (toInsert.length > 0) {
        const { error: insErr } = await supabase
          .from("associate_submission_contacts")
          .insert(toInsert);
        if (insErr) throw insErr;
      }

      toast({ title: "Alterações salvas com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["approved-associates"] });
      setIsEditing(false);
      setDraft(null);
      setLogoFile(null);
      await fetchData();
    } catch (err: any) {
      toast({
        title: "Erro ao salvar",
        description: sanitizeDbError(err),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (newStatus: "aprovado" | "rejeitado") => {
    setUpdating(true);
    const { error } = await supabase
      .from("associate_submissions")
      .update({ status: newStatus, observacao_admin: observacao || null })
      .eq("id", id!);

    if (error) {
      toast({ title: "Erro", description: sanitizeDbError(error), variant: "destructive" });
      setUpdating(false);
      return;
    }

    if (newStatus === "aprovado") {
      const emails = contacts.map(c => c.email).filter(Boolean);
      if (emails.length > 0) {
        try {
          const { data: invRes, error: invErr } = await supabase.functions.invoke("invite-associate", {
            body: { submission_id: id, emails },
          });
          if (invErr) throw invErr;
          const okCount = (invRes?.results || []).filter((r: any) => r.status === "ok").length;
          toast({
            title: "Aprovado e convites enviados!",
            description: `${okCount}/${emails.length} contato(s) receberão acesso ao Hub por e-mail.`,
          });
        } catch (e: any) {
          toast({
            title: "Aprovado, mas houve erro nos convites",
            description: e?.message ?? "Tente reenviar manualmente.",
            variant: "destructive",
          });
        }
      } else {
        toast({ title: "Aprovado!", description: "Sem contatos cadastrados para enviar convite." });
      }
    } else {
      toast({ title: "Rejeitado", description: "Cadastro rejeitado." });
    }

    queryClient.invalidateQueries({ queryKey: ["approved-associates"] });
    fetchData();
    setUpdating(false);
  };

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Voltar</Link>
          </Button>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={startEdit}>
              <Pencil className="h-4 w-4 mr-1" /> Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={cancelEdit} disabled={saving}>
                <X className="h-4 w-4 mr-1" /> Cancelar
              </Button>
              <Button size="sm" onClick={saveEdit} disabled={saving}>
                <Save className="h-4 w-4 mr-1" /> {saving ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          {(isEditing ? draft?.logo_url : submission.logo_url) && (
            <img
              src={(isEditing ? draft?.logo_url : submission.logo_url) as string}
              alt="Logo"
              className="w-14 h-14 rounded-xl object-contain border border-border"
            />
          )}
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {isEditing ? draft?.nome_fantasia || "(sem nome)" : submission.nome_fantasia}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isEditing ? draft?.razao_social : submission.razao_social}
            </p>
          </div>
        </div>

        {/* ===================== READ MODE ===================== */}
        {!isEditing && (
          <>
            <Card>
              <CardHeader><CardTitle>Dados da Empresa</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">CNPJ:</span> {submission.cnpj}</div>
                <div><span className="text-muted-foreground">Categoria:</span> {submission.categoria}</div>
                <div><span className="text-muted-foreground">Local:</span> {submission.cidade}, {submission.estado}</div>
                <div><span className="text-muted-foreground">Data:</span> {new Date(submission.created_at).toLocaleDateString("pt-BR")}</div>
                {submission.website && (
                  <a href={safeUrl(submission.website)} target="_blank" rel="noopener noreferrer" className="text-primary flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> Website
                  </a>
                )}
                {submission.linkedin && (
                  <a href={safeUrl(submission.linkedin)} target="_blank" rel="noopener noreferrer" className="text-primary flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> LinkedIn
                  </a>
                )}
                {submission.instagram && (
                  <a href={safeUrl(submission.instagram)} target="_blank" rel="noopener noreferrer" className="text-primary flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> Instagram
                  </a>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Descrições</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <Label className="text-muted-foreground">Curta</Label>
                  <p>{submission.descricao_curta}</p>
                </div>
                {submission.descricao_completa && (
                  <div>
                    <Label className="text-muted-foreground">Completa</Label>
                    <p>{submission.descricao_completa}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {(submission.solucoes.length > 0 || submission.setores.length > 0) && (
              <Card>
                <CardHeader><CardTitle>Soluções e Setores</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {submission.solucoes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {submission.solucoes.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                    </div>
                  )}
                  {submission.setores.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {submission.setores.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader><CardTitle>Contatos</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {contacts.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum contato cadastrado.</p>
                )}
                {contacts.map(c => (
                  <div key={c.id} className="p-3 rounded-lg border border-border text-sm space-y-1">
                    <p className="font-medium">{c.nome} {c.cargo && <span className="text-muted-foreground">— {c.cargo}</span>}</p>
                    <p className="text-muted-foreground">
                      {c.email}
                      {c.celular && ` • ${c.celular}`}
                      {c.telefone_fixo && ` • ${c.telefone_fixo}`}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Ação</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Observação (opcional)</Label>
                  <Textarea
                    value={observacao}
                    onChange={e => setObservacao(e.target.value)}
                    placeholder="Motivo da aprovação ou rejeição..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => updateStatus("aprovado")}
                    disabled={updating || submission.status === "aprovado"}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateStatus("rejeitado")}
                    disabled={updating || submission.status === "rejeitado"}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Rejeitar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* ===================== EDIT MODE ===================== */}
        {isEditing && draft && (
          <>
            <Card>
              <CardHeader><CardTitle>Dados da Empresa</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Razão Social *</Label>
                    <Input value={draft.razao_social} onChange={e => setDraftField("razao_social", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome Fantasia *</Label>
                    <Input value={draft.nome_fantasia} onChange={e => setDraftField("nome_fantasia", e.target.value)} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CNPJ *</Label>
                    <Input value={draft.cnpj} onChange={e => setDraftField("cnpj", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select value={draft.categoria} onValueChange={v => setDraftField("categoria", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estado *</Label>
                    <Select value={draft.estado} onValueChange={v => setDraftField("estado", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ESTADOS_BR.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Cidade *</Label>
                    <Input value={draft.cidade} onChange={e => setDraftField("cidade", e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Sobre a Empresa</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Descrição Curta * <span className="text-muted-foreground font-normal">({draft.descricao_curta?.length || 0}/200)</span></Label>
                  <Textarea
                    value={draft.descricao_curta}
                    onChange={e => setDraftField("descricao_curta", e.target.value)}
                    maxLength={200}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descrição Completa <span className="text-muted-foreground font-normal">({draft.descricao_completa?.length || 0}/800)</span></Label>
                  <Textarea
                    value={draft.descricao_completa || ""}
                    onChange={e => setDraftField("descricao_completa", e.target.value)}
                    maxLength={800}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Soluções e Setores</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Soluções (até 6)</Label>
                  <div className="flex flex-wrap gap-2">
                    {SOLUCOES_OPCOES.map(s => (
                      <Badge
                        key={s}
                        variant={(draft.solucoes || []).includes(s) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(s, "solucoes", 6)}
                      >{s}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Setores (até 5)</Label>
                  <div className="flex flex-wrap gap-2">
                    {SETORES_OPCOES.map(s => (
                      <Badge
                        key={s}
                        variant={(draft.setores || []).includes(s) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(s, "setores", 5)}
                      >{s}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Presença Online</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input value={draft.website || ""} onChange={e => setDraftField("website", e.target.value)} placeholder="https://..." />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input value={draft.linkedin || ""} onChange={e => setDraftField("linkedin", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Instagram</Label>
                    <Input value={draft.instagram || ""} onChange={e => setDraftField("instagram", e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Logo</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="file"
                  accept="image/png"
                  onChange={e => setLogoFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">
                  PNG. {logoFile ? `Novo arquivo: ${logoFile.name}` : "Selecione um arquivo para substituir o logo atual."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Contatos
                  <Button type="button" variant="outline" size="sm" onClick={addDraftContact}>
                    <Plus className="h-4 w-4 mr-1" /> Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {draftContacts.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum contato. Clique em Adicionar.</p>
                )}
                {draftContacts.map((c, idx) => (
                  <div key={c.id} className="p-4 rounded-lg border border-border space-y-3">
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDraftContact(idx)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Nome *</Label>
                        <Input value={c.nome} onChange={e => updateDraftContact(idx, { nome: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input value={c.cargo || ""} onChange={e => updateDraftContact(idx, { cargo: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>E-mail *</Label>
                        <Input type="email" value={c.email} onChange={e => updateDraftContact(idx, { email: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Celular</Label>
                        <Input value={c.celular || ""} onChange={e => updateDraftContact(idx, { celular: e.target.value })} />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Telefone fixo</Label>
                        <Input value={c.telefone_fixo || ""} onChange={e => updateDraftContact(idx, { telefone_fixo: e.target.value })} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-end pb-4">
              <Button variant="outline" onClick={cancelEdit} disabled={saving}>Cancelar</Button>
              <Button onClick={saveEdit} disabled={saving}>
                <Save className="h-4 w-4 mr-1" /> {saving ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminSubmissionDetail;
