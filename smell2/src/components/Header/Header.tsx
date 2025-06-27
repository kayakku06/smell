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
  Collapse,
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
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
      <AppBar position="static" sx={{ backgroundColor: '#f8f4f0', color: '#333' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* ロゴ */}
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

          {/* 右側（投稿 & フィルター） */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* PC用フィルター */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#fff',
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

            {/* スマホ用 フィルター開閉ボタン */}
            <Button
              onClick={toggleFilter}
              startIcon={<SearchIcon />}
              sx={{ display: { xs: 'flex', sm: 'none' }, textTransform: 'none' }}
            >
              フィルター
            </Button>

            {/* 投稿ボタン */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handlePostClick}
              sx={{
                textTransform: 'none',
                fontSize: { xs: '0.75rem', sm: '1rem' },
                px: { xs: 1.5, sm: 3 },
                py: { xs: 0.5, sm: 1 },
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>投稿する</Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>投稿</Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* スマホ用フィルター：AppBarの外に表示 */}
      <Collapse in={isFilterOpen} sx={{ display: { xs: 'block', sm: 'none' }, px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* メインカテゴリ */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['all', 'gender', 'scent', 'price'].map((value) => (
              <Button
                key={value}
                variant={filter === value ? 'contained' : 'outlined'}
                onClick={() => handleCategorySelect(value)}
                sx={{ textTransform: 'none', fontSize: '0.75rem' }}
              >
                {value === 'all' ? 'すべて' :
                 value === 'gender' ? '性別' :
                 value === 'scent' ? '香り' : '購入金額'}
              </Button>
            ))}
          </Box>

          {/* サブカテゴリ */}
          {['gender', 'scent', 'price'].includes(filter) && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {getSubOptions().map((option) => (
                <Button
                  key={option.value}
                  variant={subFilter === option.value ? 'contained' : 'outlined'}
                  onClick={() => handleSubFilterChange(option.value)}
                  sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                >
                  {option.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Collapse>
    </>
  );
};

export default Header;
