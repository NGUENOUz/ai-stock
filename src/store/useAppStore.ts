// src/store/useAppStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --- Types d'abonnement
export type SubscriptionTier = "Gratuit" | "Premium" | "Pro";

// --- Typage global état/auth/onboarding/theme ---
interface AppState {
  isLoggedIn: boolean;
  userName: string;
  email: string;
  subscription: SubscriptionTier;
  subscriptionEndDate: string | null; // <-- NOUVEAU: Date de fin d'abonnement (format string 'YYYY-MM-DD')
  hasSeenTour: { prompts: boolean; formations: boolean };
  isDarkMode: boolean;
}

interface AppActions {
  toggleDarkMode: () => void;
  loginFromDb: (
    params: {
      userName: string;
      email: string;
      subscription?: SubscriptionTier;
      subscriptionEndDate?: string | null; // <-- NOUVEAU: Ajout dans le login
    }
  ) => void;
  handleLogout: () => void;
  updateSubscription: (newTier: SubscriptionTier, endDate: string | null) => void; // <-- MODIFIÉ
  updateProfile: (userName: string, email: string) => void;
  setHasSeenTour: (page: "prompts" | "formations", seen: boolean) => void;
}

// --- Typage combiné Zustand
export type AppStore = AppState & AppActions;

// --- Helper pour thème
const manageDarkModeClass = (isDark: boolean) => {
  if (typeof document !== "undefined") {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  // Utilisation de la logique existante avec vérification si le storage est disponible
  try {
    const savedMode = localStorage.getItem("theme") || "";
    const isDark = savedMode === "dark";
    manageDarkModeClass(isDark);
    return isDark;
  } catch (error) {
    // Fallback si localStorage n'est pas disponible (ex: SSR)
    manageDarkModeClass(false);
    return false; 
  }
};

// --- STORE ZUSTAND ---
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // --- État par défaut ---
      isLoggedIn: false,
      userName: "Visiteur",
      email: "visiteur@ai-stock.com",
      subscription: "Gratuit",
      subscriptionEndDate: null, // <-- Défaut
      isDarkMode: getInitialDarkMode(),
      hasSeenTour: { prompts: false, formations: false },

      // --- Actions ---
      toggleDarkMode: () => {
        set((state) => {
          const newMode = !state.isDarkMode;
          manageDarkModeClass(newMode);
          // Stocke le mode actuel dans localStorage pour le helper au rechargement
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", newMode ? "dark" : "light");
          }
          return { isDarkMode: newMode };
        });
      },

      // Pour login réel Supabase : synchronise tout l'état à partir de la BDD/user
      loginFromDb: ({
        userName,
        email,
        subscription = "Gratuit",
        subscriptionEndDate = null, // <-- Récupération du champ
      }) => {
        set({
          isLoggedIn: true,
          userName: userName || email,
          email,
          subscription,
          subscriptionEndDate, // <-- Enregistrement du champ
        });
      },

      handleLogout: () => {
        set({
          isLoggedIn: false,
          userName: "Visiteur",
          email: "visiteur@ai-stock.com",
          subscription: "Gratuit",
          subscriptionEndDate: null, // <-- Réinitialisation
          hasSeenTour: { prompts: false, formations: false },
        });
      },

      updateSubscription: (newTier, endDate) => {
        set({ subscription: newTier, subscriptionEndDate: endDate });
      },

      updateProfile: (userName, email) => {
        set({ userName, email });
      },

      setHasSeenTour: (page, seen) => set((state) => ({
        hasSeenTour: {
          ...state.hasSeenTour,
          [page]: seen,
        },
      })),
    }),
    {
      name: "ai-stock-storage",
      storage: createJSONStorage(() => localStorage),
      // Ne persiste que l’essentiel !
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        userName: state.userName,
        email: state.email,
        subscription: state.subscription,
        subscriptionEndDate: state.subscriptionEndDate, // <-- PERSISTE
        isLoggedIn: state.isLoggedIn,
        hasSeenTour: state.hasSeenTour,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        manageDarkModeClass(state.isDarkMode || false);
      },
    }
  )
);