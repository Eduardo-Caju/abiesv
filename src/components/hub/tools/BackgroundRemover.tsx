import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const BackgroundRemover = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");

  const remove = async () => {
    if (!file) return;
    setBusy(true);
    setProgress("Carregando modelo (primeira vez ~50MB)...");
    try {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      const segmenter = await pipeline("background-removal", "briaai/RMBG-1.4", { device: "webgpu" }).catch(() =>
        pipeline("background-removal", "briaai/RMBG-1.4")
      );
      setProgress("Removendo fundo...");
      const url = URL.createObjectURL(file);
      const result: any = await segmenter(url);
      const out = Array.isArray(result) ? result[0] : result;
      const blob: Blob = await out.toBlob ? await out.toBlob() : out;
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
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
      <Button onClick={remove} disabled={!file || busy}>{busy ? progress || "Processando..." : "Remover fundo"}</Button>
      <p className="text-xs text-muted-foreground">Roda 100% no seu navegador via IA local. A primeira execução baixa o modelo (~50MB).</p>
      {outUrl && (
        <div className="space-y-2 pt-2 border-t">
          <div className="rounded border p-3" style={{ backgroundImage: "linear-gradient(45deg,#ddd 25%,transparent 25%),linear-gradient(-45deg,#ddd 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ddd 75%),linear-gradient(-45deg,transparent 75%,#ddd 75%)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px" }}>
            <img src={outUrl} alt="Sem fundo" className="max-h-64 mx-auto" />
          </div>
          <Button asChild variant="outline" size="sm"><a href={outUrl} download="sem-fundo.png">Baixar PNG</a></Button>
        </div>
      )}
    </div>
  );
};
export default BackgroundRemover;
