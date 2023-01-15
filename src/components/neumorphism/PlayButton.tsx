/*
 * @Author: Carlos
 * @Date: 2023-01-04 12:48:59
 * @LastEditTime: 2023-01-05 15:27:13
 * @FilePath: /vite-react-swc/src/components/neumorphism/PlayButton.tsx
 * @Description:
 */

import { PlayOne, Pause } from '@icon-park/react'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
type Props = HTMLAttributes<HTMLDivElement> & {
  size?: Size
  playing?: boolean
  onChange?: () => void
}
const SizeMapping: Record<Size, [string, string, string]> = {
  sm: ['w-16 h-16', 'w-2/3 h-2/3', 'text-2xl'],
  md: ['w-20 h-20', 'w-2/3 h-2/3', 'text-3xl'],
  lg: ['w-24 h-24', 'w-2/3 h-2/3', 'text-4xl']
}
const PlayButton = (props: Props) => {
  const { size = 'lg', className, playing = false, onChange = () => {} } = props
  const [btnSize, iconSize, TT] = SizeMapping[size]
  return (
    <div className={clsx('neu-play-button', btnSize, className)}>
      <span className={clsx('neu-play-icon', iconSize, TT)}>
        <Pause className={clsx('pause', { visible: playing })} theme="filled" onClick={onChange} />
        <PlayOne className={clsx('play', { visible: !playing })} theme="filled" onClick={onChange} />
      </span>
      <span className={clsx('neu-play-back-1', iconSize, { paused: !playing })} />
      <span className={clsx('neu-play-back-2', iconSize, { paused: !playing })} />
    </div>
  )
}

export default PlayButton
