import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ImageConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/webp");
  const [url, setUrl] = useState<string | null>(null);

  const convert = async () => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise(r => (img.onload = r));
    const canvas = document.createElement("canvas");
    canvas.width = img.width; canvas.height = img.height;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    const blob: Blob = await new Promise(res => canvas.toBlob(b => res(b!), format, 0.92));
    if (url) URL.revokeObjectURL(url);
    setUrl(URL.createObjectURL(blob));
  };

  const ext = format.split("/")[1];

  return (
    <div className="space-y-4">
      <div>
        <Label>Imagem</Label>
        <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </div>
      <div>
        <Label>Formato de saída</Label>
        <Select value={format} onValueChange={v => setFormat(v as any)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="image/jpeg">JPG</SelectItem>
            <SelectItem value="image/png">PNG</SelectItem>
            <SelectItem value="image/webp">WebP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={convert} disabled={!file}>Converter</Button>
      {url && (
        <div className="space-y-2 pt-2 border-t">
          <img src={url} alt="Preview" className="max-h-64 rounded border" />
          <Button asChild variant="outline" size="sm"><a href={url} download={`imagem.${ext}`}>Baixar .{ext}</a></Button>
        </div>
      )}
    </div>
  );
};
export default ImageConverter;
