/*
 * @Author: Carlos
 * @Date: 2023-01-09 15:34:10
 * @LastEditTime: 2023-01-09 15:57:49
 * @FilePath: /vite-react-swc/src/pages/music/recommendPlaylist/PlaylistTags.tsx
 * @Description: 
 */
import clsx from 'clsx'
import { useRequest } from 'ahooks'
import { queryPlaylistTags } from '@/api/music'

type Props = {
  active: string
  handleTagClick: (tag: string) => void
}
function PlaylistTags({ active, handleTagClick }: Props) {
  const { data: tags = [], loading } = useRequest(queryPlaylistTags)
  return (
    <div className="text-ellipsis overflow-hidden pb-4">
      {tags.map((tag, index) => (
        <span key={tag.name} className="text-gray-800 leading-8">
          <span
            className={clsx(
              'cursor-pointer text-sm hover:text-white hover:shadow-md hover:shadow-indigo-400',
              {
                'text-white': tag.name === active
              }
            )}
            onClick={() => handleTagClick(tag.name)}
          >
            {tag.name}
          </span>
          {index !== tags.length - 1 && <span className="text-gray-600 mx-2 text-xs">/</span>}
        </span>
      ))}
    </div>
  )
}
export default PlaylistTags
