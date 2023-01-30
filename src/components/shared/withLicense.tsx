/*
 * @Author: Carlos
 * @Date: 2023-01-12 15:40:11
 * @LastEditTime: 2023-01-30 14:08:53
 * @FilePath: /vite-react-swc/src/components/shared/withLicense.tsx
 * @Description:
 */
import clsx from 'clsx'
import { ComponentType } from 'react'
import Logo from './Logo'

// type Props = HTMLAttributes<HTMLDivElement>

function withLicense<T extends {}>(MainComp: ComponentType<T>) {
  return (mainProps: T) => {
    return (
      <>
        <MainComp {...mainProps} />
        <div
          className={clsx(
            'px-16 py-4 bg-gray-800 text-gray-400 text-sm flex items-center justify-center'
          )}
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">©2023 Carlos</span>
          </div>
          <div>
            <Logo className="h-8 w-8 inline-block mr-4 cursor-pointer" />
          </div>
          <div className="">
            <div className="flex items-center justify-center">
              <span>
                <a href="https://beian.miit.gov.cn/">粤ICP备2023006294号</a>
              </span>
            </div>
            {/* <div className="flex items-center justify-center">
              <span>
                <a href="https://beian.miit.gov.cn/">粤ICP备2023006294号</a>
              </span>
            </div> */}
          </div>
        </div>
      </>
    )
  }
}
export default withLicense
