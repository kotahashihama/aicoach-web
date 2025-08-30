import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'
import { media } from '../../../shared/styles/responsive'

export const editorPanel = style({
  flex: 1,
  overflow: 'hidden',
  borderRight: `1px solid ${vars.color.border.primary}`,
  transition: `opacity ${vars.transition.fast}`,
  '@media': {
    [media.tablet]: {
      borderRight: 'none',
      borderBottom: `1px solid ${vars.color.border.primary}`,
      height: '50vh',
    },
    [media.mobile]: {
      height: '45vh',
    },
  },
})

export const editorPanelDisabled = style({
  opacity: 0.7,
  pointerEvents: 'none',
})
