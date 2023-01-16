/*
 * @Author: Carlos
 * @Date: 2023-01-14 17:05:00
 * @LastEditTime: 2023-01-16 13:43:08
 * @FilePath: /vite-react-swc/src/interface/blog.ts
 * @Description:
 */

export enum ArticleState {
  UN_PUBLISHED,
  PUBLISHED
}

export interface Tag {
  id: number
  text: string
  color: string
}

export interface Category {
  id: number
  text: string
  belongs?: number,
  defaultPoster: string
}

export interface Article {
  id: number
  title: string
  tags: number[]
  category: number,
  state: ArticleState,
  content: string,
  poster?: string
}
