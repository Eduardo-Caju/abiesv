## Cadastro manual de associados pelo admin

Adicionar fluxo no `/admin` para cadastrar associados manualmente, sem passar pelo formulário público.

### O que será criado

**1. Botão "+ Novo cadastro"** no topo do `/admin` (AdminDashboard), ao lado do filtro de status. Visível apenas para quem tem permissão `submissions`.

**2. Nova página `/admin/cadastros/novo`** (AdminSubmissionNew.tsx) com formulário enxuto:

Campos obrigatórios:
- Razão Social
- Nome Fantasia
- CNPJ (sem máscara estrita — aceita formatos variados)
- Categoria (mesmo select do formulário público)
- Descrição curta (até 200 caracteres)
- Estado / Cidade

Campos opcionais:
- Descrição completa
- Website, LinkedIn, Instagram
- Soluções e Setores (multi-select)
- Logo (upload PNG, opcional — se não enviar, fica sem logo)
- Contato principal (nome, email, cargo, celular) — opcional

Status: dropdown com **"Aprovado"** pré-selecionado (admin pode escolher pendente/rejeitado também).

**3. Comportamento:**
- Insere direto em `associate_submissions` com o status escolhido.
- Se status = aprovado, aparece imediatamente em `/associados`.
- Logo é opcional (diferente do formulário público).
- Reaproveita a edge function `upload-logo` existente.
- Após salvar, redireciona para `/admin/cadastros/:id` (página de detalhe já existente).

### Fora de escopo

- Importação em lote via CSV (continua manual, um a um).
- Edição inline no dashboard (já existe via página de detalhe).

### Detalhes técnicos

- Nova rota em `App.tsx`: `/admin/cadastros/novo` → `AdminSubmissionNew`.
- Reusa componentes do `CadastroAssociado.tsx` (selects de categoria/estado/setores) extraindo opções para um arquivo compartilhado se necessário, ou duplicando inline.
- Validação com zod, igual ao formulário público mas com logo opcional.
- Insert em `associate_submissions` + opcionalmente `associate_submission_contacts` se preencher contato.
- Proteção: `useAdminAuth("submissions")` redireciona se não tiver permissão.
