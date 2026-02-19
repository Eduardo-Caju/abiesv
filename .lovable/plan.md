

## Corrigir erro de RLS no cadastro de associados

### Problema

As politicas de INSERT ja foram corrigidas (estao PERMISSIVE), porem o erro persiste porque o codigo faz `.select("id").single()` apos o INSERT para obter o ID da submissao recem-criada. As politicas de SELECT so permitem:
- **Admins** veem tudo
- **Publico** ve apenas submissoes com status `aprovado`

Como a nova submissao tem status `pendente`, o SELECT falha com erro de RLS.

### Solucao

Duas alteracoes necessarias:

**1. Banco de dados** -- Adicionar politica SELECT que permite o chamador ver a linha recem-inserida durante a mesma transacao. A forma mais simples e criar uma politica permissiva para INSERT com RETURNING:

```sql
CREATE POLICY "Submitter can read own insert"
  ON public.associate_submissions
  FOR SELECT
  TO anon, authenticated
  USING (false);
```

Na verdade, a abordagem mais limpa e **remover o `.select("id")` do codigo** e nao depender de SELECT apos INSERT.

**2. Codigo (CadastroAssociado.tsx)** -- Gerar o UUID no frontend antes do INSERT, eliminando a necessidade do `.select("id").single()`:

- Gerar `const submissionId = crypto.randomUUID()` antes do INSERT
- Incluir `id: submissionId` no objeto de INSERT para `associate_submissions`
- Remover `.select("id").single()` do INSERT
- Usar `submissionId` diretamente para inserir os contatos

### Detalhes tecnicos

No arquivo `src/pages/CadastroAssociado.tsx`, a funcao `onSubmit` sera alterada de:

```typescript
const { data: submission, error: subError } = await supabase
  .from("associate_submissions")
  .insert({ ... })
  .select("id")
  .single();
if (subError) throw subError;
// usa submission.id para contatos
```

Para:

```typescript
const submissionId = crypto.randomUUID();
const { error: subError } = await supabase
  .from("associate_submissions")
  .insert({ id: submissionId, ... });
if (subError) throw subError;
// usa submissionId diretamente para contatos
```

Nenhuma alteracao de banco de dados necessaria -- apenas alteracao de codigo.

