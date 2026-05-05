import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const OcrTool = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);

  const extract = async () => {
    if (!file) return;
    setBusy(true); setPct(0); setText("");
    try {
      const Tesseract = (await import("tesseract.js")).default;
      const { data } = await Tesseract.recognize(file, "por+eng", {
        logger: (m: any) => { if (m.status === "recognizing text") setPct(Math.round(m.progress * 100)); },
      });
      setText(data.text);
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    }
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Imagem</Label>
        <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </div>
      <Button onClick={extract} disabled={!file || busy}>{busy ? "Processando..." : "Extrair texto"}</Button>
      {busy && <Progress value={pct} />}
      {text && (
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between">
            <Label>Texto extraído</Label>
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(text); toast({ title: "Copiado!" }); }}>
              <Copy className="h-4 w-4 mr-1" /> Copiar
            </Button>
          </div>
          <Textarea rows={10} value={text} readOnly />
        </div>
      )}
    </div>
  );
};
export default OcrTool;
