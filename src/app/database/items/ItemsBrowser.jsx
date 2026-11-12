'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

const CATEGORY_LABELS = {
  seed: 'Hạt giống',
  ingredient: 'Nguyên liệu',
  mineral: 'Khoáng sản',
  gem: 'Tinh thể',
  monster_drop: 'Nguyên liệu quái',
};

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'seed', label: 'Hạt giống' },
  { id: 'ingredient', label: 'Nguyên liệu' },
  { id: 'mineral', label: 'Khoáng sản' },
  { id: 'gem', label: 'Tinh thể' },
  { id: 'monster_drop', label: 'Nguyên liệu quái' },
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
  const [viewMode, setViewMode] = useState('inventory'); // 'inventory' | 'table'

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
        <div className={styles.viewControls}>
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

          <div className={styles.viewSwitch} role="group" aria-label="Chế độ hiển thị">
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'inventory' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('inventory')}
              aria-pressed={viewMode === 'inventory'}
            >
              <Icon name="package" size={16} /> Túi Đồ RPG
            </button>
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'table' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('table')}
              aria-pressed={viewMode === 'table'}
            >
              <Icon name="book-open" size={16} /> Bảng Sổ Kế
            </button>
          </div>
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
      ) : viewMode === 'inventory' ? (
        /* ==================== INVENTORY SLOT GRID ==================== */
        <div className={styles.inventoryGrid}>
          {filtered.map(item => {
            const iconName = ICONS[item.category] || 'package';
            const catLabel = CATEGORY_LABELS[item.category] || item.category;

            return (
              <Link
                key={item.id}
                href={`/database/items/${item.id}`}
                className={`${styles.itemCard} pixel-frame`}
              >
                <div className={styles.itemCardHeader}>
                  <div className={styles.itemSlot}>
                    <Icon name={iconName} size={24} />
                  </div>
                  <div className={styles.itemNameGroup}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemCategory}>{catLabel}</div>
                  </div>
                </div>

                <p className={styles.itemDesc}>{item.description}</p>

                {item.tags && item.tags.length > 0 && (
                  <div className={styles.itemTagsRow}>
                    {item.tags.map(t => (
                      <span key={t} className="badge forest" style={{ fontSize: '11px' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        /* ==================== WIKI TABLE VIEW ==================== */
        <div className={`${styles.tableWrapper} pixel-frame`}>
          <table className={styles.wikiTable}>
            <thead>
              <tr>
                <th className={styles.iconCell}>Icon</th>
                <th>Tên vật phẩm</th>
                <th className={styles.descCell}>Mô tả</th>
                <th className={styles.tagsCell}>Thể loại</th>
                <th className={styles.badgeCell}>Tags</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td className={styles.iconCell}>
                    <div className={styles.iconWrap}>
                      <Icon name={ICONS[item.category] || 'package'} size={20} />
                    </div>
                  </td>
                  <td className={styles.nameCell}>
                    <Link href={`/database/items/${item.id}`}>{item.name}</Link>
                  </td>
                  <td className={styles.descCell}>{item.description}</td>
                  <td className={styles.stationCell}>
                    <span className={`badge ${item.category}`}>
                      {CATEGORY_LABELS[item.category] || item.category}
                    </span>
                  </td>
                  <td className={styles.tagsCell}>
                    {item.tags?.map(t => (
                      <span key={t} className="badge forest">
                        #{t}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
