/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:03:37
 * @LastEditTime: 2023-01-16 13:44:17
 * @FilePath: /vite-react-swc/src/pages/management/blog/categories/index.tsx
 * @Description:
 */
import { useMemo, useState } from 'react'
import { useReactive, useToggle } from 'ahooks'
import { Delete, Edit, FileEditingOne, FolderOpen, Plus } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import { Category } from '@/interface/blog'
import Table from '@/components/enhance/table'
import Modal from '@/components/base/Modal'
import useModal from '@/hooks/useModal'
import { MOCK_CATEGORIES } from '../mock'

type Type = 'Add' | 'Edit'

type Props = {}

const BlogCategories = (props: Props) => {
  const [visible, { toggle }] = useToggle()
  const [categories, setCategories] = useState(MOCK_CATEGORIES)
  const [type, setType] = useState<Type>('Add')
  const { jsx: ConfirmModal, open: openModal } = useModal()
  const formFields = useReactive({
    text: '',
    defaultPoster: '',
    belongs: 0
  })
  const options = useMemo(() => categories.filter(m => !m.belongs), [categories])

  const add = () => {
    formFields.text = ''
    formFields.belongs = 0
    setType('Add')
    toggle()
  }
  const edit = (item: Category) => {
    console.log(item)
    formFields.text = item.text
    formFields.belongs = item.belongs!
    setType('Edit')
    toggle()
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
              <select className="select select-primary flex-1">
                <option selected={formFields.belongs === 0} />
                {options.map(o => (
                  <option selected={o.id === formFields.belongs}>{o.text}</option>
                ))}
              </select>
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
export default BlogCategories
