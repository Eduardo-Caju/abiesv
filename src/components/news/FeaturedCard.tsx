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

export const FeaturedCard = ({ article }: { article: NewsArticle }) => (
  <a
    href={article.source_url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
  >
    <Card className="h-full border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="default" className="text-xs">{article.category}</Badge>
          <Badge variant="outline" className="text-xs">{article.sector}</Badge>
        </div>
        <h3 className="font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.published_date)}
          </span>
          <span className="flex items-center gap-1 text-primary group-hover:underline">
            {article.source}
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </CardContent>
    </Card>
  </a>
);
