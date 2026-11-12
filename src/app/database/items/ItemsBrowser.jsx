'use client';

import { useMemo, useState } from 'react';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

const CATEGORY_LABELS = {
  seed: 'Hạt giống',
  ingredient: 'Nguyên liệu',
  mineral: 'Khoáng sản',
  gem: 'Tinh thể',
  monster_drop: 'Chiến lợi phẩm',
};

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'seed', label: 'Hạt giống' },
  { id: 'ingredient', label: 'Nguyên liệu' },
  { id: 'mineral', label: 'Khoáng sản' },
  { id: 'gem', label: 'Tinh thể' },
  { id: 'monster_drop', label: 'Chiến lợi phẩm' },
];

const ICONS = {
  seed: 'plant',
  ingredient: 'grains',
  mineral: 'mountains',
  gem: 'diamond',
  monster_drop: 'sparkle',
};

export default function ItemsBrowser({ items }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      const haystack = [item.name, item.description, ...(item.tags || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, category]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Icon name="magnifying-glass" size={18} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Tìm vật phẩm, nguyên liệu..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Tìm vật phẩm"
          />
        </div>
        <div className={styles.chips} role="group" aria-label="Lọc theo loại">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              type="button"
              className={`${styles.chip} ${category === c.id ? styles.chipActive : ''}`}
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy vật phẩm nào khớp với tìm kiếm.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => { setQuery(''); setCategory('all'); }}
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(item => (
            <article key={item.id} className={`${styles.itemCard} pixel-frame`}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <Icon name={ICONS[item.category] || 'package'} size={24} />
                </div>
                <span className={`badge ${item.category}`}>
                  {CATEGORY_LABELS[item.category] || item.category}
                </span>
              </div>
              <h3>{item.name}</h3>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.tags}>
                {item.tags?.map(t => (
                  <span key={t} className="badge forest">#{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
