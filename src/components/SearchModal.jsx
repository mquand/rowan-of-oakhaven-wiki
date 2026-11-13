'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import { DEFAULT_LOCALE } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/getDictionary';
import styles from './SearchModal.module.scss';

export default function SearchModal({ isOpen, onClose, lang = DEFAULT_LOCALE }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loadedLang, setLoadedLang] = useState(null);
  const [loading, setLoading] = useState(false);

  const dict = getDictionary(lang);

  const filters = [
    { id: 'all', label: dict.database.browser.filterAll },
    { id: 'doc', label: dict.search.docLabel },
    { id: 'item', label: dict.search.itemLabel },
    { id: 'recipe', label: dict.search.recipeLabel },
    { id: 'character', label: dict.search.characterLabel },
    { id: 'crop', label: dict.search.cropLabel },
    { id: 'monster', label: dict.search.monsterLabel },
    { id: 'weapon', label: dict.search.weaponLabel },
  ];

  // Tải dữ liệu tìm kiếm theo lang
  useEffect(() => {
    let active = true;
    if (isOpen && (items.length === 0 || loadedLang !== lang)) {
      setLoading(true);
      fetch(`/api/search?lang=${lang}`)
        .then(res => res.json())
        .then(data => {
          if (active) {
            setItems(data);
            setLoadedLang(lang);
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
  }, [isOpen, items.length, loadedLang, lang]);

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
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={dict.search.modalTitle}>
      <div className={`${styles.modal} pixel-frame`} onClick={e => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <Icon name="magnifying-glass" size={20} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="search"
            className={styles.searchInput}
            placeholder={dict.search.inputPlaceholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={dict.search.escToClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className={styles.filterRow}>
          {filters.map(f => (
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
            <div className={styles.statusBox}>{dict.search.searching}</div>
          ) : filtered.length === 0 ? (
            <div className={styles.statusBox}>
              <p>{dict.search.noResults} &ldquo;{query}&rdquo;.</p>
              <span className={styles.hintText}>{dict.database.browser.noResults}</span>
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
            <span><kbd>↑</kbd><kbd>↓</kbd> {dict.search.navHint}</span>
            <span><kbd>↵</kbd> {dict.search.selectHint}</span>
            <span><kbd>Esc</kbd> {dict.search.escToClose}</span>
          </div>
          <span className={styles.itemCount}>
            {filtered.length} {dict.database.browser.entries}
          </span>
        </div>
      </div>
    </div>
  );
}
