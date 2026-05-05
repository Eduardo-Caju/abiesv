## Corrigir convite quando o e-mail já existe em auth.users

### Causa do erro

O endpoint `auth.admin.inviteUserByEmail` retorna **422 "A user with this email address has already been registered"** quando o e-mail já existe em `auth.users`. Hoje, ao deletar um admin pela tela `/admin/equipe`, a função `update-admin-permissions` (action `revoke`) remove apenas `admin_permissions` e `user_roles` — **não remove o registro em `auth.users`**. Resultado: ao tentar reconvidar o mesmo e-mail, o invite falha.

### Solução

Ajustar a edge function `invite-admin` para tratar o caso "usuário já existe" como um fluxo válido:

1. Tentar `inviteUserByEmail(email)` normalmente.
2. Se vier erro com código `email_exists` (ou status 422 / mensagem "already been registered"):
   - Buscar o usuário existente via `supabaseAdmin.auth.admin.listUsers()` filtrando pelo e-mail (ou via query em `auth.users`).
   - Reaplicar `user_roles` (admin) e as permissões selecionadas (`admin_permissions`) com `upsert`.
   - Disparar `auth.admin.generateLink({ type: 'recovery', email })` para enviar um link de redefinição de senha — assim a pessoa recebe um e-mail e consegue acessar mesmo sem o invite original.
   - Retornar `{ success: true, email, reactivated: true }`.
3. Se o erro for outro, manter o comportamento atual (retornar mensagem de erro).

### Detalhes técnicos

- Arquivo: `supabase/functions/invite-admin/index.ts`.
- Detectar e-mail existente: checar `inviteError.code === 'email_exists'` ou `inviteError.status === 422`.
- Buscar user_id: `supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 })` e filtrar por `email`. (Lista pequena no projeto — aceitável.)
- Mensagem de toast no front (`AdminTeam.tsx`): se `data.reactivated`, mostrar "Permissões reatribuídas. Enviado link de acesso para {email}." em vez de "Convite enviado".

### Fora de escopo

- Remover de fato o usuário de `auth.users` ao revogar acesso (mudaria o comportamento de revogação — pode deixar para depois se você quiser).
- Mudanças visuais em `/admin/equipe` além da mensagem do toast.
