# 🔐 Guide de Configuration - Authentification AI-STOCK

## ✅ État Actuel

Tes pages **login** et **signup** sont **déjà connectées à Supabase** :
- ✅ Connexion Supabase configurée
- ✅ Store Zustand avec gestion des rôles
- ✅ Middleware de protection des routes
- ✅ Redirection automatique selon le rôle

---

## 📋 Étapes pour Créer les Utilisateurs de Test

### 1️⃣ Exécuter le Script SQL Principal

Va dans **Supabase Dashboard** → **SQL Editor** et exécute le fichier :
```
database/schema-complete.sql
```

Cela va créer :
- ✅ Table `users` avec les rôles
- ✅ Tables `workflows`, `payments`, `reviews`, etc.
- ✅ Trigger automatique pour créer le profil user
- ✅ Row Level Security (RLS)

---

### 2️⃣ Créer les Comptes dans Supabase Auth

Va dans **Supabase Dashboard** → **Authentication** → **Users** → **Add User**

Crée ces 3 comptes :

#### 🔴 ADMIN
```
Email: admin@ai-stock.com
Password: Admin123!
```

#### 🟡 CONTRIBUTEUR
```
Email: contributor@ai-stock.com
Password: Contrib123!
```

#### 🟢 UTILISATEUR
```
Email: user@ai-stock.com
Password: User123!
```

> ⚠️ **Important** : Coche "Auto Confirm User" pour chaque compte

---

### 3️⃣ Récupérer les UUID

Dans **SQL Editor**, exécute :
```sql
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 3;
```

Tu vas obtenir quelque chose comme :
```
id                                   | email
-------------------------------------|-------------------------
a1b2c3d4-...                        | user@ai-stock.com
e5f6g7h8-...                        | contributor@ai-stock.com
i9j0k1l2-...                        | admin@ai-stock.com
```

---

### 4️⃣ Mettre à Jour les Rôles

Ouvre `database/seed-users.sql` et remplace les UUID, puis exécute dans **SQL Editor**.

**OU** exécute directement (remplace les UUID) :

```sql
-- ADMIN
UPDATE public.users 
SET role = 'admin', subscription = 'Pro', user_name = 'Admin AI-STOCK'
WHERE email = 'admin@ai-stock.com';

-- CONTRIBUTEUR
UPDATE public.users 
SET role = 'contributor', subscription = 'Premium', user_name = 'Contributeur Pro'
WHERE email = 'contributor@ai-stock.com';

-- UTILISATEUR (déjà par défaut)
UPDATE public.users 
SET role = 'user', subscription = 'Gratuit', user_name = 'Utilisateur Test'
WHERE email = 'user@ai-stock.com';
```

---

### 5️⃣ Vérifier

```sql
SELECT email, user_name, role, subscription 
FROM public.users 
WHERE email IN ('admin@ai-stock.com', 'contributor@ai-stock.com', 'user@ai-stock.com');
```

---

## 🎯 Identifiants de Connexion

### 🔴 ADMIN (Accès complet)
```
Email: admin@ai-stock.com
Password: Admin123!
Redirection: /admin/dashboard
```

### 🟡 CONTRIBUTEUR (Publier du contenu)
```
Email: contributor@ai-stock.com
Password: Contrib123!
Redirection: /dashboard
```

### 🟢 UTILISATEUR (Accès standard)
```
Email: user@ai-stock.com
Password: User123!
Redirection: /dashboard
```

---

## 🧪 Tester l'Authentification

1. **Démarrer le serveur** :
   ```bash
   npm run dev
   ```

2. **Tester la connexion** :
   - Va sur `http://localhost:3000/login`
   - Connecte-toi avec `admin@ai-stock.com` / `Admin123!`
   - Tu devrais être redirigé vers `/admin/dashboard`

3. **Tester les rôles** :
   - Déconnecte-toi
   - Connecte-toi avec `user@ai-stock.com` / `User123!`
   - Essaie d'accéder à `/admin/dashboard` → tu seras redirigé vers `/dashboard`

---

## 🔒 Protection des Routes

Le middleware protège automatiquement :

| Route | Accès |
|-------|-------|
| `/admin/*` | Admin uniquement |
| `/dashboard` | Utilisateurs connectés |
| `/login`, `/signup` | Non connectés uniquement |
| `/`, `/formations`, `/prompt` | Public |

---

## 🐛 Dépannage

### Problème : "Impossible de récupérer votre profil"
**Solution** : Le trigger `handle_new_user()` n'a pas créé le profil automatiquement.
```sql
-- Créer manuellement le profil
INSERT INTO public.users (id, email, user_name, role)
SELECT id, email, split_part(email, '@', 1), 'user'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);
```

### Problème : "Accès refusé à /admin"
**Solution** : Vérifie que le rôle est bien `admin` :
```sql
SELECT email, role FROM public.users WHERE email = 'admin@ai-stock.com';
```

### Problème : "Session expirée"
**Solution** : Vide le localStorage et reconnecte-toi :
```javascript
// Dans la console du navigateur
localStorage.clear();
location.reload();
```

---

## 📊 Structure de la Base de Données

```
auth.users (Supabase Auth)
    ↓
public.users (Profils + Rôles)
    ↓
├── workflows (author_id)
├── prompts (author_id)
├── trainings (author_id)
├── payments (user_id)
├── reviews (user_id)
├── favorites (user_id)
└── notifications (user_id)
```

---

## 🚀 Prochaines Étapes

1. ✅ Créer les utilisateurs de test
2. ✅ Tester la connexion/inscription
3. ✅ Vérifier les redirections par rôle
4. 🔜 Créer le dashboard utilisateur
5. 🔜 Créer l'interface contributeur
6. 🔜 Ajouter Stripe pour les paiements

---

**Besoin d'aide ?** Vérifie les logs dans :
- Console navigateur (F12)
- Terminal Next.js
- Supabase Dashboard → Logs
