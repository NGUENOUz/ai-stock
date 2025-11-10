// src/store/useAppStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- 1. Définition des Types d'État et d'Actions ---

// Définition des types d'abonnement
export type SubscriptionTier = 'Gratuit' | 'Premium' | 'Pro';

interface AppState {
    // Authentification
    isLoggedIn: boolean;
    userName: string;
    email: string; 
    subscription: SubscriptionTier; 
    
    // Thème
    isDarkMode: boolean;
}

interface AppActions {
    // Actions
    toggleDarkMode: () => void;
    simulateLogin: (username: string, email: string, tier?: SubscriptionTier) => Promise<boolean>; // 🌟 Ajout de 'tier' optionnel
    handleLogout: () => void;
    updateSubscription: (newTier: SubscriptionTier) => void;
    updateProfile: (userName: string, email: string) => void; 
}

// Type combiné pour le store
export type AppStore = AppState & AppActions;

// --- 2. Fonctions Utilitaires pour l'Initialisation/Hydratation ---

// Fonction pour gérer la classe 'dark' sur <html>
const manageDarkModeClass = (isDark: boolean) => {
    if (typeof document !== 'undefined') {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
};

// Fonction pour initialiser l'état du thème à partir de localStorage
const getInitialDarkMode = (): boolean => {
    if (typeof window === 'undefined') return false; 
    
    const savedMode = localStorage.getItem('theme');
    const isDark = savedMode === 'dark';
    manageDarkModeClass(isDark); // Appliquer immédiatement
    return isDark;
};


// --- 3. Création du Store Zustand ---

export const useAppStore = create<AppStore>()(
    persist(
        (set, get) => ({
            // --- État Initial ---
            // 🌟 Mise à jour : isLoggedIn est false par défaut (sera mis à jour par l'hydratation si besoin)
            isLoggedIn: false, 
            userName: 'Visiteur',
            email: 'visiteur@ai-stock.com', 
            subscription: 'Gratuit', 
            isDarkMode: getInitialDarkMode(), 

            // --- Actions ---

            toggleDarkMode: () => {
                set((state) => {
                    const newMode = !state.isDarkMode;
                    manageDarkModeClass(newMode);
                    return { isDarkMode: newMode };
                });
            },

            // Mise à jour : Accepte la tierce d'abonnement optionnelle
            simulateLogin: (username = 'Alice Dupont', email = 'alice@ai-stock.com', tier: SubscriptionTier = 'Gratuit') => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        set({
                            isLoggedIn: true,
                            userName: username,
                            email: email, 
                            subscription: tier, // <-- Utilise la tierce fournie ou 'Gratuit'
                        });
                        resolve(true);
                    }, 1500);
                });
            },

            handleLogout: () => {
                // 🌟 S'assurer que les valeurs par défaut sont claires
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
            }
        }),
        {
            name: 'ai-stock-storage', 
            storage: createJSONStorage(() => localStorage), 
            
            // 🌟 Modification : Persister isLoggedIn si l'utilisateur est connecté
            partialize: (state) => ({ 
                isDarkMode: state.isDarkMode,
                userName: state.userName,
                email: state.email,
                subscription: state.subscription,
                // On persiste isLoggedIn s'il est vrai, pour gérer l'auto-login.
                isLoggedIn: state.isLoggedIn, 
            }), 
            
            // 🌟 Modification : Logique d'Hydratation
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                
                // 1. Gérer le thème
                manageDarkModeClass(state.isDarkMode);

                // 2. Tenter l'auto-connexion si les infos de session sont présentes
                // On considère que l'utilisateur est connecté si son nom est différent de 'Visiteur' OU si isLoggedIn a été persisté comme vrai
                // if (state.isLoggedIn) {
                //     // Rétablir les données utilisateur et forcer isLoggedIn à true
                //     set({
                //         isLoggedIn: true,
                //         userName: state.userName,
                //         email: state.email,
                //         subscription: state.subscription,
                //     });
                // } else {
                //     // S'assurer qu'il est déconnecté si rien n'indique le contraire
                //     set({ isLoggedIn: false });
                // }
            },
        },
    ),
);