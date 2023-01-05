/*
 * @Author: Carlos
 * @Date: 2023-01-04 22:17:37
 * @LastEditTime: 2023-01-06 02:31:00
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
import { Song } from '@/store/music'
import eventemitter from '@/utils/eventemitter'
import { EVENT_KEYS } from '@/const'

// const PXDY = './pxdy.mp3'
type Props = {
  current: Song
  from: 'bottom' | 'right'
  togglePlayer: () => void
}

type State = {
  playing: boolean
  musicSrc: string
  duration: number
  currentTime: number
  currentLycIndex: number
  lyricObject: ReturnType<typeof parseLyric> | null
  lyric: string
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
      lyricObject: null,
      lyric: ''
    }
    this.audioRef = createRef<HTMLAudioElement>()
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    const { lyric, url } = props.current
    if (lyric && props.current.lyric !== state.lyric) {
      return {
        lyric,
        lyricObject: parseLyric(lyric),
        musicSrc: url
      }
    }
    return null
  }
  componentDidMount(): void {
    eventemitter.on(EVENT_KEYS.MUSIC_PLAYER_STATE_CHANGE, this.play, this)
    if (this.audioRef.current) {
      this.player = new MusicPlayer(this.audioRef.current, this)
    }
  }
  componentWillUnmount(): void {
    eventemitter.off(EVENT_KEYS.MUSIC_PLAYER_STATE_CHANGE, this.play, this)
  }
  updateCurrentLycIndex(currentTime: number): void {
    const { currentLycIndex, lyricObject } = this.state
    const nextItem = lyricObject?.lrc[currentLycIndex + 1]
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
    this.state.playing ? this.pause() : this.play()
  }
  changeCurrentTime(value: number) {
    if (this.audioRef.current) {
      this.audioRef.current.currentTime = (this.state.duration * value) / 100
    }
  }
  play() {
    this.audioRef
      .current!.play()
      .then(() => {
        this.setState({ playing: true })
      })
      .catch(err => {
        console.error('play error: ', err)
      })
  }
  pause() {
    this.audioRef.current!.pause()
    this.setState({ playing: false })
  }
  changeProgress(percent: number) {
    this.relocateCurrentLyricIndex(percent)
    this.changeCurrentTime(percent)
  }
  relocateCurrentLyricIndex(percent: number) {
    const updatedTime = (percent / 100) * this.state.duration
    const { lyricObject } = this.state
    let result: number = (lyricObject?.lrc?.length || 0) - 1
    if (lyricObject?.lrc) {
      for (let index = 0; index < lyricObject.lrc.length; index++) {
        const item = lyricObject.lrc[index]
        // ! locate to next, but compare with the third one
        const thirdItem = lyricObject.lrc[index + 2]
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
    const { playing, musicSrc, duration, currentTime, currentLycIndex, lyricObject } = this.state
    const { from, togglePlayer, current } = this.props
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
                <span>{current.name}</span>
                <span className="px-1"> - </span>
                <span>{current.artiest}</span>
              </span>
            </NeuButton>
          </div>
          <LyricPanel active={currentLycIndex} lyric={lyricObject} />
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
