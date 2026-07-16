import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@hooks/useTheme'
import './ThemeToggle.css'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export const ThemeToggle = ({ className = '', showLabel = false }: ThemeToggleProps) => {
  const { resolvedTheme, toggleDarkMode } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleDarkMode}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      {showLabel && (
        <span className="theme-toggle__label">{isDark ? 'Light mode' : 'Dark mode'}</span>
      )}
    </button>
  )
}
