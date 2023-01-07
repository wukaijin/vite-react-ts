/* eslint-disable comma-spacing */
/*
 * @Author: Carlos
 * @Date: 2023-01-06 13:30:17
 * @LastEditTime: 2023-01-07 15:22:26
 * @FilePath: /vite-react-swc/src/pages/music/index.tsx
 * @Description:
 */

import { useCallback, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Control, Search } from '@icon-park/react'
import Button from '@/components/base/Button'
import { updateCurrentSong, togglePlayer, togglePlaying } from '@/store/music'
import { NeuButton, NeuInput } from '@/components/neumorphism'
import logo from '@/assets/logo.png'
import './music.scss'
import Popup from '@/components/base/popup'
import Player from '@/components/enhance/player'
import { RootState } from '@/store'
import { queryKeyWord } from '@/api/music'
import { QueryListData } from '@/interface/music'
import List from './List'

const isMobile = document.documentElement.offsetWidth < 500

type Props = PropsFromRedux
const MusicPage = ({
  current,
  updateCurrentSong: updateCS,
  showPlayer,
  togglePlayer: toggleMusicPlayer
}: Props) => {
  const [keyWord, setKeyWord] = useState<string>('')
  // eslint-disable-next-line quote-props, key-spacing, quotes, object-curly-spacing
  const [data, setData] = useState<QueryListData[]>([])
  const query = useCallback(async () => {
    const result = await queryKeyWord<QueryListData>(keyWord)
    if (result) {
      setData(result)
    }
  }, [keyWord, setData])
  return (
    <div className="music-page">
      <div className="music-header flex">
        <span className="music-logo">
          <img className="" src={logo} alt="" />
        </span>
        <span className="flex-1 flex items-center justify-center">
          <NeuInput
            size="xs"
            style={{ width: '100%', maxWidth: '24rem', marginRight: '0.5rem' }}
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
          <NeuButton className="ml-2" size="xs" onClick={() => toggleMusicPlayer()}>
            <Control
              theme="outline"
              className=" text-slate-400 cursor-pointer hover:text-indigo-500 hover:scale-110"
            />
          </NeuButton>
        </span>
      </div>
      <div className="w-[100vw] sm:w-[800px] mx-auto">
        <div className="music-query-panel">
          <Button size="sm">OK</Button>
          <Button size="sm" color="primary" onClick={() => toggleMusicPlayer()}>
            toggle Popup
          </Button>
        </div>
        <div className="my-4">
          <List data={data} />
        </div>
        <Popup
          show={showPlayer}
          from={isMobile ? 'bottom' : 'right'}
          className={isMobile ? 'right-0' : 'top-1/2 -translate-y-1/2'}
        >
          <Player
            from={isMobile ? 'bottom' : 'right'}
            current={current}
            togglePlayer={() => toggleMusicPlayer()}
          />
        </Popup>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  current: state.music.current,
  playing: state.music.playing,
  showPlayer: state.music.showPlayer
})
const mapDispatchToProps = {
  updateCurrentSong,
  togglePlayer,
  togglePlaying
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(MusicPage)
