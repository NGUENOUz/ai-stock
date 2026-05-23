# 🎨 AI-STOCK DESIGN SYSTEM

**Version:** 1.0.0  
**Dernière mise à jour:** 2024  
**Couleur signature:** `#FFD11A` (Jaune AI-STOCK)

---

## 📋 Table des matières

1. [Palette de couleurs](#palette-de-couleurs)
2. [Typographie](#typographie)
3. [Espacements](#espacements)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Composants](#composants)
7. [Animations](#animations)
8. [Grille & Layout](#grille--layout)

---

## 🎨 Palette de couleurs

### Couleur Primaire (Jaune AI-STOCK)
```css
primary-50:  #FFFBEB  /* Backgrounds légers */
primary-100: #FFF3C4  /* Hover states */
primary:     #FFD11A  /* ⚡ Couleur signature */
primary-600: #E6BC00  /* Hover boutons */
primary-700: #B39600  /* Active states */
```

**Usage:**
- `bg-primary` - Boutons principaux, badges, accents
- `text-primary` - Titres en couleur, liens importants
- `border-primary` - Focus states, highlights

### Neutrals (Gris sophistiqués)
```css
white:       #FFFFFF
neutral-50:  #FAFAFA  /* Backgrounds sections */
neutral-100: #F5F5F5  /* Cards, inputs */
neutral-200: #E5E5E5  /* Borders */
neutral-300: #D4D4D4  /* Borders hover */
neutral-400: #A3A3A3  /* Text secondaire */
neutral-500: #737373  /* Text muted */
neutral-600: #525252  /* Text normal */
neutral-800: #262626  /* Headings */
neutral-900: #171717  /* Noir profond */
black:       #000000  /* Titres principaux */
```

### Couleurs d'états
```css
success:  #10B981  /* Gratuit, validé ✓ */
info:     #3B82F6  /* Essai gratuit, info */
warning:  #F59E0B  /* Freemium, attention */
error:    #EF4444  /* Payant, erreur */
purple:   #8B5CF6  /* Premium features */
```

**Variantes disponibles:**
- `success-light`, `success-dark`
- `error-light`, `error-dark`
- `warning-light`, `warning-dark`
- `info-light`, `info-dark`

---

## ✍️ Typographie

### Font Family
```css
font-sans: Inter, system-ui, sans-serif
font-mono: 'JetBrains Mono', monospace
```

### Scale (Mobile-first)
| Classe | Taille | Line Height | Usage |
|--------|--------|-------------|-------|
| `text-xs` | 12px | 16px | Labels, badges |
| `text-sm` | 14px | 20px | Body secondaire |
| `text-base` | 16px | 24px | Body principal |
| `text-lg` | 18px | 28px | Sous-titres |
| `text-xl` | 20px | 28px | Titres cards |
| `text-2xl` | 24px | 32px | Titres sections |
| `text-3xl` | 30px | 36px | H2 |
| `text-4xl` | 36px | 40px | H1 mobile |
| `text-5xl` | 48px | 1 | H1 desktop |
| `text-6xl` | 60px | 1 | Hero titles |
| `text-7xl` | 72px | 1 | Landing hero |

### Weights
```css
font-normal:    400  /* Body text */
font-medium:    500  /* Emphasis */
font-semibold:  600  /* Sous-titres */
font-bold:      700  /* Boutons, labels */
font-extrabold: 800  /* Titres sections */
font-black:     900  /* Hero, branding */
```

### Exemples
```jsx
// Hero title
<h1 className="text-5xl md:text-7xl font-black tracking-tight">

// Section title
<h2 className="text-3xl font-extrabold text-black">

// Body text
<p className="text-base text-neutral-600">

// Label
<span className="text-xs font-bold uppercase tracking-wide text-neutral-400">
```

---

## 📏 Espacements

### Scale Tailwind
```css
0.5: 2px   /* Micro-spacing */
1:   4px   /* Très serré */
2:   8px   /* Serré */
3:   12px  /* Compact */
4:   16px  /* Standard ⭐ */
5:   20px  /* Confortable */
6:   24px  /* Large */
8:   32px  /* Sections */
10:  40px  /* Entre blocs */
12:  48px  /* Grandes sections */
16:  64px  /* Séparations majeures */
20:  80px  /* Hero spacing */
24:  96px  /* Section padding */
32:  128px /* Entre sections principales */
```

### Patterns courants
```jsx
// Card padding
<div className="p-6">

// Section spacing
<section className="py-16 md:py-24">

// Gap entre éléments
<div className="flex gap-4">

// Container
<div className="container mx-auto px-6">
```

---

## 🔲 Border Radius

```css
rounded-sm:   8px   /* Petits éléments (badges) */
rounded-md:   12px  /* Inputs, petits boutons */
rounded-lg:   16px  /* Cards standards */
rounded-xl:   20px  /* Grandes cards */
rounded-2xl:  24px  /* Sections, modals */
rounded-3xl:  32px  /* Hero sections */
rounded-full: 9999px /* Boutons pill, avatars */
```

### Exemples
```jsx
// Card
<div className="rounded-xl">

// Button
<button className="rounded-full">

// Input
<input className="rounded-lg">

// Badge
<span className="rounded-full">
```

---

## 🌑 Shadows

```css
shadow-sm:      /* Borders subtiles */
shadow-md:      /* Cards au repos */
shadow-lg:      /* Cards hover */
shadow-xl:      /* Modals, dropdowns */
shadow-premium: /* Style Framer (signature) */
shadow-soft:    /* Ombres douces */
shadow-glow:    /* Effet jaune lumineux */
```

### Exemples
```jsx
// Card standard
<div className="shadow-premium hover:shadow-lg">

// Glow effect
<div className="shadow-glow">

// Navbar
<nav className="shadow-soft backdrop-blur-md">
```

---

## 🧩 Composants

### Boutons

#### Primary
```jsx
<button className="btn-primary">
  Rejoindre AI-STOCK
</button>

// Ou avec classes Tailwind
<button className="bg-primary text-black px-6 py-3 rounded-full font-bold hover:bg-primary-600 transition-all active:scale-95">
```

#### Secondary
```jsx
<button className="btn-secondary">
  En savoir plus
</button>
```

#### Ghost
```jsx
<button className="btn-ghost">
  Annuler
</button>
```

### Cards

#### Standard Card
```jsx
<div className="framer-card p-6">
  <h3 className="text-xl font-bold mb-2">Titre</h3>
  <p className="text-neutral-600">Description</p>
</div>
```

#### Tool Card (exemple)
```jsx
<div className="bg-white border border-neutral-200 rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
  {/* Contenu */}
</div>
```

### Inputs

```jsx
<input 
  type="text" 
  placeholder="Rechercher..."
  className="input"
/>

// Ou avec classes complètes
<input 
  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
/>
```

### Badges

```jsx
// Success (Gratuit)
<span className="badge-success">Gratuit</span>

// Error (Payant)
<span className="badge-error">Payant</span>

// Warning (Freemium)
<span className="badge-warning">Freemium</span>

// Info (Essai)
<span className="badge-info">Essai Gratuit</span>

// Custom
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-purple-light text-purple-dark border border-purple">
  Premium
</span>
```

---

## ⚡ Animations

### Transitions
```css
transition-all duration-200  /* Default (rapide) */
transition-all duration-300  /* Smooth */
transition-all duration-500  /* Lent */
```

### Animations disponibles
```jsx
// Fade in
<div className="animate-fade-in">

// Slide up
<div className="animate-slide-up">

// Scale in
<div className="animate-scale-in">

// Glow pulse
<div className="animate-glow-pulse">

// Spin slow
<div className="animate-spin-slow">
```

### Hover effects
```jsx
// Lift card
<div className="hover:-translate-y-1 transition-transform">

// Scale button
<button className="hover:scale-105 active:scale-95 transition-transform">

// Glow
<div className="hover:shadow-glow transition-shadow">
```

---

## 📐 Grille & Layout

### Container
```jsx
<div className="container mx-auto px-6">
  {/* Contenu centré avec padding responsive */}
</div>
```

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Max-width container:** 1280px

### Grid
```jsx
// 2 colonnes sur mobile, 3 sur desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Auto-fit responsive
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
```

### Flex
```jsx
// Centré
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">

// Column sur mobile, row sur desktop
<div className="flex flex-col md:flex-row gap-4">
```

### Sections
```jsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-extrabold mb-12">Titre Section</h2>
    {/* Contenu */}
  </div>
</section>
```

---

## 🎯 Utilities Classes Custom

### Background Grid
```jsx
// Grille simple
<div className="bg-grid">

// Grille avec fade
<div className="bg-grid-fade">
```

### Glass Effect
```jsx
<div className="glass">
  {/* Effet verre dépoli */}
</div>
```

### Gradient Text
```jsx
<h1 className="gradient-text">
  Texte avec gradient jaune
</h1>
```

### Text Balance
```jsx
<h1 className="text-balance">
  Titre sans mots orphelins
</h1>
```

---

## 📝 Bonnes pratiques

### ✅ À FAIRE
- Utiliser les classes Tailwind du Design System
- Respecter la hiérarchie typographique
- Utiliser `framer-card` pour les cards
- Ajouter des transitions sur les interactions
- Utiliser `container mx-auto px-6` pour les sections

### ❌ À ÉVITER
- Créer des couleurs custom en dehors du système
- Utiliser des valeurs arbitraires (`w-[347px]`)
- Mélanger SCSS et Tailwind
- Oublier les états hover/focus
- Négliger le responsive

---

## 🚀 Exemples complets

### Hero Section
```jsx
<section className="relative min-h-screen flex items-center justify-center py-20">
  <div className="absolute inset-0 bg-grid-fade" />
  <div className="container mx-auto px-6 relative z-10 text-center">
    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
      La plus grande communauté <br />
      <span className="text-primary italic">d'outils IA</span>
    </h1>
    <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
      Découvrez, partagez et monétisez vos prompts, workflows et outils IA.
    </p>
    <button className="btn-primary">
      Rejoindre AI-STOCK
    </button>
  </div>
</section>
```

### Tool Card
```jsx
<div className="framer-card p-6 group cursor-pointer">
  <div className="flex items-center gap-4 mb-4">
    <img src={logo} className="w-12 h-12 rounded-lg" />
    <div>
      <h3 className="text-lg font-bold">{name}</h3>
      <span className="badge-success">Gratuit</span>
    </div>
  </div>
  <p className="text-sm text-neutral-600 mb-4">{description}</p>
  <button className="btn-ghost w-full group-hover:bg-primary group-hover:text-black">
    En savoir plus →
  </button>
</div>
```

---

**Maintenu par l'équipe AI-STOCK** 🚀
