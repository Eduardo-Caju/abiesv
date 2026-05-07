## Objetivo

Fazer com que as páginas públicas exibam **apenas** as empresas cadastradas e aprovadas no painel admin "Cadastro de Associados". Remover a lista estática de empresas do site.

## Mudanças

### 1. `src/pages/Associados.tsx` (Guia de Associados)
- Remover o merge com `staticAssociates`.
- Lista passa a ser exclusivamente `useApprovedAssociates()` (banco).
- Manter `categories`, `states` e `getLogoInitials` vindos de `data/associates.ts` (são constantes/util, não dados de empresa).
- Ajustar o JSON-LD `ItemList` para refletir só os associados do banco.

### 2. `src/pages/AssociadoPerfil.tsx` (perfil individual `/associados/:slug`)
- Hoje usa `getAssociateBySlug` (lista estática). Trocar por busca no banco via Supabase (`associate_submissions` filtrando por `status = 'aprovado'` e slug derivado de `nome_fantasia`).
- Se o slug não existir no banco → 404 (NotFound). Empresas estáticas antigas deixam de ter perfil.
- Manter `getLogoInitials` como utilitário.

### 3. `src/pages/Index.tsx` (Home — seção de associados em destaque)
- Trocar import de `associates` (estático) por `useApprovedAssociates()`.
- Exibir os primeiros N aprovados (ex.: 8) ordenados por nome ou data.
- Se não houver associados aprovados ainda, ocultar a seção (ou mostrar estado vazio discreto).

### 4. `src/data/associates.ts`
- **Manter**: `categories`, `states`, `getLogoInitials`, tipo `Associate`.
- **Remover**: o array `associates` (lista estática de empresas) e `getAssociateBySlug`.
- Admin (`AdminSubmissionNew`, `AdminSubmissionDetail`, `CadastroAssociado`) continua usando `categories` normalmente.

### 5. SEO/sitemap
- Não há sitemap dinâmico de associados hoje; nada extra a fazer.

## Comportamento resultante

- Página `/associados`: só empresas aprovadas no admin.
- Página `/associados/:slug`: só funciona para empresas aprovadas; demais retornam 404.
- Home: destaque vem só do banco.
- Se você quiser que alguma das empresas estáticas continue aparecendo, basta cadastrá-la no admin e aprovar.

## Fora do escopo

- Migrar automaticamente as empresas estáticas para o banco (você optou por remover).
- Criar redirects 301 dos slugs antigos.
