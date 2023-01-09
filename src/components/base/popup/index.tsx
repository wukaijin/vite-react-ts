/*
 * @Author: Carlos
 * @Date: 2023-01-04 17:19:32
 * @LastEditTime: 2023-01-09 14:09:47
 * @FilePath: /vite-react-swc/src/components/base/popup/index.tsx
 * @Description:
 */
import { HTMLAttributes } from 'react'
import clsx from 'clsx'

type From = 'top' | 'bottom' | 'left' | 'right'
type Props = HTMLAttributes<HTMLDivElement> & {
  show: boolean
  from?: From
}

const CLASS_MAPPING: Record<From, { pop: string; visible: string; hidden: string }> = {
  top: {
    pop: 'top-0',
    visible: 'translate-y-0',
    hidden: '-translate-y-full'
  },
  bottom: {
    pop: 'bottom-0',
    visible: 'translate-y-0',
    hidden: 'translate-y-full'
  },
  left: {
    pop: 'left-0',
    visible: 'translate-x-0',
    hidden: '-translate-x-full'
  },
  right: {
    pop: 'right-0',
    visible: 'translate-x-0',
    hidden: 'translate-x-full'
  }
}
const Popup = (props: Props) => {
  const { children, show, from = 'top', className, ...resProps } = props
  const { visible, hidden, pop } = CLASS_MAPPING[from]
  console.log('popups', show)
  return (
    <div
      className={clsx(
        'popup fixed transition-transform ease-in-out',
        show ? visible : hidden,
        pop,
        className
      )}
      {...resProps}
    >
      {children}
    </div>
  )
}
export default Popup
