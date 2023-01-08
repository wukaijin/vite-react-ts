/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:03:47
 * @LastEditTime: 2023-01-08 02:22:43
 * @FilePath: /vite-react-swc/src/store/todos.ts
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createRef, RefObject } from 'react'

export type Todo = {
  id: string
  text: string
  completed: boolean,
  ref: any
}
type ActionPayload = Partial<Todo>
const initialState: Todo[] = []

export const asyncFetchData = createAsyncThunk<Todo[]>('todos/asyncFetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  return response.json().then(data =>
    data.slice(1, 100).map((t: any) => ({
      id: t.id.toString(),
      text: t.title,
      completed: t.completed,
      ref: createRef<HTMLDivElement>()
    })))
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<ActionPayload>) {
      state.push({
        id: action.payload.id!,
        text: action.payload.text!,
        completed: !!action.payload.completed,
        ref: createRef<HTMLDivElement>()
      })
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.find(_todo => _todo.id === action.payload)
      todo!.completed = !todo!.completed
    },
    todoRemoved(state, action: PayloadAction<Todo>) {
      const index = state.findIndex(e => e.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(asyncFetchData.fulfilled, (state, action) => {
      state.length = 0
      state.push(...action.payload)
    })
  }
})

export const { todoAdded, todoToggled, todoRemoved } = todosSlice.actions
export default todosSlice.reducer
