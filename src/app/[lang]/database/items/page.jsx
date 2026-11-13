import Link from 'next/link';
import styles from '../Database.module.scss';
import { getItems } from '../../../../lib/gameData';
import Icon from '../../../../components/Icon';
import ItemsBrowser from './ItemsBrowser';
import { DEFAULT_LOCALE, LOCALES } from '../../../../lib/i18n/config';
import { getDictionary } from '../../../../lib/i18n/getDictionary';

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.database.categories.items.title} — Rowan of Oakhaven Codex`,
    description: dict.database.categories.items.desc,
  };
}

export default async function ItemsPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const items = getItems(lang);

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${lang}/database`}>{dict.nav.database}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{dict.database.categories.items.short}</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>Database / Items</p>
        <h1 className={styles.title}><Icon name="package" size={28} /> {dict.database.categories.items.title}</h1>
        <p>{dict.database.categories.items.desc}</p>
      </div>

      <ItemsBrowser items={items} lang={lang} />
    </div>
  );
}
