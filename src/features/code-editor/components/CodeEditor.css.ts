import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/styles/theme.css'
import { media } from '../../../shared/styles/responsive'

export const editorPanel = style({
  flex: 1,
  overflow: 'hidden',
  transition: `opacity ${vars.transition.fast}`,
  '@media': {
    [media.tablet]: {
      borderBottom: `1px solid ${vars.color.border.primary}`,
      height: '50vh',
    },
    [media.mobile]: {
      height: '45vh',
    },
  },
})

export const editorPanelDisabled = style({
  opacity: 0.5,
  pointerEvents: 'none',
})
