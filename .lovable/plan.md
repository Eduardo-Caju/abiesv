

## Correções de Segurança

Existem 5 problemas identificados, organizados por prioridade.

---

### 1. [CRITICO] Dados de contato expostos publicamente

**Problema**: Qualquer pessoa na internet pode ver e-mails, telefones e nomes dos contatos dos associados aprovados. Isso permite que concorrentes ou spammers coletem esses dados.

**Solução**: Remover a política pública de leitura dos contatos. Apenas administradores poderão ver os dados completos. No site público, exibir apenas informações já públicas do associado (website, LinkedIn, Instagram) — sem e-mails ou telefones pessoais.

**Alterações**:
- Migration SQL: remover a policy "Public can view contacts of approved submissions"
- Atualizar `useApprovedAssociates.ts` para não buscar contatos (já que não terá permissão)
- Atualizar `AssociadoPerfil.tsx` para exibir apenas website/LinkedIn/Instagram como formas de contato público

---

### 2. [MEDIO] Console.error vazando informações em produção

**Problema**: Erros completos são logados no console do navegador mesmo em produção, podendo revelar estrutura do banco ou detalhes internos.

**Solução**: Envolver os `console.error` em verificação de ambiente.

**Arquivos afetados**:
- `src/pages/CadastroAssociado.tsx` — envolver em `if (import.meta.env.DEV)`
- `src/pages/NotFound.tsx` — mesma correção

---

### 3. [MEDIO] Políticas RLS permissivas (WITH CHECK true)

**Problema**: As tabelas `associate_submissions` e `associate_submission_contacts` permitem INSERT com `WITH CHECK (true)`, ou seja, qualquer pessoa pode inserir dados. Isso é intencional (formulário público), mas precisa ser documentado/confirmado.

**Solução**: Isso é esperado para o formulário de cadastro público. Vou marcar como aceito no scan de segurança com justificativa.

---

### 4. [MEDIO] Proteção contra senhas vazadas desativada

**Problema**: A verificação de senhas comprometidas (leaked password protection) está desativada no sistema de autenticação.

**Solução**: Ativar via configuração de autenticação para que senhas conhecidamente vazadas sejam rejeitadas no cadastro/login.

---

### 5. [MEDIO] Tabela user_roles sem políticas explícitas de escrita

**Problema**: A tabela `user_roles` não tem políticas de INSERT/UPDATE/DELETE. Embora o comportamento padrão (negar tudo) proteja, é frágil.

**Solução**: Criar políticas explícitas para que apenas admins possam gerenciar roles via migration SQL.

---

### Resumo das alterações

| Tipo | Arquivo/Recurso | Ação |
|---|---|---|
| Migration SQL | RLS policies | Remover policy pública de contatos; adicionar policies de escrita em user_roles |
| Código | useApprovedAssociates.ts | Remover busca de contatos |
| Código | AssociadoPerfil.tsx | Mostrar apenas links públicos como contato |
| Código | CadastroAssociado.tsx | Proteger console.error com DEV check |
| Código | NotFound.tsx | Proteger console.error com DEV check |
| Config | Auth settings | Ativar leaked password protection |
| Scan | Findings | Marcar INSERT policy pública como aceita |

