/*
 * @Author: Carlos
 * @Date: 2023-01-07 16:09:57
 * @LastEditTime: 2023-01-09 15:58:09
 * @FilePath: /vite-react-swc/src/pages/music/MusicHeader.tsx
 * @Description:
 */
import { Control, Search } from '@icon-park/react'
import { NeuButton, NeuInput } from '@/components/neumorphism'
import logo from '@/assets/logo.png'

type Props = {
  keyWord: string
  setKeyWord: (str: string) => void
  query: () => void
  toggleMusicPlayer: () => void
}
const MusicHeader = (props: Props) => {
  const { keyWord, setKeyWord, query, toggleMusicPlayer } = props
  return (
    <div className="music-header flex">
      <span className="music-logo">
        <img className="" src={logo} alt="" />
      </span>
      <span className="flex-1 flex items-center justify-center">
        <NeuInput
          size="xs"
          style={{ width: '100%', maxWidth: '24rem', marginRight: '0.5rem' }}
          className="bg-[var(--neu-greyLight-1)] overflow-hidden"
          inputStyle={{ color: 'var(--neu-primary)' }}
          icon={<Search />}
          value={keyWord}
          onChange={e => setKeyWord(e.target.value)}
          onKeyUp={async e => {
            if (e.code === 'Enter' || e.code === 'Search') {
              query()
            }
          }}
          placeholder="Search name/artist/album"
        >
          <NeuButton size="xs" onClick={() => query()}>
            <Search
              theme="outline"
              className=" text-slate-400 cursor-pointer hover:text-indigo-500 hover:scale-110"
            />
          </NeuButton>
        </NeuInput>
      </span>
      <span className="mx-2">
        <NeuButton className="ml-2 " size="xs" onClick={() => toggleMusicPlayer()}>
          <Control
            theme="outline"
            className=" text-slate-400 cursor-pointer hover:text-indigo-500 hover:scale-110"
          />
        </NeuButton>
      </span>
    </div>
  )
}
export default MusicHeader
