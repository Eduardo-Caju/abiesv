import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const QrGenerator = () => {
  const [text, setText] = useState("https://abiesv.com.br");
  const [size, setSize] = useState(512);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!text) return setUrl("");
    QRCode.toDataURL(text, { width: size, margin: 2, errorCorrectionLevel: "M" }).then(setUrl);
  }, [text, size]);

  return (
    <div className="space-y-4">
      <div>
        <Label>Conteúdo</Label>
        <Textarea rows={3} value={text} onChange={e => setText(e.target.value)} placeholder="URL, texto, vCard, Wi-Fi..." />
      </div>
      <div>
        <Label>Tamanho (px)</Label>
        <Input type="number" value={size} min={128} max={2048} step={64} onChange={e => setSize(parseInt(e.target.value) || 512)} />
      </div>
      {url && (
        <div className="space-y-3 pt-2 border-t">
          <img src={url} alt="QR Code" className="border rounded p-2 bg-background" style={{ maxWidth: 320 }} />
          <Button asChild variant="outline" size="sm"><a href={url} download="qrcode.png">Baixar PNG</a></Button>
        </div>
      )}
    </div>
  );
};
export default QrGenerator;
