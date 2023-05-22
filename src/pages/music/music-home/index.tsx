/*
 * @Author: Carlos
 * @Date: 2023-01-09 16:17:09
 * @LastEditTime: 2023-05-22 18:31:24
 * @FilePath: /vite-react-swc/src/pages/music/music-home/index.tsx
 * @Description:
 */
import useTitle from '@/hooks/useTitle'
import HomeBanner from './home-banner'
import NewSongs from './NewSongs'
import RecommendPlaylist from './recommend-playlist'

type Props = {}
const MusicHome = (props: Props) => {
  useTitle('Carlos Music')
  return (
    <div className="w-[100vw] sm:container xl:w-[1024px] mx-auto">
      <NewSongs />
      <HomeBanner />
      <RecommendPlaylist />
    </div>
  )
}
export default MusicHome
