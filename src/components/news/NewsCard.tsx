import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink } from "lucide-react";
import type { NewsArticle } from "@/hooks/useNewsArticles";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const NewsCard = ({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) => (
  <a
    href={article.source_url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
  >
    <Card
      className={`border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden ${
        featured ? "bg-gradient-to-r from-primary/5 to-transparent" : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="default">{article.category}</Badge>
          <Badge variant="outline">{article.sector}</Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.published_date)}
          </span>
        </div>
        <h2
          className={`font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {article.title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Fonte: {article.source}</span>
          <span className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1">
            Ler matéria completa
            <ExternalLink className="h-4 w-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  </a>
);
