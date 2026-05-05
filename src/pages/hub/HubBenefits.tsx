import { useEffect, useMemo, useState } from "react";
import { HubLayout } from "@/components/hub/HubLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, ExternalLink, Search, Star, Tag } from "lucide-react";

type Benefit = {
  id: string;
  title: string;
  description: string;
  partner_name: string;
  partner_logo_url: string | null;
  category: string;
  benefit_type: string;
  promo_code: string | null;
  link_url: string | null;
  valid_until: string | null;
  featured: boolean;
};

function safeUrl(url: string): string {
  try {
    const p = new URL(url);
    if (p.protocol !== "http:" && p.protocol !== "https:") return "#";
    return url;
  } catch { return "#"; }
}

const HubBenefits = () => {
  const [items, setItems] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    supabase
      .from("member_benefits")
      .select("*")
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setItems(data as Benefit[]);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.category));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter(i => {
      const matchesCat = category === "todas" || i.category === category;
      const q = search.trim().toLowerCase();
      const matchesSearch = !q ||
        i.title.toLowerCase().includes(q) ||
        i.partner_name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [items, category, search]);

  const copy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast({ title: "Código copiado!", description: code });
  };

  return (
    <HubLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Benefícios & Parcerias</h1>
          <p className="text-muted-foreground">Vantagens exclusivas para associados ABIESV.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar parceiro ou benefício..."
              className="pl-9"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as categorias</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum benefício {items.length === 0 ? "cadastrado ainda" : "encontrado com esses filtros"}.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(b => (
              <Card key={b.id} className="hover:shadow-card transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    {b.partner_logo_url ? (
                      <img src={b.partner_logo_url} alt={b.partner_name} className="w-12 h-12 rounded-lg object-contain border" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-heading font-bold text-primary">
                        {b.partner_name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base leading-tight">{b.title}</CardTitle>
                      <CardDescription className="text-xs">{b.partner_name}</CardDescription>
                    </div>
                    {b.featured && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <p className="text-sm text-foreground/80 flex-1">{b.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs"><Tag className="h-3 w-3 mr-1" />{b.category}</Badge>
                    <Badge variant="outline" className="text-xs">{b.benefit_type}</Badge>
                    {b.valid_until && (
                      <Badge variant="outline" className="text-xs">
                        Até {new Date(b.valid_until).toLocaleDateString("pt-BR")}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    {b.promo_code && (
                      revealed[b.id] ? (
                        <Button variant="outline" size="sm" onClick={() => copy(b.promo_code!)} className="font-mono">
                          <Copy className="h-3.5 w-3.5 mr-1" /> {b.promo_code}
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setRevealed(r => ({ ...r, [b.id]: true }))}>
                          Ver código promocional
                        </Button>
                      )
                    )}
                    {b.link_url && (
                      <Button asChild size="sm">
                        <a href={safeUrl(b.link_url)} target="_blank" rel="noopener noreferrer">
                          Aproveitar <ExternalLink className="h-3.5 w-3.5 ml-1" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </HubLayout>
  );
};

export default HubBenefits;
