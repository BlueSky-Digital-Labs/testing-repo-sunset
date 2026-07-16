import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import './DarkModeToggle.css'

interface DarkModeToggleProps {
  className?: string
  showLabel?: boolean
}

export const DarkModeToggle = ({ className = '', showLabel = true }: DarkModeToggleProps) => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className={`dark-mode-toggle ${className}`.trim()}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="dark-mode-toggle__track" aria-hidden="true">
        <span className={`dark-mode-toggle__thumb ${isDarkMode ? 'dark-mode-toggle__thumb--dark' : ''}`}>
          {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
        </span>
      </span>
      {showLabel && (
        <span className="dark-mode-toggle__label">
          {isDarkMode ? 'Dark mode' : 'Light mode'}
        </span>
      )}
    </button>
  )
}
