

## Criar Usuario Administrador

Para configurar seu acesso ao painel administrativo, vou criar uma funcao backend temporaria que:

1. **Cria sua conta** com o email `eduardo@fastconstrutora.com.br` e uma senha temporaria
2. **Atribui a role de admin** na tabela `user_roles`

---

### O que sera feito

**1. Funcao backend `create-admin`**
- Cria o usuario no sistema de autenticacao usando o email informado
- Define uma senha temporaria: `Admin@2026!` (voce podera alterar depois)
- Insere o registro na tabela `user_roles` com role `admin`
- Essa funcao sera usada uma unica vez e podera ser removida depois

**2. Execucao e teste**
- Apos criar a funcao, vou executa-la para criar sua conta
- Voce podera acessar `/admin/login` com:
  - Email: `eduardo@fastconstrutora.com.br`
  - Senha: `Admin@2026!`

---

### Detalhes tecnicos

**Edge function `create-admin`**
- Usa a chave `SUPABASE_SERVICE_ROLE_KEY` (ja configurada) para criar o usuario via Admin API
- Chama `supabase.auth.admin.createUser()` com `email_confirm: true` (pula verificacao de email)
- Insere na tabela `user_roles` o `user_id` retornado com role `admin`
- Protegida por uma chave de autorizacao (LOVABLE_API_KEY) para evitar uso indevido

