import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Gift, Wrench, ArrowRight, ImageDown, FileImage, FileArchive,
  QrCode, Link2, Scissors, Palette, Eraser, ScanText,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const tools = [
  { slug: "compressor-imagem", title: "Compressor de imagem", icon: ImageDown },
  { slug: "conversor-imagem", title: "Conversor de imagem", icon: FileImage },
  { slug: "compressor-pdf", title: "Compressor de PDF", icon: FileArchive },
  { slug: "qr-code", title: "Gerador de QR Code", icon: QrCode },
  { slug: "utm-builder", title: "UTM Builder", icon: Link2 },
  { slug: "encurtador", title: "Encurtador de link", icon: Scissors },
  { slug: "paleta", title: "Paleta de cores", icon: Palette },
  { slug: "remover-fundo", title: "Removedor de fundo", icon: Eraser },
  { slug: "ocr", title: "Extrator de texto (OCR)", icon: ScanText },
];

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
                  <CardDescription>{tools.length} utilitários prontos para o dia a dia do varejo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm">
                <Link to="/hub/ferramentas">Abrir ferramentas <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ferramentas disponíveis</CardTitle>
            <CardDescription>Acesso rápido — tudo roda no seu navegador.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {tools.map(t => (
                <Link
                  key={t.slug}
                  to={`/hub/ferramentas/${t.slug}`}
                  className="flex items-center gap-2 p-2 rounded-md border bg-muted/30 hover:border-primary/60 hover:bg-muted/60 transition-colors text-sm"
                >
                  <t.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">{t.title}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HubLayout>
  );
};

export default HubDashboard;
