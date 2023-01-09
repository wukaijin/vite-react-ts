/*
 * @Author: Carlos
 * @Date: 2023-01-05 13:52:30
 * @LastEditTime: 2023-01-09 22:25:26
 * @FilePath: /vite-react-swc/src/components/enhance/player/LyricPanel.tsx
 * @Description:
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { NeuPanel } from '@/components/neumorphism'
import { parseLyric } from '@/utils'

type Props = {
  active: number
  lyric: ReturnType<typeof parseLyric> | null
}
const LyricPanel = (props: Props) => {
  const { active, lyric } = props
  const dom = useRef<HTMLDivElement | null>()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (dom.current) {
      const halfItemNum = Math.round(dom.current.offsetHeight / 2 / 16 / 2) // px to rem
      setOffset(2 * (active <= halfItemNum ? 0 : active - halfItemNum))
    }
  }, [active, setOffset, dom.current])

  return (
    <NeuPanel className="p-4 inset">
      <div
        ref={ref => (dom.current = ref)}
        className="h-[calc(100vh-23rem)]  sm:h-60 overflow-hidden"
      >
        <div
          className="transition-transform duration-500"
          style={{ transform: `translateY(-${offset}rem)` }}
        >
          {lyric &&
            lyric.lrc.map((item, index) => {
              return (
                <div key={index} className="text-sm  leading-8 text-center">
                  <span
                    className={clsx('transition-color duration-500 truncate', {
                      'text-lg text-indigo-500': index === active,
                      'pl-8': !item.lyric
                    })}
                  >
                    {item.lyric}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </NeuPanel>
  )
}

export default LyricPanel
