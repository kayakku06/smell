'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

type Post = {
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const commentBoxHeight = isMobile ? '3em' : '4.5em'; // 常に固定高さにする

  const averageRating = ((costPerformance + longevity + accessibility) / 3).toFixed(1);

  return (
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        maxWidth: 1000,
        margin: 2,
        borderRadius: 3,
        boxShadow: 3,
        alignItems: 'stretch',
      }}
    >
      {imageSrc && (
        <Box
          sx={{
            width: '30%',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          >
            <Image
              src={imageSrc}
              alt={perfumeName}
              fill
              style={{
                objectFit: 'cover',
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              }}
            />
          </Box>
        </Box>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Typography variant="h6" fontWeight="bold">{perfumeName}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            ブランド: {brandName ?? '未設定'} / 内容量: {volume}ml
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
            <Typography variant="body2" fontWeight="bold">総合評価: {averageRating}</Typography>
            <Rating value={parseFloat(averageRating)} precision={0.1} readOnly />
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
            投稿日: {(() => {
              const date = new Date(created_at);
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');
              return `${month}/${day} ${hours}:${minutes}`;
            })()}
          </Typography>
        </CardContent>

        {/* コメント欄（高さ固定） */}
        <Box sx={{ padding: 2, borderTop: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            コメント
          </Typography>
          <Box
            sx={{
              height: commentBoxHeight,
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            <Typography variant="body2">
              {comment || 'コメントはまだありません。'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;
