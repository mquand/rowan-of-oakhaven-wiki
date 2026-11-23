'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../../components/Icon';
import CharacterPortrait from '../../../../components/CharacterPortrait';
import styles from '../Database.module.scss';
import { lookupGift } from '../../../../lib/itemLookup';
import { DEFAULT_LOCALE } from '../../../../lib/i18n/config';
import { getDictionary } from '../../../../lib/i18n/getDictionary';
import CharacterCard from './CharacterCard';

const SHOP_IDS = ['npc_rowan', 'pet_pip', 'pet_mallow', 'npc_amalia'];

function groupOf(char) {
  if (SHOP_IDS.includes(char.id)) return 'shop';
  if ((char.location || '').includes('Oakhaven')) return 'oakhaven';
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

export default function CharactersBrowser({ characters, lang = DEFAULT_LOCALE }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [viewMode, setViewMode] = useState('roster'); // 'roster' | 'table'

  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  const groupsList = [
    { id: 'all', label: isEn ? 'All Citizens' : 'Tất cả cư dân' },
    { id: 'shop', label: isEn ? 'Oakhaven Cafe & Bakery' : 'Quán Ăn & Nhà Trọ Oakhaven' },
    { id: 'oakhaven', label: isEn ? 'Oakhaven Town' : 'Thị Trấn Oakhaven' },
    { id: 'realms', label: isEn ? 'Five Realms & Wayfarers' : '5 Vương Quốc & Lữ Khách' },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return characters.filter(char => {
      if (group === 'shop') {
        const isShop = SHOP_IDS.includes(char.id);
        if (!isShop) return false;
      } else if (group === 'oakhaven') {
        const isOakhaven =
          (char.location || '').includes('Oakhaven') && !SHOP_IDS.includes(char.id);
        if (!isOakhaven) return false;
      } else if (group === 'realms') {
        const isRealms = !(char.location || '').includes('Oakhaven');
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

  const groupedCards = useMemo(() => {
    const map = new Map();
    for (const char of filtered) {
      const key = groupOf(char);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(char);
    }
    return groupsList.filter(g => g.id !== 'all')
      .map(g => ({ ...g, items: map.get(g.id) || [] }))
      .filter(g => g.items.length > 0);
  }, [filtered, groupsList]);

  const renderCharCard = char => {
    const iconName = CHARACTER_ICONS[char.id] || 'users';
    return (
      <CharacterCard
        key={char.id}
        char={char}
        lang={lang}
        iconName={iconName}
        dict={dict}
        isEn={isEn}
      />
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
              placeholder={isEn ? 'Search citizens, species, location, favorites...' : 'Tìm cư dân, loài, vị trí, quà yêu thích...'}
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search citizens"
            />
          </div>

          <div className={styles.viewSwitch} role="group" aria-label="View mode">
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'roster' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('roster')}
              aria-pressed={viewMode === 'roster'}
            >
              <Icon name="users" size={16} /> {isEn ? 'Roster Cards' : 'Dạng Thẻ Roster'}
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

        <div className={styles.chips} role="group" aria-label="Filter group">
          {groupsList.map(g => (
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
          <p>{dict.database.browser.noResults}</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setQuery('');
              setGroup('all');
            }}
          >
            {dict.database.browser.filterAll}
          </button>
        </div>
      ) : viewMode === 'roster' ? (
        <div className={styles.groupsWrap}>
          {groupedCards.map(g => (
            <section key={g.id} className={styles.groupSection}>
              <header className={styles.groupHeader}>
                <span className={styles.groupTitle}>{g.label}</span>
                <span className={styles.groupCount}>{g.items.length} {dict.database.browser.entries}</span>
              </header>
              <div className={styles.characterGrid}>
                {g.items.map(renderCharCard)}
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
                <th>{isEn ? 'Citizen' : 'Cư dân'}</th>
                <th className={styles.metaCell}>{isEn ? 'Role' : 'Vai trò'}</th>
                <th className={styles.metaCell}>{dict.database.browser.birthday}</th>
                <th className={styles.metaCell}>{dict.database.browser.location}</th>
                <th className={styles.descCell}>{isEn ? 'Bio & Dialogue' : 'Tiểu sử & Lời thoại'}</th>
                <th>{dict.database.browser.favoriteGifts}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(char => {
                const iconName = CHARACTER_ICONS[char.id] || 'users';
                const favoriteItems = (char.favorite_items || []).map(id => lookupGift(id, lang));

                return (
                  <tr key={char.id}>
                    <td className={styles.iconCell}>
                      <div className={styles.iconWrap}>
                        <CharacterPortrait
                          id={char.id}
                          name={char.name}
                          size={32}
                          frameless
                          fallbackIcon={iconName}
                        />
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
