'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const Header: React.FC = () => {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const initialSub = searchParams.get('sub') || '';

  const [filter, setFilter] = useState(initialFilter);
  const [subFilter, setSubFilter] = useState(initialSub);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const handlePostClick = () => {
    router.push('/post');
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (value: string) => {
    setFilter(value);
    setSubFilter('');
    setAnchorEl(null);

    const params = new URLSearchParams();
    params.set('filter', value);
    router.push(`/home?${params.toString()}`);
  };

  const handleSubFilterChange = (value: string) => {
    setSubFilter(value);
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
        { value: 'シプレー', label: 'シプレー' },
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
    <AppBar position="static" sx={{ backgroundColor: '#f8f4f0', color: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 左：ロゴ */}
        <Link href="/home" passHref>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            KaoList
          </Typography>
        </Link>

        {/* 右：フィルター ＋ 投稿 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* フィルターグループ */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#fff',
            }}
          >
            {/* メインカテゴリ */}
            <IconButton onClick={handleCategoryClick} sx={{ color: '#333', gap: 0.5 }}>
              <SearchIcon />
              <Typography sx={{ fontSize: '0.9rem' }}>フィルター</Typography>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleCategorySelect('all')}>すべて</MenuItem>
              <MenuItem onClick={() => handleCategorySelect('gender')}>性別</MenuItem>
              <MenuItem onClick={() => handleCategorySelect('scent')}>香り</MenuItem>
              <MenuItem onClick={() => handleCategorySelect('price')}>購入金額</MenuItem>
            </Menu>

            {/* サブカテゴリ */}
            {['gender', 'scent', 'price'].includes(filter) && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {getSubOptions().map((option) => {
                  const isActive = subFilter === option.value;
                  return (
                    <Box
                      key={option.value}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: isActive ? '#1976d2' : '#ccc',
                        borderRadius: 2,
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
                          padding: '4px 8px',
                        }}
                      >
                        {option.label}
                      </Button>
                      {isActive && (
                        <IconButton
                          size="small"
                          onClick={() => handleSubFilterChange('')}
                          sx={{ color: '#888', p: 0.5 }}
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

          {/* 投稿ボタン */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handlePostClick}
            sx={{ textTransform: 'none' }}
          >
            投稿する
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
