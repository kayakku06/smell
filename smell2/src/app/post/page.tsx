'use client';

import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import {
  Box, TextField, Typography, Button, Rating, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { supabase } from '@/lib/supabase';

const PostCardForm: React.FC = () => {
  const [form, setForm] = useState({
    perfumeName: '',
    brandName: '',
    volume: '',
    price: '',
    smellType: '',
    gender: '',
    scent: '',
    longevity: 0,
    costPerformance: 0,
    availability: 0,
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (name: string, value: number | null) => {
    setForm(prev => ({ ...prev, [name]: value ?? 0 }));
  };

  const handleSubmit = async () => {
  try {
    const volume = parseInt(form.volume, 10);
    const price = parseInt(form.price, 10);

    if (isNaN(volume) || isNaN(price)) {
      alert('内容量や価格は数値で入力してください。');
      return;
    }

    const insertData = {
      perfumeName: form.perfumeName,
      brandName: form.brandName,
      volume,
      price,
      smellType: form.smellType,
      gender: form.gender,
      scent: form.scent,
      longevity: form.longevity ?? 0,
      costPerformance: form.costPerformance ?? 0,
      accessibility: form.availability ?? 0, // ← テーブルに合わせてaccessibility
      comment: form.comment,
      // created_at: new Date().toISOString(), // ← これは省略してもOK（自動で入る）
    };

    const { error: insertError } = await supabase.from('post').insert([insertData]);

    if (insertError) {
      console.error('Insert error:', insertError);
      alert(`投稿に失敗しました: ${insertError.message}\n詳細: ${insertError.details}`);
    } else {
      alert('投稿が完了しました！（画像なし）');
    }
  } catch (err) {
    console.error('Full error object:', err);
    if (err instanceof Error) {
      alert(`エラーが発生しました: ${err.message}`);
    } else {
      alert('エラーが発生しました（不明なエラー）');
    }
  }
};


  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>香水の投稿</Typography>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        <TextField label="香水名" name="perfumeName" value={form.perfumeName} onChange={handleChange} />
        <TextField label="ブランド名" name="brandName" value={form.brandName} onChange={handleChange} />
        <TextField label="内容量" name="volume" value={form.volume} onChange={handleChange} />
        <TextField label="購入金額" name="price" value={form.price} onChange={handleChange} />

        <FormControl>
          <InputLabel>性別</InputLabel>
          <Select name="gender" value={form.gender} onChange={handleChange}>
            <MenuItem value="男性">男性</MenuItem>
            <MenuItem value="女性">女性</MenuItem>
            <MenuItem value="ユニセックス">ユニセックス</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>香りの種類</InputLabel>
          <Select name="smellType" value={form.smellType} onChange={handleChange}>
            <MenuItem value="シトラス">シトラス</MenuItem>
            <MenuItem value="フルーティ">フルーティ</MenuItem>
            <MenuItem value="フローラル">フローラル</MenuItem>
            <MenuItem value="シプレー">シプレー</MenuItem>
            <MenuItem value="オリエンタル">オリエンタル</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>香水タイプ</InputLabel>
          <Select name="scent" value={form.scent} onChange={handleChange}>
            <MenuItem value="P">P</MenuItem>
            <MenuItem value="EDP">EDP</MenuItem>
            <MenuItem value="EDT">EDT</MenuItem>
            <MenuItem value="EDC">EDC</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mt={4} display="flex" gap={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography gutterBottom>匂いの持続</Typography>
          <Rating value={form.longevity} onChange={(_, val) => handleRatingChange('longevity', val)} />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography gutterBottom>コストパフォーマンス</Typography>
          <Rating value={form.costPerformance} onChange={(_, val) => handleRatingChange('costPerformance', val)} />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography gutterBottom>手に入れやすさ</Typography>
          <Rating value={form.availability} onChange={(_, val) => handleRatingChange('availability', val)} />
        </Box>
      </Box>

      <Box mt={3}>
        <TextField
          fullWidth
          label="コメント"
          name="comment"
          multiline
          rows={4}
          value={form.comment}
          onChange={handleChange}
        />
      </Box>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSubmit}>
        投稿する
      </Button>
    </Box>
  );
};

export default function PostPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '24px' }}>
        <PostCardForm />
      </main>
    </>
  );
}
