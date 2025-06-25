import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import PostPageClient from './PostPageClient';

export default function PostPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        <Suspense fallback={<div>読み込み中...</div>}>
          <PostPageClient />
        </Suspense>
      </main>
    </>
  );
}
