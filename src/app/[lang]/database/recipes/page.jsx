import Link from 'next/link';
import styles from '../Database.module.scss';
import { getRecipes } from '../../../../lib/gameData';
import Icon from '../../../../components/Icon';
import RecipesBrowser from './RecipesBrowser';
import { DEFAULT_LOCALE, LOCALES } from '../../../../lib/i18n/config';
import { getDictionary } from '../../../../lib/i18n/getDictionary';

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.database.categories.recipes.title} — Rowan of Oakhaven Wiki`,
    description: dict.database.categories.recipes.desc,
  };
}

export default async function RecipesPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const recipes = getRecipes(lang);
  const isEn = lang === 'en';

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${lang}/database`}>{dict.nav.database}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{dict.database.categories.recipes.short}</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>
          {isEn ? 'DATABASE / RECIPES' : 'CƠ SỞ DỮ LIỆU / CÔNG THỨC'}
        </p>
        <h1 className={styles.title}><Icon name="cake" size={28} /> {dict.database.categories.recipes.title}</h1>
        <p>{dict.database.categories.recipes.desc}</p>
      </div>

      <RecipesBrowser recipes={recipes} lang={lang} />
    </div>
  );
}
