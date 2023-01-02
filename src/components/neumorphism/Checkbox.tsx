/*
 * @Author: Carlos
 * @Date: 2023-01-02 00:46:23
 * @LastEditTime: 2023-01-02 12:26:32
 * @FilePath: /vite-react-swc/src/components/neumorphism/Checkbox.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes } from 'react'
// import { CheckIcon } from '@heroicons/react/20/solid'
import { CheckSmall } from '@icon-park/react'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [number, string, string]> = {
  sm: [20, 'w-6 h-6', 'rounded-md'],
  md: [28, 'w-8 h-8', 'rounded-lg'],
  lg: [32, 'w-10 h-10', 'rounded-xl']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  checked: boolean
  onChange: (checked: boolean) => void
}

function Checkbox(props: Props) {
  const {
    size = 'md', checked, onChange, className
  } = props
  const [iconSize, iconWidth, labelRadius] = SizeMapping[size]
  return (
    <div className={clsx('neu-checkbox', className)}>
      <input type="checkbox" checked={checked} onChange={() => {}} />
      <label className={clsx(iconWidth, labelRadius)} onClick={() => onChange(!checked)}>
        <CheckSmall theme="filled" size={iconSize} />
      </label>
      {/* <label className={clsx(iconWidth, labelRadius)} onClick={() => onChange(!checked)}>
        <CheckIcon className={clsx(iconWidth)} style={{ transform: 'scale(0.9)'}} />
      </label> */}
    </div>
  )
}
export default Checkbox
