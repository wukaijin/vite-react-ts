/*
 * @Author: Carlos
 * @Date: 2022-12-30 14:41:24
 * @LastEditTime: 2022-12-30 17:13:57
 * @FilePath: /vite-react-swc/src/pages/home/content/index.tsx
 * @Description:
 */
import { Content } from '@/components/base/layout'
import Panel from '@/components/base/panel'
import { HOME_HEADER_HEIGHT, HOME_FOOTER_HEIGHT } from '@/const'
import { Link } from 'react-router-dom'

type Props = {}
const NavigateList = () => (
  <ul className='py-8 px-6 bg-[#F4F6FB] bg-opacity-30 rounded-[12px]'>
    <li>
      <Link to="/todos">TODOs</Link>
    </li>
  </ul>
)

const HomeContent = (props: Props) => {
  return (
    <Content
      style={{
        height: `calc(100vh - ${(
          HOME_HEADER_HEIGHT + HOME_FOOTER_HEIGHT
        ).toString()}px)`
      }}
      className="z-1"
    >
      <div className="flex">
        <div className="pt-[200px] pl-[140px]">
          <Panel><NavigateList /></Panel>
        </div>
      </div>
      <div></div>
    </Content>
  )
}
export default HomeContent
