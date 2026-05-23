# 🚀 AI-STOCK - Plateforme d'Outils IA

Plateforme communautaire pour découvrir, partager et monétiser des outils, prompts, formations et workflows IA.

## 📋 Table des Matières

- [Design System](#-design-system)
- [Administration](#-administration)
- [Getting Started](#getting-started)
- [Structure du Projet](#-structure-du-projet)
- [Technologies](#-technologies)

---

## 🎨 Design System

**AI-STOCK utilise un Design System cohérent et moderne.**

- 📚 **Documentation complète** : Voir [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- 🚀 **Guide rapide** : Voir [QUICK_START.md](./QUICK_START.md)
- 🎨 **Couleur signature** : `#FFD11A` (Jaune AI-STOCK)
- 🧩 **Composants** : Boutons, Cards, Inputs, Badges, etc.
- ⚡ **Animations** : Transitions fluides et micro-interactions

**Classes utility principales :**
```jsx
// Bouton primaire
<button className="btn-primary">Rejoindre</button>

// Card standard
<div className="framer-card p-6">...</div>

// Input
<input className="input" />

// Badge
<span className="badge-success">Gratuit</span>
```

---

## 🎛️ Administration

**AI-STOCK dispose d'un système d'administration complet avec dashboard analytics, CRUD et génération de rapports.**

### 📊 Fonctionnalités Admin

- **Dashboard** : Vue d'ensemble avec KPIs et graphiques interactifs
- **Analytics** : Métriques avancées (MRR, CAC, LTV, Churn Rate)
- **Rapports** : Génération de rapports PDF personnalisés
- **CRUD Complet** : Formations, Prompts, Outils, Workflows
- **Gestion Utilisateurs** : Communauté et contributeurs
- **Paiements** : Transactions, revenus et commissions
- **Paramètres** : Configuration plateforme complète

### 📚 Documentation Admin

- 📖 **[ADMIN_README.md](./ADMIN_README.md)** - Documentation complète
- 🚀 **[ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)** - Guide de démarrage rapide
- ✅ **[ADMIN_SUMMARY.md](./ADMIN_SUMMARY.md)** - Récapitulatif des fonctionnalités
- 🧪 **[ADMIN_TEST.md](./ADMIN_TEST.md)** - Checklist de test

### 🎯 Accès Rapide

```bash
# Démarrer le serveur
npm run dev

# Accéder à l'admin
http://localhost:3000/admin/dashboard
```

**Pages disponibles :**
- `/admin/dashboard` - Tableau de bord principal
- `/admin/analytics` - Analytics avancées
- `/admin/trainings` - Gestion formations
- `/admin/prompts` - Gestion prompts
- `/admin/tools` - Gestion outils
- `/admin/users` - Gestion utilisateurs
- `/admin/payments` - Gestion paiements
- `/admin/reports` - Génération rapports
- `/admin/settings` - Paramètres

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📁 Structure du Projet

```
ai-stock/
├── src/
│   ├── app/
│   │   ├── admin/              # 🎛️ Administration
│   │   │   ├── dashboard/      # Dashboard principal
│   │   │   ├── analytics/      # Analytics avancées
│   │   │   ├── trainings/      # CRUD Formations
│   │   │   ├── prompts/        # CRUD Prompts
│   │   │   ├── tools/          # CRUD Outils
│   │   │   ├── users/          # Gestion utilisateurs
│   │   │   ├── payments/       # Gestion paiements
│   │   │   ├── reports/        # Génération rapports
│   │   │   └── settings/       # Paramètres
│   │   ├── api/                # API Routes
│   │   │   └── v1/
│   │   │       ├── trainings/  # API Formations
│   │   │       ├── prompts/    # API Prompts
│   │   │       └── tools/      # API Outils
│   │   └── (public)/           # Pages publiques
│   ├── components/
│   │   ├── admin/              # Composants admin
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── Charts/
│   │   └── ui/                 # Composants UI
│   └── lib/
│       ├── services/           # Services métier
│       └── utils/              # Utilitaires
├── DESIGN_SYSTEM.md            # 🎨 Design System
├── ADMIN_README.md             # 📖 Doc Admin complète
├── ADMIN_QUICK_START.md        # 🚀 Guide rapide Admin
├── ADMIN_SUMMARY.md            # ✅ Récapitulatif Admin
└── ADMIN_TEST.md               # 🧪 Tests Admin
```

## 🛠️ Technologies

### Frontend
- **Next.js 15** - Framework React
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling

### Admin & Analytics
- **Recharts** - Graphiques interactifs
- **Lucide React** - Icônes modernes
- **@tanstack/react-table** - Tables avancées
- **jsPDF** - Génération PDF
- **date-fns** - Gestion dates

### Backend
- **Next.js API Routes** - API REST
- **Prisma** - ORM (à configurer)
- **PostgreSQL** - Base de données (à configurer)

## 🎯 Roadmap

### ✅ Phase 1 - Admin (Complété)
- [x] Dashboard avec KPIs et graphiques
- [x] Analytics avancées
- [x] CRUD Formations, Prompts, Outils
- [x] Gestion utilisateurs et paiements
- [x] Système de rapports
- [x] Paramètres plateforme

### 🚧 Phase 2 - API & Backend (En cours)
- [ ] Connexion base de données
- [ ] Authentification (NextAuth.js)
- [ ] API endpoints complets
- [ ] Upload fichiers/images
- [ ] Génération PDF réelle

### 📅 Phase 3 - Frontend Public
- [ ] Page d'accueil
- [ ] Catalogue formations
- [ ] Marketplace prompts/workflows
- [ ] Profils utilisateurs
- [ ] Système de paiement (Stripe)

### 🔮 Phase 4 - Fonctionnalités Avancées
- [ ] Système de notifications
- [ ] Messagerie interne
- [ ] Système de reviews
- [ ] Recommandations IA
- [ ] Analytics utilisateurs

## 📝 License

MIT

## 👥 Équipe

Développé avec ❤️ par l'équipe AI-STOCK

---

**Pour plus d'informations, consultez la documentation dans les fichiers `ADMIN_*.md` !**
