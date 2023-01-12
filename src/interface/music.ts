/*
 * @Author: Carlos
 * @Date: 2023-01-06 13:23:36
 * @LastEditTime: 2023-01-12 21:32:47
 * @FilePath: /vite-react-swc/src/interface/music.ts
 * @Description:
 */
export interface QueryListData {
  id: number
  name: string
  alias: string[]
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
    alias: string[]
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

export interface PlaylistTag {
  id: number
  name: string
  category: number
  hot: boolean
  type: number
}

export type PlaylistItem = {
  adType: number
  anonimous: false
  cloudTrackCount: number
  commentCount: number
  commentThreadId: string
  copywriter: string
  coverImgId: number
  coverImgId_str: string // "109951165889086318"
  coverImgUrl: string // "http://p2.music.126.net/XPEwMaHImdRNnqaI59_Juw==/109951165889086318.jpg"
  coverStatus: number
  createTime: number
  creator: {}
  description: string
  highQuality: true
  id: number
  name: string // "国风新潮大赏 | 歌声岂合世间闻"
  newImported: false
  ordered: true
  playCount: number
  privacy: number
  recommendInfo: null
  shareCount: number
  specialType: number
  status: number
  subscribed: false
  subscribedCount: number
  subscribers: {}
  tag: string // "华语,古风,流行"
  tags: string[] // ["华语", "古风", "流行"]
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  updateTime: number
  userId: number
}

export interface BannerInfo {
  adDispatchJson: null
  adLocation: null
  adSource: null
  adid: null
  adurlV2: null
  alg: string // 'alg-music-rec-banner-song-h-DF-1672399390985614'
  bannerBizType: string // 'new_rcmd_banner'
  bannerId: string // '1672399390985614'
  dynamicVideoData: null
  encodeId: string // '1908049566'
  event: null
  exclusive: boolean
  extMonitor: null
  extMonitorInfo: null
  logContext: null
  monitorBlackList: null
  monitorClick: null
  monitorClickList: null
  monitorImpress: null
  monitorImpressList: null
  monitorType: null
  pic: string // 'http://p1.music.126.net/gvtdUqTlWyCr-B3EJcjprw==/109951168193939793.jpg'
  pid: null
  program: null
  requestId: ''
  s_ctrp: string // 'syspf_resourceType_1-syspf_resourceId_1908049566'
  scm: string // '1.music-homepage.homepage_banner_rcmd_new.banner.6509036.-1511540524.null'
  showAdTag: true
  showContext: null
  song: {}
  targetId: number
  targetType: 1
  titleColor: string // 'red'
  typeTitle: string // '热歌推荐'
  url: null
  video: null
}
export interface BlockBanner {
  // blocks: {
  //   blockCode: 'HOMEPAGE_BANNER'
  //   blockDemote: boolean
  //   blockStyle: number
  //   canClose: boolean
  //   canFeedback: boolean
  //   dislikeShowType: number
  //   extInfo: {
      
  //   }
  //   showType: 'BANNER'
  //   sort: number
  // }[]
  banners: BannerInfo[]
}

export interface PlaylistTrack {
  a: null
  al: {
    // album
    id: number
    name: string // '叱吒新一代'
    pic: number
    picUrl: string // 'http://p3.music.126.net/i2P1ox4pWG9VLeoRFeUxfQ==/76965813961922.jpg'
    tns: []
  }
  alia: []
  ar: { // artiest
    alias: []
    id: number
    name: string
    tns: []
  }[]
  cd: string
  cf: string
  copyright: number
  cp: number
  crbt: null
  djId: number
  dt: number
  entertainmentTags: null
  fee: number
  ftype: number
  h: {}
  hr: null
  id: 5256469
  l: {}
  m: {}
  mark: number
  mst: number
  mv: number
  name: string
  no: number
  noCopyrightRcmd: null
  originCoverType: number
  originSongSimpleData: null
  pop: number
  pst: number
}
export type PlaylistDetailData = PlaylistItem & {
  tracks: PlaylistTrack[]
}
