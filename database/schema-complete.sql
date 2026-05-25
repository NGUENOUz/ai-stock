-- ============================================
-- TABLES MANQUANTES POUR AI-STOCK
-- ============================================

-- 1. TABLE USERS (Utilisateurs avec rôles)
-- ============================================
CREATE TABLE public.users (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  user_name text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'contributor', 'admin')),
  subscription text NOT NULL DEFAULT 'Gratuit' CHECK (subscription IN ('Gratuit', 'Premium', 'Pro')),
  subscription_end_date date,
  avatar_url text,
  bio text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_subscription ON public.users(subscription);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 2. TABLE WORKFLOWS (Workflows IA)
-- ============================================
CREATE TABLE public.workflows (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content jsonb,
  category text,
  tags text[],
  author_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  price numeric DEFAULT 0,
  is_premium boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  downloads integer DEFAULT 0,
  thumbnail_url text,
  file_url text,
  platform text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT workflows_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_workflows_author ON public.workflows(author_id);
CREATE INDEX idx_workflows_category ON public.workflows(category);
CREATE INDEX idx_workflows_featured ON public.workflows(is_featured);

CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 3. TABLE PAYMENTS (Transactions)
-- ============================================
CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  currency text DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text,
  stripe_payment_id text UNIQUE,
  item_type text,
  item_id uuid,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payments_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_payments_user ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_created ON public.payments(created_at DESC);

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 4. TABLE REVIEWS (Avis utilisateurs)
-- ============================================
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_verified_purchase boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_unique_user_item UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX idx_reviews_item ON public.reviews(item_type, item_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 5. TABLE FAVORITES (Favoris utilisateurs)
-- ============================================
CREATE TABLE public.favorites (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT favorites_pkey PRIMARY KEY (id),
  CONSTRAINT favorites_unique_user_item UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_item ON public.favorites(item_type, item_id);


-- 6. TABLE PURCHASES (Achats utilisateurs)
-- ============================================
CREATE TABLE public.purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  payment_id uuid REFERENCES public.payments(id) ON DELETE SET NULL,
  price_paid numeric NOT NULL,
  access_expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT purchases_pkey PRIMARY KEY (id),
  CONSTRAINT purchases_unique_user_item UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX idx_purchases_user ON public.purchases(user_id);
CREATE INDEX idx_purchases_item ON public.purchases(item_type, item_id);


-- 7. TABLE NOTIFICATIONS (Notifications utilisateurs)
-- ============================================
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read);


-- 8. TABLE CONTRIBUTOR_REQUESTS (Demandes de statut contributeur)
-- ============================================
CREATE TABLE public.contributor_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  motivation text,
  portfolio_url text,
  reviewed_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contributor_requests_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_contributor_requests_user ON public.contributor_requests(user_id);
CREATE INDEX idx_contributor_requests_status ON public.contributor_requests(status);

CREATE TRIGGER update_contributor_requests_updated_at
  BEFORE UPDATE ON public.contributor_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- AJOUT DES COLONNES MANQUANTES AUX TABLES EXISTANTES
-- ============================================

ALTER TABLE public.prompts 
  ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS price numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS downloads integer DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_prompts_author ON public.prompts(author_id);

ALTER TABLE public.trainings 
  ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES public.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_trainings_author ON public.trainings(author_id);

ALTER TABLE public.ai_tools 
  ADD COLUMN IF NOT EXISTS submitted_by uuid REFERENCES public.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_ai_tools_submitted ON public.ai_tools(submitted_by);


-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributor_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Workflows are viewable by everyone" ON public.workflows
  FOR SELECT USING (is_active = true);

CREATE POLICY "Contributors can create workflows" ON public.workflows
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('contributor', 'admin'))
  );

CREATE POLICY "Authors can update their workflows" ON public.workflows
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their workflows" ON public.workflows
  FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- FONCTION POUR CRÉER AUTOMATIQUEMENT LE PROFIL USER
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, user_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'user_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
