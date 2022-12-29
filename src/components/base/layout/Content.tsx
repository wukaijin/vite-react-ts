/*
 * @Author: Carlos
 * @Date: 2022-12-29 23:56:00
 * @LastEditTime: 2022-12-30 00:55:37
 * @FilePath: /vite-react-swc/src/components/base/layout/Content.tsx
 * @Description:
 */
import clx from 'classnames'
import type { HTMLAttributes } from 'react'
type Props = HTMLAttributes<HTMLDivElement>

const Content = (props: Props) => {
  const { children, className, ...resProps } = props
  console.log(resProps)
  return (
    <div className={clx('flex-1', className)} {...resProps}>
      {children}
    </div>
  )
}
export default Content
