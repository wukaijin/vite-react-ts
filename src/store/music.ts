/*
 * @Author: Carlos
 * @Date: 2023-01-06 00:23:34
 * @LastEditTime: 2023-01-06 23:22:58
 * @FilePath: /vite-react-swc/src/store/music.ts
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { STORE_KEYS } from '@/const'

export type Song = {
  artiest: string
  name: string
  album: string
  id: number
  url: string
  lyric: string
}
export type State = {
  current: Song
  playing: boolean
  showPlayer: boolean
}
const storedCurrent = window.localStorage.getItem(STORE_KEYS.MUSIC_CURRENT)
const empty: Song = {
  artiest: '',
  name: '',
  album: '',
  id: 0,
  url: '',
  lyric: ''
}
const initialState: State = {
  playing: false,
  showPlayer: false,
  current: storedCurrent ? JSON.parse(storedCurrent) : empty
}

const todosSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    togglePlaying(state) {
      state.playing = !state.playing
    },
    togglePlayer(state) {
      state.showPlayer = !state.showPlayer
    },
    updateCurrentSong(state, action: PayloadAction<Partial<Song>>) {
      state.current = {
        ...state.current,
        ...action.payload
      }
      window.localStorage.setItem(STORE_KEYS.MUSIC_CURRENT, JSON.stringify(state.current))
    }
  }
})

export const { togglePlaying, togglePlayer, updateCurrentSong } = todosSlice.actions
export default todosSlice.reducer
