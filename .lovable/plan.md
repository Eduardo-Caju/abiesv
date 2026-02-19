

## Atualizar noticias no banco de dados

Vou inserir as 5 novas noticias diretamente no banco de dados com os dados fornecidos.

### Noticias a inserir

| # | Titulo | Fonte | Categoria | Setor |
|---|--------|-------|-----------|-------|
| 1 | Brasil devera ganhar 11 novos shopping centers em 2026 | Portal In | Expansao | Shopping Centers |
| 2 | Farmacias do Assai saem do papel e devem ganhar 25 unidades | Mercado e Consumo | Estrategia | Atacarejo |
| 3 | Setor de shopping centers ultrapassa R$ 201 bilhoes faturados | Sindishopping | Resultados | Shopping Centers |
| 4 | A pressao por reinventar o modelo de shopping centers | Mercado e Consumo | Artigo | Shopping Centers |
| 5 | Os maiores shoppings de Pernambuco e o cenario regional | Exame | Ranking | Shopping Centers |

### O que sera feito

- Inserir 5 registros na tabela `news_articles` usando o Supabase
- Data de publicacao: 19/02/2026 (data atual)
- Nenhuma marcada como destaque por padrao
- Slugs gerados automaticamente a partir dos titulos
- Nenhuma alteracao de codigo necessaria, apenas insercao de dados

