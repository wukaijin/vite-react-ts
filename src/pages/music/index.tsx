/* eslint-disable comma-spacing */
/*
 * @Author: Carlos
 * @Date: 2023-01-06 13:30:17
 * @LastEditTime: 2023-01-09 15:58:19
 * @FilePath: /vite-react-swc/src/pages/music/index.tsx
 * @Description:
 */

import { useCallback, useMemo, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { updateCurrentSong, togglePlayer, togglePlaying } from '@/store/music'

import './music.scss'
import Popup from '@/components/base/popup'
import Player from '@/components/enhance/player'
import { RootState } from '@/store'
import { queryKeyWord } from '@/api/music'
import { QueryListData } from '@/interface/music'
import List from './List'
import MusicHeader from './MusicHeader'
import NewSongs from './NewSongs'
import RecommendPlayList from './recommendPlaylist'
import HomeBanner from './homeBanner'

const isMobile = document.documentElement.offsetWidth < 500

type Props = PropsFromRedux
const MusicPage = ({
  // current,
  // updateCurrentSong: updateCS,
  showPlayer,
  togglePlayer: toggleMusicPlayer
}: Props) => {
  const [keyWord, setKeyWord] = useState<string>('')
  const [data, setData] = useState<QueryListData[]>([])
  const query = useCallback(async () => {
    const result = await queryKeyWord<QueryListData>(keyWord)
    if (result) {
      setData(result)
    }
  }, [keyWord, setData])
  const show = useMemo(() => showPlayer, [showPlayer])
  return (
    <div className="music-page bg-spectrum-light-reverse pb-12">
      <MusicHeader
        keyWord={keyWord}
        setKeyWord={setKeyWord}
        query={query}
        toggleMusicPlayer={toggleMusicPlayer}
      />
      <div className="w-[100vw] sm:container xl:w-[1024px] mx-auto">
        <NewSongs />
        <HomeBanner />
        <RecommendPlayList />
        <List data={data} />
        <Popup
          show={show}
          from={isMobile ? 'bottom' : 'right'}
          className={isMobile ? 'right-0' : 'top-1/2 -translate-y-1/2'}
        >
          <Player from={isMobile ? 'bottom' : 'right'} togglePlayer={() => toggleMusicPlayer()} />
        </Popup>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    current: state.music.current,
    playing: state.music.playing,
    showPlayer: state.music.showPlayer
  }
}
const mapDispatchToProps = {
  updateCurrentSong,
  togglePlayer,
  togglePlaying
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(MusicPage)
