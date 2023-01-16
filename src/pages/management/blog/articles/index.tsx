/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:05:08
 * @LastEditTime: 2023-01-16 13:47:37
 * @FilePath: /vite-react-swc/src/pages/management/blog/articles/index.tsx
 * @Description:
 */
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReactive, useToggle } from 'ahooks'
import { Delete, Edit, FileEditingOne, FolderOpen, Plus } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import { Article, ArticleState, Tag } from '@/interface/blog'
import Table from '@/components/enhance/table'
import Modal from '@/components/base/Modal'
import useModal from '@/hooks/useModal'
import { MOCK_ARTICLES, MOCK_TAGS, MOCK_CATEGORIES } from '../mock'

type Type = 'Add' | 'Edit'

type Props = {}
const BlogArticles = (props: Props) => {
  const navigator = useNavigate()
  const [visible, { toggle }] = useToggle()
  const [articles, setArticles] = useState(MOCK_ARTICLES)
  const [type, setType] = useState<Type>('Add')
  const { jsx: ConfirmModal, open: openModal } = useModal()
  const formFields = useReactive<Partial<Article>>({
    title: '',
    tags: [],
    category: 0,
    state: 1,
    content: ''
  })
  const categoryOptions = useMemo(() => MOCK_CATEGORIES.filter(m => m.belongs), [])
  const tagsOptions = useMemo(() => MOCK_TAGS, [])
  const add = () => {
    formFields.title = ''
    formFields.tags = []
    formFields.category = 0
    setType('Add')
    toggle()
  }
  const edit = (item: Article) => {
    Object.assign(formFields, item)
    // formFields.title = item.title
    // formFields.tags = item.tags
    // formFields.category = item.category!
    // formFields.state = item.state
    // formFields.content = item.content
    setType('Edit')
    toggle()
  }
  const getTags = (tags: number[]) => {
    return tags.map(t => tagsOptions.find(o => o.id === t)).filter(e => !!e) as Tag[]
  }
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem text="blog" Icon={FolderOpen} />
        <BreadcrumbsItem text="articles" Icon={FileEditingOne} />
      </Breadcrumbs>
      <h2 className="text-lg py-2">Blog Articles Management</h2>
      <div className="py-4">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigator('add', { relative: 'path' })}
        >
          <Plus className="text-lg mr-1" />
          <span>Add</span>
        </button>
      </div>
      <Table className="w-full table-compact">
        <Table.Head>
          <span>Id</span>
          <span>Title</span>
          <span>Category</span>
          <span>Tags</span>
          <span>State</span>
          <span />
        </Table.Head>
        <Table.Body>
          {articles.map(article => {
            return (
              <Table.Row key={article.id}>
                <span>{article.id}</span>
                <span>{article.title}</span>
                <span>{(categoryOptions.find(m => m.id === article.category) || {}).text}</span>
                <span className="inline-flex items-center justify-center">
                  <span>
                    {getTags(article.tags).map(t => (
                      <span
                        key={t.id}
                        className="badge badge-sm mr-1 last:mr-0"
                        style={{
                          borderColor: t.color,
                          background: t.color,
                          color: 'white'
                        }}
                      >
                        {t.text}
                      </span>
                    ))}
                  </span>
                </span>
                <span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success toggle-sm"
                    checked={article.state === ArticleState.PUBLISHED}
                  />
                </span>
                <span>
                  <button className="btn btn-xs btn-primary mr-1" onClick={() => edit(article)}>
                    <Edit className="text-md mr-1" />
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      openModal({
                        content: 'Delete it?',
                        onConfirm() {
                          console.log(123)
                        }
                      })
                    }}
                  >
                    <Delete className="text-md mr-1" />
                    <span>Delete</span>
                  </button>
                </span>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      {ConfirmModal}
      <Modal visible={visible}>
        <h3 className="font-bold text-lg">{type} Article</h3>
        <div className="py-4 ">
          <form action="">
            <div className="flex items-center justify-center mb-4">
              <label className="w-20 basis-20">Title:</label>
              <input
                className="input input-secondary flex-1"
                value={formFields.title}
                onChange={e => (formFields.title = e.target.value)}
                name="title"
                type="text"
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-20 basis-20">Tags:</label>
              {/* <select className="select select-secondary flex-1">
                <option selected={formFields.belongs === 0} />
                {options.map(o => (
                  <option selected={o.id === formFields.belongs}>{o.text}</option>
                ))}
              </select> */}
            </div>
          </form>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={toggle}>
            Cancel
          </button>
          <button className="btn btn-secondary" onClick={toggle}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  )
}
export default BlogArticles
