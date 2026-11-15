# Página de Login — plano

> Status: executado.

## Contexto
A página de login foi implementada sem planejamento prévio. A decisão foi reverter tudo e reimplementar seguindo este plano. Objetivo: tela de login fiel a `~/Downloads/Login Page.png`, usando atomic design, com layout base reutilizável pela futura página de cadastro (mesmo layout, banner e campos diferentes).

Decisões tomadas:
- Uma pasta por componente, com teste próprio e `index.ts`.
- Formulários com react-hook-form + Zod.
- Sem router por enquanto: `App` renderiza só a `LoginPage`.

## Passo 0 — Reverter a implementação anterior
Tudo em `apps/web`, nada foi commitado:
- `git checkout -- apps/web pnpm-lock.yaml` restaura `App.tsx`, `App.css`, `src/assets/*`, `index.css`, `index.html`, `vite.config.ts`, `tsconfig.app.json` e `package.json`.
- Remover as pastas novas: `src/components`, `src/pages` e `src/test`.
- `pnpm install` para alinhar o `node_modules` ao lockfile.
- **Não tocar** em `CLAUDE.md` nem em `public/{banner_login,git,gmail}.png`. Esses arquivos são do usuário e estão untracked.

## Passo 1 — Infra
- **Deps:**
  - dev: `tailwindcss`, `@tailwindcss/vite`, `vitest`, `jsdom`, `@testing-library/{react,jest-dom,user-event}`
  - runtime: `react-hook-form`, `zod`, `@hookform/resolvers`
- **`vite.config.ts`:** plugin `tailwindcss()` e bloco `test` (`jsdom`, `globals: true`, `setupFiles: src/test/setup.ts`). Usar `defineConfig` de `vitest/config`.
- **`tsconfig.app.json`:** adicionar os types `vitest/globals` e `@testing-library/jest-dom`.
- **`package.json`:** script `"test": "vitest run"`. Na raiz, adicionar `test:web`.
- **`index.html`:** `lang="pt-BR"`, título "Code Connect" e fonte **Prompt** (300/400/600) via Google Fonts.
- **`src/index.css`:** `@import 'tailwindcss'` e `@theme` com os tokens:
  - `surface` #151a1e
  - `field` #878787
  - `brand` #81fe88
  - `brand-ink` #0d1f12
  - `muted` #bcbcbc
  - `font-sans` Prompt
- Remover os arquivos do scaffold: `App.css` e `src/assets/*`.

## Passo 2 — Componentes (`src/components/<nível>/<Nome>/{Nome.tsx, Nome.test.tsx, index.ts}`)
Regra: um nível só importa de níveis abaixo dele. Todo componente estende as props nativas do elemento e repassa `ref` (React 19: `ref` como prop), o que permite usar `register()` do react-hook-form.

**Atoms**
- `Button`: verde, `type="button"` por padrão.
- `Input`: fundo cinza; variante de erro com borda vermelha via `aria-invalid`.
- `Label`
- `Checkbox`: custom com check verde.
- `Heading`: variantes `title` e `subtitle`, prop `as`.
- `TextLink`: variantes `underline` e `brand`.
- `Icon`: SVG inline com `arrowRight`, `check` e `clipboard`.
- `ErrorMessage`: `role="alert"`.

**Molecules**
- `FormField`: Label + Input + ErrorMessage. Usa `useId` e liga a mensagem por `aria-describedby`.
- `CheckboxField`: Checkbox + label.
- `DividerWithText`: "ou entre com outras contas".
- `SocialButton`: ícone + legenda.

**Organisms**
- `LoginForm`:
  - `useForm` + `zodResolver(loginSchema)`.
  - Campos: identifier, password, remember. Inclui o link "Esqueci a senha" e o botão "Login →".
  - Expõe `onSubmit(values)`.
- `SocialLogin`:
  - DividerWithText + Github (`/git.png`) + Gmail (`/gmail.png`).
  - Expõe `onSelect(provider)`.
- `AuthSwitchPrompt`:
  - Props `question`, `linkLabel` e `href`.
  - Uso no login: "Ainda não tem conta? / Crie seu cadastro!". No cadastro, o texto se inverte.

**Templates**
- `AuthTemplate`:
  - Props `bannerSrc`, `bannerAlt`, `title`, `subtitle` e `children`.
  - Card escuro arredondado, banner à esquerda e conteúdo à direita.
  - O banner fica oculto abaixo de `lg`.
  - **É este o ponto de reuso do cadastro:** basta trocar o banner, os títulos e os children.

**Pages**
- `src/pages/LoginPage/`: compõe AuthTemplate + LoginForm + SocialLogin + AuthSwitchPrompt.
  - `onSubmit` e `onSelect` ficam como stubs, porque ainda não existe API.

## Passo 3 — Schema
`src/features/auth/schemas.ts` (fora da árvore atômica, para o cadastro reaproveitar):
- `loginSchema`:
  - `identifier`: string não vazia, mensagem "Informe seu email ou usuário".
  - `password`: string não vazia, mensagem "Informe sua senha".
  - `remember`: boolean.
- Exportar `LoginValues = z.infer<typeof loginSchema>`.

## Passo 4 — Testes (um por componente, uso essencial)
- **Atoms:** render, interação básica (click, type, toggle) e atributos de acessibilidade.
- **`FormField`:** associação label↔input, mais erro exibido e ligado por `aria-describedby`.
- **`LoginForm`:**
  - submit com campos vazios mostra os erros e não chama `onSubmit`;
  - submit preenchido chama `onSubmit` com `{identifier, password, remember}`.
- **`SocialLogin`:** `onSelect('github' | 'google')`.
- **`AuthTemplate`:** banner, títulos e children.
- **`LoginPage`:** smoke test dos blocos principais.

## Verificação
- `pnpm --filter web test`, `pnpm --filter web lint` e `pnpm --filter web build` (`tsc -b` + vite) devem passar.
- `pnpm dev:web`: comparar visualmente com `Login Page.png` no desktop e conferir no mobile, onde o banner some e o formulário ocupa a tela.
- Conferir que nenhum arquivo em `public/` nem o `CLAUDE.md` foi alterado (`git status`).
- Commit (só se o usuário pedir): `feat(web): add login page`.
