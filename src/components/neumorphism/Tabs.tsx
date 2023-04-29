/*
 * @Author: Carlos
 * @Date: 2023-01-02 16:55:31
 * @LastEditTime: 2023-04-27 17:09:25
 * @FilePath: /vite-react-swc/src/components/neumorphism/Tabs.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes, useLayoutEffect, useRef, useState } from 'react'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [string, string, string, string, [number, string]]> = {
  sm: ['h-10', 'px-4', 'text-base', 'rounded-lg', [10, 'rounded-md']],
  md: ['h-12', 'px-6', 'text-lg', 'rounded-xl', [10, 'rounded-md']],
  lg: ['h-14', 'px-8', 'text-lg', 'rounded-2xl', [12, 'rounded-lg']]
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  block?: boolean
  value: string | number
  items: TabsItem[]
  onChange: (value: string | number) => void
}
type ShadowStyle = {
  offsetLeft: number
  offsetWidth: number
  offsetHeight: number
}
export type TabsItem = {
  value: string | number
  label?: string | number
  render?: React.ReactNode
}
// const tabs = ['Apple', 'Banana', 'Watermelon']
function Tabs(props: Props) {
  const [shadowStyle, setShadowStyle] = useState<ShadowStyle>({
    offsetLeft: 0,
    offsetWidth: 0,
    offsetHeight: 0
  })

  const tabsRef = useRef<(HTMLDivElement | null)[]>([])
  const { size = 'md', block = false, value, items = [], onChange, className } = props
  const [height, itemPaddingX, fontSize, borderRadius, [distance, shadowRadius]] = SizeMapping[size]
  const resizeShadow = (index: number) => {
    const { offsetLeft = 0, offsetWidth = 10, offsetHeight = 4 } = tabsRef.current[index] || {}
    setShadowStyle({
      offsetLeft,
      offsetWidth,
      offsetHeight
    })
  }
  // ! for dynamic size changing
  useLayoutEffect(() => {
    const currentActiveTab = items.findIndex(e => e.value === value)
    if (currentActiveTab !== -1) {
      setTimeout(() => {
        resizeShadow(currentActiveTab)
      }, 500)
    }
  }, [size])
  useLayoutEffect(() => {
    const currentActiveTab = items.findIndex(e => e.value === value)
    if (currentActiveTab !== -1) {
      resizeShadow(currentActiveTab)
    }
  }, [value])
  return (
    <div className={clsx('neu-tabs', { flex: block }, height, fontSize, borderRadius, className)}>
      {items.map((tab, index) => (
        <div
          ref={ref => (tabsRef.current[index] = ref)}
          key={tab.value}
          className={clsx('neu-tab', height, itemPaddingX, {
            'flex-1': block,
            active: value === tab.value
          })}
          onClick={() => {
            resizeShadow(index)
            onChange(tab.value)
          }}
        >
          {tab.render ? tab.render : tab.label || tab.value}
        </div>
      ))}
      <div
        className={clsx('control', shadowRadius)}
        style={{
          transform: `translateX(${shadowStyle.offsetLeft}px)`,
          width: shadowStyle.offsetWidth - (distance + 2),
          height: shadowStyle.offsetHeight - distance
        }}
      />
    </div>
  )
}
export default Tabs
