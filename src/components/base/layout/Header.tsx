/*
 * @Author: Carlos
 * @Date: 2022-12-29 23:55:42
 * @LastEditTime: 2022-12-31 00:54:07
 * @FilePath: /vite-react-swc/src/components/base/layout/Header.tsx
 * @Description:
 */
import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
type Props = HTMLAttributes<HTMLDivElement>

const Header = (props: Props) => {
  const { children, className, ...resProps } = props
  return (
    <div className={clsx('flex', className)} {...resProps}>
      {children}
    </div>
  )
}
export default Header
