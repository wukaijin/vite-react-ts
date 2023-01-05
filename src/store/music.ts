/*
 * @Author: Carlos
 * @Date: 2023-01-06 00:23:34
 * @LastEditTime: 2023-01-06 02:24:08
 * @FilePath: /vite-react-swc/src/store/music.ts
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { STORE_KEYS } from '@/const'

export type Song = {
  artiest: string
  name: string
  id: number
  url: string
  lyric: string
}
export type State = {
  current: Song
}
const storedCurrent = window.localStorage.getItem(STORE_KEYS.MUSIC_CURRENT)
const empty: Song = {
  artiest: '',
  name: '',
  id: 0,
  url: '',
  lyric: ''
}
const initialState: State = {
  current: storedCurrent ? JSON.parse(storedCurrent) : empty
}

const todosSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    updateCurrentSong(state, action: PayloadAction<Partial<Song>>) {
      state.current = {
        ...state.current,
        ...action.payload
      }
      window.localStorage.setItem(STORE_KEYS.MUSIC_CURRENT, JSON.stringify(state.current))
    }
  }
})

export const { updateCurrentSong } = todosSlice.actions
export default todosSlice.reducer
