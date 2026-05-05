import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const LinkShortener = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [busy, setBusy] = useState(false);

  const shorten = async () => {
    if (!url) return;
    setBusy(true);
    try {
      const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      const text = await res.text();
      if (!res.ok || !text.startsWith("http")) throw new Error(text);
      setShort(text);
    } catch (e: any) {
      toast({ title: "Erro ao encurtar", description: e.message, variant: "destructive" });
    }
    setBusy(false);
  };

  const copy = () => { navigator.clipboard.writeText(short); toast({ title: "Copiado!" }); };

  return (
    <div className="space-y-3">
      <div>
        <Label>URL longa</Label>
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
      </div>
      <Button onClick={shorten} disabled={!url || busy}>{busy ? "Encurtando..." : "Encurtar"}</Button>
      {short && (
        <div className="pt-2 border-t space-y-2">
          <Label>URL curta</Label>
          <div className="flex gap-2">
            <Input readOnly value={short} />
            <Button variant="outline" onClick={copy}><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">Serviço gratuito is.gd — links permanentes, sem necessidade de conta.</p>
    </div>
  );
};
export default LinkShortener;
