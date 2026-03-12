import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sztakzdurfdkbgloribw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dGFremR1cmZka2JnbG9yaWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTY4NTMsImV4cCI6MjA4NTY5Mjg1M30.yRygG3MJf2n3xXVLF4R52Ql5JioTtZpUcbABdcXNCL4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
