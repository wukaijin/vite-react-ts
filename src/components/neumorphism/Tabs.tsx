/*
 * @Author: Carlos
 * @Date: 2023-01-02 16:55:31
 * @LastEditTime: 2023-01-02 18:00:37
 * @FilePath: /vite-react-swc/src/components/neumorphism/Tabs.tsx
 * @Description:
 */
import clsx from 'clsx'
import { HTMLAttributes, useRef, useState } from 'react'
const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [string]> = {
  sm: ['h-6'],
  md: ['h-8'],
  lg: ['h-10']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  // checked: boolean
  // onChange: (checked: boolean) => void
}
const getOffsetLeft = (dom: HTMLLabelElement | null) => {
  console.dir(dom)
}
const tabs = ['Apple', 'Banana', 'Watermelon']
const Tabs = (props: Props) => {
  const [active, setActive] = useState('Tab1')
  const [offset, setOffset] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  
  const tabsRef = useRef<(HTMLLabelElement | null)[]>([])
  const { size = 'md', className } = props
  const [labelSize] = SizeMapping[size]
  return (
    <div className={clsx('neu-tabs', className)}>
      {tabs.map((tab, index) => {
        return (
          <label
            ref={ref => (tabsRef.current[index] = ref)}
            key={tab}
            className={clsx('neu-tab', {
              active: active === tab
            })}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              getOffsetLeft(tabsRef.current[index])
              setOffset(tabsRef.current[index]?.offsetLeft || 0)
              setWidth(tabsRef.current[index]?.offsetWidth || 0)
              setHeight(tabsRef.current[index]?.offsetHeight || 0)
              setActive(tab)
            }}
          >
            <p>{tab}</p>
          </label>
        )
      })}
      <div className="control" style={{
        transform: `translateX(${offset}px)`,
        width: width - 10,
        height: height - 4,
      }}></div>
    </div>
  )
}
export default Tabs
