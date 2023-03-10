/*
 * @Author: Carlos
 * @Date: 2022-12-29 23:56:00
 * @LastEditTime: 2022-12-31 13:16:58
 * @FilePath: /vite-react-swc/src/components/base/layout/Content.tsx
 * @Description:
 */
import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

function Content(props: Props) {
  const { children, className, ...resProps } = props
  return (
    <div className={clsx('flex-1', className)} {...resProps}>
      {children}
    </div>
  )
}
export default Content
