/*
 * @Author: Carlos
 * @Date: 2023-01-02 14:18:23
 * @LastEditTime: 2023-01-05 14:49:24
 * @FilePath: /vite-react-swc/src/components/neumorphism/Button.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

type Color = 'primary' | 'secondary'
type Shape = 'square' | 'circle'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [string, string, string, string, string]> = {
  sm: ['h-10', 'rounded-lg', 'px-4', 'font-normal text-sm', 'text-sm'],
  md: ['h-12', 'rounded-xl', 'px-6', ' font-medium text-base', 'text-lg'],
  lg: ['h-14', 'rounded-2xl', 'px-8', 'font-semibold text-lg', 'text-xl']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  color?: Color
  shape?: Shape
  size?: Size
  block?: boolean
}
function Button(props: Props) {
  const {
    size = 'md',
    shape = 'square',
    block = false,
    className,
    color = 'secondary',
    children
  } = props
  const [sizeHeight, borderRadius, paddingX, fontSize, iconSize] = SizeMapping[size]
  return (
    <div
      className={clsx(
        'neu-button',
        `neu-button-${color}`,
        sizeHeight,
        shape === 'circle' ? iconSize : fontSize,
        {
          'inline-flex': !block,
          'block-flex': block,
          [paddingX]: shape === 'square',
          'aspect-square': shape === 'circle'
        },
        shape === 'circle' ? 'rounded-full' : borderRadius,
        className
      )}
    >
      {children}
    </div>
  )
}

export default Button
