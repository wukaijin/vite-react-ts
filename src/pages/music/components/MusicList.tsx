import React from 'react';
import type { Song } from '../types';
import styles from '../index.module.scss';

interface MusicListProps {
    results: Song[];
    currentSongId: string | undefined;
    loading: boolean;
    onPlay: (song: Song) => void;
}

/**
 * 音乐列表组件
 */
export const MusicList: React.FC<MusicListProps> = ({ results, currentSongId, loading, onPlay }) => {
    if (loading) {
        return <div className={styles.loading}>Searching...</div>;
    }

    if (results.length === 0) {
        return <div style={{ textAlign: 'center', color: '#8d8d8d' }}>No results found</div>;
    }

    return (
        <>
            {results.map((song) => (
                <div
                    key={`${song.platform}-${song.id}`}
                    className={`${styles.resultItem} ${currentSongId === song.id ? styles.playing : ''}`}
                    onClick={() => onPlay(song)}
                >
                    <div className={styles.left}>
                        <img src={song.pic} alt={song.name} className={styles.miniCover} />
                        <div className={styles.songInfo}>
                            <h3>{song.name}</h3>
                            <p>
                                {song.artist} - {song.album}
                            </p>
                        </div>
                    </div>
                    <span className={styles.platformTag}>{song.platform}</span>
                </div>
            ))}
        </>
    );
};
