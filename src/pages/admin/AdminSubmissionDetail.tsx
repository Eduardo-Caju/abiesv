import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { sanitizeDbError } from "@/lib/sanitizeError";
import { ArrowLeft, CheckCircle, XCircle, ExternalLink } from "lucide-react";

function safeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "#";
    return url;
  } catch {
    return "#";
  }
}

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

const AdminSubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [observacao, setObservacao] = useState("");
  const [updating, setUpdating] = useState(false);

  useAdminAuth();

  useEffect(() => {
    if (id) {
      fetchData();
    }
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Voltar</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          {submission.logo_url && (
            <img src={submission.logo_url} alt="Logo" className="w-14 h-14 rounded-xl object-contain border border-border" />
          )}
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{submission.nome_fantasia}</h1>
            <p className="text-muted-foreground text-sm">{submission.razao_social}</p>
          </div>
        </div>

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

        {/* Ação do admin */}
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
      </main>
    </div>
  );
};

export default AdminSubmissionDetail;
