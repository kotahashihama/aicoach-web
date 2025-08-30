import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'
import { media } from '../../../shared/styles/responsive'

export const toolbar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `10px ${vars.spacing.md}`,
  backgroundColor: vars.color.background.tertiary,
  borderBottom: `1px solid ${vars.color.border.primary}`,
  gap: vars.spacing.md,
  flexShrink: 0,
  minHeight: '48px',
  '@media': {
    [media.wide]: {
      flexWrap: 'wrap',
      padding: '10px',
      gap: vars.spacing.sm,
    },
    [media.tablet]: {
      flexWrap: 'wrap',
      gap: vars.spacing.sm,
      padding: '10px',
    },
  },
})

export const toolbarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexWrap: 'wrap',
  flex: 1,
  '@media': {
    [media.wide]: {
      width: '100%',
      justifyContent: 'flex-start',
      gap: vars.spacing.sm,
    },
    [media.tablet]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: vars.spacing.sm,
    },
  },
})

export const toolbarRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexShrink: 0,
  '@media': {
    [media.tablet]: {
      marginLeft: 'auto',
    },
  },
})

export const selectorsGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexWrap: 'wrap',
  '@media': {
    [media.desktop]: {
      gap: vars.spacing.xs,
    },
    [media.tablet]: {
      width: '100%',
      gap: vars.spacing.xs,
    },
    [media.mobile]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: vars.spacing.xs,
    },
  },
})

export const buttonsGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexWrap: 'wrap',
  '@media': {
    [media.desktop]: {
      gap: vars.spacing.xs,
    },
    [media.tablet]: {
      width: '100%',
      gap: vars.spacing.xs,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
})

const selectorBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
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
  fontSize: vars.fontSize.xs,
  color: vars.color.text.secondary,
  whiteSpace: 'nowrap',
})

// 削除（Select コンポーネントを使用）

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
    [media.tablet]: {
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

// 差分解説コントロール
export const diffControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexShrink: 0,
  '@media': {
    [media.desktop]: {
      flexWrap: 'wrap',
      gap: vars.spacing.xs,
    },
    [media.tablet]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: vars.spacing.xs,
    },
  },
})

export const diffSelectors = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexShrink: 0,
  '@media': {
    [media.tablet]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
})

export const diffSelector = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
})

export const diffLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.text.secondary,
})

// 削除（Select コンポーネントを使用）

export const diffArrow = style({
  color: vars.color.text.tertiary,
  fontSize: vars.fontSize.sm,
})

export const settingsButton = style({
  padding: vars.spacing.sm,
  minWidth: 'auto',
})

export const divider = style({
  width: '1px',
  height: '20px',
  backgroundColor: vars.color.border.primary,
  alignSelf: 'center',
  '@media': {
    [media.tablet]: {
      display: 'none',
    },
  },
})