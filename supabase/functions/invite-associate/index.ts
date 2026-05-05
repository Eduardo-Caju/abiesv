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

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Acesso negado." }), {
        status: 403,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { submission_id, emails } = body as { submission_id?: string; emails?: string[] };

    if (!submission_id || !Array.isArray(emails) || emails.length === 0) {
      return new Response(JSON.stringify({ error: "submission_id e emails obrigatórios" }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // Validate submission exists & is approved
    const { data: sub } = await supabaseAdmin
      .from("associate_submissions")
      .select("id, status, nome_fantasia")
      .eq("id", submission_id)
      .single();

    if (!sub || sub.status !== "aprovado") {
      return new Response(JSON.stringify({ error: "Associado não está aprovado." }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const results: Array<{ email: string; status: string; error?: string }> = [];

    for (const rawEmail of emails) {
      const email = String(rawEmail).trim().toLowerCase();
      if (!email || !email.includes("@")) {
        results.push({ email, status: "invalid" });
        continue;
      }

      try {
        const redirectTo = `${ALLOWED_ORIGIN}/hub`;
        const { data: inviteData, error: inviteError } =
          await supabaseAdmin.auth.admin.inviteUserByEmail(email, { redirectTo });

        let userId: string | undefined = inviteData?.user?.id;

        if (inviteError) {
          // If user already exists, find and reuse
          if (inviteError.message?.toLowerCase().includes("already") || inviteError.status === 422) {
            const { data: list } = await supabaseAdmin.auth.admin.listUsers();
            const existing = list?.users?.find((u: any) => u.email === email);
            if (existing) {
              userId = existing.id;
            } else {
              results.push({ email, status: "error", error: inviteError.message });
              continue;
            }
          } else {
            results.push({ email, status: "error", error: inviteError.message });
            continue;
          }
        }

        if (!userId) {
          results.push({ email, status: "error", error: "ID do usuário ausente" });
          continue;
        }

        // Assign 'associado' role
        await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "associado" }, { onConflict: "user_id,role" });

        // Link to submission
        await supabaseAdmin
          .from("associate_members")
          .upsert({ user_id: userId, submission_id }, { onConflict: "user_id" });

        results.push({ email, status: "ok" });
      } catch (e: any) {
        results.push({ email, status: "error", error: e?.message ?? "erro" });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("invite-associate error:", err);
    return new Response(JSON.stringify({ error: "Erro interno." }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
