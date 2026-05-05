import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/data/associates";
import logoAbiesv from "@/assets/logo-abiesv.png";

const formSchema = z.object({
  razao_social: z.string().min(3, "Razão social obrigatória"),
  nome_fantasia: z.string().min(2, "Nome fantasia obrigatório"),
  cnpj: z.string().min(3, "CNPJ obrigatório"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  descricao_curta: z.string().min(1, "Obrigatória").max(200, "Máximo 200 caracteres"),
  descricao_completa: z.string().max(800, "Máximo 800 caracteres").optional(),
  estado: z.string().min(2, "Estado obrigatório"),
  cidade: z.string().min(2, "Cidade obrigatória"),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  status: z.enum(["aprovado", "pendente", "rejeitado"]),
  contato_nome: z.string().optional(),
  contato_email: z.string().optional(),
  contato_cargo: z.string().optional(),
  contato_celular: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

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

const filteredCategories = categories.filter((c) => c !== "Todas");

const AdminSubmissionNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading: authLoading, can } = useAdminAuth("submissions");
  const [submitting, setSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [selectedSolucoes, setSelectedSolucoes] = useState<string[]>([]);
  const [selectedSetores, setSelectedSetores] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razao_social: "",
      nome_fantasia: "",
      cnpj: "",
      categoria: "",
      descricao_curta: "",
      descricao_completa: "",
      estado: "",
      cidade: "",
      website: "",
      linkedin: "",
      instagram: "",
      status: "aprovado",
      contato_nome: "",
      contato_email: "",
      contato_cargo: "",
      contato_celular: "",
    },
  });

  const toggleTag = (tag: string, list: string[], setList: (v: string[]) => void, max: number) => {
    if (list.includes(tag)) setList(list.filter((t) => t !== tag));
    else if (list.length < max) setList([...list, tag]);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const submissionId = crypto.randomUUID();

      let logo_url: string | null = null;
      if (logoFile) {
        const fd = new FormData();
        fd.append("file", logoFile);
        fd.append("submission_id", submissionId);
        const { data: uploadData, error: uploadErr } = await supabase.functions.invoke(
          "upload-logo",
          { body: fd },
        );
        if (uploadErr) throw uploadErr;
        logo_url = (uploadData as any)?.url ?? null;
      }

      const { error: subError } = await supabase.from("associate_submissions").insert({
        id: submissionId,
        razao_social: data.razao_social,
        nome_fantasia: data.nome_fantasia,
        cnpj: data.cnpj,
        categoria: data.categoria,
        descricao_curta: data.descricao_curta,
        descricao_completa: data.descricao_completa || null,
        estado: data.estado,
        cidade: data.cidade,
        website: data.website || null,
        linkedin: data.linkedin || null,
        instagram: data.instagram || null,
        solucoes: selectedSolucoes,
        setores: selectedSetores,
        logo_url,
        status: data.status,
      });
      if (subError) throw subError;

      if (data.contato_nome && data.contato_email) {
        await supabase.from("associate_submission_contacts").insert({
          submission_id: submissionId,
          nome: data.contato_nome,
          email: data.contato_email,
          cargo: data.contato_cargo || null,
          celular: data.contato_celular || null,
          telefone_fixo: null,
        });
      }

      toast({ title: "Cadastro criado com sucesso" });
      navigate(`/admin/cadastros/${submissionId}`);
    } catch (err: any) {
      if (import.meta.env.DEV) console.error(err);
      toast({
        title: "Erro ao criar cadastro",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return null;
  if (!can("submissions")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Acesso negado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logoAbiesv} alt="ABIESV" className="h-8" />
            <span className="font-heading font-bold text-foreground">Admin</span>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Novo cadastro de associado</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Razão Social *</Label>
                  <Input {...form.register("razao_social")} />
                  {form.formState.errors.razao_social && (
                    <p className="text-sm text-destructive">{form.formState.errors.razao_social.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Nome Fantasia *</Label>
                  <Input {...form.register("nome_fantasia")} />
                  {form.formState.errors.nome_fantasia && (
                    <p className="text-sm text-destructive">{form.formState.errors.nome_fantasia.message}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CNPJ *</Label>
                  <Input {...form.register("cnpj")} />
                  {form.formState.errors.cnpj && (
                    <p className="text-sm text-destructive">{form.formState.errors.cnpj.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select value={form.watch("categoria")} onValueChange={(v) => form.setValue("categoria", v)}>
                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                      {filteredCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.categoria && (
                    <p className="text-sm text-destructive">{form.formState.errors.categoria.message}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Estado *</Label>
                  <Select value={form.watch("estado")} onValueChange={(v) => form.setValue("estado", v)}>
                    <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                    <SelectContent>
                      {ESTADOS_BR.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.estado && (
                    <p className="text-sm text-destructive">{form.formState.errors.estado.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Cidade *</Label>
                  <Input {...form.register("cidade")} />
                  {form.formState.errors.cidade && (
                    <p className="text-sm text-destructive">{form.formState.errors.cidade.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status *</Label>
                <Select value={form.watch("status")} onValueChange={(v) => form.setValue("status", v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aprovado">Aprovado (publica direto)</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="rejeitado">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Sobre a Empresa</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Descrição Curta * <span className="text-muted-foreground font-normal">({form.watch("descricao_curta")?.length || 0}/200)</span></Label>
                <Textarea {...form.register("descricao_curta")} maxLength={200} rows={3} />
                {form.formState.errors.descricao_curta && (
                  <p className="text-sm text-destructive">{form.formState.errors.descricao_curta.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Descrição Completa <span className="text-muted-foreground font-normal">({form.watch("descricao_completa")?.length || 0}/800)</span></Label>
                <Textarea {...form.register("descricao_completa")} maxLength={800} rows={5} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Soluções e Setores</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Soluções (até 6)</Label>
                <div className="flex flex-wrap gap-2">
                  {SOLUCOES_OPCOES.map((s) => (
                    <Badge
                      key={s}
                      variant={selectedSolucoes.includes(s) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(s, selectedSolucoes, setSelectedSolucoes, 6)}
                    >{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Setores (até 5)</Label>
                <div className="flex flex-wrap gap-2">
                  {SETORES_OPCOES.map((s) => (
                    <Badge
                      key={s}
                      variant={selectedSetores.includes(s) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(s, selectedSetores, setSelectedSetores, 5)}
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
                <Input {...form.register("website")} placeholder="https://..." />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input {...form.register("linkedin")} />
                </div>
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input {...form.register("instagram")} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Logo (opcional)</CardTitle></CardHeader>
            <CardContent>
              <Input
                type="file"
                accept="image/png"
                onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              />
              <p className="text-xs text-muted-foreground mt-2">PNG. Pode adicionar/atualizar depois pela página de detalhe.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Contato Principal (opcional)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input {...form.register("contato_nome")} />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input type="email" {...form.register("contato_email")} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cargo</Label>
                  <Input {...form.register("contato_cargo")} />
                </div>
                <div className="space-y-2">
                  <Label>Celular</Label>
                  <Input {...form.register("contato_celular")} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Preencha nome e e-mail para registrar um contato.</p>
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/admin")}>Cancelar</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Criar cadastro"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminSubmissionNew;
