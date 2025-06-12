'use client';

import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import {
  Box, TextField, Typography, Button, Rating, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';


const PostForm: React.FC = () => {
  const [form, setForm] = useState({
    author: '',
    perfumeName: '',
    brand: '',
    volume: '',
    price: '',
    type: '',
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

  const handleSubmit = () => {
    console.log('Submitting form:', form);
    // ここでAPI連携やバリデーション処理など
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>香水の投稿</Typography>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        <TextField label="投稿者" name="author" value={form.author} onChange={handleChange} />
        <TextField label="香水名" name="perfumeName" value={form.perfumeName} onChange={handleChange} />
        <TextField label="ブランド名" name="brand" value={form.brand} onChange={handleChange} />
        <TextField label="内容量" name="volume" value={form.volume} onChange={handleChange} />
        <TextField label="購入金額" name="price" value={form.price} onChange={handleChange} />
        
        <FormControl>
          <InputLabel>香水の種類</InputLabel>
          <Select name="type" value={form.type} onChange={handleChange}>
            <MenuItem value="EDT">EDT</MenuItem>
            <MenuItem value="EDP">EDP</MenuItem>
            <MenuItem value="香水">香水</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>性別</InputLabel>
          <Select name="gender" value={form.gender} onChange={handleChange}>
            <MenuItem value="男性">男性</MenuItem>
            <MenuItem value="女性">女性</MenuItem>
            <MenuItem value="ユニセックス">ユニセックス</MenuItem>
          </Select>
        </FormControl>

        <TextField label="香りの説明" name="scent" value={form.scent} onChange={handleChange} />
      </Box>

      <Box mt={4}>
        <Typography gutterBottom>匂いの持続</Typography>
        <Rating value={form.longevity} onChange={(_, val) => handleRatingChange('longevity', val)} />

        <Typography gutterBottom>コストパフォーマンス</Typography>
        <Rating value={form.costPerformance} onChange={(_, val) => handleRatingChange('costPerformance', val)} />

        <Typography gutterBottom>手に入れやすさ</Typography>
        <Rating value={form.availability} onChange={(_, val) => handleRatingChange('availability', val)} />
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
        <PostForm />
      </main>
    </>
  );
}