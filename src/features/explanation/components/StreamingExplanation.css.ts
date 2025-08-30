import { style, keyframes, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'

export const explanationStreaming = style({
  color: vars.color.text.primary,
})

export const markdownContent = style({
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
})

const blinkAnimation = keyframes({
  '0%, 50%': { opacity: 1 },
  '51%, 100%': { opacity: 0 },
})

export const cursorBlink = style({
  animation: `${blinkAnimation} 1s infinite`,
  color: vars.color.text.secondary,
  fontWeight: 'normal',
})

// Markdown要素のスタイリング
globalStyle(`${markdownContent} h2`, {
  fontSize: vars.fontSize.xl,
  fontWeight: '600',
  color: vars.color.text.secondary,
  marginTop: vars.spacing.xxl,
  marginBottom: vars.spacing.md,
  paddingBottom: vars.spacing.sm,
  borderBottom: `1px solid ${vars.color.border.primary}`,
})

globalStyle(`${markdownContent} ul`, {
  listStyle: 'none',
  padding: 0,
  margin: `${vars.spacing.lg} 0`,
})

globalStyle(`${markdownContent} li`, {
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.relaxed,
  padding: `${vars.spacing.sm} 0`,
  paddingLeft: vars.spacing.xl,
  position: 'relative',
})

globalStyle(`${markdownContent} li::before`, {
  content: '"▸"',
  position: 'absolute',
  left: 0,
  color: vars.color.brand.primary,
})

globalStyle(`${markdownContent} pre`, {
  backgroundColor: vars.color.background.primary,
  border: `1px solid ${vars.color.border.primary}`,
  borderRadius: vars.borderRadius.sm,
  padding: vars.spacing.lg,
  overflowX: 'auto',
  margin: `${vars.spacing.lg} 0`,
})

globalStyle(`${markdownContent} code`, {
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  lineHeight: vars.lineHeight.normal,
  color: vars.color.text.primary,
})

globalStyle(`${markdownContent} p`, {
  margin: `${vars.spacing.md} 0`,
})
