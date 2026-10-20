import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kora Plus',
  description: 'موقع عربي متخصص في مباريات كرة القدم',
  metadataBase: new URL('https://example.com')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>{children}</body>
    </html>
  );
}
