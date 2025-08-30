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
  marginTop: vars.spacing.lg,
  marginBottom: vars.spacing.sm,
  paddingBottom: vars.spacing.sm,
  borderBottom: `1px solid ${vars.color.border.primary}`,
})

globalStyle(`${markdownContent} ul`, {
  listStyle: 'disc',
  paddingLeft: vars.spacing.xl,
  margin: `${vars.spacing.md} 0`,
})

globalStyle(`${markdownContent} ol`, {
  listStyle: 'decimal',
  paddingLeft: vars.spacing.xl,
  margin: `${vars.spacing.md} 0`,
})

globalStyle(`${markdownContent} li`, {
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.relaxed,
  padding: `${vars.spacing.xs} 0`,
})

globalStyle(`${markdownContent} pre`, {
  margin: `${vars.spacing.md} 0`,
})

globalStyle(`${markdownContent} :not(pre) > code`, {
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  backgroundColor: vars.color.background.tertiary,
  padding: `2px 4px`,
  borderRadius: vars.borderRadius.sm,
  color: vars.color.text.primary,
})

globalStyle(`${markdownContent} p`, {
  margin: `${vars.spacing.sm} 0`,
})
