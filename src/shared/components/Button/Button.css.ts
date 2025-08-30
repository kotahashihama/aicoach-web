import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: vars.borderRadius.sm,
  fontWeight: '500',
  cursor: 'pointer',
  transition: `all ${vars.transition.fast}`,
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  ':focus': {
    outline: `2px solid ${vars.color.brand.primary}`,
    outlineOffset: '2px',
  },
})

export const variants = styleVariants({
  primary: {
    backgroundColor: vars.color.brand.primary,
    color: 'white',
    selectors: {
      '&:not(:disabled):hover': {
        backgroundColor: vars.color.brand.primaryHover,
      },
      '&:not(:disabled):active': {
        transform: 'translateY(1px)',
      },
    },
  },
  secondary: {
    backgroundColor: vars.color.background.quaternary,
    color: vars.color.text.secondary,
    border: `1px solid ${vars.color.border.secondary}`,
    selectors: {
      '&:not(:disabled):hover': {
        backgroundColor: vars.color.background.tertiary,
        borderColor: vars.color.border.primary,
      },
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.color.text.secondary,
    selectors: {
      '&:not(:disabled):hover': {
        backgroundColor: vars.color.background.secondary,
      },
    },
  },
})

export const sizes = styleVariants({
  sm: {
    padding: `3px ${vars.spacing.sm}`,
    fontSize: vars.fontSize.xs,
    height: '24px',
  },
  md: {
    padding: `4px ${vars.spacing.md}`,
    fontSize: vars.fontSize.xs,
    height: '28px',
  },
  lg: {
    padding: `6px ${vars.spacing.lg}`,
    fontSize: vars.fontSize.sm,
    height: '36px',
  },
})

export const fullWidth = style({
  width: '100%',
})

export const styles = {
  button,
  variants,
  sizes,
  fullWidth,
}