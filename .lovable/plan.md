## Objetivo

Permitir que admins editem qualquer dado de um cadastro de associado (pendente, aprovado ou rejeitado) sem precisar rejeitar e refazer.

## Mudanças

### 1. Tela de detalhe do cadastro (`/admin/cadastros/:id`)

Transformar em tela **visualizar + editar**:

- Adicionar botão **"Editar"** no topo (ao lado de Voltar).
- Ao clicar, todos os campos viram editáveis em modo de formulário:
  - Dados da empresa: razão social, nome fantasia, CNPJ, categoria, cidade, estado, website, LinkedIn, Instagram
  - Descrições: curta e completa
  - Soluções e setores (multi-select / chips)
  - Logo (upload novo, substitui o atual via bucket `associate-logos`)
  - Contatos (adicionar/editar/remover linhas — nome, cargo, e-mail, celular, telefone fixo)
- Botões **"Salvar alterações"** e **"Cancelar"** durante a edição.
- Fora do modo edição, mantém o layout atual de leitura + ações Aprovar/Rejeitar.

### 2. Novo cadastro pelo admin (`/admin/cadastros/novo`)

Reaproveitar o mesmo formulário (componente compartilhado), garantindo consistência entre criar e editar.

### 3. Comportamento e UX

- Edição funciona em qualquer status (pendente, aprovado, rejeitado).
- Editar um cadastro **aprovado** atualiza imediatamente o que aparece no site público (ex.: página de Associados), pois usa a mesma tabela.
- Validações iguais às do formulário público (CNPJ, e-mail, campos obrigatórios).
- Toast de confirmação ao salvar; tratamento de erro com `sanitizeDbError`.
- Permissão: só admins com `submissions` podem editar (já coberto pelas RLS existentes via `has_permission`).

## Detalhes técnicos

- **Sem mudança de schema** — as tabelas `associate_submissions` e `associate_submission_contacts` já têm policies de UPDATE/INSERT/DELETE para quem tem `submissions`.
- Extrair o formulário de `CadastroAssociado.tsx` para um componente reutilizável (`AssociateForm`) consumido por:
  - `CadastroAssociado.tsx` (público)
  - `AdminSubmissionNew.tsx` (admin cria)
  - `AdminSubmissionDetail.tsx` (admin edita, modo "edit")
- Contatos: comparar lista original vs. nova → INSERT novos, UPDATE alterados, DELETE removidos.
- Cache: invalidar `useApprovedAssociates` (React Query) após salvar para refletir no site público.

## Arquivos afetados

- `src/components/admin/AssociateForm.tsx` (novo, extraído)
- `src/pages/admin/AdminSubmissionDetail.tsx` (adicionar modo edição)
- `src/pages/admin/AdminSubmissionNew.tsx` (passa a usar o form compartilhado)
- `src/pages/CadastroAssociado.tsx` (passa a usar o form compartilhado)

## Fora do escopo

- Histórico/auditoria de alterações.
- Notificar associado por e-mail quando admin editar dados dele.
