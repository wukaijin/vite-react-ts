/*
 * @Author: Carlos
 * @Date: 2023-01-07 16:37:36
 * @LastEditTime: 2023-01-07 23:59:43
 * @FilePath: /vite-react-swc/src/pages/music/NewSongs.tsx
 * @Description:
 */
import { startTransition, useCallback, useState } from 'react'
import { useMount } from 'ahooks'
import clsx from 'clsx'
import { connect, ConnectedProps } from 'react-redux'
import { queryLyric, queryNewSongs, querySrc } from '@/api/music'
import { QueryNewSongReturnData } from '@/interface/music'
import { togglePlaying, updateCurrentSong } from '@/store/music'
import { RootState } from '@/store'
import eventemitter from '@/utils/eventemitter'
import { EVENT_KEYS } from '@/const'

const connector = connect(
  (state: RootState) => ({
    current: state.music.current
  }),
  { updateCurrentSong, togglePlaying }
)
type WithReduxProps = ConnectedProps<typeof connector>
type ItemProps = WithReduxProps & {
  song: QueryNewSongReturnData
}
const NewSongItem = connector(
  ({
    song,
    updateCurrentSong: updateCS,
    togglePlaying: toggleP,
    current: CurrentPS
  }: ItemProps) => {
    const play = useCallback(async () => {
      const url = await querySrc(`${song.id}`)
      updateCS({
        name: song.name,
        artiest: song.song.artists.map(a => a.name).join(', '),
        album: song.song.album.name,
        id: song.id,
        url
      })
      const lyric = await queryLyric(`${song.id}`)
      updateCS({
        lyric
      })
      startTransition(() => {
        eventemitter.emit(EVENT_KEYS.MUSIC_PLAYER_STATE_CHANGE)
      })
    }, [])
    return (
      <div className="rounded-xl overflow-hidden backdrop-blur relative bg-white bg-opacity-20 bound-scale">
        <div className="">
          <div className="relative cursor-pointer" onClick={play}>
            <img className="rounded-t-xl" src={song.picUrl} alt="" />
            <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center backdrop-blur-sm opacity-0 hover:opacity-100" />
          </div>
          <div className={clsx('p-2', { 'bg-wave': CurrentPS.id === song.id })}>
            <div className="text-sm text-gray-700 mb-1 truncate">{song.name}</div>
            <div className="text-xs text-gray-500 truncate mb-1">
              <span>{song.song.artists.map(a => a.name).join(', ')}</span>
              {song.song.album.name !== song.name && <span> - {song.song.album.name}</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

type Props = {}
// const a = a;
const NewSongs = (props: Props) => {
  const [data, setData] = useState<QueryNewSongReturnData[]>([])
  useMount(() => {
    !data.length &&
      queryNewSongs().then(res => {
        console.log(res)
        setData(res)
      })
  })
  return (
    <div className="px-4 m-auto">
      <div>123</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map(song => {
          return <NewSongItem key={song.id} song={song} />
        })}
      </div>
    </div>
  )
}
export default NewSongs
