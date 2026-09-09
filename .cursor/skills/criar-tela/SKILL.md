---
name: criar-tela
description: Cria uma tela nova no Produtivo em src/Pages com index.tsx, styles.tsx, rota e padrão de data/categorias. Use ao pedir nova Page, nova aba, ou tela de Metas/Home/IA.
---

# Criar tela

## Passos

1. Leia `Plano-de-Contexto.md` e uma tela parecida (`src/Pages/Tarefas` ou `Home`).
2. Crie `src/Pages/{PascalName}/index.tsx` (default export) e `styles.tsx` com styled-components/native e o tema escuro existente.
3. Se a tela listar tarefas, use `selectedDate` (`Date` no estado) e filtre `YYYY-MM-DD`. Replique o bloco anterior/hoje/próximo; não invente outro modelo de calendário.
4. Dados: hook + service para Firestore. A UI só recebe props/callbacks.
5. Componentes exclusivos: `src/Pages/{PascalName}/_components/`. Compartilhados: `src/Components`.
6. Registre a rota em `Apps.Routes.tsx` (tab/stack autenticado) ou `Auth.Routes.tsx`. Ícone Feather se for tab.
7. Loading, vazio e erro visíveis. Copy em português.

## Conferência

- [ ] Pasta PascalCase com `index.tsx` + `styles.tsx`
- [ ] Rota registrada
- [ ] Sem Firestore dentro de styled views
- [ ] Categorias só via `src/Components/Categories` se a tela usar categoria
