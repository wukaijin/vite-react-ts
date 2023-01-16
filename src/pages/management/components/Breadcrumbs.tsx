/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:37:20
 * @LastEditTime: 2023-01-15 21:55:20
 * @FilePath: /vite-react-swc/src/pages/management/components/Breadcrumbs.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

type ItemProps = {
  text: string
  Icon?: React.ComponentType<any>
  disabled?: boolean
  onClick?: () => void
}
const noop = () => undefined

export const BreadcrumbsItem = (props: ItemProps) => {
  const { text, Icon, disabled = true, onClick = noop } = props
  return (
    <li
      className={clsx({
        'hover:opacity-90 hover:text-primary cursor-pointer': !disabled
      })}
      onClick={onClick}
    >
      {Icon && <Icon theme="filled" size="18" className="text-primary mr-1" />}
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
