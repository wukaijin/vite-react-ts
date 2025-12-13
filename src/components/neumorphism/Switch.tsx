/*
 * @Author: Carlos
 * @Date: 2023-01-01 23:49:30
 * @LastEditTime: 2023-01-02 01:30:37
 * @FilePath: /vite-react-swc/src/components/neumorphism/Switch.tsx
 * @Description:
 */
import clsx from 'clsx'
import { type HTMLAttributes } from 'react'

type Size = 'sm' | 'md' | 'lg'
const SizeMapping: Record<Size, [string, string]> = {
  sm: ['w-12', 'h-6'],
  md: ['w-16', 'h-8'],
  lg: ['w-20', 'h-10']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  checked: boolean
  onChange: (checked: boolean) => void
}

function Switch(props: Props) {
  const { checked, onChange } = props
  const { className, size = 'md' } = props
  const [wrapperWidth, labelHeight] = SizeMapping[size]
  return (
    <div className={clsx('neu-switch', wrapperWidth, className)} onClick={() => onChange(!checked)}>
      <input type="checkbox" checked={checked} onChange={() => {}} />
      <label className={labelHeight} />
    </div>
  )
}
export default Switch
