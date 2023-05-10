'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import useQuizStore from './store';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Quiz',
  description: 'Quiz app',
};

export default function RootLayout({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: React.ReactNode;
}) {
  const config = useQuizStore((state: any) => state.config);
  let render = config.status === 'start' ? quiz : children;
  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
