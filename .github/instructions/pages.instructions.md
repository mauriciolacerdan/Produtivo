---
applyTo: "src/Pages/**/*.tsx"
---

# Telas (VS Code)

Cada tela: `src/Pages/{PascalName}/index.tsx` + `styles.tsx`, `export default`. Registrar em `src/Routes/Apps.Routes.tsx` ou `Auth.Routes.tsx`.

- UI nova não deve chamar Firestore direto; use hook/service.
- Widgets só da tela: `_components/` em kebab-case.
- Reutilize a navegação de data (anterior / hoje / próximo).
- Tema escuro igual às telas irmãs (`#1c1c1c`, `#2a2a2a`, texto branco).
- Não crie rotas no estilo Expo `app/`.
