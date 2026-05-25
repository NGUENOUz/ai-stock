# 🚀 Guide Rapide - Créer les Utilisateurs de Test

## 📋 Étape 1 : Exécuter le Schéma Principal

1. Va dans **Supabase Dashboard**
2. Clique sur **SQL Editor** (icône </> dans le menu)
3. Copie-colle le contenu de `database/schema-complete.sql`
4. Clique sur **Run** (ou Ctrl+Enter)

✅ Cela crée toutes les tables nécessaires

---

## 👥 Étape 2 : Créer les 3 Comptes

Va dans **Authentication** → **Users** → **Add User**

### 🔴 Compte 1 - ADMIN
```
Email: admin@ai-stock.com
Password: Admin123!
☑️ Auto Confirm User
```
Clique sur **Create User**

### 🟡 Compte 2 - CONTRIBUTEUR
```
Email: contributor@ai-stock.com
Password: Contrib123!
☑️ Auto Confirm User
```
Clique sur **Create User**

### 🟢 Compte 3 - UTILISATEUR
```
Email: user@ai-stock.com
Password: User123!
☑️ Auto Confirm User
```
Clique sur **Create User**

---

## 🔧 Étape 3 : Attribuer les Rôles

Retourne dans **SQL Editor** et exécute :

```sql
-- Mettre à jour les rôles
UPDATE public.users 
SET role = 'admin', subscription = 'Pro', user_name = 'Admin AI-STOCK'
WHERE email = 'admin@ai-stock.com';

UPDATE public.users 
SET role = 'contributor', subscription = 'Premium', user_name = 'Contributeur Pro'
WHERE email = 'contributor@ai-stock.com';

UPDATE public.users 
SET role = 'user', subscription = 'Gratuit', user_name = 'Utilisateur Test'
WHERE email = 'user@ai-stock.com';
```

---

## ✅ Étape 4 : Vérifier

Exécute cette requête :

```sql
SELECT email, user_name, role, subscription 
FROM public.users 
WHERE email IN ('admin@ai-stock.com', 'contributor@ai-stock.com', 'user@ai-stock.com');
```

Tu devrais voir :

| email | user_name | role | subscription |
|-------|-----------|------|--------------|
| admin@ai-stock.com | Admin AI-STOCK | admin | Pro |
| contributor@ai-stock.com | Contributeur Pro | contributor | Premium |
| user@ai-stock.com | Utilisateur Test | user | Gratuit |

---

## 🎯 Étape 5 : Tester la Connexion

1. Lance ton serveur : `npm run dev`
2. Va sur `http://localhost:3000/login`
3. Connecte-toi avec :

**ADMIN** → Redirigé vers `/admin/dashboard`
```
Email: admin@ai-stock.com
Password: Admin123!
```

**CONTRIBUTEUR** → Redirigé vers `/dashboard`
```
Email: contributor@ai-stock.com
Password: Contrib123!
```

**UTILISATEUR** → Redirigé vers `/dashboard`
```
Email: user@ai-stock.com
Password: User123!
```

---

## 🐛 Si ça ne marche pas

### Problème : "Impossible de récupérer votre profil"

Le trigger n'a pas créé les profils automatiquement. Exécute :

```sql
INSERT INTO public.users (id, email, user_name, role, subscription)
SELECT 
  au.id,
  au.email,
  CASE 
    WHEN au.email = 'admin@ai-stock.com' THEN 'Admin AI-STOCK'
    WHEN au.email = 'contributor@ai-stock.com' THEN 'Contributeur Pro'
    ELSE 'Utilisateur Test'
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
  END
FROM auth.users au
WHERE au.email IN ('admin@ai-stock.com', 'contributor@ai-stock.com', 'user@ai-stock.com')
  AND NOT EXISTS (SELECT 1 FROM public.users pu WHERE pu.id = au.id);
```

### Problème : "Accès refusé à /admin"

Vérifie le rôle :
```sql
SELECT email, role FROM public.users WHERE email = 'admin@ai-stock.com';
```

Si le rôle n'est pas `admin`, force-le :
```sql
UPDATE public.users SET role = 'admin' WHERE email = 'admin@ai-stock.com';
```

Puis vide le cache du navigateur (F12 → Application → Clear storage) et reconnecte-toi.

---

## ✨ C'est tout !

Tu as maintenant 3 comptes de test avec des rôles différents pour tester toutes les fonctionnalités de ta plateforme.
