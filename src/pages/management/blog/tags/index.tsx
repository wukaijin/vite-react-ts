/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:04:18
 * @LastEditTime: 2023-01-20 02:05:43
 * @FilePath: /vite-react-swc/src/pages/management/blog/tags/index.tsx
 * @Description:
 */

import clsx from 'clsx'
import { useState } from 'react'
import { useRequest, useToggle } from 'ahooks'
import { Delete, Edit, FileEditingOne, FolderOpen, Plus } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import type { Tag } from '@/interface/blog'
import Table from '@/components/enhance/table'
import Modal from '@/components/base/Modal'
import useModal from '@/hooks/useModal'
import { TagApi } from '@/api/blog'

type Type = 'Add' | 'Edit'

const ColorSquareClassNames = 'inline-block w-3 h-3 mr-2'
const colorSquare = (color: string) => {
  if (color.startsWith('bg-')) {
    return <label className={clsx(ColorSquareClassNames, color)} />
  }
  if (color.startsWith('text-')) {
    return <label className={clsx(ColorSquareClassNames, color, 'text-lg')}>■</label>
  }
  return <label className={ColorSquareClassNames} style={{ backgroundColor: color }} />
}

const BlogTags = () => {
  const [visible, { toggle }] = useToggle()

  const [type, setType] = useState<Type>('Add')
  const { jsx: ConfirmModal, open: openModal } = useModal()
  const [formFields, setFormFields] = useState({
    id: '',
    text: '',
    color: ''
  })
  const { data: tags = [], run: fetchTags } = useRequest(TagApi.findAll)
  const { runAsync: reqAdd, loading: adding } = useRequest(TagApi.add, {
    manual: true
  })
  const { runAsync: reqEdit, loading: editing } = useRequest(TagApi.edit, {
    manual: true
  })
  const { runAsync: reqDelete } = useRequest(TagApi.delete, {
    manual: true
  })
  const add = () => {
    setFormFields({
      id: '',
      text: '',
      color: '#000000'
    })
    setType('Add')
    toggle()
  }
  const edit = (item: Tag) => {
    setFormFields({
      id: item.id,
      text: item.text,
      color: item.color
    })
    setType('Edit')
    toggle()
  }
  const handleFormAction = () => {
    if (type === 'Add') {
      const params: Partial<Tag> = { ...formFields }
      delete params.id
      reqAdd(params).then(() => {
        toggle()
        fetchTags()
      })
    } else {
      reqEdit(formFields.id, formFields).then(() => {
        toggle()
        fetchTags()
      })
    }
  }

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem text="blog" Icon={FolderOpen} />
        <BreadcrumbsItem text="tags" Icon={FileEditingOne} />
      </Breadcrumbs>
      <h2 className="text-lg py-2">Blog Tags Management</h2>
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
          <span>Color</span>
          <span />
        </Table.Head>
        <Table.Body>
          {tags &&
            tags.map(tag => {
              return (
                <Table.Row key={tag.id}>
                  <span>{tag.id}</span>
                  <span>{tag.text}</span>
                  <span className="inline-flex items-center justify-center">
                    <span>{colorSquare(tag.color)}</span>
                    <span>{tag.color}</span>
                  </span>
                  <span>
                    <button className="btn btn-xs btn-primary mr-1" onClick={() => edit(tag)}>
                      <Edit className="text-md mr-1" />
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => {
                        openModal({
                          content: 'Delete it?',
                          async onConfirm() {
                            await reqDelete(tag.id)
                            fetchTags()
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
        <h3 className="font-bold text-lg">{type} Tag</h3>
        <div className="py-4 ">
          <form action="">
            <div className="flex items-center justify-center mb-4">
              <label className="w-16 basis-16">Text:</label>
              <input
                className="input w-full"
                value={formFields.text}
                onChange={e => setFormFields({ ...formFields, text: e.target.value })}
                name="text"
                type="text"
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-16 basis-16">Color:</label>
              <input
                className=" input w-full"
                value={formFields.color}
                onChange={e => setFormFields({ ...formFields, color: e.target.value })}
                name="color"
                type="color"
              />
            </div>
          </form>
        </div>
        <div className="modal-action">
          <button
            className={clsx('btn btn-ghost', {
              loading: adding || editing
            })}
            onClick={toggle}
          >
            Cancel
          </button>
          <button
            className={clsx('btn btn-primary', {
              loading: adding || editing
            })}
            onClick={handleFormAction}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  )
}
export default BlogTags
