/*
 * @Author: Carlos
 * @Date: 2022-12-28 14:08:00
 * @LastEditTime: 2022-12-30 00:54:59
 * @FilePath: /vite-react-swc/src/pages/home/index.tsx
 * @Description:
 */
import Layout, {
  Header,
  Content,
  Sider,
  Footer
} from '@/components/base/layout'
import { HOME_HEADER_HEIGHT, HOME_FOOTER_HEIGHT } from '@/const'
import { Link } from 'react-router-dom'

type Props = {}

const Home: React.FC<Props> = props => {
  return (
    <Layout className="w-screen h-screen">
      <Header className={`h-[${HOME_HEADER_HEIGHT}px]`}>header</Header>
      <Layout direction="vertical">
        <Sider>left sidebar</Sider>
        {/* <Content className={`min-h-[calc(100vh - ${HOME_HEADER_HEIGHT + HOME_FOOTER_HEIGHT}px)]`}>main content</Content> */}
        <Content
          style={{
            height: `calc(100vh - ${(
              HOME_HEADER_HEIGHT + HOME_FOOTER_HEIGHT
            ).toString()}px)`
          }}
        >
          <div>Home main content</div>
          <div>
            <ul>
              <li>
                <Link to="/todos">TODOs</Link>
              </li>
            </ul>
          </div>
        </Content>
        <Sider>right sidebar</Sider>
      </Layout>
      <Footer className={`h-[${HOME_FOOTER_HEIGHT}px]`}>footer</Footer>
    </Layout>
  )
}

export default Home
