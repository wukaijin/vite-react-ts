import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import {
    PlayOne,
    Pause,
    GoStart,
    GoEnd,
    Search
} from '@icon-park/react';

interface Song {
    id: string;
    name: string;
    artist: string;
    album: string;
    url: string;
    pic: string;
    lrc: string;
    platform: string;
}

const MusicPlayer: React.FC = () => {
    const [keyword, setKeyword] = useState('王菲');
    const [results, setResults] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([]);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [showLyrics, setShowLyrics] = useState(false);
    const lyricScrollRef = useRef<HTMLDivElement>(null);

    const audioRef = useRef<HTMLAudioElement>(null);

    const searchMusic = async (kw: string) => {
        if (!kw) return;
        setLoading(true);
        try {
            const res = await axios.get(`https://music-dl.sayqz.com/api/?type=aggregateSearch&keyword=${encodeURIComponent(kw)}`);
            // Based on the provided json structure
            if (res.data && res.data.data && res.data.data.results) {
                setResults(res.data.data.results);
            }
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial search
    useEffect(() => {
        searchMusic(keyword);
    }, []);

    // Fetch and parse lyrics when currentSong changes
    useEffect(() => {
        if (!currentSong) {
            setLyrics([]);
            return;
        }

        const fetchLyrics = async () => {
            if (!currentSong.lrc) {
                setLyrics([]);
                return;
            }
            try {
                const res = await axios.get(currentSong.lrc);
                const lrcText = res.data;
                if (typeof lrcText === 'string') {
                    const parsedLyrics = parseLyrics(lrcText);
                    setLyrics(parsedLyrics);
                    if (parsedLyrics.length > 0) {
                        setCurrentLyricIndex(0);
                        setShowLyrics(true);
                    }
                } else {
                    setLyrics([]);
                }
            } catch (error) {
                console.error("Failed to fetch lyrics", error);
                setLyrics([]);
            }
        };
        fetchLyrics();
    }, [currentSong]);

    const parseLyrics = (lrc: string) => {
        const lines = lrc.split('\n');
        const regex = /^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)$/;
        const result: { time: number; text: string }[] = [];

        for (const line of lines) {
            const match = line.match(regex);
            if (match) {
                const min = parseInt(match[1]);
                const sec = parseInt(match[2]);
                const ms = match[3] ? parseInt(match[3]) : 0;
                // Standardize ms to seconds (e.g. 50 -> 0.5, 500 -> 0.5)
                // Often lrc is .xx (hundredths) or .xxx (milliseconds)
                const time = min * 60 + sec + (match[3]?.length === 3 ? ms / 1000 : ms / 100);
                const text = match[4].trim();
                if (text) {
                    result.push({ time, text });
                }
            }
        }
        return result;
    };

    const handlePlay = (song: Song) => {
        // If clicking the same song, toggle play/pause
        if (currentSong?.id === song.id) {
            togglePlay();
            return;
        }

        setCurrentSong(song);
        setIsPlaying(true);
        setShowLyrics(false); // Reset to cover view on new song
    };

    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.url;
            audioRef.current.play().catch(e => {
                console.error("Autoplay failed:", e);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    }, [currentSong]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const time = audioRef.current.currentTime;
            setCurrentTime(time);
            setDuration(audioRef.current.duration || 0);

            // Find current lyric index
            if (lyrics.length > 0) {
                let index = lyrics.findIndex(l => l.time > time);
                if (index === -1) {
                    index = lyrics.length - 1;
                } else {
                    index = index - 1;
                }
                if (index !== currentLyricIndex) {
                    setCurrentLyricIndex(index);
                    // Scroll to lyric
                    if (lyricScrollRef.current && index >= 0) {
                        const activeElement = lyricScrollRef.current.children[index] as HTMLElement;
                        if (activeElement) {
                            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                }
            }
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleNext = () => {
        if (!currentSong || results.length === 0) return;
        const currentIndex = results.findIndex(s => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % results.length;
        handlePlay(results[nextIndex]);
    };

    const handlePrev = () => {
        if (!currentSong || results.length === 0) return;
        const currentIndex = results.findIndex(s => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + results.length) % results.length;
        handlePlay(results[prevIndex]);
    };

    const formatTime = (time: number) => {
        if (Number.isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className={styles.container}>
            {/* Audio Element Hidden */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleNext}
            />

            <div
                className={`${styles.bgBlur} ${currentSong ? styles.active : ''}`}
                style={{ backgroundImage: currentSong ? `url(${currentSong.pic})` : 'none' }}
            />

            <div className={styles.title}>Glassmorphism Music</div>

            <div className={styles.searchSection}>
                <input
                    className={styles.searchInput}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchMusic(keyword)}
                    placeholder="Search for songs, artists..."
                />
                <button className={styles.searchButton} onClick={() => searchMusic(keyword)}>
                    <Search size={20} />
                </button>
            </div>

            <div className={styles.playerLayout}>
                {/* Left: Player Controls */}
                <div className={styles.currentTrack}>
                    {!showLyrics ? (
                        <div
                            className={styles.albumArt}
                            onClick={() => setShowLyrics(true)}
                            title="Click to view lyrics"
                        >
                            <img
                                src={currentSong?.pic || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop'}
                                alt="Album Art"
                                className={isPlaying ? styles.playing : ''}
                            />
                        </div>
                    ) : (
                        <div
                            className={styles.lyricContainer}
                            ref={lyricScrollRef}
                            onClick={() => setShowLyrics(false)}
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
                    )}

                    <div className={styles.trackInfo}>
                        <h2>{currentSong?.name || 'No Song Selected'}</h2>
                        <p>{currentSong?.artist || 'Unknown Artist'}</p>
                    </div>

                    <div className={styles.controls}>
                        <button onClick={handlePrev}>
                            <GoStart size={24} fill="#ffffff" />
                        </button>
                        <button
                            className={`${styles.playBtn} ${isPlaying ? styles.active : ''}`}
                            onClick={togglePlay}
                        >
                            {isPlaying ? <Pause size={32} fill="#ffffff" /> : <PlayOne size={32} fill="#ffffff" />}
                        </button>
                        <button onClick={handleNext}>
                            <GoEnd size={24} fill="#ffffff" />
                        </button>
                    </div>

                    <div className={styles.timeControl}>
                        <span>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Right: Results List */}
                <div className={styles.resultsList}>
                    {loading ? (
                        <div className={styles.loading}>Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((song) => (
                            <div
                                key={`${song.platform}-${song.id}`}
                                className={`${styles.resultItem} ${currentSong?.id === song.id ? styles.playing : ''}`}
                                onClick={() => handlePlay(song)}
                            >
                                <div className={styles.left}>
                                    <img src={song.pic} alt={song.name} className={styles.miniCover} />
                                    <div className={styles.songInfo}>
                                        <h3>{song.name}</h3>
                                        <p>{song.artist} - {song.album}</p>
                                    </div>
                                </div>
                                <span className={styles.platformTag}>{song.platform}</span>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', color: '#8d8d8d' }}>No results found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
