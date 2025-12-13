/*
 * @Author: Carlos
 * @Date: 2023-01-03 01:17:01
 * @LastEditTime: 2023-01-06 00:05:05
 * @FilePath: /vite-react-swc/src/components/neumorphism/Slider.tsx
 * @Description:
 */
import clsx from 'clsx'
import { Component, createRef } from 'react'
import type { HTMLAttributes, RefObject } from 'react'

type Size = 'sm' | 'md' | 'lg'
const SizeMapping: Record<Size, [string, string, string]> = {
  sm: ['h-3 w-3', 'h-1', 'h-6 rounded text-sm top-6'],
  md: ['h-3 w-3', 'h-2', 'h-7 rounded-md text-base top-7'],
  lg: ['h-6 w-6', 'h-3', 'h-8 rounded-md text-lg top-8']
}
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  size?: Size
  value: number
  // checked?: boolean
  onChange?: (value: number) => void
}
// const distance = 0

type State = {
  active: boolean
  btnLeft: number
  percent: number
  boxRef: RefObject<HTMLDivElement | null>
  btnRef: RefObject<HTMLDivElement | null>
  // restWidth: number
}

class Slider extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      active: false,
      btnLeft: 0,
      percent: 0,
      boxRef: createRef(),
      btnRef: createRef()
      // restWidth: 0
    }
  }
  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    if (props.value !== state.percent && state.boxRef.current) {
      return {
        percent: props.value,
        btnLeft: (state.boxRef.current.offsetWidth / 100) * props.value
      }
    }
    return null
  }
  componentDidMount(): void {
    const box = this.state.boxRef.current
    const btn = this.state.btnRef.current
    if (!box || !btn) return

    this.setState({ btnLeft: box.offsetWidth * this.props.value })
  }
  onBoxMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.calcMouse(e)
    const fn = this.calcMouse.bind(this)
    document.addEventListener('mousemove', fn)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', fn)
    })
  }
  onBoxTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    this.calcTouch(e)
    const fn = this.calcTouch.bind(this)
    document.addEventListener('touchmove', fn)
    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', fn)
    })
  }
  calcMouse(e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) {
    // e.preventDefault()
    const box = this.state.boxRef.current
    const btn = this.state.btnRef.current
    if (!box || !btn) return false
    // const restWidth = box.offsetWidth - btn.offsetWidth
    const eX = e.clientX
    let x = eX - box.getBoundingClientRect().x + window.scrollX
    if (x > box.offsetWidth) {
      x = box.offsetWidth
    }
    if (x < 0) {
      x = 0
    }
    const percent = (x / box.offsetWidth) * 100
    if (this.props.onChange) {
      this.props.onChange(percent)
    }
    this.setState({ btnLeft: x })
    return false
  }
  calcTouch(e: React.TouchEvent<HTMLDivElement> | TouchEvent) {
    const box = this.state.boxRef.current
    const btn = this.state.btnRef.current
    if (!box || !btn) return false
    const eX = (e.targetTouches && e.targetTouches[0] && e.targetTouches[0].clientX) || 0
    let x = eX - box.getBoundingClientRect().x + window.scrollX
    if (x > box.offsetWidth) {
      x = box.offsetWidth
    }
    if (x < 0) {
      x = 0
    }
    const percent = (x / box.offsetWidth) * 100
    if (this.props.onChange) {
      this.props.onChange(percent)
    }
    this.setState({ btnLeft: x })
    return false
  }
  render() {
    const { className, size = 'md', value } = this.props
    const [btnSize, boxHeight, tooltipStyle] = SizeMapping[size]
    const { active, btnLeft } = this.state
    return (
      <div className={clsx('neu-slider', className)}>
        <div
          ref={this.state.boxRef}
          className={clsx('neu-slider-box', boxHeight)}
          onMouseDown={e => {
            this.onBoxMouseDown(e)
          }}
          onTouchStart={e => {
            this.onBoxTouchStart(e)
          }}
          onMouseUp={() => {}}
        >
          <span
            className={clsx('neu-slider-btn', btnSize)}
            ref={this.state.btnRef}
            style={{
              left: `${Math.max(0, btnLeft)}px`
              // transform: `translateX(${Math.max(0, value - 0) || 0}%`
            }}
          >
            <span
              className={clsx('neu-slider-tooltip', tooltipStyle, {})}
              style={{
                opacity: active ? 1 : ''
              }}
            >
              {`${Math.round(Math.max(0, value) || 0)}%`}
            </span>
          </span>
          <span
            className="neu-slider-color"
            style={{
              width: `${Math.max(0, value - 0) || 0}%`
            }}
          />
        </div>
      </div>
    )
  }
}

export default Slider
