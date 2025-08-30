import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'
import { media } from '../../../shared/styles/responsive'

export const explanationPanel = style({
  flex: 1,
  overflowY: 'auto',
  padding: vars.spacing.xl,
  backgroundColor: vars.color.background.secondary,
  '@media': {
    [media.tablet]: {
      height: '50vh',
    },
    [media.mobile]: {
      height: '45vh',
    },
  },
})

export const errorMessage = style({
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  backgroundColor: vars.color.error.background,
  color: vars.color.error.text,
  border: `1px solid ${vars.color.error.border}`,
  borderRadius: vars.borderRadius.sm,
  marginBottom: vars.spacing.lg,
  fontSize: vars.fontSize.sm,
})

export const loading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  color: vars.color.text.secondary,
  fontSize: vars.fontSize.lg,
})

export const emptyState = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  color: vars.color.text.tertiary,
  fontSize: vars.fontSize.lg,
  textAlign: 'center',
})
