-- ============================================
-- TABLES FORMATIONS (TRAININGS)
-- ============================================

-- Table des instructeurs
CREATE TABLE IF NOT EXISTS instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatarUrl TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des formations
CREATE TABLE IF NOT EXISTS trainings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  imageUrl TEXT,
  category TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'Français',
  price NUMERIC DEFAULT 0,
  durationMinutes INTEGER DEFAULT 0,
  numberOfVideos INTEGER DEFAULT 0,
  instructor_id UUID REFERENCES instructors(id),
  shortDescription TEXT,
  longDescription TEXT,
  isPremium BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des leçons
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  trainingId TEXT REFERENCES trainings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  isFreePreview BOOLEAN DEFAULT false,
  videoUrl TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_trainings_category ON trainings(category);
CREATE INDEX IF NOT EXISTS idx_trainings_language ON trainings(language);
CREATE INDEX IF NOT EXISTS idx_trainings_isPremium ON trainings(isPremium);
CREATE INDEX IF NOT EXISTS idx_trainings_is_featured ON trainings(is_featured);
CREATE INDEX IF NOT EXISTS idx_trainings_slug ON trainings(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_trainingId ON lessons(trainingId);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons("order");

-- ============================================
-- DONNÉES DE TEST
-- ============================================

-- Insertion des instructeurs avec UUID
INSERT INTO instructors (id, name, avatarUrl, bio) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Alex Dupont', 'https://i.pravatar.cc/150?img=1', 'Développeur Full Stack passionné et formateur avec plus de 10 ans d''expérience. Je crois que la meilleure façon d''apprendre est de construire de vrais projets.'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Jane Martin', 'https://i.pravatar.cc/150?img=2', 'Experte en design UI/UX et création de contenu visuel. Passionnée par l''enseignement et l''innovation digitale.')
ON CONFLICT (id) DO NOTHING;

-- Insertion des formations
INSERT INTO trainings (id, title, slug, imageUrl, category, language, price, durationMinutes, numberOfVideos, instructor_id, shortDescription, longDescription, isPremium, is_featured) VALUES
('t1', 'Maîtriser le Prompt Engineering — Niveau Expert', 'maitriser-prompt-engineering', 'https://picsum.photos/seed/t1/600/400', 'IA & Prompt', 'Français', 0, 180, 15, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Devenez autonome dans la conception de prompts puissants et efficaces.', 'Plongez dans l''art et la science de l''ingénierie des prompts. Ce cours de niveau expert vous mènera au-delà des bases pour vous apprendre à créer des requêtes nuancées, contextuelles et ultra-efficaces pour les modèles d''IA générative comme ChatGPT et Midjourney.', false, true),
('t2', 'SEO 2025 — Secrets de RankBrain', 'seo-2025-rankbrain', 'https://picsum.photos/seed/t2/600/400', 'Marketing', 'Français', 0, 120, 10, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Comprenez les nouveaux signaux de Google pour dominer les SERP.', 'Découvrez comment optimiser votre site pour les algorithmes de recherche modernes et améliorer votre positionnement sur Google.', false, false),
('t5', 'Photographie Aérienne — Drone Pro', 'photographie-aerienne-drone', 'https://picsum.photos/seed/t5/600/400', 'Création Vidéo', 'Français', 49, 240, 18, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Maîtrisez le pilotage et la post-production aérienne.', 'Devenez un maître de la prise de vue aérienne. Ce cours Premium couvre tout, du choix de l''équipement aux réglementations, en passant par les techniques cinématographiques avancées.', true, true),
('t9', 'Figma pour Designers UI/UX', 'figma-designers-ui-ux', 'https://picsum.photos/seed/t9/600/400', 'Développement Web', 'Anglais', 0, 140, 12, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Concevez des interfaces modernes et cohérentes.', 'Apprenez à utiliser Figma pour créer des designs professionnels et collaborer efficacement avec votre équipe.', false, false)
ON CONFLICT (id) DO NOTHING;

-- Insertion des leçons pour la formation t1 (Prompt Engineering)
INSERT INTO lessons (id, trainingId, title, duration, isFreePreview, videoUrl, "order") VALUES
('l1', 't1', 'Introduction au Prompt Engineering', '05:30', true, 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', 1),
('l2', 't1', 'Comprendre le Rôle et l''Audience', '12:00', false, 'https://www.youtube.com/embed/VIDEO_ID_2?rel=0', 2),
('l3', 't1', 'Les 5 Techniques Avancées de Cadrage', '20:15', false, 'https://www.youtube.com/embed/VIDEO_ID_3?rel=0', 3),
('l4', 't1', 'Workshop: Création de 10 Prompts Ciblés', '45:00', false, 'https://www.youtube.com/embed/VIDEO_ID_4?rel=0', 4)
ON CONFLICT (id) DO NOTHING;

-- Insertion des leçons pour la formation t2 (SEO)
INSERT INTO lessons (id, trainingId, title, duration, isFreePreview, videoUrl, "order") VALUES
('l5', 't2', 'Analyse sémantique (Module 1)', '15:00', true, 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', 1),
('l6', 't2', 'Optimisation On-Page pour Google', '18:30', false, 'https://www.youtube.com/embed/VIDEO_ID_6?rel=0', 2)
ON CONFLICT (id) DO NOTHING;

-- Insertion des leçons pour la formation t5 (Drone)
INSERT INTO lessons (id, trainingId, title, duration, isFreePreview, videoUrl, "order") VALUES
('l7', 't5', 'Introduction au pilotage de drone', '10:00', true, 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', 1),
('l8', 't5', 'Techniques de prise de vue aérienne', '25:00', false, 'https://www.youtube.com/embed/VIDEO_ID_8?rel=0', 2)
ON CONFLICT (id) DO NOTHING;

-- Insertion des leçons pour la formation t9 (Figma)
INSERT INTO lessons (id, trainingId, title, duration, isFreePreview, videoUrl, "order") VALUES
('l9', 't9', 'Premiers pas avec Figma', '08:00', true, 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', 1),
('l10', 't9', 'Créer des composants réutilisables', '15:00', false, 'https://www.youtube.com/embed/VIDEO_ID_10?rel=0', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- POLITIQUES RLS (Row Level Security)
-- ============================================

-- Activer RLS
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique pour les instructeurs
CREATE POLICY "Public read access for instructors" ON instructors
  FOR SELECT USING (true);

-- Politique de lecture publique pour les formations
CREATE POLICY "Public read access for trainings" ON trainings
  FOR SELECT USING (true);

-- Politique de lecture publique pour les leçons
CREATE POLICY "Public read access for lessons" ON lessons
  FOR SELECT USING (true);
