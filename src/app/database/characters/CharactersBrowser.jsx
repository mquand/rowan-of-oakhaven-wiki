'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';
import { lookupGift } from '../../../lib/itemLookup';

const GROUPS = [
  { id: 'all', label: 'Tất cả cư dân' },
  { id: 'shop', label: 'Tiệm Bụi Sao' },
  { id: 'oakhaven', label: 'Thị Trấn Oakhaven' },
  { id: 'realms', label: '5 Vương Quốc & Lữ Khách' },
];

const SHOP_IDS = ['npc_rowan', 'pet_pip', 'pet_mallow', 'npc_amalia'];

function groupOf(char) {
  if (SHOP_IDS.includes(char.id)) return 'shop';
  if (char.location.includes('Oakhaven')) return 'oakhaven';
  return 'realms';
}

const CHARACTER_ICONS = {
  npc_rowan: 'sparkle',
  npc_amalia: 'scroll',
  pet_pip: 'leaf',
  pet_mallow: 'cake',
  npc_maeve: 'plant',
  npc_boris: 'sword',
  npc_sylvie: 'plant',
  npc_elora: 'book-open',
  npc_bram: 'acorn',
  npc_finn: 'sparkle',
  npc_garrick: 'mountains',
  npc_kael: 'sword',
  npc_lyra: 'sparkle',
  npc_thorne: 'shield',
  npc_orion: 'sparkle',
  npc_morrigan: 'tea-bag',
  npc_freya: 'sword',
  npc_jasper: 'package',
  npc_selene: 'sparkle',
  npc_zephyr: 'leaf',
  npc_brutus: 'acorn',
  npc_vanya: 'diamond',
};

export default function CharactersBrowser({ characters }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [viewMode, setViewMode] = useState('roster'); // 'roster' | 'table'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return characters.filter(char => {
      if (group === 'shop') {
        const isShop = ['npc_rowan', 'pet_pip', 'pet_mallow', 'npc_amalia'].includes(char.id);
        if (!isShop) return false;
      } else if (group === 'oakhaven') {
        const isOakhaven =
          char.location.includes('Oakhaven') &&
          !['npc_rowan', 'pet_pip', 'pet_mallow', 'npc_amalia'].includes(char.id);
        if (!isOakhaven) return false;
      } else if (group === 'realms') {
        const isRealms = !char.location.includes('Oakhaven');
        if (!isRealms) return false;
      }

      if (!q) return true;
      const haystack = [
        char.name,
        char.role,
        char.species,
        char.location,
        char.description,
        char.quote,
        ...(char.favorite_items || []),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [characters, query, group]);

  const groups = useMemo(() => {
    const map = new Map();
    for (const char of filtered) {
      const key = groupOf(char);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(char);
    }
    return GROUPS.filter(g => g.id !== 'all')
      .map(g => ({ ...g, items: map.get(g.id) || [] }))
      .filter(g => g.items.length > 0);
  }, [filtered]);

  const renderCharCard = char => {
    const iconName = CHARACTER_ICONS[char.id] || 'users';
    const favoriteItems = (char.favorite_items || []).map(lookupGift);

    return (
      <article key={char.id} className={`${styles.characterCard} pixel-frame`}>
        <div className={styles.cardTop}>
          <div className={styles.avatarSlot}>
            <Icon name={iconName} size={30} />
          </div>
          <div className={styles.cardIdentity}>
            <h2 className={styles.charName}>{char.name}</h2>
            <div className={styles.charRole}>{char.role}</div>
            <div className={styles.charMetaRow}>
              <span className="badge forest">{char.species}</span>
              <span className={styles.locationTag}>
                <Icon name="map-pin" size={12} /> {char.location}
              </span>
              {char.birthday && (
                <span className={styles.locationTag} style={{ color: '#ffcf40' }}>
                  <Icon name="calendar" size={12} /> {char.birthday}
                </span>
              )}
            </div>
          </div>
        </div>

        {char.quote && (
          <div className={styles.quoteBubble}>
            {char.quote}
          </div>
        )}

        {char.schedule && (
          <div className={styles.scheduleRow}>
            <Icon name="clock" size={13} />
            <span>{char.schedule}</span>
          </div>
        )}

        <p className={styles.charBio}>{char.description}</p>

        <div className={styles.giftsSection}>
          <div className={styles.giftsLabel}>
            <Icon name="heart" size={13} />
            <span>Món Quà Ưa Thích</span>
          </div>
          <div className={styles.giftsList}>
            {favoriteItems.length > 0 ? (
              favoriteItems.map((gift, idx) => (
                <Link
                  key={`${char.id}-gift-${idx}`}
                  href={gift.href}
                  className={styles.giftBadgeLink}
                >
                  <Icon name={gift.icon} size={13} />
                  <span>{gift.name}</span>
                </Link>
              ))
            ) : (
              <span style={{ fontSize: '12px', color: '#8d92aa' }}>Đang tìm hiểu...</span>
            )}
          </div>
        </div>
      </article>
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
              placeholder="Tìm cư dân, loài, vị trí, quà yêu thích..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Tìm cư dân"
            />
          </div>

          <div className={styles.viewSwitch} role="group" aria-label="Chế độ hiển thị">
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'roster' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('roster')}
              aria-pressed={viewMode === 'roster'}
            >
              <Icon name="users" size={16} /> Dạng Thẻ Roster
            </button>
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'table' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('table')}
              aria-pressed={viewMode === 'table'}
            >
              <Icon name="book-open" size={16} /> Dạng Sổ Kế
            </button>
          </div>
        </div>

        <div className={styles.chips} role="group" aria-label="Lọc theo nhóm cư dân">
          {GROUPS.map(g => (
            <button
              key={g.id}
              type="button"
              className={`${styles.chip} ${group === g.id ? styles.chipActive : ''}`}
              onClick={() => setGroup(g.id)}
              aria-pressed={group === g.id}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy cư dân nào khớp với tìm kiếm.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setQuery('');
              setGroup('all');
            }}
          >
            Xóa tìm kiếm
          </button>
        </div>
      ) : viewMode === 'roster' ? (
        /* ==================== ROSTER CARDS VIEW (GROUPED) ==================== */
        <div className={styles.groupsWrap}>
          {groups.map(g => (
            <section key={g.id} className={styles.groupSection}>
              <header className={styles.groupHeader}>
                <span className={styles.groupTitle}>{g.label}</span>
                <span className={styles.groupCount}>{g.items.length} cư dân</span>
              </header>
              <div className={styles.characterGrid}>
                {g.items.map(renderCharCard)}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* ==================== SỔ KẾ TABLE VIEW ==================== */
        <div className={`${styles.tableWrapper} pixel-frame`}>
          <table className={styles.wikiTable}>
            <thead>
              <tr>
                <th className={styles.iconCell}>Huy hiệu</th>
                <th>Cư dân</th>
                <th className={styles.metaCell}>Vai trò</th>
                <th className={styles.metaCell}>Sinh nhật</th>
                <th className={styles.metaCell}>Vị trí</th>
                <th className={styles.descCell}>Tiểu sử & Lời thoại</th>
                <th>Món quà ưa thích</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(char => {
                const iconName = CHARACTER_ICONS[char.id] || 'users';
                const favoriteItems = (char.favorite_items || []).map(lookupGift);

                return (
                  <tr key={char.id}>
                    <td className={styles.iconCell}>
                      <div className={styles.iconWrap}>
                        <Icon name={iconName} size={20} />
                      </div>
                    </td>
                    <td className={styles.nameCell}>
                      <strong>{char.name}</strong>
                    </td>
                    <td className={styles.metaCell}>{char.role}</td>
                    <td className={styles.metaCell}>
                      <span className="badge forest" style={{ fontSize: '11px' }}>{char.birthday || '—'}</span>
                    </td>
                    <td className={styles.metaCell}>
                      <span className={styles.locationTag}>
                        <Icon name="map-pin" size={12} /> {char.location}
                      </span>
                    </td>
                    <td className={styles.descCell}>
                      <p>{char.description}</p>
                      {char.quote && (
                        <em style={{ display: 'block', marginTop: '6px', color: '#ffcf40', fontSize: '12px' }}>
                          &ldquo;{char.quote}&rdquo;
                        </em>
                      )}
                    </td>
                    <td>
                      <div className={styles.ingredientChips}>
                        {favoriteItems.map((gift, idx) => (
                          <Link
                            key={`${char.id}-tbl-gift-${idx}`}
                            href={gift.href}
                            className={styles.giftBadgeLink}
                          >
                            <Icon name={gift.icon} size={12} />
                            <span>{gift.name}</span>
                          </Link>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
