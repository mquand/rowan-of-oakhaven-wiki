import Link from 'next/link';
import Icon from './Icon';
import { DEFAULT_LOCALE } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/getDictionary';
import styles from './Footer.module.scss';

export default function Footer({ lang = DEFAULT_LOCALE }) {
  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.about}>
            <h3 className={styles.brand}><Icon name="tea-bag" size={20} /> Rowan of Oakhaven</h3>
            <p className={styles.aboutDesc}>
              {isEn
                ? 'Community game wiki and player knowledge base for Rowan of Oakhaven, developed by Fluvio Games.'
                : 'Wiki trò chơi và cẩm nang hướng dẫn cộng đồng cho Rowan of Oakhaven, phát triển bởi Fluvio Games.'}
            </p>
          </div>

          <div className={styles.links}>
            <div>
              <h4>{dict.footer.exploreWorld}</h4>
              <ul>
                <li><Link href={`/${lang}/wiki/getting-started`}>{dict.footer.links.gettingStarted}</Link></li>
                <li><Link href={`/${lang}/wiki/gameplay-guide`}>{dict.footer.links.gameplayGuide}</Link></li>
                <li><Link href={`/${lang}/wiki/calendar-seasons`}>{dict.footer.links.calendarSeasons}</Link></li>
                <li><Link href={`/${lang}/wiki/character-roster`}>{dict.footer.links.characterRoster}</Link></li>
                <li><Link href={`/${lang}/wiki/dungeon-combat`}>{dict.footer.links.dungeonCombat}</Link></li>
              </ul>
            </div>

            <div>
              <h4>{dict.footer.gameDatabase}</h4>
              <ul>
                <li><Link href={`/${lang}/database/items`}>{dict.footer.links.items}</Link></li>
                <li><Link href={`/${lang}/database/recipes`}>{dict.footer.links.recipes}</Link></li>
                <li><Link href={`/${lang}/database/characters`}>{dict.footer.links.characters}</Link></li>
                <li><Link href={`/${lang}/database/crops`}>{dict.footer.links.crops}</Link></li>
                <li><Link href={`/${lang}/database/monsters`}>{dict.footer.links.monsters}</Link></li>
                <li><Link href={`/${lang}/database/locations`}>{dict.database.categories.locations.title}</Link></li>
              </ul>
            </div>

            <div>
              <h4>{isEn ? 'Community & Links' : 'Cộng Đồng & Dự Án'}</h4>
              <ul>
                <li>
                  <a href="https://fluviogames.com" target="_blank" rel="noopener noreferrer">
                    {isEn ? 'Fluvio Games Official' : 'Trang Chủ Game (Fluvio Games)'}
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/oakhaven" target="_blank" rel="noopener noreferrer">
                    {isEn ? 'Discord Community' : 'Cộng Đồng Discord'}
                  </a>
                </li>
                <li>
                  <a href="https://github.com/mquand/rowan-of-oakhaven-wiki" target="_blank" rel="noopener noreferrer">
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4>{dict.footer.information}</h4>
              <ul>
                <li><Link href={`/${lang}/privacy`}>{dict.footer.links.privacy}</Link></li>
                <li><Link href={`/${lang}/terms`}>{dict.footer.links.terms}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <span>{dict.footer.copyright}</span>
          <span>{dict.footer.brandTag}</span>
        </div>
      </div>
    </footer>
  );
}
