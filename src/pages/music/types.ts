// 音乐相关类型定义
export interface Song {
    id: string;
    name: string;
    artist: string;
    album: string;
    url: string;
    pic: string;
    lrc: string;
    platform: string;
}

export interface LyricLine {
    time: number;
    text: string;
}
