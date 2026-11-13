'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../../components/Icon';
import styles from '../Database.module.scss';
import { lookupGift } from '../../../../lib/itemLookup';
import {
  getRealmLabel,
  getSeasonLabel,
  getBranchLabel,
  getWeaponTypeLabel,
  getLocationTypeLabel,
  getTagTranslation,
} from '../../../../lib/constants';

const MONSTER_ICONS = {
  furnace_cog_automaton: 'flame',
  magma_magnesnail: 'flame',
  steam_mole_driller: 'mountains',
  gloom_root_strangler: 'plant',
  nectar_phantasm_moth: 'leaf',
  bramble_puck: 'acorn',
  astral_hollow_knight: 'shield',
  grimoire_mimic: 'book-open',
  mirror_glass_raven: 'diamond',
  solar_gryphon: 'sparkle',
  aurora_stag: 'sparkle',
  poltergeist_kettle: 'cooking-pot',
  dark_crystal_scarab: 'diamond',
};

const WEAPON_ICONS = {
  starlight_blade: 'sword',
  mystic_scythe: 'plant',
  spirit_lantern: 'sparkle',
  whisk_hammer: 'cooking-pot',
};

const PERK_ICONS = {
  exploration: 'mountains',
  farming: 'farm',
  tea: 'tea-bag',
};

const LOCATION_ICONS = {
  oakhaven: 'farm',
  solaria: 'sparkle',
  sylva_fae: 'plant',
  khaz_drakor: 'mountains',
  aethelgard: 'sparkle',
};

export default function EntryBrowser({ category, entries, lang = 'vi' }) {
  const isEn = lang === 'en';
  const [query, setQuery] = useState('');
  const [facet, setFacet] = useState('all');

  const config = useMemo(() => {
    const map = {
      monsters: {
        icon: e => MONSTER_ICONS[e.id] || 'sparkle',
        badge: e => getRealmLabel(e.realm, lang),
        search: e => [e.name, e.name_en, e.description, e.weakness, ...(e.tags || [])],
        facet: {
          field: 'realm',
          getLabel: id => getRealmLabel(id, lang),
          order: ['oakhaven', 'solaria', 'sylva-fae', 'khaz-drakor', 'aethelgard'],
        },
        renderDetails: e => (
          <>
            {e.hp != null && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{isEn ? 'Vital Stats:' : 'Chỉ số sinh lực:'}</span>
                <span style={{ color: '#ffcf40', fontWeight: 700 }}>
                  HP: {e.hp} · {isEn ? 'Attack' : 'Sát thương'}: {e.atk} {e.danger_level ? `(${isEn ? 'Danger' : 'Độ khó'}: ${'★'.repeat(e.danger_level)})` : ''}
                </span>
              </div>
            )}
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{isEn ? 'Weakness:' : 'Điểm yếu:'}</span>
              <span>{e.weakness}</span>
            </div>
            <div className={styles.detailRow} style={{ alignItems: 'flex-start' }}>
              <span className={styles.detailLabel}>{isEn ? 'Loot Drops:' : 'Vật phẩm rơi:'}</span>
              <div className={styles.ingredientChips}>
                {e.loot_items && e.loot_items.length > 0 ? (
                  e.loot_items.map((loot, idx) => (
                    <Link
                      key={idx}
                      href={`/${lang}/database/items/${loot.id}`}
                      className={styles.ingredientLink}
                    >
                      <span>{loot.name}</span>
                      <span className={styles.ingredientQty}>{loot.chance}</span>
                    </Link>
                  ))
                ) : (
                  <span>{e.loot || (isEn ? 'Unknown' : 'Không rõ')}</span>
                )}
              </div>
            </div>
          </>
        ),
      },

      crops: {
        icon: e => (e.tags?.includes('grain') ? 'grains' : e.tags?.includes('tea') ? 'leaf' : 'plant'),
        badge: e => (e.seasons || []).map(s => getSeasonLabel(s, lang)).join(' · '),
        search: e => [e.name, e.description, ...(e.tags || [])],
        facet: {
          field: 'seasons',
          getLabel: id => getSeasonLabel(id, lang),
          order: ['spring', 'summer', 'autumn', 'winter'],
          multi: true,
        },
        renderDetails: e => {
          const seedGift = e.seed_item_id ? lookupGift(e.seed_item_id, lang) : null;
          const harvestGift = e.harvest_item_id ? lookupGift(e.harvest_item_id, lang) : null;

          return (
            <>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{isEn ? 'Growth Cycle:' : 'Chu kỳ sinh trưởng:'}</span>
                <span>
                  {e.growth_days} {isEn ? 'days' : 'ngày'}
                  {e.regrow_days > 0
                    ? (isEn ? ` (Regrows every ${e.regrow_days} days)` : ` (Tái sinh mỗi ${e.regrow_days} ngày)`)
                    : (isEn ? ' (Single harvest)' : ' (Thu hoạch một lần)')}
                </span>
              </div>
              {seedGift && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>{isEn ? 'Seed Planted:' : 'Hạt giống gieo:'}</span>
                  <Link href={seedGift.href} className={styles.ingredientLink}>
                    <Icon name={seedGift.icon} size={13} />
                    <span>{seedGift.name}</span>
                    {e.seed_price != null && (
                      <span className={styles.ingredientQty}>{e.seed_price} {isEn ? 'Gold' : 'Vàng'}</span>
                    )}
                  </Link>
                </div>
              )}
              {harvestGift && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>{isEn ? 'Harvest Yield:' : 'Sản phẩm thu hoạch:'}</span>
                  <Link href={harvestGift.href} className={styles.ingredientLink}>
                    <Icon name={harvestGift.icon} size={13} />
                    <span>{harvestGift.name}</span>
                    {e.sell_price != null && (
                      <span className={styles.ingredientQty}>{e.sell_price} {isEn ? 'Gold' : 'Vàng'}</span>
                    )}
                  </Link>
                </div>
              )}
              {e.profit_per_day && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>{isEn ? 'Economic Yield:' : 'Hiệu suất kinh tế:'}</span>
                  <span style={{ color: '#74c99e', fontWeight: 600 }}>{e.profit_per_day}</span>
                </div>
              )}
              {e.harvest_note && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>{isEn ? 'Notes:' : 'Ghi chú:'}</span>
                  <span style={{ color: '#8d92aa' }}>{e.harvest_note}</span>
                </div>
              )}
            </>
          );
        },
      },

      weapons: {
        icon: e => WEAPON_ICONS[e.id] || 'sword',
        badge: e => getWeaponTypeLabel(e.weapon_type, lang),
        search: e => [e.name, e.name_en, e.description, e.upgrade_path, ...(e.tags || [])],
        facet: {
          field: 'weapon_type',
          getLabel: id => getWeaponTypeLabel(id, lang),
          order: ['melee', 'ranged', 'heavy'],
        },
        renderDetails: e => (
          <>
            {e.base_atk != null && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{isEn ? 'Damage & Speed:' : 'Sát thương & Tốc độ:'}</span>
                <span style={{ color: '#ffcf40', fontWeight: 700 }}>
                  ATK: {e.base_atk} · {e.attack_speed}
                </span>
              </div>
            )}
            {e.reach && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{isEn ? 'Weapon Reach:' : 'Tầm quét vũ khí:'}</span>
                <span>{e.reach}</span>
              </div>
            )}
            {e.special_effect && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{isEn ? 'Special Effect:' : 'Hiệu ứng đặc biệt:'}</span>
                <span style={{ color: '#7ad0ff' }}>{e.special_effect}</span>
              </div>
            )}
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{isEn ? 'Forge Upgrade:' : 'Nâng cấp lò rèn:'}</span>
              <span>{e.materials_needed || e.upgrade_path}</span>
            </div>
          </>
        ),
      },

      perks: {
        icon: e => PERK_ICONS[e.branch] || 'book-open',
        badge: e => `${getBranchLabel(e.branch, lang)} · ${e.tier || (isEn ? 'Tier I' : 'Bậc I')}`,
        search: e => [e.name, e.description, e.unlock_hint, ...(e.tags || [])],
        facet: {
          field: 'branch',
          getLabel: id => getBranchLabel(id, lang),
          order: ['exploration', 'farming', 'tea'],
        },
        renderDetails: e => (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>{isEn ? 'Unlock Method:' : 'Cách mở khóa:'}</span>
            <span style={{ color: '#ffcf40' }}>{e.unlock_hint}</span>
          </div>
        ),
      },

      locations: {
        icon: e => LOCATION_ICONS[e.id] || 'map-pin',
        badge: e => getLocationTypeLabel(e.location_type, lang),
        search: e => [e.name, e.name_en, e.description, e.unlock_condition, ...(e.features || []), ...(e.tags || [])],
        facet: {
          field: 'location_type',
          getLabel: id => getLocationTypeLabel(id, lang),
          order: ['starting_town', 'realm'],
        },
        renderDetails: e => (
          <>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{isEn ? 'Unlock Requirement:' : 'Điều kiện mở:'}</span>
              <span style={{ color: '#ffcf40' }}>{e.unlock_condition}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{isEn ? 'Key Highlights:' : 'Điểm nổi bật:'}</span>
              <span>{(e.features || []).join(' · ')}</span>
            </div>
            {e.npcs && e.npcs.length > 0 && (
              <div className={styles.detailRow} style={{ alignItems: 'flex-start' }}>
                <span className={styles.detailLabel}>{isEn ? 'Residents Met:' : 'Cư dân gặp gỡ:'}</span>
                <div className={styles.ingredientChips}>
                  {e.npcs.slice(0, 6).map(npc => (
                    <Link
                      key={npc.id}
                      href={`/${lang}/database/characters`}
                      className={styles.ingredientLink}
                    >
                      <Icon name="users" size={12} />
                      <span>{npc.name}</span>
                    </Link>
                  ))}
                  {e.npcs.length > 6 && (
                    <span style={{ fontSize: '11px', color: '#8d92aa', alignSelf: 'center' }}>
                      +{e.npcs.length - 6} {isEn ? 'more' : 'người'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        ),
      },
    };

    return map[category];
  }, [category, lang, isEn]);

  const filtered = useMemo(() => {
    if (!config) return [];
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
            placeholder={isEn ? 'Search by name, properties, region...' : 'Tìm kiếm theo tên, đặc tính, khu vực...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label={isEn ? 'Search' : 'Tìm kiếm'}
          />
        </div>
        {config.facet && (
          <div className={styles.chips} role="group" aria-label={isEn ? 'Filter by category' : 'Lọc theo nhóm'}>
            <button
              type="button"
              className={`${styles.chip} ${facet === 'all' ? styles.chipActive : ''}`}
              onClick={() => setFacet('all')}
              aria-pressed={facet === 'all'}
            >
              {isEn ? 'All' : 'Tất cả'}
            </button>
            {config.facet.order.map(id => (
              <button
                key={id}
                type="button"
                className={`${styles.chip} ${facet === id ? styles.chipActive : ''}`}
                onClick={() => setFacet(id)}
                aria-pressed={facet === id}
              >
                {config.facet.getLabel(id)}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>{isEn ? 'No entries match your search.' : 'Không tìm thấy mục nào khớp với tìm kiếm.'}</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => { setQuery(''); setFacet('all'); }}
          >
            {isEn ? 'Clear filters' : 'Xóa bộ lọc'}
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(entry => {
            const iconName = typeof config.icon === 'function' ? config.icon(entry) : config.icon;

            return (
              <article key={entry.id} className={`${styles.itemCard} pixel-frame`}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <Icon name={iconName} size={24} />
                  </div>
                  <span className="badge">{config.badge(entry)}</span>
                </div>
                <h3>{entry.name}</h3>
                {entry.name_en && <div className={styles.entrySub}>{entry.name_en}</div>}
                <p className={styles.desc}>{entry.description}</p>
                <div className={styles.details}>
                  {config.renderDetails(entry)}
                </div>
                {entry.tags?.length > 0 && (
                  <div className={styles.tags}>
                    {entry.tags.slice(0, 4).map(t => (
                      <span key={t} className="badge forest" style={{ fontSize: '11px' }}>
                        {getTagTranslation(t, lang)}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
