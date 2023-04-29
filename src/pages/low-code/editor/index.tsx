/*
 * @Author: Carlos
 * @Date: 2023-04-26 16:19:18
 * @LastEditTime: 2023-04-27 17:51:03
 * @FilePath: /vite-react-swc/src/pages/low-code/editor/index.tsx
 * @Description: null
 */
import { Button } from 'primereact/button'
import Layout, { Content, Sider, Header } from '@/components/base/layout'
import Logo from '@/components/shared/Logo'

const EditorHeader = () => {
  return (
    <Header className="h-16 flex items-center shadow-sm">
      <Logo className="h-8 w-8 inline-block m-2 cursor-pointer" />
      <div className="text-lg font-medium">Low-Code</div>
    </Header>
  )
}

const EditorLeftSider = () => {
  return (
    <Sider className="w-[200px] shadow-lg">
      <div>left sidebar</div>
      <div>left 中文金家浩</div>
      <div>
        <Button label="huifu" />
        <Button>huifu</Button>
        <Button size="small">huifu</Button>
      </div>
    </Sider>
  )
}

const EditorRightSider = () => {
  return <Sider className="w-[200px] shadow-sm">right sidebar</Sider>
}
type Props = {}
export default function EditorLayout({}: Props) {
  return (
    <div>
      <Layout className="h-screen min-h-[768px] min-w-[1024px]">
        <EditorHeader />
        <Layout direction="vertical" className="flex-1">
          <EditorLeftSider />
          <Content className="bg-gray-100">main content</Content>
          <EditorRightSider />
        </Layout>
      </Layout>
    </div>
  )
}
