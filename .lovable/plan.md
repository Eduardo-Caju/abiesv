

## Convite de Administradores pelo Painel Admin

Vamos criar uma funcionalidade para que voce possa convidar novos administradores (como a secretaria) diretamente pelo painel, informando apenas o e-mail.

---

### Como vai funcionar

1. No painel admin, havera um botao "Convidar Admin"
2. Voce digita o e-mail da pessoa (ex: secretaria@abiesv.com.br)
3. O sistema envia um e-mail automatico com link para definir a senha
4. A pessoa clica no link, define sua senha e ja tem acesso ao painel admin

---

### O que sera criado

**1. Funcao backend `invite-admin`**
- Recebe o e-mail do novo administrador
- Cria a conta automaticamente usando a API administrativa
- Atribui a role `admin` na tabela `user_roles`
- Envia o e-mail de convite com link para definir senha
- So pode ser chamada por quem ja e admin (verificacao de seguranca)

**2. Interface no painel admin**
- Nova pagina `/admin/equipe` com:
  - Formulario simples com campo de e-mail e botao "Convidar"
  - Lista dos administradores atuais (e-mail e data de criacao)
- Botao de acesso no cabecalho do dashboard (ao lado de "Noticias")

**3. Rota no aplicativo**
- Registro da nova pagina `/admin/equipe` no roteador

---

### Detalhes tecnicos

**Edge Function `invite-admin`**
- Usa `supabase.auth.admin.inviteUserByEmail()` com service role key
- Insere registro na tabela `user_roles` com role `admin`
- Valida que o usuario chamando a funcao e admin antes de executar
- CORS headers configurados para chamadas do frontend

**Configuracao**
- Adicionar `[functions.invite-admin] verify_jwt = false` no config.toml (validacao feita manualmente no codigo)

**Frontend**
- Pagina `src/pages/admin/AdminTeam.tsx`
- Usa `supabase.functions.invoke('invite-admin')` para chamar a funcao
- Rota `/admin/equipe` registrada em `App.tsx`
- Link no cabecalho do dashboard

