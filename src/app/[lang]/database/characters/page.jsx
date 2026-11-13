import Link from 'next/link';
import styles from '../Database.module.scss';
import { getCharacters } from '../../../../lib/gameData';
import Icon from '../../../../components/Icon';
import CharactersBrowser from './CharactersBrowser';
import { DEFAULT_LOCALE, LOCALES } from '../../../../lib/i18n/config';
import { getDictionary } from '../../../../lib/i18n/getDictionary';

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.database.categories.characters.title} — Rowan of Oakhaven Wiki`,
    description: dict.database.categories.characters.desc,
  };
}

export default async function CharactersPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const characters = getCharacters(lang);

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${lang}/database`}>{dict.nav.database}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{dict.database.categories.characters.short}</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>Database / Residents</p>
        <h1 className={styles.title}><Icon name="users" size={28} /> {dict.database.categories.characters.title}</h1>
        <p>{dict.database.categories.characters.desc}</p>
      </div>

      <CharactersBrowser characters={characters} lang={lang} />
    </div>
  );
}
