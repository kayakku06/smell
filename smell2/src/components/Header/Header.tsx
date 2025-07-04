'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handlePostClick = async () => {
    if (!user) {
      await handleLogin(); // 未ログインならGoogleログインへ誘導
    } else {
      router.push('/post');
    }
  };


  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f8f4f0', color: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/home">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              width: '40%',
            }}
          >
            <Image
              src="/pictures/logo.png"
              alt="KaoList Logo"
              width={300}
              height={100}
              style={{ width: '500%', height: '100px', objectFit: 'contain' }}
            />
          </Box>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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

          {user ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              ログアウト
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogin}
              sx={{ textTransform: 'none' }}
            >
              ログイン・新規登録
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
