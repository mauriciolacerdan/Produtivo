---
applyTo: "src/Context/**/*.tsx,src/Pages/Tarefas/**/*.tsx,src/Components/TaskModal/**/*.tsx"
---

# Firebase (VS Code)

Pacotes: `@react-native-firebase/auth` e `@react-native-firebase/firestore`.

- Perfil: `users/{uid}` `{ nome, createdAt }`
- Tarefas: `users/{uid}/tasks` `{ title, date, hour, category, recurring, completed, userId, createdAt }`
- `date`: `YYYY-MM-DD`. Sem usuário Auth, retorne. Cancele `onSnapshot` no unmount.
- Sessão: AsyncStorage `@devapp` via `AuthContext`.
- Não crie coleções novas (metas, etc.) sem alinhar com o backend.
- Sem chaves de LLM no app.
