
-- Enum
CREATE TYPE public.admin_permission AS ENUM ('news', 'submissions', 'benefits', 'team');

-- Table
CREATE TABLE public.admin_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  permission public.admin_permission NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, permission)
);

ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;

-- has_permission function
CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _permission public.admin_permission)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_permissions
    WHERE user_id = _user_id AND permission = _permission
  )
$$;

-- RLS for admin_permissions
CREATE POLICY "Users can view own permissions" ON public.admin_permissions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Team admins can view all permissions" ON public.admin_permissions
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'team'));
CREATE POLICY "Team admins can insert permissions" ON public.admin_permissions
  FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'team'));
CREATE POLICY "Team admins can delete permissions" ON public.admin_permissions
  FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'team'));

-- Seed: grant all permissions to existing admins
INSERT INTO public.admin_permissions (user_id, permission)
SELECT ur.user_id, p.permission
FROM public.user_roles ur
CROSS JOIN (VALUES ('news'::public.admin_permission), ('submissions'), ('benefits'), ('team')) AS p(permission)
WHERE ur.role = 'admin'
ON CONFLICT DO NOTHING;

-- Update RLS policies to use permissions

-- news_articles
DROP POLICY IF EXISTS "Admins can insert news" ON public.news_articles;
DROP POLICY IF EXISTS "Admins can update news" ON public.news_articles;
DROP POLICY IF EXISTS "Admins can delete news" ON public.news_articles;
CREATE POLICY "News editors can insert news" ON public.news_articles
  FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'news'));
CREATE POLICY "News editors can update news" ON public.news_articles
  FOR UPDATE TO authenticated USING (public.has_permission(auth.uid(), 'news'));
CREATE POLICY "News editors can delete news" ON public.news_articles
  FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'news'));

-- member_benefits
DROP POLICY IF EXISTS "Admins can insert benefits" ON public.member_benefits;
DROP POLICY IF EXISTS "Admins can update benefits" ON public.member_benefits;
DROP POLICY IF EXISTS "Admins can delete benefits" ON public.member_benefits;
DROP POLICY IF EXISTS "Admins can view all benefits" ON public.member_benefits;
CREATE POLICY "Benefits editors can view all benefits" ON public.member_benefits
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'benefits'));
CREATE POLICY "Benefits editors can insert benefits" ON public.member_benefits
  FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'benefits'));
CREATE POLICY "Benefits editors can update benefits" ON public.member_benefits
  FOR UPDATE TO authenticated USING (public.has_permission(auth.uid(), 'benefits'));
CREATE POLICY "Benefits editors can delete benefits" ON public.member_benefits
  FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'benefits'));

-- associate_submissions
DROP POLICY IF EXISTS "Admins can update submissions" ON public.associate_submissions;
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.associate_submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.associate_submissions;
CREATE POLICY "Submission managers can view all" ON public.associate_submissions
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));
CREATE POLICY "Submission managers can update" ON public.associate_submissions
  FOR UPDATE TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));
CREATE POLICY "Submission managers can delete" ON public.associate_submissions
  FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));

-- associate_submission_contacts
DROP POLICY IF EXISTS "Admins can update contacts" ON public.associate_submission_contacts;
DROP POLICY IF EXISTS "Admins can delete contacts" ON public.associate_submission_contacts;
DROP POLICY IF EXISTS "Admins can view all contacts" ON public.associate_submission_contacts;
CREATE POLICY "Submission managers can view contacts" ON public.associate_submission_contacts
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));
CREATE POLICY "Submission managers can update contacts" ON public.associate_submission_contacts
  FOR UPDATE TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));
CREATE POLICY "Submission managers can delete contacts" ON public.associate_submission_contacts
  FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));

-- associate_members
DROP POLICY IF EXISTS "Admins can insert memberships" ON public.associate_members;
DROP POLICY IF EXISTS "Admins can update memberships" ON public.associate_members;
DROP POLICY IF EXISTS "Admins can delete memberships" ON public.associate_members;
DROP POLICY IF EXISTS "Admins can view all memberships" ON public.associate_members;
CREATE POLICY "Submission managers can view memberships" ON public.associate_members
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));
CREATE POLICY "Submission managers can insert memberships" ON public.associate_members
  FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'submissions'));
CREATE POLICY "Submission managers can update memberships" ON public.associate_members
  FOR UPDATE TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));
CREATE POLICY "Submission managers can delete memberships" ON public.associate_members
  FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'submissions'));

-- user_roles: only team admins can manage other admins (replaces broad admin policies)
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Team admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'team'));
CREATE POLICY "Team admins can insert roles" ON public.user_roles
  FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'team'));
CREATE POLICY "Team admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'team'));

-- Function to list admin users with email (for AdminTeam UI)
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE(user_id uuid, email text, created_at timestamptz, permissions public.admin_permission[])
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'team') THEN
    RAISE EXCEPTION 'access denied';
  END IF;

  RETURN QUERY
  SELECT
    ur.user_id,
    u.email::text,
    u.created_at,
    COALESCE(ARRAY_AGG(ap.permission) FILTER (WHERE ap.permission IS NOT NULL), '{}'::public.admin_permission[])
  FROM public.user_roles ur
  JOIN auth.users u ON u.id = ur.user_id
  LEFT JOIN public.admin_permissions ap ON ap.user_id = ur.user_id
  WHERE ur.role = 'admin'
  GROUP BY ur.user_id, u.email, u.created_at
  ORDER BY u.created_at;
END;
$$;
