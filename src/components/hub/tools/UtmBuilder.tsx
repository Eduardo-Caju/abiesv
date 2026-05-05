import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const UtmBuilder = () => {
  const { toast } = useToast();
  const [base, setBase] = useState("https://abiesv.com.br");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const built = useMemo(() => {
    if (!base) return "";
    try {
      const u = new URL(base);
      const params: [string, string][] = [
        ["utm_source", source], ["utm_medium", medium], ["utm_campaign", campaign],
        ["utm_term", term], ["utm_content", content],
      ];
      params.forEach(([k, v]) => v && u.searchParams.set(k, v));
      return u.toString();
    } catch { return ""; }
  }, [base, source, medium, campaign, term, content]);

  const copy = () => {
    navigator.clipboard.writeText(built);
    toast({ title: "Copiado!" });
  };

  return (
    <div className="space-y-3">
      <div><Label>URL base *</Label><Input value={base} onChange={e => setBase(e.target.value)} /></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>utm_source *</Label><Input placeholder="ex: instagram" value={source} onChange={e => setSource(e.target.value)} /></div>
        <div><Label>utm_medium *</Label><Input placeholder="ex: social" value={medium} onChange={e => setMedium(e.target.value)} /></div>
        <div><Label>utm_campaign *</Label><Input placeholder="ex: lancamento_2026" value={campaign} onChange={e => setCampaign(e.target.value)} /></div>
        <div><Label>utm_term</Label><Input value={term} onChange={e => setTerm(e.target.value)} /></div>
        <div className="sm:col-span-2"><Label>utm_content</Label><Input value={content} onChange={e => setContent(e.target.value)} /></div>
      </div>
      <div className="pt-2 border-t space-y-2">
        <Label>URL gerada</Label>
        <div className="flex gap-2">
          <Input readOnly value={built} className="font-mono text-xs" />
          <Button variant="outline" onClick={copy} disabled={!built}><Copy className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};
export default UtmBuilder;
