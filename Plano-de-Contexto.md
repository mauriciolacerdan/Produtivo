# 1. Nome do Projeto

Produtivo

# 2. Visão Geral

Aplicativo mobile de produtividade que organiza o dia por **categorias de vida** e mostra **como o tempo está sendo distribuído**, não só uma lista de tarefas.

Equipe: **Maurício** (frontend) e **Felipe Romero** (backend).

# 3. Problema

Pessoas registram tarefas, mas não enxergam o equilíbrio entre Trabalho, Estudos, Saúde, Lazer e Descanso. Falta clareza sobre o uso do tempo no dia a dia, sem a complexidade de um calendário completo.

# 4. Público-alvo

Pessoas que querem rotina diária simples: estudantes, profissionais e quem precisa equilibrar áreas da vida sem um planner pesado.

# 5. Objetivos

- Fazer o usuário abrir o app **todos os dias**.
- Permitir criar, concluir e organizar tarefas por categoria e por **um dia por vez** (`selectedDate`).
- Exibir score de equilíbrio (0–100) e distribuição percentual por categoria.
- Manter tudo acessível em no máximo dois toques (bottom tabs).

# 6. Funcionalidades principais (MVP)

- Autenticação: login e cadastro (e-mail/senha), sessão persistida.
- Perfil: nome, e-mail, configurações (alterar nome/senha; excluir conta ainda incompleto).
- Tarefas do dia: lista filtrada por `selectedDate` (YYYY-MM-DD) e categoria.
- Navegação de data: dia anterior, hoje, próximo dia; atalho de calendário na lista.
- Criar tarefa: título, data (hoje / amanhã / outra), horário, categoria.
- Concluir e excluir tarefa.
- Home: saudação + navegação de data (score, distribuição e lista do dia ainda a completar).
- Metas: lista com prazo e progresso % (tela placeholder).
- Aba IA no app: placeholder (recomendações inteligentes são pós-MVP).

Fora do MVP (não implementar sem pedido explícito): timeline semanal, calendário complexo como eixo do produto, tela de Decisões, anotações estruturadas, relatórios semanais, Cloud Functions, recomendações de IA.

# 7. Requisitos técnicos

- Mobile: React Native CLI **0.86**, React **19.2**, TypeScript.
- Navegação: React Navigation 7 (native stack + bottom tabs). Não usar Expo Router.
- UI: styled-components/native, ícones Feather (`react-native-vector-icons`).
- Backend: Firebase Auth + Firestore (`@react-native-firebase/*` v25).
- Persistência local da sessão: AsyncStorage (`@devapp`).
- Plataformas: Android e iOS.
- Node: `>= 22.11.0`.

# 8. Arquitetura atual

```
App.tsx                    # AuthProvider + NavigationContainer
src/
  Routes/                  # Auth vs App; tabs e stacks
  Pages/                   # Telas (index.tsx + styles.tsx)
  Components/              # Componentes compartilhados
  Context/                 # AuthContext (auth + perfil)
  Assets/
  IA/                      # Contexto para agentes (esta pasta)
```

## Telas (`src/Pages`)

| Tela | Rota | Estado |
| --- | --- | --- |
| Login | Auth stack | Login/cadastro |
| Home | Tab Home | Data + saudação; falta score/tarefas do dia |
| Tarefas | Tab Tarefas | CRUD Firestore em tempo real |
| Metas | Tab Metas | Placeholder |
| IA | Tab IA | Placeholder do produto |
| Profile | Tab Perfil | Dados + sair |
| Settings | Stack do Perfil | Nome/senha; excluir conta incompleto |

## Componentes (`src/Components`)

- `TaskModal` + `ButtonModal` — criar tarefa
- `Categories` — catálogo das 5 categorias
- `EditNameModal` / `ChangePasswordModal` — perfil

## Dados

Categorias obrigatórias (ids): `trabalho`, `estudos`, `saude`, `lazer`, `descanso`.

Firestore:

- `users/{uid}` — `{ nome, createdAt }`
- `users/{uid}/tasks/{taskId}` — `{ title, date, hour, category, recurring, completed, userId, createdAt }`

Regra de data: o usuário interage com **um dia por vez**. Listas filtram `task.date === selectedDate` (ISO `YYYY-MM-DD`). Sem data na criação, assume hoje.

# 9. Requisitos não funcionais

- Tema escuro atual: fundo `#1c1c1c`, superfícies `#2a2a2a` / `#2e2e2e`, texto `#ffffff`, muted `#a1a1a1`, perigo `#ff4d4d`.
- Touch targets confortáveis; `SafeArea` nas telas.
- Feedback de loading e erro (`ActivityIndicator`, `Alert`).
- Não expor chaves; Auth/Firestore só via SDK nativo.
- Código simples, manutenível; evitar features extras no MVP.

# 10. Funcionalidades futuras

- Tarefas recorrentes (UI comentada no modal; campo `recurring` já existe).
- Score e distribuição na Home; progresso semanal.
- CRUD de metas.
- Vincular Home/Metas/IA ao backend de forma consistente.
- Ícone/logo e publicação na Google Play.
- Pós-validação: timeline, decisões, relatórios, IA no backend (nunca chamar LLM direto do app).

# 11. Critérios de sucesso

- Usuário cria conta, entra e vê tarefas do dia selecionado.
- Criar e concluir tarefa em poucos toques, na Home (quando completa) e em Tarefas.
- Distribuição por categoria reflete só tarefas **concluídas no período** (ex.: dia atual).
- Navegação por data funciona sem calendário como tela principal.
