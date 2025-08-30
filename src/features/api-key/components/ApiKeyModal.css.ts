import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xl,
})

export const description = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
})

export const note = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.text.secondary,
})

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
})

export const label = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.text.secondary,
})

export const input = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  backgroundColor: vars.color.background.quaternary,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.border.secondary}`,
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.sm,
  width: '100%',
  ':focus': {
    outline: 'none',
    borderColor: vars.color.brand.primary,
  },
})

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.md,
  marginTop: vars.spacing.lg,
})
