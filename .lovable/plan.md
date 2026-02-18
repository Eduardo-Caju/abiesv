

## Especificacoes do Formulario - Guia de Associados ABIESV

Documento com todos os campos, limites e formatos para enviar aos associados preencherem.

---

### Campos do Formulario

| # | Campo | Obrigatorio | Tipo | Limite | Orientacao |
|---|-------|-------------|------|--------|------------|
| 1 | **Razao Social** | Sim | Texto | 120 caracteres | Nome juridico completo da empresa |
| 2 | **Nome Fantasia** | Sim | Texto | 80 caracteres | Nome comercial como aparecera no site |
| 3 | **CNPJ** | Sim | Texto | 18 caracteres | Formato: 00.000.000/0001-00 |
| 4 | **Categoria de atuacao** | Sim | Selecao unica | Lista predefinida | Ex.: Iluminacao, Mobiliario e Equipamentos, Tecnologia para Varejo, Visual Merchandising, Comunicacao Visual, Construcao Civil, Consultoria, Escritorio de Arquitetura, etc. |
| 5 | **Descricao curta** | Sim | Texto | 200 caracteres | Frase que resume a empresa e aparece no cartao do diretorio |
| 6 | **Descricao completa** | Nao | Texto | 800 caracteres | Texto institucional mais detalhado, exibido na pagina individual do perfil |
| 7 | **Logotipo** | Sim | Imagem | Formato: PNG ou SVG, fundo transparente. Dimensao minima: 400x400px. Tamanho maximo: 2 MB | Enviar em alta resolucao, preferencialmente quadrado |
| 8 | **Estado (UF)** | Sim | Selecao unica | 2 caracteres | Sigla do estado da sede (ex.: SP, RJ, PR) |
| 9 | **Cidade** | Sim | Texto | 60 caracteres | Cidade da sede |
| 10 | **Website** | Nao | URL | 200 caracteres | Endereco completo com https:// |
| 11 | **LinkedIn** | Nao | URL | 200 caracteres | URL da pagina da empresa no LinkedIn |
| 12 | **Instagram** | Nao | URL | 200 caracteres | URL do perfil no Instagram |
| 13 | **Solucoes oferecidas** | Sim | Tags (texto) | Ate 6 tags, 40 caracteres cada | Palavras-chave dos servicos/produtos (ex.: "LED", "Store Design", "Mobiliario") |
| 14 | **Setores atendidos** | Nao | Tags (texto) | Ate 5 tags, 40 caracteres cada | Segmentos de mercado (ex.: "Varejo", "Moda", "Supermercados") |

---

### Contatos (ate 3 pessoas)

Para cada contato:

| Campo | Obrigatorio | Limite | Orientacao |
|-------|-------------|--------|------------|
| **Nome completo** | Sim | 80 caracteres | Nome da pessoa de contato |
| **Cargo** | Sim | 60 caracteres | Funcao na empresa |
| **Telefone fixo** | Nao | 15 caracteres | Formato: 11 1234-5678 (com DDD) |
| **Celular/WhatsApp** | Sim (ao menos 1 contato) | 15 caracteres | Formato: 11 91234-5678 (com DDD). Sera usado para botao de WhatsApp |
| **E-mail** | Sim (ao menos 1 contato) | 100 caracteres | E-mail profissional. Sera usado para botao de contato |

---

### Especificacoes do Logotipo

- **Formato**: PNG (com fundo transparente) ou SVG
- **Dimensao minima**: 400 x 400 pixels
- **Proporcao**: Preferencialmente quadrado (1:1)
- **Tamanho maximo do arquivo**: 2 MB
- **Nomeacao sugerida**: nome-da-empresa.png (sem acentos, sem espacos)
- Caso a empresa nao envie logo, serao exibidas as iniciais do nome no site

---

### Categorias disponiveis (lista atual)

1. Iluminacao
2. Mobiliario e Equipamentos
3. Tecnologia para Varejo
4. Visual Merchandising
5. Comunicacao Visual, Mobiliario e Expositores
6. Construcao Civil
7. Consultoria
8. Escritorio de Arquitetura
9. Escritorio de Advocacia
10. Grafica Digital
11. Conteudo Digital
12. Fabricacao de Manequins e Displays
13. Fabricacao de Moveis
14. Especificadora
15. Outro (especificar)

---

### Observacoes para os associados

- Campos marcados como obrigatorios precisam ser preenchidos para que o perfil seja publicado.
- A descricao curta (200 caracteres) e o texto que aparece nos cartoes do diretorio -- seja objetivo e direto.
- A descricao completa (800 caracteres) aparece somente na pagina individual do perfil.
- O celular informado sera usado para gerar o botao de WhatsApp direto no site.
- O logotipo com fundo transparente garante melhor apresentacao visual.

---

### Proximo passo tecnico

Apos coletar os dados de todos os associados (via Google Forms, planilha ou outro meio), as opcoes para atualizar o site sao:

1. **Manual**: Eu atualizo o arquivo de dados diretamente com as informacoes recebidas.
2. **Automatizado**: Criamos uma tabela no banco de dados do site e um painel administrativo para importar/gerenciar os dados dos associados -- permitindo atualizacoes futuras sem depender de alteracoes no codigo.

