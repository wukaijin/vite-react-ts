/*
 * @Author: Carlos
 * @Date: 2023-01-03 21:56:19
 * @LastEditTime: 2023-01-04 14:25:42
 * @FilePath: /vite-react-swc/src/pages/test/index.tsx
 * @Description:
 */
import { useState } from 'react'
import request from '@/request'
import SearchTable, { QueryData } from './SearchTable'

async function queryKeyWord(key: string) {
  return request
    .get<null, { code: number; result: { songs: QueryData[] } }>(
      `music-api/search?keywords=${key}`
    )
    .then(response => {
      const { code, result } = response
      if (code === 200) {
        return result.songs
      }
      return null
    })
}
async function querySrc(id: string) {
  return request
    .get<null, { code: number; data: { url: string }[] }>(
      `music-api/song/url/v1?id=${id}&level=exhigh`
    )
    .then(response => {
      const { code, data } = response
      if (code === 200) {
        return data[0].url
      }
      return null
    })
}
async function loginAnonymous() {
  return request.get('/music-api/register/anonimous')
}
type Props = {}
// Input
export default function Test({}: Props) {
  const [keyWord, setKeyWord] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [data, setData] = useState<QueryData[]>([])
  const [musicSrc, setMusicSrc] = useState<string>('')
  // const
  // const
  return (
    <div className="px-4 py-8">
      <div className="m-auto">
        <div className="mb-2">
          <button className="btn btn-primary" onClick={loginAnonymous}>
            匿名登录
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
                const result = await queryKeyWord(keyWord)
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
              const url = await querySrc(`${_id}`)
              url && setMusicSrc(url)
            }}
          />
        </div>
        <div>
          <audio controls src={musicSrc}>
            <track kind="captions" src={musicSrc} />
          </audio>
        </div>
      </div>
    </div>
  )
}
