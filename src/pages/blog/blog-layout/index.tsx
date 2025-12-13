/*
 * @Author: Carlos
 * @Date: 2023-01-13 12:49:28
 * @LastEditTime: 2023-02-01 10:35:23
 * @FilePath: /vite-react-swc/src/pages/blog/blog-layout/index.tsx
 * @Description:
 */

import clsx from 'clsx'
import { useToggle } from 'ahooks'
import { Setting } from '@icon-park/react'
import { useNavigate } from 'react-router-dom'
import { type HTMLAttributes } from 'react'
import Logo from '@/components/shared/Logo'
import styled from '../blog.module.scss'
import Menu from './Menu'
import Modal from '@/components/base/Modal'
import Search from './Search'
import withLicense from '@/components/shared/withLicense'
import { isMobile } from '@/const'

type Props = HTMLAttributes<HTMLDivElement>
const BlogLayout = (props: Props) => {
  const [modalShow, { toggle }] = useToggle()
  const navigate = useNavigate()
  const toCMS = () => {
    window.open('http://cms.wukaijin.com')
    toggle()
  }
  return (
    <div className={clsx('min-h-screen bg-white font-blog')}>
      <div className={clsx(styled['bg-escape'], 'w-full fixed top-0 h-14 z-10')}>
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex flex-1 h-full items-center text-sm">
            <Logo
              className="h-8 w-8 inline-block mr-4 cursor-pointer"
              onClick={() => navigate('/blog')}
            />
            <Search />
            {!isMobile && (
              <div className="text-white">
                <Menu />
              </div>
            )}
          </div>
          <div className="flex">
            <div className="pl-2">
              <button className="btn btn-ghost btn-circle hover:bg-white/10" onClick={toggle}>
                <div className="indicator text-white">
                  <Setting size="20" />
                  <span className="badge badge-xs badge-primary indicator-item" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx('pt-14')}>{props.children}</div>
      <Modal visible={modalShow}>
        <h3 className="font-bold text-lg">You should signIn please!</h3>
        <p className="py-4 ">
          <span className="line-through">
            The management module is private and requires signIn.
          </span>
        </p>
        <p className="py-4">CMS deploy on other site.</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={toggle}>
            Cancel
          </button>
          <button className="btn btn-secondary" onClick={toCMS}>
            SignIn
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default withLicense(BlogLayout)
