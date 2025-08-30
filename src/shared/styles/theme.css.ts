import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css'

// テーマコントラクトの定義
const colors = createThemeContract({
  background: {
    primary: null,
    secondary: null,
    tertiary: null,
    quaternary: null,
  },
  text: {
    primary: null,
    secondary: null,
    tertiary: null,
  },
  border: {
    primary: null,
    secondary: null,
  },
  brand: {
    primary: null,
    primaryHover: null,
  },
  error: {
    background: null,
    text: null,
    border: null,
  },
  warning: {
    text: null,
  },
})

// ダークテーマ
export const darkTheme = createTheme(colors, {
  background: {
    primary: '#1e1e1e',
    secondary: '#252526',
    tertiary: '#2d2d30',
    quaternary: '#3c3c3c',
  },
  text: {
    primary: '#d4d4d4',
    secondary: '#cccccc',
    tertiary: '#6e6e6e',
  },
  border: {
    primary: '#3e3e42',
    secondary: '#464647',
  },
  brand: {
    primary: '#0e639c',
    primaryHover: '#1177bb',
  },
  error: {
    background: '#5a1d1d',
    text: '#f48771',
    border: '#763c3c',
  },
  warning: {
    text: '#f48771',
  },
})

// ライトテーマ
export const lightTheme = createTheme(colors, {
  background: {
    primary: '#ffffff',
    secondary: '#f8f8f8',
    tertiary: '#e5e5e5',
    quaternary: '#dcdcdc',
  },
  text: {
    primary: '#1e1e1e',
    secondary: '#3c3c3c',
    tertiary: '#6e6e6e',
  },
  border: {
    primary: '#d0d0d0',
    secondary: '#c0c0c0',
  },
  brand: {
    primary: '#0066cc',
    primaryHover: '#0052a3',
  },
  error: {
    background: '#fff5f5',
    text: '#e53e3e',
    border: '#feb2b2',
  },
  warning: {
    text: '#dd6b20',
  },
})

// その他の固定値
export const vars = createGlobalTheme(':root', {
  color: colors,
  font: {
    system:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: '"Consolas", "Courier New", monospace',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
  },
  fontSize: {
    xs: '13px',
    sm: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
  },
  lineHeight: {
    normal: '1.5',
    relaxed: '1.6',
  },
  transition: {
    fast: '0.2s',
    normal: '0.3s',
  },
})
