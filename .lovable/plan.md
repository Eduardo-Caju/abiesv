## Objetivo

Apagar a lista atual de eventos e feriados de `src/data/events.ts` e substituir pelos 24 eventos da planilha enviada. Manter a estrutura da página `/eventos` (filtros, cards, SEO). Sem eventos ABIESV por ora — quando houver, será adicionado seguindo o padrão atual (badge ABIESV, card destacado no topo).

## Mudanças

### 1. `src/data/events.ts` — substituir lista de eventos

- **Apagar** todos os eventos atuais e todos os feriados.
- **Adicionar** os 24 eventos do anexo, mapeando cada linha para o tipo `RetailEvent`:
  - `name`, `startDate`, `endDate` (ISO `YYYY-MM-DD`), `location`, `city`, `description` (resumo da planilha, sem o "Confira mais informações"), `registrationUrl` (site oficial).
  - `type`: "Feira" ou "Congresso" conforme o porte/formato.
  - `sector`: ver mapeamento abaixo.
- **Ampliar `EventSector`** com dois novos setores que aparecem na lista: `"Construção"` e `"Casa e Decoração"`.
- **Atualizar `eventSectors`** para incluir os novos setores na ordem dos filtros.
- **Manter** os helpers (`getUpcomingEvents`, `getAbiestEvents`, `getEventsByMonth`, `formatEventDate`, `getEventById`) — `getAbiestEvents()` retornará array vazio até existir evento próprio.

#### Mapeamento de setores

| Evento | Tipo | Setor |
|---|---|---|
| Bett Brasil | Feira | Tecnologia |
| APAS Show | Feira | Varejo |
| ENIC | Congresso | Construção |
| Feira Brasileira do Varejo | Feira | Varejo |
| Rio2C | Congresso | Multisetorial |
| Construsul BC | Feira | Construção |
| Web Summit Rio | Congresso | Tecnologia |
| Expo Construção Offsite | Feira | Construção |
| Interior Lifestyle South America | Feira | Casa e Decoração |
| ABF Franchising Expo | Feira | Franquias |
| ExpoShopping | Feira | Varejo |
| Fórum E-Commerce Brasil | Congresso | E-commerce |
| Scanntech (In) Motion | Congresso | Varejo |
| Rio Innovation Week | Congresso | Tecnologia |
| Home Show Brazil | Feira | Casa e Decoração |
| AB Casa | Feira | Casa e Decoração |
| Concrete Show | Feira | Construção |
| Omni Varejo | Congresso | Varejo |
| AWS Summit | Congresso | Tecnologia |
| Latam Retail Show 2026 | Feira | Varejo |
| Expolux | Feira | Casa e Decoração |
| Conarec | Congresso | Varejo |
| Universo TOTVS | Congresso | Tecnologia |
| Construlev Expo | Feira | Construção |

### 2. `src/pages/Eventos.tsx` — pequenos ajustes

- O bloco "Featured ABIESV Event" já é condicional (`{featuredEvent && ...}`), então some sozinho quando não há evento ABIESV. Sem mudança.
- A ordenação atual coloca eventos ABIESV primeiro — manter (não afeta nada agora; volta a funcionar quando houver evento próprio).
- Sem mudanças nos filtros: os novos setores aparecem automaticamente via `eventSectors`.

### 3. Páginas relacionadas — sem alterações

- `BackstageDoVarejo.tsx` e `Workshops.tsx` continuam acessíveis pelos hubs em `/eventos`. Os eventos ABIESV antigos (`backstage-sp-2026`, `workshop-vm-2026` etc.) serão removidos da lista, mas as páginas de hub permanecem para uso futuro.

## Fora do escopo

- Não criar eventos ABIESV (será feito quando houver agenda própria definida).
- Não alterar páginas `/eventos/backstage-do-varejo` e `/eventos/workshops`.
- Não migrar lista para banco de dados.
