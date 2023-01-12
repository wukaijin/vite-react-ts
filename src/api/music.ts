/*
 * @Author: Carlos
 * @Date: 2023-01-04 16:29:09
 * @LastEditTime: 2023-01-12 21:32:38
 * @FilePath: /vite-react-swc/src/api/music.ts
 * @Description:
 */
import { BlockBanner, PlaylistDetailData, PlaylistItem, PlaylistTag, QueryNewSongReturnData } from '@/interface/music'
import request from '@/utils/request'

type CodeWrapping = { code: number }
type WithCode<T> = T & CodeWrapping

export async function loginAnonymous() {
  return request.get('/music-api/register/anonimous')
}

export async function queryKeyWord<QueryData>(key: string) {
  return request
    .get<null, WithCode<{ result: { songs: QueryData[] } }>>(`/music-api/search?keywords=${key}`)
    .then(response => {
      const { result } = response
      return result.songs
    })
}

export async function querySrc(id: string) {
  return request
    .get<null, WithCode<{ data: { url: string }[] }>>(`/music-api/song/url/v1?id=${id}&level=exhigh`)
    .then(response => {
      const { data } = response
      return data[0].url
    })
}

export async function queryLyric(id: string) {
  return request
    .get<null, WithCode<{ lrc: { lyric: string } }>>(`/music-api/lyric?id=${id}&level=exhigh`)
    .then(response => {
      const { lrc } = response
      return lrc.lyric
    })
}

export async function queryNewSongs() {
  return request
    .get<null, WithCode<{ result: QueryNewSongReturnData[] }>>('/music-api/personalized/newsong')
    .then(response => {
      return response.result
    })
}

export async function queryPlaylistTags() {
  return request
    .get<null, WithCode<{ tags: PlaylistTag[] }>>('/music-api/playlist/highquality/tags')
    .then(response => {
      return response.tags
    })
}

export async function queryTopPlaylist(tagName?: string) {
  return request
    .get<null, WithCode<{ playlists: PlaylistItem[] }>>('/music-api/top/playlist/highquality', {
      params: {
        cat: tagName,
      }
    })
    .then(response => {
      return response.playlists
    })
}

export async function findBall() {
  return request
    .get<null, WithCode<{ playlists: PlaylistItem[] }>>('/music-api/homepage/dragon/ball')
    .then(response => {
      console.log(response)
      return response
    })
}
export async function queryBanner() {
  return request
    .get<null, WithCode<BlockBanner>>('/music-api/banner?type=2')
    .then(response => {
      return response.banners
    })
}

export async function queryPlaylistDetail(id: number) {
  return request
    .get<null, WithCode<{ playlist: PlaylistDetailData }>>(`/music-api/playlist/detail?id=${id}`)
    .then(response => {
      return response.playlist
    })
}
