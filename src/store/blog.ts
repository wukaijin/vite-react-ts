/*
 * @Author: Carlos
 * @Date: 2023-01-19 21:14:21
 * @LastEditTime: 2023-01-20 02:43:05
 * @FilePath: /vite-react-swc/src/store/blog.ts
 * @Description:
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { Category, Tag } from '@/interface/blog'
import { CategoryApi, TagApi } from '@/api/blog'

type serializedCategory = Category & {
  children?: Category[]
}
export type State = {
  categories: Category[]
  tags: Tag[]
  serializedCategories: serializedCategory[]
}

function serialize(categories: Category[]): serializedCategory[] {
  const result: Record<string, serializedCategory> = {}
  categories.forEach(c => {
    if (!c.belongs) {
      result[c.id] = { ...c, children: [] }
    }
  })
  categories.forEach(c => {
    if (c.belongs) {
      result[c.belongs.id].children?.push(c)
    }
  })
  return Object.values(result)
}

const initialState: State = {
  categories: [],
  tags: [],
  serializedCategories: []
}

export const asyncFetchCategories = createAsyncThunk<Category[]>(
  'blog/asyncFetchCategories',
  async () => {
    try {
      const response = await CategoryApi.findAll()
      if (response && response.length) return response
      return []
    } catch (error) {
      console.error(error)
      return []
    }
  }
)
export const asyncFetchTags = createAsyncThunk<Tag[]>('blog/asyncFetchTags', async () => {
  try {
    const response = await TagApi.findAll()
    if (response && response.length) return response
    return []
  } catch (error) {
    console.error(error)
    return []
  }
})

const blog = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncFetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.serializedCategories = serialize(action.payload)
      })
      .addCase(asyncFetchTags.fulfilled, (state, action) => {
        state.tags = action.payload
      })
  }
})
export default blog.reducer
