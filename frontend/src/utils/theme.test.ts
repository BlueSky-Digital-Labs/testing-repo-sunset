import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  THEME_STORAGE_KEY,
  applyTheme,
  getStoredTheme,
  initTheme,
  isValidTheme,
  resolveTheme,
  setStoredTheme,
  toggleTheme,
} from '@utils/theme'

describe('theme utilities', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = ''
  })

  it('validates theme values', () => {
    expect(isValidTheme('light')).toBe(true)
    expect(isValidTheme('dark')).toBe(true)
    expect(isValidTheme('system')).toBe(true)
    expect(isValidTheme('invalid')).toBe(false)
    expect(isValidTheme(null)).toBe(false)
  })

  it('defaults to system when storage is empty or invalid', () => {
    expect(getStoredTheme()).toBe('system')
    localStorage.setItem(THEME_STORAGE_KEY, 'invalid')
    expect(getStoredTheme()).toBe('system')
  })

  it('persists theme preference in localStorage', () => {
    setStoredTheme('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(getStoredTheme()).toBe('dark')
  })

  it('applies dark theme attributes to the document root', () => {
    const resolved = applyTheme('dark')

    expect(resolved).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('applies light theme and removes dark class', () => {
    applyTheme('dark')
    const resolved = applyTheme('light')

    expect(resolved).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  it('resolves system theme from matchMedia', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    expect(resolveTheme('system')).toBe('dark')
    expect(applyTheme('system')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles between light and dark based on resolved theme', () => {
    expect(toggleTheme('light')).toBe('dark')
    expect(toggleTheme('dark')).toBe('light')
    expect(toggleTheme('system')).toBe(resolveTheme('system') === 'dark' ? 'light' : 'dark')
  })

  it('initializes theme from storage', () => {
    setStoredTheme('dark')
    expect(initTheme()).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
