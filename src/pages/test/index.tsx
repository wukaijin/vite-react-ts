/*
 * @Author: Carlos
 * @Date: 2023-01-03 21:56:19
 * @LastEditTime: 2023-01-06 22:01:27
 * @FilePath: /vite-react-swc/src/pages/test/index.tsx
 * @Description:
 */
import { startTransition, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useMount } from 'ahooks'
import { loginAnonymous, queryKeyWord, queryLyric, querySrc } from '@/api/music'
import SearchTable from './SearchTable'
import Popup from '@/components/base/popup'
import Player from '@/components/enhance/player'
import { updateCurrentSong } from '@/store/music'
import { RootState } from '@/store'
import eventemitter from '@/utils/eventemitter'
import { EVENT_KEYS } from '@/const'
import { QueryListData } from '@/interface/music'

const isMobile = document.documentElement.offsetWidth < 500
type Props = PropsFromRedux
// Input

function Test({ current, updateCurrentSong: updateCS }: Props) {
  const [keyWord, setKeyWord] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [data, setData] = useState<QueryListData[]>([])
  const [show, setShow] = useState(false)
  // const
  useMount(() => {
    eventemitter.on
    return () => {}
  })
  return (
    <div className="px-4 py-8 bg-[#E4EBF5] min-h-[100vh]">
      <div className="m-auto">
        <div className="mb-2">
          <button className="btn btn-primary" onClick={loginAnonymous}>
            匿名登录
          </button>
          <button className="btn btn-primary" onClick={() => setShow(!show)}>
            toggle Popup
          </button>
        </div>
        <div className="mb-2">
          <span>搜索关键字：</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary"
            value={keyWord}
            onChange={e => setKeyWord(e.target.value)}
            onKeyUp={async e => {
              if (e.code === 'Enter') {
                const result = await queryKeyWord<QueryListData>(keyWord)
                if (result) {
                  setData(result)
                }
              }
            }}
          />
        </div>
        <div className="mb-2">
          <span>搜索歌曲ID：</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary"
            value={id}
            onChange={e => setId(e.target.value)}
            onKeyUp={e => {
              if (e.code === 'Enter') {
                querySrc(id)
              }
            }}
          />
        </div>
        <div>
          <SearchTable
            className="w-[100%]"
            data={data}
            onClick={async (item: QueryListData) => {
              const url = await querySrc(`${item.id}`)
              const lyricString = await queryLyric(`${item.id}`)
              // url && setMusicSrc(url)
              updateCS({
                id: item.id,
                lyric: lyricString,
                artiest: item.artists[0].name,
                url,
                name: item.name,
                album: item.album.name,
              })
              startTransition(() => {
                eventemitter.emit(EVENT_KEYS.MUSIC_PLAYER_STATE_CHANGE)
              })
            }}
          />
        </div>
      </div>
      <Popup
        show={show}
        from={isMobile ? 'bottom' : 'right'}
        className={isMobile ? 'right-0' : 'top-1/2 -translate-y-1/2'}
      >
        <Player
          from={isMobile ? 'bottom' : 'right'}
          current={current}
          togglePlayer={() => setShow(!show)}
        />
      </Popup>
    </div>
  )
}
const mapStateToProps = (state: RootState) => ({
  current: state.music.current
})
const mapDispatchToProps = {
  updateCurrentSong
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(Test)
