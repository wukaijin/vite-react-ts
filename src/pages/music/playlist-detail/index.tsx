import { useRequest, useUnmount } from 'ahooks'
import { CSSProperties, useEffect, useLayoutEffect, useRef } from 'react'
import { OverlayScrollbars } from 'overlayscrollbars'
import { connect, ConnectedProps } from 'react-redux'
import { PauseOne, Play } from '@icon-park/react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import { queryPlaylistDetail } from '@/api/music'
import { musicDurationToString } from '@/utils'
import './index.scss'
import Table from '@/components/enhance/table'
import { RootState } from '@/store'
import { togglePlaying, updateCurrentSong } from '@/store/music'
import { listen } from '../util'
import { PlaylistTrack } from '@/interface/music'
/*
 * @Author: Carlos
 * @Date: 2023-01-09 23:02:50
 * @LastEditTime: 2023-01-11 00:30:54
 * @FilePath: /vite-react-swc/src/pages/music/playlist-detail/index.tsx
 * @Description:
 */
type Props = PropsFromRedux
const TAG_COLOR_MAPPING: string[] = [
  'text-indigo-400 border-indigo-400',
  'text-rose-400 border-rose-400',
  'text-sky-400 border-sky-400'
]
const PlaylistDetail = (props: Props) => {
  const {
    current,
    playing,
    updateCurrentSong: updateCS,
    togglePlaying: togglePlayerPlaying
  } = props
  const descRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [searches] = useSearchParams()
  const { setTopStyle } = useOutletContext() as { setTopStyle: (sty: CSSProperties) => void }

  const handlePlay = (detailData: PlaylistTrack) => () => {
    const song = {
      id: detailData.id,
      artiest: detailData.ar.map(ar => ar.name).join(','),
      name: detailData.name,
      alias: detailData.alia.join(','),
      album: detailData.al.name
    }
    listen({
      song,
      updateCurrentSong: updateCS,
      togglePlaying: togglePlayerPlaying
    })
  }
  const { data, run, loading } = useRequest(queryPlaylistDetail, {
    manual: true,
    onSuccess(res) {
      setTopStyle({
        backgroundImage: `url(${res.coverImgUrl})`,
        backgroundSize: 'cover'
      })
    }
  })

  useEffect(() => {
    const id = searches.get('id')
    if (id) run(Number(id))
  }, [searches])

  useLayoutEffect(() => {
    if (descRef.current) {
      OverlayScrollbars(descRef.current, {
        scrollbars: {
          visibility: 'hidden'
        }
      })
      if (tableRef.current) {
        console.log('tableRef.current')
        OverlayScrollbars(tableRef.current, {
          scrollbars: {
            visibility: 'hidden'
          }
        })
      }
    }
  }, [loading])
  useUnmount(() => {
    setTopStyle({})
  })
  if (loading || !data) return null
  return (
    <div>
      <div className="w-[100vw] sm:min-w-[1080px] sm:h-[calc(100vh-3.5rem)] sm:container mx-auto py-8">
        <div className="box-border playlist-card backdrop-blur-md sm:max-h-[calc(100vh-7.5rem)] p-8">
          <div className="grid grid-cols-4 gap-8 ">
            <div className=" col-span-1 flex flex-col sm:max-h-[calc(100vh-11.5rem)]">
              <div className="flex">
                <img className="aspect-square rounded-lg" src={data.coverImgUrl} alt="" />
              </div>
              <div className="playlist-card my-4 text-base font-semibold leading-8 p-4">
                <span>{data.name}</span>
              </div>
              <div
                ref={descRef}
                className="playlist-card text-slate-600 overflow-auto py-4 px-4 flex-1"
              >
                <span>{data.description}</span>
              </div>
            </div>
            <div className="col-span-3 flex flex-col sm:max-h-[calc(100vh-11.5rem)]  overflow-auto">
              <div className="playlist-card py-4 px-8 mb-4">
                {data.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={clsx(
                      'inline-block text-sm rounded-xl px-2 border mr-2',
                      TAG_COLOR_MAPPING[i]
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div ref={tableRef} className="playlist-card p-4">
                <Table className="playlist-table">
                  <Table.Head>
                    <span />
                    <span>Name</span>
                    <span>Artists</span>
                    <span>album</span>
                    <span>duration</span>
                    <span />
                  </Table.Head>
                  <Table.Body>
                    {data.tracks.map((item, index) => {
                      return (
                        <Table.Row key={item.id}>
                          <span className="font-normal">{index + 1}</span>
                          <div className="">
                            <div>{item.name}</div>
                            {!!item.alia.length && (
                              <div className="opacity-60 text-xs">{item.alia}</div>
                            )}
                          </div>
                          <span>{item.ar[0].name}</span>
                          <span>{item.al.name}</span>
                          <span>{musicDurationToString(item.dt / 1000)}</span>
                          <span>
                            <span>
                              {(current.id !== item.id || !playing) && (
                                <Play
                                  theme="filled"
                                  className="text-2xl text-indigo-400 rounded-full opacity-80 cursor-pointer hover:play-pulse"
                                  onClick={handlePlay(item)}
                                />
                              )}
                              {current.id === item.id && playing && (
                                <PauseOne
                                  theme="filled"
                                  className="text-2xl text-indigo-400 rounded-full 
                                opacity-80 cursor-pointer hover:play-pulse"
                                  onClick={() => togglePlayerPlaying()}
                                />
                              )}
                            </span>
                          </span>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state: RootState) => {
  return {
    current: state.music.current,
    playing: state.music.playing
  }
}
const mapDispatchToProps = {
  updateCurrentSong,
  togglePlaying
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(PlaylistDetail)
