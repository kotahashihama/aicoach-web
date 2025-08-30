import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

const selectBase = style({
  backgroundColor: vars.color.background.quaternary,
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.border.secondary}`,
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.sm,
  cursor: 'pointer',
  transition: `all ${vars.transition.fast}`,
  ':hover': {
    backgroundColor: vars.color.background.tertiary,
    borderColor: vars.color.border.primary,
  },
  ':focus': {
    outline: 'none',
    borderColor: vars.color.brand.primary,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const select = style([
  selectBase,
  {
    padding: `4px ${vars.spacing.sm}`,
    height: '28px',
  },
])

export const selectCompact = style([
  selectBase,
  {
    padding: `4px ${vars.spacing.xs}`,
    height: '28px',
    fontSize: vars.fontSize.xs,
  },
])
