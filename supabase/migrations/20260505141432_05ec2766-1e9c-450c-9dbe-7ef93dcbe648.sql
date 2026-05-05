-- 1. Add 'associado' role to existing enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'associado';

-- 2. Table linking auth users to approved associate submissions
CREATE TABLE public.associate_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  submission_id uuid NOT NULL REFERENCES public.associate_submissions(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_associate_members_submission ON public.associate_members(submission_id);

ALTER TABLE public.associate_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own membership"
  ON public.associate_members FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all memberships"
  ON public.associate_members FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert memberships"
  ON public.associate_members FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update memberships"
  ON public.associate_members FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete memberships"
  ON public.associate_members FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Helper function: is the current user an active associate?
CREATE OR REPLACE FUNCTION public.is_associate(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.associate_members am
    JOIN public.associate_submissions s ON s.id = am.submission_id
    WHERE am.user_id = _user_id
      AND s.status = 'aprovado'
  )
$$;

-- 4. Member benefits catalog
CREATE TABLE public.member_benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  partner_name text NOT NULL,
  partner_logo_url text,
  category text NOT NULL,
  benefit_type text NOT NULL DEFAULT 'desconto',
  promo_code text,
  link_url text,
  valid_until date,
  featured boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_member_benefits_active ON public.member_benefits(active) WHERE active = true;
CREATE INDEX idx_member_benefits_category ON public.member_benefits(category);

ALTER TABLE public.member_benefits ENABLE ROW LEVEL SECURITY;

-- Associates and admins can view active benefits
CREATE POLICY "Associates can view active benefits"
  ON public.member_benefits FOR SELECT
  TO authenticated
  USING (
    active = true AND (
      public.is_associate(auth.uid()) OR public.has_role(auth.uid(), 'admin')
    )
  );

CREATE POLICY "Admins can view all benefits"
  ON public.member_benefits FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert benefits"
  ON public.member_benefits FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update benefits"
  ON public.member_benefits FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete benefits"
  ON public.member_benefits FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_member_benefits_updated_at
  BEFORE UPDATE ON public.member_benefits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();