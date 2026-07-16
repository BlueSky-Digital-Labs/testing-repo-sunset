import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import SettingsPage from '@pages/settings/SettingsPage'
import { renderWithProviders } from '@/test/renderWithProviders'

describe('SettingsPage', () => {
  it('renders settings sections and account details', () => {
    renderWithProviders(<SettingsPage />, {
      initialRoute: '/settings',
      email: 'jane@example.com',
    })

    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
    expect(screen.getByText('Manage your preferences and account')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Appearance' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Account' })).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('includes a working dark mode toggle', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SettingsPage />, { initialRoute: '/settings' })

    const appearanceSection = screen.getByRole('heading', { name: 'Appearance' }).closest('section')!
    const toggle = within(appearanceSection).getByRole('switch', { name: 'Switch to dark mode' })
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement).toHaveClass('dark')
  })
})
