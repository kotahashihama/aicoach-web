import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'

export const explanation = style({
  color: vars.color.text.primary,
})

export const explanationSection = style({
  marginBottom: vars.spacing.lg,
})

export const sectionTitle = style({
  fontSize: vars.fontSize.xl,
  fontWeight: '600',
  color: vars.color.text.secondary,
  marginBottom: vars.spacing.sm,
  paddingBottom: vars.spacing.sm,
  borderBottom: `1px solid ${vars.color.border.primary}`,
})

export const summary = style({
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
  color: vars.color.text.primary,
})

export const constructsList = style({
  listStyle: 'disc',
  paddingLeft: vars.spacing.xl,
  margin: `${vars.spacing.md} 0`,
})

export const pitfallsList = style({
  listStyle: 'disc',
  paddingLeft: vars.spacing.xl,
  margin: `${vars.spacing.md} 0`,
})

export const constructsListItem = style({
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.relaxed,
  padding: `${vars.spacing.xs} 0`,
})

export const pitfallsListItem = style({
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.relaxed,
  padding: `${vars.spacing.xs} 0`,
  color: vars.color.warning.text,
})

export const alternativeCode = style({
  backgroundColor: vars.color.background.primary,
  border: `1px solid ${vars.color.border.primary}`,
  borderRadius: vars.borderRadius.sm,
  padding: vars.spacing.lg,
  overflowX: 'auto',
})

export const codeBlock = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  lineHeight: vars.lineHeight.normal,
  color: vars.color.text.primary,
  whiteSpace: 'pre',
})
