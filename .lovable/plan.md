## Problema

O erro "Failed to send a request to the Edge Function" ao convidar admin acontece porque a função `invite-admin` (e as outras) só aceita requisições da origem definida em `ALLOWED_ORIGIN`. Quando o painel é acessado de outra origem (preview do Lovable, domínio diferente, etc.), o navegador bloqueia o preflight CORS antes mesmo da requisição chegar à função — daí o "Failed to send".

A função `update-admin-permissions` que acabei de criar tem o mesmo problema.

## Correção

Permitir múltiplas origens conhecidas nas Edge Functions, refletindo a `Origin` da requisição quando ela bater em uma allowlist:

- Aceitar qualquer subdomínio `*.lovable.app` e `*.lovableproject.com` (preview/published do Lovable)
- Aceitar a origem definida em `ALLOWED_ORIGIN` (domínio customizado / produção), se houver
- Aceitar `localhost` para desenvolvimento

Aplicar a mesma helper de CORS em:
- `supabase/functions/invite-admin/index.ts`
- `supabase/functions/update-admin-permissions/index.ts`
- `supabase/functions/invite-associate/index.ts`
- `supabase/functions/upload-logo/index.ts`

Adicionar também o header `Access-Control-Allow-Methods: POST, OPTIONS` e `Access-Control-Max-Age` para reduzir preflights.

## Fora de escopo

- Não mexer no `shorten-url` (não usa essa restrição).
- Sem mudanças no banco ou no frontend.
