/*
 * @Author: Carlos
 * @Date: 2023-01-06 13:23:36
 * @LastEditTime: 2023-01-07 16:32:17
 * @FilePath: /vite-react-swc/src/interface/music.ts
 * @Description:
 */
export interface QueryListData {
  id: number
  name: string
  artists: { name: string; id: number }[]
  mvid: number
  album: { name: string }
  duration: number
}

export interface QueryNewSongReturnData {
  id: number
  type: number
  name: string
  picUrl: string // 'http://p1.music.126.net/keWjw-g9LGUbYeQodS1fgg==/109951168210153447.jpg'
  // canDislike: true
  // trackNumberUpdateTime: null
  song: {
    name: string
    id: number
    // position: 0
    // alias: []
    // status: 0
    // fee: 8
    // copyrightId: 7001
    // disc: '01'
    // no: 2,
    artists: {
      name: string
      id: number
      // picId: 0
      // img1v1Id: 0
      // briefDesc: ''
      picUrl: string
      img1v1Url: string
      // albumSize: 0
      // alias: []
      // trans: ''
      // musicSize: 0
      // topicPerson: 0
    }[]
    album: {
      name: string
      id: number
      // type: 'EP'
      // size: 4
      picId: number
      blurPicUrl: string // 'http://p3.music.126.net/keWjw-g9LGUbYeQodS1fgg==/109951168210153447.jpg'
      companyId: 0
      pic: number
      picUrl: string // 'http://p4.music.126.net/keWjw-g9LGUbYeQodS1fgg==/109951168210153447.jpg'
      publishTime: number // 1672934400000
      description: string
      tags: string
      company: string // '实岳文化'
      // briefDesc: '',
      sqMusic: {}
      hrMusic: {}
      bMusic: {}
      hMusic: {}
      lMusic: {}
      // ...
    }
    // alg: 'hot_server'
  }
}
