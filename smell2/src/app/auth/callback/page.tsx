'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finishLogin = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        // 認証失敗 → トップページへ戻す
        router.push('/');
      } else {
        // 認証成功 → /home に遷移
        router.push('/home');
      }
    };

    finishLogin();
  }, [router]);

  return <p>ログイン処理中...</p>;
}
