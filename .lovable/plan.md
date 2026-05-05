## Ajuste no Hub Dashboard

O card "Ferramentas" e a seção "O que vem por aí" ainda mostram "Em breve", apesar de as 9 ferramentas já estarem implementadas em `/hub/ferramentas`.

### Mudanças em `src/pages/hub/HubDashboard.tsx`

1. **Card "Ferramentas"**
   - Trocar a descrição de "Em breve: utilitários para o dia a dia do varejo" por algo como "9 utilitários prontos para o dia a dia do varejo"
   - Substituir o botão `disabled` "Em breve" por um botão ativo "Abrir ferramentas" linkando para `/hub/ferramentas` (mesmo padrão do card de Benefícios)

2. **Seção "O que vem por aí"**
   - Renomear para "Ferramentas disponíveis" (ou remover a seção e substituir por uma lista clicável)
   - Transformar os bullets em links rápidos para cada ferramenta:
     - Compressor de imagem → `/hub/ferramentas/compressor-imagem`
     - Conversor de imagem → `/hub/ferramentas/conversor-imagem`
     - Compressor de PDF → `/hub/ferramentas/compressor-pdf`
     - Gerador de QR Code → `/hub/ferramentas/qr-code`
     - UTM Builder → `/hub/ferramentas/utm-builder`
     - Encurtador de link → `/hub/ferramentas/encurtador`
     - Paleta de cores → `/hub/ferramentas/paleta`
     - Removedor de fundo → `/hub/ferramentas/remover-fundo`
     - Extrator de texto (OCR) → `/hub/ferramentas/ocr`

3. **Limpeza**
   - Remover o import `Sparkles` que deixa de ser usado.

Sem alterações de schema, rotas ou outros arquivos.
