# 📋 CAHIER D'ANALYSE - AI-STOCK

## 🎯 Vue d'ensemble du projet

**AI-STOCK** est une plateforme communautaire SaaS permettant de découvrir, partager et monétiser des outils, prompts, formations et workflows IA.

### Objectifs principaux
- Marketplace d'outils et ressources IA
- Plateforme de formations en ligne
- Système de monétisation pour créateurs
- Communauté de partage de prompts et workflows

---

## 🏗️ Architecture Technique

### Stack Technologique

**Frontend**
- Next.js 16.2.6 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Turbopack (dev server)

**Backend**
- Next.js API Routes (REST API)
- Supabase (PostgreSQL)
- Architecture API-First

**Librairies**
- Recharts (graphiques)
- Lucide React (icônes)
- Zod (validation)
- date-fns (dates)
- jsPDF (rapports PDF)

### Architecture en Couches

```
Frontend (Pages/Components)
         ↓
API Client (src/lib/api-client)
         ↓
API Routes (src/app/api/v1)
         ↓
Services (src/lib/services/business)
         ↓
Repositories (src/lib/repositories)
         ↓
Supabase (PostgreSQL)
```

---

## 📁 Structure du Projet

```
ai-stock/
├── src/
│   ├── app/
│   │   ├── admin/                    # 🎛️ Interface d'administration
│   │   │   ├── dashboard/            # Dashboard KPIs
│   │   │   ├── analytics/            # Métriques avancées
│   │   │   ├── trainings/            # CRUD Formations
│   │   │   ├── prompts/              # CRUD Prompts
│   │   │   ├── tools/                # CRUD Outils
│   │   │   ├── users/                # Gestion utilisateurs
│   │   │   ├── payments/             # Gestion paiements
│   │   │   ├── reports/              # Génération rapports
│   │   │   └── settings/             # Paramètres
│   │   ├── api/v1/                   # 🔌 API REST
│   │   │   └── trainings/            # API Formations (COMPLET)
│   │   │       ├── route.ts          # GET /api/v1/trainings
│   │   │       ├── featured/         # GET /api/v1/trainings/featured
│   │   │       ├── latest/           # GET /api/v1/trainings/latest
│   │   │       └── [id]/             # GET /api/v1/trainings/:id
│   │   │           ├── route.ts      # Détails formation
│   │   │           └── lessons/      # Leçons
│   │   ├── formations/               # 📚 Pages formations (PUBLIC)
│   │   │   ├── page.tsx              # Liste formations
│   │   │   └── [id]/page.tsx         # Détails formation
│   │   └── globals.css               # Styles globaux
│   ├── components/
│   │   ├── admin/                    # Composants admin
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── Charts/
│   │   └── ui/                       # Composants UI réutilisables
│   └── lib/
│       ├── api-client/               # 🔗 Client API frontend
│       │   └── index.ts              # Méthodes API typées
│       ├── schemas/                  # 📝 Validation Zod
│       │   └── training.schema.ts
│       ├── repositories/             # 💾 Accès données
│       │   └── training.repository.ts
│       ├── services/business/        # 🧠 Logique métier
│       │   └── training.service.ts
│       ├── utils/                    # 🛠️ Utilitaires
│       │   └── api-response.ts
│       └── supabase.ts               # Configuration Supabase
├── trainings-setup.sql               # 🗄️ Schema SQL
├── DESIGN_SYSTEM.md                  # 🎨 Design System
├── ADMIN_README.md                   # 📖 Doc Admin
└── CAHIER_ANALYSE.md                 # 📋 Ce fichier
```

---

## 🎨 Design System

### Identité Visuelle

**Couleur Primaire**: `#FFD11A` (Jaune AI-STOCK)

**Palette**
```css
--color-primary: #FFD11A;
--color-primary-dark: #E6BC00;
--color-primary-light: #FFDC4D;
```

### Classes Utility Principales

```jsx
// Boutons
<button className="btn-primary">Action</button>
<button className="btn-secondary">Secondaire</button>

// Cards
<div className="framer-card p-6">Contenu</div>

// Inputs
<input className="input" />

// Badges
<span className="badge-success">Gratuit</span>
<span className="badge-warning">Premium</span>

// Typographie
<h1 className="font-black text-4xl">Titre</h1>
<p className="text-neutral-600">Corps de texte</p>
```

### Composants Standards
- Boutons (primary, secondary, ghost)
- Cards (framer-card avec hover effects)
- Inputs (avec focus states)
- Badges (success, warning, error, info)
- Animations (transitions fluides)

---

## 🗄️ Base de Données (Supabase)

### Tables Principales

#### `trainings`
```sql
- id (uuid, PK)
- title (text)
- shortdescription (text)
- description (text)
- imageurl (text)
- price (numeric)
- duration (text)
- level (text: beginner|intermediate|advanced)
- category (text)
- ispremium (boolean)
- instructor_id (uuid, FK)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `lessons`
```sql
- id (uuid, PK)
- training_id (uuid, FK)
- title (text)
- description (text)
- videourl (text)
- duration (text)
- order_index (integer)
- isfree (boolean)
- created_at (timestamp)
```

#### `instructors`
```sql
- id (uuid, PK)
- name (text)
- bio (text)
- avatarurl (text)
- expertise (text[])
- created_at (timestamp)
```

### Relations
- `trainings.instructor_id` → `instructors.id`
- `lessons.training_id` → `trainings.id`

---

## 🔌 API REST (v1)

### Endpoints Formations (COMPLETS)

#### `GET /api/v1/trainings`
Liste toutes les formations avec filtres et pagination

**Query Params**:
- `category` (string, optional)
- `level` (string, optional)
- `isPremium` (boolean, optional)
- `page` (number, default: 1)
- `limit` (number, default: 10)

**Response**:
```json
{
  "success": true,
  "data": {
    "trainings": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### `GET /api/v1/trainings/featured`
Formations mises en avant (max 6)

#### `GET /api/v1/trainings/latest`
Dernières formations (max 10)

#### `GET /api/v1/trainings/:id`
Détails d'une formation avec instructeur

#### `GET /api/v1/trainings/:id/lessons`
Liste des leçons d'une formation

#### `GET /api/v1/trainings/:id/lessons/:lessonId`
Détails d'une leçon spécifique

### Format de Réponse Standard

**Succès**:
```json
{
  "success": true,
  "data": { ... }
}
```

**Erreur**:
```json
{
  "success": false,
  "error": "Message d'erreur"
}
```

---

## 🧩 Composants Clés

### API Client (`src/lib/api-client/index.ts`)

Client TypeScript pour consommer l'API depuis le frontend.

**Méthodes disponibles**:
```typescript
apiClient.getTrainings(filters?)
apiClient.getFeaturedTrainings()
apiClient.getLatestTrainings()
apiClient.getTrainingById(id)
apiClient.getTrainingLessons(trainingId)
apiClient.getLessonById(trainingId, lessonId)
```

### Schemas Zod (`src/lib/schemas/training.schema.ts`)

Validation des données avec Zod.

**Schemas**:
- `TrainingSchema`
- `LessonSchema`
- `InstructorSchema`
- `TrainingFiltersSchema`
- `PaginationSchema`

### Repository (`src/lib/repositories/training.repository.ts`)

Accès direct à Supabase avec mapping des colonnes.

**Particularité**: Supabase retourne les colonnes en lowercase (`imageurl`, `shortdescription`), le repository mappe vers camelCase (`imageUrl`, `shortDescription`).

**Méthodes**:
- `findAll(filters)`
- `findById(id)`
- `findFeatured()`
- `findLatest()`
- `findLessonsByTrainingId(trainingId)`
- `findLessonById(trainingId, lessonId)`

### Service (`src/lib/services/business/training.service.ts`)

Logique métier et règles business.

**Méthodes**:
- `getTrainings(filters)`
- `getTrainingById(id)`
- `getFeaturedTrainings()`
- `getLatestTrainings()`
- `getTrainingLessons(trainingId)`
- `getLessonById(trainingId, lessonId)`
- `hasAccess(training, lesson, userId?)`
- `formatDuration(minutes)`

---

## ⚠️ Points Techniques Importants

### Next.js 15+ Async Params

**CRITIQUE**: Next.js 15+ requiert `await params` dans les routes et pages.

```typescript
// ❌ ANCIEN (ne fonctionne plus)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
}

// ✅ NOUVEAU (obligatoire)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
}
```

### Supabase .single() vs .maybeSingle()

**PROBLÈME**: `.single()` cause des erreurs "Cannot coerce the result to a single JSON object"

**SOLUTION**: Utiliser `.maybeSingle()` à la place

```typescript
// ❌ Erreur
const { data } = await supabase
  .from('trainings')
  .select('*')
  .eq('id', id)
  .single();

// ✅ Correct
const { data } = await supabase
  .from('trainings')
  .select('*')
  .eq('id', id)
  .maybeSingle();
```

### Mapping Colonnes Supabase

Supabase retourne les colonnes en lowercase, mapper vers camelCase:

```typescript
function mapTraining(row: any): Training {
  return {
    id: row.id,
    title: row.title,
    imageUrl: row.imageurl,           // ← mapping
    shortDescription: row.shortdescription, // ← mapping
    isPremium: row.ispremium,         // ← mapping
    // ...
  };
}
```

### Tailwind v4 Compatibility

**PROBLÈME**: `@apply` directives causent des erreurs avec Tailwind v4

**SOLUTION**: Remplacer par du CSS direct

```css
/* ❌ Ancien */
.btn-primary {
  @apply bg-primary text-black px-6 py-3;
}

/* ✅ Nouveau */
.btn-primary {
  background-color: var(--color-primary);
  color: black;
  padding: 0.75rem 1.5rem;
}
```

---

## 📊 État d'Avancement

### ✅ Phase 1 - Admin (COMPLET)
- [x] Dashboard avec KPIs
- [x] Analytics avancées (MRR, CAC, LTV, Churn)
- [x] CRUD Formations, Prompts, Outils
- [x] Gestion utilisateurs et paiements
- [x] Système de rapports PDF
- [x] Paramètres plateforme

### ✅ Phase 2 - API Formations (COMPLET)
- [x] Schema SQL Supabase
- [x] Schemas Zod validation
- [x] Repository layer
- [x] Service layer
- [x] 6 API endpoints REST
- [x] API Client frontend
- [x] Migration pages formations
- [x] Harmonisation Design System

### 🚧 Phase 3 - À Venir

**API Prompts & Outils**
- [ ] Schema SQL prompts/workflows/tools
- [ ] API endpoints prompts
- [ ] API endpoints workflows
- [ ] API endpoints tools
- [ ] Migration pages frontend

**Authentification**
- [ ] NextAuth.js setup
- [ ] Supabase Auth integration
- [ ] Protected routes
- [ ] User sessions

**Paiements**
- [ ] Stripe integration
- [ ] Webhooks paiements
- [ ] Gestion abonnements
- [ ] Système de commissions

**Features Avancées**
- [ ] Upload fichiers/images
- [ ] Système de reviews
- [ ] Notifications
- [ ] Messagerie interne
- [ ] Recommandations IA

---

## 🎯 Conventions de Code

### Naming
- **Fichiers**: camelCase pour composants, kebab-case pour utils
- **Composants**: PascalCase
- **Fonctions**: camelCase
- **Types**: PascalCase
- **Constantes**: UPPER_SNAKE_CASE

### Structure Fichiers
```typescript
// 1. Imports
import { ... } from '...';

// 2. Types/Interfaces
interface Props { ... }

// 3. Composant/Fonction principale
export default function Component() { ... }

// 4. Sous-composants (si nécessaire)
function SubComponent() { ... }
```

### API Routes
- Toujours retourner `{ success: true/false, data/error }`
- Utiliser `createSuccessResponse()` et `createErrorResponse()`
- Valider avec Zod schemas
- Gérer les erreurs avec try/catch

### Frontend
- Utiliser `'use client'` pour composants interactifs
- Gérer loading states
- Gérer error states
- Utiliser API Client (pas de fetch direct)

---

## 🔐 Variables d'Environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# NextAuth (à venir)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=xxx

# Stripe (à venir)
STRIPE_PUBLIC_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

## 🚀 Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Linter
npm run lint

# Accès admin
http://localhost:3000/admin/dashboard

# Accès formations
http://localhost:3000/formations
```

---

## 📚 Documentation Complémentaire

- **DESIGN_SYSTEM.md** - Design System complet
- **ADMIN_README.md** - Documentation admin détaillée
- **ADMIN_QUICK_START.md** - Guide rapide admin
- **ADMIN_SUMMARY.md** - Récapitulatif fonctionnalités
- **ADMIN_TEST.md** - Checklist de test
- **trainings-setup.sql** - Schema SQL formations

---

## 🎓 Exemples de Code

### Créer une nouvelle API Route

```typescript
// src/app/api/v1/prompts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promptService } from '@/lib/services/business/prompt.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/api-response';

export async function GET(req: NextRequest) {
  try {
    const prompts = await promptService.getPrompts();
    return NextResponse.json(createSuccessResponse(prompts));
  } catch (error) {
    return NextResponse.json(
      createErrorResponse('Erreur lors de la récupération des prompts'),
      { status: 500 }
    );
  }
}
```

### Créer un Repository

```typescript
// src/lib/repositories/prompt.repository.ts
import { supabase } from '@/lib/supabase';

export const promptRepository = {
  async findAll() {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  async findById(id: string) {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};
```

### Créer un Service

```typescript
// src/lib/services/business/prompt.service.ts
import { promptRepository } from '@/lib/repositories/prompt.repository';

export const promptService = {
  async getPrompts() {
    return await promptRepository.findAll();
  },
  
  async getPromptById(id: string) {
    const prompt = await promptRepository.findById(id);
    if (!prompt) throw new Error('Prompt non trouvé');
    return prompt;
  }
};
```

### Utiliser l'API Client

```typescript
// src/app/prompts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrompts() {
      try {
        const data = await apiClient.getPrompts();
        setPrompts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadPrompts();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {prompts.map(prompt => (
        <div key={prompt.id}>{prompt.title}</div>
      ))}
    </div>
  );
}
```

---

## 💡 Bonnes Pratiques

### Architecture
- ✅ Séparer les couches (API → Service → Repository)
- ✅ Valider avec Zod
- ✅ Typer avec TypeScript
- ✅ Utiliser l'API Client côté frontend

### Performance
- ✅ Pagination pour les listes
- ✅ Lazy loading images
- ✅ Caching avec React Query (à venir)
- ✅ Optimisation images Next.js

### Sécurité
- ✅ Validation inputs
- ✅ Sanitization données
- ✅ Protected routes (à venir)
- ✅ Rate limiting (à venir)

### UX
- ✅ Loading states
- ✅ Error handling
- ✅ Feedback utilisateur
- ✅ Responsive design

---

## 🐛 Problèmes Connus & Solutions

### 1. Async Params Next.js 15+
**Problème**: `params` est maintenant une Promise  
**Solution**: `const { id } = await params;`

### 2. Supabase .single() Error
**Problème**: "Cannot coerce the result to a single JSON object"  
**Solution**: Utiliser `.maybeSingle()` au lieu de `.single()`

### 3. Tailwind @apply Directives
**Problème**: Erreurs avec Tailwind v4  
**Solution**: Remplacer par du CSS direct

### 4. Colonnes Supabase Lowercase
**Problème**: `imageurl` au lieu de `imageUrl`  
**Solution**: Mapper dans le repository

---

## 📞 Contact & Support

Pour toute question sur le projet, consulter:
- README.md principal
- Documentation dans `/docs`
- Fichiers `ADMIN_*.md`

---

**Version**: 1.0  
**Dernière mise à jour**: Janvier 2025  
**Statut**: En développement actif
