import { Link, useParams, Navigate } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import ImageCompressor from "@/components/hub/tools/ImageCompressor";
import ImageConverter from "@/components/hub/tools/ImageConverter";
import PdfCompressor from "@/components/hub/tools/PdfCompressor";
import QrGenerator from "@/components/hub/tools/QrGenerator";
import UtmBuilder from "@/components/hub/tools/UtmBuilder";
import LinkShortener from "@/components/hub/tools/LinkShortener";
import ColorPalette from "@/components/hub/tools/ColorPalette";
import BackgroundRemover from "@/components/hub/tools/BackgroundRemover";
import OcrTool from "@/components/hub/tools/OcrTool";

const registry: Record<string, { title: string; desc: string; Component: React.ComponentType }> = {
  "compressor-imagem": { title: "Compressor de imagem", desc: "Reduza o tamanho de imagens ajustando qualidade e dimensões.", Component: ImageCompressor },
  "conversor-imagem": { title: "Conversor de imagem", desc: "Converta entre JPG, PNG e WebP.", Component: ImageConverter },
  "compressor-pdf": { title: "Compressor de PDF", desc: "Reotimize seu PDF removendo dados redundantes.", Component: PdfCompressor },
  "qr-code": { title: "Gerador de QR Code", desc: "Gere um QR Code para qualquer texto ou link.", Component: QrGenerator },
  "utm-builder": { title: "UTM Builder", desc: "Crie URLs com parâmetros de campanha (UTM).", Component: UtmBuilder },
  "encurtador": { title: "Encurtador de link", desc: "Encurte URLs usando is.gd.", Component: LinkShortener },
  "paleta": { title: "Paleta de cores", desc: "Extraia as cores dominantes de uma imagem.", Component: ColorPalette },
  "remover-fundo": { title: "Removedor de fundo", desc: "Remova o fundo de uma imagem direto no navegador (IA local).", Component: BackgroundRemover },
  "ocr": { title: "Extrator de texto (OCR)", desc: "Extraia texto de imagens em português e inglês.", Component: OcrTool },
};

const HubToolDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? registry[slug] : undefined;
  if (!tool) return <Navigate to="/hub/ferramentas" replace />;
  const { Component, title, desc } = tool;
  return (
    <HubLayout>
      <div className="space-y-4 max-w-4xl">
        <Button asChild variant="ghost" size="sm">
          <Link to="/hub/ferramentas"><ArrowLeft className="h-4 w-4 mr-1" /> Voltar para ferramentas</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-2xl">{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Component />
          </CardContent>
        </Card>
      </div>
    </HubLayout>
  );
};

export default HubToolDetail;
