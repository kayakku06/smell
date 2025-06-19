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
  perfumeType?: string;
  gender?: string;
  scent: string;
  costPerformance: number;
  longevity: number;
  accessibility: number;
  postedAt: string;
};

const PostCard: React.FC<Post> = ({
  id,
  perfumeName,
  brandName,
  volume,
  imageSrc,
  price,
  perfumeType,
  gender,
  scent,
  costPerformance,
  longevity,
  accessibility,
  postedAt,
}) => {
  const averageRating = ((costPerformance + longevity + accessibility) / 3).toFixed(1);

  return (
    <Card sx={{ display: 'flex', width: '100%', maxWidth: 800, margin: 2, borderRadius: 3, boxShadow: 3 }}>
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
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold">{perfumeName}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          ブランド: {brandName ?? '未設定'} / 内容量: {volume}
        </Typography>
        <Typography variant="body2" mt={1}>
          匂い: {scent} / タイプ: {perfumeType ?? '未設定'} / 性別: {gender ?? '未設定'}
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
          投稿日: {postedAt}
        </Typography>
        <Box mt={2}>
          <Link href={`/detail/${id}`} passHref>
            <Button variant="outlined" fullWidth>
              詳細を見る
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
