

## Atualizar Dados de Contato

Vou atualizar o telefone e e-mail de contato em todos os locais onde aparecem no site:

**De:** +55 11 9999-9999 / contato@abiesv.org.br
**Para:** (11) 96174-4269 / secretaria@abiesv.com.br

### Arquivos a alterar

**1. Footer (rodape global - aparece em todas as paginas)**
`src/components/layout/Footer.tsx`
- E-mail: `contato@abiesv.org.br` → `secretaria@abiesv.com.br` (link e texto)
- Telefone: `+55 11 9999-9999` → `(11) 96174-4269` (link e texto)

**2. Pagina de Contato**
`src/pages/Contato.tsx`
- E-mail: `contato@abiesv.org.br` → `secretaria@abiesv.com.br` (link e texto)
- Telefone: `+55 11 9999-9999` → `(11) 96174-4269` (link e texto)
- Link tel: `tel:+5511999999999` → `tel:+5511961744269`

### Observacao
O placeholder de telefone na pagina Associe-se `(11) 99999-9999` e apenas um exemplo de formato para o usuario preencher, nao sera alterado.

