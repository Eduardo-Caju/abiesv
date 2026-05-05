import { HubLayout } from "@/components/hub/HubLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench, Sparkles } from "lucide-react";

const HubTools = () => {
  return (
    <HubLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">Ferramentas</h1>
          <p className="text-muted-foreground">Utilitários práticos para o dia a dia do varejo.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Em breve</CardTitle>
            </div>
            <CardDescription>
              Estamos trazendo um conjunto de ferramentas exclusivas para você.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Compressor de imagem",
                "Conversor de imagem",
                "Compressor de PDF",
                "Gerador de QR Code",
                "UTM Builder",
                "Encurtador de link",
                "Paleta de cores",
                "Removedor de fundo",
                "Extrator de texto (OCR)",
              ].map(t => (
                <div key={t} className="p-3 rounded-lg border bg-muted/30 flex items-center gap-2 text-sm">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  {t}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HubLayout>
  );
};

export default HubTools;
