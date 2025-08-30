/**
 * レスポンシブデザイン用のブレークポイント
 */
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1200,
} as const

/**
 * メディアクエリヘルパー
 */
export const media = {
  mobile: `screen and (max-width: ${breakpoints.mobile}px)`,
  tablet: `screen and (max-width: ${breakpoints.tablet}px)`,
  desktop: `screen and (max-width: ${breakpoints.desktop}px)`,
  wide: `screen and (max-width: ${breakpoints.wide}px)`,
} as const
