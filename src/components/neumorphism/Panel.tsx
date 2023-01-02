/*
 * @Author: Carlos
 * @Date: 2023-01-01 23:10:47
 * @LastEditTime: 2023-01-02 22:21:46
 * @FilePath: /vite-react-swc/src/components/neumorphism/Panel.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

function Panel(props: Props) {
  const { className, children, ...resProps } = props
  return (
    <div className={clsx('neu-panel', className)} {...resProps}>
      {children}
    </div>
  )
}

export default Panel
