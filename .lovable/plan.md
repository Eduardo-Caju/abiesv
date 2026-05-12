## Alterações

### 1. `src/pages/Privacidade.tsx`
- Remover o prefixo `[PLACEHOLDER]` no início dos parágrafos das seções 1, 2, 3 e 4 (mantendo o restante do texto).
- Substituir `[PLACEHOLDER DATA]` da "Última atualização" por uma data atual (12/05/2026).
- Corrigir o e-mail da seção "5. Contato": trocar `privacidade@abiesv.org.br` por `secretaria@abiesv.org.br` (no texto e no `href`).

### 2. `src/components/layout/Footer.tsx`
- Verificar e ajustar o e-mail do rodapé. Atualmente já consta `secretaria@abiesv.com.br`, mas o usuário quer `secretaria@abiesv.org.br` — atualizar o texto exibido e o `href="mailto:..."` para `secretaria@abiesv.org.br`.

### 3. Observação
- Em `src/pages/Contato.tsx` o e-mail também aparece como `secretaria@abiesv.com.br`. Posso atualizar junto para manter consistência, se desejar — confirme se devo incluir.

Nenhuma outra mudança de layout, estilo ou conteúdo.