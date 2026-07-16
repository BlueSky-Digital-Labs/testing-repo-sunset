export type Theme = 'light' | 'dark' | 'system'

export const THEME_STORAGE_KEY = 'hd-theme'

const VALID_THEMES: Theme[] = ['light', 'dark', 'system']

export function isValidTheme(value: string | null): value is Theme {
  return value !== null && VALID_THEMES.includes(value as Theme)
}

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'system'
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isValidTheme(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore storage failures (private browsing, quota exceeded, etc.)
  }
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme
}

export function applyTheme(theme: Theme): 'light' | 'dark' {
  const root = document.documentElement
  const resolved = resolveTheme(theme)

  root.setAttribute('data-theme', theme)
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = theme === 'system' ? 'light dark' : resolved

  return resolved
}

export function initTheme(): Theme {
  const theme = getStoredTheme()
  applyTheme(theme)
  return theme
}

export function toggleTheme(current: Theme): Theme {
  const resolved = resolveTheme(current)
  return resolved === 'dark' ? 'light' : 'dark'
}
