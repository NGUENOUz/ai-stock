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
    email: string; // <-- Ajout de l'email
    subscription: SubscriptionTier; // <-- Remplace isPremium par la tierce d'abonnement
    
    // Thème
    isDarkMode: boolean;
}

interface AppActions {
    // Actions
    toggleDarkMode: () => void;
    // Mise à jour de simulateLogin pour accepter l'email
    simulateLogin: (username: string, email: string) => Promise<boolean>; 
    handleLogout: () => void;
    // Nouvelle action pour mettre à jour l'abonnement
    updateSubscription: (newTier: SubscriptionTier) => void;
    // Action pour mettre à jour les infos du profil
    updateProfile: (userName: string, email: string) => void; 
}

// Type combiné pour le store
export type AppStore = AppState & AppActions;

// --- 2. Création du Store Zustand ---

// Fonction pour initialiser l'état du thème à partir de localStorage (pour l'hydratation)
const getInitialDarkMode = (): boolean => {
    if (typeof window === 'undefined') return false; 
    
    const savedMode = localStorage.getItem('theme');
    // Appliquer immédiatement la classe 'dark' à la balise <html> lors de l'initialisation côté client
    if (savedMode === 'dark') {
        document.documentElement.classList.add('dark');
        return true;
    } else {
        document.documentElement.classList.remove('dark');
        return false;
    }
};

export const useAppStore = create<AppStore>()(
    // Utilisation du middleware 'persist' pour stocker l'état (ici seulement le thème)
    persist(
        (set, get) => ({
            // --- État Initial ---
            isLoggedIn: false,
            userName: 'Visiteur',
            email: 'visiteur@ai-stock.com', // <-- Valeur par défaut
            subscription: 'Gratuit', // <-- État initial de l'abonnement
            isDarkMode: getInitialDarkMode(), 

            // --- Actions ---

            toggleDarkMode: () => {
                set((state) => {
                    const newMode = !state.isDarkMode;
                    
                    // Gestion de la classe 'dark' sur l'élément <html>
                    if (newMode) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    
                    return { isDarkMode: newMode };
                });
            },

            // Mise à jour : Accepte l'email, définit l'abonnement à 'Gratuit'
            simulateLogin: (username = 'Alice Dupont', email = 'alice@ai-stock.com') => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        set({
                            isLoggedIn: true,
                            userName: username,
                            email: email, // <-- Enregistrement de l'email
                            subscription: 'Gratuit', // <-- Toujours 'Gratuit' au login
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

            // Nouvelle action pour mettre à jour l'abonnement
            updateSubscription: (newTier: SubscriptionTier) => {
                set({ subscription: newTier });
            },

            // Nouvelle action pour mettre à jour le profil (pour /account/settings)
            updateProfile: (newUserName: string, newEmail: string) => {
                set({ userName: newUserName, email: newEmail });
            }
        }),
        {
            name: 'ai-stock-storage', 
            storage: createJSONStorage(() => localStorage), 
            // Ne persister que le thème et les infos utilisateur (pour l'auto-login)
            // Note: Dans une app réelle, l'isLoggedIn ne serait pas persisté directement
            partialize: (state) => ({ 
                isDarkMode: state.isDarkMode,
                userName: state.userName,
                email: state.email,
                subscription: state.subscription,
            }), 
            onRehydrateStorage: (state) => {
                // S'assurer que le mode sombre est appliqué lors du rechargement
                if (state?.isDarkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },
        },
    ),
);