/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:37:20
 * @LastEditTime: 2023-01-14 17:04:12
 * @FilePath: /vite-react-swc/src/pages/management/components/Breadcrumbs.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

type ItemProps = {
  text: string
  Icon?: React.ComponentType<any>
  disabled?: boolean
  handler?: () => void
}
const noop = () => undefined

export const BreadcrumbsItem = (props: ItemProps) => {
  const { text, Icon, disabled = true, handler = noop } = props
  return (
    <li
      className={clsx({
        'hover:opacity-90': !disabled,
        'cursor-pointer': !disabled
      })}
    >
      {Icon && <Icon theme="filled" size="18" className="text-secondary mr-1" onClick={handler} />}
      <span>{text}</span>
    </li>
  )
}
type Props = HTMLAttributes<HTMLSpanElement>
const Breadcrumbs = (props: Props) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>{props.children}</ul>
    </div>
  )
}
Object.assign(Breadcrumbs, { Item: BreadcrumbsItem })

export default Breadcrumbs
