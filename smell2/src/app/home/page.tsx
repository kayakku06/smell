'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import PostCard from '@/components/postcard/postcard';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';

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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchParams = useSearchParams();

  const filter = searchParams.get('filter');
  const sub = searchParams.get('sub');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('データの取得に失敗しました:', error.message);
        return;
      }

      if (data) {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (!filter || filter === 'all') return true;
    if (!sub) return true;

    if (filter === 'gender') return post.gender === sub;
    if (filter === 'scent') return post.scent === sub;

    if (filter === 'price') {
      const price = parseInt(post.price || '0', 10);
      if (sub === 'under5000') return price <= 5000;
      if (sub === '5000to20000') return price > 5000 && price <= 20000;
      if (sub === 'over20000') return price > 20000;
    }

    return true;
  });

  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        <h2>ようこそ KaoList へ</h2>
        <div style={{ marginBottom: '24px' }}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
