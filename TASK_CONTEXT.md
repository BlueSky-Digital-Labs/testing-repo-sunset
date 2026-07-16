# TASK_CONTEXT: Verify and Enhance Dark Mode Implementation

## Ticket scope

Review and verify the Dark Mode feature across the `testing-repo-sunset` monorepo (React frontend + Django backend), enhance usability/persistence/accessibility where needed, add tests, and open a PR.

## Findings (pre-change)

- **Frontend:** Dark mode existed only via CSS `@media (prefers-color-scheme: dark)` and a partially defined `.dark` class in `theme.css`. There was **no** React state, **no** UI toggle, and **no** `localStorage` persistence.
- **Backend:** No user preference model or API for theme settings. The `User` model has no theme-related fields. This is acceptable for a client-side UI preference.

## Implementation decisions

1. **Client-side persistence only** — Theme preference is stored in `localStorage` under key `hd-theme` (`light` | `dark` | `system`). Default is `system` (follow OS). No backend migration or API was added; server persistence can be a follow-up if cross-device sync is required.
2. **`data-theme` + `.dark` on `<html>`** — Explicit user choices apply `data-theme` and toggle the `.dark` class. System mode respects `prefers-color-scheme` unless the user forces light (`data-theme="light"` blocks dark media-query overrides).
3. **FOUC prevention** — Inline script in `index.html` applies stored theme before React hydrates.
4. **Toggle placement** — Floating toggle on auth pages (login/register); labeled toggle in dashboard sidebar footer; toggle in app header when the header layout is used.
5. **Testing** — Added Vitest + Testing Library for frontend. Backend unchanged; existing Django tests still pass.

## Files changed

| File | Why |
|------|-----|
| `frontend/src/utils/theme.ts` | Theme helpers: read/write storage, apply classes, resolve system preference |
| `frontend/src/hooks/useTheme.tsx` | `ThemeProvider` + `useTheme` hook with system preference listener |
| `frontend/src/components/atoms/ThemeToggle/*` | Accessible toggle button (sun/moon icons, `aria-pressed`) |
| `frontend/src/main.tsx` | Wrap app with `ThemeProvider` |
| `frontend/index.html` | Anti-FOUC inline theme bootstrap script |
| `frontend/src/styles/theme.css` | Complete dark CSS variables for media query + explicit dark |
| `frontend/src/index.css` | Dark scrollbar/body styles aligned with theme attributes |
| `frontend/src/components/organisms/Header/*` | Theme toggle + CSS variable-based header colors |
| `frontend/src/components/organisms/Sidebar/*` | Theme toggle in sidebar footer |
| `frontend/src/pages/auth/LoginPage.tsx`, `RegisterPage.tsx` | Floating theme toggle on auth screens |
| `frontend/src/pages/auth/*.css`, `dashboard/DashboardPage.css`, `DashboardCard.css`, `DashboardLayout.css` | Dark styles work for explicit toggle, not only OS preference |
| `frontend/package.json`, `vitest.config.ts`, `frontend/Makefile` | Vitest test runner and `make test` target |
| `frontend/src/utils/theme.test.ts`, `ThemeToggle.test.tsx`, `src/test/setup.ts` | Unit/component tests for theme behavior |

## Verification

- `cd frontend && npm test` — 10 tests passing
- `cd frontend && npm run lint` — no errors (2 react-refresh warnings in `useTheme.tsx`)
- `cd frontend && npm run build` — production build succeeds
- `cd backend && PYTHONPATH=src python3 manage.py test authentication` — 5 tests passing (no backend code changes)

## Assumptions

- Theme is a **client-side** concern; authenticated users do not need server-synced theme yet.
- Toggling switches between resolved light/dark (does not expose a three-way system/light/dark picker in the UI; `system` is the default until the user toggles).
- Auth pages use a floating toggle because they do not render the shared `Header` component.

## Open questions / follow-ups

- Add `theme_preference` to the Django `User` model and profile PATCH endpoint if cross-device persistence is required.
- Consider a three-option control (System / Light / Dark) in a settings page.
- Migrate remaining hardcoded component colors to CSS variables for easier maintenance.
