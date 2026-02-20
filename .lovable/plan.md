

## Atualizar Seção de Notícias -- 5 novos artigos

Inserir 5 novas notícias no banco de dados via migration SQL.

---

### Artigos a inserir

| # | Titulo | Fonte | Categoria | Setor | Destaque |
|---|--------|-------|-----------|-------|----------|
| 1 | Lumine atinge 96% de ocupacao em seu portfolio | Terra | Mercado | Shoppings | Nao |
| 2 | Lojas fisicas respondem por 80% das compras em 2026 | Terra | Tendencias | Omnichannel | Nao |
| 3 | Mega Polo Moda projeta alta com IA e vacancia zero | GBL Jeans | Tecnologia | Moda | Nao |
| 4 | Prioridades e desafios para o varejo de shopping em 2026 | Central do Varejo | Estrategia | Shoppings | Nao |
| 5 | XP projeta recuperacao do setor de shoppings para o 2o semestre | XP Investimentos | Mercado | Shoppings | Nao |

---

### Detalhes tecnicos

**Migration SQL**: Um unico INSERT com os 5 registros na tabela `news_articles`, usando as colunas: `slug`, `title`, `excerpt`, `source`, `source_url`, `published_date`, `category`, `sector`, `featured`.

- As datas serao definidas como **2026-02-20** (hoje), ja que os artigos sao de clipping recente.
- Nenhum artigo sera marcado como destaque (featured = false), a menos que voce queira destacar algum.
- Categorias e setores seguem o padrao existente no banco, com ajustes para "Mercado" e "Shoppings" que sao novas categorias/setores relevantes ao conteudo.
- Nenhuma alteracao de codigo frontend e necessaria -- a pagina de noticias ja consome os dados do banco dinamicamente.

