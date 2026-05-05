## Hub ABIESV — Área restrita do Associado

Criar uma seção autenticada onde representantes de associados aprovados acessam **ferramentas úteis** (portadas do projeto "Viver de IA Tools") e um **catálogo de benefícios/parcerias**.

---

### 1. Autenticação e controle de acesso

- Adicionar role nova `associado` ao enum `app_role` (já existem `admin` e `user`).
- Criar tabela `associate_members`: vincula um `auth.users.id` a um `associate_submissions.id` (associado aprovado).
- Fluxo automático: quando admin aprova uma submissão, sistema dispara convite por email (Supabase Auth invite) para os contatos cadastrados em `associate_submission_contacts`. O convidado define senha e cai logado no Hub.
- Reuso da Edge Function `invite-admin` como base, criando `invite-associate`.
- Login dedicado em `/hub/login` (separado do `/admin/login`).
- `ProtectedRoute` checa role `associado` OU `admin` para acessar `/hub/*`.

### 2. Layout do Hub

- Rota base `/hub` com sidebar shadcn (collapsible icon) e header próprio.
- Itens do menu:
  - Dashboard (boas-vindas, atalhos, últimos benefícios)
  - Ferramentas (subitens por ferramenta)
  - Benefícios & Parcerias
  - Meu perfil / Minha empresa
  - Sair
- Mantém identidade visual ABIESV (Montserrat, paleta roxa, tokens semânticos do `index.css`).

### 3. Ferramentas (portadas do outro projeto)

Migrar **todas** as ferramentas, adaptando branding:
- Compressor de imagem
- Conversor de imagem
- Compressor de PDF
- Gerador de QR Code
- Encurtador de link (com analytics)
- Gerador de paleta de cores
- Removedor de fundo
- Extrator de texto (OCR)
- UTM Builder

Cada ferramenta vira uma rota `/hub/ferramentas/<slug>`. Componentes copiados de `src/components/{image,pdf,qr,link,palette,ocr}` e páginas correspondentes. Edge Functions necessárias copiadas: `compress-pdf`, `create-short-link`, `extract-text`, `link-analytics`, `remove-background`, `save-compression-history`, `cleanup-temp-files`, `r` (redirect curto).

Histórico de uso por associado (ex: links encurtados, compressões) fica salvo no banco com RLS por `user_id`.

### 4. Benefícios & Parcerias

- Tabela `member_benefits`: título, descrição, parceiro (nome + logo), categoria, tipo (desconto %, condição especial, brinde, etc), código promocional / link, validade, destaque, ativo.
- Admin gerencia em `/admin/beneficios` (CRUD) — reaproveita padrão de `AdminNews`.
- Associado vê em `/hub/beneficios` com filtros por categoria, busca e cards visuais. Códigos promocionais revelados sob clique ("Ver código").
- Opcional: contagem de "uso" (clique em "Aproveitar"), só para métrica.

### 5. Integração com o site público

- Header público ganha botão discreto "Hub do Associado" → `/hub/login`.
- Página `/associe-se` lista as ferramentas e exemplos de benefícios como gancho de conversão.
- Footer ganha link para o Hub.

### 6. Segurança

- RLS em todas as novas tabelas: associado só lê/escreve o que é seu via função `is_member_of(submission_id)`; admins veem tudo via `has_role`.
- Benefícios públicos para usuários com role `associado` ou `admin`.
- Validação de input com zod nas Edge Functions.
- HIBP já está ativo para senhas.

---

### Detalhes técnicos

**Migrations necessárias:**
1. `ALTER TYPE app_role ADD VALUE 'associado'`
2. Tabela `associate_members (id, user_id, submission_id, created_at)` + RLS + função `is_member_of(_submission_id uuid)`
3. Tabela `member_benefits` + RLS + trigger `updated_at`
4. Tabela `tool_usage_history` (genérica, com `user_id`, `tool`, `metadata jsonb`, `created_at`) + RLS
5. Tabela para encurtador (`short_links`) e analytics (`link_clicks`) — copiadas do projeto origem

**Edge Functions a deployar:** `invite-associate`, `compress-pdf`, `create-short-link`, `extract-text`, `link-analytics`, `remove-background`, `save-compression-history`, `cleanup-temp-files`, `r`.

**Rotas novas:**
```text
/hub/login
/hub                          (dashboard)
/hub/ferramentas
/hub/ferramentas/<slug>       (9 ferramentas)
/hub/beneficios
/hub/perfil
/admin/beneficios             (CRUD admin)
```

**Arquivos a portar do projeto fc249bd6:** páginas e componentes das pastas `image`, `pdf`, `qr`, `link`, `palette`, `ocr`, `analytics`, mais `ToolCard`, `ToolPageLayout`, `FileUploadZone`, `ProtectedRoute`, `RealtimeNotifications`. Adaptar estilos para usar tokens semânticos do ABIESV.

---

### Faseamento sugerido (para não fazer tudo num bolo só)

**Fase 1 — Fundação (esta primeira leva):**
- Migrations (role + tabela `associate_members` + `member_benefits`)
- Auth flow (login do hub + convite automático no aprovar associado)
- Layout do Hub com sidebar e dashboard vazio
- Página de Benefícios (associado) + CRUD admin

**Fase 2 — Ferramentas leves (sem Edge Functions complexas):**
- QR Generator, UTM Builder, Paleta de cores, Conversor de imagem (client-side)

**Fase 3 — Ferramentas com backend:**
- Compressor de imagem/PDF, Encurtador, OCR, Remover fundo (com edge functions e storage)

Recomendo começar pela **Fase 1**. Sem a fundação, o resto não conecta.

---

### Pontos abertos para confirmar antes de implementar

1. **Confirma começar pela Fase 1 apenas?** (vs. tentar tudo de uma vez — arriscado)
2. **Convite automático ao aprovar:** disparar para *todos* os contatos da submission ou só o primeiro/principal?
3. **Benefícios — campos específicos:** algum campo essencial além dos listados (ex: público-alvo, restrições geográficas)?
