'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';
import { lookupGift } from '../../../lib/itemLookup';

const REALM_LABELS = {
  oakhaven: 'Thị trấn Oakhaven',
  solaria: 'Kinh Đô Solaria',
  'sylva-fae': 'Rừng Sylva-Fae',
  'khaz-drakor': 'Đô Thị Khaz-Drakor',
  aethelgard: 'Địa Đàng Aethelgard',
};

const SEASON_LABELS = {
  spring: 'Xuân',
  summer: 'Hạ',
  autumn: 'Thu',
  winter: 'Đông',
};

const BRANCH_LABELS = {
  exploration: 'Khám Phá Mỏ',
  farming: 'Nông Trại',
  tea: 'Trà Thảo Mộc & Bánh',
};

const WEAPON_TYPE_LABELS = {
  melee: 'Cận Chiến',
  ranged: 'Tầm Xa',
  heavy: 'Hạng Nặng',
};

const LOCATION_TYPE_LABELS = {
  starting_town: 'Thị Trấn Khởi Đầu',
  realm: 'Đại Vương Quốc',
};

const TAG_TRANSLATIONS = {
  tea: 'Trà thảo mộc',
  base: 'Nguyên liệu nền',
  regrow: 'Tái sinh',
  fruit: 'Quả mọng',
  grain: 'Ngũ cốc',
  bakery: 'Bếp bánh',
  mill: 'Cối xay',
  herb: 'Thảo mộc',
  calming: 'An thần',
  flower: 'Hoa tươi',
  energy: 'Hồi thể lực',
  vegetable: 'Nông sản',
  festival: 'Lễ hội',
  mechanical: 'Cơ khí',
  fire: 'Lửa',
  dwarven: 'Người lùn',
  beast: 'Dã thú',
  lava: 'Dung nham',
  underground: 'Lòng đất',
  plant: 'Thực vật',
  dark: 'Hắc hóa',
  elven: 'Yêu tinh',
  insect: 'Côn trùng',
  flying: 'Bay lượn',
  spirit: 'Linh hồn',
  mischief: 'Tinh nghịch',
  undead: 'Bất tử',
  armor: 'Giáp nặng',
  royal: 'Hoàng triều',
  construct: 'Tạo tác',
  mythic: 'Thần thoại',
  guardian: 'Hộ vệ',
  elysium: 'Thiên đường',
  haunted: 'Ám muội',
  local: 'Bản địa',
  beetle: 'Bọ cánh cứng',
  crystal: 'Tinh thể',
  sword: 'Kiếm',
  magic: 'Phép thuật',
  melee: 'Cận chiến',
  scythe: 'Liềm',
  aoe: 'Diện rộng',
  harvest: 'Thu hoạch',
  lantern: 'Đèn lồng',
  ranged: 'Tầm xa',
  light: 'Ánh sáng',
  hammer: 'Búa',
  heavy: 'Hạng nặng',
  movement: 'Di chuyển',
  dodge: 'Né đòn',
  mining: 'Khai khoáng',
  detection: 'Dò tìm',
  combat: 'Chiến đấu',
  automation: 'Tự động',
  crafting: 'Chế tạo',
  social: 'Giao tiếp',
  customers: 'Khách hàng',
  utility: 'Tiện ích',
  quality: 'Phẩm chất',
  speed: 'Tốc độ',
  capacity: 'Công suất',
  town: 'Thị trấn',
  starting: 'Khởi đầu',
  home: 'Mái nhà',
  city: 'Thành phố',
  palace: 'Vương cung',
  forest: 'Rừng thẳm',
  elves: 'Yêu tinh',
  dwarves: 'Người lùn',
  forge: 'Lò rèn',
  floating: 'Đảo bay',
  finale: 'Hồi kết',
  spiritual: 'Tâm linh',
};

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

const CONFIG = {
  monsters: {
    icon: e => MONSTER_ICONS[e.id] || 'sparkle',
    badge: e => REALM_LABELS[e.realm] || e.realm,
    search: e => [e.name, e.name_en, e.description, e.weakness, ...(e.tags || [])],
    facet: {
      field: 'realm',
      labels: REALM_LABELS,
      order: ['oakhaven', 'solaria', 'sylva-fae', 'khaz-drakor', 'aethelgard'],
    },
    renderDetails: e => (
      <>
        {e.hp != null && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Chỉ số sinh lực:</span>
            <span style={{ color: '#ffcf40', fontWeight: 700 }}>
              HP: {e.hp} · Sát thương: {e.atk} {e.danger_level ? `(Độ khó: ${'★'.repeat(e.danger_level)})` : ''}
            </span>
          </div>
        )}
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Điểm yếu:</span>
          <span>{e.weakness}</span>
        </div>
        <div className={styles.detailRow} style={{ alignItems: 'flex-start' }}>
          <span className={styles.detailLabel}>Vật phẩm rơi:</span>
          <div className={styles.ingredientChips}>
            {e.loot_items && e.loot_items.length > 0 ? (
              e.loot_items.map((loot, idx) => (
                <Link
                  key={idx}
                  href={`/database/items/${loot.id}`}
                  className={styles.ingredientLink}
                >
                  <span>{loot.name}</span>
                  <span className={styles.ingredientQty}>{loot.chance}</span>
                </Link>
              ))
            ) : (
              <span>{e.loot || 'Không rõ'}</span>
            )}
          </div>
        </div>
      </>
    ),
  },

  crops: {
    icon: e => (e.tags?.includes('grain') ? 'grains' : e.tags?.includes('tea') ? 'leaf' : 'plant'),
    badge: e => (e.seasons || []).map(s => SEASON_LABELS[s] || s).join(' · '),
    search: e => [e.name, e.description, ...(e.tags || [])],
    facet: {
      field: 'seasons',
      labels: SEASON_LABELS,
      order: ['spring', 'summer', 'autumn', 'winter'],
      multi: true,
    },
    renderDetails: e => {
      const seedGift = e.seed_item_id ? lookupGift(e.seed_item_id) : null;
      const harvestGift = e.harvest_item_id ? lookupGift(e.harvest_item_id) : null;

      return (
        <>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Chu kỳ sinh trưởng:</span>
            <span>
              {e.growth_days} ngày
              {e.regrow_days > 0 ? ` (Tái sinh mỗi ${e.regrow_days} ngày)` : ' (Thu hoạch một lần)'}
            </span>
          </div>
          {seedGift && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Hạt giống gieo:</span>
              <Link href={seedGift.href} className={styles.ingredientLink}>
                <Icon name={seedGift.icon} size={13} />
                <span>{seedGift.name}</span>
                {e.seed_price != null && (
                  <span className={styles.ingredientQty}>{e.seed_price} Vàng</span>
                )}
              </Link>
            </div>
          )}
          {harvestGift && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Sản phẩm thu hoạch:</span>
              <Link href={harvestGift.href} className={styles.ingredientLink}>
                <Icon name={harvestGift.icon} size={13} />
                <span>{harvestGift.name}</span>
                {e.sell_price != null && (
                  <span className={styles.ingredientQty}>{e.sell_price} Vàng</span>
                )}
              </Link>
            </div>
          )}
          {e.profit_per_day && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Hiệu suất kinh tế:</span>
              <span style={{ color: '#74c99e', fontWeight: 600 }}>{e.profit_per_day}</span>
            </div>
          )}
          {e.harvest_note && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ghi chú:</span>
              <span style={{ color: '#8d92aa' }}>{e.harvest_note}</span>
            </div>
          )}
        </>
      );
    },
  },

  weapons: {
    icon: e => WEAPON_ICONS[e.id] || 'sword',
    badge: e => WEAPON_TYPE_LABELS[e.weapon_type] || e.weapon_type,
    search: e => [e.name, e.name_en, e.description, e.upgrade_path, ...(e.tags || [])],
    facet: {
      field: 'weapon_type',
      labels: WEAPON_TYPE_LABELS,
      order: ['melee', 'ranged', 'heavy'],
    },
    renderDetails: e => (
      <>
        {e.base_atk != null && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Sát thương & Tốc độ:</span>
            <span style={{ color: '#ffcf40', fontWeight: 700 }}>
              ATK: {e.base_atk} · {e.attack_speed}
            </span>
          </div>
        )}
        {e.reach && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Tầm quét vũ khí:</span>
            <span>{e.reach}</span>
          </div>
        )}
        {e.special_effect && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Hiệu ứng đặc biệt:</span>
            <span style={{ color: '#7ad0ff' }}>{e.special_effect}</span>
          </div>
        )}
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Nâng cấp lò rèn:</span>
          <span>{e.materials_needed || e.upgrade_path}</span>
        </div>
      </>
    ),
  },

  perks: {
    icon: e => PERK_ICONS[e.branch] || 'book-open',
    badge: e => `${BRANCH_LABELS[e.branch] || e.branch} · ${e.tier || 'Bậc I'}`,
    search: e => [e.name, e.description, e.unlock_hint, ...(e.tags || [])],
    facet: {
      field: 'branch',
      labels: BRANCH_LABELS,
      order: ['exploration', 'farming', 'tea'],
    },
    renderDetails: e => (
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Cách mở khóa:</span>
        <span style={{ color: '#ffcf40' }}>{e.unlock_hint}</span>
      </div>
    ),
  },

  locations: {
    icon: e => LOCATION_ICONS[e.id] || 'map-pin',
    badge: e => LOCATION_TYPE_LABELS[e.location_type] || e.location_type,
    search: e => [e.name, e.name_en, e.description, e.unlock_condition, ...(e.features || []), ...(e.tags || [])],
    facet: {
      field: 'location_type',
      labels: LOCATION_TYPE_LABELS,
      order: ['starting_town', 'realm'],
    },
    renderDetails: e => (
      <>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Điều kiện mở:</span>
          <span style={{ color: '#ffcf40' }}>{e.unlock_condition}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Điểm nổi bật:</span>
          <span>{(e.features || []).join(' · ')}</span>
        </div>
        {e.npcs && e.npcs.length > 0 && (
          <div className={styles.detailRow} style={{ alignItems: 'flex-start' }}>
            <span className={styles.detailLabel}>Cư dân gặp gỡ:</span>
            <div className={styles.ingredientChips}>
              {e.npcs.slice(0, 6).map(npc => (
                <Link
                  key={npc.id}
                  href="/database/characters"
                  className={styles.ingredientLink}
                >
                  <Icon name="users" size={12} />
                  <span>{npc.name}</span>
                </Link>
              ))}
              {e.npcs.length > 6 && (
                <span style={{ fontSize: '11px', color: '#8d92aa', alignSelf: 'center' }}>
                  +{e.npcs.length - 6} người
                </span>
              )}
            </div>
          </div>
        )}
      </>
    ),
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
            placeholder="Tìm kiếm theo tên, đặc tính, khu vực..."
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
          <p>Không tìm thấy mục nào khớp với tìm kiếm.</p>
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
                        {TAG_TRANSLATIONS[t] || t}
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
