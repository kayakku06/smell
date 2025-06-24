
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'djslushjjkesgpebpqac.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // 他の設定があればここに追加
};

export default nextConfig;