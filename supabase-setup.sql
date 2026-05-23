-- ============================================
-- AI-STOCK - Script de création des tables
-- Base de données: Supabase (PostgreSQL)
-- ============================================

-- 1. Table des catégories d'outils IA
CREATE TABLE IF NOT EXISTS public.ai_tool_categorie (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table des outils IA
CREATE TABLE IF NOT EXISTS public.ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description_short TEXT,
  description_long TEXT,
  logo_url TEXT,
  ban_url TEXT,
  website_url TEXT,
  pricing VARCHAR(50) DEFAULT 'Non spécifié',
  categories TEXT[], -- Array de catégories
  is_featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table des formations
CREATE TABLE IF NOT EXISTS public.formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  level VARCHAR(50), -- Débutant, Intermédiaire, Avancé
  format VARCHAR(50), -- Vidéo, Texte, Interactif
  image_url TEXT,
  details_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  duration_hours INTEGER,
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table des publicités
CREATE TABLE IF NOT EXISTS public.ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table des prompts (à venir)
CREATE TABLE IF NOT EXISTS public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  is_premium BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Index pour améliorer les performances
-- ============================================

-- Index sur les slugs (recherche rapide)
CREATE INDEX IF NOT EXISTS idx_ai_tools_slug ON public.ai_tools(slug);
CREATE INDEX IF NOT EXISTS idx_ai_tool_categorie_slug ON public.ai_tool_categorie(slug);

-- Index sur is_featured (filtrage rapide)
CREATE INDEX IF NOT EXISTS idx_ai_tools_featured ON public.ai_tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_formations_featured ON public.formations(is_featured);

-- Index sur les catégories (recherche par catégorie)
CREATE INDEX IF NOT EXISTS idx_ai_tools_categories ON public.ai_tools USING GIN(categories);

-- Index sur created_at (tri par date)
CREATE INDEX IF NOT EXISTS idx_ai_tools_created_at ON public.ai_tools(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_formations_created_at ON public.formations(created_at DESC);

-- ============================================
-- Données de test (exemples)
-- ============================================

-- Catégories
INSERT INTO public.ai_tool_categorie (name, slug, description) VALUES
  ('Texte', 'texte', 'Outils de génération et traitement de texte'),
  ('Image', 'image', 'Génération et édition d''images'),
  ('Vidéo', 'video', 'Création et édition de vidéos'),
  ('Audio', 'audio', 'Génération de musique et voix'),
  ('Code', 'code', 'Assistance au développement'),
  ('Productivité', 'productivite', 'Outils de productivité'),
  ('Marketing', 'marketing', 'Outils marketing et SEO'),
  ('Design', 'design', 'Outils de design et création')
ON CONFLICT (slug) DO NOTHING;

-- Outils IA (exemples)
INSERT INTO public.ai_tools (name, slug, description_short, description_long, logo_url, website_url, pricing, categories, is_featured) VALUES
  (
    'ChatGPT',
    'chatgpt',
    'L''assistant IA le plus polyvalent pour la rédaction et le code.',
    'ChatGPT est un modèle de langage développé par OpenAI capable de comprendre et générer du texte de manière naturelle. Il peut vous aider dans de nombreuses tâches : rédaction, code, traduction, résumé, etc.',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    'https://chat.openai.com',
    'Freemium',
    ARRAY['Texte', 'Code', 'Productivité'],
    TRUE
  ),
  (
    'Midjourney',
    'midjourney',
    'Créez des images artistiques époustouflantes à partir de textes.',
    'Midjourney est un outil de génération d''images par IA qui transforme vos descriptions textuelles en œuvres d''art visuelles impressionnantes.',
    'https://cdn.worldvectorlogo.com/logos/midjourney.svg',
    'https://www.midjourney.com',
    'Payant',
    ARRAY['Image', 'Design'],
    TRUE
  ),
  (
    'Claude',
    'claude',
    'Une IA avancée avec une grande fenêtre de contexte.',
    'Claude est un assistant IA développé par Anthropic, connu pour sa capacité à traiter de longs documents et son ton naturel.',
    'https://www.anthropic.com/images/icons/claude-avatar.svg',
    'https://claude.ai',
    'Freemium',
    ARRAY['Texte', 'Code'],
    TRUE
  ),
  (
    'Perplexity',
    'perplexity',
    'Le moteur de recherche du futur assisté par l''IA.',
    'Perplexity combine la puissance de l''IA avec la recherche web pour fournir des réponses précises et sourcées.',
    'https://www.perplexity.ai/favicon.svg',
    'https://www.perplexity.ai',
    'Freemium',
    ARRAY['Productivité', 'Texte'],
    TRUE
  ),
  (
    'Suno AI',
    'suno-ai',
    'Générez des chansons complètes avec paroles et voix.',
    'Suno AI permet de créer des morceaux de musique complets avec paroles, mélodies et arrangements en quelques clics.',
    'https://www.suno.ai/favicon.ico',
    'https://www.suno.ai',
    'Freemium',
    ARRAY['Audio'],
    TRUE
  ),
  (
    'Leonardo AI',
    'leonardo-ai',
    'Plateforme complète pour la création d''assets visuels pro.',
    'Leonardo AI offre des outils puissants pour générer des images, textures et assets pour les jeux vidéo et projets créatifs.',
    'https://leonardo.ai/favicon.ico',
    'https://leonardo.ai',
    'Freemium',
    ARRAY['Image', 'Design'],
    TRUE
  )
ON CONFLICT (slug) DO NOTHING;

-- Formations (exemples)
INSERT INTO public.formations (title, description, level, format, is_featured, duration_hours, price) VALUES
  (
    'Maîtriser ChatGPT pour la productivité',
    'Apprenez à utiliser ChatGPT efficacement pour booster votre productivité quotidienne.',
    'Débutant',
    'Vidéo',
    TRUE,
    3,
    49.99
  ),
  (
    'Prompt Engineering avancé',
    'Devenez expert en création de prompts pour obtenir les meilleurs résultats.',
    'Avancé',
    'Vidéo',
    TRUE,
    5,
    99.99
  ),
  (
    'Créer des images avec Midjourney',
    'Guide complet pour créer des images professionnelles avec Midjourney.',
    'Intermédiaire',
    'Vidéo',
    TRUE,
    4,
    79.99
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- Fonctions de mise à jour automatique
-- ============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_ai_tools_updated_at BEFORE UPDATE ON public.ai_tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON public.formations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_tool_categorie_updated_at BEFORE UPDATE ON public.ai_tool_categorie
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Activer Row Level Security (RLS)
-- ============================================

ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tool_categorie ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Politique : Lecture publique pour tous
CREATE POLICY "Allow public read access" ON public.ai_tools FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.ai_tool_categorie FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.formations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.ads FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.prompts FOR SELECT USING (true);

-- ============================================
-- FIN DU SCRIPT
-- ============================================

-- Vérification
SELECT 'Tables créées avec succès!' AS status;
SELECT COUNT(*) AS nb_outils FROM public.ai_tools;
SELECT COUNT(*) AS nb_categories FROM public.ai_tool_categorie;
SELECT COUNT(*) AS nb_formations FROM public.formations;
