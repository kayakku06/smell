import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import HomePageClient from './HomePageClient';

export default function HomePage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>読み込み中...</div>}>
        <HomePageClient />
      </Suspense>
    </>
  );
}
