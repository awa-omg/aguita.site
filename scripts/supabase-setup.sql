-- ============================================
-- Supabase SQL for ncmpcpp Now Playing
-- ============================================
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/fpnndflqpwgxbhjbtaas/sql-editor

-- Create now_playing table
CREATE TABLE IF NOT EXISTS now_playing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    duration INTEGER,
    position INTEGER,
    cover_base64 TEXT,
    is_playing BOOLEAN DEFAULT true,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    listen_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime
ALTER TABLE now_playing REPLICA IDENTITY FULL;

-- Create RLS policies
ALTER TABLE now_playing ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Anyone can read now_playing" ON now_playing
    FOR SELECT USING (true);

-- Allow service role to write (your Termux script)
CREATE POLICY "Service role can write now_playing" ON now_playing
    FOR ALL USING (false) WITH CHECK (false);

-- Create index for faster queries
CREATE INDEX idx_now_playing_updated_at ON now_playing(updated_at DESC);

-- ============================================
-- Environment Variables for Vercel
-- ============================================
-- Add these to your Vercel project settings:
-- NEXT_PUBLIC_SUPABASE_URL = https://fpnndflqpwgxbhjbtaas.supabase.co
-- NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbm5kZmxxcHdneGJoamJ0YWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjcxOTgsImV4cCI6MjA5NjcwMzE5OH0.JRBKlUBdYQBCNGCaEy5pO0836AU54zY_Y5t7GtiW4g8
