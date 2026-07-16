# Task Context: UI Enhancements & Dark Mode

## Ticket Scope

Frontend-only work in `frontend/` for the React (Vite) application. This branch includes:

1. **Dark Mode** — user-controlled theme toggle with persistence
2. **UI Enhancements** — settings page, shared page header, theme-consistent dashboard styling, and subtle page transitions

The Django backend is out of scope.

---

## Dark Mode (prior work)

### Key decisions
- `ThemeProvider` stores preference in `localStorage` (`hd-theme`), falls back to system `prefers-color-scheme`, applies `dark` class to `<html>`
- `DarkModeToggle` atom with accessible `role="switch"` semantics
- Toggle locations: auth pages, dashboard sidebar, header (for future `Layout` use)

---

## UI Enhancements (this task)

### Key Implementation Decisions

1. **Settings page (`/settings`)** — Wired the existing sidebar "Settings" nav item to a new protected route. The page uses `DashboardLayout` and presents Appearance (dark mode toggle) and Account (email) sections in card-style panels.

2. **Shared `PageHeader` molecule** — Extracted a reusable page header (title, subtitle, optional action slot) used on Dashboard and Settings for consistent hierarchy and spacing.

3. **Theme-variable migration** — Replaced hard-coded colors in dashboard cards, jobs table, auth form accents, and layout backgrounds with CSS custom properties so light/dark mode works via the user toggle (not only `prefers-color-scheme` media queries).

4. **Subtle motion** — Added a `page-enter` fade/slide animation on dashboard content areas for smoother navigation feel.

5. **Testing** — Added Vitest coverage for `PageHeader`, `SettingsPage`, and `/settings` route protection. Reused a `renderWithProviders` test helper for Redux + Router + Theme setup.

### Files Changed (UI enhancements)

| File | Why |
|------|-----|
| `frontend/src/pages/settings/*` | New Settings page, styles, and tests |
| `frontend/src/components/molecules/PageHeader/*` | Reusable page header component and tests |
| `frontend/src/App.tsx` | Register `/settings` protected route |
| `frontend/src/pages/dashboard/DashboardPage.tsx` | Adopt `PageHeader`, add page-enter class |
| `frontend/src/pages/dashboard/DashboardPage.css` | Theme variables for table/section styling |
| `frontend/src/components/molecules/DashboardCard/DashboardCard.css` | Theme variables for stat cards |
| `frontend/src/components/templates/DashboardLayout/DashboardLayout.css` | Theme background + content animation |
| `frontend/src/pages/auth/LoginPage.css` | Theme variables for form/error/footer |
| `frontend/src/index.css` | Shared `page-enter` keyframes |
| `frontend/src/content/index.ts` | Settings page copy |
| `frontend/src/hooks/useContent.ts` | `useSettingsContent` hook |
| `frontend/src/test/renderWithProviders.tsx` | Shared test render helper |
| `frontend/src/App.test.tsx` | Route protection test for settings |

### Files Changed (dark mode — prior)

| File | Why |
|------|-----|
| `frontend/src/context/ThemeContext.tsx` | Theme provider and hook |
| `frontend/src/components/atoms/DarkModeToggle/*` | Toggle UI component and tests |
| `frontend/src/main.tsx` | Wrap app with `ThemeProvider` |
| `frontend/src/pages/auth/LoginPage.tsx`, `RegisterPage.tsx` | Auth-page toggle placement |
| `frontend/src/components/organisms/Sidebar/Sidebar.tsx` | Sidebar toggle placement |
| `frontend/src/components/organisms/Header/Header.tsx` | Header toggle placement |
| `frontend/src/styles/theme.css`, `index.css` | Dark theme variable overrides |

## Verification

- `npm test` — 10 tests passing
- `npm run lint` — no errors (one pre-existing warning on `ThemeContext` export)
- `npm run build` — TypeScript + Vite build successful

## Open Questions / Follow-ups

- Other sidebar links (Jobs, Calendar, etc.) still have no routes; Settings is the first non-dashboard route wired up.
- Dashboard and sidebar both expose the dark mode toggle; Settings centralizes appearance preferences for users who navigate there.
- Remaining sidebar menu pages could adopt `PageHeader` and the settings card pattern when implemented.
