import Link from 'next/link';
import DatabaseHubClient from './DatabaseHubClient';
import styles from './DatabaseHub.module.scss';
import { getDatabaseStats } from '../../../lib/gameData';
import { DEFAULT_LOCALE, LOCALES } from '../../../lib/i18n/config';
import { getDictionary } from '../../../lib/i18n/getDictionary';

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.database.hubTitle} — Rowan of Oakhaven Codex`,
    description: dict.database.hubDesc,
  };
}

export default async function DatabaseHubPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const counts = getDatabaseStats(lang);

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{dict.nav.database}</span>
      </nav>

      <header className={styles.header}>
        <p className={styles.kicker}>OAKHAVEN COMPENDIUM</p>
        <h1>{dict.database.hubTitle}</h1>
        <p>{dict.database.hubDesc}</p>
      </header>

      <DatabaseHubClient counts={counts} lang={lang} />
    </div>
  );
}
