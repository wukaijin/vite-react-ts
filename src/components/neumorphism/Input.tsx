/*
 * @Author: Carlos
 * @Date: 2023-01-02 15:38:57
 * @LastEditTime: 2023-04-27 17:09:13
 * @FilePath: /vite-react-swc/src/components/neumorphism/Input.tsx
 * @Description:
 */
import clsx from 'clsx'
import type { CSSProperties, HTMLAttributes } from 'react'

type Size = 'xs' | 'sm' | 'md' | 'lg'
const SizeMapping: Record<Size, [string, string, string, string, string, string]> = {
  xs: ['w-40', 'h-10 text-base', 'rounded-lg', 'px-2', 'pl-10 pr-2', 'pl-1 w-10'],
  sm: ['w-48', 'h-12 text-base', 'rounded-lg', 'px-2', 'pl-10 pr-2', 'pl-1 w-10'],
  md: ['w-56', 'h-14 text-lg', 'rounded-xl', 'px-4', 'pl-12 pr-4', 'pl-1 w-12'],
  lg: ['w-64', 'h-16 text-lg', 'rounded-2xl', 'px-6', 'pl-12 pr-6', 'pl-2 w-12']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  value: string
  block?: boolean
  icon?: React.ReactNode
  placeholder?: string
  search?: false
  inputStyle?: CSSProperties
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

function Input(props: Props) {
  const {
    size = 'md',
    search,
    value,
    block,
    onChange,
    placeholder,
    className,
    inputStyle,
    icon,
    children,
    ...resProps
  } = props
  const [width, height, borderRadius, px, pxWidthIcon, iconWidth] = SizeMapping[size]
  return (
    <div
      className={clsx('neu-input', block ? 'block' : width, height, borderRadius, className)}
      {...resProps}
    >
      <input
        className={clsx(borderRadius, icon ? pxWidthIcon : px, children ? 'pr-16' : '')}
        style={inputStyle}
        type={search ? 'search' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon && <div className={clsx('pre-i', iconWidth)}>{icon}</div>}
      {children && <div className={clsx('next-b', iconWidth)}>{children}</div>}
    </div>
  )
}
export default Input
