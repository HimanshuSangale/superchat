import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://fddntokkzunaftxjxhok.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZG50b2trenVuYWZ0eGp4aG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg1NzEsImV4cCI6MjA2MzM5NDU3MX0.ZM-7eu6vCAFLpeiv1gBuaUWvXA-tNC8ENAOWqWUAEG8"
);

// const { data, error } = await supabase.from("profiles").select("*");

export { supabase };
