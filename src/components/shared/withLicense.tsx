/*
 * @Author: Carlos
 * @Date: 2023-01-12 15:40:11
 * @LastEditTime: 2023-01-12 16:46:50
 * @FilePath: /vite-react-swc/src/components/shared/withLicense.tsx
 * @Description:
 */
import clsx from 'clsx'
import { ComponentType } from 'react'

// type Props = HTMLAttributes<HTMLDivElement>

function withLicense<T extends {}>(MainComp: ComponentType<T>) {
  return (mainProps: T) => {
    return (
      <>
        <MainComp {...mainProps} />
        <div
          className={clsx(
            'h-16 px-16 bg-gray-800 text-gray-400 text-sm flex items-center justify-center'
          )}
        >
          <span>
            <a href="https://beian.miit.gov.cn/">粤3-hkd234997号</a>
          </span>
        </div>
      </>
    )
  }
}
export default withLicense
