---
name: criar-componente
description: Cria ou move um componente no Produtivo, escolhendo src/Components vs _components da Page. Use ao criar modal, botão, card, ou extrair UI de uma tela.
---

# Criar componente

## Onde colocar

- **2+ telas** ou já é padrão do app (modal de tarefa, categorias) → `src/Components/{PascalName}/index.tsx` + `styles.tsx`
- **Só uma tela** → `src/Pages/{Tela}/_components/{nome-em-kebab}.tsx` (e styles se necessário)

Se houver dúvida, pergunte. Não crie `src/components` minúsculo.

## Passos

1. Procure componente existente (TaskModal, Categories, EditNameModal) antes de criar outro.
2. Props tipadas. Callbacks `onClose` / `onPress`. Sem `any`.
3. Sem Auth/Firestore no arquivo de UI novo.
4. Feather para ícones. Transient props `$active` nos styled.
5. Alvo de toque ≥ 44px; estados disabled/loading se houver ação assíncrona.

## Conferência

- [ ] Local correto (global vs `_components`)
- [ ] `styles.tsx` colocalizado se o componente tiver visual próprio
- [ ] Não duplica TaskModal/Categories
