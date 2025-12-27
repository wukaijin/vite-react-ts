import React from 'react';
import { formatTime } from '../utils';
import styles from '../index.module.scss';

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 进度条组件
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
    return (
        <div className={styles.timeControl}>
            <span>{formatTime(currentTime)}</span>
            <input type="range" min="0" max={duration || 100} value={currentTime} onChange={onSeek} />
            <span>{formatTime(duration)}</span>
        </div>
    );
};
