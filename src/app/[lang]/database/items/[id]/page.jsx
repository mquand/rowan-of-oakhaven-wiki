import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './ItemDetail.module.scss';
import Icon from '../../../../../components/Icon';
import {
  getItems,
  getItemById,
  getRecipesUsingItem,
  getRecipeByResultItem,
  getItemSources,
  getRelatedItems,
  getCharactersWhoLoveItem,
} from '../../../../../lib/gameData';
import {
  CATEGORY_ICONS,
  RARITY_CLASSES,
  getCategoryLabel,
  getRarityLabel,
  getStationLabel,
} from '../../../../../lib/constants';
import { DEFAULT_LOCALE, LOCALES } from '../../../../../lib/i18n/config';
import { getDictionary } from '../../../../../lib/i18n/getDictionary';

export async function generateStaticParams() {
  const params = [];
  for (const lang of LOCALES) {
    const items = getItems(lang);
    for (const item of items) {
      params.push({ lang, id: item.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE, id } = await params;
  const item = getItemById(id, lang);
  if (!item) return { title: 'Not Found — Rowan of Oakhaven Codex' };

  return {
    title: `${item.name} — Rowan of Oakhaven Codex`,
    description: item.description,
  };
}

export default async function ItemDetailPage({ params }) {
  const { lang = DEFAULT_LOCALE, id } = await params;
  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  const item = getItemById(id, lang);
  if (!item) notFound();

  const recipesUsing = getRecipesUsingItem(id, lang);
  const craftingRecipe = getRecipeByResultItem(id, lang);
  const sources = getItemSources(id, lang);
  const relatedItems = getRelatedItems(id, 4, lang);
  const characterLovers = getCharactersWhoLoveItem(id, lang);

  const categoryLabel = getCategoryLabel(item.category, lang);
  const categoryIcon = CATEGORY_ICONS[item.category] || 'package';
  const rarityLabel = getRarityLabel(item.rarity, lang);
  const rarityClass = RARITY_CLASSES[item.rarity] || 'forest';

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${lang}/database`}>{dict.nav.database}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${lang}/database/items`}>{dict.database.categories.items.short}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{item.name}</span>
      </nav>

      <header className={styles.header}>
        <span className={styles.kicker}>
          <Icon name={categoryIcon} size={14} />
          {dict.database.itemDetail.categoryKicker} · {categoryLabel}
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
              <span className={styles.quickStatLabel}>{dict.database.itemDetail.rarity}</span>
              <span className={`badge ${rarityClass}`} style={{ fontSize: '11px', padding: '2px 6px' }}>
                {rarityLabel}
              </span>
            </div>
            {item.sell_price != null && (
              <div className={styles.quickStatRow}>
                <span className={styles.quickStatLabel}>{dict.database.browser.sellPrice}</span>
                <span className={styles.quickStatVal}>{item.sell_price} {isEn ? 'Gold' : 'Vàng'}</span>
              </div>
            )}
            {item.buy_price != null && (
              <div className={styles.quickStatRow}>
                <span className={styles.quickStatLabel}>{dict.database.browser.buyPrice}</span>
                <span className={styles.quickStatVal}>{item.buy_price} {isEn ? 'Gold' : 'Vàng'}</span>
              </div>
            )}
            {item.energy != null && (
              <div className={styles.quickStatRow}>
                <span className={styles.quickStatLabel}>{isEn ? 'Stamina' : 'Thể lực'}</span>
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
                <th>{isEn ? 'Category' : 'Thể loại'}</th>
                <td>
                  <span className={`badge ${item.category}`}>{categoryLabel}</span>
                </td>
              </tr>
              <tr>
                <th>{dict.database.itemDetail.rarity}</th>
                <td>
                  <span className={`badge ${rarityClass}`}>{rarityLabel}</span>
                </td>
              </tr>
              {item.sell_price != null && (
                <tr>
                  <th>{dict.database.itemDetail.sellPrice}</th>
                  <td>
                    <strong>{item.sell_price}</strong> {isEn ? 'Stardust Coins' : 'Đồng Bụi Sao'}
                  </td>
                </tr>
              )}
              {item.buy_price != null ? (
                <tr>
                  <th>{dict.database.itemDetail.buyPrice}</th>
                  <td>
                    <strong>{item.buy_price}</strong> {isEn ? 'Stardust Coins (Oakhaven Stand)' : 'Đồng Bụi Sao (Quầy Oakhaven)'}
                  </td>
                </tr>
              ) : (
                <tr>
                  <th>{isEn ? 'Purchasable' : 'Nguồn mua'}</th>
                  <td style={{ color: '#8d92aa' }}>
                    {isEn ? 'Not sold in shops — obtain via foraging or crafting' : 'Không bán tại quầy — tự thu thập hoặc chế biến'}
                  </td>
                </tr>
              )}
              {item.energy != null && (
                <tr>
                  <th>{dict.database.itemDetail.energy}</th>
                  <td style={{ color: '#74c99e' }}>+{item.energy} {isEn ? 'Stamina' : 'Thể Lực'}</td>
                </tr>
              )}
              {item.crop_id && (
                <tr>
                  <th>{isEn ? 'Related Crop' : 'Cây trồng liên quan'}</th>
                  <td>
                    <Link href={`/${lang}/database/crops`} style={{ color: '#ffcf40', textDecoration: 'underline' }}>
                      {isEn ? 'View four seasons farming almanac' : 'Xem thông tin gieo trồng bốn mùa'}
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
                {isEn ? 'Crafting Recipe For This Item' : 'Công thức chế biến ra món này'}
              </h2>
              <ul className={styles.recipeList}>
                <li key={craftingRecipe.id}>
                  <Icon name={craftingRecipe.station === 'tea_station' ? 'tea-bag' : 'cake'} size={18} />
                  <Link href={`/${lang}/database/recipes#${craftingRecipe.id}`}>{craftingRecipe.name}</Link>
                  <span className={styles.station}>
                    {getStationLabel(craftingRecipe.station, lang)} ({craftingRecipe.duration_seconds}s)
                  </span>
                </li>
              </ul>
            </section>
          )}

          {/* Nguồn thu thập */}
          <section className={styles.section}>
            <h2>
              <Icon name="map-pin" size={20} />
              {dict.database.itemDetail.sourcesTitle} ({sources.length})
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
                {dict.database.itemDetail.noSources}
              </p>
            )}
          </section>

          {/* Công thức sử dụng nguyên liệu này */}
          <section className={styles.section}>
            <h2>
              <Icon name="scroll" size={20} />
              {dict.database.itemDetail.recipesUsingTitle} ({recipesUsing.length})
            </h2>

            {recipesUsing.length > 0 ? (
              <ul className={styles.recipeList}>
                {recipesUsing.map(recipe => (
                  <li key={recipe.id}>
                    <Icon name={recipe.station === 'tea_station' ? 'tea-bag' : 'cake'} size={16} />
                    <Link href={`/${lang}/database/recipes#${recipe.id}`}>{recipe.name}</Link>
                    <span className={styles.station}>
                      {getStationLabel(recipe.station, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyNote}>
                {dict.database.itemDetail.noRecipesUsing}
              </p>
            )}
          </section>

          {/* Cư dân ưa thích làm quà tặng */}
          {characterLovers.length > 0 && (
            <section className={styles.section}>
              <h2>
                <Icon name="heart" size={20} />
                {dict.database.itemDetail.favoredByTitle} ({characterLovers.length})
              </h2>
              <div className={styles.charactersGrid}>
                {characterLovers.map(char => (
                  <Link
                    key={char.id}
                    href={`/${lang}/database/characters`}
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
                {dict.database.itemDetail.relatedTitle} ({categoryLabel})
              </h2>
              <div className={styles.relatedGrid}>
                {relatedItems.map(rel => (
                  <Link
                    key={rel.id}
                    href={`/${lang}/database/items/${rel.id}`}
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
            <span>{isEn ? 'Technical ID:' : 'Mã định danh kỹ thuật:'}</span>
            <code className={styles.code}>{item.id}</code>
          </div>

          <div className={styles.backRow}>
            <Link href={`/${lang}/database/items`} className={styles.backLink}>
              <Icon name="arrow-left" size={16} />
              {dict.database.itemDetail.backToItems}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
