import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'
import { media } from '../../../shared/styles/responsive'

export const toolbar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.spacing.md} ${vars.spacing.xl}`,
  backgroundColor: vars.color.background.tertiary,
  borderBottom: `1px solid ${vars.color.border.primary}`,
  gap: vars.spacing.lg,
  flexShrink: 0,
  minHeight: '60px',
  '@media': {
    [media.wide]: {
      flexWrap: 'wrap',
      padding: vars.spacing.md,
    },
    [media.tablet]: {
      gap: vars.spacing.md,
    },
  },
})

export const toolbarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.lg,
  flexWrap: 'wrap',
  flex: 1,
  '@media': {
    [media.wide]: {
      width: '100%',
      justifyContent: 'flex-start',
    },
    [media.tablet]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: vars.spacing.md,
    },
  },
})

export const toolbarRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.lg,
  flexShrink: 0,
  '@media': {
    [media.wide]: {
      width: '100%',
      marginTop: vars.spacing.sm,
    },
  },
})

export const selectorsGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  '@media': {
    [media.desktop]: {
      gap: vars.spacing.sm,
    },
    [media.tablet]: {
      width: '100%',
      justifyContent: 'space-between',
    },
    [media.mobile]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: vars.spacing.sm,
    },
  },
})

export const buttonsGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  '@media': {
    [media.desktop]: {
      gap: '6px',
    },
  },
})

const selectorBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  '@media': {
    [media.mobile]: {
      width: '100%',
    },
  },
})

export const languageSelector = selectorBase
export const levelSelector = selectorBase
export const toneSelector = selectorBase

export const selectorLabel = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.text.secondary,
  whiteSpace: 'nowrap',
})

export const select = style({
  padding: `6px ${vars.spacing.md}`,
  backgroundColor: vars.color.background.quaternary,
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.border.secondary}`,
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.sm,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.border.secondary,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '@media': {
    [media.mobile]: {
      width: '100%',
    },
  },
})

const buttonBase = style({
  padding: `6px ${vars.spacing.lg}`,
  fontSize: vars.fontSize.sm,
  border: 'none',
  borderRadius: vars.borderRadius.sm,
  cursor: 'pointer',
  transition: `all ${vars.transition.fast}`,
  fontWeight: '500',
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '@media': {
    [media.desktop]: {
      padding: `6px ${vars.spacing.md}`,
      fontSize: vars.fontSize.xs,
    },
  },
})

export const btnPrimary = style([
  buttonBase,
  {
    backgroundColor: vars.color.brand.primary,
    color: 'white',
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.brand.primaryHover,
      },
    },
  },
])

export const btnSecondary = style([
  buttonBase,
  {
    backgroundColor: vars.color.background.quaternary,
    color: vars.color.text.secondary,
    border: `1px solid ${vars.color.border.secondary}`,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.border.secondary,
      },
    },
  },
])

export const apiKeyInput = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  '@media': {
    [media.wide]: {
      width: '100%',
    },
    [media.mobile]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: vars.spacing.xs,
    },
  },
})

export const apiKeyLabel = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.text.secondary,
  whiteSpace: 'nowrap',
  '@media': {
    [media.mobile]: {
      fontSize: vars.fontSize.xs,
    },
  },
})

export const apiKeyInputField = style({
  padding: `6px ${vars.spacing.md}`,
  backgroundColor: vars.color.background.quaternary,
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.border.secondary}`,
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.sm,
  width: '300px',
  maxWidth: '100%',
  ':focus': {
    outline: 'none',
    borderColor: vars.color.brand.primary,
  },
  '@media': {
    [media.wide]: {
      flex: 1,
    },
    [media.mobile]: {
      width: '100%',
      fontSize: vars.fontSize.xs,
    },
  },
})
