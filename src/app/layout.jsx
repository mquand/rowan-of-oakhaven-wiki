import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Rowan of Oakhaven Wiki — Fluvio Games',
  description: 'Official Game Wiki & Knowledge Base for Rowan of Oakhaven (by Fluvio Games)',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
