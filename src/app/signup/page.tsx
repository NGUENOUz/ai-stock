// src/app/signup/page.tsx
"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import Link from 'next/link'; // Utilisation de Link pour la navigation Next.js

// Composant pour l'affichage des messages (réutilisé de la page de login)
const AlertMessage = ({ message, type }: { message: string, type: 'error' | 'success' }) => (
    <div className={cn(
        "p-3 rounded-lg text-sm mb-4 border",
        type === 'error' ? "bg-red-100 border-red-400 text-red-700 dark:bg-red-950 dark:border-red-700 dark:text-red-400" :
                         "bg-green-100 border-green-400 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-400"
    )}>
        {message}
    </div>
);

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);

    // Utilisation des actions du store Zustand
    const simulateLogin = useAppStore((state) => state.simulateLogin);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        // Simple validation de la forme
        if (password.length < 6) {
            setMessage({ text: "Le mot de passe doit contenir au moins 6 caractères.", type: 'error' });
            setIsLoading(false);
            return;
        }

        try {
            // --- SIMULATION D'INSCRIPTION ---
            // Dans un vrai projet, vous feriez ici un appel à l'API Supabase pour l'inscription.
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simule le délai d'API
            // --- FIN DE SIMULATION ---

            // Si l'inscription réussit, on connecte l'utilisateur
            await simulateLogin(userName || 'Nouvel Utilisateur'); 

            setMessage({ text: "Compte créé avec succès et connexion automatique ! Redirection...", type: 'success' });
            
            // Redirection après un court délai
            setTimeout(() => {
                router.push('/dashboard'); // Rediriger vers le tableau de bord
            }, 1000);

        } catch (error) {
            setMessage({ text: "Une erreur est survenue lors de la création du compte.", type: 'error' });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-neutral-900 pt-20">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl dark:bg-neutral-950">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                    Créer un compte AI-Stock
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Rejoignez-nous pour accéder à l'analyse boursière.
                </p>

                {message && <AlertMessage message={message.text} type={message.type} />}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Champ Nom d'Utilisateur */}
                    <div>
                        <label 
                            htmlFor="username" 
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Nom d'Utilisateur
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            placeholder="Votre nom ou pseudonyme"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>
                    
                    {/* Champ Email */}
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Adresse Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="votre.email@exemple.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>

                    {/* Champ Mot de Passe */}
                    <div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Mot de passe (min. 6 caractères)
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black transition-colors",
                                // Style du bouton Jaune Vif
                                "bg-[#FFD007] hover:bg-opacity-90",
                                isLoading && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            {isLoading ? 'Inscription en cours...' : "S'inscrire et commencer"}
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center pt-2">
                    <Link 
                        href="/login" 
                        className="font-medium text-yellow-600 hover:text-yellow-500 dark:text-[#FFD007] dark:hover:text-[#FFD007]/80"
                    >
                        J'ai déjà un compte ? Me connecter
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;