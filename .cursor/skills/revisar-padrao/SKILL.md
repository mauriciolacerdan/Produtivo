---
name: revisar-padrao
description: Revisa um diff ou arquivo do Produtivo contra pastas, tema, Firebase e regras de produto. Use em code review, antes de merge, ou quando o usuário pedir para checar o padrão.
---

# Revisar padrão

## Checklist

- Stack: RN CLI, sem Expo/Next/Tailwind novos
- Arquivo na pasta certa (`Pages` vs `Components`)
- Tela: `index.tsx` + `styles.tsx`; rota se for tela nova
- Styled: cores do tema, props `$`
- TS: sem `any` novo; handlers `handle*`; booleanos `is*` / `show*`
- Tarefas: categoria válida; `date` ISO; filtro por dia
- Firestore: path `users/{uid}/...`; unsubscribe; sem coleção inventada
- MVP: sem calendário como eixo, sem recorrência extra, sem feature fora do pedido
- UX: loading/erro/vazio; copy PT-BR

## Formato do feedback

- 🔴 Bloqueia — quebra produto, dados ou stack
- 🟡 Ajustar — padrão do repo
- 🟢 Opcional — melhoria pequena

Cite arquivo e o que mudar. Não reescreva o app inteiro no review.
