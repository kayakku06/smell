// components/PostCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box, Rating, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

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
const PostCard: React.FC<Post> = ({
  id,
  perfumeName,
  brandName,
  volume,
  imageSrc,
  price,
  smellType,
  gender,
  scent,
  costPerformance,
  longevity,
  accessibility,
  created_at,
  comment,
}) => {
  const averageRating = ((costPerformance + longevity + accessibility) / 3).toFixed(1);

  return (
    <Card sx={{ display: 'flex', width: '100%', maxWidth: 1000, margin: 2, borderRadius: 3, boxShadow: 3 }}>
      {/* 画像 */}
      {imageSrc && (
        <Box sx={{ minWidth: 250, position: 'relative' }}>
          <Image
            src={imageSrc}
            alt={perfumeName}
            width={250}
            height={250}
            style={{ objectFit: 'cover', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
          />
        </Box>
      )}

      {/* 中央: 香水情報 */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold">{perfumeName}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          ブランド: {brandName ?? '未設定'} / 内容量: {volume}
        </Typography>
        <Typography variant="body2" mt={1}>
          匂い: {scent} / タイプ: {smellType ?? '未設定'} / 性別: {gender ?? '未設定'}
        </Typography>
        <Typography variant="body2" mt={1}>
          購入金額: {price ?? '未設定'}円
        </Typography>
        <Typography variant="body2" mt={1}>
          コスパ: {costPerformance} / 持続時間: {longevity} / 手に入れやすさ: {accessibility}
        </Typography>
        <Box mt={1}>
          <Typography variant="body2" fontWeight="bold">
            総合評価: {averageRating}
          </Typography>
          <Rating value={parseFloat(averageRating)} precision={0.1} readOnly />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
          投稿日: {created_at}
        </Typography>

      </CardContent>

      {/* 右側: コメント欄 */}
      <Box
        sx={{
          width: 250,
          padding: 2,
          borderLeft: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          コメント
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {comment || 'コメントはまだありません。'}
        </Typography>
      </Box>
    </Card>
  );
};

export default PostCard;
