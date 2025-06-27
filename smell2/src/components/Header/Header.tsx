'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handlePostClick = () => {
    router.push('/post');
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
        <Link href="/home" passHref>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            KaoList
          </Typography>
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
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogin}
                sx={{ textTransform: 'none' }}
              >
                ログイン・新規登録
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
