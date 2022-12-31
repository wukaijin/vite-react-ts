/*
 * @Author: Carlos
 * @Date: 2022-12-29 17:31:26
 * @LastEditTime: 2022-12-31 16:57:22
 * @FilePath: /vite-react-swc/src/components/base/Button.tsx
 * @Description:
 */
import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import {
  IComponentBaseProps,
  ComponentShape,
  ComponentSize,
  ComponentColor
} from '@/declare'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  IComponentBaseProps & {
    href?: string
    shape?: ComponentShape
    size?: ComponentSize
    variant?: 'outline' | 'link'
    color?: ComponentColor
    fullWidth?: boolean
    responsive?: boolean
    animation?: boolean
    loading?: boolean
    active?: boolean
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
  }

const Button: React.FC<ButtonProps> = props => {
  const {
    children,
    href,
    shape,
    size,
    variant,
    color,
    startIcon,
    endIcon,
    fullWidth,
    responsive,
    animation = true,
    loading,
    active,
    disabled,
    dataTheme,
    className,
    style,
    ...resProps
  } = props
  const classes = twMerge(
    'btn',
    className,
    clsx(((startIcon && !loading) || endIcon) && 'gap-2', {
      'btn-block': fullWidth,
      'btn-xs md:btn-sm lg:btn-md xl:btn-lg': responsive,
      'no-animation': !animation,
      'btn-active': active,
      'btn-disabled': disabled,
      loading: loading
    // },  size ? `btn-${size}`: '', size ? `btn-${shape}`: '', variant ? `btn-${variant}`: '', color ? `btn-${color}`: ''
    },  size ? "btn-" + size: '', shape ? "btn-" + shape: '', variant ? "btn-" + variant: '', color ? "btn-" + color: ''
    // btn-error
    // [`btn-${shape}`]: shape,
    // [`btn-${variant}`]: variant,
    // [`btn-${color}`]: color,)
  ))

  if (href) {
    return (
      <a className={classes} style={style} href={href}>
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </a>
    )
  } else {
    return (
      <button
        // ref={ref}
        data-theme={dataTheme}
        className={classes}
        style={style}
        disabled={disabled}
        {...resProps}
      >
        {startIcon && !loading && startIcon}
        {children}
        {endIcon && endIcon}
      </button>
    )
  }
}

export default Button