'use client';
import { supabase } from '@/lib/supabase';

export const LoginButton = () => {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  return <button onClick={handleLogin}>Googleでログイン</button>;
};
