import { Link } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  ImageDown, FileImage, FileArchive, QrCode, Link2, Scissors,
  Palette, Eraser, ScanText,
} from "lucide-react";

const tools = [
  { slug: "compressor-imagem", title: "Compressor de imagem", desc: "Reduza o tamanho de JPG/PNG/WebP sem perder qualidade.", icon: ImageDown },
  { slug: "conversor-imagem", title: "Conversor de imagem", desc: "Converta entre JPG, PNG e WebP rapidamente.", icon: FileImage },
  { slug: "compressor-pdf", title: "Compressor de PDF", desc: "Otimize PDFs para envio por e-mail ou WhatsApp.", icon: FileArchive },
  { slug: "qr-code", title: "Gerador de QR Code", desc: "Crie QR Codes para links, Wi-Fi, vCard e mais.", icon: QrCode },
  { slug: "utm-builder", title: "UTM Builder", desc: "Monte URLs com parâmetros de campanha do Google Analytics.", icon: Link2 },
  { slug: "encurtador", title: "Encurtador de link", desc: "Encurte URLs longas com is.gd (gratuito).", icon: Scissors },
  { slug: "paleta", title: "Paleta de cores", desc: "Extraia a paleta de cores dominantes de uma imagem.", icon: Palette },
  { slug: "remover-fundo", title: "Removedor de fundo", desc: "Remova o fundo de imagens direto no navegador.", icon: Eraser },
  { slug: "ocr", title: "Extrator de texto (OCR)", desc: "Extraia texto de imagens em português e inglês.", icon: ScanText },
];

const HubTools = () => {
  return (
    <HubLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">Ferramentas</h1>
          <p className="text-muted-foreground">Utilitários práticos para o dia a dia do varejo. Tudo roda no seu navegador.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => (
            <Link key={t.slug} to={`/hub/ferramentas/${t.slug}`}>
              <Card className="h-full hover:border-primary/60 hover:shadow-md transition-all">
                <CardContent className="p-5 flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <t.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </HubLayout>
  );
};

export default HubTools;
