/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:47:47
 * @LastEditTime: 2022-12-27 22:10:28
 * @FilePath: /vite-react-swc/src/redux/store.ts
 * @Description: redux store
 * @Reference: https://redux-toolkit.js.org/tutorials/typescript
 */
import { configureStore } from '@reduxjs/toolkit'
import todos from './todos'

const store = configureStore({
  reducer: {
    todos
  }
})
// export type rootState = ReturnType<typeof reducers>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
