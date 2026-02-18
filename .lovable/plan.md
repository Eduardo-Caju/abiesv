

## Criacao do Banco de Dados para o Formulario de Cadastro

Vou criar toda a infraestrutura do banco de dados necessaria para o formulario de cadastro de associados com fluxo de aprovacao.

---

### O que sera criado no banco de dados

**1. Tabela `associate_submissions`**
- Armazena os dados de cada empresa que preencher o formulario
- Campos: razao social, nome fantasia, CNPJ, categoria, descricoes, estado, cidade, redes sociais, solucoes, setores, logo
- Coluna `status` que comeca como "pendente" e pode ser alterada para "aprovado" ou "rejeitado"
- Campo `observacao_admin` para anotacoes do administrador

**2. Tabela `associate_submission_contacts`**
- Armazena os contatos de cada empresa (ate 3 pessoas)
- Campos: nome, cargo, telefone fixo, celular, email
- Vinculada a tabela principal (quando uma submissao e apagada, os contatos tambem sao)

**3. Sistema de permissoes (admin)**
- Tabela `user_roles` para definir quem e administrador
- Funcao `has_role()` para verificar permissoes de forma segura

**4. Regras de acesso (seguranca)**
- Qualquer pessoa pode enviar o formulario (INSERT publico)
- Somente administradores podem ver, editar e aprovar cadastros
- Cadastros aprovados ficam visiveis publicamente (para o Guia)

**5. Armazenamento de logotipos**
- Bucket `associate-logos` para upload de imagens
- Acesso publico para leitura (exibir no site) e envio (formulario sem login)
- Limite de 2MB por arquivo

---

### Apos a aprovacao

Com o banco pronto, vou criar:
1. A pagina do formulario em `/associados/cadastro`
2. O painel administrativo em `/admin`
3. A integracao com o Guia de Associados

---

### Detalhes tecnicos

**Enum e tabelas**
- `submission_status`: enum com valores pendente, aprovado, rejeitado
- `app_role`: enum com valores admin, user
- Trigger automatico para atualizar `updated_at` em cada alteracao
- Foreign key com cascade delete nos contatos

**RLS (Row Level Security)**
- `associate_submissions`: INSERT para anon/authenticated, SELECT publico apenas status=aprovado, SELECT/UPDATE total para admins
- `associate_submission_contacts`: INSERT para anon/authenticated, SELECT/UPDATE para admins, SELECT publico vinculado a submissoes aprovadas
- `user_roles`: SELECT apenas para o proprio usuario ou admins

**Storage policies**
- Upload publico no bucket `associate-logos`
- Leitura publica para exibir logos no site

