import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const MAX_DIM = 1024;

const BackgroundRemover = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");

  const remove = async () => {
    if (!file) return;
    setBusy(true);
    try {
      setProgress("Carregando modelo (primeira vez ~50MB)...");
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;

      const segmenter = await pipeline("image-segmentation", "briaai/RMBG-1.4", {
        device: "webgpu",
      } as any).catch(() => pipeline("image-segmentation", "briaai/RMBG-1.4"));

      setProgress("Preparando imagem...");
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

      const ratio = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
      const w = Math.round(img.width * ratio);
      const h = Math.round(img.height * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);

      // Send the resized image to the model
      const dataUrl = canvas.toDataURL("image/png");

      setProgress("Removendo fundo (pode demorar)...");
      const result: any = await segmenter(dataUrl);
      if (!Array.isArray(result) || result.length === 0 || !result[0].mask) {
        throw new Error("O modelo não retornou uma máscara válida.");
      }
      const mask = result[0].mask; // RawImage with .data (Uint8Array length = w*h)

      setProgress("Aplicando máscara...");
      const imageData = ctx.getImageData(0, 0, w, h);
      const maskData: Uint8Array = mask.data;
      // Mask may have different dimensions; assume same w*h (RMBG outputs same size)
      const len = Math.min(maskData.length, imageData.data.length / 4);
      for (let i = 0; i < len; i++) {
        imageData.data[i * 4 + 3] = maskData[i];
      }
      ctx.putImageData(imageData, 0, 0);

      const blob: Blob = await new Promise(res => canvas.toBlob(b => res(b!), "image/png"));
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e: any) {
      console.error("[BackgroundRemover]", e);
      toast({ title: "Erro", description: e?.message ?? "Falha ao remover fundo", variant: "destructive" });
    }
    setBusy(false);
    setProgress("");
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Imagem</Label>
        <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </div>
      <Button onClick={remove} disabled={!file || busy}>{busy ? (progress || "Processando...") : "Remover fundo"}</Button>
      <p className="text-xs text-muted-foreground">
        Roda 100% no seu navegador via IA local. A primeira execução baixa o modelo (~50MB). Imagens grandes são reduzidas para até {MAX_DIM}px.
      </p>
      {outUrl && (
        <div className="space-y-2 pt-2 border-t">
          <div
            className="rounded border p-3"
            style={{
              backgroundImage:
                "linear-gradient(45deg,#ddd 25%,transparent 25%),linear-gradient(-45deg,#ddd 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ddd 75%),linear-gradient(-45deg,transparent 75%,#ddd 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          >
            <img src={outUrl} alt="Sem fundo" className="max-h-64 mx-auto" />
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={outUrl} download="sem-fundo.png">Baixar PNG</a>
          </Button>
        </div>
      )}
    </div>
  );
};
export default BackgroundRemover;
