import { Manrope, Pixelify_Sans } from 'next/font/google';
import '../../styles/globals.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Starfield from '../../components/Starfield';
import { LOCALES, DEFAULT_LOCALE } from '../../lib/i18n/config';
import { getDictionary } from '../../lib/i18n/getDictionary';

const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pixel',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const isEn = lang === 'en';
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rowan-of-oakhaven-wiki.fluviogames.com'),
    title: 'Rowan of Oakhaven Wiki — Fluvio Games',
    description: isEn
      ? 'Official Game Wiki & Database for Rowan of Oakhaven (Fluvio Games)'
      : 'Wiki & Cơ sở dữ liệu trò chơi Rowan of Oakhaven (Fluvio Games)',
    openGraph: {
      title: 'Rowan of Oakhaven Wiki',
      description: isEn
        ? 'Official Game Wiki for Rowan of Oakhaven — Tea crafting, magic bakery, herb farming & crystal mining.'
        : 'Wiki trò chơi Rowan of Oakhaven — Chế biến trà thảo mộc, bếp bánh, nông trại và khai khoáng.',
      type: 'website',
      locale: isEn ? 'en_US' : 'vi_VN',
      siteName: 'Rowan of Oakhaven Wiki',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Rowan of Oakhaven Wiki',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rowan of Oakhaven Wiki',
      description: isEn
        ? 'Official Game Wiki for Rowan of Oakhaven — Tea crafting, magic bakery, herb farming & crystal mining.'
        : 'Wiki trò chơi Rowan of Oakhaven — Chế biến trà thảo mộc, bếp bánh, nông trại và khai khoáng.',
      images: ['/og-image.png'],
    },
  };
}

export const viewport = {
  themeColor: '#0f111d',
};

export default async function LocaleLayout({ children, params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${manrope.variable} ${pixelify.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <Starfield />
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
