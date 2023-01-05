/*
 * @Author: Carlos
 * @Date: 2023-01-05 13:52:30
 * @LastEditTime: 2023-01-05 23:11:56
 * @FilePath: /vite-react-swc/src/components/enhance/player/LyricPanel.tsx
 * @Description:
 */
// import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { NeuPanel } from '@/components/neumorphism'
import { parseLyric } from '@/utils'

type Props = {
  active: number
  lyric: ReturnType<typeof parseLyric> | null
}
const LyricPanel = (props: Props) => {
  const { active, lyric } = props
  return (
    <NeuPanel className="p-4 inset">
      <div className="h-40 overflow-hidden">
        <div
          className="transition-transform duration-500"
          style={{ transform: `translateY(-${2 * (active <= 2 ? 0 : active - 2)}rem)` }}
        >
          {lyric &&
            lyric.lrc.map((item, index) => {
              return (
                <div key={index} className="text-sm  leading-8 text-center">
                  <span
                    className={clsx('transition-color duration-500', {
                      'text-base text-indigo-500': index === active,
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
