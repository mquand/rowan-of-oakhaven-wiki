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

export const metadata = {
  title: 'Rowan of Oakhaven Wiki — Fluvio Games',
  description: 'Official Game Wiki & Knowledge Base for Rowan of Oakhaven (by Fluvio Games)',
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
