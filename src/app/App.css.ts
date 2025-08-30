import { style } from '@vanilla-extract/css'
import { vars } from '../shared/styles/theme.css'
import { media } from '../shared/styles/responsive'

export const app = style({
  display: 'flex',
  height: '100vh',
})

export const contentArea = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden',
})

export const mainContent = style({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
  '@media': {
    [media.tablet]: {
      flexDirection: 'column',
    },
  },
})

export const leftColumn = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
})

export const resizeHandle = style({
  width: '5px',
  backgroundColor: vars.color.border.primary,
  cursor: 'col-resize',
  flexShrink: 0,
  transition: `background-color ${vars.transition.fast}`,
  position: 'relative',
  ':hover': {
    backgroundColor: vars.color.border.secondary,
  },
  ':active': {
    backgroundColor: vars.color.brand.primary,
  },
  '@media': {
    [media.tablet]: {
      display: 'none',
    },
  },
})
