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

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(origin) });
  }

  try {
    // Verify caller is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const callerId = user.id;

    // Check team permission via service role (bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: teamPerm } = await supabaseAdmin
      .from("admin_permissions")
      .select("permission")
      .eq("user_id", callerId)
      .eq("permission", "team");

    if (!teamPerm || teamPerm.length === 0) {
      return new Response(JSON.stringify({ error: "Acesso negado. Apenas admins de equipe podem convidar." }), {
        status: 403,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // Get email + permissions from body
    const body = await req.json();
    const email: string | undefined = body?.email;
    const permissions: string[] = Array.isArray(body?.permissions) ? body.permissions : [];
    const VALID = new Set(["news", "submissions", "benefits", "team"]);
    const cleanPerms = permissions.filter(p => VALID.has(p));

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "E-mail é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }
    if (cleanPerms.length === 0) {
      return new Response(JSON.stringify({ error: "Selecione pelo menos uma permissão." }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    let userId: string | null = null;
    let reactivated = false;

    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    if (inviteError) {
      const code = (inviteError as any).code;
      const status = (inviteError as any).status;
      const msg = inviteError.message || "";
      const alreadyExists =
        code === "email_exists" ||
        status === 422 ||
        /already been registered|already exists/i.test(msg);

      if (!alreadyExists) {
        return new Response(JSON.stringify({ error: inviteError.message }), {
          status: 400,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
        });
      }

      // Find existing user
      let page = 1;
      while (page <= 10 && !userId) {
        const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
        if (listErr) break;
        const found = list.users.find(u => (u.email || "").toLowerCase() === email.toLowerCase());
        if (found) userId = found.id;
        if (list.users.length < 200) break;
        page++;
      }

      if (!userId) {
        return new Response(JSON.stringify({ error: "E-mail já registrado, mas não foi possível localizar o usuário." }), {
          status: 500,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
        });
      }

      // Send recovery link so the user can (re)set password
      const { error: linkErr } = await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email,
      });
      if (linkErr) {
        console.error("invite-admin recovery link error:", linkErr);
      }
      reactivated = true;
    } else {
      userId = inviteData.user.id;
    }
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    if (roleError) {
      console.error("invite-admin role assignment error:", roleError);
      return new Response(JSON.stringify({ error: "Usuário convidado, mas houve um erro ao atribuir permissões. Contate o suporte." }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const permRows = cleanPerms.map(p => ({ user_id: userId, permission: p }));
    const { error: permError } = await supabaseAdmin
      .from("admin_permissions")
      .upsert(permRows, { onConflict: "user_id,permission" });

    if (permError) {
      console.error("invite-admin permission insert error:", permError);
    }

    return new Response(JSON.stringify({ success: true, email }), {
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("invite-admin error:", err);
    return new Response(JSON.stringify({ error: "Erro interno ao processar convite." }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
