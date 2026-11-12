import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './ItemDetail.module.scss';
import Icon from '../../../../components/Icon';
import {
  getItems,
  getItemById,
  getRecipesUsingItem,
  getItemSources,
  getRelatedItems,
} from '../../../../lib/gameData';

const CATEGORY_LABELS = {
  seed: 'Hạt giống',
  ingredient: 'Nguyên liệu',
  mineral: 'Khoáng sản',
  gem: 'Tinh thể',
  monster_drop: 'Nguyên liệu quái',
};

const CATEGORY_ICONS = {
  seed: 'plant',
  ingredient: 'grains',
  mineral: 'mountains',
  gem: 'diamond',
  monster_drop: 'sparkle',
};

const STATION_LABELS = {
  tea_station: 'Trạm trà ASMR',
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

  const recipes = getRecipesUsingItem(id);
  const sources = getItemSources(id);
  const relatedItems = getRelatedItems(id, 4);

  const categoryLabel = CATEGORY_LABELS[item.category] || item.category;
  const categoryIcon = CATEGORY_ICONS[item.category] || 'package';

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
          Item / {item.category}
        </span>
        <h1>{item.name}</h1>
      </header>

      <div className={styles.layout}>
        <aside className={`${styles.spritePanel} pixel-frame`}>
          <div className={`${styles.spriteBox} ${styles[item.category] || ''}`}>
            <Icon name={categoryIcon} size={72} />
          </div>
          <p className={styles.spriteCaption}>{item.sprite}</p>
        </aside>

        <div className={styles.body}>
          <p className={styles.description}>{item.description}</p>

          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <th>Thể loại</th>
                <td>
                  <span className={`badge ${item.category}`}>{categoryLabel}</span>
                </td>
              </tr>
              <tr>
                <th>Mã vật phẩm</th>
                <td>
                  <code className={styles.code}>{item.id}</code>
                </td>
              </tr>
              {item.tags?.length > 0 && (
                <tr>
                  <th>Tags</th>
                  <td>
                    <span className={styles.tags}>
                      {item.tags.map(tag => (
                        <span key={tag} className="badge forest">
                          #{tag}
                        </span>
                      ))}
                    </span>
                  </td>
                </tr>
              )}
              <tr>
                <th>Sprite</th>
                <td>
                  <code className={styles.code}>{item.sprite}</code>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Nguồn thu thập */}
          <section className={styles.section}>
            <h2>
              <Icon name="map-pin" size={20} />
              Nguồn thu thập / Cách nhận
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

          {/* Công thức sử dụng */}
          <section className={styles.section}>
            <h2>
              <Icon name="cooking-pot" size={20} />
              Công thức sử dụng ({recipes.length})
            </h2>

            {recipes.length > 0 ? (
              <ul className={styles.recipeList}>
                {recipes.map(recipe => (
                  <li key={recipe.id}>
                    <Icon name="scroll" size={16} />
                    <Link href={`/database/recipes#${recipe.id}`}>{recipe.name}</Link>
                    <span className={styles.station}>
                      {STATION_LABELS[recipe.station] || recipe.station}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyNote}>
                Vật phẩm này hiện chưa được dùng trong công thức nào.
              </p>
            )}
          </section>

          {/* Vật phẩm liên quan */}
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
