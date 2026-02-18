

## Formulario de Cadastro com Fluxo de Aprovacao

A preocupacao e valida. O plano agora inclui um sistema de moderacao: os dados enviados pelo formulario ficam com status "pendente" ate que um administrador aprove a publicacao.

---

### Como vai funcionar

1. **Associado** acessa `/associados/cadastro` e preenche o formulario
2. Os dados sao salvos no banco com status **"pendente"**
3. O associado ve uma mensagem: "Cadastro enviado com sucesso! Seus dados serao analisados pela equipe ABIESV antes da publicacao."
4. **Administrador** acessa `/admin` (pagina protegida com login), ve a lista de cadastros pendentes
5. O admin pode **aprovar**, **rejeitar** ou **editar** cada cadastro
6. Somente cadastros aprovados aparecem no Guia de Associados

---

### O que sera criado

**1. Autenticacao e controle de acesso**
- Sistema de login para administradores (email + senha)
- Tabela `user_roles` para definir quem e admin
- Pagina `/admin` protegida -- so acessivel por usuarios com role "admin"
- Criar seu usuario admin manualmente no banco

**2. Banco de dados**
- Tabela `associate_submissions` com coluna `status` (pendente / aprovado / rejeitado)
- Tabela `associate_submission_contacts` para os contatos
- Bucket `associate-logos` para upload de logotipos
- RLS: qualquer pessoa pode inserir (formulario publico), mas somente admins podem visualizar, editar status e aprovar

**3. Pagina do formulario publico** (`/associados/cadastro`)
- Formulario com todos os campos definidos na especificacao
- Validacao completa (Zod + react-hook-form)
- Upload de logo com preview
- Mensagem de confirmacao apos envio
- Sem necessidade de login para preencher

**4. Painel administrativo** (`/admin`)
- Login com email e senha
- Lista de cadastros pendentes com filtros por status
- Visualizacao detalhada de cada cadastro
- Botoes de Aprovar / Rejeitar com campo de observacao
- Edicao dos dados antes de aprovar (para correcoes)

**5. Integracao com o Guia**
- Migrar o Guia de Associados (`/associados`) para ler do banco de dados
- Exibir somente cadastros com status "aprovado"
- Manter os dados atuais do arquivo `associates.ts` como base inicial (migrar para o banco)

---

### Fluxo visual

```text
Associado preenche          Banco de dados           Admin aprova
o formulario         --->   status: pendente   --->  status: aprovado
/associados/cadastro                                 /admin
                                                         |
                                                         v
                                                  Aparece no Guia
                                                  /associados
```

---

### Detalhes tecnicos

**Tabela `associate_submissions`**
- Campos: razao_social, nome_fantasia, cnpj, categoria, descricao_curta (200), descricao_completa (800), estado, cidade, website, linkedin, instagram, solucoes (array), setores (array), logo_url, status (enum: pendente/aprovado/rejeitado), observacao_admin, created_at, updated_at
- RLS: INSERT publico (anon), SELECT/UPDATE somente para admins via funcao `has_role()`

**Tabela `associate_submission_contacts`**
- Campos: submission_id (FK), nome, cargo, telefone_fixo, celular, email
- RLS: INSERT publico (anon), SELECT/UPDATE somente para admins

**Autenticacao**
- Tabela `user_roles` com enum `app_role` (admin, user)
- Funcao `has_role()` security definer para verificar permissoes sem recursao
- Pagina de login em `/admin/login`
- Seu usuario sera criado e definido como admin

**Bucket `associate-logos`**
- Upload publico (para o formulario funcionar sem login)
- Leitura publica (para exibir no Guia)
- Limite de 2MB, apenas PNG e SVG

**Arquivos novos**
- `src/pages/CadastroAssociado.tsx` -- formulario publico
- `src/pages/admin/AdminLogin.tsx` -- login do admin
- `src/pages/admin/AdminDashboard.tsx` -- painel com lista de cadastros
- `src/pages/admin/AdminSubmissionDetail.tsx` -- detalhe e aprovacao
- Rotas novas no `App.tsx`

