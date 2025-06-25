'use client';
import { supabase, getImageUrl } from '@/lib/supabase';
import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import {
  Box, TextField, Typography, Button, Rating, MenuItem, Select, InputLabel, FormControl, InputAdornment
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const PostCardForm: React.FC = () => {
  const router = useRouter(); // ← 追加
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
    imageSrc: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;

    // 数値項目に対してマイナス値を防ぐ
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
          console.error('Image upload error object:', imageError);
          const msg = imageError.message || '画像アップロードに失敗しました';
          alert(`画像のアップロードに失敗しました: ${msg}`);
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
        console.error('Insert error:', insertError);
        alert(`投稿に失敗しました: ${insertError.message}\n詳細: ${insertError.details}`);
      } else {
        alert('投稿が完了しました！（画像付き）');
        setForm({
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
          imageSrc: null,
        });
        setImagePreview(null); // プレビューも初期化

        // ✅ ホームに遷移
        router.push('/home');
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
        <TextField
          label="内容量"
          name="volume"
          value={form.volume}
          onChange={handleChange}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">ml</InputAdornment>,
          }}
          inputProps={{
            step: 15,  // ← ここがポイント！
          }}
        />
        <TextField
          label="購入金額"
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">￥</InputAdornment>,
          }}
          inputProps={{
            step: 1000,  // ← ここがポイント！
          }}
        />

        <FormControl>
          <InputLabel>性別</InputLabel>
          <Select name="gender" value={form.gender} onChange={handleChange}>
            <MenuItem value="メンズ">メンズ</MenuItem>
            <MenuItem value="レディース">レディース</MenuItem>
            <MenuItem value="ユニセックス">ユニセックス</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>香りの種類</InputLabel>
          <Select name="scent" value={form.scent} onChange={handleChange}>
            <MenuItem value="シトラス">シトラス</MenuItem>
            <MenuItem value="フルーティ">フルーティ</MenuItem>
            <MenuItem value="フローラル">フローラル</MenuItem>
            <MenuItem value="シプレー">シプレー</MenuItem>
            <MenuItem value="オリエンタル">オリエンタル</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>香水タイプ</InputLabel>
          <Select name="smellType" value={form.smellType} onChange={handleChange}>
            <MenuItem value="P">P</MenuItem>
            <MenuItem value="EDP">EDP</MenuItem>
            <MenuItem value="EDT">EDT</MenuItem>
            <MenuItem value="EDC">EDC</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mt={3}>
        <Typography gutterBottom>画像を選択</Typography>
        <label htmlFor="image-upload">
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <Button variant="outlined" component="span">
            画像をアップロード
          </Button>
        </label>
        {imagePreview && (
          <Box mt={2}>
            <Image
              src={imagePreview}
              alt="プレビュー"
              width={200}
              height={200}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
            />
          </Box>
        )}
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
