import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://hsdtlmycrajelwnoarcz.supabase.co';
const supabaseKey = 'sb_publishable_T0FhXWb82PIF1nSzGwGKqQ_khPcnkMA';

export const supabase = createClient(supabaseUrl, supabaseKey);


   