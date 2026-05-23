# 🛠️ Commandes Utiles - AI-STOCK

## 🚀 Développement

### Démarrer le serveur
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### Build production
```bash
npm run build
npm run start
```

### Linter
```bash
npm run lint
```

## 📦 Installation

### Installer les dépendances
```bash
npm install
```

### Installer une nouvelle dépendance
```bash
npm install <package-name>
```

### Dépendances Admin déjà installées
```bash
npm install recharts lucide-react @tanstack/react-table jspdf html2canvas date-fns
```

## 🎨 Tailwind CSS

### Rebuild Tailwind
```bash
# Automatique avec npm run dev
npm run dev
```

### Purge CSS (production)
```bash
npm run build
```

## 🗄️ Base de Données (à configurer)

### Prisma
```bash
# Initialiser Prisma
npx prisma init

# Créer une migration
npx prisma migrate dev --name init

# Générer le client
npx prisma generate

# Ouvrir Prisma Studio
npx prisma studio
```

## 🧪 Tests (à configurer)

### Jest
```bash
npm run test
npm run test:watch
npm run test:coverage
```

### Playwright (E2E)
```bash
npx playwright test
npx playwright test --ui
```

## 📊 Admin

### Accéder à l'admin
```bash
# Démarrer le serveur
npm run dev

# Ouvrir dans le navigateur
http://localhost:3000/admin/dashboard
```

### Pages admin disponibles
```bash
/admin/dashboard      # Dashboard principal
/admin/analytics      # Analytics avancées
/admin/trainings      # Gestion formations
/admin/prompts        # Gestion prompts
/admin/tools          # Gestion outils
/admin/users          # Gestion utilisateurs
/admin/contributors   # Top contributeurs
/admin/payments       # Gestion paiements
/admin/reports        # Génération rapports
/admin/settings       # Paramètres
```

## 🔧 Utilitaires

### Nettoyer le cache
```bash
# Supprimer node_modules
rm -rf node_modules
npm install

# Supprimer .next
rm -rf .next
npm run dev
```

### Vérifier les versions
```bash
node --version
npm --version
npx next --version
```

### Mettre à jour les dépendances
```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour toutes les dépendances
npm update

# Mettre à jour une dépendance spécifique
npm update <package-name>
```

## 📝 Git

### Commandes de base
```bash
# Status
git status

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "feat: add admin dashboard"

# Push
git push origin main

# Pull
git pull origin main
```

### Branches
```bash
# Créer une branche
git checkout -b feature/admin-dashboard

# Changer de branche
git checkout main

# Lister les branches
git branch

# Supprimer une branche
git branch -d feature/admin-dashboard
```

## 🚀 Déploiement

### Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Variables d'environnement
```bash
# Créer .env.local
touch .env.local

# Ajouter les variables
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
STRIPE_SECRET_KEY="..."
```

## 🔍 Debug

### Logs
```bash
# Voir les logs du serveur
npm run dev

# Logs détaillés
DEBUG=* npm run dev
```

### Analyser le bundle
```bash
npm install @next/bundle-analyzer

# Ajouter dans next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Analyser
ANALYZE=true npm run build
```

## 📊 Performance

### Lighthouse
```bash
# Installer Lighthouse CLI
npm install -g lighthouse

# Analyser
lighthouse http://localhost:3000 --view
```

### Next.js Bundle Analyzer
```bash
ANALYZE=true npm run build
```

## 🎨 Design System

### Générer les couleurs Tailwind
```bash
# Éditer tailwind.config.ts
colors: {
  primary: '#FFD11A',
  // ...
}
```

### Purge CSS inutilisé
```bash
# Automatique en production
npm run build
```

## 📚 Documentation

### Générer la documentation
```bash
# TypeDoc (à installer)
npm install --save-dev typedoc
npx typedoc --out docs src
```

### Storybook (à installer)
```bash
npx storybook@latest init
npm run storybook
```

## 🔐 Sécurité

### Audit des dépendances
```bash
npm audit
npm audit fix
npm audit fix --force
```

### Vérifier les vulnérabilités
```bash
npm install -g snyk
snyk test
```

## 🌐 Internationalisation (à configurer)

### next-intl
```bash
npm install next-intl
```

## 📱 PWA (à configurer)

### next-pwa
```bash
npm install next-pwa
```

## 🎯 Raccourcis Utiles

### Développement rapide
```bash
# Tout en un
npm install && npm run dev
```

### Reset complet
```bash
# Nettoyer et redémarrer
rm -rf node_modules .next && npm install && npm run dev
```

### Build et test
```bash
# Build et démarrer
npm run build && npm run start
```

## 📞 Aide

### Documentation Next.js
```bash
# Ouvrir la doc
open https://nextjs.org/docs
```

### Documentation Tailwind
```bash
# Ouvrir la doc
open https://tailwindcss.com/docs
```

### Documentation Recharts
```bash
# Ouvrir la doc
open https://recharts.org/
```

## 🎉 Commandes Personnalisées (à ajouter dans package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "analyze": "ANALYZE=true npm run build",
    "clean": "rm -rf .next node_modules",
    "reset": "npm run clean && npm install"
  }
}
```

---

**Pour plus d'informations, consultez les fichiers README et la documentation !**
