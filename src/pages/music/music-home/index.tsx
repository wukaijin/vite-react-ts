/*
 * @Author: Carlos
 * @Date: 2023-01-09 16:17:09
 * @LastEditTime: 2023-01-09 17:30:14
 * @FilePath: /vite-react-swc/src/pages/music/music-home/index.tsx
 * @Description:
 */
import HomeBanner from './home-banner'
import NewSongs from './NewSongs'
import RecommendPlaylist from './recommend-playlist'

type Props = {}
const MusicHome = (props: Props) => {
  return (
    <>
      <NewSongs />
      <HomeBanner />
      <RecommendPlaylist />
    </>
  )
}
export default MusicHome
