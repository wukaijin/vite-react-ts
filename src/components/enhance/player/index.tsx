/*
 * @Author: Carlos
 * @Date: 2023-01-04 22:17:37
 * @LastEditTime: 2023-01-06 00:04:49
 * @FilePath: /vite-react-swc/src/components/enhance/player/index.tsx
 * @Description:
 */
import { createRef, RefObject, Component, startTransition } from 'react'
import { FoldUpOne, GoEnd, GoStart, Like, MusicList, MusicOne } from '@icon-park/react'
import clsx from 'clsx'
import { NeuPlayButton, NeuPanel, NeuButton, NeuSlider } from '@/components/neumorphism'
import MusicPlayer from './MusicPlayer'
import LyricPanel from './LyricPanel'
import { musicDurationToString, parseLyric, parseMusicTime } from '@/utils'

const PXDY = './pxdy.mp3'
type Props = {
  from: 'bottom' | 'right'
  togglePlayer: () => void
}

type State = {
  playing: boolean
  musicSrc: string
  duration: number
  currentTime: number
  currentLycIndex: number
  lyric: ReturnType<typeof parseLyric> | null
}
class Player extends Component<Props, State> {
  audioRef: RefObject<HTMLAudioElement>
  player: MusicPlayer | null = null
  constructor(props: Props) {
    super(props)
    this.state = {
      playing: false,
      musicSrc: '',
      duration: 0,
      currentTime: 0,
      currentLycIndex: 0,
      lyric: parseLyric(window.localStorage.getItem('188376')!)
    }
    this.audioRef = createRef<HTMLAudioElement>()
  }
  componentDidMount(): void {
    if (this.audioRef.current) {
      this.player = new MusicPlayer(this.audioRef.current, this)
    }
    this.setState({
      musicSrc: PXDY
    })
  }
  updateCurrentLycIndex(currentTime: number): void {
    const { currentLycIndex, lyric } = this.state
    const nextItem = lyric?.lrc[currentLycIndex + 1]
    if (nextItem) {
      if (currentTime > parseMusicTime(nextItem.time)) {
        startTransition(() => {
          this.setState({
            currentLycIndex: currentLycIndex + 1
          })
        })
      }
    }
    startTransition(() => {
      this.setState({ currentTime })
    })
  }
  updateDuration(duration: number) {
    this.setState({
      duration
    })
  }
  togglePlaying() {
    console.log('togglePlaying')
    this.state.playing ? this.pause() : this.play()
  }
  changeCurrentTime(value: number) {
    if (this.audioRef.current) {
      this.audioRef.current.currentTime = (this.state.duration * value) / 100
    }
  }
  play() {
    console.log('play invoked')
    this.audioRef
      .current!.play()
      .then(() => {
        console.log('ok to play')
        this.setState({ playing: true })
      })
      .catch(err => {
        console.error('play error: ', err)
      })
  }
  pause() {
    console.log('pause invoked')
    this.audioRef.current!.pause()
    this.setState({ playing: false })
  }
  changeProgress(percent: number) {
    this.relocateCurrentLyricIndex(percent)
    this.changeCurrentTime(percent)
  }
  relocateCurrentLyricIndex(percent: number) {
    const updatedTime = (percent / 100) * this.state.duration
    const { lyric } = this.state
    let result: number = (lyric?.lrc?.length || 0) - 1
    if (lyric?.lrc) {
      for (let index = 0; index < lyric.lrc.length; index++) {
        const item = lyric.lrc[index]
        const thirdItem = lyric.lrc[index + 2] // ! locate to next, but compare with the third one
        const cur = parseMusicTime(item.time)
        const third = parseMusicTime(thirdItem?.time)
        if (thirdItem && third < updatedTime) {
          continue
        }
        if (thirdItem && third > updatedTime) {
          result = index
          break
        }
      }
    }
    this.setState({ currentLycIndex: result })
  }
  render() {
    const { playing, musicSrc, duration, currentTime, currentLycIndex, lyric } = this.state
    const { from, togglePlayer } = this.props
    console.log('from', from)
    return (
      <div className="pt-4 w-[100vw] sm:w-[400px] text-gray-400">
        <NeuPanel className="p-6 sm:pr-2 rounded-r-none">
          <div className="h-12 flex justify-between">
            <NeuButton size="sm">
              <FoldUpOne
                theme="outline"
                className={clsx('cursor-pointer scale-y-110 ', {
                  'rotate-90': from === 'right',
                  'rotate-180': from === 'bottom'
                })}
                onClick={togglePlayer}
              />
            </NeuButton>
            <NeuButton size="sm">
              <MusicList theme="outline" className="cursor-pointer scale-y-110" />
            </NeuButton>
          </div>
          <div className="flex text-center items-center justify-center mb-3">
            <NeuButton size="sm">
              <span>
                {/* <span style={{ color: 'var(--neu-primary)' }}> */}
                <MusicOne theme="filled" size={16} className="text-lime-600" />
                <span>披星戴月</span>
                <span className="px-1"> - </span>
                <span>张敬轩</span>
              </span>
            </NeuButton>
          </div>
          <LyricPanel active={currentLycIndex} lyric={lyric} />
          <NeuPanel className="mt-4">
            <div className="px-4 pt-4">
              <div className="flex justify-between text-xs">
                <span>{musicDurationToString(currentTime)}</span>
                <span>{musicDurationToString(duration)}</span>
              </div>
              <NeuSlider
                size="sm"
                value={(currentTime / duration) * 100}
                onChange={percent => this.changeProgress(percent)}
              />
            </div>
            <div className="flex items-center justify-center px-2 pt-1">
              <NeuButton size="sm" shape="circle">
                <GoStart theme="filled" />
              </NeuButton>
              <NeuPlayButton
                className="mx-2"
                playing={playing}
                onChange={() => this.togglePlaying()}
              />
              <NeuButton size="sm" shape="circle">
                <GoEnd theme="filled" />
              </NeuButton>
            </div>
          </NeuPanel>
        </NeuPanel>
        <audio ref={this.audioRef} src={musicSrc}>
          <track kind="captions" src={musicSrc} />
        </audio>
      </div>
    )
  }
}

export default Player
