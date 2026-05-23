# 🏗️ Architecture API-First - AI-STOCK

## 📋 Vue d'ensemble

AI-STOCK utilise maintenant une **architecture API-First** qui sépare clairement le backend (API REST) du frontend (UI).

## 🎯 Avantages

- ✅ **Scalabilité** : Backend et frontend peuvent évoluer indépendamment
- ✅ **Réutilisabilité** : Les APIs peuvent être consommées par web, mobile, partenaires
- ✅ **Type-safety** : Validation Zod + Types TypeScript partagés
- ✅ **Testabilité** : Chaque couche est testable indépendamment
- ✅ **Documentation** : Contrat d'API clair et documenté

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/v1/                    # 🔌 API REST (Backend)
│   │   ├── tools/                 # Endpoints outils IA
│   │   │   ├── route.ts           # GET /api/v1/tools (liste avec filtres)
│   │   │   ├── featured/          # GET /api/v1/tools/featured
│   │   │   ├── latest/            # GET /api/v1/tools/latest
│   │   │   └── [id]/              # GET /api/v1/tools/:id
│   │   ├── prompts/               # Endpoints prompts (à venir)
│   │   ├── trainings/             # Endpoints formations (à venir)
│   │   └── auth/                  # Endpoints authentification (à venir)
│   └── (routes)/                  # 🎨 Frontend (Pages)
│
├── lib/
│   ├── api-client/                # 📡 Client API type-safe
│   │   └── index.ts               # SDK pour consommer l'API
│   │
│   ├── schemas/                   # 📝 Validation Zod + Types
│   │   ├── tool.schema.ts         # Schémas pour les outils
│   │   └── api.schema.ts          # Schémas de réponse API
│   │
│   ├── services/business/         # 🧠 Business Logic
│   │   └── tool.service.ts        # Logique métier des outils
│   │
│   ├── repositories/              # 💾 Accès aux données
│   │   └── tool.repository.ts     # Repository Supabase
│   │
│   └── utils/                     # 🛠️ Utilitaires
│       └── api-response.ts        # Formatage des réponses API
```

---

## 🔄 Architecture en couches

### 1️⃣ **API Layer** (`app/api/v1/`)
- Endpoints REST
- Validation des requêtes
- Gestion des erreurs HTTP

### 2️⃣ **Business Logic Layer** (`lib/services/business/`)
- Règles métier
- Algorithmes de calcul
- Validation métier

**Exemples de Business Logic :**
```typescript
// Calcul de popularité
calculatePopularityScore(tool: AiTool): number

// Validation métier
canBeFeatured(tool: AiTool): boolean

// Génération de slug
generateSlug(name: string): string
```

### 3️⃣ **Repository Layer** (`lib/repositories/`)
- Accès aux données (Supabase)
- Requêtes SQL
- Pas de logique métier

### 4️⃣ **Schema Layer** (`lib/schemas/`)
- Validation Zod
- Types TypeScript
- Contrats de données

---

## 🚀 Utilisation

### Depuis le Frontend (Client API)

```typescript
import { apiClient } from '@/lib/api-client';

// Récupérer tous les outils avec filtres
const result = await apiClient.getTools({
  search: 'ChatGPT',
  categories: ['Texte', 'IA Générative'],
  pricing: ['Gratuit', 'Freemium'],
  page: 1,
  limit: 12,
});

// Récupérer les outils en vedette
const featured = await apiClient.getFeaturedTools(4);

// Récupérer un outil par slug
const tool = await apiClient.getToolBySlug('chatgpt');
```

### Depuis l'extérieur (API REST)

```bash
# Liste des outils avec filtres
GET /api/v1/tools?search=chatgpt&categories=Texte&page=1&limit=12

# Outils en vedette
GET /api/v1/tools/featured?limit=4

# Derniers outils
GET /api/v1/tools/latest?limit=8

# Outil spécifique
GET /api/v1/tools/chatgpt
```

---

## 📊 Format de réponse API

Toutes les réponses suivent ce format standardisé :

### ✅ Succès
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "v1"
  }
}
```

### ❌ Erreur
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Outil non trouvé",
    "details": { ... }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "v1"
  }
}
```

---

## 🧪 Exemples de Business Logic

### 1. Calcul de popularité
```typescript
calculatePopularityScore(tool: AiTool): number {
  let score = 0;
  if (tool.is_featured) score += 50;
  if (tool.pricing === 'Gratuit') score += 20;
  if (tool.description_long) score += 10;
  return score;
}
```

### 2. Validation métier
```typescript
canBeFeatured(tool: AiTool): boolean {
  return !!(
    tool.name &&
    tool.description_short &&
    tool.description_long &&
    tool.logo_url &&
    tool.categories?.length > 0
  );
}
```

### 3. Génération de slug
```typescript
generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-');
}
```

---

## 🔜 Prochaines étapes

1. ✅ **Phase 1 : Structure de base** (Terminé)
   - Architecture des dossiers
   - Schémas Zod
   - Types TypeScript

2. ✅ **Phase 2 : API Outils** (Terminé)
   - Business Logic
   - Endpoints REST
   - Client API

3. 🚧 **Phase 3 : Documentation**
   - OpenAPI/Swagger
   - Tests automatisés

4. 📋 **Phase 4 : Autres ressources**
   - API Prompts
   - API Formations
   - API Authentification

---

## 📚 Ressources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Documentation](https://zod.dev/)
- [API Design Best Practices](https://swagger.io/resources/articles/best-practices-in-api-design/)
