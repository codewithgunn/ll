import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only initialize if we have the credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

if (!supabase) {
  console.warn('Supabase credentials are missing. Gift creation and sharing will not work. Check your .env.local file.');
}

export type GiftConfig = {
  type: 'letter' | 'fortune' | 'vinyl' | 'bouquet' | 'bottle' | 'package' | 'scratch' | 'cake';
  data: any; 
  sender?: string;
};
