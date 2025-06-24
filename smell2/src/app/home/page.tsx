'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import PostCard from '@/components/postcard/postcard';
import { supabase } from '@/lib/supabase';

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

  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        <h2>ようこそ KaoList へ</h2>
        <div style={{ marginBottom: '24px' }}>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
