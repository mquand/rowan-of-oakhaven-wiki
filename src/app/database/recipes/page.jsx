import Link from 'next/link';
import styles from '../Database.module.scss';
import { getRecipes } from '../../../lib/gameData';
import Icon from '../../../components/Icon';
import RecipesBrowser from './RecipesBrowser';

export const metadata = {
  title: 'Sổ Công Thức Trà & Bánh — Rowan of Oakhaven Wiki',
  description: 'Công thức chế biến trà thảo mộc Bụi Sao và các mẻ bánh ma thuật nướng tại tiệm Oakhaven.',
};

export default function RecipesPage() {
  const recipes = getRecipes();

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link href="/database">Cơ sở dữ liệu</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>Công thức</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>DI SẢN BÀ NGOẠI AMALIA</p>
        <h1 className={styles.title}><Icon name="cake" size={28} /> Sổ Công Thức Trà & Bánh Thần Kỳ</h1>
        <p>Di sản công thức chế biến của Bà Ngoại Amalia truyền lại cho Rowan tại Tiệm Bụi Sao</p>
      </div>

      <RecipesBrowser recipes={recipes} />
    </div>
  );
}
