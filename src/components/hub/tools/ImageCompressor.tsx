import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

function bytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(75);
  const [maxW, setMaxW] = useState(1920);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [busy, setBusy] = useState(false);

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise(r => (img.onload = r));
    const ratio = Math.min(1, maxW / img.width);
    const w = Math.round(img.width * ratio);
    const h = Math.round(img.height * ratio);
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
    const blob: Blob = await new Promise(res => canvas.toBlob(b => res(b!), "image/jpeg", quality / 100));
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(URL.createObjectURL(blob));
    setResultSize(blob.size);
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Imagem</Label>
        <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        {file && <p className="text-xs text-muted-foreground mt-1">Original: {bytes(file.size)}</p>}
      </div>
      <div>
        <Label>Qualidade: {quality}%</Label>
        <Slider value={[quality]} min={10} max={100} step={5} onValueChange={v => setQuality(v[0])} />
      </div>
      <div>
        <Label>Largura máxima (px)</Label>
        <Input type="number" value={maxW} onChange={e => setMaxW(parseInt(e.target.value) || 1920)} />
      </div>
      <Button onClick={compress} disabled={!file || busy}>{busy ? "Comprimindo..." : "Comprimir"}</Button>
      {resultUrl && (
        <div className="space-y-2 pt-2 border-t">
          <p className="text-sm">Resultado: <strong>{bytes(resultSize)}</strong></p>
          <img src={resultUrl} alt="Preview" className="max-h-64 rounded border" />
          <Button asChild variant="outline" size="sm"><a href={resultUrl} download="comprimido.jpg">Baixar</a></Button>
        </div>
      )}
    </div>
  );
};
export default ImageCompressor;
