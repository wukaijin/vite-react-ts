/*
 * @Author: Carlos
 * @Date: 2023-01-07 16:09:57
 * @LastEditTime: 2023-05-22 13:58:00
 * @FilePath: /vite-react-swc/src/pages/music/MusicHeader.tsx
 * @Description:
 */
import { Control, Search } from '@icon-park/react'
import { useNavigate } from 'react-router-dom'

const logo = '/static-api/logo/transformer-256.png'

type Props = {
  setKeyWord: (str: string) => void
  query: () => void
  toggleMusicPlayer: () => void
}
const MusicHeader = (props: Props) => {
  const { setKeyWord, query, toggleMusicPlayer } = props
  const navigate = useNavigate()
  return (
    <div className="music-header flex">
      <span className="music-logo cursor-pointer">
        <img className="" src={logo} alt="" onClick={() => navigate('/music/home')} />
      </span>
      <span className="flex-1 flex text-center justify-center">
        <div className="input-group" style={{ width: '100%', maxWidth: '24rem' }}>
          <input
            type="text"
            className="input input-md w-full text-indigo-500 focus:outline-none"
            placeholder="Search name/artist/album"
            onChange={e => setKeyWord(e.target.value)}
            onKeyUp={async e => {
              if (e.code === 'Enter' || e.code === 'Search') {
                query()
              }
            }}
          />
          <button className="btn btn-square" onClick={query}>
            <Search
              theme="outline"
              className=" text-indigo-500 bg-transparent text-lg hover:scale-110"
            />
          </button>
        </div>
      </span>
      <span className="mx-2">
        <button className="btn btn-circle btn-ghost" onClick={() => toggleMusicPlayer()}>
          <Control theme="outline" className=" text-2xl cursor-pointer text-indigo-500" />
        </button>
      </span>
    </div>
  )
}
export default MusicHeader
