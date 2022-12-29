/*
 * @Author: Carlos
 * @Date: 2022-12-29 23:56:23
 * @LastEditTime: 2022-12-30 00:59:25
 * @FilePath: /vite-react-swc/src/components/base/layout/Footer.tsx
 * @Description: 
 */
import clx from 'classnames'
import type { HTMLAttributes } from 'react'
type Props = HTMLAttributes<HTMLDivElement>

const Footer = (props: Props) => {
  const { children, className, ...resProps } = props
  return (
    <div className={clx('flex', className)} {...resProps}>
      {children}
    </div>
  )
}
export default Footer