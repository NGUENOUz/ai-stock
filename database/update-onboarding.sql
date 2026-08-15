-- Migration: Ajout des champs d'Onboarding à la table users
-- Date: 2026-08-14

ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS job_title text,
  ADD COLUMN IF NOT EXISTS company text,
  ADD COLUMN IF NOT EXISTS interests text[],
  ADD COLUMN IF NOT EXISTS experience_level text CHECK (experience_level IN ('Debutant', 'Intermediaire', 'Avance', 'Expert')),
  ADD COLUMN IF NOT EXISTS goals text[],
  ADD COLUMN IF NOT EXISTS xp_points integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level_title text DEFAULT 'Novice';

-- Index pour accélérer les recommandations basées sur les intérêts
CREATE INDEX IF NOT EXISTS idx_users_interests ON public.users USING GIN (interests);
CREATE INDEX IF NOT EXISTS idx_users_experience ON public.users(experience_level);
