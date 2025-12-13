/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:05:08
 * @LastEditTime: 2023-01-20 15:19:37
 * @FilePath: /vite-react-swc/src/pages/management/blog/articles/index.tsx
 * @Description:
 */
import { useNavigate } from 'react-router-dom'
import { connect, type ConnectedProps } from 'react-redux'
import { useMount, useRequest } from 'ahooks'
import { Delete, Edit, FileEditingOne, FolderOpen, Plus } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import { ArticleState } from '@/interface/blog'
import Table from '@/components/enhance/table'
import useModal from '@/hooks/useModal'
import { ArticleApi } from '@/api/blog'
import type { RootState } from '@/store'
import { asyncFetchCategories } from '@/store/blog'

const connector = connect(
  (state: RootState) => {
    const { categories } = state.blog
    return {
      categories
    }
  },
  { asyncFetchCategories }
)

type Props = ConnectedProps<typeof connector>

const BlogArticles = (props: Props) => {
  const { categories } = props
  const navigator = useNavigate()
  const { data: articles = [], run: fetchArticles } = useRequest(ArticleApi.findAll)
  const { run: deleteArticle } = useRequest(ArticleApi.delete, {
    manual: true,
    onSuccess: fetchArticles
  })
  const { jsx: ConfirmModal, open: openModal } = useModal()
  useMount(() => {
    props.asyncFetchCategories()
  })
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
                <span>{(categories.find(m => m.id === article.category.id) || {}).text}</span>
                <span className="inline-flex items-center justify-center">
                  <span>
                    {article.tags &&
                      article.tags.length &&
                      article.tags.map(t => (
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
                    onChange={() => {}}
                    checked={article.state === ArticleState.PUBLISHED}
                  />
                </span>
                <span>
                  <button
                    className="btn btn-xs btn-primary mr-1"
                    onClick={() => navigator(`edit/${article.id}`, { relative: 'path' })}
                  >
                    <Edit className="text-md mr-1" />
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      openModal({
                        content: 'Delete it?',
                        onConfirm() {
                          deleteArticle(article.id)
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
    </div>
  )
}

const connectedBlogArticles = connector(BlogArticles)
export default connectedBlogArticles
