

## Noticias do Varejo com Banco de Dados e Painel Admin

Atualmente as noticias estao fixas no codigo (arquivo `src/data/news.ts`). Para voce poder atualizar diariamente, vamos migrar tudo para o banco de dados e criar uma interface simples no painel admin para adicionar noticias.

---

### O que sera feito

**1. Tabela `news_articles` no banco de dados**
- Campos: titulo, resumo, fonte, URL da fonte, data, categoria, setor, destaque (sim/nao)
- Slug gerado automaticamente a partir do titulo
- Acesso publico para leitura (qualquer visitante ve as noticias)
- Apenas admins podem adicionar, editar ou remover noticias

**2. Gerenciamento de noticias no painel admin**
- Nova aba ou secao no painel `/admin` para "Noticias"
- Formulario simples para adicionar noticia com os campos: titulo, resumo, fonte, URL, data, categoria, setor, destaque
- Lista de noticias existentes com opcao de editar e excluir
- Pensado para ser rapido: voce cola os dados do clipping e publica em segundos

**3. Pagina de noticias atualizada**
- A pagina `/noticias` passa a buscar os dados do banco em vez do arquivo estatico
- Filtros por categoria e setor continuam funcionando normalmente
- Secao "Em Destaque" continua exibindo as noticias marcadas como destaque

**4. Migracao dos dados existentes**
- As 12 noticias que ja existem no arquivo `news.ts` serao inseridas no banco de dados
- O arquivo estatico sera mantido como fallback temporario

---

### Fluxo do dia a dia

1. Voce prepara o clipping no WhatsApp normalmente
2. Acessa o painel admin em `/admin`
3. Clica em "Nova Noticia"
4. Preenche titulo, resumo, fonte, URL, categoria e setor
5. Salva — a noticia aparece imediatamente no site

---

### Detalhes tecnicos

**Tabela `news_articles`**
```text
- id (uuid, PK)
- slug (text, unique)
- title (text, not null)
- excerpt (text, not null)
- source (text, not null)
- source_url (text, not null)
- published_date (date, not null)
- category (text, not null)
- sector (text, not null)
- featured (boolean, default false)
- created_at (timestamptz)
- updated_at (timestamptz)
```

**RLS Policies**
- SELECT: publico (qualquer pessoa pode ler noticias)
- INSERT/UPDATE/DELETE: apenas admins (verificado via `has_role()`)

**Frontend**
- Pagina `/noticias`: query com `supabase.from('news_articles').select()` ordenado por data
- Admin: nova secao no dashboard com formulario e lista de noticias
- React Query para cache e atualizacao automatica

