'use client';

import { supabase, getImageUrl } from '@/lib/supabase';
import React, { useState } from 'react';
import {
  Box, TextField, Typography, Button, Rating, MenuItem, Select,
  InputLabel, FormControl,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PostPageClient: React.FC = () => {
  const router = useRouter();
 

  const [form, setForm] = useState({
    perfumeName: '', brandName: '', volume: '', price: '', smellType: '', gender: '', scent: '',
    longevity: 0, costPerformance: 0, availability: 0, comment: '', imageSrc: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    if ((name === 'price' || name === 'volume') && parseInt(value) < 0) {
      setForm(prev => ({ ...prev, [name]: '0' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRatingChange = (name: string, value: number | null) => {
    setForm(prev => ({ ...prev, [name]: value ?? 0 }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, imageSrc: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const volume = parseInt(form.volume, 10);
      const price = parseInt(form.price, 10);

      if (isNaN(volume) || isNaN(price)) {
        alert('内容量や価格は数値で入力してください。');
        return;
      }

      let uploadedImageUrl = '';
      if (form.imageSrc) {
        const fileExt = form.imageSrc.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: imageError } = await supabase
          .storage
          .from('perfume-images')
          .upload(filePath, form.imageSrc);

        if (imageError) {
          alert(`画像のアップロードに失敗しました: ${imageError.message}`);
          return;
        }

        uploadedImageUrl = getImageUrl(filePath);
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
        accessibility: form.availability ?? 0,
        comment: form.comment,
        imageSrc: uploadedImageUrl || null,
      };

      const { error: insertError } = await supabase.from('post').insert([insertData]);
      if (insertError) {
        alert(`投稿に失敗しました: ${insertError.message}`);
      } else {
        alert('投稿が完了しました！');
        router.push('/home');
      }
    } catch {
      alert('投稿中にエラーが発生しました');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>香水の投稿</Typography>

      <Box
        display="grid"
        gap={4}
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)'
          }
        }}
      >
        <TextField size="small" label="香水名" name="perfumeName" value={form.perfumeName} onChange={handleChange} />
        <TextField size="small" label="ブランド名" name="brandName" value={form.brandName} onChange={handleChange} />
        <TextField size="small" label="内容量" name="volume" type="number" value={form.volume} onChange={handleChange} />
        <TextField size="small" label="価格" name="price" type="number" value={form.price} onChange={handleChange} />
        <FormControl size="small"><InputLabel>性別</InputLabel>
          <Select name="gender" value={form.gender} onChange={handleChange}>
            <MenuItem value="メンズ">メンズ</MenuItem>
            <MenuItem value="レディース">レディース</MenuItem>
            <MenuItem value="ユニセックス">ユニセックス</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small"><InputLabel>香りの種類</InputLabel>
          <Select name="scent" value={form.scent} onChange={handleChange}>
            <MenuItem value="シトラス">シトラス</MenuItem>
            <MenuItem value="フローラル">フローラル</MenuItem>
            <MenuItem value="フルーティ">フルーティ</MenuItem>
            <MenuItem value="シプレ">シプレ</MenuItem>
            <MenuItem value="オリエンタル">オリエンタル</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small"><InputLabel>香水タイプ</InputLabel>
          <Select name="smellType" value={form.smellType} onChange={handleChange}>
            <MenuItem value="P">P</MenuItem>
            <MenuItem value="EDP">EDP</MenuItem>
            <MenuItem value="EDT">EDT</MenuItem>
            <MenuItem value="EDC">EDC</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mt={3}>
        <Typography gutterBottom>画像アップロード</Typography>
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 2,
            textAlign: 'center',
            backgroundColor: '#fafafa',
            cursor: 'pointer',
            position: 'relative',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
          onClick={() => {
            if (!imagePreview) document.getElementById('image-upload')?.click();
          }}
        >
          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                style={{ objectFit: 'cover', borderRadius: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
              />
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagePreview(null);
                  setForm((prev) => ({ ...prev, imageSrc: null }));
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  minWidth: 0,
                  padding: '4px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: '50%',
                  color: '#333',
                  '&:hover': { backgroundColor: '#fdd', color: '#c00' },
                }}
              >✕</Button>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              画像を投稿
            </Typography>
          )}
        </Box>
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
      </Box>

      <Box mt={3} sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        gap: 4
      }}>
        <Box minWidth={160}>
          <Typography noWrap>匂いの持続</Typography>
          <Rating value={form.longevity} precision={0.5} onChange={(_, v) => handleRatingChange('longevity', v)} />
        </Box>
        <Box minWidth={160}>
          <Typography noWrap>コスパ</Typography>
          <Rating value={form.costPerformance} precision={0.5} onChange={(_, v) => handleRatingChange('costPerformance', v)} />
        </Box>
        <Box minWidth={160}>
          <Typography noWrap>手に入りやすさ</Typography>
          <Rating value={form.availability} precision={0.5} onChange={(_, v) => handleRatingChange('availability', v)} />
        </Box>
      </Box>

      <Box mt={3}>
        <TextField
          fullWidth
          label="コメント"
          name="comment"
          multiline
          rows={3}
          value={form.comment}
          onChange={handleChange}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" onClick={handleSubmit}>投稿する</Button>
      </Box>
    </Box>
  );
};

export default PostPageClient;
