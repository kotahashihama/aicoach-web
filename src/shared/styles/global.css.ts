import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
})

globalStyle('body', {
  fontFamily: vars.font.system,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  backgroundColor: vars.color.background.primary,
  color: vars.color.text.primary,
})

globalStyle('#root', {
  height: '100vh',
  overflow: 'hidden',
})
