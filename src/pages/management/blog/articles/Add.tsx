/*
 * @Author: Carlos
 * @Date: 2023-01-15 21:08:12
 * @LastEditTime: 2023-01-20 14:50:38
 * @FilePath: /vite-react-ts/src/pages/management/blog/articles/Add.tsx
 * @Description:
 */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FileEditingOne, FolderOpen } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import ArticlesForm from './ArticlesForm'
import { ArticleApi } from '@/api/blog'
import type { SubmitArticle } from '@/interface/blog'

const AddArticle = () => {
  const navigator = useNavigate()
  const [formFields, setFormFields] = useState<Partial<SubmitArticle>>({
    title: '',
    tags: [],
    category: '',
    state: 1,
    content: '',
    poster: '',
    description: ''
  })
  // const getTags = (tags: number[]) => {
  //   return tags.map(t => tagsOptions.find(o => o.id === t)).filter(e => !!e) as Tag[]
  // }
  const onSubmit = () => {
    ArticleApi.add(formFields).then(() => {
      navigator('..', { relative: 'path' })
    })
  }
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem text="blog" Icon={FolderOpen} />
        <BreadcrumbsItem
          text="articles"
          Icon={FolderOpen}
          disabled={false}
          onClick={() => navigator('..', { relative: 'path' })}
        />
        <BreadcrumbsItem text="add" Icon={FileEditingOne} />
      </Breadcrumbs>
      <h2 className="text-lg py-2">Add Article</h2>
      <ArticlesForm
        data={formFields}
        onChange={(part: Partial<SubmitArticle>) => setFormFields(_s => ({ ..._s, ...part }))}
      />
      <button type="button" className="btn btn-primary" onClick={onSubmit}>
        提交
      </button>
    </div>
  )
}
export default AddArticle
