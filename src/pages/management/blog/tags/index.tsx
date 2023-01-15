/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:04:18
 * @LastEditTime: 2023-01-15 00:57:50
 * @FilePath: /vite-react-swc/src/pages/management/blog/tags/index.tsx
 * @Description:
 */

import clsx from 'clsx'
import { useState } from 'react'
import { useReactive, useToggle } from 'ahooks'
import { Delete, Edit, FileEditingOne, FolderOpen, Plus } from '@icon-park/react'
import Breadcrumbs, { BreadcrumbsItem } from '../../components/Breadcrumbs'
import { Tag } from '@/interface/blog'
import Table from '@/components/enhance/table'
import Modal from '@/components/base/Modal'
import useModal from '@/hooks/useModal'

type Type = 'Add' | 'Edit'

const MOCK_TAGS: Tag[] = [
  {
    id: 1,
    text: 'JavaScript',
    color: 'text-secondary'
  },
  {
    id: 2,
    text: 'CSS',
    color: 'text-primary'
  },
  {
    id: 3,
    text: 'NextJS',
    color: 'bg-red-700'
  }
]
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
type Props = {}
const BlogTags = (props: Props) => {
  const [visible, { toggle }] = useToggle()
  const [type, setType] = useState<Type>('Add')
  const { jsx: ConfirmModal, open: openModal } = useModal()
  const formFields = useReactive({
    text: '',
    color: ''
  })
  const add = () => {
    formFields.text = ''
    formFields.color = ''
    setType('Add')
    toggle()
  }
  const edit = (item: Tag) => {
    formFields.text = item.text
    formFields.color = item.color
    setType('Edit')
    toggle()
  }

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem text="blog" Icon={FolderOpen} disabled={false} />
        <BreadcrumbsItem text="tags" Icon={FileEditingOne} />
      </Breadcrumbs>
      <h2 className="text-lg py-2">Blog Tags Management</h2>
      <div className="py-4">
        <button className="btn btn-sm btn-secondary" onClick={add}>
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
          {MOCK_TAGS.map(tag => {
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
                        onConfirm() {
                          console.log(123)
                        },
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
              <input className="input input-secondary w-full" name="text" type="text" />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-16 basis-16">Color:</label>
              <input className=" input-secondary w-full" name="color" type="color" />
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
export default BlogTags
