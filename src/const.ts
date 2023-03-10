/*
 * @Author: Carlos
 * @Date: 2022-12-30 00:41:32
 * @LastEditTime: 2023-01-09 22:02:47
 * @FilePath: /vite-react-swc/src/const.ts
 * @Description:
 */

export const isMobile = document.documentElement.offsetWidth < 500

export const HOME_HEADER_HEIGHT = `${56 / 16}rem`
export const HOME_FOOTER_HEIGHT = `${100 / 16}rem`

export const STORE_KEYS = {
  MUSIC_CURRENT: 'current-music'
} as const

export const EVENT_KEYS = {
  MUSIC_PLAYER_STATE_TO_PLAY: 'MUSIC_PLAYER_STATE_TO_PLAY',
  MUSIC_PLAYER_STATE_TO_PAUSE: 'MUSIC_PLAYER_STATE_TO_PAUSE',
  MUSIC_PLAYER_CAN_PLAY: 'MUSIC_PLAYER_CAN_PLAY',
} as const

export const componentPositions = ['top', 'bottom', 'left', 'right'] as const
export const componentShapes = ['circle', 'square'] as const
export const componentSizes = ['lg', 'md', 'sm', 'xs'] as const
export const componentStatuses = ['info', 'success', 'warning', 'error'] as const
export const brandColors = ['primary', 'secondary', 'accent'] as const
export const componentColors = [...brandColors, 'ghost', ...componentStatuses] as const
export const bgColors = ['base-100', 'base-200', 'base-300', 'neutral'] as const

export const DEFAULT_THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter'
] as const
