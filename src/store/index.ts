/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:47:47
 * @LastEditTime: 2023-01-06 01:10:24
 * @FilePath: /vite-react-swc/src/store/index.ts
 * @Description: redux store
 * @Reference: https://redux-toolkit.js.org/tutorials/typescript
 */
import { configureStore } from '@reduxjs/toolkit'
import todos from './todos'
import music from './music'

const store = configureStore({
  reducer: {
    todos,
    music
  }
})
// export type rootState = ReturnType<typeof reducers>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
