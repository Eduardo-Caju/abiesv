## Fluxo de recuperação de senha

Implementar recuperação de senha self-service para o painel administrativo, espelhando o que já existe em `/hub/login`.

### 1. Atualizar `/admin/login`
- Adicionar link "Esqueci minha senha" ao lado do label da senha
- Ao clicar: validar email preenchido, chamar `supabase.auth.resetPasswordForEmail(email, { redirectTo: ${origin}/admin/reset-password })`
- Mostrar toast de sucesso/erro

### 2. Criar página `/admin/reset-password`
- Rota pública (sem `useAdminAuth`)
- Detectar sessão de recovery (Supabase cria sessão temporária via hash `type=recovery`)
- Formulário com nova senha + confirmação (mínimo 8 caracteres, validação de match)
- Submit: `supabase.auth.updateUser({ password })`
- Após sucesso: validar que o usuário tem role `admin`; se sim → `/admin`, senão → signOut + `/admin/login`
- Mensagem de erro se o link estiver expirado/inválido

### 3. Espelhar o mesmo fluxo no Hub
- Criar `/hub/reset-password` (mesma lógica, aceita roles `admin` ou `associado`)
- Atualizar o `redirectTo` em `HubLogin.tsx` para apontar para `/hub/reset-password` (hoje aponta para `/hub/login`, o que faz o usuário ser autologado sem trocar a senha)

### 4. Registrar rotas em `src/App.tsx`
- `/admin/reset-password` → `AdminResetPassword`
- `/hub/reset-password` → `HubResetPassword`

### Detalhes técnicos
- Usar `supabase.auth.onAuthStateChange` para capturar evento `PASSWORD_RECOVERY` antes de renderizar o form
- Componentes existentes: `Card`, `Input`, `Label`, `Button`, `useToast`
- Os e-mails de recuperação já são enviados pelo Supabase com template padrão (sem necessidade de configurar domínio customizado agora)

### Fora do escopo
- Customização de templates de email com domínio próprio (pode ser feito depois)
- Alterar a senha do `eduardo@fastconstrutora.com.br` — após implantar, basta clicar em "Esqueci minha senha" em `/admin/login`
