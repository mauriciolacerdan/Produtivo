---
name: feature-firebase
description: Implementa leitura/escrita Firestore e Auth no Produtivo no path users/{uid}. Use ao criar tarefas, metas, listeners, ou ligar Home ao backend.
---

# Feature Firebase

## Passos

1. Confirme o path com o que já existe. Hoje:
   - `users/{uid}` — perfil
   - `users/{uid}/tasks/{id}` — tarefas
2. Metas ou outras coleções: **pergunte** antes de criar.
3. Novo código de dados em `src/services/{recurso}-service.ts`. Estado/listener em `src/hooks/use-{recurso}.ts`. Página só consome o hook.
4. Sempre `const user = auth().currentUser; if (!user) return`.
5. `onSnapshot` deve retornar unsubscribe no `useEffect`.
6. Campos de tarefa: `title`, `date` (`YYYY-MM-DD`), `hour` (`HH:mm`), `category` (id do catálogo), `recurring`, `completed`, `userId`, `createdAt: serverTimestamp()`.
7. Erros: `Alert` em português + `console.log` do erro. Loading no botão/tela.
8. Auth (login, nome, senha): reutilize funções do `AuthContext`. Chave AsyncStorage `@devapp`.

## Não fazer

- Chamar LLM do app
- Guardar senha no Firestore
- Filtrar lista sem `selectedDate` quando a feature for “tarefas do dia”
