
-- Enums
CREATE TYPE public.submission_status AS ENUM ('pendente', 'aprovado', 'rejeitado');
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Associate submissions
CREATE TABLE public.associate_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao_curta TEXT NOT NULL,
  descricao_completa TEXT,
  estado TEXT NOT NULL,
  cidade TEXT NOT NULL,
  website TEXT,
  linkedin TEXT,
  instagram TEXT,
  solucoes TEXT[] DEFAULT '{}',
  setores TEXT[] DEFAULT '{}',
  logo_url TEXT,
  status submission_status NOT NULL DEFAULT 'pendente',
  observacao_admin TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.associate_submissions ENABLE ROW LEVEL SECURITY;

-- Contacts
CREATE TABLE public.associate_submission_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.associate_submissions(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cargo TEXT,
  telefone_fixo TEXT,
  celular TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.associate_submission_contacts ENABLE ROW LEVEL SECURITY;

-- User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_associate_submissions_updated_at
  BEFORE UPDATE ON public.associate_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: associate_submissions
CREATE POLICY "Anyone can insert submissions"
  ON public.associate_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can view approved submissions"
  ON public.associate_submissions FOR SELECT
  USING (status = 'aprovado');

CREATE POLICY "Admins can view all submissions"
  ON public.associate_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
  ON public.associate_submissions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions"
  ON public.associate_submissions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS: associate_submission_contacts
CREATE POLICY "Anyone can insert contacts"
  ON public.associate_submission_contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can view contacts of approved submissions"
  ON public.associate_submission_contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.associate_submissions
      WHERE id = submission_id AND status = 'aprovado'
    )
  );

CREATE POLICY "Admins can view all contacts"
  ON public.associate_submission_contacts FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contacts"
  ON public.associate_submission_contacts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contacts"
  ON public.associate_submission_contacts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS: user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('associate-logos', 'associate-logos', true);

CREATE POLICY "Anyone can upload logos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'associate-logos');

CREATE POLICY "Anyone can view logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'associate-logos');
