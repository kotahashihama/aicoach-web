import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'
import { Theme } from '../../../shared/types'
import { darkTheme, lightTheme } from '../../../shared/styles/theme.css'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    const initialTheme = (saved as Theme) || 'dark'

    // 初期テーマクラスを設定
    const root = document.documentElement
    if (initialTheme === 'dark') {
      root.classList.add(darkTheme)
    } else {
      root.classList.add(lightTheme)
    }

    return initialTheme
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)

    // テーマクラスを適用
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.remove(lightTheme)
      root.classList.add(darkTheme)
    } else {
      root.classList.remove(darkTheme)
      root.classList.add(lightTheme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
