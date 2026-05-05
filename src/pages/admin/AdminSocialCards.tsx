import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNewsArticles, type NewsArticle } from "@/hooks/useNewsArticles";
import { ReelsCard } from "@/components/social/ReelsCard";
import { ArrowLeft, Download, Search, Loader2 } from "lucide-react";
import logoAbiesv from "@/assets/logo-abiesv.png";

const AdminSocialCards = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const { data: articles, isLoading } = useNewsArticles();
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useAdminAuth("news");

  const filtered = articles?.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  const handleDownload = async (article: NewsArticle) => {
    const node = cardRefs.current.get(article.id);
    if (!node) return;
    setDownloading(article.id);
    try {
      const dataUrl = await toPng(node, {
        width: 1080,
        height: 1920,
        pixelRatio: 1,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `card-${article.slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logoAbiesv} alt="ABIESV" className="h-8" />
            <span className="font-heading font-bold text-foreground">Social Cards</span>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Voltar</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Cards para Reels</h1>
            <p className="text-muted-foreground">Gere cards no formato 9:16 para Instagram</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar notícia..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Carregando notícias...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Nenhuma notícia encontrada.</p>
        ) : (
          <div className="space-y-6">
            {filtered.map(article => (
              <Card key={article.id}>
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
                  {/* Preview miniatura */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0" style={{ width: 216, height: 384, overflow: "hidden", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                    <div style={{ transform: "scale(0.2)", transformOrigin: "top left", width: 1080, height: 1920 }}>
                      <ReelsCard
                        article={article}
                        ref={(el: HTMLDivElement | null) => {
                          if (el) cardRefs.current.set(article.id, el);
                        }}
                      />
                    </div>
                  </div>

                  {/* Info + Download */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{article.category} • {article.sector}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(article.published_date + "T12:00:00").toLocaleDateString("pt-BR")} • {article.source}
                      </p>
                    </div>
                    <Button
                      className="mt-4 w-full sm:w-auto"
                      onClick={() => handleDownload(article)}
                      disabled={downloading === article.id}
                    >
                      {downloading === article.id ? (
                        <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Gerando...</>
                      ) : (
                        <><Download className="h-4 w-4 mr-1" /> Baixar PNG</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSocialCards;
