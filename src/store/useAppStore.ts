// src/store/useAppStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SubscriptionTier = "Gratuit" | "Premium" | "Pro";
export type UserRole = "user" | "contributor" | "admin";

interface AppState {
  
  isLoggedIn: boolean;
  userName: string;
  email: string;
  role: UserRole;
  subscription: SubscriptionTier;
  subscriptionEndDate: string | null;
  hasSeenTour: { prompts: boolean; formations: boolean };
  isDarkMode: boolean;
  isContributor: boolean;
  contributorRequestPending: boolean;
}

interface AppActions {
  toggleDarkMode: () => void;
  loginFromDb: (params: {
    userName: string;
    email: string;
    role?: UserRole;
    subscription?: SubscriptionTier;
    subscriptionEndDate?: string | null;
  }) => void;
  handleLogout: () => void;
  updateSubscription: (newTier: SubscriptionTier, endDate: string | null) => void;
  updateProfile: (userName: string, email: string) => void;
  setHasSeenTour: (page: "prompts" | "formations", seen: boolean) => void;
  requestContributor: () => void;
}

export type AppStore = AppState & AppActions;

const manageDarkModeClass = (isDark: boolean) => {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", isDark);
  }
};

const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const isDark = localStorage.getItem("theme") === "dark";
    manageDarkModeClass(isDark);
    return isDark;
  } catch {
    return false;
  }
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName: "Visiteur",
      email: "visiteur@ai-stock.com",
      role: "user",
      subscription: "Gratuit",
      subscriptionEndDate: null,
      isDarkMode: getInitialDarkMode(),
      hasSeenTour: { prompts: false, formations: false },
      isContributor: false,
      contributorRequestPending: false,

      toggleDarkMode: () => {
        set((state) => {
          const newMode = !state.isDarkMode;
          manageDarkModeClass(newMode);
          localStorage.setItem("theme", newMode ? "dark" : "light");
          return { isDarkMode: newMode };
        });
      },

      loginFromDb: ({ userName, email, role = "user", subscription = "Gratuit", subscriptionEndDate = null }) => {
        set({ 
          isLoggedIn: true, 
          userName: userName || email, 
          email, 
          role, 
          subscription, 
          subscriptionEndDate,
          isContributor: role === "contributor" || role === "admin",
          contributorRequestPending: false
        });
      },

      handleLogout: () => {
        set({
          isLoggedIn: false,
          userName: "Visiteur",
          email: "visiteur@ai-stock.com",
          role: "user",
          subscription: "Gratuit",
          subscriptionEndDate: null,
          hasSeenTour: { prompts: false, formations: false },
          isContributor: false,
          contributorRequestPending: false,
        });
      },

      updateSubscription: (newTier, endDate) => set({ subscription: newTier, subscriptionEndDate: endDate }),
      updateProfile: (userName, email) => set({ userName, email }),
      setHasSeenTour: (page, seen) =>
        set((state) => ({ hasSeenTour: { ...state.hasSeenTour, [page]: seen } })),
      requestContributor: () => set({ contributorRequestPending: true }),
    }),
    {
      name: "ai-stock-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        userName: state.userName,
        email: state.email,
        role: state.role,
        subscription: state.subscription,
        subscriptionEndDate: state.subscriptionEndDate,
        isLoggedIn: state.isLoggedIn,
        hasSeenTour: state.hasSeenTour,
        isContributor: state.isContributor,
        contributorRequestPending: state.contributorRequestPending,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) manageDarkModeClass(state.isDarkMode || false);
      },
    }
  )
);
