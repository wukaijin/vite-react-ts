/*
 * @Author: Carlos
 * @Date: 2023-01-15 21:08:12
 * @LastEditTime: 2023-01-16 13:47:01
 * @FilePath: /vite-react-swc/src/pages/management/blog/articles/Add.tsx
 * @Description: 
 */
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useReactive } from 'ahooks'
import { FileEditingOne, FolderOpen } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import { Article } from '@/interface/blog'
import { MOCK_TAGS, MOCK_CATEGORIES } from '../mock'
import ArticlesForm from './ArticlesForm'

type Type = 'Add' | 'Edit'

type Props = {}
const AddArticles = (props: Props) => {
  const navigator = useNavigate()
  const formFields = useReactive<Partial<Article>>({
    title: '',
    tags: [],
    category: 0,
    state: 1,
    content: '',
    poster: ''
  })
  const categoryOptions = useMemo(() => MOCK_CATEGORIES.filter(m => m.belongs), [])
  const tagsOptions = useMemo(() => MOCK_TAGS, [])
  // const getTags = (tags: number[]) => {
  //   return tags.map(t => tagsOptions.find(o => o.id === t)).filter(e => !!e) as Tag[]
  // }
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem text="blog" Icon={FolderOpen} />
        <BreadcrumbsItem text="articles" Icon={FolderOpen} disabled={false} onClick={() => navigator('..', { relative: 'path' })} />
        <BreadcrumbsItem text="add" Icon={FileEditingOne} />
      </Breadcrumbs>
      <h2 className="text-lg py-2">Add Article</h2>
      <ArticlesForm data={formFields} />
    </div>
  )
}
export default AddArticles
