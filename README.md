# Produtivo — Estrutura do App

## Equipe

- **Maurício** — Frontend Developer
- **Felipe Romero** — Backend Developer

## 1. Proposta do Produto

Aplicativo de produtividade focado em:

* Organização prática do dia
* Clareza sobre uso do tempo
* Equilíbrio entre áreas da vida
  Diferencial:
  → Não apenas gerencia tarefas, mas mostra **como o tempo está sendo distribuído**.

---

## 2. Categorias de Vida (base do sistema)

* Trabalho
* Estudos
* Saúde
* Lazer
* Descanso
  Todas as ações do app obrigatoriamente pertencem a uma dessas categorias.

---

## 3. Estrutura do Sistema (MVP)

### Entidades principais

#### 1. Tarefas

* Execução diária com suporte a planejamento simples
* Pode ser:

  * Normal
  * Recorrente (ex: todo dia, semanal)
* Possui **data associada (opcional)** para permitir planejamento futuro sem complexidade de calendário

Campos essenciais:

* título
* categoria
* concluída (boolean)
* recorrente (boolean)
* frequência (opcional)
* date (string - formato YYYY-MM-DD)

Regras:

* Se não tiver data → assume como **hoje**
* Home sempre mostra tarefas do dia atual
* Usuário pode criar tarefas para:

  * Hoje
  * Amanhã
  * Data específica

---

#### 2. Metas

* Direção de médio/longo prazo
  Campos essenciais:
* título
* categoria
* prazo
* progresso (%)

---

## 4. Navegação (simples e direta)

**Bottom Tabs (4 abas):**

1. Home
2. Tarefas
3. Metas
4. Perfil
   Regra:
   → Tudo acessível em no máximo 2 toques

---

## 5. Estrutura das Telas

### 5.1 Home (principal)

Função: visão geral da vida + execução rápida
Componentes:

* Score geral (0–100)
* Distribuição por categoria (%)
* Tarefas do dia (baseadas na data atual)
* Progresso semanal
* Ações rápidas:

  * Nova tarefa
  * Nova meta

UX:

* Usuário deve conseguir concluir tarefas direto aqui
* Foco em velocidade e simplicidade

---

### 5.2 Tarefas

Função: execução e organização

* Lista por categoria
* Checkbox (concluir)
* Prioridade (simples)
* Criar tarefa
* Opção: marcar como recorrente
* Seleção de data (simples):

  * Hoje
  * Amanhã
  * Escolher data

---

### 5.3 Metas

Função: direção

* Lista de metas
* Progresso visual (%)
* Prazo

---

### 5.4 Perfil

Função: controle

* Dados do usuário
* Configurações básicas

---

## 6. Lógica do Produto

Sistema baseado em pontos:

* Cada tarefa concluída gera pontos
* Pontos são somados por categoria
  Saída:
* Distribuição percentual por área
* Score geral de equilíbrio

Regra de cálculo:

* Baseado apenas nas tarefas concluídas **no período selecionado (ex: dia atual)**

Exemplo:

* Trabalho: 40%
* Estudos: 25%
* Saúde: 15%
* Lazer: 10%
* Descanso: 10%

---

## 7. Fluxos Essenciais

### Onboarding (3 telas)

* Organizar rotina
* Definir metas
* Visualizar equilíbrio

CTA: Começar

---

## 8. Stack Tecnológica

### Frontend

* React Native

### Backend

* Firebase:

  * Authentication
  * Firestore
  * (Futuro) Cloud Functions

---

## 9. Evolução (pós-MVP)

Adicionar apenas após validação de uso:

* Visualização por dias (timeline)
* Calendário visual (se houver demanda real)
* Tela de **Decisões**

  * Estruturar escolhas
  * Prós e contras
  * Impacto por categoria
* Anotações estruturadas
* Relatórios semanais
* Recomendações inteligentes (IA)

---

## 10. Direção Estratégica

Foco inicial:
→ Fazer o usuário usar **todos os dias**

Evitar no MVP:

* Calendário complexo
* Features extras
* Customizações desnecessárias

---

## 11. Navegação por Data (Essencial para uso real)

Objetivo:
→ Permitir visualizar tarefas de qualquer dia sem adicionar complexidade de calendário

Estratégia:
→ Sistema baseado em **data selecionada (selectedDate)**

Comportamento:

* O app mantém uma data ativa
* Todas as listas (Home e Tarefas) são filtradas por essa data

Implementação lógica:

* Estado global ou local:

  * selectedDate (YYYY-MM-DD)

* Filtro:

  * Mostrar apenas tarefas onde task.date === selectedDate

UX (simples e eficiente):

* Navegação por botões:

  * ← Dia anterior
  * Hoje
  * Próximo dia →

* Exibir data atual na tela

Benefícios:

* Resolve 90% dos casos de uso
* Mantém o app rápido e simples
* Evita complexidade de calendário
* Permite evolução futura sem refatoração

Regra importante:

→ O usuário sempre interage com **um dia por vez**

---

## 12. Próximo Nível (evolução da data)

Somente após validação:

* Timeline semanal
* Navegação por semana
* Calendário visual (se necessário)

---

Próximo nível:
→ Transformar dados em **decisões inteligentes**



Tarefas:

Tarefas Recorrentes,
Paginas: Metas, Home, IA
Vincular com backend
Fazer Icon e logo
Postar Google play

Ajustar retornos de erros de login, criação de conta e outros processos, e alert para o usuario informando o erro que ocorreu como: Email já em uso!