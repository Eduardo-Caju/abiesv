
## Cards para Instagram Reels -- Noticias ABIESV

Vamos criar uma pagina interna no site (`/admin/social-cards`) que gera cards visuais no formato vertical do Instagram Reels (1080x1920px) para cada noticia do banco de dados, com layout padronizado seguindo a identidade visual do site.

---

### Como vai funcionar

1. No painel admin, havera um novo botao **"Social Cards"**
2. A pagina exibe uma lista de noticias com preview dos cards
3. Cada card e renderizado no formato 9:16 (proporcao do Reels)
4. Um botao **"Baixar PNG"** ao lado de cada card permite salvar a imagem pronta
5. A secretaria ou voce podem baixar e publicar direto no Instagram

---

### Layout do Card

Cada card tera o seguinte design, alinhado com a identidade visual do site:

- **Fundo**: gradiente roxo (cores primarias do site -- `hsl(262, 83%, 42%)` para `hsl(280, 87%, 55%)`)
- **Topo**: logo ABIESV em branco + badge "Curadoria ABIESV"
- **Centro**: titulo da noticia em Montserrat bold, branco, grande e legivel
- **Rodape**: categoria, setor, data e fonte em texto menor
- **Aspecto visual**: cantos arredondados internos, espacamento generoso, tipografia limpa

```text
+-------------------------+
|  [Logo ABIESV branco]   |
|  CURADORIA ABIESV       |
|                         |
|                         |
|   TITULO DA NOTICIA     |
|   EM DESTAQUE AQUI      |
|   COM ATE 3 LINHAS      |
|                         |
|                         |
|  [badge] Tecnologia     |
|  [badge] Varejo         |
|  18 fev 2026 | Fonte X  |
+-------------------------+
```

---

### O que sera criado

**1. Pagina `/admin/social-cards`**
- Arquivo: `src/pages/admin/AdminSocialCards.tsx`
- Lista todas as noticias com preview em miniatura do card
- Botao "Baixar PNG" para cada card usando a biblioteca `html2canvas`
- Filtro por data para facilitar encontrar noticias recentes

**2. Componente do Card**
- Arquivo: `src/components/social/ReelsCard.tsx`
- Componente React que renderiza o card no formato 1080x1920
- Usa as cores, fontes e logo do site
- Recebe os dados da noticia como props

**3. Navegacao**
- Rota `/admin/social-cards` registrada em `App.tsx`
- Botao "Social Cards" adicionado ao cabecalho do dashboard admin

**4. Dependencia**
- Instalar `html-to-image` (biblioteca leve para converter HTML em imagem PNG)

---

### Detalhes tecnicos

**Componente `ReelsCard`**
- Renderizado como div com dimensoes fixas (1080x1920) usando `style` inline para garantir resolucao correta na exportacao
- Escala visual no preview (miniatura) usando `transform: scale(0.2)` para caber na tela
- Fontes: Montserrat (titulo), Inter (corpo) -- ja carregadas no site
- Logo: usa `/src/assets/logo-abiesv-white.png` ja existente no projeto

**Exportacao PNG**
- Usa `html-to-image` (`toPng`) apontando para o elemento do card em tamanho real
- Download automatico como `card-{slug}.png`

**Dados**
- Reutiliza o hook `useNewsArticles` ja existente para buscar as noticias
