import styles from '../Database.module.scss';
import { getRecipes } from '../../../lib/gameData';
import Icon from '../../../components/Icon';
import RecipesBrowser from './RecipesBrowser';

export const metadata = {
  title: 'Sổ Công Thức Trà & Bánh — Rowan of Oakhaven Wiki',
};

export default function RecipesPage() {
  const recipes = getRecipes();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.kicker}>Database / Recipes</p>
        <h1 className={styles.title}><Icon name="cake" size={28} /> Sổ công thức trà ASMR và lò bánh đá</h1>
        <p>Di sản công thức thử nghiệm của Bà Ngoại Amalia để lại cho Rowan</p>
      </div>

      <RecipesBrowser recipes={recipes} />
    </div>
  );
}
