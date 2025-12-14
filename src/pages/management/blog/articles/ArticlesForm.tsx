/*
 * @Author: Carlos
 * @Date: 2023-01-15 22:02:59
 * @LastEditTime: 2025-12-13 22:13:00
 * @FilePath: /vite-react-ts/src/pages/management/blog/articles/ArticlesForm.tsx
 * @Description:
 */
import { useMemo } from 'react'
import { useMount } from 'ahooks'
import { ArticleState, SubmitArticle } from '@/interface/blog'
import Select from '@/components/base/Select'
import MultiSelect from '@/components/base/MultiSelect'
import { useBlogStore } from '@/stores/useBlogStore'

type Props = {
  data: Partial<SubmitArticle>
  onChange: (d: Partial<SubmitArticle>) => void
}

const ArticlesForm = (props: Props) => {
  const { data, onChange } = props
  const { categories, tags, fetchCategories, fetchTags } = useBlogStore()

  useMount(() => {
    fetchCategories()
    fetchTags()
  })

  const categoryOptions = useMemo(() => {
    const result = categories.filter(c => c.belongs)
    const cd = categories.filter(c => !c.belongs)
    cd.forEach(c => {
      if (result.find(r => r.belongs?.id === c.id)) return
      result.unshift(c)
    })
    return result
  }, [categories])

  console.log(categoryOptions)

  return (
    <form className="">
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Title:</label>
        <input
          className="input input-primary flex-1 max-w-xs"
          value={data.title}
          onChange={e => onChange({ title: e.target.value })}
          name="text"
          type="text"
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Category:</label>
        <Select
          className="select-primary flex-1 max-w-xs"
          options={categoryOptions.map(c => ({ value: c.id, label: c.text }))}
          value={data.category}
          onChange={id => onChange({ category: id as string })}
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Poster:</label>
        <input
          className="input input-primary flex-1 max-w-xs"
          value={data.poster}
          onChange={e => onChange({ poster: e.target.value })}
          name="text"
          type="text"
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Tags:</label>
        <MultiSelect
          className="select-primary flex-1 max-w-xs"
          options={tags.map(c => ({ value: c.id, label: c.text }))}
          value={data.tags as React.Key[]}
          onChange={ids => onChange({ tags: ids as string[] })}
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Description:</label>
        <textarea
          className="textarea textarea-primary resize"
          name="description"
          value={data.description}
          onChange={e => onChange({ description: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">State:</label>
        <input
          type="checkbox"
          className="toggle toggle-primary toggle-md max-w-xs"
          checked={data.state === ArticleState.PUBLISHED}
          onChange={e => {
            onChange({
              state: e.target.checked ? ArticleState.PUBLISHED : ArticleState.UN_PUBLISHED
            })
          }}
        />
      </div>
      <div className="flex items-center justify-start mb-4">
        <label className="w-20 basis-20 text-right mr-2">Content:</label>
        <textarea
          className="textarea textarea-primary resize"
          value={data.content}
          onChange={e => onChange({ content: e.target.value })}
        />
      </div>
    </form>
  )
}

export default ArticlesForm
