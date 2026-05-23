# 🚀 Quick Start - Design System AI-STOCK

Guide rapide pour utiliser le Design System au quotidien.

---

## 🎨 Couleurs les plus utilisées

```jsx
// Primaire (Jaune signature)
className="bg-primary text-black"
className="text-primary"
className="border-primary"

// Backgrounds
className="bg-white"           // Fond principal
className="bg-neutral-50"      // Sections alternées
className="bg-neutral-100"     // Cards, inputs

// Texte
className="text-black"         // Titres principaux
className="text-neutral-800"   // Headings
className="text-neutral-600"   // Body text
className="text-neutral-400"   // Text secondaire

// Borders
className="border-neutral-200" // Standard
className="border-neutral-300" // Hover
```

---

## 🔘 Boutons

```jsx
// Primary (Action principale)
<button className="bg-primary text-black px-6 py-3 rounded-full font-bold hover:bg-primary-600 transition-all active:scale-95">
  Rejoindre
</button>

// Secondary
<button className="bg-neutral-100 text-neutral-800 px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-all">
  En savoir plus
</button>

// Ghost
<button className="bg-transparent border border-neutral-200 px-6 py-3 rounded-full font-bold hover:bg-neutral-50 transition-all">
  Annuler
</button>

// Avec classe utility
<button className="btn-primary">Rejoindre</button>
```

---

## 🃏 Cards

```jsx
// Card standard (avec classe utility)
<div className="framer-card p-6">
  <h3 className="text-xl font-bold mb-2">Titre</h3>
  <p className="text-neutral-600">Description</p>
</div>

// Card avec Tailwind pur
<div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-premium hover:-translate-y-1 hover:shadow-lg transition-all">
  {/* Contenu */}
</div>

// Card avec image
<div className="framer-card overflow-hidden">
  <img src="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-bold">Titre</h3>
  </div>
</div>
```

---

## 📝 Inputs

```jsx
// Input standard
<input 
  type="text"
  placeholder="Rechercher..."
  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
/>

// Avec classe utility
<input className="input" placeholder="Email..." />

// Textarea
<textarea 
  className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
  rows={4}
/>
```

---

## 🏷️ Badges

```jsx
// Gratuit (Success)
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-success-light text-success-dark border border-success">
  Gratuit
</span>

// Payant (Error)
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-error-light text-error-dark border border-error">
  Payant
</span>

// Freemium (Warning)
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-warning-light text-warning-dark border border-warning">
  Freemium
</span>

// Essai Gratuit (Info)
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-info-light text-info-dark border border-info">
  Essai Gratuit
</span>

// Avec classes utility
<span className="badge-success">Gratuit</span>
<span className="badge-error">Payant</span>
```

---

## 📐 Layout

```jsx
// Container centré
<div className="container mx-auto px-6">
  {/* Contenu */}
</div>

// Section avec padding vertical
<section className="py-16 md:py-24">
  <div className="container mx-auto px-6">
    {/* Contenu */}
  </div>
</section>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>

// Flex centré
<div className="flex items-center justify-center gap-4">
  {/* Items */}
</div>
```

---

## ✍️ Typographie

```jsx
// Hero title
<h1 className="text-5xl md:text-7xl font-black tracking-tight text-black">
  Titre Principal
</h1>

// Section title
<h2 className="text-3xl font-extrabold text-black mb-6">
  Titre de Section
</h2>

// Card title
<h3 className="text-xl font-bold text-black">
  Titre de Card
</h3>

// Body text
<p className="text-base text-neutral-600 leading-relaxed">
  Texte de paragraphe standard.
</p>

// Small text
<p className="text-sm text-neutral-500">
  Texte secondaire ou description.
</p>

// Label
<label className="text-xs font-bold uppercase tracking-wide text-neutral-400">
  Label
</label>
```

---

## ⚡ Animations & Transitions

```jsx
// Hover lift (cards)
<div className="hover:-translate-y-1 transition-transform duration-300">

// Hover scale (buttons)
<button className="hover:scale-105 active:scale-95 transition-transform">

// Fade in
<div className="animate-fade-in">

// Slide up
<div className="animate-slide-up">

// Glow effect
<div className="hover:shadow-glow transition-shadow duration-300">

// Smooth transition
<div className="transition-all duration-300 ease-out">
```

---

## 🎭 Effets spéciaux

```jsx
// Background avec grille
<div className="bg-grid-fade">
  {/* Contenu */}
</div>

// Glass effect (navbar)
<nav className="glass">
  {/* Contenu */}
</nav>

// Gradient text
<h1 className="gradient-text text-5xl font-black">
  Texte avec gradient
</h1>

// Text balance (titres)
<h1 className="text-balance text-4xl font-bold">
  Titre sans mots orphelins
</h1>

// Glow primary
<div className="shadow-glow">
  {/* Contenu lumineux */}
</div>
```

---

## 📱 Responsive

```jsx
// Mobile first
<div className="text-2xl md:text-4xl lg:text-6xl">

// Hide on mobile
<div className="hidden md:block">

// Show only on mobile
<div className="block md:hidden">

// Flex direction
<div className="flex flex-col md:flex-row gap-4">

// Grid columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Padding responsive
<section className="py-12 md:py-20 lg:py-32">
```

---

## 🎯 Patterns courants

### Hero Section
```jsx
<section className="relative min-h-screen flex items-center justify-center py-20">
  <div className="absolute inset-0 bg-grid-fade" />
  <div className="container mx-auto px-6 relative z-10 text-center">
    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
      Titre Hero
    </h1>
    <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
      Description
    </p>
    <button className="btn-primary">
      Call to Action
    </button>
  </div>
</section>
```

### Tool Card
```jsx
<div className="framer-card p-6 group cursor-pointer">
  <div className="flex items-center gap-4 mb-4">
    <img src={logo} className="w-12 h-12 rounded-lg" />
    <div className="flex-1">
      <h3 className="text-lg font-bold">{name}</h3>
      <span className="badge-success">Gratuit</span>
    </div>
  </div>
  <img src={banner} className="w-full h-40 object-cover rounded-lg mb-4" />
  <p className="text-sm text-neutral-600 mb-4">{description}</p>
  <div className="flex gap-2">
    <button className="btn-ghost flex-1">En savoir plus</button>
    <button className="btn-primary flex-1">Visiter</button>
  </div>
</div>
```

### Navbar
```jsx
<nav className="fixed top-0 w-full z-50 glass">
  <div className="container mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg" />
        <span className="text-xl font-black">AI-STOCK</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-bold text-neutral-600 hover:text-black">Outils</a>
        <a href="#" className="text-sm font-bold text-neutral-600 hover:text-black">Prompts</a>
        <a href="#" className="text-sm font-bold text-neutral-600 hover:text-black">Formations</a>
      </div>
      <button className="btn-primary">
        Connexion
      </button>
    </div>
  </div>
</nav>
```

---

## 🔍 Recherche rapide

**Besoin de...**
- Bouton jaune → `btn-primary` ou `bg-primary text-black`
- Card → `framer-card p-6`
- Input → `input` ou classes complètes
- Badge → `badge-success`, `badge-error`, etc.
- Centrer → `flex items-center justify-center`
- Hover lift → `hover:-translate-y-1 transition-transform`
- Ombre → `shadow-premium`, `shadow-lg`
- Arrondi → `rounded-xl` (20px)

---

**Pour plus de détails, voir `DESIGN_SYSTEM.md`** 📚
