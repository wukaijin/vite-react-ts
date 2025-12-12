/*
 * @Author: Carlos
 * @Date: 2023-01-04 22:17:37
 * @LastEditTime: 2023-01-30 17:39:32
 * @FilePath: /vite-react-swc/src/components/enhance/player/index.tsx
 * @Description:
 */
import { createRef, RefObject, Component, startTransition } from 'react'
import { FoldUpOne, GoEnd, GoStart, MusicList, MusicOne } from '@icon-park/react'
import { connect, ConnectedProps } from 'react-redux'
import clsx from 'clsx'
import { NeuPlayButton, NeuPanel, NeuButton, NeuSlider } from '@/components/neumorphism'
import MusicPlayer from './MusicPlayer'
import LyricPanel from './LyricPanel'
import { musicDurationToString, parseLyric, parseMusicTime } from '@/utils'
import { togglePlayer, togglePlaying } from '@/store/music'
import eventemitter from '@/utils/eventemitter'
import { EVENT_KEYS } from '@/const'
import { RootState } from '@/store'

// const PXDY = './pxdy.mp3'
type Props = WithReduxProps & {
  from: 'bottom' | 'right'
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
export class Player extends Component<Props, State> {
  audioRef: RefObject<HTMLAudioElement | null>
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
    this.audioRef = createRef()
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    const { playing } = props
    const { lyric, url } = props.current
    const newState = {
      playing
    }

    if (playing !== state.playing) {
      if (playing) {
        eventemitter.emit(EVENT_KEYS.MUSIC_PLAYER_STATE_TO_PLAY)
      } else {
        console.log('pause', playing, state.playing)
        eventemitter.emit(EVENT_KEYS.MUSIC_PLAYER_STATE_TO_PAUSE)
        eventemitter.off(EVENT_KEYS.MUSIC_PLAYER_CAN_PLAY)
      }
    }
    if (lyric && props.current.lyric !== state.lyric) {
      Object.assign(newState, {
        lyric,
        lyricObject: parseLyric(lyric),
        musicSrc: url
      })
    }
    return newState
  }
  componentDidMount(): void {
    eventemitter.on(EVENT_KEYS.MUSIC_PLAYER_STATE_TO_PLAY, this.play, this)
    eventemitter.on(EVENT_KEYS.MUSIC_PLAYER_STATE_TO_PAUSE, this.pause, this)
    if (this.audioRef.current) {
      this.player = new MusicPlayer(this.audioRef.current, this)
    }
  }
  componentWillUnmount(): void {
    eventemitter.off(EVENT_KEYS.MUSIC_PLAYER_STATE_TO_PLAY)
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
    console.log('play triggered')
    this.audioRef
      .current!.play()
      .then(() => {
        // this.setState({ playing: true })
        this.props.togglePlaying(true)
      })
      .catch(err => {
        console.error('play error: ', err)
        eventemitter.once(EVENT_KEYS.MUSIC_PLAYER_CAN_PLAY, () => this.play())
      })
  }
  pause() {
    console.log('trigger pause')
    this.audioRef.current!.pause()
    // this.setState({ playing: false })
    this.props.togglePlaying(false)
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
        // const cur = parseMusicTime(item.time)
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
    const { from, togglePlayer: toggleP, current } = this.props
    return (
      <div className="w-[100vw] h-[100vh] sm:h-auto sm:w-[400px] text-gray-400">
        <div
          className="p-6 h-[100%] sm:pr-2 rounded-none sm:rounded-l-xl flex flex-col"
          style={{ boxShadow: 'none', backgroundColor: 'var(--neu-greyLight-1)' }}
        >
          <div className="h-12 flex justify-between">
            <NeuButton size="xs" className="aspect-square">
              <FoldUpOne
                theme="outline"
                className={clsx('cursor-pointer scale-y-110 ', {
                  'rotate-90': from === 'right',
                  'rotate-180': from === 'bottom'
                })}
                onClick={() => toggleP()}
              />
            </NeuButton>
            <NeuButton size="xs">
              <span>
                {/* <span style={{ color: 'var(--neu-primary)' }}> */}
                <MusicOne theme="filled" size={16} className="text-lime-600" />
                <span>{current.artiest}</span>
              </span>
            </NeuButton>
            <NeuButton size="xs" className="aspect-square">
              <MusicList theme="outline" className="cursor-pointer scale-y-110" />
            </NeuButton>
          </div>
          <div className="flex-1">
            <LyricPanel active={currentLycIndex} lyric={lyricObject} />
          </div>
          <div className="text-center py-2">
            <div className="text-lg leading-12 text-slate-500">
              <span>{current.name}</span>
            </div>
            <div className="text-xs">
              <span>{current.album}</span>
            </div>
          </div>
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
        </div>
        <audio ref={this.audioRef} src={musicSrc}>
          <track kind="captions" src={musicSrc} />
        </audio>
      </div>
    )
  }
}

const connector = connect(
  (state: RootState) => ({
    current: state.music.current,
    playing: state.music.playing
  }),
  { togglePlaying, togglePlayer }
)
type WithReduxProps = ConnectedProps<typeof connector>
export default connector(Player)
