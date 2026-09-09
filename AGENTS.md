# AGENTS.md — Produtivo

Instruções para agentes de código. Visão de produto: `src/IA/Plano-de-Contexto.md`.

## Papel

Você implementa o **frontend React Native** do Produtivo. Backend é Firebase (Auth + Firestore). Não troque a stack. Não introduza Expo, Next.js, Tailwind, NativeWind, Expo Router ou Shadcn.

## Comandos

```bash
npm start                 # Metro
npm run android           # Android
npm run ios               # iOS
npm test
npm run lint
```

Node `>= 22.11.0`. Não commite nem faça push a menos que o usuário peça.

## Estrutura (siga o que já existe)

```
src/Pages/{NomeTela}/index.tsx    # tela
src/Pages/{NomeTela}/styles.tsx   # styled-components da tela
src/Components/{Nome}/index.tsx   # compartilhado
src/Components/{Nome}/styles.tsx
src/Context/                      # estado global (hoje só Auth)
src/Routes/                       # Auth.Routes, Apps.Routes, Routes
```

- Pastas de tela/componente em **PascalCase** (`Tarefas`, `TaskModal`).
- Arquivos de tela: `index.tsx` + `styles.tsx` (não misture StyleSheet na tela se a pasta já usa styled-components).
- Componente só daquela tela: subpasta dentro da Page (`Pages/Tarefas/_components/...`). Compartilhado: `src/Components`.
- Nova tela: registrar em `src/Routes/Apps.Routes.tsx` ou `Auth.Routes.tsx`.
- `src/IA/` é documentação de agentes, não código do app. A aba do produto é `src/Pages/IA`.

## Padrões de código

- TypeScript. Sem `any` novo; estreite com `unknown` se preciso.
- Componentes funcionais; páginas com `export default`.
- Handlers: `handleCreateTask`. Booleanos: `isLoading`, `showCalendar`.
- UI não chama Firestore. Extraia para hook (`useTasks`) e/ou `src/services/...` em código **novo**. Telas antigas ainda misturam dados; ao tocar nelas, extraia se o diff permanecer pequeno.
- Datas persistidas: `YYYY-MM-DD`. Exibição: `pt-BR`. Horário: `HH:mm`.
- Toda tarefa **deve** ter uma das categorias de `src/Components/Categories`.
- Listas (Home e Tarefas) filtram por `selectedDate`. Um dia por vez.
- Ícones: Feather. Navegação: React Navigation já configurada.
- Prettier do repo: `singleQuote`, `trailingComma: 'all'`, `arrowParens: 'avoid'`.

## Firebase

- Auth: e-mail/senha via `AuthContext` (`signIn`, `signUp`, `signOut`, `AlterarNome`, `AlterarSenha`).
- Sessão: AsyncStorage chave `@devapp`.
- Tasks: `users/{uid}/tasks`. Escuta com `onSnapshot` e cancele no unmount.
- Sempre `auth().currentUser`; se não houver usuário, retorne.
- Não invente coleções. Metas: combine com o backend antes de criar path novo.
- Nunca coloque API key de LLM no app. Aba IA permanece placeholder até haver backend.

## Produto (não quebre)

- Tabs atuais: Home, Tarefas, Metas, IA, Perfil. Não remova abas.
- Não transforme o app num calendário completo. Calendário só como atalho de data.
- Recorrência: campo existe; UI está comentada — só reative se pedido.
- Score/equilíbrio: só tarefas **concluídas** no período selecionado.
- MVP: simplicidade. Sem feature extra, onboarding novo ou gamificação sem pedido.

## O que não fazer

- Não reescrever o app no padrão Expo/Next dos arquivos de estudo.
- Não criar componentes globais “por precaução”.
- Não adicionar dependências sem necessidade clara.
- Em dúvida de pasta, tipo ou path Firestore: pergunte antes.

## Skills

Procedimentos em `.cursor/skills/`:

- `criar-tela` — nova Page
- `criar-componente` — Component vs `_components`
- `feature-firebase` — CRUD Firestore
- `revisar-padrao` — conferir convenções
