import { useRequest, useUnmount } from 'ahooks'
import { CSSProperties, useEffect, useLayoutEffect, useRef } from 'react'
import { OverlayScrollbars } from 'overlayscrollbars'
import { Pause, PauseOne, Play } from '@icon-park/react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { queryPlaylistDetail } from '@/api/music'
import { musicDurationToString } from '@/utils'
import './index.scss'
import Table from '@/components/enhance/table'
/*
 * @Author: Carlos
 * @Date: 2023-01-09 23:02:50
 * @LastEditTime: 2023-01-11 00:03:52
 * @FilePath: /vite-react-swc/src/pages/music/playlist-detail/index.tsx
 * @Description:
 */
type Props = {}
const PlaylistDetail = (props: Props) => {
  const descRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [searches] = useSearchParams()
  const { setTopStyle } = useOutletContext() as { setTopStyle: (sty: CSSProperties) => void }
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
                <button className="btn">ok</button>
                <button className="btn btn-primary ml-4">no</button>
                <button className="btn btn-success ml-4">fake</button>
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
                          <span className="">
                            <span>{item.name}</span>
                            {!!item.alia.length && (
                              <span className="opacity-60">({item.alia})</span>
                            )}
                          </span>
                          <span>{item.ar[0].name}</span>
                          <span>{item.al.name}</span>
                          <span>{musicDurationToString(item.dt / 1000)}</span>
                          <span>
                            <span>
                              <Play
                                theme="filled"
                                className="text-2xl text-indigo-400 rounded-full opacity-80 cursor-pointer hover:play-pulse"
                              />
                              {/* <PauseOne
                                theme="filled"
                                className="text-2xl text-indigo-400 rounded-full 
                                opacity-80 cursor-pointer hover:play-pulse"
                              /> */}
                            </span>
                          </span>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                {/* <div>
                  {data.tracks.map(song => (
                    <div key={song.id}>
                      <div>
                        {song.name} - {song.ar.map(artiest => artiest.name).join(', ')}
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>{data.tags}</div> */}
    </div>
  )
}
export default PlaylistDetail
