'use client';

import React, { useEffect, useState } from 'react';
import PostCard from '@/components/postcard/postcard';
import { supabase } from '@/lib/supabase';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
  IconButton,
  Menu,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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

export default function HomePageClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sort, setSort] = useState('newest');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const filter = searchParams.get('filter') || 'all';
  const sub = searchParams.get('sub') || '';

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

      if (data) setPosts(data);
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
    const avgA = ((a.longevity || 0) + (a.accessibility || 0) + (a.costPerformance || 0)) / 3;
    const avgB = ((b.longevity || 0) + (b.accessibility || 0) + (b.costPerformance || 0)) / 3;

    switch (sort) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'cheap':
        return parseInt(a.price || '0') - parseInt(b.price || '0');
      case 'expensive':
        return parseInt(b.price || '0') - parseInt(a.price || '0');
      case 'highscore':
        return avgB - avgA;
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (value: string) => {
    const params = new URLSearchParams();
    params.set('filter', value);
    router.push(`/home?${params.toString()}`);
    setAnchorEl(null);
  };

  const handleSubFilterChange = (value: string) => {
    const params = new URLSearchParams();
    params.set('filter', filter);
    params.set('sub', value);
    router.push(`/home?${params.toString()}`);
  };

  const getSubOptions = () => {
    if (filter === 'gender') {
      return [
        { value: 'メンズ', label: 'メンズ' },
        { value: 'レディース', label: 'レディース' },
        { value: 'ユニセックス', label: 'ユニセックス' },
      ];
    }
    if (filter === 'scent') {
      return [
        { value: 'シトラス', label: 'シトラス' },
        { value: 'フルーティ', label: 'フルーティ' },
        { value: 'フローラル', label: 'フローラル' },
        { value: 'シプレ', label: 'シプレ' },
        { value: 'オリエンタル', label: 'オリエンタル' },
      ];
    }
    if (filter === 'price') {
      return [
        { value: 'under5000', label: '5000円まで' },
        { value: '5000to20000', label: '5000円〜20000円' },
        { value: 'over20000', label: '20000円以上' },
      ];
    }
    return [];
  };

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
          px: 3,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* 並び替え */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon sx={{ color: '#555' }} />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={sort}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': '並び替え' }}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 14, height: 36 }}
            >
              <MenuItem value="newest">新着順</MenuItem>
              <MenuItem value="oldest">古い順</MenuItem>
              <MenuItem value="cheap">価格が安い順</MenuItem>
              <MenuItem value="expensive">価格が高い順</MenuItem>
              <MenuItem value="highscore">総合評価が高い順</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* フィルター */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: '#fff',
            height: 36,
          }}
        >
          <IconButton onClick={handleCategoryClick} sx={{ color: '#333' }}>
            <SearchIcon />
          </IconButton>
          <Typography sx={{ fontSize: '0.9rem' }}>フィルター</Typography>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleCategorySelect('all')}>すべて</MenuItem>
            <MenuItem onClick={() => handleCategorySelect('gender')}>性別</MenuItem>
            <MenuItem onClick={() => handleCategorySelect('scent')}>香り</MenuItem>
            <MenuItem onClick={() => handleCategorySelect('price')}>購入金額</MenuItem>
          </Menu>

          {['gender', 'scent', 'price'].includes(filter) && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {getSubOptions().map((option) => {
                const isActive = sub === option.value;
                return (
                  <Box
                    key={option.value}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: isActive ? '#1976d2' : '#ccc',
                      borderRadius: 1,
                      height: 30,
                      pl: 1,
                      pr: isActive ? 0.5 : 1,
                      backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                    }}
                  >
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleSubFilterChange(option.value)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: isActive ? 'bold' : 'normal',
                        color: isActive ? '#1976d2' : '#333',
                        minWidth: 0,
                        height: 30,
                        fontSize: 14,
                        paddingY: 0.5,
                        paddingX: 1.5,
                        borderRadius: 1,
                      }}
                    >
                      {option.label}
                    </Button>
                    {isActive && (
                      <IconButton
                        size="small"
                        onClick={() => handleSubFilterChange('')}
                        sx={{ color: '#888', p: 0.25 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      <main style={{ padding: '24px' }}>
        <Typography variant="h5" gutterBottom>
          
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {sortedPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </Box>
      </main>
    </>
  );
}
