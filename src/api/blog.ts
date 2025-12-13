/*
 * @Author: Carlos
 * @Date: 2023-01-17 13:38:04
 * @LastEditTime: 2023-01-24 16:29:44
 * @FilePath: /vite-react-swc/src/api/blog.ts
 * @Description:
 */
import type { Article, Category, SubmitArticle, Tag } from '@/interface/blog'
import request from '@/utils/request'

const BLOG_PREFIX = '/nest-api/blog/'
type Wrapping = { code: number; message: string; success: boolean }
type WithWrapping<T> = T & Wrapping

export const TagApi = {
  findAll() {
    return request.get<WithWrapping<Tag[]>>(`${BLOG_PREFIX}tag`).then(res => res.data)
  },
  findOne(id: Tag['id']) {
    return request.get<WithWrapping<Tag>>(`${BLOG_PREFIX}tag/${id}`).then(res => res.data)
  },
  add(data: Partial<Tag>) {
    return request.post<WithWrapping<Tag>>(`${BLOG_PREFIX}tag`, data)
  },
  edit(id: Tag['id'], data: Partial<Tag>) {
    return request.patch<WithWrapping<Tag>>(`${BLOG_PREFIX}tag/${id}`, data)
  },
  delete(id: Tag['id']) {
    return request.delete<WithWrapping<Tag>>(`${BLOG_PREFIX}tag/${id}`)
  }
}

export const CategoryApi = {
  findAll() {
    return request.get<WithWrapping<Category[]>>(`${BLOG_PREFIX}category`).then(res => res.data)
  },
  findOne(id: Tag['id']) {
    return request.get<WithWrapping<Category>>(`${BLOG_PREFIX}category/${id}`).then(res => res.data)
  },
  add(data: Partial<Category>) {
    return request.post<WithWrapping<Category>>(`${BLOG_PREFIX}category`, data)
  },
  edit(id: Category['id'], data: Partial<Category>) {
    return request.patch<WithWrapping<Category>>(`${BLOG_PREFIX}category/${id}`, data)
  },
  delete(id: Category['id']) {
    return request.delete<WithWrapping<Category>>(`${BLOG_PREFIX}category/${id}`)
  }
}

export const ArticleApi = {
  findAll() {
    return request.get<WithWrapping<Article[]>>(`${BLOG_PREFIX}article`).then(res => res.data)
  },
  findByCategoryId(id: string) {
    return request
      .get<WithWrapping<Article[]>>(`${BLOG_PREFIX}article/findByCategoryId/${id}`)
      .then(res => res.data)
  },
  findOne(id: Article['id']) {
    return request.get<WithWrapping<Article>>(`${BLOG_PREFIX}article/${id}`).then(res => res.data)
  },
  searchByKeyword(keyword: string) {
    return request
      .get<WithWrapping<Article[]>>(`${BLOG_PREFIX}article/search/${keyword}`)
      .then(res => res.data)
  },
  findRelativeById(id: Article['id']) {
    return request
      .get<WithWrapping<Article[]>>(`${BLOG_PREFIX}article/relative/${id}`)
      .then(res => res.data)
  },
  add(data: Partial<SubmitArticle>) {
    return request.post<WithWrapping<Article>>(`${BLOG_PREFIX}article`, data)
  },
  edit(id: Article['id'], data: Partial<SubmitArticle>) {
    return request.patch<WithWrapping<Article>>(`${BLOG_PREFIX}article/${id}`, data)
  },
  delete(id: Article['id']) {
    return request.delete<WithWrapping<Article>>(`${BLOG_PREFIX}article/${id}`)
  }
}
export default {
  TagApi,
  CategoryApi,
  ArticleApi
}
