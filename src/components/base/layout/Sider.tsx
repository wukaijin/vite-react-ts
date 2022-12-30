/*
 * @Author: Carlos
 * @Date: 2022-12-29 23:54:07
 * @LastEditTime: 2022-12-30 00:53:31
 * @FilePath: /vite-react-swc/src/components/base/layout/Sider.tsx
 * @Description: 
 */
import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
type Props = HTMLAttributes<HTMLDivElement>

const Sider = (props: Props) => {
  const { children, className, ...resProps } = props
  return (
    <div className={clsx('', className)} {...resProps}>
      {children}
    </div>
  )
}
export default Sider