/*
 * @Author: Carlos
 * @Date: 2022-12-30 00:41:32
 * @LastEditTime: 2022-12-31 16:11:15
 * @FilePath: /vite-react-swc/src/const.ts
 * @Description:
 */
export const HOME_HEADER_HEIGHT = 56
export const HOME_FOOTER_HEIGHT = 100

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
