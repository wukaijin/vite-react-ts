/*
 * @Author: Carlos
 * @Date: 2023-01-04 12:48:59
 * @LastEditTime: 2023-01-04 16:07:45
 * @FilePath: /vite-react-swc/src/components/neumorphism/PlayButton.tsx
 * @Description:
 */

import { Play, Pause } from '@icon-park/react'
import clsx from 'clsx'

type Props = {
  playing?: boolean
  onChange?: () => void
}
const PlayButton = (props: Props) => {
  const { playing = false, onChange = () => {} } = props
  return (
    <div className="neu-play-button">
      <span className="neu-play-icon" onClick={onChange}>
        <Pause className={clsx('pause', { show: playing })} theme="filled" />
        <Play className={clsx('play', { show: !playing })} theme="filled" />
      </span>
      <span className={clsx('neu-play-back-1', { paused: !playing })} />
      <span className={clsx('neu-play-back-2', { paused: !playing })} />
    </div>
  )
}

export default PlayButton
