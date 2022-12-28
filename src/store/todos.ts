/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:03:47
 * @LastEditTime: 2022-12-28 15:53:29
 * @FilePath: /vite-react-swc/src/store/todos.ts
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string
  text: string
  completed: boolean
}
type ActionPayload = Partial<Todo>
const initialState: Todo[] = [{
  id: 'asdas',
  text: 'asdas',
  completed: false,
}]

export const asyncFetchData = createAsyncThunk<Todo[]>(
  'todos/asyncFetchData',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    return response.json().then(data => {
      return (
        data
          // .slice(1, 6)
          .map((t: any) => ({
            id: t.id.toString(),
            text: t.title,
            completed: false
          }))
      )
    })
  }
)

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
      asyncFetchData.fulfilled
    }
  },
  extraReducers: builder => {
    builder.addCase(asyncFetchData.fulfilled, (state, action) => {
      console.log(this, state, action.payload)
      state.length = 0
      state.push(...action.payload)
      state[0].text = 'ssssss'
    })
  }
})

export const { todoAdded, todoToggled, todoRemoved } = todosSlice.actions
export default todosSlice.reducer
