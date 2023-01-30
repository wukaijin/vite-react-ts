/*
 * @Author: Carlos
 * @Date: 2023-01-09 16:17:09
 * @LastEditTime: 2023-01-30 17:48:09
 * @FilePath: /vite-react-swc/src/pages/music/music-home/index.tsx
 * @Description:
 */
import HomeBanner from './home-banner'
import NewSongs from './NewSongs'
import RecommendPlaylist from './recommend-playlist'

type Props = {}
const MusicHome = (props: Props) => {
  return (
    <div className="w-[100vw] sm:container xl:w-[1024px] mx-auto">
      <NewSongs />
      <HomeBanner />
      <RecommendPlaylist />
    </div>
  )
}
export default MusicHome
