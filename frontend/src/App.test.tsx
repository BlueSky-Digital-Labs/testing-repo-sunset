import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@store/slices/authSlice'
import { ThemeProvider } from '@/context/ThemeContext'
import App from '@/App'

const renderApp = (isAuthenticated = false) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: isAuthenticated ? { id: 1, email: 'user@example.com', date_joined: '2025-01-01', is_active: true } : null,
        token: isAuthenticated ? 'token' : null,
        isAuthenticated,
        isLoading: false,
        error: null,
      },
    },
  })

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  )
}

describe('App routing', () => {
  it('redirects unauthenticated users away from settings', () => {
    renderApp(false)

    expect(screen.queryByRole('heading', { name: 'Settings' })).not.toBeInTheDocument()
  })
})
