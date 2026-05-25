# 🎯 SPÉCIFICATIONS AI-STOCK - RÔLES & FONCTIONNALITÉS

## 📋 RÔLES UTILISATEURS

### 👤 **USER (Utilisateur Standard)**
**Dashboard:** `/dashboard`
- ✅ Consulter outils IA gratuits
- ✅ Acheter formations individuelles (pas d'abonnement premium)
- ✅ Participer aux tournois IA
- ✅ Voir historique de ses participations
- ✅ Consulter les gagnants précédents
- ✅ Sauvegarder prompts/outils favoris
- ❌ Pas d'accès aux contenus premium
- ❌ Ne peut pas publier de contenu

### 🚀 **CONTRIBUTOR (Contributeur)**
**Dashboard:** `/dashboard` (avec sections supplémentaires)
- ✅ Toutes les fonctionnalités USER
- ✅ Publier formations payantes
- ✅ Publier prompts premium
- ✅ Publier outils/workflows
- ✅ Voir statistiques de ventes
- ✅ Gérer revenus et commissions
- ✅ Accès aux soumissions gagnantes des tournois (inspiration)
- ✅ Proposer des tournois

### 👑 **ADMIN (Administrateur)**
**Dashboard:** `/admin/dashboard`
- ✅ Toutes les fonctionnalités CONTRIBUTOR
- ✅ Gestion complète des tournois
- ✅ Modération contenus
- ✅ Analytics plateforme
- ✅ Gestion utilisateurs
- ✅ Configuration paiements
- ✅ Rapports financiers

---

## 🏆 SYSTÈME DE TOURNOIS

### **Fonctionnalités Tournois**

#### 👤 **Pour les USERS:**
- Voir tournois actifs/à venir
- Participer avec soumissions (code, prompts, designs)
- Historique participations
- Voir gagnants précédents + leurs soumissions
- Système de dépôts Git pour projets
- Sources externes (liens, portfolios)

#### 🚀 **Pour les CONTRIBUTORS:**
- Accès aux soumissions gagnantes (apprentissage)
- Proposer des idées de tournois
- Parrainer des tournois

#### 👑 **Pour les ADMINS:**
- Créer/gérer tournois
- Définir critères et prix
- Sélectionner gagnants
- Modérer soumissions
- Analytics tournois

### **Types de Tournois:**
1. **Prompt Engineering** - Meilleurs prompts pour un cas d'usage
2. **Code IA** - Projets utilisant l'IA
3. **Design IA** - Créations visuelles avec IA
4. **Workflows** - Automatisations innovantes

---

## 💰 SYSTÈME ÉCONOMIQUE

### **Formations Payantes (Pas d'abonnement)**
- Achat à l'unité par formation
- Prix fixés par les contributeurs
- Commission plateforme (ex: 30%)
- Accès permanent après achat

### **Prompts Premium**
- Packs de prompts payants
- Prompts individuels premium
- Système de preview gratuit

### **Tournois avec Prix**
- Prix en argent pour gagnants
- Sponsors possibles
- Frais d'inscription optionnels

---

## 🎛️ DASHBOARDS SPÉCIFIQUES

### `/dashboard` (USER + CONTRIBUTOR)
```
📊 Vue d'ensemble
├── Mes Formations achetées
├── Mes Participations Tournois
├── Historique Achats
├── Favoris (Outils/Prompts)
└── [Si CONTRIBUTOR]
    ├── Mes Publications
    ├── Revenus & Statistiques
    └── Gestion Contenu
```

### `/admin/dashboard` (ADMIN UNIQUEMENT)
```
🎛️ Administration
├── Analytics Plateforme
├── Gestion Tournois
├── Modération Contenu
├── Gestion Utilisateurs
├── Rapports Financiers
└── Configuration Système
```

---

## 🔄 FLUX DE REDIRECTION

```javascript
const getRedirectPath = (role) => {
  switch(role) {
    case 'admin': return '/admin/dashboard'
    case 'contributor': return '/dashboard' // Avec sections contributor
    case 'user': return '/dashboard'       // Version standard
    default: return '/login'
  }
}
```

---

## 📝 PROCHAINES ÉTAPES

1. ✅ Corriger redirections selon rôle
2. 🔄 Créer pages tournois
3. 🔄 Système formations payantes
4. 🔄 Dashboard contributeur
5. 🔄 Interface admin tournois
6. 🔄 Système de paiement formations
7. 🔄 Gestion dépôts Git tournois

---

**Cette spécification est-elle conforme à votre vision ?**