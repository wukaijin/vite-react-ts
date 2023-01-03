/*
 * @Author: Carlos
 * @Date: 2023-01-03 01:17:01
 * @LastEditTime: 2023-01-03 04:34:24
 * @FilePath: /vite-react-swc/src/components/neumorphism/Slider.tsx
 * @Description:
 */
import clsx from 'clsx'
import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { throttle } from '@/utils'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
const SizeMapping: Record<Size, [string, string, string]> = {
  sm: ['h-4 w-4', 'h-2', 'h-6 rounded text-sm top-6'],
  md: ['h-6 w-6', 'h-3', 'h-7 rounded-md text-base top-7'],
  lg: ['h-8 w-8', 'h-4', 'h-8 rounded-md text-lg top-8']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  value: number
  // checked?: boolean
  onChange?: (value: number) => void
}
// const distance = 0
function calc(e: MouseEvent, box: HTMLDivElement) {
  e.preventDefault()
  // if (!box) return null
  const targetRect = box.getBoundingClientRect()
  const btn = box.querySelector<HTMLDivElement>('.neu-slider-btn')
  const btnWidth = btn?.offsetWidth || 0
  let x = e.pageX - targetRect.left
  if (x > targetRect.width) {
    x = targetRect.width
  }
  if (x < 0) {
    x = 0
  }
  // const percentPosition = ((x + distance - btnWidth) / (targetRect.width - btnWidth)) * 100
  const percentPosition = (x / targetRect.width) * 100
  // console.log(percentPosition, x)
  return {
    percentPosition,
    x
  }
}

function Slider(props: Props) {
  // const { checked, onChange } = props
  const { className, size = 'md', value, onChange } = props
  const [btnSize, boxHeight, tooltipStyle] = SizeMapping[size]
  const boxRef = useRef<HTMLDivElement | null>()
  const [active, setActive] = useState(false)
  const [percent, setPercent] = useState(value || 0)
  const [btnLeft, setBtnLeft] = useState(value || 0)

  const func = throttle((e: MouseEvent) => {
    if (!boxRef.current) return
    const { percentPosition, x } = calc(e, boxRef.current)
    // setPercent(percentPosition)
    if (onChange) {
      onChange(percentPosition)
      // setBtnLeft(x)
    } else {
      setPercent(percentPosition)
      setBtnLeft(x)
    }
  }, 20)
  useEffect(
    () => {
      setPercent(value)
      setBtnLeft((value / 100) * (boxRef.current?.offsetWidth || 0) || 0)
    },
    [value]
  )

  return (
    <div className={clsx('neu-slider', className)}>
      <div
        ref={ref => (boxRef.current = ref)}
        className={clsx('neu-slider-box', boxHeight)}
        onMouseDown={e => {
          setActive(true)
          document.onmousemove = func
          document.onmouseup = () => {
            document.onmousemove = null
            setActive(false)
          }
        }}
        onMouseUp={e => {
          setActive(false)
          document.onmousemove = null
        }}
        // onMouseMove={e => {
        //   if (active) {

        //   }
        // }}
      >
        <span
          className={clsx('neu-slider-btn', btnSize)}
          style={{
            left: `${Math.max(0, btnLeft - 10)}px`
          }}
        >
          <span
            className={clsx('neu-slider-tooltip', tooltipStyle, {
              // 'opacity-100': true
            })}
            style={{
              opacity: active ? 1 : ''
              // left: `${btnLeft}px`
            }}
          >
            {`${Math.round(Math.max(0, percent) || 0)}%`}
          </span>
        </span>
        <span
          className="neu-slider-color"
          style={{
            width: `${Math.round(Math.max(0, percent - 3) || 0)}%`
          }}
        />
      </div>
    </div>
  )
}
export default Slider
