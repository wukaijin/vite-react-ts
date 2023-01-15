/*
 * @Author: Carlos
 * @Date: 2023-01-04 17:19:32
 * @LastEditTime: 2023-01-14 21:37:20
 * @FilePath: /vite-react-swc/src/components/base/popup/index.tsx
 * @Description:
 */
import { HTMLAttributes, memo } from 'react'
import clsx from 'clsx'

type From = 'top' | 'bottom' | 'left' | 'right'
type Props = HTMLAttributes<HTMLDivElement> & {
  visible: boolean
  from?: From
}

const CLASS_MAPPING: Record<From, { pop: string; show: string; hidden: string }> = {
  top: {
    pop: 'top-0',
    show: 'translate-y-0',
    hidden: '-translate-y-full'
  },
  bottom: {
    pop: 'bottom-0',
    show: 'translate-y-0',
    hidden: 'translate-y-full'
  },
  left: {
    pop: 'left-0',
    show: 'translate-x-0',
    hidden: '-translate-x-full'
  },
  right: {
    pop: 'right-0',
    show: 'translate-x-0',
    hidden: 'translate-x-full'
  }
}
const Popup = memo((props: Props) => {
  const { children, visible, from = 'top', className, ...resProps } = props
  const { show, hidden, pop } = CLASS_MAPPING[from]
  console.log('popups', visible)
  return (
    <div
      className={clsx(
        'popup fixed transition-transform ease-in-out z-50',
        visible ? show : hidden,
        pop,
        className
      )}
      {...resProps}
    >
      {children}
    </div>
  )
})
export default Popup
