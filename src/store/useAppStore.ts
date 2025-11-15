// src/store/useAppStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- 1. Définition des Types d'État et d'Actions ---

export type SubscriptionTier = 'Gratuit' | 'Premium' | 'Pro';

interface AppState {
    // Authentification
    isLoggedIn: boolean;
    userName: string;
    email: string; 
    subscription: SubscriptionTier; 
    
    // NOUVEAU: Suivi des visites guidées par page
    hasSeenTour: {
        prompts: boolean;
        formations: boolean;
    };
    
    // Thème
    isDarkMode: boolean;
}

interface AppActions {
    // Actions générales
    toggleDarkMode: () => void;
    simulateLogin: (username: string, email: string, tier?: SubscriptionTier) => Promise<boolean>;
    handleLogout: () => void;
    updateSubscription: (newTier: SubscriptionTier) => void;
    updateProfile: (userName: string, email: string) => void; 
    
    // NOUVEAU: Action pour gérer la visite guidée
    setHasSeenTour: (page: 'prompts' | 'formations', seen: boolean) => void;
}

// Type combiné pour le store
export type AppStore = AppState & AppActions;

// --- 2. Fonctions Utilitaires pour l'Initialisation/Hydratation ---

const manageDarkModeClass = (isDark: boolean) => {
    if (typeof document !== 'undefined') {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
};

const getInitialDarkMode = (): boolean => {
    if (typeof window === 'undefined') return false; 
    
    // Tente de récupérer la valeur persistée par Zustand
    // Si ce n'est pas encore hydraté, utilise la valeur par défaut du système ou une valeur codée en dur.
    const savedMode = localStorage.getItem('theme'); // Ancienne logique du store, on la garde
    const isDark = savedMode === 'dark';
    manageDarkModeClass(isDark);
    return isDark;
};


// --- 3. Création du Store Zustand ---

export const useAppStore = create<AppStore>()(
    persist(
        (set, get) => ({
            // --- État Initial ---
            isLoggedIn: false, 
            userName: 'Visiteur',
            email: 'visiteur@ai-stock.com', 
            subscription: 'Gratuit', 
            isDarkMode: getInitialDarkMode(),
            
            // 🌟 AJOUT : État initial des visites guidées
            hasSeenTour: {
                prompts: false,
                formations: false,
            },

            // --- Actions ---

            toggleDarkMode: () => {
                set((state) => {
                    const newMode = !state.isDarkMode;
                    manageDarkModeClass(newMode);
                    return { isDarkMode: newMode };
                });
            },

            simulateLogin: (username = 'Alice Dupont', email = 'alice@ai-stock.com', tier: SubscriptionTier = 'Gratuit') => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        set({
                            isLoggedIn: true,
                            userName: username,
                            email: email, 
                            subscription: tier, 
                        });
                        resolve(true);
                    }, 1500);
                });
            },

            handleLogout: () => {
                set({
                    isLoggedIn: false,
                    userName: 'Visiteur',
                    email: 'visiteur@ai-stock.com',
                    subscription: 'Gratuit',
                });
            },

            updateSubscription: (newTier: SubscriptionTier) => {
                set({ subscription: newTier });
            },

            updateProfile: (newUserName: string, newEmail: string) => {
                set({ userName: newUserName, email: newEmail });
            },
            
            // 🌟 AJOUT : Action pour mettre à jour l'état du tour par page
            setHasSeenTour: (page, seen) => set((state) => ({
                hasSeenTour: {
                    ...state.hasSeenTour,
                    [page]: seen,
                },
            })),
        }),
        {
            name: 'ai-stock-storage', 
            storage: createJSONStorage(() => localStorage), 
            
            // 🌟 MODIFICATION : Inclusion de hasSeenTour pour la persistance
            partialize: (state) => ({ 
                isDarkMode: state.isDarkMode,
                userName: state.userName,
                email: state.email,
                subscription: state.subscription,
                isLoggedIn: state.isLoggedIn, 
                hasSeenTour: state.hasSeenTour, // <-- AJOUTÉ
            }), 
            
            // Logique d'Hydratation
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                
                // 1. Gérer le thème (déjà présent)
                manageDarkModeClass(state.isDarkMode);

                // Les autres états (isLoggedIn, hasSeenTour) sont gérés automatiquement
                // par le middleware `persist` lors de l'hydratation.
            },
        },
    ),
);