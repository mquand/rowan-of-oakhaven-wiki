'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../../components/Icon';
import styles from '../Database.module.scss';
import { CATEGORY_ICONS, getCategoryLabel, getRarityLabel } from '../../../../lib/constants';
import { DEFAULT_LOCALE } from '../../../../lib/i18n/config';
import { getDictionary } from '../../../../lib/i18n/getDictionary';

const CATEGORY_KEYS = [
  'tea',
  'bakery',
  'meal',
  'seed',
  'ingredient',
  'mineral',
  'gem',
  'monster_drop',
];

export default function ItemsBrowser({ items, lang = DEFAULT_LOCALE }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState('inventory'); // 'inventory' | 'table'

  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  const categoryOptions = [
    { id: 'all', label: dict.database.browser.filterAll },
    ...CATEGORY_KEYS.map(k => ({
      id: k,
      label: getCategoryLabel(k, lang),
    })),
  ];

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

  const groups = useMemo(() => {
    const map = new Map();
    for (const item of filtered) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category).push(item);
    }
    return categoryOptions
      .filter(c => c.id !== 'all')
      .map(c => ({ id: c.id, label: c.label, items: map.get(c.id) || [] }))
      .filter(g => g.items.length > 0);
  }, [filtered, categoryOptions]);

  const renderItemCard = item => {
    const iconName = CATEGORY_ICONS[item.category] || 'package';
    const catLabel = getCategoryLabel(item.category, lang);
    const rarityText = getRarityLabel(item.rarity, lang);

    return (
      <Link
        key={item.id}
        href={`/${lang}/database/items/${item.id}`}
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

        <div className={styles.itemTagsRow}>
          {item.sell_price != null && (
            <span className="badge" style={{ fontSize: '11px', color: '#ffcf40', borderColor: 'rgba(255, 207, 64, 0.4)' }}>
              {item.sell_price} {isEn ? 'Gold' : 'Vàng'}
            </span>
          )}
          {item.energy != null && (
            <span className="badge forest" style={{ fontSize: '11px' }}>
              +{item.energy} HP
            </span>
          )}
          {item.rarity && (
            <span
              className={`badge ${item.rarity === 'rare' ? 'gem' : item.rarity === 'mythic' ? 'monster_drop' : 'forest'}`}
              style={{ fontSize: '11px' }}
            >
              {rarityText}
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.viewControls}>
          <div className={styles.searchWrap}>
            <Icon name="magnifying-glass" size={18} className={styles.searchIcon} />
            <input
              type="search"
              className={styles.searchInput}
              placeholder={dict.database.browser.searchPlaceholder}
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search items"
            />
          </div>

          <div className={styles.viewSwitch} role="group" aria-label="View mode">
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'inventory' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('inventory')}
              aria-pressed={viewMode === 'inventory'}
            >
              <Icon name="package" size={16} /> {dict.database.browser.viewInventory}
            </button>
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'table' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('table')}
              aria-pressed={viewMode === 'table'}
            >
              <Icon name="book-open" size={16} /> {dict.database.browser.viewTable}
            </button>
          </div>
        </div>

        <div className={styles.chips} role="group" aria-label="Filter category">
          {categoryOptions.map(c => (
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
          <p>{dict.database.browser.noResults}</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => { setQuery(''); setCategory('all'); }}
          >
            {dict.database.browser.filterAll}
          </button>
        </div>
      ) : viewMode === 'inventory' ? (
        <div className={styles.groupsWrap}>
          {groups.map(group => (
            <section key={group.id} className={styles.groupSection}>
              <header className={styles.groupHeader}>
                <span className={styles.groupTitle}>{group.label}</span>
                <span className={styles.groupCount}>{group.items.length} {dict.database.browser.entries}</span>
              </header>
              <div className={styles.inventoryGrid}>
                {group.items.map(renderItemCard)}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className={`${styles.tableWrapper} pixel-frame`}>
          <table className={styles.wikiTable}>
            <thead>
              <tr>
                <th className={styles.iconCell}>Icon</th>
                <th>{isEn ? 'Item Name' : 'Tên vật phẩm'}</th>
                <th className={styles.descCell}>{isEn ? 'Description' : 'Mô tả'}</th>
                <th className={styles.stationCell}>{isEn ? 'Category' : 'Thể loại'}</th>
                <th className={styles.badgeCell}>{dict.database.itemDetail.rarity}</th>
                <th className={styles.qtyCell}>{dict.database.browser.sellPrice}</th>
                <th className={styles.effectCell}>{dict.database.browser.energyBuff}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td className={styles.iconCell}>
                    <div className={styles.iconWrap}>
                      <Icon name={CATEGORY_ICONS[item.category] || 'package'} size={20} />
                    </div>
                  </td>
                  <td className={styles.nameCell}>
                    <Link href={`/${lang}/database/items/${item.id}`}>{item.name}</Link>
                  </td>
                  <td className={styles.descCell}>{item.description}</td>
                  <td className={styles.stationCell}>
                    <span className={`badge ${item.category}`}>
                      {getCategoryLabel(item.category, lang)}
                    </span>
                  </td>
                  <td className={styles.badgeCell}>
                    <span className={`badge ${item.rarity === 'rare' ? 'gem' : item.rarity === 'mythic' ? 'monster_drop' : 'forest'}`}>
                      {getRarityLabel(item.rarity, lang)}
                    </span>
                  </td>
                  <td className={styles.qtyCell}>
                    {item.sell_price != null ? `${item.sell_price} ${isEn ? 'Gold' : 'Vàng'}` : '—'}
                  </td>
                  <td className={styles.effectCell}>
                    {item.energy != null && <span>+{item.energy} HP </span>}
                    {item.buff && <span style={{ color: '#8d92aa', fontSize: '12px' }}>({item.buff})</span>}
                    {!item.energy && !item.buff && '—'}
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
