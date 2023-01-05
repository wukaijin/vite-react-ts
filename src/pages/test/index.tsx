/*
 * @Author: Carlos
 * @Date: 2023-01-03 21:56:19
 * @LastEditTime: 2023-01-06 00:05:18
 * @FilePath: /vite-react-swc/src/pages/test/index.tsx
 * @Description:
 */
import { useState } from 'react'
import { loginAnonymous, queryKeyWord, queryLyric, querySrc } from '@/api/music'
import SearchTable, { QueryData } from './SearchTable'
import Popup from '@/components/base/popup'
import Player from '@/components/enhance/player'
import { parseLyric } from '@/utils'

const isMobile = document.documentElement.offsetWidth < 500
type Props = {}
// Input
export default function Test({}: Props) {
  const [keyWord, setKeyWord] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [data, setData] = useState<QueryData[]>([])
  const [musicSrc, setMusicSrc] = useState<string>('')
  const [show, setShow] = useState(false)
  // const
  return (
    <div className="px-4 py-8 bg-[#E4EBF5] min-h-[100vh]">
      <div className="m-auto">
        <div className="mb-2">
          <button className="btn btn-primary" onClick={loginAnonymous}>
            匿名登录
          </button>
          <button className="btn btn-primary" onClick={() => setShow(!show)}>
            toggle Popup
          </button>
        </div>
        <div className="mb-2">
          <span>搜索关键字：</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary"
            value={keyWord}
            onChange={e => setKeyWord(e.target.value)}
            onKeyUp={async e => {
              if (e.code === 'Enter') {
                const result = await queryKeyWord<QueryData>(keyWord)
                if (result) {
                  setData(result)
                }
              }
            }}
          />
        </div>
        <div className="mb-2">
          <span>搜索歌曲ID：</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary"
            value={id}
            onChange={e => setId(e.target.value)}
            onKeyUp={e => {
              if (e.code === 'Enter') {
                querySrc(id)
              }
            }}
          />
        </div>
        <div>
          <SearchTable
            className="w-[100%]"
            data={data}
            onClick={async (_id: number) => {
              // const url = await querySrc(`${_id}`)
              const src = await queryLyric(`${_id}`)
              const a = parseLyric(src)
              window.localStorage.setItem(`${_id}`, src)
              // url && setMusicSrc(url)
            }}
          />
        </div>
        <div>
          <audio controls src={musicSrc}>
            <track kind="captions" src={musicSrc} />
          </audio>
        </div>
      </div>
      <Popup
        show={show}
        from={isMobile ? 'bottom' : 'right'}
        className={isMobile ? 'right-0' : '"top-1/2 -translate-y-1/2"'}
      >
        <Player from={isMobile ? 'bottom' : 'right'} togglePlayer={() => setShow(!show)} />
      </Popup>
    </div>
  )
}
