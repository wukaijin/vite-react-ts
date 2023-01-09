/*
 * @Author: Carlos
 * @Date: 2023-01-07 16:37:36
 * @LastEditTime: 2023-01-09 16:41:49
 * @FilePath: /vite-react-swc/src/pages/music/music-home/NewSongs.tsx
 * @Description:
 */
import { memo, startTransition, useCallback, useState } from 'react'
import { useMount, useRequest } from 'ahooks'
import clsx from 'clsx'
import { Play } from '@icon-park/react'
import { connect, ConnectedProps } from 'react-redux'
import { queryLyric, queryNewSongs, querySrc } from '@/api/music'
import { QueryNewSongReturnData } from '@/interface/music'
import { togglePlaying, updateCurrentSong } from '@/store/music'
import { RootState } from '@/store'
import eventemitter from '@/utils/eventemitter'
import { EVENT_KEYS } from '@/const'
import ImageFallback from '@/components/enhance/ImageFallback'
import Loading from '@/components/base/Loading'

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
            <ImageFallback
              src={song.picUrl}
              placeholder={<div className="aspect-square bg-red" />}
              imageProps={{ className: 'rounded-t-xl' }}
            />
            <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-gray-700/20 backdrop-blur-sm opacity-0 hover:opacity-100">
              <Play
                theme="filled"
                className="text-[5rem] sm:text-[3rem] lg:text-[4rem] rounded-full opacity-80 play-pulse"
              />
            </div>
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

const NewSongs = memo<Props>(props => {
  const { data = [], loading } = useRequest(queryNewSongs)
  return (
    <div className="px-4 xs:px-0 m-auto">
      <div className="text-xl font-medium leading-14 ">New & trending songs</div>
      {loading && (
        <div className="flex justify-center text-center items-center  py-16">
          <Loading.Circle />
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map(song => {
            return <NewSongItem key={song.id} song={song} />
          })}
        </div>
      )}
    </div>
  )
})
export default NewSongs
