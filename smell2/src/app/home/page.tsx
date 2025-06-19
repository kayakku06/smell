'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import PostCard from '@/components/postcard/postcard';
type Post = {
  id: string; // 詳細ページ用
  perfumeName: string;
  brandName?: string;
  volume: string;
  imageSrc?: string;
  price?: string;
  perfumeType?: string;
  gender?: string;
  scent: string;
  costPerformance: number;
  longevity: number;
  accessibility: number;
  postedAt: string; // 投稿日
};


const testPost: Post[] = [
  {
    id: '1',
    perfumeName: 'Orpheon',
    brandName: 'Diptyque',
    volume: '75ml',
    imageSrc: '/写真/images.jpeg',
    price: '30000',
    perfumeType: 'EDP',
    gender: 'ユニセックス',
    scent: 'フローラル',
    costPerformance: 4,
    longevity: 5,
    accessibility: 3,
    postedAt: '2025-06-12',
  },
];
export default function PostPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        <h2>ようこそ KaoList へ</h2>
        <div style={{ marginBottom: '24px' }}>
          {testPost.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
