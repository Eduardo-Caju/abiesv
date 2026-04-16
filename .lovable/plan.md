

## Gerar Design System como JSON/CSS Tokens

Criar um script que extrai todos os tokens de design do projeto e gera dois arquivos exportaveis em `/mnt/documents/`:

1. **`design-tokens.json`** — Todos os tokens estruturados em JSON
2. **`design-tokens.css`** — Variaveis CSS prontas para importar

---

### Conteudo dos tokens

**Cores (Light + Dark)**
- primary, secondary, accent, muted, destructive, background, foreground, card, popover, border, input, ring
- Sidebar tokens
- Gradientes (primary, hero, subtle)
- Sombras (card, card-hover, button)

**Tipografia**
- Font families: Inter (sans), Montserrat (heading), Playfair Display (impact)
- Pesos usados por familia
- Google Fonts import URL

**Espacamento e Layout**
- Border radius (lg, md, sm)
- Container max-width e padding

**Animacoes**
- Keyframes: float, pulse-soft, fadeIn, fadeInUp, slideInLeft, scaleIn
- Duracoes e easing

**Componentes (referencia)**
- Button variants e sizes (do CVA config)
- Badge variants
- Classes utilitarias customizadas (gradient-primary, shadow-card, text-gradient, link-underline)

---

### Implementacao

Um script Python que le `src/index.css`, `tailwind.config.ts` e `src/components/ui/button.tsx`, parseia os tokens e gera os dois arquivos.

