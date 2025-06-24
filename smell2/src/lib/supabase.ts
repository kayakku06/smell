import { createClient } from '@supabase/supabase-js'


// 環境変数からSupabaseのURLとキーを取得（.envに設定済みである前提）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Supabaseクライアントの作成（アプリ全体で共通で使えるように）
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 画像URLの生成（別ファイルの処理内などで使用）
export const getImageUrl = (fileName: string) => {
  return `${supabaseUrl}/storage/v1/object/public/perfume-images/${fileName}`;
}
