import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") ?? "";

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) return true;
  try {
    const u = new URL(origin);
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") return true;
    if (u.hostname.endsWith(".lovable.app")) return true;
    if (u.hostname.endsWith(".lovableproject.com")) return true;
    if (u.hostname.endsWith(".lovable.dev")) return true;
  } catch (_) {}
  return false;
}

function corsHeaders(origin: string | null) {
  const allowed = isAllowedOrigin(origin) ? origin! : (ALLOWED_ORIGIN || "*");
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

const VALID = new Set(["news", "submissions", "benefits", "team"]);

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(origin) });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Não autorizado" }, 401);

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) return json({ error: "Token inválido" }, 401);

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: teamPerm } = await supabaseAdmin
      .from("admin_permissions")
      .select("permission")
      .eq("user_id", user.id)
      .eq("permission", "team");
    if (!teamPerm || teamPerm.length === 0) return json({ error: "Acesso negado." }, 403);

    const body = await req.json();
    const action: string = body?.action;
    const targetUserId: string = body?.user_id;
    if (!targetUserId) return json({ error: "user_id obrigatório" }, 400);

    if (action === "update") {
      const permissions: string[] = Array.isArray(body?.permissions) ? body.permissions : [];
      const cleanPerms = permissions.filter((p) => VALID.has(p));
      if (cleanPerms.length === 0) return json({ error: "Selecione pelo menos uma permissão." }, 400);

      // Prevent removing your own team permission to avoid lockout
      if (targetUserId === user.id && !cleanPerms.includes("team")) {
        return json({ error: "Você não pode remover sua própria permissão de equipe." }, 400);
      }

      // Replace permissions
      await supabaseAdmin.from("admin_permissions").delete().eq("user_id", targetUserId);
      const rows = cleanPerms.map((p) => ({ user_id: targetUserId, permission: p }));
      const { error } = await supabaseAdmin.from("admin_permissions").insert(rows);
      if (error) return json({ error: "Erro ao atualizar permissões." }, 500);
      return json({ success: true });
    }

    if (action === "revoke") {
      if (targetUserId === user.id) return json({ error: "Você não pode revogar seu próprio acesso." }, 400);
      await supabaseAdmin.from("admin_permissions").delete().eq("user_id", targetUserId);
      await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId).eq("role", "admin");
      return json({ success: true });
    }

    return json({ error: "Ação inválida" }, 400);
  } catch (err) {
    console.error("update-admin-permissions error:", err);
    return json({ error: "Erro interno." }, 500);
  }
});
