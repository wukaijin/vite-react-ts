import React from 'react';
import { PlayOne, Pause, GoStart, GoEnd } from '@icon-park/react';
import styles from '../index.module.scss';

interface PlayerControlsProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    onPrev: () => void;
    onNext: () => void;
}

/**
 * 播放控制组件
 */
export const PlayerControls: React.FC<PlayerControlsProps> = ({
    isPlaying,
    onTogglePlay,
    onPrev,
    onNext
}) => {
    return (
        <div className={styles.controls}>
            <button onClick={onPrev}>
                <GoStart size={24} fill="#ffffff" />
            </button>
            <button className={`${styles.playBtn} ${isPlaying ? styles.active : ''}`} onClick={onTogglePlay}>
                {isPlaying ? <Pause size={32} fill="#ffffff" /> : <PlayOne size={32} fill="#ffffff" />}
            </button>
            <button onClick={onNext}>
                <GoEnd size={24} fill="#ffffff" />
            </button>
        </div>
    );
};
