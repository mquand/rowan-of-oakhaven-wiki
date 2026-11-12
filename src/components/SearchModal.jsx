'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import styles from './SearchModal.module.scss';

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'doc', label: 'Tài liệu' },
  { id: 'item', label: 'Vật phẩm' },
  { id: 'recipe', label: 'Công thức' },
  { id: 'character', label: 'Cư dân' },
  { id: 'crop', label: 'Cây trồng' },
  { id: 'monster', label: 'Quái vật' },
  { id: 'weapon', label: 'Vũ khí' },
];

export default function SearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tải dữ liệu tìm kiếm
  useEffect(() => {
    let active = true;
    if (isOpen && items.length === 0) {
      setLoading(true);
      fetch('/api/search')
        .then(res => res.json())
        .then(data => {
          if (active) {
            setItems(data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error('Failed to load search data:', err);
          if (active) setLoading(false);
        });
    }
    return () => {
      active = false;
    };
  }, [isOpen, items.length]);

  // Focus input khi mở
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Lọc kết quả
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(item => {
      if (filter !== 'all' && item.type !== filter) return false;
      if (!q) return true;
      return (item.keywords || '').includes(q) || item.title.toLowerCase().includes(q);
    }).slice(0, 30);
  }, [items, query, filter]);

  // Reset index khi danh sách thay đổi
  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered.length, query, filter]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1 < filtered.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        if (filtered[selectedIndex]) {
          e.preventDefault();
          onClose();
          router.push(filtered[selectedIndex].href);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, router]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Tìm kiếm bách khoa">
      <div className={`${styles.modal} pixel-frame`} onClick={e => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <Icon name="magnifying-glass" size={20} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="search"
            className={styles.searchInput}
            placeholder="Tìm tài liệu, vật phẩm, công thức, cư dân, quái vật..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Đóng tìm kiếm">
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className={styles.filterRow}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              type="button"
              className={`${styles.filterChip} ${filter === f.id ? styles.activeChip : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.resultList} ref={listRef}>
          {loading ? (
            <div className={styles.statusBox}>Đang tải dữ liệu bách khoa...</div>
          ) : filtered.length === 0 ? (
            <div className={styles.statusBox}>
              <p>Không tìm thấy mục nào khớp với &ldquo;{query}&rdquo;.</p>
              <span className={styles.hintText}>Thử tìm kiếm từ khóa khác hoặc xóa bộ lọc.</span>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`${styles.resultItem} ${isSelected ? styles.selected : ''}`}
                  onClick={() => {
                    onClose();
                    router.push(item.href);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className={styles.itemIcon}>
                    <Icon name={item.icon} size={18} />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.titleRow}>
                      <span className={styles.itemTitle}>{item.title}</span>
                      <span className={`badge ${styles.typeBadge} ${item.type}`}>
                        {item.typeLabel}
                      </span>
                    </div>
                    {item.description && (
                      <p className={styles.itemDesc}>{item.description}</p>
                    )}
                  </div>
                  <Icon name="caret-right" size={14} className={styles.itemArrow} />
                </div>
              );
            })
          )}
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.shortcutHints}>
            <span><kbd>↑</kbd><kbd>↓</kbd> để di chuyển</span>
            <span><kbd>↵</kbd> để chọn</span>
            <span><kbd>Esc</kbd> để đóng</span>
          </div>
          <span className={styles.itemCount}>
            {filtered.length} kết quả
          </span>
        </div>
      </div>
    </div>
  );
}
