import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'

export const sidebar = style({
  position: 'relative',
  width: '160px',
  backgroundColor: vars.color.background.secondary,
  borderRight: `1px solid ${vars.color.border.primary}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  transition: `transform ${vars.transition.normal}, width ${vars.transition.normal}`,
  transform: 'translateX(0)',
  overflow: 'hidden',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: vars.spacing.sm,
  borderBottom: `1px solid ${vars.color.border.primary}`,
  flexShrink: 0,
})

export const title = style({
  fontSize: vars.fontSize.sm,
  fontWeight: '600',
  color: vars.color.text.secondary,
  margin: 0,
  whiteSpace: 'nowrap',
})

export const versionList = style({
  flex: 1,
  overflowY: 'auto',
  padding: vars.spacing.xs,
})

export const versionItem = style({
  width: '100%',
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: vars.borderRadius.sm,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
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
  fontSize: vars.fontSize.xs,
  fontWeight: '500',
  color: vars.color.text.primary,
  whiteSpace: 'nowrap',
})

export const versionDate = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.text.tertiary,
  whiteSpace: 'nowrap',
})

export const sidebarClosed = style({
  width: '0',
  transform: 'translateX(-160px)',
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
  transition: `opacity ${vars.transition.fast}`,
})
