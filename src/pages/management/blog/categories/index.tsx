/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:03:37
 * @LastEditTime: 2023-01-20 00:40:46
 * @FilePath: /vite-react-swc/src/pages/management/blog/categories/index.tsx
 * @Description:
 */
import { useMemo, useState } from 'react'
import { useRequest, useToggle } from 'ahooks'
import RSelect from 'react-select'
import { Delete, Edit, FileEditingOne, FolderOpen, Plus } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import type { Category } from '@/interface/blog'
import Table from '@/components/enhance/table'
import Modal from '@/components/base/Modal'
import useModal from '@/hooks/useModal'
import { CategoryApi } from '@/api/blog'

type Type = 'Add' | 'Edit'

const BlogCategories = () => {
  const [visible, { toggle }] = useToggle()
  const [type, setType] = useState<Type>('Add')
  const { jsx: ConfirmModal, open: openModal } = useModal()
  const [formFields, setFormFields] = useState<Category>({
    id: '',
    text: '',
    description: '',
    order: 0,
    defaultPoster: '',
    belongs: null
  })
  const { data: categories = [], run: fetchCategories } = useRequest(CategoryApi.findAll)
  const { runAsync: reqAdd } = useRequest(CategoryApi.add, {
    manual: true
  })
  const { runAsync: reqEdit } = useRequest(CategoryApi.edit, {
    manual: true
  })
  const { runAsync: reqDelete } = useRequest(CategoryApi.delete, {
    manual: true
  })
  const options = useMemo(() => categories.filter(m => !m.belongs), [categories])

  const add = () => {
    setFormFields({
      id: '',
      text: '',
      description: '',
      order: 0,
      defaultPoster: '',
      belongs: null
    })

    setType('Add')
    toggle()
  }
  const edit = (item: Category) => {
    setFormFields({
      text: item.text,
      description: item.description,
      order: item.order,
      defaultPoster: item.defaultPoster,
      belongs: item.belongs || null,
      id: item.id
    })
    setType('Edit')
    toggle()
  }
  const handleFormAction = () => {
    if (type === 'Add') {
      const params: Partial<Omit<Category, 'belongs'> & { belongs?: string | null }> = {
        ...formFields,
        belongs: formFields.belongs ? formFields.belongs.id : null
      }
      delete params.id
      reqAdd(params as Category).then(() => {
        toggle()
        fetchCategories()
      })
    } else {
      const params: Partial<Omit<Category, 'belongs'> & { belongs?: string | null }> = {
        ...formFields,
        belongs: formFields.belongs ? formFields.belongs.id : null
      }
      reqEdit(formFields.id, params as Category).then(() => {
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
          <span>Order</span>
          <span>Belongs</span>
          <span />
        </Table.Head>
        <Table.Body>
          {categories.map(category => {
            return (
              <Table.Row key={category.id}>
                <span>{category.id}</span>
                <span>{category.text}</span>
                <span>{category.order}</span>
                <span className="inline-flex items-center justify-center">
                  <span>{(options.find(o => o.id === category.belongs?.id) || {}).text}</span>
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
                onChange={e => setFormFields({ ...formFields, text: e.target.value })}
                name="text"
                type="text"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <label className="w-20 basis-20">Default Poster:</label>
              <input
                className="input input-primary flex-1"
                value={formFields.defaultPoster}
                onChange={e => setFormFields({ ...formFields, defaultPoster: e.target.value })}
                name="text"
                type="text"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <label className="w-20 basis-20">Default Poster:</label>
              <input
                className="input input-primary flex-1"
                value={formFields.order}
                onChange={e => setFormFields({ ...formFields, order: Number(e.target.value) })}
                name="order"
                type="number"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <label className="w-20 basis-20">Belongs:</label>
              <RSelect
                className="flex-1"
                isClearable
                value={options.find(e => e.id === formFields.belongs?.id)}
                onChange={c => setFormFields({ ...formFields, belongs: c || null })}
                options={options}
                getOptionLabel={(c: Category) => c.text}
                getOptionValue={(c: Category) => c.id}
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-20 basis-20">Description:</label>
              <textarea
                className="textarea textarea-primary resize flex-1"
                value={formFields.description}
                onChange={e => {
                  setFormFields({ ...formFields, description: e.target.value })
                }}
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
