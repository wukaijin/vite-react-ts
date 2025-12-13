/*
 * @Author: Carlos
 * @Date: 2025-12-13 22:13:00
 * @LastEditTime: 2025-12-13 22:13:00
 * @FilePath: /vite-react-swc/src/stores/useBlogStore.ts
 * @Description: Blog store using Zustand
 */
import { create } from 'zustand'
import type { Category, Tag } from '@/interface/blog'
import { CategoryApi, TagApi } from '@/api/blog'

type SerializedCategory = Category & {
  children?: Category[]
}

interface BlogStore {
  categories: Category[]
  tags: Tag[]
  serializedCategories: SerializedCategory[]
  fetchCategories: () => Promise<void>
  fetchTags: () => Promise<void>
}

// 序列化分类（将扁平结构转换为树形结构）
function serialize(categories: Category[]): SerializedCategory[] {
  const result: Record<string, SerializedCategory> = {}

  // 先添加根分类
  categories.forEach(c => {
    if (!c.belongs) {
      result[c.id] = { ...c, children: [] }
    }
  })

  // 再添加子分类
  categories.forEach(c => {
    if (c.belongs) {
      result[c.belongs.id].children?.push(c)
    }
  })

  return Object.values(result)
}

export const useBlogStore = create<BlogStore>((set) => ({
  categories: [],
  tags: [],
  serializedCategories: [],

  fetchCategories: async () => {
    try {
      const response = await CategoryApi.findAll()
      if (response && response.length) {
        set({
          categories: response,
          serializedCategories: serialize(response)
        })
      } else {
        set({ categories: [], serializedCategories: [] })
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      set({ categories: [], serializedCategories: [] })
    }
  },

  fetchTags: async () => {
    try {
      const response = await TagApi.findAll()
      if (response && response.length) {
        set({ tags: response })
      } else {
        set({ tags: [] })
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error)
      set({ tags: [] })
    }
  }
}))
