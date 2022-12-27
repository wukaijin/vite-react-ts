/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:03:47
 * @LastEditTime: 2022-12-28 00:18:44
 * @FilePath: /vite-react-swc/src/redux/todos.ts
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string
  text: string
  completed: boolean
}
type ActionPayload = Partial<Todo>
const initialState: Todo[] = []

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<ActionPayload>) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: !!action.payload.completed
      } as Todo)
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.find(todo => todo.id === action.payload)
      todo!.completed = !todo!.completed
    },
    todoRemoved(state, action: PayloadAction<number>) {
      state.splice(action.payload)
    }
  }
})

export const { todoAdded, todoToggled, todoRemoved } = todosSlice.actions
export default todosSlice.reducer
