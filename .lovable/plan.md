## Corrigir o Removedor de fundo

### Problema
O componente chama `pipeline("background-removal", "briaai/RMBG-1.4")`, mas a task `"background-removal"` não existe na versão atual do `@huggingface/transformers`. O modelo RMBG-1.4 é um SegFormer e precisa ser carregado via task `"image-segmentation"`, depois aplicamos a máscara manualmente sobre a imagem para gerar o PNG transparente.

### Mudanças em `src/components/hub/tools/BackgroundRemover.tsx`
1. Trocar a chamada por:
   ```ts
   const segmenter = await pipeline("image-segmentation", "briaai/RMBG-1.4", { device: "webgpu" })
     .catch(() => pipeline("image-segmentation", "briaai/RMBG-1.4"));
   ```
2. Carregar a imagem original em um `<canvas>` (com limite de ~1024px no maior lado para evitar travar a aba).
3. Rodar `segmenter(imageUrl)` → recebe array de segmentos com `mask` (`RawImage`).
4. Pegar o primeiro segmento, ler `mask.data` e aplicar como canal alpha:
   ```ts
   const imageData = ctx.getImageData(0,0,w,h);
   for (let i=0; i<mask.data.length; i++) imageData.data[i*4+3] = mask.data[i];
   ctx.putImageData(imageData, 0, 0);
   ```
5. Exportar via `canvas.toBlob(..., "image/png")` e mostrar/baixar.
6. Adicionar mensagens de progresso (carregando modelo / segmentando / finalizando) e tratamento de erro com toast já existente.

Sem alterações em outras ferramentas, dependências ou backend.
