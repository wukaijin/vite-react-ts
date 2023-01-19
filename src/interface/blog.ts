/*
 * @Author: Carlos
 * @Date: 2023-01-14 17:05:00
 * @LastEditTime: 2023-01-19 23:38:27
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
  belongs: Category | null,
  defaultPoster: string
}

export interface Article {
  id: string
  title: string
  tags: string[]
  category: string,
  state: ArticleState,
  content: string,
  poster?: string
}
