## Corrigir Encurtador de link

### Problema
A chamada `fetch("https://is.gd/create.php?...")` direto do navegador falha com "Failed to fetch" porque o is.gd não envia headers CORS. Solução: fazer a requisição a partir de uma edge function (servidor) e devolver o resultado para o cliente.

### Mudanças

1. **Nova edge function `supabase/functions/shorten-url/index.ts`**
   - Recebe `{ url }` via POST.
   - Valida que é URL http/https com Zod.
   - Chama `https://is.gd/create.php?format=json&url=...` no servidor.
   - Retorna `{ short }` ou `{ error }` com CORS habilitado.
   - Sem `verify_jwt` específico (usa o padrão).

2. **Atualizar `src/components/hub/tools/LinkShortener.tsx`**
   - Trocar o `fetch` direto por `supabase.functions.invoke("shorten-url", { body: { url } })`.
   - Tratar erro vindo do servidor com toast.

Sem mudanças de schema, secrets ou outras ferramentas.
