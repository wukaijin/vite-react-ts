import { memo, useCallback, useState } from 'react'
import clsx from 'clsx'
import { useRequest } from 'ahooks'
import { queryTopPlaylist } from '@/api/music'
import PlaylistCard from './PlaylistCard'
import PlaylistTags from './PlaylistTags'
import Loading from '@/components/base/Loading'

/*
 * @Author: Carlos
 * @Date: 2023-01-08 14:00:03
 * @LastEditTime: 2023-01-30 17:28:32
 * @FilePath: /vite-react-swc/src/pages/music/music-home/recommend-playlist/index.tsx
 * @Description:
 */
type Props = {}
const RecommendPlaylist = memo<Props>(props => {
  const [currentTag, setCurrentTag] = useState<string>('粤语')
  const { data: playlists = [], loading } = useRequest(() => queryTopPlaylist(currentTag), {
    refreshDeps: [currentTag],
    loadingDelay: 300
  })
  const handleTagClick = useCallback(
    async (tag: string) => {
      setCurrentTag(tag)
    },
    [setCurrentTag]
  )
  return (
    <div className="px-4 xs:px-0">
      <div className="text-xl font-medium leading-14 ">Recommend Playlist</div>
      <PlaylistTags active={currentTag} handleTagClick={handleTagClick} />
      {/* {loading && (
        <div className="flex justify-center text-center items-center py-16">
          <Loading.Circle />
        </div>
      )} */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        { playlists.slice(0, 10).map(item => <PlaylistCard key={item.id} data={item} />)}
      </div>
    </div>
  )
})

export default RecommendPlaylist
