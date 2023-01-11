/*
 * @Author: Carlos
 * @Date: 2023-01-11 11:54:14
 * @LastEditTime: 2023-01-11 12:22:01
 * @FilePath: /vite-react-swc/src/pages/music/util.ts
 * @Description:
 */
import { startTransition } from 'react'
import { queryLyric, querySrc } from '@/api/music'
import { EVENT_KEYS } from '@/const'
import { Song } from '@/store/music'
import eventemitter from '@/utils/eventemitter'

type Params = {
  song: Partial<Song>
  updateCurrentSong: (s: Partial<Song>) => void
  togglePlaying: () => void
}

export async function listen({ song, updateCurrentSong, togglePlaying }: Params): Promise<void> {
  const url = await querySrc(`${song.id}`)
  updateCurrentSong({
    ...song,
    url
  })
  const lyric = await queryLyric(`${song.id}`)
  updateCurrentSong({
    lyric
  })
  togglePlaying()
  startTransition(() => {
    eventemitter.emit(EVENT_KEYS.MUSIC_PLAYER_STATE_TO_PLAY)
  })
}

export default {}
