/*
 * @Author: Carlos
 * @Date: 2022-12-30 21:59:26
 * @LastEditTime: 2022-12-31 15:32:31
 * @FilePath: /vite-react-swc/src/declare.d.ts
 * @Description:
 */
import {
  componentColors,
  componentPositions,
  componentShapes,
  componentSizes,
  componentStatuses,
  brandColors,
  bgColors,
  DEFAULT_THEMES
} from './const'

export type SetStateType<T> = Dispatch<SetStateAction<T>>
export type FC = FC

export type DataTheme = typeof DEFAULT_THEMES[number] | string

export interface IComponentBaseProps {
  dataTheme?: DataTheme
}

export type ComponentColor = typeof componentColors[number]

export type ComponentPosition = typeof componentPositions[number]
export type ComponentShape = typeof componentShapes[number]
export type ComponentSize = typeof componentSizes[number]
export type ComponentStatus = typeof componentStatuses[number]
export type ComponentBrandColors = typeof brandColors[number]
export type ComponentBgColors = typeof bgColors[number]
