
-- Create news_articles table
CREATE TABLE public.news_articles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL,
  source text NOT NULL,
  source_url text NOT NULL,
  published_date date NOT NULL,
  category text NOT NULL,
  sector text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read news"
ON public.news_articles
FOR SELECT
USING (true);

-- Admin insert
CREATE POLICY "Admins can insert news"
ON public.news_articles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin update
CREATE POLICY "Admins can update news"
ON public.news_articles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin delete
CREATE POLICY "Admins can delete news"
ON public.news_articles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for performance
CREATE INDEX idx_news_articles_published_date ON public.news_articles(published_date DESC);
CREATE INDEX idx_news_articles_category ON public.news_articles(category);
CREATE INDEX idx_news_articles_sector ON public.news_articles(sector);
