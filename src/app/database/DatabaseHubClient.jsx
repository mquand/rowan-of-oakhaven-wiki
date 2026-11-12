'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../../components/Icon';
import styles from './DatabaseHub.module.scss';

const CATEGORIES = [
  {
    key: 'items',
    title: 'Kho Vật Phẩm',
    group: 'craft',
    icon: 'package',
    href: '/database/items',
    desc: 'Hạt giống, thảo mộc, quặng khoáng sản, tinh thể ma thuật và đồ rơi từ quái vật.',
    tags: ['Hạt giống', 'Nguyên liệu', 'Khoáng sản', 'Tinh thể', 'Loot quái'],
  },
  {
    key: 'recipes',
    title: 'Sổ Công Thức Trà & Bánh',
    group: 'craft',
    icon: 'cake',
    href: '/database/recipes',
    desc: 'Công thức trà an thần ASMR và các mẻ bánh ma thuật nướng tại tiệm bánh.',
    tags: ['Trạm Trà ASMR', 'Lò Nướng Bánh', 'Hiệu ứng Buff', 'Chữa lành'],
  },
  {
    key: 'characters',
    title: 'Hồ Sơ Cư Dân & Nhân Vật',
    group: 'world',
    icon: 'users',
    href: '/database/characters',
    desc: 'Tiểu sử, sở thích quà tặng, vị trí và lời thoại đặc trưng của cư dân Oakhaven và 5 Vương quốc.',
    tags: ['Bạn đồng hành', 'Dân làng', 'Thương nhân', 'Quà yêu thích'],
  },
  {
    key: 'crops',
    title: 'Sổ Cây Trồng & Thảo Mộc',
    group: 'craft',
    icon: 'farm',
    href: '/database/crops',
    desc: 'Thảo mộc theo 4 mùa, chu kỳ sinh trưởng, khả năng tái sinh và vật phẩm thu hoạch.',
    tags: ['Xuân', 'Hạ', 'Thu', 'Đông', 'Tái sinh', 'Trà Sen'],
  },
  {
    key: 'monsters',
    title: 'Sổ Quái Vật Hắc Hóa',
    group: 'combat',
    icon: 'sparkle',
    href: '/database/monsters',
    desc: 'Các sinh vật bị ô nhiễm Bụi Sao Hắc Hóa rải rác khắp các đới mỏ và vùng đất cổ xưa.',
    tags: ['Điểm yếu', 'Loot rơi', 'Đới mỏ', 'Khaz-Drakor', 'Sylva-Fae'],
  },
  {
    key: 'weapons',
    title: 'Vũ Khí & Pháp Khí Ma Thuật',
    group: 'combat',
    icon: 'sword',
    href: '/database/weapons',
    desc: 'Kiếm pha lê, liềm ma thuật, đèn lồng bão đom đóm rèn và nâng cấp tại Lò rèn Boris.',
    tags: ['Cận chiến', 'Tầm xa', 'Hạng nặng', 'AoE', 'Nâng cấp'],
  },
  {
    key: 'perks',
    title: 'Kỹ Năng Tiện Ích (Bí Kíp)',
    group: 'craft',
    icon: 'book-open',
    href: '/database/perks',
    desc: 'Kỹ năng bị động từ quyển sổ rách của Bà Ngoại Amalia mở khóa qua tiến trình chơi.',
    tags: ['Khám phá', 'Nông trại', 'Trà bánh', 'Kỹ năng bị động'],
  },
  {
    key: 'locations',
    title: 'Bản Đồ 5 Vương Quốc',
    group: 'world',
    icon: 'map-pin',
    href: '/database/locations',
    desc: 'Thị trấn Oakhaven, Rừng Thầm Thì, Xứ Lò Rèn, Rừng Tinh Linh và Địa Đàng Cực Quang.',
    tags: ['Thị trấn khởi đầu', 'Vương quốc', 'Điều kiện mở khóa', 'Điểm nổi bật'],
  },
];

const GROUPS = [
  { id: 'all', label: 'Tất cả danh mục' },
  { id: 'craft', label: 'Nông trại & Bếp bánh' },
  { id: 'combat', label: 'Chiến đấu & Trang bị' },
  { id: 'world', label: 'Thế giới & Cư dân' },
];

export default function DatabaseHubClient({ counts }) {
  const [activeGroup, setActiveGroup] = useState('all');

  const filteredCategories = CATEGORIES.filter(
    cat => activeGroup === 'all' || cat.group === activeGroup
  );

  return (
    <>
      <div className={styles.filterChips} role="group" aria-label="Lọc nhóm danh mục">
        {GROUPS.map(g => (
          <button
            key={g.id}
            type="button"
            className={`${styles.chip} ${activeGroup === g.id ? styles.active : ''}`}
            onClick={() => setActiveGroup(g.id)}
            aria-pressed={activeGroup === g.id}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredCategories.map(cat => (
          <article key={cat.key} className={`${styles.card} pixel-frame`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <Icon name={cat.icon} size={22} />
              </div>
              <span className={styles.countBadge}>
                {counts[cat.key] || 0} mục
              </span>
            </div>

            <h2 className={styles.cardTitle}>{cat.title}</h2>
            <p className={styles.cardDesc}>{cat.desc}</p>

            <div className={styles.tagsRow}>
              {cat.tags.map(t => (
                <span key={t} className="badge forest">
                  #{t}
                </span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <Link href={cat.href} className={styles.cardLink}>
                Mở danh mục <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
