import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

describe('useTheme', () => {
  it('provides theme state and toggles the document class', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('light')
    expect(result.current.isDarkMode).toBe(false)
    expect(document.documentElement).not.toHaveClass('dark')

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(result.current.isDarkMode).toBe(true)
    expect(document.documentElement).toHaveClass('dark')
    expect(window.localStorage.getItem('hd-theme')).toBe('dark')
  })
})
