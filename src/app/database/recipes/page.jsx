import Link from 'next/link';
import styles from '../Database.module.scss';
import { getRecipes } from '../../../lib/gameData';
import Icon from '../../../components/Icon';
import RecipesBrowser from './RecipesBrowser';

export const metadata = {
  title: 'Sổ Công Thức Trà & Bánh — Rowan of Oakhaven Wiki',
  description: 'Công thức trà an thần ASMR và lò bánh đá chữa lành tâm hồn của Rowan of Oakhaven.',
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
        <p className={styles.kicker}>Database / Recipes</p>
        <h1 className={styles.title}><Icon name="cake" size={28} /> Sổ công thức trà ASMR và lò bánh đá</h1>
        <p>Di sản công thức thử nghiệm của Bà Ngoại Amalia để lại cho Rowan</p>
      </div>

      <RecipesBrowser recipes={recipes} />
    </div>
  );
}
