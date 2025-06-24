'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import PostCard from '@/components/postcard/postcard';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

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
  const [sort, setSort] = useState('newest');
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

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const priceA = parseInt(a.price || '0', 10);
    const priceB = parseInt(b.price || '0', 10);

    switch (sort) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'cheap':
        return priceA - priceB;
      case 'expensive':
        return priceB - priceA;
      case 'highscore':
        return b.costPerformance - a.costPerformance;
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        {/* 並び替えセレクト */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3 }}>
          <FilterListIcon sx={{ mr: 1, color: '#555' }} />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={sort}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': '並び替え' }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                fontSize: 14,
                height: 36,
              }}
            >
              <MenuItem value="newest">新着順</MenuItem>
              <MenuItem value="oldest">古い順</MenuItem>
              <MenuItem value="cheap">価格が安い順</MenuItem>
              <MenuItem value="expensive">価格が高い順</MenuItem>
              <MenuItem value="highscore">総合評価が高い順</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography variant="h5" gutterBottom>ようこそ KaoList へ</Typography>

        <div style={{ marginBottom: '24px' }}>
          {sortedPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
