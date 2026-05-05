import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}

const ColorPalette = () => {
  const { toast } = useToast();
  const [colors, setColors] = useState<{ hex: string; count: number }[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const extract = async (file: File) => {
    setPreview(URL.createObjectURL(file));
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise(r => (img.onload = r));
    const size = 100;
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    const buckets = new Map<string, number>();
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 128) continue;
      const r = Math.round(data[i] / 32) * 32;
      const g = Math.round(data[i + 1] / 32) * 32;
      const b = Math.round(data[i + 2] / 32) * 32;
      const key = `${r},${g},${b}`;
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    const top = [...buckets.entries()]
      .sort((a, b) => b[1] - a[1]).slice(0, 8)
      .map(([k, count]) => {
        const [r, g, b] = k.split(",").map(Number);
        return { hex: rgbToHex(r, g, b), count };
      });
    setColors(top);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Imagem</Label>
        <Input type="file" accept="image/*" onChange={e => e.target.files?.[0] && extract(e.target.files[0])} />
      </div>
      {preview && <img src={preview} alt="" className="max-h-48 rounded border" />}
      {colors.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {colors.map(c => (
            <button key={c.hex} onClick={() => { navigator.clipboard.writeText(c.hex); toast({ title: `${c.hex} copiado!` }); }}
              className="text-xs space-y-1">
              <div className="w-full h-16 rounded border" style={{ background: c.hex }} />
              <span className="font-mono">{c.hex}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default ColorPalette;
