/*
 * @Author: Carlos
 * @Date: 2023-01-15 16:05:29
 * @LastEditTime: 2023-01-16 00:24:27
 * @FilePath: /vite-react-swc/src/pages/management/blog/mock.ts
 * @Description:
 */
import { Article, Tag, Category } from '@/interface/blog'

export const MOCK_TAGS: Tag[] = [
  {
    id: 1,
    text: 'JavaScript',
    color: '#A370F0'
  },
  {
    id: 2,
    text: 'CSS',
    color: '#608ffc'
  },
  {
    id: 3,
    text: 'NextJS',
    color: '#37cdbe'
  }
]

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    text: 'Frontend'
  },
  {
    id: 11,
    text: 'CSSCSSCSSCSSCSSCSSCSSCSSCSS',
    belongs: 1
  },
  {
    id: 12,
    text: 'JavaScript',
    belongs: 1
  },
  {
    id: 2,
    text: 'Backend'
  },
  {
    id: 21,
    text: 'Server',
    belongs: 2
  },
  {
    id: 22,
    text: 'Database',
    belongs: 2
  },
  {
    id: 3,
    text: 'OP'
  },
  {
    id: 31,
    text: 'Shell',
    belongs: 3
  },
  {
    id: 32,
    text: 'Docker',
    belongs: 3
  },
  {
    id: 4,
    text: 'Chore'
  }
]

export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'TS设计模式',
    tags: [1],
    category: 11,
    state: 1,
    content: '# Hello'
  },
  {
    id: 1,
    title: 'NestJS心得',
    tags: [2, 3],
    category: 21,
    state: 0,
    content: '# Hello'
  }
]

export default {}
