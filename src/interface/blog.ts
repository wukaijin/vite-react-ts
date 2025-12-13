/*
 * @Author: Carlos
 * @Date: 2023-01-14 17:05:00
 * @LastEditTime: 2023-05-22 13:34:53
 * @FilePath: /vite-react-swc/src/interface/blog.ts
 * @Description:
 */

export enum ArticleState {
  UN_PUBLISHED,
  PUBLISHED
}

export interface Tag {
  id: string
  text: string
  color: string
}

export interface Category {
  id: string
  text: string
  order: number
  description: string
  belongs: Category | null
  defaultPoster: string
}

export interface Article {
  id: string
  title: string
  tags: Tag[]
  category: Category
  state: ArticleState
  content: string
  description: string
  poster?: string
  updateAt: string
  createAt: string
}

export type SubmitArticle = Omit<Article, 'tags' | 'category'> & {
  tags: string[]
  category: string
}
