/*
 * @Author: Carlos
 * @Date: 2023-01-04 16:29:09
 * @LastEditTime: 2023-01-08 14:47:40
 * @FilePath: /vite-react-swc/src/api/music.ts
 * @Description:
 */
import { PlaylistItem, PlaylistTag, QueryNewSongReturnData } from '@/interface/music'
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

export async function queryNewSongs() {
  return request
    .get<null, WithCode<{ result: QueryNewSongReturnData[] }>>('music-api/personalized/newsong')
    .then(response => {
      // const {
      //   id,
      //   name,
      //   picUrl,
      //   song: { artists, album }
      // } = response.result
      // return {
      //   id,
      //   name,
      //   picUrl,
      //   artists: artists.map(a => a.name).join(', '),
      //   album: album.name
      // }
      return response.result
    })
}

export async function queryPlaylistTags() {
  return request
    .get<null, WithCode<{ tags: PlaylistTag[] }>>('music-api/playlist/highquality/tags')
    .then(response => {
      return response.tags
    })
}

export async function queryTopPlaylist(tagName?: string) {
  return request
    .get<null, WithCode<{ playlists: PlaylistItem[] }>>('music-api/top/playlist/highquality', {
      params: {
        cat: tagName,
      }
    })
    .then(response => {
      return response.playlists
    })
}
