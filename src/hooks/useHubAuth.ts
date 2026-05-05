import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export type HubUser = {
  userId: string;
  email: string;
  isAdmin: boolean;
  isAssociate: boolean;
  submissionId?: string;
  companyName?: string;
};

/**
 * Hook de autenticação do Hub do Associado.
 * Permite acesso a admins OU associados aprovados.
 * Redireciona para /hub/login se não autenticado/sem permissão.
 */
export function useHubAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<HubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        if (mounted) navigate("/hub/login");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authUser.id);

      const isAdmin = !!roles?.some(r => r.role === "admin");
      const isAssociate = !!roles?.some(r => r.role === "associado");

      if (!isAdmin && !isAssociate) {
        await supabase.auth.signOut();
        if (mounted) navigate("/hub/login");
        return;
      }

      // Look up submission link
      let submissionId: string | undefined;
      let companyName: string | undefined;
      const { data: member } = await supabase
        .from("associate_members")
        .select("submission_id, associate_submissions(nome_fantasia)")
        .eq("user_id", authUser.id)
        .maybeSingle();
      if (member) {
        submissionId = (member as any).submission_id;
        companyName = (member as any).associate_submissions?.nome_fantasia;
      }

      if (mounted) {
        setUser({
          userId: authUser.id,
          email: authUser.email ?? "",
          isAdmin,
          isAssociate,
          submissionId,
          companyName,
        });
        setLoading(false);
      }
    };
    check();
    return () => { mounted = false; };
  }, [navigate]);

  return { user, loading };
}
