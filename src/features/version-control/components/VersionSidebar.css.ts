import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'

export const sidebar = style({
  width: '200px',
  backgroundColor: vars.color.background.secondary,
  borderRight: `1px solid ${vars.color.border.primary}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  transition: `width ${vars.transition.normal}`,
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: vars.spacing.md,
  borderBottom: `1px solid ${vars.color.border.primary}`,
})

export const title = style({
  fontSize: vars.fontSize.md,
  fontWeight: '600',
  color: vars.color.text.secondary,
  margin: 0,
})

export const versionList = style({
  flex: 1,
  overflowY: 'auto',
  padding: vars.spacing.sm,
})

export const versionItem = style({
  width: '100%',
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: vars.borderRadius.sm,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: vars.spacing.xs,
  transition: `background-color ${vars.transition.fast}`,
  ':hover': {
    backgroundColor: vars.color.background.tertiary,
  },
})

export const versionItemActive = style({
  backgroundColor: vars.color.background.quaternary,
  ':hover': {
    backgroundColor: vars.color.background.quaternary,
  },
})

export const versionId = style({
  fontSize: vars.fontSize.sm,
  fontWeight: '500',
  color: vars.color.text.primary,
})

export const versionDate = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.text.tertiary,
})

export const sidebarClosed = style({
  width: '0',
  overflow: 'hidden',
  transition: `width ${vars.transition.normal}`,
})

export const sidebarToggle = style({
  position: 'fixed',
  left: '0',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: vars.color.background.secondary,
  borderRight: `1px solid ${vars.color.border.primary}`,
  borderTop: `1px solid ${vars.color.border.primary}`,
  borderBottom: `1px solid ${vars.color.border.primary}`,
  borderTopRightRadius: vars.borderRadius.sm,
  borderBottomRightRadius: vars.borderRadius.sm,
})