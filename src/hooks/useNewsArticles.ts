import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  source: string;
  source_url: string;
  published_date: string;
  category: string;
  sector: string;
  featured: boolean;
  created_at: string;
}

export function useNewsArticles() {
  return useQuery({
    queryKey: ["news-articles"],
    staleTime: 5 * 60 * 1000, // 5 minutos
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("published_date", { ascending: false });
      if (error) throw error;
      return data as NewsArticle[];
    },
  });
}
