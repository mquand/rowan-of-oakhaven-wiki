import styles from './Privacy.module.scss';
import { DEFAULT_LOCALE, LOCALES } from '../../../lib/i18n/config';
import { getDictionary } from '../../../lib/i18n/getDictionary';

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.privacy.title} — Rowan of Oakhaven Wiki`,
  };
}

export default async function PrivacyPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  return (
    <div className={`${styles.container} pixel-frame`}>
      <p className={styles.kicker}>Legal / Privacy</p>
      <h1 className={styles.title}>{dict.privacy.title}</h1>
      <p className={styles.date}>{dict.privacy.updated}</p>
      <p>
        {isEn
          ? 'The Rowan of Oakhaven Wiki does not collect personal tracking data from its visitors. All documentation and database records are served locally from static content within this repository.'
          : 'Wiki Rowan of Oakhaven không thu thập dữ liệu cá nhân nào từ người truy cập. Trang web này chỉ đọc file tài liệu cục bộ trong repo và hiển thị chúng trên trình duyệt của bạn.'}
      </p>
      <p>
        {isEn
          ? 'If you submit feedback or community contributions via GitHub issues, your submitted details are stored according to GitHub’s standard privacy policies.'
          : 'Nếu bạn gửi phản hồi qua GitHub issue, dữ liệu bạn cung cấp sẽ được lưu theo chính sách của GitHub.'}
      </p>
    </div>
  );
}
