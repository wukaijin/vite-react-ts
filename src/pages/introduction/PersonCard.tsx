/*
 * @Author: Carlos
 * @Date: 2023-01-01 15:49:01
 * @LastEditTime: 2023-01-01 23:01:09
 * @FilePath: /vite-react-swc/src/pages/introduction/PersonCard.tsx
 * @Description:
 */
import clsx from 'clsx'
import styles from './pc.module.scss'

type Props = unknown
export default function PersonCard(props: Props) {
  return (
    <div className="p-12 flex">
      <div
        className="flex flex-col w-[190px] h-[254px] items-center bg-[#E4EBF5] rounded-[12px]"
        style={{
          boxShadow: '-5px -5px 8px #ffffff7a, 5px 5px 8px #a9a9aa7a'
        }}
      >
        <img
          className="h-[100px] mt-6 aspect-square rounded-[30%] bg-[#E4EBF5] mb-2"
          style={{
            boxShadow: '-5px -5px 8px #ffffff7a, 5px 5px 8px #a9a9aa7a'
          }}
          src="https://i.ibb.co/kKrFWfS/Wechat-IMG28.jpg"
        />
        <div className={clsx(styles.info, 'info text-center mt-2')}>
          <span className="font-bold text-xl">Carlos Woo</span>
          <p>Web Dev</p>
        </div>
        <button
          className={clsx(
            styles.button,
            'mt-3 color-white px-4 py-1 rounded-xl'
          )}
        >
          Contact
        </button>
      </div>
    </div>
  )
}
