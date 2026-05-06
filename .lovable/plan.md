## Por que o convite não está chegando

Hoje o projeto usa o SMTP padrão do Lovable Cloud (sem domínio de e-mail próprio configurado). Esse SMTP tem **limite muito baixo** (~3-4 e-mails/hora) e prioriza entregabilidade fraca — invites e recovery links frequentemente:

1. Caem em spam/lixeira (verificar lá primeiro em `secretaria@abiesv.org.br`).
2. São bloqueados por rate-limit silencioso (várias tentativas seguidas no mesmo e-mail = nada chega).
3. Demoram alguns minutos.

Como o e-mail já existia em `auth.users`, a função agora dispara um link de **recovery** (não invite). Se o servidor de e-mail do destinatário rejeitou ou marcou como spam, o usuário não vê nada.

## Solução proposta: cadastrar admin diretamente, sem depender de e-mail

Vou criar um fluxo "Adicionar admin manualmente" na tela `/admin/equipe` que:

1. Cria o usuário no `auth.users` já com **senha temporária definida pelo super-admin** (ou gerada automaticamente e exibida 1x na tela).
2. Marca o e-mail como já confirmado (`email_confirm: true`) — não precisa clicar em link.
3. Atribui role `admin` + permissões selecionadas.
4. Mostra a senha temporária na tela para o super-admin copiar e enviar manualmente (WhatsApp, e-mail próprio, etc.).
5. O novo admin entra em `/admin/login` com e-mail + senha temporária e pode trocar depois em "Esqueci minha senha" se quiser.

Se o e-mail já existir em `auth.users` (caso de `secretaria@abiesv.org.br`), a função apenas:
- Atualiza/define uma nova senha via `auth.admin.updateUserById`.
- Reaplica role + permissões.
- Devolve a senha para o super-admin.

### Mudanças técnicas

- **Edge function**: nova `create-admin-direct` (ou estender `invite-admin` com flag `mode: "direct"`).
  - Usa `supabaseAdmin.auth.admin.createUser({ email, password, email_confirm: true })`.
  - Se já existe: localiza `userId` via `listUsers`, chama `updateUserById({ password })`.
  - Upsert em `user_roles` e `admin_permissions`.
  - Retorna `{ success, email, password, alreadyExisted }`.
- **UI em `AdminTeam.tsx`**: 
  - Adicionar dois botões no card de convite: **"Enviar convite por e-mail"** (atual) e **"Criar com senha temporária"** (novo).
  - Ao criar com senha: gerar uma senha forte aleatória (ex: 16 chars) no front, enviar para a função, exibir em modal copiável após sucesso com aviso "Salve esta senha — não será mostrada novamente".

### Fora de escopo

- Configurar domínio de e-mail próprio (resolveria o problema de entregabilidade de forma definitiva, mas exige DNS — pode ficar para depois).

### Pergunta rápida

Para o caso atual de `secretaria@abiesv.org.br`, posso já usar essa nova função para definir uma senha agora e te entregar para repassar à secretaria, certo?