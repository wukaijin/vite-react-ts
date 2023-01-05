/*
 * @Author: Carlos
 * @Date: 2023-01-02 01:31:53
 * @LastEditTime: 2023-01-02 01:57:26
 * @FilePath: /vite-react-swc/src/components/neumorphism/Radio.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [string]> = {
  sm: ['w-6 h-6'],
  md: ['w-8 h-8'],
  lg: ['w-10 h-10']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  checked: boolean
  onChange: (checked: boolean) => void
}

function Radio(props: Props) {
  const { size = 'md', checked, onChange, className } = props
  const [labelSize] = SizeMapping[size]
  return (
    <div className={clsx('neu-radio', className)}>
      <input type="radio" checked={checked} name="radio" value="1" onChange={() => {}} />
      <label className={labelSize} onClick={() => onChange(!checked)} />
    </div>
  )
}

export default Radio
