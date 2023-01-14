/*
 * @Author: Carlos
 * @Date: 2023-01-13 23:39:23
 * @LastEditTime: 2023-01-13 23:43:20
 * @FilePath: /vite-react-swc/src/pages/blog/article/index.tsx
 * @Description: 
 */
import { HamburgerButton } from '@icon-park/react'
import { text } from '../mock'
import MdReader from './MdReader'

type Props = {}
function Article({}: Props) {
  return (
    <div className="container m-auto bg-red flex relative">
      <div className="flex-1">
        <div className="px-4 py-8">
          <div className="border rounded-md pb-8 relative">
            <div className="text-sm rounded-t-md h-12 px-4 flex text-center items-center justify-start border-b sticky top-[3.5rem] bg-white/40 backdrop-blur-md">
              <span className="mr-2">
                <HamburgerButton
                  className="align-text-bottom hover:scale-110 hover:opacity-70 cursor-pointer"
                  size="16"
                />
              </span>
              <span className="font-semibold">男子煮羊肉爆炸高压锅击穿屋顶</span>
            </div>
            <div className="px-4 py-4">
              <MdReader>{text}</MdReader>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[300px]">
        <div className="fixed w-[300px] h-[calc(100vh-3.5rem)] top-[3.5rem] py-8">
          <div className="card w-full bg-base-100 shadow-xl image-full">
            <figure>
              <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Article
