-- ============================================
-- UTILISATEURS DE TEST POUR AI-STOCK
-- ============================================
-- IMPORTANT : Exécute ce script dans le SQL Editor de Supabase
-- ============================================

-- ⚠️ ÉTAPE 1 : Créer les utilisateurs dans Supabase Auth Dashboard
-- Va dans Authentication > Users > Add User et crée ces 3 comptes :

-- 1. ADMIN
--    Email: admin@ai-stock.com
--    Password: Admin123!
--    ✅ Coche "Auto Confirm User"

-- 2. CONTRIBUTEUR
--    Email: contributor@ai-stock.com
--    Password: Contrib123!
--    ✅ Coche "Auto Confirm User"

-- 3. UTILISATEUR
--    Email: user@ai-stock.com
--    Password: User123!
--    ✅ Coche "Auto Confirm User"


-- ============================================
-- ⚠️ ÉTAPE 2 : Après avoir créé les comptes dans Auth Dashboard,
-- exécute ce script pour mettre à jour les rôles
-- ============================================

-- Mettre à jour le rôle ADMIN
UPDATE public.users 
SET 
  role = 'admin',
  subscription = 'Pro',
  user_name = 'Admin AI-STOCK',
  bio = 'Administrateur de la plateforme AI-STOCK',
  is_active = true
WHERE email = 'admin@ai-stock.com';

-- Mettre à jour le rôle CONTRIBUTEUR
UPDATE public.users 
SET 
  role = 'contributor',
  subscription = 'Premium',
  user_name = 'Contributeur Pro',
  bio = 'Créateur de contenu IA et formateur',
  is_active = true
WHERE email = 'contributor@ai-stock.com';

-- Mettre à jour le rôle UTILISATEUR (optionnel, déjà par défaut)
UPDATE public.users 
SET 
  role = 'user',
  subscription = 'Gratuit',
  user_name = 'Utilisateur Test',
  bio = 'Utilisateur standard de la plateforme',
  is_active = true
WHERE email = 'user@ai-stock.com';


-- ============================================
-- VÉRIFICATION
-- ============================================
-- Vérifie que tout est bien créé :
SELECT 
  u.email,
  u.user_name,
  u.role,
  u.subscription,
  u.is_active,
  u.created_at
FROM public.users u
WHERE u.email IN ('admin@ai-stock.com', 'contributor@ai-stock.com', 'user@ai-stock.com')
ORDER BY 
  CASE u.role 
    WHEN 'admin' THEN 1 
    WHEN 'contributor' THEN 2 
    WHEN 'user' THEN 3 
  END;


-- ============================================
-- SI LES PROFILS N'EXISTENT PAS (trigger n'a pas fonctionné)
-- ============================================
-- Exécute cette requête pour créer manuellement les profils :

INSERT INTO public.users (id, email, user_name, role, subscription, bio, is_active)
SELECT 
  au.id,
  au.email,
  CASE 
    WHEN au.email = 'admin@ai-stock.com' THEN 'Admin AI-STOCK'
    WHEN au.email = 'contributor@ai-stock.com' THEN 'Contributeur Pro'
    WHEN au.email = 'user@ai-stock.com' THEN 'Utilisateur Test'
    ELSE split_part(au.email, '@', 1)
  END,
  CASE 
    WHEN au.email = 'admin@ai-stock.com' THEN 'admin'
    WHEN au.email = 'contributor@ai-stock.com' THEN 'contributor'
    ELSE 'user'
  END,
  CASE 
    WHEN au.email = 'admin@ai-stock.com' THEN 'Pro'
    WHEN au.email = 'contributor@ai-stock.com' THEN 'Premium'
    ELSE 'Gratuit'
  END,
  CASE 
    WHEN au.email = 'admin@ai-stock.com' THEN 'Administrateur de la plateforme AI-STOCK'
    WHEN au.email = 'contributor@ai-stock.com' THEN 'Créateur de contenu IA et formateur'
    ELSE 'Utilisateur standard de la plateforme'
  END,
  true
FROM auth.users au
WHERE au.email IN ('admin@ai-stock.com', 'contributor@ai-stock.com', 'user@ai-stock.com')
  AND NOT EXISTS (SELECT 1 FROM public.users pu WHERE pu.id = au.id)
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- RÉSULTAT ATTENDU
-- ============================================
-- Tu devrais voir :
-- 
-- email                      | user_name         | role        | subscription | is_active
-- ---------------------------|-------------------|-------------|--------------|----------
-- admin@ai-stock.com         | Admin AI-STOCK    | admin       | Pro          | true
-- contributor@ai-stock.com   | Contributeur Pro  | contributor | Premium      | true
-- user@ai-stock.com          | Utilisateur Test  | user        | Gratuit      | true
