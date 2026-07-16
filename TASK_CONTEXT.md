# Task Context: Add Dark Mode Functionality

## Ticket Scope

Frontend-only implementation of user-controlled Dark Mode for the React (Vite) application in `frontend/`. The Django backend is out of scope.

## Key Implementation Decisions

1. **Theme state management** — Added a `ThemeProvider` React context (`frontend/src/context/ThemeContext.tsx`) that:
   - Stores the user's preference in `localStorage` under `hd-theme`
   - Falls back to the system `prefers-color-scheme` when no saved preference exists
   - Applies the `dark` class to `document.documentElement` (`<html>`) for global theming

2. **UI toggle** — Created an accessible `DarkModeToggle` atom component using `role="switch"`, `aria-checked`, and descriptive `aria-label` values. The toggle is placed in:
   - **Auth pages** (Login / Register) — top-right corner for visibility before sign-in
   - **Dashboard sidebar** — footer area above logout, alongside existing navigation
   - **Header** — included for future use when the shared `Layout` template is adopted

3. **Styling** — Extended existing CSS variables in `frontend/src/styles/theme.css`. The project already defined `.dark` overrides; this work wires them to user interaction and expands coverage for main/table backgrounds. Component styles were updated to use theme variables instead of hard-coded light colors where relevant.

4. **Testing** — No test runner existed in `package.json`. Added **Vitest** with Testing Library (standard for Vite projects) and tests covering default state, toggle behavior, `localStorage` persistence, and `dark` class application.

## Files Changed

| File | Why |
|------|-----|
| `frontend/src/context/ThemeContext.tsx` | Theme provider, hook, and document class management |
| `frontend/src/context/ThemeContext.test.tsx` | Unit tests for theme hook |
| `frontend/src/components/atoms/DarkModeToggle/*` | Accessible toggle UI component and styles |
| `frontend/src/components/atoms/DarkModeToggle/DarkModeToggle.test.tsx` | Component tests |
| `frontend/src/main.tsx` | Wrap app with `ThemeProvider` |
| `frontend/src/pages/auth/LoginPage.tsx` | Add toggle to login screen |
| `frontend/src/pages/auth/RegisterPage.tsx` | Add toggle to register screen |
| `frontend/src/pages/auth/LoginPage.css` | Position toggle on auth pages |
| `frontend/src/components/organisms/Sidebar/Sidebar.tsx` | Add toggle to dashboard sidebar |
| `frontend/src/components/organisms/Sidebar/Sidebar.css` | Sidebar footer layout for toggle |
| `frontend/src/components/organisms/Header/Header.tsx` | Add toggle to header nav |
| `frontend/src/components/organisms/Header/Header.css` | Theme-variable styling for header |
| `frontend/src/styles/theme.css` | Expanded `.dark` CSS variable overrides |
| `frontend/src/index.css` | Dark-mode scrollbar and body styles via `.dark` class |
| `frontend/src/hooks/index.ts` | Re-export `useTheme` |
| `frontend/src/components/atoms/index.ts` | Export `DarkModeToggle` |
| `frontend/vite.config.ts` | Vite build configuration (unchanged test surface) |
| `frontend/vitest.config.ts` | Vitest configuration merged with Vite config |
| `frontend/src/test/setup.ts` | Test setup (jest-dom, matchMedia mock) |
| `frontend/package.json` | Vitest + Testing Library dev dependencies, `test` script |

## Verification

- `npm test` — 5 tests passing
- `npm run lint` — no errors (one pre-existing-style warning on context file export)
- `npm run build` — TypeScript + Vite build

## Open Questions / Follow-ups

- Auth pages and dashboard sidebar both expose the toggle; consider consolidating if a global shell layout is introduced later.
- Dashboard-specific page CSS (e.g. `DashboardPage.css`) still uses some hard-coded colors and may need a follow-up pass for full dark-mode parity beyond CSS variables.
- `Header` / `Layout` are not currently used by routed pages; toggle is included there for consistency when those templates are wired in.
