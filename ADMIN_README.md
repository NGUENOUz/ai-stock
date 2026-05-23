# 🎛️ Administration AI-STOCK

## 📋 Vue d'ensemble

Système d'administration complet pour gérer la plateforme AI-STOCK avec dashboard analytics, CRUD complet et génération de rapports.

## 🚀 Accès

**URL:** `/admin/dashboard`

## 📊 Fonctionnalités

### 1. Dashboard Principal (`/admin/dashboard`)
- **KPIs en temps réel** : Revenus, utilisateurs actifs, formations, taux de conversion
- **Graphiques interactifs** :
  - Évolution revenus & ventes (7 jours)
  - Top contributeurs (classement)
  - Répartition par catégorie (pie chart)
- **Activités récentes** : Dernières actions utilisateurs
- **Stats rapides** : Vues, téléchargements, engagement
- **Export PDF** : Génération de rapports

### 2. Analytics Avancées (`/admin/analytics`)
- **Métriques business** :
  - MRR (Monthly Recurring Revenue)
  - CAC (Customer Acquisition Cost)
  - LTV (Lifetime Value)
  - Churn Rate
- **Graphiques** :
  - Croissance utilisateurs (7 mois)
  - Ventes par catégorie
  - Tunnel de conversion
  - Métriques clés avec barres de progression
- **Filtres temporels** : 7j, 30j, 90j, 1 an

### 3. Gestion Formations (`/admin/trainings`)
- **Liste complète** avec filtres (catégorie, recherche)
- **Création** : Formulaire complet avec upload média
- **Édition** : Modification de toutes les propriétés
- **Suppression** : Avec confirmation
- **Colonnes** :
  - Titre, catégorie, niveau
  - Prix, nombre d'étudiants
  - Statut (publié/brouillon)
  - Actions (voir, éditer, supprimer)

### 4. Gestion Prompts (`/admin/prompts`)
- **Vue en grille** : Cards avec preview
- **Création/Édition** : Formulaire avec tags
- **Informations** :
  - Titre, catégorie, tags
  - Prix, téléchargements
  - Statut publication
- **Actions** : Copier, éditer, supprimer

### 5. Gestion Outils (`/admin/tools`)
- **Liste tableau** avec recherche
- **Informations** :
  - Nom, logo, URL externe
  - Catégorie, tarification
  - Nombre de vues
  - Statut
- **Badges tarification** : Gratuit, Freemium, Payant

### 6. Gestion Utilisateurs (`/admin/users`)
- **Stats globales** :
  - Total utilisateurs
  - Utilisateurs actifs
  - Contributeurs
  - Nouveaux (30j)
- **Filtres** : Rôle (user, contributor, admin)
- **Colonnes** :
  - Nom, email, avatar
  - Rôle avec badge
  - Statut (actif/inactif)
  - Date inscription
  - Achats & montant dépensé
- **Actions** : Email, menu options

### 7. Gestion Paiements (`/admin/payments`)
- **Stats financières** :
  - Revenus total
  - Montant en attente
  - Nombre de transactions
  - Échecs
- **Filtres** : Statut (réussi, en attente, échoué, remboursé)
- **Colonnes** :
  - ID transaction
  - Utilisateur, article
  - Montant, méthode (Stripe/PayPal)
  - Statut avec icône
  - Date & heure
- **Export** : Téléchargement des données

## 🎨 Design System

### Couleurs
- **Primary** : `#FFD11A` (Jaune AI-STOCK)
- **Success** : `#10B981` (Vert)
- **Error** : `#EF4444` (Rouge)
- **Info** : `#3B82F6` (Bleu)
- **Warning** : `#F59E0B` (Orange)
- **Purple** : `#8B5CF6` (Violet)

### Composants
- **StatsCard** : Cartes KPIs avec icône et trend
- **RevenueChart** : Graphique aire revenus/ventes
- **TopContributorsChart** : Graphique barres contributeurs
- **CategoryDistribution** : Graphique camembert catégories
- **AdminSidebar** : Navigation latérale
- **AdminHeader** : Barre supérieure avec recherche

### Layout
- **Sidebar fixe** : 256px (w-64)
- **Header fixe** : 64px (h-16)
- **Content** : Padding 24px (p-6)
- **Responsive** : Mobile-first avec breakpoints

## 📦 Technologies

### Frontend
- **Next.js 15** : App Router
- **React 19** : Composants client
- **TypeScript** : Typage strict
- **Tailwind CSS** : Styling

### Graphiques
- **Recharts** : Bibliothèque de graphiques
  - AreaChart (revenus)
  - BarChart (contributeurs, conversion)
  - PieChart (catégories)
  - LineChart (croissance)

### Icônes
- **Lucide React** : Icônes modernes

### Tables
- **@tanstack/react-table** : Tables avancées (à implémenter)

### PDF
- **jsPDF** : Génération de rapports (à implémenter)
- **html2canvas** : Capture d'écran (à implémenter)

## 🔧 Installation

```bash
# Dépendances déjà installées
npm install recharts lucide-react @tanstack/react-table jspdf html2canvas date-fns
```

## 📁 Structure

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx              # Layout admin
│       ├── page.tsx                # Redirect → dashboard
│       ├── dashboard/
│       │   └── page.tsx            # Dashboard principal
│       ├── analytics/
│       │   └── page.tsx            # Analytics avancées
│       ├── trainings/
│       │   ├── page.tsx            # Liste formations
│       │   ├── new/
│       │   │   └── page.tsx        # Créer formation
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx    # Éditer formation
│       ├── prompts/
│       │   ├── page.tsx            # Liste prompts
│       │   └── new/
│       │       └── page.tsx        # Créer prompt
│       ├── tools/
│       │   ├── page.tsx            # Liste outils
│       │   └── new/
│       │       └── page.tsx        # Créer outil
│       ├── users/
│       │   └── page.tsx            # Gestion utilisateurs
│       └── payments/
│           └── page.tsx            # Gestion paiements
└── components/
    └── admin/
        ├── AdminSidebar.tsx        # Navigation latérale
        ├── AdminHeader.tsx         # Barre supérieure
        ├── StatsCard.tsx           # Carte KPI
        ├── RevenueChart.tsx        # Graphique revenus
        ├── TopContributorsChart.tsx # Graphique contributeurs
        └── CategoryDistribution.tsx # Graphique catégories
```

## 🎯 Prochaines Étapes

### Phase 1 - Complétude CRUD
- [ ] Formulaire création prompts
- [ ] Formulaire création outils
- [ ] Formulaire édition formations
- [ ] API endpoints manquants

### Phase 2 - Fonctionnalités Avancées
- [ ] Génération PDF rapports
- [ ] Export Excel/CSV
- [ ] Upload images/fichiers
- [ ] Éditeur de texte riche (TipTap/Slate)
- [ ] Gestion des modules de formation

### Phase 3 - Analytics Avancées
- [ ] Graphiques temps réel
- [ ] Filtres de dates personnalisés
- [ ] Comparaison périodes
- [ ] Prévisions (forecasting)
- [ ] Heatmaps activité

### Phase 4 - Business Features
- [ ] Gestion commissions contributeurs
- [ ] Système de notifications
- [ ] Campagnes marketing
- [ ] Codes promo
- [ ] Gestion des remboursements

### Phase 5 - Système
- [ ] Logs d'audit
- [ ] Gestion des rôles/permissions
- [ ] Configuration plateforme
- [ ] Intégrations (Stripe, SendGrid)
- [ ] Backup & restore

## 🔐 Sécurité

### À Implémenter
- [ ] Authentification admin (NextAuth.js)
- [ ] Middleware de protection routes
- [ ] Vérification des permissions
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Logs des actions sensibles

## 📊 Données Mockées

Actuellement, toutes les pages utilisent des données mockées pour la démo. À remplacer par :
- Appels API réels (`/api/v1/...`)
- Connexion base de données
- Gestion d'état (React Query/SWR)

## 🎨 Personnalisation

### Modifier les couleurs
Éditer `tailwind.config.ts` :
```ts
colors: {
  primary: '#FFD11A', // Votre couleur
}
```

### Ajouter un graphique
```tsx
import { LineChart, Line } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={yourData}>
    <Line dataKey="value" stroke="#FFD11A" />
  </LineChart>
</ResponsiveContainer>
```

## 🐛 Debug

### Problèmes courants
1. **Graphiques ne s'affichent pas** : Vérifier que `recharts` est installé
2. **Icônes manquantes** : Importer depuis `lucide-react`
3. **Styles cassés** : Vérifier Tailwind config

## 📝 Notes

- Design responsive mobile-first
- Animations fluides (transitions)
- Accessibilité (ARIA labels)
- Performance optimisée
- Code TypeScript strict

---

**Créé avec ❤️ pour AI-STOCK**
