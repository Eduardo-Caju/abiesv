

## Conectar o Guia de Associados ao banco de dados

### Problema

A pagina `/associados` exibe dados de um arquivo estatico (`src/data/associates.ts`). Quando um associado e aprovado no admin, os dados ficam apenas no banco de dados (tabela `associate_submissions` com status `aprovado`), mas a pagina nunca os consulta.

### Solucao

Unificar as duas fontes: manter os dados estaticos como fallback e tambem buscar os associados aprovados no banco de dados. Os dados do banco terao prioridade quando houver duplicata (mesmo slug).

### Etapas

**1. Criar um hook `useApprovedAssociates`**

- Consultar `associate_submissions` com status `aprovado` e seus contatos via `associate_submission_contacts`
- Mapear os campos do banco para a interface `Associate` existente
- Gerar slug a partir do `nome_fantasia` (lowercase, hifenizado)

**2. Atualizar a pagina `Associados.tsx`**

- Importar o novo hook
- Mesclar os dados estaticos com os dados do banco
- Dados do banco com mesmo slug sobrescrevem os estaticos
- Manter filtros e busca funcionando normalmente

**3. Atualizar a pagina `AssociadoPerfil.tsx`**

- Tambem buscar o associado pelo slug no banco de dados
- Fallback para os dados estaticos se nao encontrado no banco

**4. Tratamento de campos**

Mapeamento dos campos do banco para a interface `Associate`:

| Campo banco (`associate_submissions`) | Campo interface (`Associate`) |
|---|---|
| `nome_fantasia` | `name` |
| `razao_social` | `tradingName` |
| `cnpj` | `cnpj` |
| `categoria` | `category` |
| `descricao_curta` | `shortDescription` |
| `descricao_completa` | `fullDescription` |
| `website` | `website` |
| `linkedin` | `linkedin` |
| `instagram` | `instagram` |
| `logo_url` | `logo` |
| `solucoes` | `solutions` |
| `setores` | `sectors` |
| `cidade` | `city` |
| `estado` | `state` |
| `created_at` | `joinedDate` |

Contatos vindos de `associate_submission_contacts`:

| Campo banco | Campo interface |
|---|---|
| `nome` | `name` |
| `cargo` | `role` |
| `telefone_fixo` | `phone` |
| `celular` | `mobile` |
| `email` | `email` |

### Detalhes tecnicos

**Novo arquivo**: `src/hooks/useApprovedAssociates.ts`

```typescript
// Busca associate_submissions com status 'aprovado'
// JOIN com associate_submission_contacts
// Retorna dados mapeados para Associate[]
```

**Alteracoes em `Associados.tsx`**:
- Chamar `useApprovedAssociates()`
- Mesclar com array estatico via `useMemo`, priorizando banco
- Passar lista mesclada para os filtros existentes

**Alteracoes em `AssociadoPerfil.tsx`**:
- Buscar por slug no banco alem do array estatico
- Priorizar dados do banco quando encontrados

Nenhuma alteracao de banco de dados necessaria -- as tabelas e politicas de RLS ja existem e permitem leitura publica de submissoes aprovadas.
