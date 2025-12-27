import { useState } from 'react';
import axios from 'axios';
import type { Song } from './types';

/**
 * 音乐搜索 Hook
 */
export const useMusicSearch = () => {
    const [keyword, setKeyword] = useState('王菲');
    const [results, setResults] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);

    const searchMusic = async (kw: string) => {
        if (!kw) return;
        setLoading(true);
        try {
            const res = await axios.get(
                `https://music-dl.sayqz.com/api/?type=aggregateSearch&keyword=${encodeURIComponent(kw)}`
            );
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

    return {
        keyword,
        setKeyword,
        results,
        loading,
        searchMusic
    };
};
