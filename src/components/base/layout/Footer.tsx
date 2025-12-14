/*
 * @Author: Carlos
 * @Date: 2022-12-29 23:56:23
 * @LastEditTime: 2022-12-30 00:59:25
 * @FilePath: /vite-react-ts/src/components/base/layout/Footer.tsx
 * @Description:
 */
import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

function Footer(props: Props) {
  const { children, className, ...resProps } = props
  return (
    <div className={clsx('flex', className)} {...resProps}>
      {children}
    </div>
  )
}
export default Footer
