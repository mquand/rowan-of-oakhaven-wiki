import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './ItemDetail.module.scss';
import Icon from '../../../../components/Icon';
import {
  getItems,
  getItemById,
  getRecipesUsingItem,
  getRecipeByResultItem,
  getItemSources,
  getRelatedItems,
  getCharactersWhoLoveItem,
} from '../../../../lib/gameData';

const CATEGORY_LABELS = {
  seed: 'Hạt giống',
  ingredient: 'Nguyên liệu',
  mineral: 'Khoáng sản',
  gem: 'Tinh thể',
  monster_drop: 'Loot quái vật',
  tea: 'Trà Thảo Mộc',
  bakery: 'Bánh ma thuật',
};

const CATEGORY_ICONS = {
  seed: 'plant',
  ingredient: 'grains',
  mineral: 'mountains',
  gem: 'diamond',
  monster_drop: 'sparkle',
  tea: 'tea-bag',
  bakery: 'cake',
};

const RARITY_LABELS = {
  common: 'Phổ thông',
  uncommon: 'Quý hiếm',
  rare: 'Tinh xảo',
  mythic: 'Thần bí',
};

const RARITY_CLASSES = {
  common: 'forest',
  uncommon: 'seed',
  rare: 'gem',
  mythic: 'monster_drop',
};

const STATION_LABELS = {
  tea_station: 'Trạm pha trà',
  bakery_oven: 'Lò nướng bánh',
};

export function generateStaticParams() {
  return getItems().map(item => ({ id: item.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) return { title: 'Không tìm thấy vật phẩm' };

  return {
    title: `${item.name} — Rowan of Oakhaven Wiki`,
    description: item.description,
  };
}

export default async function ItemDetailPage({ params }) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) notFound();

  const recipesUsing = getRecipesUsingItem(id);
  const craftingRecipe = getRecipeByResultItem(id);
  const sources = getItemSources(id);
  const relatedItems = getRelatedItems(id, 4);
  const characterLovers = getCharactersWhoLoveItem(id);

  const categoryLabel = CATEGORY_LABELS[item.category] || item.category;
  const categoryIcon = CATEGORY_ICONS[item.category] || 'package';
  const rarityLabel = RARITY_LABELS[item.rarity] || 'Phổ thông';
  const rarityClass = RARITY_CLASSES[item.rarity] || 'forest';

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link href="/database">Cơ sở dữ liệu</Link>
        <span aria-hidden="true">/</span>
        <Link href="/database/items">Vật phẩm</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{item.name}</span>
      </nav>

      <header className={styles.header}>
        <span className={styles.kicker}>
          <Icon name={categoryIcon} size={14} />
          Kho Vật Phẩm · {categoryLabel}
        </span>
        <h1>{item.name}</h1>
      </header>

      <div className={styles.layout}>
        {/* Sprite & Quick Stats Side Box */}
        <aside className={`${styles.spritePanel} pixel-frame`}>
          <div className={`${styles.spriteBox} ${styles[item.category] || ''}`}>
            <Icon name={categoryIcon} size={72} />
          </div>

          <div className={styles.quickStats}>
            <div className={styles.quickStatRow}>
              <span className={styles.quickStatLabel}>Phẩm cấp</span>
              <span className={`badge ${rarityClass}`} style={{ fontSize: '11px', padding: '2px 6px' }}>
                {rarityLabel}
              </span>
            </div>
            {item.sell_price != null && (
              <div className={styles.quickStatRow}>
                <span className={styles.quickStatLabel}>Giá bán</span>
                <span className={styles.quickStatVal}>{item.sell_price} Vàng</span>
              </div>
            )}
            {item.buy_price != null && (
              <div className={styles.quickStatRow}>
                <span className={styles.quickStatLabel}>Giá mua</span>
                <span className={styles.quickStatVal}>{item.buy_price} Vàng</span>
              </div>
            )}
            {item.energy != null && (
              <div className={styles.quickStatRow}>
                <span className={styles.quickStatLabel}>Thể lực</span>
                <span className={styles.quickStatVal}>+{item.energy} HP</span>
              </div>
            )}
          </div>
        </aside>

        {/* Main Details Body */}
        <div className={styles.body}>
          <p className={styles.description}>{item.description}</p>

          {item.buff && (
            <div className={styles.buffBanner}>
              <Icon name="sparkle" size={18} />
              <span>{item.buff}</span>
            </div>
          )}

          {/* Table of attributes */}
          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <th>Thể loại</th>
                <td>
                  <span className={`badge ${item.category}`}>{categoryLabel}</span>
                </td>
              </tr>
              <tr>
                <th>Phẩm cấp</th>
                <td>
                  <span className={`badge ${rarityClass}`}>{rarityLabel}</span>
                </td>
              </tr>
              {item.sell_price != null && (
                <tr>
                  <th>Giá bán tại Tiệm Bụi Sao</th>
                  <td>
                    <strong>{item.sell_price}</strong> Đồng Bụi Sao
                  </td>
                </tr>
              )}
              {item.buy_price != null ? (
                <tr>
                  <th>Giá mua từ thương nhân</th>
                  <td>
                    <strong>{item.buy_price}</strong> Đồng Bụi Sao (Quầy Oakhaven)
                  </td>
                </tr>
              ) : (
                <tr>
                  <th>Nguồn mua</th>
                  <td style={{ color: '#8d92aa' }}>Không bán tại quầy — tự thu thập hoặc chế biến</td>
                </tr>
              )}
              {item.energy != null && (
                <tr>
                  <th>Năng lượng phục hồi</th>
                  <td style={{ color: '#74c99e' }}>+{item.energy} Thể Lực</td>
                </tr>
              )}
              {item.crop_id && (
                <tr>
                  <th>Cây trồng liên quan</th>
                  <td>
                    <Link href="/database/crops" style={{ color: '#ffcf40', textDecoration: 'underline' }}>
                      Xem thông tin gieo trồng bốn mùa
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Công thức chế biến thành phẩm này (nếu có) */}
          {craftingRecipe && (
            <section className={styles.section}>
              <h2>
                <Icon name="cooking-pot" size={20} />
                Công thức chế biến ra món này
              </h2>
              <ul className={styles.recipeList}>
                <li key={craftingRecipe.id}>
                  <Icon name={craftingRecipe.station === 'tea_station' ? 'tea-bag' : 'cake'} size={18} />
                  <Link href={`/database/recipes#${craftingRecipe.id}`}>{craftingRecipe.name}</Link>
                  <span className={styles.station}>
                    {STATION_LABELS[craftingRecipe.station] || craftingRecipe.station} ({craftingRecipe.duration_seconds}s)
                  </span>
                </li>
              </ul>
            </section>
          )}

          {/* Nguồn thu thập */}
          <section className={styles.section}>
            <h2>
              <Icon name="map-pin" size={20} />
              Nguồn thu thập / Cách nhận ({sources.length})
            </h2>

            {sources.length > 0 ? (
              <ul className={styles.sourceList}>
                {sources.map((s, idx) => (
                  <li key={idx} className={styles.sourceItem}>
                    <div className={styles.sourceIcon}>
                      <Icon name={s.icon} size={18} />
                    </div>
                    <div className={styles.sourceBody}>
                      <div className={styles.sourceTitleRow}>
                        <span className={styles.sourceTitle}>
                          {s.href ? <Link href={s.href}>{s.title}</Link> : s.title}
                        </span>
                        <span className="badge">{s.badge}</span>
                      </div>
                      <p className={styles.sourceDesc}>{s.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyNote}>
                Vật phẩm này có thể tìm thấy rải rác trong thiên nhiên hoặc nhận qua phần thưởng sự kiện.
              </p>
            )}
          </section>

          {/* Công thức sử dụng nguyên liệu này */}
          <section className={styles.section}>
            <h2>
              <Icon name="scroll" size={20} />
              Công thức sử dụng ({recipesUsing.length})
            </h2>

            {recipesUsing.length > 0 ? (
              <ul className={styles.recipeList}>
                {recipesUsing.map(recipe => (
                  <li key={recipe.id}>
                    <Icon name={recipe.station === 'tea_station' ? 'tea-bag' : 'cake'} size={16} />
                    <Link href={`/database/recipes#${recipe.id}`}>{recipe.name}</Link>
                    <span className={styles.station}>
                      {STATION_LABELS[recipe.station] || recipe.station}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyNote}>
                Vật phẩm này hiện chưa dùng làm nguyên liệu cho công thức trà bánh nào.
              </p>
            )}
          </section>

          {/* Cư dân ưa thích làm quà tặng */}
          {characterLovers.length > 0 && (
            <section className={styles.section}>
              <h2>
                <Icon name="heart" size={20} />
                Cư dân yêu thích ({characterLovers.length})
              </h2>
              <div className={styles.charactersGrid}>
                {characterLovers.map(char => (
                  <Link
                    key={char.id}
                    href="/database/characters"
                    className={styles.characterMiniCard}
                  >
                    <div className={styles.charAvatar}>
                      <Icon name="users" size={18} />
                    </div>
                    <div className={styles.charInfo}>
                      <div className={styles.charName}>{char.name}</div>
                      <div className={styles.charRole}>{char.role}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Vật phẩm cùng nhóm */}
          {relatedItems.length > 0 && (
            <section className={styles.section}>
              <h2>
                <Icon name="package" size={20} />
                Vật phẩm cùng nhóm {categoryLabel}
              </h2>
              <div className={styles.relatedGrid}>
                {relatedItems.map(rel => (
                  <Link
                    key={rel.id}
                    href={`/database/items/${rel.id}`}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedIcon}>
                      <Icon name={CATEGORY_ICONS[rel.category] || 'package'} size={16} />
                    </div>
                    <span className={styles.relatedName}>{rel.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Modder / Technical Footnote */}
          <div className={styles.techFooter}>
            <span>Mã định danh kỹ thuật:</span>
            <code className={styles.code}>{item.id}</code>
          </div>

          <div className={styles.backRow}>
            <Link href="/database/items" className={styles.backLink}>
              <Icon name="arrow-left" size={16} />
              Quay lại kho vật phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
