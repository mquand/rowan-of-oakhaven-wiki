import styles from '../Database.module.scss';
import { getRecipes } from '../../../lib/gameData';

export const metadata = {
  title: 'Sổ Công Thức Trà & Bánh — Rowan of Oakhaven Wiki',
};

export default function RecipesPage() {
  const recipes = getRecipes();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>☕ Sổ Công Thức Trà ASMR & Lò Bánh Đá</h1>
        <p>Di sản công thức thử nghiệm của Bà Ngoại Amalia để lại cho Rowan</p>
      </div>

      <div className={styles.grid}>
        {recipes.map(recipe => (
          <div key={recipe.id} className={styles.recipeCard}>
            <div className={styles.recipeStation}>
              {recipe.station === 'tea_station' ? '🍵 Trạm Trà ASMR' : '🥐 Lò Nướng Bánh'}
            </div>
            <h3>{recipe.name}</h3>
            <p className={styles.desc}>{recipe.description}</p>

            <div className={styles.effect}>
              ✨ {recipe.effect_description}
            </div>

            <div className={styles.ingredientsHeader}>Nguyên liệu cần có:</div>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map(ing => (
                <li key={ing.id}>
                  <span>{ing.name}</span>
                  <strong>x{ing.quantity}</strong>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#71698a' }}>
              ⏱️ Thời gian hoàn thành: {recipe.duration_seconds}s
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
