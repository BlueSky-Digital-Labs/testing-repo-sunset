import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  initTheme,
  resolveTheme,
  setStoredTheme,
  toggleTheme,
  type Theme,
} from '@utils/theme'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    resolveTheme(getStoredTheme())
  )

  const setTheme = useCallback((nextTheme: Theme) => {
    setStoredTheme(nextTheme)
    setThemeState(nextTheme)
    setResolvedTheme(applyTheme(nextTheme))
  }, [])

  const toggleDarkMode = useCallback(() => {
    setTheme(toggleTheme(theme))
  }, [setTheme, theme])

  useEffect(() => {
    initTheme()
    setThemeState(getStoredTheme())
    setResolvedTheme(resolveTheme(getStoredTheme()))
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemChange = () => {
      if (theme !== 'system') {
        return
      }

      setResolvedTheme(applyTheme('system'))
    }

    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleDarkMode,
    }),
    [theme, resolvedTheme, setTheme, toggleDarkMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export function useSystemTheme(): 'light' | 'dark' {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      setSystemTheme(getSystemTheme())
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return systemTheme
}
