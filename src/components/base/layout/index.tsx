/*
 * @Author: Carlos
 * @Date: 2022-12-29 23:48:41
 * @LastEditTime: 2022-12-30 00:26:56
 * @FilePath: /vite-react-swc/src/components/base/layout/index.tsx
 * @Description:
 */
import React, { CSSProperties, PropsWithChildren } from 'react'
import clx from 'classnames'
export { default as Content } from './Content'
export { default as Header } from './Header'
export { default as Footer } from './Footer'
export { default as Sider } from './Sider'

/*
  参考
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>

*/
// type Props = HTMLAttributes<HTMLDivElement>
type Props = PropsWithChildren<{
  className?: string
  style?: CSSProperties
  direction?: 'vertical' | 'horizontal'
}>

const Layout = (props: Props) => {
  const { children, direction, className, style } = props
  const direct = direction === 'vertical' ? 'flex-row' : 'flex-col'
  return (
    <div style={style} className={clx('flex', direct, className)}>
      {children}
    </div>
  )
}

export default Layout
