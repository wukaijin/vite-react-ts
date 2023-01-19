import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { queryKeyWord } from '@/api/music'
import { QueryListData } from '@/interface/music'

import List from '../List'

/*
 * @Author: Carlos
 * @Date: 2023-01-09 16:18:01
 * @LastEditTime: 2023-01-19 23:35:19
 * @FilePath: /vite-react-swc/src/pages/music/music-search/index.tsx
 * @Description:
 */
type Props = {}
const MusicSearch = (props: Props) => {
  const [searches] = useSearchParams()
  const { data = [], loading, run } = useRequest(queryKeyWord<QueryListData>, {
    manual: true
  })
  useEffect(() => {
    const keyWord = searches.get('keyWord')
    if (keyWord) run(keyWord)
  }, [searches])
  return (
    <div className="w-[100vw] sm:container xl:w-[1024px] mx-auto">
      <List data={data} />
    </div>
  )
}
export default MusicSearch
