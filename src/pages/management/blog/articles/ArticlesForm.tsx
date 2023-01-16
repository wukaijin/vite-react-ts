/*
 * @Author: Carlos
 * @Date: 2023-01-15 22:02:59
 * @LastEditTime: 2023-01-16 13:46:44
 * @FilePath: /vite-react-swc/src/pages/management/blog/articles/ArticlesForm.tsx
 * @Description:
 */
import { useMemo } from 'react'
import { Article, ArticleState } from '@/interface/blog'
import { MOCK_CATEGORIES, MOCK_TAGS } from '../mock'
import Select from '@/components/base/Select'
import MultiSelect from '@/components/base/MultiSelect'

type Props = {
  data: Partial<Article>
}
const ArticlesForm = (props: Props) => {
  const { data } = props
  const categoryOptions = useMemo(() => MOCK_CATEGORIES.filter(m => m.belongs), [])
  const tagsOptions = useMemo(() => MOCK_TAGS, [])
  return (
    <form className="">
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Text:</label>
        <input
          className="input input-primary flex-1 max-w-xs"
          value={data.title}
          onChange={e => (data.title = e.target.value)}
          name="text"
          type="text"
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Category:</label>
        {/* <select className="select select-primary flex-1 max-w-xs">
          <option selected={data.category === 0} />
          {categoryOptions.map(o => (
            <option selected={o.id === data.category}>{o.text}</option>
          ))}
        </select> */}
        <Select
          className="select-primary flex-1 max-w-xs"
          options={categoryOptions.map(c => ({ value: c.id, label: c.text }))}
          value={data.category}
          onChange={id => {
            data.category = id as number
          }}
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Text:</label>
        <input
          className="input input-primary flex-1 max-w-xs"
          value={data.poster}
          onChange={e => (data.poster = e.target.value)}
          name="text"
          type="text"
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Tags:</label>
        <MultiSelect
          className="select-primary flex-1 max-w-xs"
          options={tagsOptions.map(c => ({ value: c.id, label: c.text }))}
          value={data.tags as React.Key[]}
          onChange={ids => {
            data.tags = ids as number[] | undefined
          }}
        />
        {/* <select className="select select-primary flex-1 max-w-xs">
          <option selected={data.tags?.length === 0} />
          {tagsOptions.map(o => (
            <option selected={data.tags?.indexOf(o.id) !== -1}>{o.text}</option>
          ))}
        </select> */}
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">State:</label>
        <input
          type="checkbox"
          className="toggle toggle-primary toggle-md max-w-xs"
          checked={data.state === ArticleState.PUBLISHED}
          onChange={e => {
            data.state = e.target.checked ? ArticleState.PUBLISHED : ArticleState.UN_PUBLISHED
          }}
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Content:</label>
        <textarea
          className="textarea textarea-primary resize"
          value={data.content}
          onChange={e => {
            data.content = e.target.value
          }}
        />
      </div>
    </form>
  )
}
export default ArticlesForm
