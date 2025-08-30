import { style } from '@vanilla-extract/css'
import { media } from '../shared/styles/responsive'

export const app = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
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
  flex: 1,
  overflow: 'hidden',
})
