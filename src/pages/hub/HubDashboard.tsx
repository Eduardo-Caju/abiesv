import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Wrench, ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const HubDashboard = () => {
  const [benefitsCount, setBenefitsCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("member_benefits")
      .select("id", { count: "exact", head: true })
      .eq("active", true)
      .then(({ count }) => setBenefitsCount(count ?? 0));
  }, []);

  return (
    <HubLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Bem-vindo ao Hub ABIESV</h1>
          <p className="text-muted-foreground">Sua central de vantagens e ferramentas exclusivas para associados.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Benefícios & Parcerias</CardTitle>
                  <CardDescription>
                    {benefitsCount === null ? "Carregando..." : `${benefitsCount} vantagem${benefitsCount === 1 ? "" : "s"} disponível${benefitsCount === 1 ? "" : "is"}`}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm">
                <Link to="/hub/beneficios">Ver benefícios <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">Ferramentas</CardTitle>
                  <CardDescription>Em breve: utilitários para o dia a dia do varejo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" disabled>
                <Sparkles className="mr-1 h-4 w-4" /> Em breve
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">O que vem por aí</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Compressor e conversor de imagens</p>
            <p>• Gerador de QR Code e UTM Builder</p>
            <p>• Encurtador de links com analytics</p>
            <p>• Removedor de fundo de imagem e extrator de texto (OCR)</p>
            <p>• Gerador de paleta de cores</p>
          </CardContent>
        </Card>
      </div>
    </HubLayout>
  );
};

export default HubDashboard;
