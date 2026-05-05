import { useEffect, useState } from "react";
import { HubLayout } from "@/components/hub/HubLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHubAuth } from "@/hooks/useHubAuth";
import { supabase } from "@/integrations/supabase/client";

const HubProfile = () => {
  const { user } = useHubAuth();
  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    if (!user?.submissionId) return;
    supabase
      .from("associate_submissions")
      .select("*")
      .eq("id", user.submissionId)
      .single()
      .then(({ data }) => setSubmission(data));
  }, [user?.submissionId]);

  return (
    <HubLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">Minha Empresa</h1>
          <p className="text-muted-foreground">Dados cadastrados na ABIESV.</p>
        </div>

        {!submission ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              {user?.isAdmin ? "Você está autenticado como admin (sem associado vinculado)." : "Carregando..."}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                {submission.logo_url && (
                  <img src={submission.logo_url} alt="Logo" className="w-14 h-14 rounded-xl object-contain border" />
                )}
                <div>
                  <CardTitle>{submission.nome_fantasia}</CardTitle>
                  <CardDescription>{submission.razao_social}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid sm:grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">CNPJ:</span> {submission.cnpj}</div>
                <div><span className="text-muted-foreground">Categoria:</span> {submission.categoria}</div>
                <div><span className="text-muted-foreground">Local:</span> {submission.cidade}, {submission.estado}</div>
              </div>
              {submission.descricao_curta && (
                <div>
                  <p className="text-muted-foreground mb-1">Descrição</p>
                  <p>{submission.descricao_curta}</p>
                </div>
              )}
              {(submission.solucoes?.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {submission.solucoes.map((s: string) => <Badge key={s} variant="secondary">{s}</Badge>)}
                </div>
              )}
              <p className="text-xs text-muted-foreground pt-3 border-t">
                Para atualizar dados, entre em contato com a secretaria@abiesv.com.br
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </HubLayout>
  );
};

export default HubProfile;
