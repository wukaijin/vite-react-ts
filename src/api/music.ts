/*
 * @Author: Carlos
 * @Date: 2023-01-04 16:29:09
 * @LastEditTime: 2023-01-06 13:22:22
 * @FilePath: /vite-react-swc/src/api/music.ts
 * @Description:
 */
import request from '@/utils/request'

type CodeWrapping = { code: number }
type WithCode<T> = T & CodeWrapping

export async function loginAnonymous() {
  return request.get('/music-api/register/anonimous')
}

export async function queryKeyWord<QueryData>(key: string) {
  return request
    .get<null, WithCode<{ result: { songs: QueryData[] } }>>(`music-api/search?keywords=${key}`)
    .then(response => {
      const { result } = response
      return result.songs
    })
}

export async function querySrc(id: string) {
  return request
    // .get<null, WithCode<{ data: { url: string }[] }>>(`music-api/song/url?id=${id}&level=exhigh`)
    .get<null, WithCode<{ data: { url: string }[] }>>(`music-api/song/url/v1?id=${id}&level=exhigh`)
    .then(response => {
      const { data } = response
      return data[0].url
    })
}

export async function queryLyric(id: string) {
  return request
    .get<null, WithCode<{ lrc: { lyric: string } }>>(`music-api/lyric?id=${id}&level=exhigh`)
    .then(response => {
      const { lrc } = response
      return lrc.lyric
    })
}
