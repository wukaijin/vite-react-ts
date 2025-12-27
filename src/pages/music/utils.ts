import type { LyricLine } from './types';

/**
 * 格式化时间为 mm:ss 格式
 */
export const formatTime = (time: number): string => {
    if (Number.isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * 解析 LRC 歌词字符串
 */
export const parseLyrics = (lrc: string): LyricLine[] => {
    const lines = lrc.split('\n');
    const regex = /^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)$/;
    const result: LyricLine[] = [];

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
