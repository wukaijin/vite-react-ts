import React from 'react';
import styles from '../index.module.scss';

interface AlbumArtProps {
    picUrl: string;
    isPlaying: boolean;
    onClick: () => void;
}

/**
 * 专辑封面组件
 */
export const AlbumArt: React.FC<AlbumArtProps> = ({ picUrl, isPlaying, onClick }) => {
    return (
        <div className={styles.albumArt} onClick={onClick} title="Click to view lyrics">
            <img
                src={
                    picUrl ||
                    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop'
                }
                alt="Album Art"
                className={isPlaying ? styles.playing : ''}
            />
        </div>
    );
};
