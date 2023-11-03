import { createClient } from '@supabase/supabase-js';

const URL = 'https://iszoywbvjuyrofsgiopj.supabase.co';
const API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
console.log(API_KEY);

export const supabase = createClient(URL, API_KEY);
