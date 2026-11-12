'use client';

import { useMemo, useState } from 'react';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

const REALM_LABELS = {
  oakhaven: 'Oakhaven',
  solaria: 'Solaria',
  'sylva-fae': 'Sylva-Fae',
  'khaz-drakor': 'Khaz-Drakor',
  aethelgard: 'Aethelgard',
};

const SEASON_LABELS = {
  spring: 'Xuân',
  summer: 'Hạ',
  autumn: 'Thu',
  winter: 'Đông',
};

const BRANCH_LABELS = {
  exploration: 'Khám Phá',
  farming: 'Nông Trại',
  tea: 'Trà Bánh',
};

const WEAPON_TYPE_LABELS = {
  melee: 'Cận Chiến',
  ranged: 'Tầm Xa',
  heavy: 'Hạng Nặng',
};

const LOCATION_TYPE_LABELS = {
  starting_town: 'Thị Trấn Khởi Đầu',
  realm: 'Vương Quốc',
};

const ITEM_NAMES = {
  la_tra_sen: 'Lá Trà Sen',
  dau_rung: 'Dâu Rừng',
  item_flour: 'Bột Mì Tươi',
  oai_huong: 'Oải Hương',
};

const CONFIG = {
  monsters: {
    icon: 'sparkle',
    badge: e => REALM_LABELS[e.realm] || e.realm,
    search: e => [e.name, e.name_en, e.description, e.weakness, e.loot, ...(e.tags || [])],
    facet: {
      field: 'realm',
      labels: REALM_LABELS,
      order: ['oakhaven', 'solaria', 'sylva-fae', 'khaz-drakor', 'aethelgard'],
    },
    details: e => [
      { label: 'Điểm yếu', value: e.weakness },
      { label: 'Loot khi hạ', value: e.loot },
    ],
  },
  crops: {
    icon: 'farm',
    badge: e => (e.seasons || []).map(s => SEASON_LABELS[s] || s).join(' · '),
    search: e => [e.name, e.description, ...(e.tags || [])],
    facet: {
      field: 'seasons',
      labels: SEASON_LABELS,
      order: ['spring', 'summer', 'autumn', 'winter'],
      multi: true,
    },
    details: e => [
      { label: 'Sinh trưởng', value: `${e.growth_days} ngày` },
      { label: 'Tái sinh', value: e.regrow_days > 0 ? `mỗi ${e.regrow_days} ngày` : 'một lần' },
      { label: 'Thu hoạch', value: e.harvest_item_id ? ITEM_NAMES[e.harvest_item_id] || e.harvest_item_id : null },
      { label: 'Ghi chú', value: e.harvest_note || null },
    ],
  },
  weapons: {
    icon: 'sword',
    badge: e => WEAPON_TYPE_LABELS[e.weapon_type] || e.weapon_type,
    search: e => [e.name, e.name_en, e.description, e.upgrade_path, ...(e.tags || [])],
    facet: {
      field: 'weapon_type',
      labels: WEAPON_TYPE_LABELS,
      order: ['melee', 'ranged', 'heavy'],
    },
    details: e => [{ label: 'Nâng cấp', value: e.upgrade_path }],
  },
  perks: {
    icon: 'book-open',
    badge: e => BRANCH_LABELS[e.branch] || e.branch,
    search: e => [e.name, e.description, e.unlock_hint, ...(e.tags || [])],
    facet: {
      field: 'branch',
      labels: BRANCH_LABELS,
      order: ['exploration', 'farming', 'tea'],
    },
    details: e => [{ label: 'Cách mở khóa', value: e.unlock_hint }],
  },
  locations: {
    icon: 'map-pin',
    badge: e => LOCATION_TYPE_LABELS[e.location_type] || e.location_type,
    search: e => [e.name, e.name_en, e.description, e.unlock_condition, ...(e.features || []), ...(e.tags || [])],
    facet: {
      field: 'location_type',
      labels: LOCATION_TYPE_LABELS,
      order: ['starting_town', 'realm'],
    },
    details: e => [
      { label: 'Mở khóa', value: e.unlock_condition },
      { label: 'Điểm nổi bật', value: (e.features || []).join(', ') },
    ],
  },
};

export default function EntryBrowser({ category, entries }) {
  const config = CONFIG[category];
  const [query, setQuery] = useState('');
  const [facet, setFacet] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(entry => {
      if (config.facet && facet !== 'all') {
        const value = entry[config.facet.field];
        const match = Array.isArray(value) ? value.includes(facet) : value === facet;
        if (!match) return false;
      }
      if (!q) return true;
      return config.search(entry).join(' ').toLowerCase().includes(q);
    });
  }, [entries, query, facet, config]);

  if (!config) return null;

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Icon name="magnifying-glass" size={18} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Tìm kiếm..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Tìm kiếm"
          />
        </div>
        {config.facet && (
          <div className={styles.chips} role="group" aria-label="Lọc theo nhóm">
            <button
              type="button"
              className={`${styles.chip} ${facet === 'all' ? styles.chipActive : ''}`}
              onClick={() => setFacet('all')}
              aria-pressed={facet === 'all'}
            >
              Tất cả
            </button>
            {config.facet.order.map(id => (
              <button
                key={id}
                type="button"
                className={`${styles.chip} ${facet === id ? styles.chipActive : ''}`}
                onClick={() => setFacet(id)}
                aria-pressed={facet === id}
              >
                {config.facet.labels[id] || id}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy kết quả nào khớp với tìm kiếm.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => { setQuery(''); setFacet('all'); }}
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(entry => (
            <article key={entry.id} className={`${styles.itemCard} pixel-frame`}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <Icon name={config.icon} size={24} />
                </div>
                <span className="badge">{config.badge(entry)}</span>
              </div>
              <h3>{entry.name}</h3>
              {entry.name_en && <div className={styles.entrySub}>{entry.name_en}</div>}
              <p className={styles.desc}>{entry.description}</p>
              <div className={styles.details}>
                {config.details(entry).filter(d => d.value).map(d => (
                  <div key={d.label} className={styles.detailRow}>
                    <span className={styles.detailLabel}>{d.label}:</span>
                    <span>{d.value}</span>
                  </div>
                ))}
              </div>
              {entry.tags?.length > 0 && (
                <div className={styles.tags}>
                  {entry.tags.map(t => (
                    <span key={t} className="badge forest">#{t}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
