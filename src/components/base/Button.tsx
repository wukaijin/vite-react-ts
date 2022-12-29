/*
 * @Author: Carlos
 * @Date: 2022-12-29 17:31:26
 * @LastEditTime: 2022-12-29 17:40:31
 * @FilePath: /vite-react-swc/src/components/base/Button.tsx
 * @Description:
 */
import { ButtonHTMLAttributes } from 'react'
import clx from 'classnames'

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => (
  <button
    {...props}
    className={clx(
      'inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      props.className
    )}
    type="button"
  >
    {props.children}
  </button>
)

export default Button
