import styles from './Terms.module.scss';
import { DEFAULT_LOCALE, LOCALES } from '../../../lib/i18n/config';
import { getDictionary } from '../../../lib/i18n/getDictionary';

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.terms.title} — Rowan of Oakhaven Wiki`,
  };
}

export default async function TermsPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  return (
    <div className={`${styles.container} pixel-frame`}>
      <p className={styles.kicker}>Legal / Terms</p>
      <h1 className={styles.title}>{dict.terms.title}</h1>
      <p className={styles.date}>{dict.terms.updated}</p>
      <p>
        {isEn
          ? 'The Rowan of Oakhaven Wiki is an open community reference site providing gameplay guides and database material for players of Rowan of Oakhaven (Fluvio Games).'
          : 'Wiki trò chơi Rowan of Oakhaven được duy trì nhằm cung cấp thông tin, hướng dẫn lối chơi và tư liệu tham khảo cho cộng đồng người chơi Rowan of Oakhaven (Fluvio Games).'}
      </p>
      <p>
        {isEn
          ? 'All official game artwork, lore narratives, character names, and copyright assets belong to Fluvio Games. The frontend wiki source code is released openly under the project license.'
          : 'Mọi hình ảnh, tư liệu truyền thuyết, tên nhân vật và nội dung bản quyền thuộc về Fluvio Games. Mã nguồn hiển thị của wiki được phát hành mở dưới giấy phép của dự án.'}
      </p>
    </div>
  );
}
