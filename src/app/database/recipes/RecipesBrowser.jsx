'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

const STATIONS = [
  { id: 'all', label: 'Tất cả công thức' },
  { id: 'tea_station', label: 'Trạm Pha Trà' },
  { id: 'bakery_oven', label: 'Lò Nướng Bánh' },
];

export default function RecipesBrowser({ recipes }) {
  const [query, setQuery] = useState('');
  const [station, setStation] = useState('all');
  const [viewMode, setViewMode] = useState('cookery'); // 'cookery' | 'table'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter(recipe => {
      if (station !== 'all' && recipe.station !== station) return false;
      if (!q) return true;
      const haystack = [
        recipe.name,
        recipe.description,
        recipe.effect_description,
        recipe.station === 'tea_station' ? 'trà thảo mộc' : 'lò nướng bánh',
        ...(recipe.ingredients || []).map(i => i.name),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [recipes, query, station]);

  const groups = useMemo(() => {
    const map = new Map();
    for (const recipe of filtered) {
      if (!map.has(recipe.station)) map.set(recipe.station, []);
      map.get(recipe.station).push(recipe);
    }
    return STATIONS.filter(s => s.id !== 'all')
      .map(s => ({ ...s, items: map.get(s.id) || [] }))
      .filter(g => g.items.length > 0);
  }, [filtered]);

  const renderRecipeCard = recipe => {
    const isTea = recipe.station === 'tea_station';
    const stationLabel = isTea ? 'Trạm Pha Trà' : 'Lò Nướng Bánh Thần Kỳ';
    const iconName = isTea ? 'tea-bag' : 'cake';

    return (
      <article key={recipe.id} id={recipe.id} className={`${styles.recipeCard} pixel-frame`}>
        <div className={styles.recipeTop}>
          <div className={styles.avatarSlot}>
            <Icon name={iconName} size={28} />
          </div>
          <div className={styles.recipeNameGroup}>
            <h2 className={styles.recipeName}>{recipe.name}</h2>
            <div className={styles.recipeStationMeta}>
              <span className={styles.stationName}>{stationLabel}</span>
              <span>·</span>
              <span className={styles.duration}>
                <Icon name="clock" size={12} /> {recipe.duration_seconds}s
              </span>
            </div>
          </div>
        </div>

        {recipe.effect_description && (
          <div className={styles.recipeEffect}>
            <Icon name="sparkle" size={14} />
            <span>{recipe.effect_description}</span>
          </div>
        )}

        <p className={styles.recipeDesc}>{recipe.description}</p>

        <div className={styles.recipeIngredientsBox}>
          <div className={styles.ingLabel}>NGUYÊN LIỆU CẦN THIẾT</div>
          <div className={styles.ingList}>
            {recipe.ingredients.map(ing => (
              <Link
                key={ing.id}
                href={`/database/items/${ing.id}`}
                className={styles.ingredientLink}
              >
                <span>{ing.name}</span>
                <span className={styles.ingredientQty}>x{ing.quantity}</span>
              </Link>
            ))}
          </div>
        </div>

        {recipe.result_item_id && (
          <div className={styles.recipeProductBox}>
            <div className={styles.productLabel}>THÀNH PHẨM TẠO RA</div>
            <Link
              href={`/database/items/${recipe.result_item_id}`}
              className={styles.productLink}
            >
              <Icon name={isTea ? 'tea-bag' : 'cake'} size={16} />
              <span>{recipe.name}</span>
              <span className={styles.productTag}>Xem hồ sơ vật phẩm →</span>
            </Link>
          </div>
        )}
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
              placeholder="Tìm công thức, nguyên liệu, hiệu ứng..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Tìm công thức"
            />
          </div>

          <div className={styles.viewSwitch} role="group" aria-label="Chế độ hiển thị">
            <button
              type="button"
              className={`${styles.viewSwitchBtn} ${viewMode === 'cookery' ? styles.viewSwitchActive : ''}`}
              onClick={() => setViewMode('cookery')}
              aria-pressed={viewMode === 'cookery'}
            >
              <Icon name="cake" size={16} /> Sổ Bếp Bà Ngoại
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

        <div className={styles.chips} role="group" aria-label="Lọc theo trạm pha chế">
          {STATIONS.map(s => (
            <button
              key={s.id}
              type="button"
              className={`${styles.chip} ${station === s.id ? styles.chipActive : ''}`}
              onClick={() => setStation(s.id)}
              aria-pressed={station === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy công thức nào khớp với tìm kiếm.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setQuery('');
              setStation('all');
            }}
          >
            Xóa tìm kiếm
          </button>
        </div>
      ) : viewMode === 'cookery' ? (
        /* ==================== SỔ BẾP BÀ NGOẠI CARDS (GROUPED BY STATION) ==================== */
        <div className={styles.groupsWrap}>
          {groups.map(g => (
            <section key={g.id} className={styles.groupSection}>
              <header className={styles.groupHeader}>
                <span className={styles.groupTitle}>{g.label}</span>
                <span className={styles.groupCount}>{g.items.length} công thức</span>
              </header>
              <div className={styles.recipeGrid}>
                {g.items.map(renderRecipeCard)}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* ==================== BẢNG SỔ KẾ ==================== */
        <div className={`${styles.tableWrapper} pixel-frame`}>
          <table className={styles.wikiTable}>
            <thead>
              <tr>
                <th className={styles.iconCell}>Icon</th>
                <th>Công thức & Thành phẩm</th>
                <th className={styles.stationCell}>Trạm</th>
                <th className={styles.descCell}>Mô tả</th>
                <th className={styles.effectCell}>Hiệu ứng</th>
                <th>Nguyên liệu cần</th>
                <th className={styles.durationCell}>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(recipe => (
                <tr key={recipe.id} id={recipe.id}>
                  <td className={styles.iconCell}>
                    <div className={styles.iconWrap}>
                      <Icon
                        name={recipe.station === 'tea_station' ? 'tea-bag' : 'cake'}
                        size={20}
                      />
                    </div>
                  </td>
                  <td className={styles.nameCell}>
                    {recipe.result_item_id ? (
                      <Link href={`/database/items/${recipe.result_item_id}`}>
                        {recipe.name}
                      </Link>
                    ) : (
                      <strong>{recipe.name}</strong>
                    )}
                  </td>
                  <td className={styles.stationCell}>
                    <span className="badge">
                      {recipe.station === 'tea_station' ? 'Trà Thảo Mộc' : 'Lò Nướng'}
                    </span>
                  </td>
                  <td className={styles.descCell}>{recipe.description}</td>
                  <td className={styles.effectCell}>{recipe.effect_description}</td>
                  <td>
                    <div className={styles.ingredientChips}>
                      {recipe.ingredients.map(ing => (
                        <Link
                          key={ing.id}
                          href={`/database/items/${ing.id}`}
                          className={styles.ingredientLink}
                        >
                          <span>{ing.name}</span>
                          <span className={styles.ingredientQty}>x{ing.quantity}</span>
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td className={styles.durationCell}>
                    {recipe.duration_seconds}s
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
