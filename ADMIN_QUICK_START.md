# 🚀 Guide de Démarrage Rapide - Administration AI-STOCK

## ⚡ Accès Rapide

```bash
# Démarrer le serveur de développement
npm run dev

# Accéder à l'admin
http://localhost:3000/admin/dashboard
```

## 📊 Pages Disponibles

| Page | URL | Description |
|------|-----|-------------|
| **Dashboard** | `/admin/dashboard` | Vue d'ensemble avec KPIs et graphiques |
| **Analytics** | `/admin/analytics` | Métriques avancées (MRR, CAC, LTV) |
| **Rapports** | `/admin/reports` | Génération de rapports PDF |
| **Formations** | `/admin/trainings` | CRUD formations |
| **Prompts** | `/admin/prompts` | CRUD prompts |
| **Outils** | `/admin/tools` | CRUD outils IA |
| **Workflows** | `/admin/workflows` | Gestion marketplace |
| **Utilisateurs** | `/admin/users` | Gestion communauté |
| **Contributeurs** | `/admin/contributors` | Top créateurs |
| **Paiements** | `/admin/payments` | Transactions |

## 🎨 Composants Réutilisables

### StatsCard
```tsx
import { StatsCard } from '@/components/admin';
import { DollarSign } from 'lucide-react';

<StatsCard
  title="Revenus Total"
  value="34 700 €"
  icon={DollarSign}
  trend={{ value: 12.5, isPositive: true }}
  color="success"
/>
```

### RevenueChart
```tsx
import { RevenueChart } from '@/components/admin';

const data = [
  { name: 'Lun', revenus: 4200, ventes: 24 },
  { name: 'Mar', revenus: 3800, ventes: 18 },
];

<RevenueChart data={data} />
```

### TopContributorsChart
```tsx
import { TopContributorsChart } from '@/components/admin';

const data = [
  { name: 'Marie D.', ventes: 156, revenus: 12400 },
  { name: 'Jean P.', ventes: 142, revenus: 11200 },
];

<TopContributorsChart data={data} />
```

## 🔧 Personnalisation

### Modifier la sidebar
Éditer `src/components/admin/AdminSidebar.tsx` :

```tsx
const menuItems = [
  {
    title: 'Votre Section',
    items: [
      { icon: YourIcon, label: 'Votre Page', href: '/admin/your-page' },
    ]
  }
];
```

### Ajouter une nouvelle page
```bash
# Créer le dossier
mkdir src/app/admin/your-page

# Créer la page
touch src/app/admin/your-page/page.tsx
```

```tsx
// src/app/admin/your-page/page.tsx
'use client';

export default function YourPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-black text-black mb-2">Votre Page</h1>
      {/* Votre contenu */}
    </div>
  );
}
```

## 📊 Ajouter un Graphique

### Installation (déjà fait)
```bash
npm install recharts
```

### Exemple LineChart
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Fév', value: 300 },
  { name: 'Mar', value: 600 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
    <XAxis dataKey="name" stroke="#A3A3A3" />
    <YAxis stroke="#A3A3A3" />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#FFD11A" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
```

## 🎨 Classes Tailwind Utiles

### Containers
```tsx
<div className="p-6 space-y-6">           // Page container
<div className="container mx-auto px-6">  // Centered container
```

### Cards
```tsx
<div className="bg-white rounded-xl border border-neutral-200 p-6">
  // Card content
</div>
```

### Buttons
```tsx
// Primary
<button className="px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90">

// Secondary
<button className="px-4 py-2.5 bg-neutral-100 text-black font-semibold rounded-lg hover:bg-neutral-200">

// Danger
<button className="px-4 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
```

### Inputs
```tsx
<input
  type="text"
  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
/>
```

### Badges
```tsx
// Success
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
  Actif
</span>

// Error
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700">
  Inactif
</span>
```

## 🔌 Connexion API

### Fetch Data
```tsx
'use client';

import { useState, useEffect } from 'react';

export default function YourPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/v1/your-endpoint');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      {/* Votre contenu */}
    </div>
  );
}
```

### Create/Update
```tsx
const handleSubmit = async (formData) => {
  try {
    const response = await fetch('/api/v1/your-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Success
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Delete
```tsx
const handleDelete = async (id) => {
  if (!confirm('Êtes-vous sûr ?')) return;

  try {
    const response = await fetch(`/api/v1/your-endpoint/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Success - refresh data
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🎯 Checklist Nouvelle Page

- [ ] Créer le dossier dans `/admin/`
- [ ] Créer `page.tsx` avec `'use client';`
- [ ] Ajouter le lien dans `AdminSidebar.tsx`
- [ ] Importer les icônes nécessaires (lucide-react)
- [ ] Ajouter le header avec titre et description
- [ ] Implémenter le contenu
- [ ] Tester responsive (mobile/tablet/desktop)
- [ ] Connecter à l'API si nécessaire

## 🐛 Debugging

### Problème : Graphique ne s'affiche pas
```bash
# Vérifier l'installation
npm list recharts

# Réinstaller si nécessaire
npm install recharts
```

### Problème : Styles cassés
```bash
# Rebuild Tailwind
npm run dev
```

### Problème : Erreur TypeScript
```tsx
// Ajouter les types
interface YourData {
  id: string;
  name: string;
  // ...
}

const [data, setData] = useState<YourData[]>([]);
```

## 📚 Ressources

- **Recharts Docs** : https://recharts.org/
- **Lucide Icons** : https://lucide.dev/
- **Tailwind CSS** : https://tailwindcss.com/
- **Next.js Docs** : https://nextjs.org/docs

## 💡 Tips

1. **Utilisez 'use client'** pour les composants interactifs
2. **Mock data d'abord**, API ensuite
3. **Mobile-first** : testez sur petit écran
4. **Réutilisez** les composants existants
5. **Suivez le design system** (#FFD11A)

## 🚀 Prochaines Étapes

1. Connecter les APIs réelles
2. Implémenter l'authentification
3. Ajouter la génération PDF
4. Créer les formulaires de création/édition
5. Ajouter les filtres avancés

---

**Besoin d'aide ?** Consultez `ADMIN_README.md` pour plus de détails !
