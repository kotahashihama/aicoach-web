import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'

export const promptInputContainer = style({
  padding: vars.spacing.sm,
  backgroundColor: vars.color.background.secondary,
  borderTop: `1px solid ${vars.color.border.primary}`,
  transition: `opacity ${vars.transition.fast}`,
})

export const promptInputContainerLoading = style({
  opacity: 0.6,
  pointerEvents: 'none',
})

export const promptInputWrapper = style({
  display: 'flex',
  gap: vars.spacing.sm,
  alignItems: 'flex-start',
})

export const promptTextarea = style({
  flex: 1,
  padding: vars.spacing.sm,
  backgroundColor: vars.color.background.primary,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.border.primary}`,
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.sm,
  fontFamily: vars.font.system,
  resize: 'none',
  minHeight: '36px',
  maxHeight: '100px',
  lineHeight: 1.5,
  transition: 'border-color 0.2s ease',
  
  ':focus': {
    outline: 'none',
    borderColor: vars.color.brand.primary,
  },
  
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  
  '::placeholder': {
    color: vars.color.text.tertiary,
  },
})

export const generateButton = style({
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,
  backgroundColor: vars.color.brand.primary,
  color: 'white',
  border: 'none',
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  height: '32px',
  
  ':hover': {
    opacity: 0.9,
  },
  
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const promptHint = style({
  marginTop: vars.spacing.xs,
  fontSize: vars.fontSize.xs,
  color: vars.color.text.tertiary,
})