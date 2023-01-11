import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { queryKeyWord } from '@/api/music'
import { QueryListData } from '@/interface/music'

import List from '../List'

/*
 * @Author: Carlos
 * @Date: 2023-01-09 16:18:01
 * @LastEditTime: 2023-01-11 11:52:32
 * @FilePath: /vite-react-swc/src/pages/music/music-search/index.tsx
 * @Description:
 */
type Props = {}
const MusicSearch = (props: Props) => {
  console.log(props)
  const [searches] = useSearchParams()
  // const query = useCallback(async () => {
  //   const result = await queryKeyWord<QueryListData>(keyWord)
  //   if (result) {
  //     setData(result)
  //   }
  // }, [keyWord, setData])
  const { data = [], loading, run } = useRequest(queryKeyWord<QueryListData>, {
    manual: true
  })
  useEffect(() => {
    console.log()
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
