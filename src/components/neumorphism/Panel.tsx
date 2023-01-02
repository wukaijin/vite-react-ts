/*
 * @Author: Carlos
 * @Date: 2023-01-01 23:10:47
 * @LastEditTime: 2023-01-02 17:04:54
 * @FilePath: /vite-react-swc/src/components/neumorphism/Panel.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

const Panel = (props: Props) => {
  const { className, children, ...res } = props
  return (
    <div className={clsx('neu-panel', className)} {...res}>
      {children}
    </div>
  )
}

export default Panel
