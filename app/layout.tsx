import '../styles/globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AI Smart Tool',
  description: 'منصة أدوات الذكاء الاصطناعي',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-white font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
