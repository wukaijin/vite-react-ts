/*
 * @Author: Carlos
 * @Date: 2023-01-02 15:38:57
 * @LastEditTime: 2023-01-06 16:18:20
 * @FilePath: /vite-react-swc/src/components/neumorphism/Input.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const SIZES = ['xs', 'sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [string, string, string, string, string, string]> = {
  xs: ['w-40', 'h-10 text-sm', 'rounded-lg', 'px-2', 'pl-10 pr-2', 'pl-1 w-10'],
  sm: ['w-48', 'h-12 text-sm', 'rounded-lg', 'px-2', 'pl-10 pr-2', 'pl-1 w-10'],
  md: ['w-56', 'h-14 text-base', 'rounded-xl', 'px-4', 'pl-12 pr-4', 'pl-1 w-12'],
  lg: ['w-64', 'h-16 text-lg', 'rounded-2xl', 'px-6', 'pl-12 pr-6', 'pl-2 w-12']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  value: string
  block?: boolean
  icon?: React.ReactNode
  placeholder?: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

function Input(props: Props) {
  const { size = 'md', value, block, onChange, placeholder, className, icon, ...resProps } = props
  const [width, height, borderRadius, px, pxWidthIcon, iconWidth] = SizeMapping[size]
  return (
    <div
      className={clsx('neu-input', block ? 'block' : width, height, borderRadius, className)}
      {...resProps}
    >
      <input
        className={clsx(borderRadius, icon ? pxWidthIcon : px)}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon && <div className={clsx('pre-i', iconWidth)}>{icon}</div>}
    </div>
  )
}
export default Input
