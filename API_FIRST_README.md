# 🚀 AI-STOCK - Architecture API-First

> La plateforme référence francophone pour les outils IA, prompts, formations et workflows.

## 📋 Table des matières

- [Architecture](#-architecture)
- [Démarrage rapide](#-démarrage-rapide)
- [Structure du projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Migration](#-migration)
- [Technologies](#-technologies)

---

## 🏗️ Architecture

AI-STOCK utilise une **architecture API-First** moderne qui sépare le backend (API REST) du frontend (UI).

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Client)                         │
│  React Components → API Client (Type-safe SDK)              │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP Request
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                  API ROUTES (Next.js)                        │
│  /api/v1/tools, /api/v1/prompts, /api/v1/trainings         │
│  - Validation (Zod)                                         │
│  - Gestion des erreurs                                      │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────┐
│              BUSINESS LOGIC (Services)                       │
│  - Règles métier                                            │
│  - Calculs (popularité, scoring)                            │
│  - Validation métier                                        │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────┐
│              REPOSITORY (Data Access)                        │
│  - Requêtes Supabase                                        │
│  - Filtres, pagination                                      │
│  - CRUD operations                                          │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE                                  │
│  PostgreSQL Database                                         │
└─────────────────────────────────────────────────────────────┘
```

### Avantages

- ✅ **Sécurité** : API côté serveur, clés protégées
- ✅ **Validation** : Zod + TypeScript = Type-safety totale
- ✅ **Scalabilité** : Prêt pour mobile, partenaires, API publique
- ✅ **Maintenabilité** : Code organisé en couches
- ✅ **Testabilité** : Chaque couche testable indépendamment

---

## 🚀 Démarrage rapide

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-repo/ai-stock.git
cd ai-stock

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase

# Démarrer le serveur de développement
npm run dev
```

### Tester l'API

```bash
# Ouvrir dans le navigateur
http://localhost:3000/api/v1/tools
http://localhost:3000/api/v1/tools/featured?limit=4

# Ou avec curl
curl http://localhost:3000/api/v1/tools
```

---

## 📁 Structure du projet

```
ai-stock/
├── src/
│   ├── app/
│   │   ├── api/v1/              # 🔌 API REST (Backend)
│   │   │   ├── tools/           # Endpoints outils IA
│   │   │   ├── prompts/         # Endpoints prompts
│   │   │   ├── trainings/       # Endpoints formations
│   │   │   └── auth/            # Endpoints authentification
│   │   └── (routes)/            # 🎨 Pages (Frontend)
│   │
│   ├── lib/
│   │   ├── api-client/          # 📡 Client API type-safe
│   │   ├── schemas/             # 📝 Validation Zod
│   │   ├── services/business/   # 🧠 Business Logic
│   │   ├── repositories/        # 💾 Accès aux données
│   │   ├── supabase/            # 🗄️ Configuration Supabase
│   │   └── utils/               # 🛠️ Utilitaires
│   │
│   ├── components/              # 🎨 Composants React
│   ├── types/                   # 📘 Types TypeScript
│   └── styles/                  # 💅 Styles (CSS/SCSS)
│
├── public/                      # 📦 Assets statiques
├── ARCHITECTURE.md              # 📚 Documentation architecture
├── HARMONISATION.md             # 🔄 Intégration Supabase
├── MIGRATION_GUIDE.md           # 📖 Guide de migration
└── RECAP.md                     # 📋 Récapitulatif
```

---

## 📡 API Documentation

### Endpoints disponibles

#### Outils IA

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/v1/tools` | Liste des outils avec filtres |
| `GET` | `/api/v1/tools/featured` | Outils en vedette |
| `GET` | `/api/v1/tools/latest` | Derniers outils ajoutés |
| `GET` | `/api/v1/tools/:id` | Détails d'un outil |

### Exemples d'utilisation

#### Frontend (React)

```typescript
import { apiClient } from '@/lib/api-client';

// Liste avec filtres
const result = await apiClient.getTools({
  search: 'ChatGPT',
  categories: ['Texte', 'IA Générative'],
  pricing: ['Gratuit', 'Freemium'],
  page: 1,
  limit: 12,
});

// Outils en vedette
const featured = await apiClient.getFeaturedTools(4);

// Détails d'un outil
const tool = await apiClient.getToolBySlug('chatgpt');
```

#### API REST (externe)

```bash
# Liste des outils
GET /api/v1/tools?search=chatgpt&categories=Texte&page=1&limit=12

# Outils en vedette
GET /api/v1/tools/featured?limit=4

# Détails d'un outil
GET /api/v1/tools/chatgpt
```

### Format de réponse

```json
{
  "success": true,
  "data": {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 45,
      "totalPages": 4
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "v1"
  }
}
```

---

## 🔄 Migration

### Migrer un composant existant

#### Avant (Supabase direct)

```typescript
import { getFeaturedTools } from '@/lib/supabase/services/service';

const { data } = await getFeaturedTools(8);
```

#### Après (API Client)

```typescript
import { apiClient } from '@/lib/api-client';

const tools = await apiClient.getFeaturedTools(8);
```

### Guide complet

Consultez [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) pour un guide détaillé étape par étape.

---

## 🛠️ Technologies

### Frontend
- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Type-safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management

### Backend
- **Next.js API Routes** - API REST
- **Zod** - Validation de schémas
- **Supabase** - Base de données PostgreSQL
- **TypeScript** - Type-safety

### Design System
- **Couleur signature** : `#1aff79` (Vert AI-STOCK)
- **Composants** : Boutons, Cards, Inputs, Badges
- **Animations** : Transitions fluides et micro-interactions

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Architecture complète, structure, exemples |
| [HARMONISATION.md](./HARMONISATION.md) | Intégration avec Supabase, sécurité |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Guide de migration étape par étape |
| [RECAP.md](./RECAP.md) | Récapitulatif de l'implémentation |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Design System et composants |
| [QUICK_START.md](./QUICK_START.md) | Guide de démarrage rapide |

---

## 🎯 Roadmap

### ✅ Phase 1 : API Outils (Terminé)
- [x] Architecture API-First
- [x] Endpoints CRUD outils
- [x] Client API type-safe
- [x] Documentation

### 🔄 Phase 2 : Migration (En cours)
- [ ] Migrer les composants existants
- [ ] Tests automatisés
- [ ] OpenAPI/Swagger

### 📅 Phase 3 : Expansion
- [ ] API Prompts
- [ ] API Formations
- [ ] API Authentification
- [ ] API publique pour partenaires

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) pour comprendre l'architecture.

---

## 📄 Licence

MIT License - voir [LICENSE](./LICENSE)

---

## 🔗 Liens utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

---

**🚀 AI-STOCK - L'avenir de l'IA francophone commence ici !**
