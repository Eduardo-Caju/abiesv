import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function bytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

const PdfCompressor = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      const out = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([new Uint8Array(out)], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
      if (blob.size >= file.size) {
        toast({ title: "PDF já está otimizado", description: "Não foi possível reduzir o tamanho deste PDF." });
      }
    } catch (e: any) {
      toast({ title: "Erro ao processar PDF", description: e.message, variant: "destructive" });
    }
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Arquivo PDF</Label>
        <Input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        {file && <p className="text-xs text-muted-foreground mt-1">Original: {bytes(file.size)}</p>}
      </div>
      <Button onClick={compress} disabled={!file || busy}>{busy ? "Otimizando..." : "Otimizar PDF"}</Button>
      <p className="text-xs text-muted-foreground">A otimização remove metadados duplicados e reorganiza o arquivo. PDFs com muitas imagens podem precisar ser comprimidos por imagem.</p>
      {outUrl && (
        <div className="space-y-2 pt-2 border-t">
          <p className="text-sm">Resultado: <strong>{bytes(outSize)}</strong></p>
          <Button asChild variant="outline" size="sm"><a href={outUrl} download="otimizado.pdf">Baixar</a></Button>
        </div>
      )}
    </div>
  );
};
export default PdfCompressor;
