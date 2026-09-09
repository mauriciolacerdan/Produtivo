---
applyTo: "src/Components/**/*.tsx"
---

# Componentes (VS Code)

- Reuso em 2+ telas → `src/Components/{PascalName}/`.
- Uso em uma tela → `src/Pages/{Tela}/_components/`.
- Não importar Firestore/Auth em componente puramente visual (código legado do TaskModal é exceção).
- Ícones: Feather. Props de callback: `onClose`, `onPress`.
- Arquivo de estilo colocalizado `styles.tsx` com styled-components/native.




# TESTE DE INSTRUÇÃO

Quando esta instrução estiver sendo aplicada, você DEVE incluir no início da resposta:

"INSTRUCTION_TEST_COMPONENTS"

Nunca inclua essa frase se a instrução não estiver sendo aplicada.