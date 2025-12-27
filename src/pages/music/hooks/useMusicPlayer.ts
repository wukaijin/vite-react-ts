import { useState, useRef, useEffect } from 'react';
import type { Song } from '../types';

/**
 * 音乐播放器 Hook
 */
export const useMusicPlayer = (results: Song[]) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlay = (song: Song) => {
        // If clicking the same song, toggle play/pause
        if (currentSong?.id === song.id) {
            togglePlay();
            return;
        }

        setCurrentSong(song);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.url;
            audioRef.current.play().catch((e) => {
                console.error('Autoplay failed:', e);
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
        const currentIndex = results.findIndex((s) => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % results.length;
        handlePlay(results[nextIndex]);
    };

    const handlePrev = () => {
        if (!currentSong || results.length === 0) return;
        const currentIndex = results.findIndex((s) => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + results.length) % results.length;
        handlePlay(results[prevIndex]);
    };

    return {
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
    };
};
