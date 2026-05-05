## Objetivo

Substituir o modelo atual ("admin = tudo ou nada") por **permissões granulares por módulo**, permitindo convidar pessoas com acesso restrito a áreas específicas do painel administrativo (ex.: alguém só para publicar notícias).

## Módulos de permissão

Cada admin terá um conjunto marcável das seguintes permissões:

| Permissão | O que libera |
|---|---|
| `news` | `/admin/noticias` + `/admin/social-cards` |
| `submissions` | `/admin` (lista de cadastros) + detalhe + aprovar/rejeitar |
| `benefits` | `/admin/beneficios` |
| `team` | `/admin/equipe` (convidar/remover admins e editar permissões) — **super-admin** |

Regras:
- Quem tem `team` é considerado **super-admin** (pode tudo, inclusive gerenciar outros admins).
- Seu usuário atual recebe automaticamente todas as permissões na migração.
- Todo admin (qualquer permissão) continua tendo acesso total ao **Hub do Associado**.
- O role `admin` na tabela `user_roles` continua existindo como "marcador" de acesso ao painel; as permissões finas ficam em uma nova tabela.

## Mudanças no banco

Nova tabela `admin_permissions`:
- `user_id` (uuid)
- `permission` (enum: `news`, `submissions`, `benefits`, `team`)
- unique(user_id, permission)

Nova função `has_permission(_user_id, _permission)` security definer.

RLS:
- `admin_permissions`: select próprio + tudo para quem tem `team`; insert/update/delete só para `team`.
- Políticas existentes em `news_articles`, `member_benefits`, `associate_submissions`, `associate_submission_contacts`, `associate_members` passam a exigir a permissão correspondente em vez de apenas `has_role(admin)`.

Seed: inserir todas as 4 permissões para o seu `user_id` atual.

## Mudanças no backend (Edge Functions)

- `invite-admin`: aceitar `permissions: string[]` no body. Continua exigindo que o chamador tenha `team`. Após criar o usuário, insere as permissões selecionadas em `admin_permissions` (e mantém o role `admin` para liberar entrada no painel).
- Nova função `update-admin-permissions`: permite ao super-admin alterar permissões de um admin existente ou revogar acesso.

## Mudanças no frontend

- `useAdminAuth`: além de checar role admin, busca `admin_permissions` do usuário e expõe `permissions: string[]` + helper `can(permission)`.
- Cada página admin (`AdminNews`, `AdminBenefits`, `AdminDashboard`, `AdminSocialCards`, `AdminSubmissionDetail`, `AdminTeam`) verifica a permissão correspondente — se não tiver, redireciona para a primeira página permitida ou mostra "Sem acesso".
- Sidebar/header do admin: esconde links dos módulos sem permissão.
- `AdminTeam` (só visível para `team`):
  - Form de convite com **checkboxes** dos módulos.
  - Tabela de admins atuais mostrando email, permissões (badges) e ações: **Editar permissões** (modal com checkboxes) e **Revogar acesso** (remove role + permissões).
  - Para mostrar email dos admins, criar função `get_admin_users()` security definer que retorna `user_id, email, created_at` (lê de `auth.users`), restrita a quem tem `team`.

## Detalhes técnicos

- Enum novo: `admin_permission` com valores `news`, `submissions`, `benefits`, `team`.
- `has_permission` segue mesmo padrão de `has_role` (stable, security definer, search_path public).
- Migração também atualiza políticas RLS existentes de forma idempotente (DROP POLICY IF EXISTS + CREATE).
- A política do Hub (`is_associate` / role `admin`) **não muda** — qualquer admin entra no Hub.

## Fora de escopo

- Não cria um terceiro role separado (ex.: `editor`); usamos `admin` + permissões finas para minimizar mudanças.
- Não muda fluxo de associados.
