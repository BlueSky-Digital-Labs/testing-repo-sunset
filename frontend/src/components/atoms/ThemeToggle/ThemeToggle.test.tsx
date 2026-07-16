import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { ThemeProvider } from '@hooks/useTheme'
import { ThemeToggle } from '@components/atoms/ThemeToggle'
import { THEME_STORAGE_KEY } from '@utils/theme'

function renderThemeToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  afterEach(() => {
    cleanup()
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  })
  it('renders with an accessible label for the current theme', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light')
    renderThemeToggle()

    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })

  it('toggles theme preference and updates aria state', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light')
    const user = userEvent.setup()
    renderThemeToggle()

    const toggle = screen.getByRole('button', { name: 'Switch to dark mode' })
    await user.click(toggle)

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })
})
