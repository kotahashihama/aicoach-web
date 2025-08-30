import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'

const slideIn = keyframes({
  from: {
    transform: 'translateY(100%)',
    opacity: 0,
  },
  to: {
    transform: 'translateY(0)',
    opacity: 1,
  },
})

const baseSnackbar = style({
  position: 'fixed',
  bottom: vars.spacing.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  borderRadius: vars.borderRadius.md,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
  animation: `${slideIn} 0.3s ease-out`,
  zIndex: 1000,
  minWidth: '300px',
  maxWidth: '500px',
})

export const snackbar = baseSnackbar

export const info = style({
  backgroundColor: vars.color.background.tertiary,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.border.primary}`,
})

export const warning = style({
  backgroundColor: vars.color.background.tertiary,
  color: vars.color.warning.text,
  border: `1px solid ${vars.color.warning.text}`,
})

export const error = style({
  backgroundColor: vars.color.error.background,
  color: vars.color.error.text,
  border: `1px solid ${vars.color.error.border}`,
})

export const success = style({
  backgroundColor: vars.color.background.tertiary,
  color: vars.color.brand.primary,
  border: `1px solid ${vars.color.brand.primary}`,
})

export const message = style({
  flex: 1,
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.normal,
})

export const closeButton = style({
  background: 'none',
  border: 'none',
  color: 'inherit',
  fontSize: vars.fontSize.md,
  cursor: 'pointer',
  padding: vars.spacing.xs,
  opacity: 0.7,
  transition: `opacity ${vars.transition.fast}`,
  
  ':hover': {
    opacity: 1,
  },
})