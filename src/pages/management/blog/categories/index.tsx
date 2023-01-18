/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:03:37
 * @LastEditTime: 2023-01-18 01:57:21
 * @FilePath: /vite-react-swc/src/pages/management/blog/categories/index.tsx
 * @Description:
 */
import { useMemo, useState } from 'react'
import { useReactive, useRequest, useToggle } from 'ahooks'
import RSelect from 'react-select'
import { Delete, Edit, FileEditingOne, FolderOpen, Plus } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import { Category } from '@/interface/blog'
import Table from '@/components/enhance/table'
import Modal from '@/components/base/Modal'
import useModal from '@/hooks/useModal'
import { CategoryApi } from '@/api/blog'
import Select from '@/components/base/Select'

type Type = 'Add' | 'Edit'

type Props = {}

const BlogCategories = (props: Props) => {
  const [visible, { toggle }] = useToggle()
  const [type, setType] = useState<Type>('Add')
  const { jsx: ConfirmModal, open: openModal } = useModal()
  const formFields = useReactive<Category>({
    id: '',
    text: '',
    defaultPoster: '',
    belongs: null
  })
  const { data: categories = [], run: fetchCategories } = useRequest(CategoryApi.findAll)
  const { runAsync: reqAdd, loading: adding } = useRequest(CategoryApi.add, {
    manual: true
  })
  const { runAsync: reqEdit, loading: editing } = useRequest(CategoryApi.edit, {
    manual: true
  })
  const { runAsync: reqDelete } = useRequest(CategoryApi.delete, {
    manual: true
  })
  const options = useMemo(() => categories.filter(m => !m.belongs), [categories])

  const add = () => {
    formFields.text = ''
    formFields.id = ''
    formFields.belongs = null
    formFields.defaultPoster = ''
    setType('Add')
    toggle()
  }
  const edit = (item: Category) => {
    console.log(item)
    formFields.text = item.text
    formFields.id = item.id
    formFields.defaultPoster = item.defaultPoster
    formFields.belongs = item.belongs || null
    setType('Edit')
    toggle()
  }
  const handleFormAction = () => {
    if (type === 'Add') {
      const params: Partial<Category> = { ...formFields }
      delete params.id
      if (!params.belongs) {
        params.belongs = null
      }
      reqAdd(params).then(res => {
        toggle()
        fetchCategories()
      })
    } else {
      const params: Partial<Category> = { ...formFields }
      if (!params.belongs) {
        params.belongs = null
      }
      reqEdit(formFields.id, params).then(res => {
        toggle()
        fetchCategories()
      })
    }
  }
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem text="blog" Icon={FolderOpen} />
        <BreadcrumbsItem text="categories" Icon={FileEditingOne} />
      </Breadcrumbs>
      <h2 className="text-lg py-2">Blog Categories Management</h2>
      <div className="py-4">
        <button className="btn btn-sm btn-primary" onClick={add}>
          <Plus className="text-lg mr-1" />
          <span>Add</span>
        </button>
      </div>
      <Table className="w-full table-compact">
        <Table.Head>
          <span>Id</span>
          <span>Text</span>
          <span>Belongs</span>
          <span />
        </Table.Head>
        <Table.Body>
          {categories.map(category => {
            return (
              <Table.Row key={category.id}>
                <span>{category.id}</span>
                <span>{category.text}</span>
                <span className="inline-flex items-center justify-center">
                  <span>{(options.find(o => o.id === category.belongs) || {}).text}</span>
                </span>
                <span>
                  <button className="btn btn-xs btn-primary mr-1" onClick={() => edit(category)}>
                    <Edit className="text-md mr-1" />
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      openModal({
                        content: 'Delete it?',
                        async onConfirm() {
                          await reqDelete(category.id)
                          fetchCategories()
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
        <h3 className="font-bold text-lg">{type} Category</h3>
        <div className="py-4 ">
          <form action="">
            <div className="flex items-center justify-center mb-4">
              <label className="w-20 basis-20">Text:</label>
              <input
                className="input input-primary flex-1"
                value={formFields.text}
                onChange={e => (formFields.text = e.target.value)}
                name="text"
                type="text"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <label className="w-20 basis-20">Default Poster:</label>
              <input
                className="input input-primary flex-1"
                value={formFields.defaultPoster}
                onChange={e => (formFields.defaultPoster = e.target.value)}
                name="text"
                type="text"
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-20 basis-20">Belongs:</label>
              {/* <select className="select select-primary flex-1">
                <option selected={formFields.belongs === ''} />
                {options.map(o => (
                  <option selected={o.id === formFields.belongs}>{o.text}</option>
                ))}
              </select> */}
              {/* <Select
                className="select-primary flex-1"
                value={formFields.belongs}
                options={options.map(o => ({ value: o.id, label: o.text }))}
                onChange={id => (formFields.belongs = id as string)}
              /> */}
              <RSelect
                className="flex-1"
                isClearable
                value={options.find(e => e.id === formFields.belongs)}
                onChange={c => (formFields.belongs = c?.id || '')}
                options={options}
                getOptionLabel={(c: Category) => c.text}
                getOptionValue={(c: Category) => c.id}
              />
            </div>
          </form>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={toggle}>
            Cancel
          </button>
          <button className="btn btn-secondary" onClick={handleFormAction}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  )
}
export default BlogCategories
