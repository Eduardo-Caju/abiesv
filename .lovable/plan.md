

## Ordenar associados em ordem alfabetica

### Problema

Os associados vindos do banco de dados aparecem antes dos estaticos, sem ordenacao. O "Criative Display" ficou no topo por ser o primeiro resultado do banco.

### Solucao

Adicionar `.sort()` por nome no `useMemo` que mescla as duas fontes, em `Associados.tsx`. Usar `localeCompare` com locale `pt-BR` para ordenacao correta de acentos.

### Alteracao

**Arquivo**: `src/pages/Associados.tsx` (linha ~28)

Alterar o `useMemo` de:
```typescript
const associates = useMemo(() => {
  const dbSlugs = new Set(dbAssociates.map((a) => a.slug));
  const staticOnly = staticAssociates.filter((a) => !dbSlugs.has(a.slug));
  return [...dbAssociates, ...staticOnly];
}, [dbAssociates]);
```

Para:
```typescript
const associates = useMemo(() => {
  const dbSlugs = new Set(dbAssociates.map((a) => a.slug));
  const staticOnly = staticAssociates.filter((a) => !dbSlugs.has(a.slug));
  return [...dbAssociates, ...staticOnly].sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR")
  );
}, [dbAssociates]);
```

Uma unica linha adicionada. Nenhuma outra alteracao necessaria.

