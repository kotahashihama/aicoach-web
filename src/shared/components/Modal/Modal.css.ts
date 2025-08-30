import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
})

export const modal = style({
  backgroundColor: vars.color.background.secondary,
  borderRadius: vars.borderRadius.md,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: vars.spacing.lg,
  borderBottom: `1px solid ${vars.color.border.primary}`,
})

export const title = style({
  fontSize: vars.fontSize.xl,
  fontWeight: '600',
  color: vars.color.text.primary,
  margin: 0,
})

export const closeButton = style({
  background: 'none',
  border: 'none',
  color: vars.color.text.secondary,
  fontSize: vars.fontSize.lg,
  cursor: 'pointer',
  padding: vars.spacing.sm,
  borderRadius: vars.borderRadius.sm,
  transition: `all ${vars.transition.fast}`,
  ':hover': {
    backgroundColor: vars.color.background.tertiary,
  },
})

export const content = style({
  padding: vars.spacing.lg,
  overflowY: 'auto',
})
