import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { useMount } from 'ahooks'
import { queryPlaylistTags, queryTopPlaylist } from '@/api/music'
import { PlaylistItem, PlaylistTag } from '@/interface/music'
import PlaylistCard from './PlaylistCard'

/*
 * @Author: Carlos
 * @Date: 2023-01-08 14:00:03
 * @LastEditTime: 2023-01-08 21:38:47
 * @FilePath: /vite-react-swc/src/pages/music/recommendPlaylist/index.tsx
 * @Description:
 */
type Props = {}
const RecommendPlaylist = (props: Props) => {
  const [tags, setTags] = useState<PlaylistTag[]>([])
  const [currentTag, setCurrentTag] = useState<string>('粤语')
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([])
  useMount(async () => {
    const result = await queryPlaylistTags()
    setTags(result)
    const list = await queryTopPlaylist(currentTag)
    setPlaylists(list.slice(0, 10))
    console.log(list)
  })
  const handleTagClick = useCallback(
    async (tag: string) => {
      const list = await queryTopPlaylist(tag)
      setCurrentTag(tag)
      setPlaylists(list.slice(0, 10))
    },
    [setCurrentTag, setPlaylists]
  )
  return (
    <div>
      <div className="text-xl font-medium leading-14 ">Recommend Playlist</div>
      <div className="text-ellipsis overflow-hidden pb-4">
        {tags.map((tag, index) => (
          <span className="text-gray-800 leading-8">
            <span
              className={clsx('cursor-pointer text-sm hover:text-white hover:shadow-md hover:shadow-indigo-400', {
                'text-white': tag.name === currentTag
              })}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </span>
            {index !== tags.length - 1 && <span className="text-gray-600 mx-2 text-xs">/</span>}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {playlists.map(item => (
          <PlaylistCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default RecommendPlaylist
