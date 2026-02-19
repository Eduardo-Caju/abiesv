import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Plus, Trash2, Upload, X } from "lucide-react";
import { categories } from "@/data/associates";

const contactSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  cargo: z.string().optional(),
  telefone_fixo: z.string().optional(),
  celular: z.string().optional(),
  email: z.string().email("E-mail inválido"),
});

const formSchema = z.object({
  razao_social: z.string().min(3, "Razão social obrigatória"),
  nome_fantasia: z.string().min(2, "Nome fantasia obrigatório"),
  cnpj: z.string().min(11, "CNPJ/CPF obrigatório"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  descricao_curta: z.string().min(10, "Mínimo 10 caracteres").max(200, "Máximo 200 caracteres"),
  descricao_completa: z.string().max(800, "Máximo 800 caracteres").optional(),
  estado: z.string().min(2, "Estado obrigatório"),
  cidade: z.string().min(2, "Cidade obrigatória"),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  contacts: z.array(contactSchema).min(1, "Ao menos 1 contato").max(3, "Máximo 3 contatos"),
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

const filteredCategories = categories.filter(c => c !== "Todas");

const CadastroAssociado = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSolucoes, setSelectedSolucoes] = useState<string[]>([]);
  const [selectedSetores, setSelectedSetores] = useState<string[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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
      contacts: [{ nome: "", cargo: "", telefone_fixo: "", celular: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  const toggleTag = (tag: string, list: string[], setList: (v: string[]) => void, max: number) => {
    if (list.includes(tag)) {
      setList(list.filter(t => t !== tag));
    } else if (list.length < max) {
      setList([...list, tag]);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: "O logo deve ter no máximo 2MB.", variant: "destructive" });
      return;
    }
    if (!["image/png", "image/svg+xml"].includes(file.type)) {
      toast({ title: "Formato inválido", description: "Apenas PNG ou SVG.", variant: "destructive" });
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let logo_url: string | null = null;

      if (logoFile) {
        const ext = logoFile.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("associate-logos")
          .upload(path, logoFile);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("associate-logos")
          .getPublicUrl(path);
        logo_url = urlData.publicUrl;
      }

      const submissionId = crypto.randomUUID();
      const { error: subError } = await supabase
        .from("associate_submissions")
        .insert({
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
        });

      if (subError) throw subError;

      const contactsToInsert = data.contacts.map(c => ({
        submission_id: submissionId,
        nome: c.nome,
        cargo: c.cargo || null,
        telefone_fixo: c.telefone_fixo || null,
        celular: c.celular || null,
        email: c.email,
      }));

      const { error: contactError } = await supabase
        .from("associate_submission_contacts")
        .insert(contactsToInsert);

      if (contactError) throw contactError;

      setIsSubmitted(true);
    } catch (err: any) {
      toast({
        title: "Erro ao enviar",
        description: err.message || "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEOHead title="Cadastro Enviado — ABIESV" description="Seu cadastro foi enviado com sucesso." />
        <section className="py-20 gradient-subtle min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-lg mx-auto">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
                Cadastro enviado com sucesso!
              </h1>
              <p className="text-muted-foreground text-lg">
                Seus dados serão analisados pela equipe ABIESV antes da publicação no Guia de Associados.
                Você receberá um retorno em breve.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Cadastro de Associado — ABIESV"
        description="Preencha o formulário para cadastrar sua empresa no Guia de Associados ABIESV."
        canonical="https://abiesv.org.br/associados/cadastro"
      />

      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Cadastro de Associado
            </h1>
            <p className="text-lg text-muted-foreground">
              Preencha os dados da sua empresa para aparecer no Guia de Associados.
              Após o envio, a equipe ABIESV analisará as informações antes da publicação.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Dados da Empresa */}
            <Card>
              <CardHeader>
                <CardTitle>Dados da Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="razao_social">Razão Social *</Label>
                    <Input id="razao_social" {...form.register("razao_social")} />
                    {form.formState.errors.razao_social && (
                      <p className="text-sm text-destructive">{form.formState.errors.razao_social.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nome_fantasia">Nome Fantasia *</Label>
                    <Input id="nome_fantasia" {...form.register("nome_fantasia")} />
                    {form.formState.errors.nome_fantasia && (
                      <p className="text-sm text-destructive">{form.formState.errors.nome_fantasia.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ / CPF *</Label>
                    <Input id="cnpj" {...form.register("cnpj")} />
                    {form.formState.errors.cnpj && (
                      <p className="text-sm text-destructive">{form.formState.errors.cnpj.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select
                      value={form.watch("categoria")}
                      onValueChange={(v) => form.setValue("categoria", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
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
                    <Select
                      value={form.watch("estado")}
                      onValueChange={(v) => form.setValue("estado", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {ESTADOS_BR.map(e => (
                          <SelectItem key={e} value={e}>{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.estado && (
                      <p className="text-sm text-destructive">{form.formState.errors.estado.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input id="cidade" {...form.register("cidade")} />
                    {form.formState.errors.cidade && (
                      <p className="text-sm text-destructive">{form.formState.errors.cidade.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Descrições */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="descricao_curta">
                    Descrição Curta * <span className="text-muted-foreground font-normal">({form.watch("descricao_curta")?.length || 0}/200)</span>
                  </Label>
                  <Textarea
                    id="descricao_curta"
                    {...form.register("descricao_curta")}
                    maxLength={200}
                    rows={3}
                    placeholder="Resumo da empresa em até 200 caracteres..."
                  />
                  {form.formState.errors.descricao_curta && (
                    <p className="text-sm text-destructive">{form.formState.errors.descricao_curta.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao_completa">
                    Descrição Completa <span className="text-muted-foreground font-normal">({form.watch("descricao_completa")?.length || 0}/800)</span>
                  </Label>
                  <Textarea
                    id="descricao_completa"
                    {...form.register("descricao_completa")}
                    maxLength={800}
                    rows={5}
                    placeholder="Descrição detalhada da empresa..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Logotipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  {logoPreview ? (
                    <div className="relative w-24 h-24 rounded-xl border border-border overflow-hidden bg-muted">
                      <img src={logoPreview} alt="Preview" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                      <input type="file" accept=".png,.svg" className="hidden" onChange={handleLogoChange} />
                    </label>
                  )}
                  <div className="text-sm text-muted-foreground">
                    <p>PNG (fundo transparente) ou SVG</p>
                    <p>Mínimo 400×400px, máximo 2MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soluções e Setores */}
            <Card>
              <CardHeader>
                <CardTitle>Soluções e Setores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Soluções oferecidas (até 6)</Label>
                  <div className="flex flex-wrap gap-2">
                    {SOLUCOES_OPCOES.map(s => (
                      <Badge
                        key={s}
                        variant={selectedSolucoes.includes(s) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(s, selectedSolucoes, setSelectedSolucoes, 6)}
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Setores atendidos (até 5)</Label>
                  <div className="flex flex-wrap gap-2">
                    {SETORES_OPCOES.map(s => (
                      <Badge
                        key={s}
                        variant={selectedSetores.includes(s) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(s, selectedSetores, setSelectedSetores, 5)}
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redes Sociais */}
            <Card>
              <CardHeader>
                <CardTitle>Presença Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" {...form.register("website")} placeholder="https://..." />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" {...form.register("linkedin")} placeholder="URL do LinkedIn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" {...form.register("instagram")} placeholder="URL do Instagram" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contatos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Contatos
                  {fields.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ nome: "", cargo: "", telefone_fixo: "", celular: "", email: "" })}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Adicionar
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 rounded-lg border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Contato {index + 1}</span>
                      {fields.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome *</Label>
                        <Input {...form.register(`contacts.${index}.nome`)} />
                        {form.formState.errors.contacts?.[index]?.nome && (
                          <p className="text-sm text-destructive">{form.formState.errors.contacts[index]?.nome?.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input {...form.register(`contacts.${index}.cargo`)} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Telefone fixo</Label>
                        <Input {...form.register(`contacts.${index}.telefone_fixo`)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Celular</Label>
                        <Input {...form.register(`contacts.${index}.celular`)} />
                      </div>
                      <div className="space-y-2">
                        <Label>E-mail *</Label>
                        <Input type="email" {...form.register(`contacts.${index}.email`)} />
                        {form.formState.errors.contacts?.[index]?.email && (
                          <p className="text-sm text-destructive">{form.formState.errors.contacts[index]?.email?.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default CadastroAssociado;
