'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SelectChangeEvent } from '@mui/material/Select';

const Header: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [subFilter, setSubFilter] = useState('');

  const handleFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFilter(value);
    setSubFilter('');
    console.log('カテゴリ:', value);
  };

  const handleSubFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSubFilter(value);
    console.log('サブカテゴリ:', value);
  };

  // サブカテゴリ一覧を返す
  const getSubOptions = () => {
    if (filter === 'gender') {
      return [
        { value: 'men', label: 'メンズ' },
        { value: 'women', label: 'レディース' },
        { value: 'unisex', label: 'ユニセックス' },
      ];
    }
    if (filter === 'scent') {
      return [
        { value: 'citrus', label: 'シトラス' },
        { value: 'fruity', label: 'フルーティ' },
        { value: 'floral', label: 'フローラル' },
        { value: 'chypre', label: 'シプレー' },
        { value: 'oriental', label: 'オリエンタル' },
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
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          KaoListああああ
        </Typography>

        {/* 右：フィルターと投稿 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* メインカテゴリ選択 */}
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel id="filter-label" sx={{ color: '#333' }}>カテゴリ</InputLabel>
            <Select
              labelId="filter-label"
              value={filter}
              label="カテゴリ"
              onChange={handleFilterChange}
              sx={{ color: '#333' }}
            >
              <MenuItem value="all">すべて</MenuItem>
              <MenuItem value="gender">性別</MenuItem>
              <MenuItem value="scent">香り</MenuItem>
              <MenuItem value="price">購入金額</MenuItem>
            </Select>
          </FormControl>

          {/* サブカテゴリ（必要なときだけ） */}
          {['gender', 'scent', 'price'].includes(filter) && (
            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel id="subfilter-label" sx={{ color: '#333' }}>詳細</InputLabel>
              <Select
                labelId="subfilter-label"
                value={subFilter}
                label="詳細"
                onChange={handleSubFilterChange}
                sx={{ color: '#333' }}
              >
                {getSubOptions().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* 投稿ボタン */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            href="/post"
          >
            投稿する
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
