/*
 * @Author: Carlos
 * @Date: 2022-12-29 17:31:26
 * @LastEditTime: 2022-12-31 01:27:08
 * @FilePath: /vite-react-swc/src/components/base/Button.tsx
 * @Description:
 */
import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { htmlFor?: string }
> = props => (
  <button
    {...props}
    className={twMerge(
      clsx(
        'inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        props.className
      )
    )}
    // type="button"
  >
    {props.children}
  </button>
)

export default Button
