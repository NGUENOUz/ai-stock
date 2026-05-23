# AI-STOCK — Projet et état actuel

## Contexte général
AI-STOCK est une application Web construite avec Next.js (App Router) en TypeScript, destinée à centraliser des ressources autour de l’intelligence artificielle :
- outils IA
- prompts
- formations
- workflows

Le projet vise à devenir une plateforme francophone tout-en-un pour découvrir, comparer et utiliser des ressources IA. les utilsiateurs pourrons donc visiter l'anulaire , s'inscrire pour devenir menbre et pourquoi pas contributeur et monetiser ses competences . 

## Structure du projet

### Dossier racine
- `package.json` : dépendances React/Next, Tailwind, Supabase, MUI, Zustand, Zod.
- `next.config.ts` : configuration d’images externes autorisées.
- `tsconfig.json` : configuration TypeScript.
- `README.md` : contenu par défaut généré par Next.js.

### Src principales
- `src/app/` : pages de l’App Router Next.js.
  - `app/page.tsx` : page d’accueil migrée vers une approche API-first.
  - `app/layout.tsx` : layout global, thèmes et analytics Vercel.
  - `app/dashboard/`, `app/formations/`, `app/liste/`, `app/prompt/`, `app/login/`, `app/signup/` : routes fonctionnelles.
  - `app/[slug]/page.tsx` : page dynamique pour affichage de contenu par slug.

- `src/components/` : bibliothèque de composants UI et sections du site.
  - Composants de navigation, hero, cards, carrousels, formulaire, pied de page, etc.

- `src/lib/`
  - `src/lib/api-client/index.ts` : client API front-end consommant des endpoints `api/v1`.
  - `src/lib/supabase/` : configuration Supabase et services d’accès aux données.
  - `src/lib/schemas/` : schémas Zod pour l’API (`api.schema.ts`, `tool.schema.ts`, etc.).
  - `src/lib/utils/` : utilitaires pour réponses API et autres helpers.

- `src/store/` : état global avec Zustand (`useAppStore.ts`) pour le thème, l’onboarding, l’authentification.
- `src/types/` : types TypeScript métiers (`type.ts`, `training.ts`).

### API serveur
- `src/app/api/v1/` : endpoints backend organisés par domaine.
  - `auth/`
  - `prompts/`
  - `tools/`
  - `trainings/`

Ces endpoints fournissent un backend API standardisé à l’application.

## Principales technologies
- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4 + Tailwind Animate
- Supabase
- Zustand
- Zod
- MUI
- Vercel Analytics
- Framer Motion

## État actuel du développement

### Ce qui est déjà en place
- Page d’accueil fonctionnelle avec composants modernes et animation.
- Architecture de route App Router avec pages de formation, liste, prompt, login/signup.
- Intégration d’une couche API-first :
  - `src/app/page.tsx` utilise `apiClient.getFeaturedTools(8)`.
  - Le front-end a été migré pour consommer `src/app/api/v1/tools` au lieu d’appels Supabase directs.
- Mise en place d’un client Supabase dans `src/lib/supabase/supabaseClient.ts`.
- Services Supabase dans `src/lib/supabase/services/service.ts` pour récupérer catégories, outils filtrés, annonces et formations.
- Schéma de réponse API normalisé avec `ApiResponseSchema`.
- Thème global géré via `next-themes` et `ThemeProvider`.

### Points de migration / travaux en cours
- Le projet est partiellement migré vers l’approche API-first.
  - Certaines pages utilisent déjà `apiClient`.
  - D’autres parties du code peuvent encore dépendre de services Supabase directs.
- Le README racine est encore le template par défaut Next.js et ne reflète pas l’état réel du produit.
- Le chemin `src/app/page.tsx` contient des commentaires de migration et des marqueurs de transition.
- Les routes API existent, mais il faut vérifier la complétude métier et la cohérence des schémas.
- Les variables d’environnement Supabase sont attendues :
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_API_URL`

## Fonctionnalités attendues / Présentation

### Domaine fonctionnel
- Annuaire d’outils IA avec filtres et mise en avant.
- Gestion des prompts IA.
- Catalogue de formations IA.
- Pages de contenu dynamique par slug.
- Espace utilisateur / dashboard.
- Inscription / connexion.

### UX / composants
- Hero animé et sections marketing.
- Marquee / carrousel de logos et ressources.
- Grille d’outils et contenus migrés.
- Sections de preuve sociale et CTA.

## Recommandations pour un agent

1. Lire d’abord `src/app/page.tsx` pour comprendre la migration API-first.
2. Vérifier `src/lib/api-client/index.ts` et `src/app/api/v1/tools` pour la logique backend.
3. Valider la cohérence entre `src/lib/supabase/services/service.ts` et les routes API.
4. Compléter la documentation racine (`README.md`) et ajouter un guide de déploiement.
5. Vérifier la présence d’un état de connexion/utilisateur dans `src/store/useAppStore.ts`.

## Fichiers importants à consulter
- `package.json`
- `next.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/lib/api-client/index.ts`
- `src/lib/supabase/supabaseClient.ts`
- `src/lib/supabase/services/service.ts`
- `src/lib/schemas/api.schema.ts`
- `src/app/api/v1/`
- `src/store/useAppStore.ts`
- `src/types/type.ts`
- `README.md`

---

> Ce document est un résumé synthétique du projet AI-STOCK et de son état actuel pour faciliter le travail d’un agent externe ou d’un collaborateur.
