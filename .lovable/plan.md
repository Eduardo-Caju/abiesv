## Adicionar evento "EAT Innovation" à agenda 2026

Acrescentar uma entrada em `src/data/events.ts` no array `events`, mantendo a ordem cronológica (entre Expo Construção Offsite — 16/06 e Interior Lifestyle — 22/06).

### Dados mapeados

- `id`: `eat-innovation-2026`
- `name`: `EAT Innovation`
- `startDate`: `2026-06-19` (sem `endDate` — evento de um dia)
- `location`: a definir (não informado)
- `city`: `São Paulo, SP` (assumido — Sympla nacional; pode ser ajustado se houver outra cidade)
- `type`: `Congresso`
- `sector`: `Varejo` (foodservice é o subsetor mais próximo dos disponíveis; alternativa seria `Multisetorial`)
- `description` (resumida, ~200 caracteres): "Imersão de um dia que conecta executivos do foodservice às tendências capturadas pela delegação Tanjerin em Nova York, Chicago e na NRA Show 2026, com aplicações práticas para o mercado brasileiro."
- `registrationUrl`: `https://www.sympla.com.br/evento/eat-innovation/3364825?d=FASTCONSTRUTORANOEAT`

### Pontos abertos

- **Cidade**: confirmo São Paulo? Se for outra, me avise.
- **Setor**: usar `Varejo` (foodservice cabe melhor lá) ou `Multisetorial`? Padrão proposto: `Varejo`.

Sem outras mudanças — a página `/eventos` já lista eventos automaticamente a partir desse arquivo.
