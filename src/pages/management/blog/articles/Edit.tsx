/*
 * @Author: Carlos
 * @Date: 2023-01-15 21:08:12
 * @LastEditTime: 2023-01-20 15:14:02
 * @FilePath: /vite-react-ts/src/pages/management/blog/articles/Edit.tsx
 * @Description:
 */
import { useNavigate, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { FileEditingOne, FolderOpen } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import ArticlesForm from './ArticlesForm'
import { ArticleApi } from '@/api/blog'
import type { SubmitArticle } from '@/interface/blog'

const EditArticle = () => {
  const params = useParams()
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
  const { run: findArticle } = useRequest(ArticleApi.findOne, {
    manual: true,
    onSuccess(d) {
      setFormFields({
        id: d.id,
        title: d.title,
        tags: d.tags.map(t => t.id),
        category: d.category?.id || '',
        state: d.state,
        content: d.content,
        poster: d.poster,
        description: d.description
      })
    }
  })
  useEffect(() => {
    if (params.id) {
      findArticle(params.id)
    }
  }, [params, findArticle])
  const onSubmit = () => {
    if (!params.id) return
    ArticleApi.edit(params.id, formFields).then(() => {
      navigator('../..', { relative: 'path' })
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
export default EditArticle
