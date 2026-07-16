import { render, type RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@store/slices/authSlice'
import { ThemeProvider } from '@/context/ThemeContext'

interface TestProviderOptions {
  isAuthenticated?: boolean
  email?: string
  initialRoute?: string
}

const createTestStore = (isAuthenticated = true, email = 'user@example.com') =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: isAuthenticated ? { id: 1, email, date_joined: '2025-01-01', is_active: true } : null,
        token: isAuthenticated ? 'test-token' : null,
        isAuthenticated,
        isLoading: false,
        error: null,
      },
    },
  })

interface WrapperProps {
  children: ReactNode
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    isAuthenticated = true,
    email = 'user@example.com',
    initialRoute = '/',
    ...renderOptions
  }: TestProviderOptions & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const store = createTestStore(isAuthenticated, email)

  const Wrapper = ({ children }: WrapperProps) => (
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
