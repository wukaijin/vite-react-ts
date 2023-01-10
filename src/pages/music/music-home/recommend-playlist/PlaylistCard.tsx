/*
 * @Author: Carlos
 * @Date: 2023-01-08 15:02:53
 * @LastEditTime: 2023-01-09 23:07:11
 * @FilePath: /vite-react-swc/src/pages/music/music-home/recommend-playlist/PlaylistCard.tsx
 * @Description:
 */
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { isMobile } from '@/const'
import { PlaylistItem } from '@/interface/music'
import './index.scss'

type Props = {
  data: PlaylistItem
}
const PlaylistCard = (props: Props) => {
  const { data } = props
  const navigate = useNavigate()
  const desc = useMemo(() => {
    const limit = isMobile ? 80 : 100
    const d = data.description
    return d.length > limit ? `${d.slice(1, limit - 2)}...` : d
  }, [data.description])
  return (
    <div className="contain inline-block relative rounded-t-xl cursor-pointer">
      <div className="flip aspect-square">
        <div className="front">
          <div className="">
            <img className="rounded-t-xl" src={data.coverImgUrl} alt="" />
          </div>
        </div>
        <div
          className="back h-full bg-white/20 rounded-t-xl p-2 overflow-auto"
          onClick={() => navigate(`/music/playlist-detail?id=${data.id}`)}
        >
          <span className="text-xs text-ellipsis leading-none break-all">{desc}</span>
        </div>
      </div>
      <div className="h-16 bg-white/20 rounded-b-xl p-2">
        <span className="text-sm text-gray-700 leading-1">{data.name}</span>
      </div>
    </div>
  )
}
export default PlaylistCard
