import React, { Suspense } from 'react';
import Header from '@/components/Header/Header';
import HomePageClient from './HomePageClient';

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        <Suspense fallback={<div>読み込み中...</div>}>
          <HomePageClient />
        </Suspense>
      </main>
    </>
  );
}
