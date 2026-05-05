import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export type AdminPermission = "news" | "submissions" | "benefits" | "team";

export type AdminAuthState = {
  loading: boolean;
  userId: string | null;
  permissions: AdminPermission[];
  can: (p: AdminPermission) => boolean;
};

/**
 * Verifies the user is an admin and (optionally) has a specific permission.
 * Redirects to /admin/login when not authenticated/admin.
 * Redirects to /admin (or first allowed page) when missing required permission.
 */
export function useAdminAuth(requiredPermission?: AdminPermission): AdminAuthState {
  const navigate = useNavigate();
  const [state, setState] = useState<AdminAuthState>({
    loading: true,
    userId: null,
    permissions: [],
    can: () => false,
  });

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      const { data: perms } = await supabase
        .from("admin_permissions")
        .select("permission")
        .eq("user_id", user.id);
      const permissions = (perms ?? []).map(p => p.permission as AdminPermission);

      if (requiredPermission && !permissions.includes(requiredPermission)) {
        // Redirect to first page they can access
        const fallback =
          permissions.includes("submissions") ? "/admin" :
          permissions.includes("news") ? "/admin/noticias" :
          permissions.includes("benefits") ? "/admin/beneficios" :
          permissions.includes("team") ? "/admin/equipe" :
          "/admin/login";
        if (fallback === "/admin/login") await supabase.auth.signOut();
        navigate(fallback);
        return;
      }

      if (mounted) {
        setState({
          loading: false,
          userId: user.id,
          permissions,
          can: (p) => permissions.includes(p),
        });
      }
    };
    run();
    return () => { mounted = false; };
  }, [navigate, requiredPermission]);

  return state;
}
