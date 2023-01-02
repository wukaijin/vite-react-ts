/*
 * @Author: Carlos
 * @Date: 2023-01-02 16:55:31
 * @LastEditTime: 2023-01-02 22:35:48
 * @FilePath: /vite-react-swc/src/components/neumorphism/Tabs.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes, useRef, useState } from 'react'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [string, string, string]> = {
  sm: ['h-6', 'text-sm', 'rounded-lg'],
  md: ['h-8', 'text-base', 'rounded-xl'],
  lg: ['h-10', 'text-lg', 'rounded-2xl']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  // checked: boolean
  // onChange: (checked: boolean) => void
}
type ShadowStyle = {
  offsetLeft: number
  offsetWidth: number
  offsetHeight: number
}

const tabs = ['Apple', 'Banana', 'Watermelon']
function Tabs(props: Props) {
  const [active, setActive] = useState('Tab1')
  const [shadowStyle, setShadowStyle] = useState<ShadowStyle>({
    offsetLeft: 0,
    offsetWidth: 0,
    offsetHeight: 0
  })

  const tabsRef = useRef<(HTMLDivElement | null)[]>([])
  const { size = 'md', className } = props
  const [height, fontSize, borderRadius] = SizeMapping[size]
  const resizeShadow = (index: number) => {
    const {
      offsetLeft = 0,
      offsetWidth = 10,
      offsetHeight = 4
    } = tabsRef.current[index] || {}
    setShadowStyle({
      offsetLeft,
      offsetWidth,
      offsetHeight
    })
  }
  return (
    <div
      className={clsx('neu-tabs', height, fontSize, borderRadius, className)}
    >
      {tabs.map((tab, index) => (
        <div
          ref={(ref) => (tabsRef.current[index] = ref)}
          key={tab}
          className={clsx('neu-tab', {
            active: active === tab
          })}
          onClick={() => {
            resizeShadow(index)
            setActive(tab)
          }}
          onKeyUp={() => {
            resizeShadow(index)
            setActive(tab)
          }}
        >
          <p>{tab}</p>
        </div>
      ))}
      <div
        className="control"
        style={{
          transform: `translateX(${shadowStyle.offsetLeft}px)`,
          width: shadowStyle.offsetHeight - 10,
          height: shadowStyle.offsetHeight - 4
        }}
      />
    </div>
  )
}
export default Tabs
