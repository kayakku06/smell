'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import PostCard from '@/components/postcard/postcard';
type Post = {
  id: string;
  perfumeName: string;
  brandName?: string;
  volume: string;
  imageSrc?: string;
  price?: string;
  smellType?: string;
  gender?: string;
  scent: string;
  longevity: number;
  accessibility: number;
  costPerformance: number;
  created_at: string;
  comment?: string;
};


const testPost: Post[] = [
  {
    id: '1',
    perfumeName: 'Orpheon',
    brandName: 'Diptyque',
    volume: '75ml',
    imageSrc: '/pictures/images.jpeg',
    price: '30000',
    smellType: 'EDP',
    gender: 'ユニセックス',
    scent: 'フローラル',

    longevity: 5,
    accessibility: 3,
    costPerformance: 4,
    created_at: '2025-06-11T10:00:00Z',
    comment: 'とても良い香りで、持続性も高いです。',
  },
  {
    id: '2',
    perfumeName: 'Another13',
    brandName: 'Le Labo',
    volume: '75ml',
    imageSrc: '/pictures/org.jpg',
    price: '30000',
    smellType: 'EDP',
    gender: 'ユニセックス',
    scent: 'シプレー',
    costPerformance: 3,
    longevity: 4,
    accessibility: 2,
    created_at: '2025-06-12T15:00:00Z',
    comment: 'シンプルで洗練された香り。日常使いに最適です。',
  },
];
export default function PostPage() {
   const sortedPosts = [...testPost].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        <h2>ようこそ KaoList へ</h2>
        <div style={{ marginBottom: '24px' }}>
          {sortedPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
