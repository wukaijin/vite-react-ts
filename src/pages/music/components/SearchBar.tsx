import React from 'react';
import { Search } from '@icon-park/react';
import styles from '../index.module.scss';

interface SearchBarProps {
    keyword: string;
    onKeywordChange: (value: string) => void;
    onSearch: () => void;
}

/**
 * 搜索栏组件
 */
export const SearchBar: React.FC<SearchBarProps> = ({ keyword, onKeywordChange, onSearch }) => {
    return (
        <div className={styles.searchSection}>
            <input
                className={styles.searchInput}
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                placeholder="Search for songs, artists..."
            />
            <button className={styles.searchButton} onClick={onSearch}>
                <Search size={20} />
            </button>
        </div>
    );
};
