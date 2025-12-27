import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useMusicSearch } from './hooks/useMusicSearch'
import { useMusicPlayer } from './hooks/useMusicPlayer'
import { useLyrics } from './hooks/useLyrics'
import { SearchBar } from './components/SearchBar'
import { AlbumArt } from './components/AlbumArt'
import { LyricView } from './components/LyricView'
import { PlayerControls } from './components/PlayerControls'
import { ProgressBar } from './components/ProgressBar'
import { MusicList } from './components/MusicList'
import { SciFiVisualizer } from './components/SciFiVisualizer'

/**
 * 音乐播放器主组件
 */
const MusicPlayer: React.FC = () => {
  // 搜索相关
  const { keyword, setKeyword, results, loading, searchMusic } = useMusicSearch()

  // 播放器相关
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    handlePlay,
    togglePlay,
    handleTimeUpdate,
    handleSeek,
    handleNext,
    handlePrev
  } = useMusicPlayer(results)

  // 歌词相关
  const { lyrics, currentLyricIndex, showLyrics, setShowLyrics, lyricScrollRef } = useLyrics(
    currentSong,
    currentTime
  )

  // 初始搜索
  useEffect(() => {
    searchMusic(keyword)
  }, [])

  return (
    <div className={styles.container}>
      {/* 音频元素 */}
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      {/* 背景模糊 */}
      <div
        className={`${styles.bgBlur} ${currentSong ? styles.active : ''}`}
        style={{ backgroundImage: currentSong ? `url(${currentSong.pic})` : 'none' }}
      />

      {/* 标题 */}
      <div className={styles.title}>Glassmorphism Music</div>

      {/* 搜索栏 */}
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={() => searchMusic(keyword)}
      />

      {/* 播放器布局 */}
      <div className={styles.playerLayout}>
        {/* 左侧：当前播放 */}
        <div className={styles.currentTrack}>
          {/* Visualizer - Behind Content */}
          <SciFiVisualizer audioRef={audioRef} isPlaying={isPlaying} />
          {/* 专辑封面 / 歌词视图切换 */}
          {!showLyrics ? (
            <AlbumArt
              picUrl={currentSong?.pic || ''}
              isPlaying={isPlaying}
              onClick={() => setShowLyrics(true)}
            />
          ) : (
            <LyricView
              lyrics={lyrics}
              currentLyricIndex={currentLyricIndex}
              lyricScrollRef={lyricScrollRef}
              onClick={() => setShowLyrics(false)}
            />
          )}

          {/* 歌曲信息 */}
          <div className={styles.trackInfo}>
            <h2>{currentSong?.name || 'No Song Selected'}</h2>
            <p>{currentSong?.artist || 'Unknown Artist'}</p>
          </div>

          {/* 播放控制 */}
          <PlayerControls
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {/* 进度条 */}
          <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
        </div>

        {/* 右侧：搜索结果列表 */}
        <div className={styles.resultsList}>
          <MusicList
            results={results}
            currentSongId={currentSong?.id}
            loading={loading}
            onPlay={handlePlay}
          />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
