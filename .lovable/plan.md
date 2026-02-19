

## Corrigir erro de RLS no cadastro de associados

### Problema

As politicas de INSERT nas tabelas `associate_submissions` e `associate_submission_contacts` estao criadas como **RESTRICTIVE** (Permissive: No). Politicas restritivas exigem que TODAS passem simultaneamente, mas como nao ha nenhuma politica permissiva de INSERT, o Postgres bloqueia a insercao automaticamente.

### Solucao

Recriar as politicas de INSERT como **PERMISSIVE** em ambas as tabelas:

1. **`associate_submissions`**: Dropar a politica restritiva "Anyone can insert submissions" e recriar como permissiva
2. **`associate_submission_contacts`**: Dropar a politica restritiva "Anyone can insert contacts" e recriar como permissiva

### Detalhes tecnicos

Uma unica migracao SQL com os seguintes comandos:

```sql
-- Fix associate_submissions INSERT policy
DROP POLICY "Anyone can insert submissions" ON public.associate_submissions;
CREATE POLICY "Anyone can insert submissions"
  ON public.associate_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Fix associate_submission_contacts INSERT policy
DROP POLICY "Anyone can insert contacts" ON public.associate_submission_contacts;
CREATE POLICY "Anyone can insert contacts"
  ON public.associate_submission_contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

Nenhuma alteracao de codigo necessaria — apenas correcao no banco de dados.

