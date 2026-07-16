import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageHeader } from '@components/molecules/PageHeader'

describe('PageHeader', () => {
  it('renders the title and subtitle', () => {
    render(<PageHeader title="Dashboard" subtitle="Overview of your workspace" />)

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByText('Overview of your workspace')).toBeInTheDocument()
  })

  it('renders optional action content', () => {
    render(
      <PageHeader
        title="Settings"
        action={<button type="button">Save</button>}
      />,
    )

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})
