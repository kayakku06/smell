import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import PostPageClient from './PostPageClient';

export default function PostPage() {
  return (
    <>
     
      <Suspense fallback={<div>読み込み中...</div>}>
      <Header />
        <PostPageClient />
      </Suspense>
    </>
  );
}
