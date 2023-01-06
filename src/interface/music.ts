/*
 * @Author: Carlos
 * @Date: 2023-01-06 13:23:36
 * @LastEditTime: 2023-01-06 17:39:28
 * @FilePath: /vite-react-swc/src/interface/music.ts
 * @Description: 
 */
export interface QueryListData {
  id: number
  name: string
  artists: { name: string, id: number }[]
  mvid: number
  album: { name: string }
  duration: number
}
