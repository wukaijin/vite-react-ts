/* eslint-disable comma-spacing */
/*
 * @Author: Carlos
 * @Date: 2023-01-06 13:30:17
 * @LastEditTime: 2023-01-28 13:39:14
 * @FilePath: /vite-react-swc/src/pages/music/index.tsx
 * @Description:
 */

import { CSSProperties, useCallback, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { updateCurrentSong, togglePlayer, togglePlaying } from '@/store/music'
import './music.scss'
import Popup from '@/components/base/popup'
import Player from '@/components/enhance/player'
import { RootState } from '@/store'
import MusicHeader from './MusicHeader'

const isMobile = document.documentElement.offsetWidth < 500

type Props = PropsFromRedux
const MusicPage = ({
  // current,
  // updateCurrentSong: updateCS,
  showPlayer,
  togglePlayer: toggleMusicPlayer
}: Props) => {
  const [keyWord, setKeyWord] = useState<string>('')
  const [style, setStyle] = useState<CSSProperties>({})
  const navigate = useNavigate()
  const query = useCallback(async () => {
    navigate(`search?keyWord=${keyWord}`)
  }, [keyWord])
  const visible = useMemo(() => showPlayer, [showPlayer])
  return (
    <div className="music-page bg-spectrum-light-reverse pb-8" style={style}>
      <MusicHeader setKeyWord={setKeyWord} query={query} toggleMusicPlayer={toggleMusicPlayer} />
      <Outlet context={{ setTopStyle: setStyle }} />
      <Popup
        visible={visible}
        from={isMobile ? 'bottom' : 'right'}
        className={isMobile ? 'right-0' : 'top-1/2 -translate-y-1/2'}
      >
        <Player from={isMobile ? 'bottom' : 'right'} />
      </Popup>
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
