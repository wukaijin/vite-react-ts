/*
 * @Author: Carlos
 * @Date: 2023-01-08 15:02:53
 * @LastEditTime: 2023-01-08 22:21:48
 * @FilePath: /vite-react-swc/src/pages/music/recommendPlaylist/PlaylistCard.tsx
 * @Description:
 */
import { CSSProperties } from 'react'
import { PlaylistItem } from '@/interface/music'
import './index.scss'

const translate3D: CSSProperties = {
  perspective: 1000,
  // '-webkit-perspective': 1000,
  transformStyle: 'preserve-3d'
}
type Props = {
  data: PlaylistItem
}
const PlaylistCard = (props: Props) => {
  const { data } = props
  return (
    <div className="contain inline-block relative rounded-t-xl cursor-pointer">
      <div className="flip aspect-square">
        <div className="front">
          <div className="">
            <img className="rounded-t-xl" src={data.coverImgUrl} alt="" />
          </div>
        </div>
        <div className="back h-full bg-white/20 rounded-t-xl p-2 overflow-auto">
          <span className="text-xs text-ellipsis leading-none break-all">{data.description}</span>
        </div>
      </div>
      <div className="h-16 bg-white/20 rounded-b-xl p-2">
        <span className="text-sm text-gray-700 leading-1">{data.name}</span>
      </div>
    </div>
  )
}
export default PlaylistCard
