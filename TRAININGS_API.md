# 📚 API Formations - Documentation

## 🎯 Vue d'ensemble

L'API Formations permet de gérer et récupérer les formations, leçons et instructeurs de la plateforme AI-STOCK.

---

## 📡 Endpoints disponibles

### 1. Liste des formations

**GET** `/api/v1/trainings`

Récupère toutes les formations avec filtres et pagination.

**Paramètres de requête :**
- `search` (string, optionnel) - Recherche dans le titre et la description
- `category` (string, optionnel) - Filtrer par catégorie
- `language` (string, optionnel) - Filtrer par langue
- `price` (enum: 'all' | 'free' | 'premium', optionnel) - Filtrer par prix
- `is_featured` (boolean, optionnel) - Formations en vedette
- `page` (number, défaut: 1) - Numéro de page
- `limit` (number, défaut: 12) - Nombre d'éléments par page
- `sort_by` (enum: 'created_at' | 'title' | 'price' | 'durationMinutes', optionnel)
- `sort_order` (enum: 'asc' | 'desc', optionnel)

**Exemple :**
```bash
GET /api/v1/trainings?category=IA%20%26%20Prompt&price=free&page=1&limit=12
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "t1",
        "title": "Maîtriser le Prompt Engineering",
        "category": "IA & Prompt",
        "language": "Français",
        "price": 0,
        "isPremium": false,
        "instructor": {
          "id": "instr1",
          "name": "Alex Dupont",
          "avatarUrl": "...",
          "bio": "..."
        },
        "lessons": [...]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 45,
      "totalPages": 4
    }
  }
}
```

---

### 2. Formations en vedette

**GET** `/api/v1/trainings/featured`

Récupère les formations mises en avant.

**Paramètres :**
- `limit` (number, défaut: 4) - Nombre de formations

**Exemple :**
```bash
GET /api/v1/trainings/featured?limit=4
```

---

### 3. Dernières formations

**GET** `/api/v1/trainings/latest`

Récupère les formations les plus récentes.

**Paramètres :**
- `limit` (number, défaut: 8) - Nombre de formations

**Exemple :**
```bash
GET /api/v1/trainings/latest?limit=8
```

---

### 4. Détails d'une formation

**GET** `/api/v1/trainings/:id`

Récupère les détails complets d'une formation.

**Exemple :**
```bash
GET /api/v1/trainings/t1
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "id": "t1",
    "title": "Maîtriser le Prompt Engineering",
    "shortDescription": "...",
    "longDescription": "...",
    "category": "IA & Prompt",
    "language": "Français",
    "price": 0,
    "durationMinutes": 180,
    "numberOfVideos": 15,
    "isPremium": false,
    "instructor": {
      "id": "instr1",
      "name": "Alex Dupont",
      "avatarUrl": "https://i.pravatar.cc/150?img=1",
      "bio": "..."
    },
    "lessons": [
      {
        "id": "l1",
        "title": "Introduction au Prompt Engineering",
        "duration": "05:30",
        "isFreePreview": true,
        "videoUrl": "...",
        "order": 1
      }
    ]
  }
}
```

---

### 5. Leçons d'une formation

**GET** `/api/v1/trainings/:id/lessons`

Récupère toutes les leçons d'une formation.

**Exemple :**
```bash
GET /api/v1/trainings/t1/lessons
```

---

### 6. Détails d'une leçon

**GET** `/api/v1/trainings/:id/lessons/:lessonId`

Récupère les détails d'une leçon spécifique.

**Exemple :**
```bash
GET /api/v1/trainings/t1/lessons/l1
```

---

## 💻 Utilisation Frontend

### Avec l'API Client (Recommandé)

```typescript
import { apiClient } from '@/lib/api-client';

// Liste avec filtres
const result = await apiClient.getTrainings({
  category: 'IA & Prompt',
  price: 'free',
  page: 1,
  limit: 12,
});

// Formations en vedette
const featured = await apiClient.getFeaturedTrainings(4);

// Détails d'une formation
const training = await apiClient.getTrainingById('t1');

// Leçons d'une formation
const lessons = await apiClient.getTrainingLessons('t1');

// Détail d'une leçon
const lesson = await apiClient.getLessonById('t1', 'l1');
```

---

## 🗄️ Structure de la base de données

### Table `trainings`
- `id` (TEXT, PK)
- `title` (TEXT)
- `slug` (TEXT, UNIQUE)
- `imageUrl` (TEXT)
- `category` (TEXT)
- `language` (TEXT)
- `price` (NUMERIC)
- `durationMinutes` (INTEGER)
- `numberOfVideos` (INTEGER)
- `instructor_id` (UUID, FK → instructors)
- `shortDescription` (TEXT)
- `longDescription` (TEXT)
- `isPremium` (BOOLEAN)
- `is_featured` (BOOLEAN)
- `created_at` (TIMESTAMP)

### Table `lessons`
- `id` (TEXT, PK)
- `trainingId` (TEXT, FK → trainings)
- `title` (TEXT)
- `duration` (TEXT)
- `isFreePreview` (BOOLEAN)
- `videoUrl` (TEXT)
- `order` (INTEGER)
- `created_at` (TIMESTAMP)

### Table `instructors`
- `id` (UUID, PK)
- `name` (TEXT)
- `avatarUrl` (TEXT)
- `bio` (TEXT)
- `created_at` (TIMESTAMP)

---

## 🚀 Installation des données de test

Exécute le fichier SQL dans Supabase :

```bash
# Copie le contenu de trainings-setup.sql
# Colle-le dans l'éditeur SQL de Supabase
# Exécute la requête
```

---

## ✅ Checklist Migration

- [x] Schémas Zod créés
- [x] Repository créé
- [x] Service métier créé
- [x] API Routes créées
- [x] API Client mis à jour
- [x] SQL de setup créé
- [ ] Pages migrées vers l'API
- [ ] Tests effectués

---

## 📝 Prochaines étapes

1. **Exécuter le SQL** dans Supabase pour créer les tables
2. **Tester les endpoints** avec Postman ou le navigateur
3. **Migrer les pages** pour utiliser l'API Client
4. **Ajouter l'authentification** pour les formations premium

---

**🎉 L'API Formations est prête !**
