/*
 * @Author: Carlos
 * @Date: 2022-12-28 14:08:00
 * @LastEditTime: 2022-12-31 14:24:38
 * @FilePath: /vite-react-ts/src/pages/home/index.tsx
 * @Description:
 */
import Layout from '@/components/base/layout'
import Header from './header'
import Content from './content'

type Props = unknown

const Home: React.FC<Props> = () => (
  <Layout className="w-screen relative">
    <div className="absolute top-0 -z-10 h-screen w-full bg-gradient-to-t from-cyan-600 to-transparent" />
    <div className="absolute top-0 -z-20 w-full h-screen bg-gradient-to-tl from-cyan-700  to-transparent" />
    <Header />
    <Content />
    {/* <Footer className={`h-[${HOME_FOOTER_HEIGHT}px]`}>footer</Footer> */}
  </Layout>
)

export default Home
