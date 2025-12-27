import React from 'react'
import type { LyricLine } from '../types'
import styles from '../index.module.scss'

interface LyricViewProps {
  lyrics: LyricLine[]
  currentLyricIndex: number
  lyricScrollRef: React.RefObject<HTMLDivElement | null>
  onClick: () => void
}

/**
 * 歌词显示组件
 */
export const LyricView: React.FC<LyricViewProps> = ({
  lyrics,
  currentLyricIndex,
  lyricScrollRef,
  onClick
}) => {
  return (
    <div
      className={styles.lyricContainer}
      ref={lyricScrollRef}
      onClick={onClick}
      title="Click to view album art"
    >
      {lyrics.length > 0 ? (
        lyrics.map((line, index) => (
          <div
            key={index}
            className={`${styles.lyricLine} ${index === currentLyricIndex ? styles.active : ''}`}
          >
            {line.text}
          </div>
        ))
      ) : (
        <div className={styles.lyricLine}>No lyrics available</div>
      )}
    </div>
  )
}
