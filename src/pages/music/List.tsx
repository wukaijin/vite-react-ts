/*
 * @Author: Carlos
 * @Date: 2023-01-06 16:28:55
 * @LastEditTime: 2023-01-09 22:47:55
 * @FilePath: /vite-react-swc/src/pages/music/List.tsx
 * @Description:
 */
import { ConnectedProps, connect } from 'react-redux'
import { Like, PlayOne, Pause } from '@icon-park/react'
import clsx from 'clsx'
import { NeuButton, NeuPanel } from '@/components/neumorphism'
import { QueryListData } from '@/interface/music'
import { updateCurrentSong, togglePlaying } from '@/store/music'
import { queryLyric, querySrc } from '@/api/music'
import { RootState } from '@/store'

type ItemProps = ReduxPlus & {
  data: QueryListData
}
const connector = connect(
  (state: RootState) => ({ current: state.music.current, playing: state.music.playing }),
  {
    updateCurrentSong,
    togglePlaying
  }
)
type ReduxPlus = ConnectedProps<typeof connector>

const ListItem = connector(
  ({
    data,
    updateCurrentSong: updateCS,
    playing,
    togglePlaying: toggleP,
    current: currentPlayingSong
  }: ItemProps) => {
    const handlePlay = async () => {
      if (playing && currentPlayingSong.id === data.id) {
        toggleP(false)
        return
      }
      const url = await querySrc(`${data.id}`)
      const lyricString = await queryLyric(`${data.id}`)
      updateCS({
        id: data.id,
        alias: data.alias.length ? data.alias[0] : '',
        lyric: lyricString,
        artiest: data.artists[0].name,
        url,
        name: data.name,
        album: data.album.name
      })
      toggleP(true)
    }

    return (
      <NeuPanel
        className={clsx('mb-5 px-4 py-3', {
          'bg-wave': playing && currentPlayingSong.id === data.id
        })}
      >
        <div className="flex ">
          <div className="flex items-center justify-center mr-2">
            <Like
              theme="filled"
              className="text-slate-300 text-2xl cursor-pointer hover:text-rose-400"
            />
          </div>
          <div className="flex-1">
            <div className="text-base text-gray-500 overflow-hidden">
              <span>{data.name}</span>
              {!!data.alias.length && <span className="text-gray-400">({data.alias[0]})</span>}
            </div>
            <div className="text-sm text-gray-400 overflow-hidden">
              <span>{data.artists.map(e => e.name).join(', ')}</span>
              {data.album?.name && (
                <>
                  <span className="mx-1">-</span>
                  <span>{data.album.name}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center ml-2">
            <NeuButton size="xs" shape="circle" className="" onClick={handlePlay}>
              {playing && currentPlayingSong.id === data.id ? <Pause /> : <PlayOne />}
            </NeuButton>
          </div>
        </div>
      </NeuPanel>
    )
  }
)

type Props = {
  data: QueryListData[]
}

const List = ({ data }: Props) => {
  return (
    <div className="w-96 m-auto text-gray-500 sm:grid sm:w-[48rem] sm:sm:grid-cols-2 sm:gap-x-3 px-4 pt-6 pb-4 rounded-xl bg-[var(--neu-greyLight-1)]">
      {data && data.map(item => <ListItem key={item.id} data={item} />)}
    </div>
  )
}

export default List
