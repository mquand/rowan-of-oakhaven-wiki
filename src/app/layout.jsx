import { Manrope, Pixelify_Sans } from 'next/font/google';
import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

export const baseUrl = 'https://github.com/mquand/rowan-of-oakhaven-wiki';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Rowan of Oakhaven Wiki — Fluvio Games',
  description: 'Official Game Wiki & Knowledge Base for Rowan of Oakhaven (by Fluvio Games)',
  openGraph: {
    title: 'Rowan of Oakhaven Wiki — Fluvio Games',
    description: 'Cozy dark pixel RPG wiki — ASMR tea brewing, magic bakery, herb farming & crystal mining.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Rowan of Oakhaven Wiki',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Rowan of Oakhaven Wiki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rowan of Oakhaven Wiki',
    description: 'Cozy dark pixel RPG wiki — ASMR tea brewing, magic bakery, herb farming & crystal mining.',
    images: ['/og-image.svg'],
  },
};

export const viewport = {
  themeColor: '#0f111d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${manrope.variable} ${pixelify.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Đến nội dung chính
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
