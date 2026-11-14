# Login — caber na tela sem rolagem

> Status: executado.

## Contexto
A página de login já está implementada: `AuthTemplate` + organisms em `apps/web/src`. No monitor do usuário (1920×1080, ~950px úteis no navegador), a página fica com cerca de 1100px de altura e gera rolagem vertical.

Objetivo: o card inteiro deve caber na altura da janela, sem scroll, e se adaptar a telas menores, mantendo as proporções do layout de referência.

### Causas da altura excessiva
- Espaçamentos e tamanhos fixos e grandes:
  - `p-20` no card e `p-10` no `main`
  - `gap-10` entre os blocos
  - `h-16` no botão, `text-4xl` no título e `mt-6` no botão
- O `<img>` do banner fica no fluxo do grid: a altura natural da imagem pode esticar a linha do grid.

## Abordagem: escala vertical fluida (tokens com `clamp(…, vh, …)`)
Em vez de breakpoints por altura, os espaçamentos verticais, as alturas dos controles e as fontes passam a ser tokens no `@theme` que encolhem conforme a altura da viewport. O máximo de cada token é o valor atual (fiel ao design em telas altas), e o mínimo mantém a legibilidade.

### 1. Tokens em `apps/web/src/index.css` (`@theme`)
O Tailwind v4 gera as utilities automaticamente: `gap-section`, `h-control`, `text-title` etc.

| Token | Valor | Uso |
|---|---|---|
| `--spacing-card` | `clamp(1.25rem, 4.5vh, 5rem)` | padding do card |
| `--spacing-section` | `clamp(0.75rem, 2.8vh, 2.5rem)` | gap entre header/form/social/prompt |
| `--spacing-field` | `clamp(0.375rem, 1.2vh, 1rem)` | gap label↔input e entre campos |
| `--spacing-control` | `clamp(2.5rem, 5.5vh, 3.5rem)` | altura do Input |
| `--spacing-control-lg` | `clamp(2.75rem, 6vh, 4rem)` | altura do Button |
| `--spacing-social` | `clamp(2rem, 5vh, 3.5rem)` | ícone do SocialButton |
| `--text-title` | `clamp(1.75rem, 4.2vh, 2.25rem)` | Heading `title` |
| `--text-subtitle` | `clamp(1.25rem, 3.2vh, 1.875rem)` | Heading `subtitle` |
| `--text-body` | `clamp(1rem, 2.1vh, 1.25rem)` | Label, Input, TextLink, divisor, prompt |
| `--text-cta` | `clamp(1.125rem, 2.6vh, 1.5rem)` | Button, link "Crie seu cadastro!" |

### 2. `AuthTemplate` (`components/templates/AuthTemplate/AuthTemplate.tsx`)
- `main`:
  - `min-h-dvh` com padding `p-4 lg:p-[2vh]`, centralizado.
  - Sem `overflow-hidden`: abaixo de ~600px de altura (celular em paisagem) a rolagem continua permitida, para não cortar conteúdo.
- Card: `p-card`, `gap-section`, `max-h-[calc(100dvh-4vh)]` em `lg`, e largura `max-w-6xl` com o grid `5fr/6fr` atual.
- Banner:
  - Envolver em `<div class="relative hidden lg:block">` com `<img class="absolute inset-0 size-full object-cover">`.
  - Assim a imagem preenche a altura definida pela coluna do formulário e nunca a aumenta.
- Header: `gap-section`; o `subtitle` usa `text-subtitle`.

### 3. Atoms e molecules (trocar valores fixos pelos tokens)
- **`Heading`:** `text-4xl` → `text-title`, `text-3xl` → `text-subtitle`.
- **`Input`:** `h-14 text-xl` → `h-control text-body`.
- **`Button`:** `h-16 text-2xl` → `h-control-lg text-cta`.
- **`Label`, `TextLink` (underline), `DividerWithText`, `CheckboxField`:** `text-xl` → `text-body`.
- **`TextLink` (brand):** `text-2xl` → `text-cta`.
- **`Checkbox`:** `size-8` → `size-[1.6em]`, para acompanhar o `text-body` do label.
- **`SocialButton`:** `size-14` → `size-social`, texto `text-body`.
- **`FormField`:** `gap-3` → `gap-field`.

### 4. Organisms
- **`LoginForm`:** `gap-6` → `gap-field`. Trocar o `mt-6` do botão por `mt-field`.
- **`SocialLogin`:** `gap-6` → `gap-field`.
- **`AuthSwitchPrompt`:** `gap-4` → `gap-field`.

Nenhuma API de componente muda: só classes. O cadastro herda o mesmo comportamento pelo `AuthTemplate`.

## Verificação
- `pnpm --filter web test`, `lint` e `build` continuam passando. Os testes não dependem de classes.
- `pnpm dev:web`, no navegador do usuário:
  - janela maximizada em 1920×1080: sem barra de rolagem, card inteiro visível e proporções próximas de `Login Page.png`;
  - DevTools com viewports 1366×768 e 1280×720: sem rolagem;
  - abaixo de `lg` (mobile): banner oculto e formulário legível.
- Não há navegador headless local. Se o Claude in Chrome estiver conectado, uso-o para tirar screenshots nessas resoluções; senão, a checagem visual fica com o usuário.
