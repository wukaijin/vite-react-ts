import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import type { Song, LyricLine } from '../types';
import { parseLyrics } from '../utils';

/**
 * 歌词管理 Hook
 */
export const useLyrics = (currentSong: Song | null, currentTime: number) => {
    const [lyrics, setLyrics] = useState<LyricLine[]>([]);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [showLyrics, setShowLyrics] = useState(false);
    const lyricScrollRef = useRef<HTMLDivElement>(null);

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
                console.error('Failed to fetch lyrics', error);
                setLyrics([]);
            }
        };
        fetchLyrics();
    }, [currentSong]);

    // Update current lyric index based on time
    useEffect(() => {
        if (lyrics.length === 0) return;

        let index = lyrics.findIndex((l) => l.time > currentTime);
        if (index === -1) {
            index = lyrics.length - 1;
        } else {
            index = index - 1;
        }

        if (index !== currentLyricIndex && index >= 0) {
            setCurrentLyricIndex(index);
            // Scroll to lyric
            if (lyricScrollRef.current) {
                const activeElement = lyricScrollRef.current.children[index] as HTMLElement;
                if (activeElement) {
                    activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    }, [currentTime, lyrics, currentLyricIndex]);

    return {
        lyrics,
        currentLyricIndex,
        showLyrics,
        setShowLyrics,
        lyricScrollRef
    };
};
