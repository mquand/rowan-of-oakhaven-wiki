import Link from 'next/link';
import Icon from '../../components/Icon';
import { DEFAULT_LOCALE } from '../../lib/i18n/config';
import { getDictionary } from '../../lib/i18n/getDictionary';
import styles from './NotFound.module.scss';

export const metadata = {
  title: '404 — Rowan of Oakhaven Wiki',
};

export default async function NotFound({ params }) {
  const { lang = DEFAULT_LOCALE } = (await params) || {};
  const dict = getDictionary(lang);

  return (
    <div className={styles.container}>
      <div className={`${styles.box} pixel-frame`}>
        <div className={styles.iconBox}>
          <Icon name="mountains" size={36} />
        </div>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>{dict.notFound.title}</h1>
        <p className={styles.desc}>
          {dict.notFound.desc}
        </p>
        <div className={styles.actions}>
          <Link href={`/${lang}`} className={styles.primaryBtn}>
            <Icon name="tea-bag" size={16} /> {dict.notFound.backHome}
          </Link>
          <Link href={`/${lang}/wiki`} className={styles.secondaryBtn}>
            <Icon name="book-open" size={16} /> {dict.wiki.breadcrumb}
          </Link>
          <Link href={`/${lang}/database`} className={styles.secondaryBtn}>
            <Icon name="package" size={16} /> {dict.nav.database}
          </Link>
        </div>
      </div>
    </div>
  );
}
