import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DarkModeToggle } from '@components/atoms/DarkModeToggle'
import { ThemeProvider } from '@/context/ThemeContext'

const renderDarkModeToggle = () =>
  render(
    <ThemeProvider>
      <DarkModeToggle />
    </ThemeProvider>,
  )

describe('DarkModeToggle', () => {
  it('renders in light mode by default when no preference is stored', () => {
    renderDarkModeToggle()

    const toggle = screen.getByRole('switch', { name: 'Switch to dark mode' })

    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(screen.getByText('Light mode')).toBeInTheDocument()
  })

  it('toggles to dark mode and applies the dark class', async () => {
    const user = userEvent.setup()
    renderDarkModeToggle()

    const toggle = screen.getByRole('switch', { name: 'Switch to dark mode' })
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(toggle).toHaveAttribute('aria-label', 'Switch to light mode')
    expect(document.documentElement).toHaveClass('dark')
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
    expect(window.localStorage.getItem('hd-theme')).toBe('dark')
  })

  it('restores the saved theme from localStorage', () => {
    window.localStorage.setItem('hd-theme', 'dark')

    renderDarkModeToggle()

    const toggle = screen.getByRole('switch', { name: 'Switch to light mode' })

    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('toggles back to light mode and removes the dark class', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem('hd-theme', 'dark')

    renderDarkModeToggle()

    const toggle = screen.getByRole('switch', { name: 'Switch to light mode' })
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(window.localStorage.getItem('hd-theme')).toBe('light')
  })
})
