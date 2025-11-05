// src/app/dashboard/page.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore, SubscriptionTier } from '@/store/useAppStore'; // <-- Import de SubscriptionTier
import { IconSettings, IconCreditCard, IconUser, IconAward, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

const DashboardPage = () => {
    // 1. État et actions Zustand
    // Récupération de userName, email, et surtout subscription
    const { isLoggedIn, userName, email, subscription } = useAppStore(); 
    const router = useRouter();

    // 2. Protection de la route (Hook)
    useEffect(() => {
        // Redirection vers /login si non connecté
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    // Affichage d'un écran de chargement si l'état n'est pas encore vérifié
    if (!isLoggedIn) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
                Vérification de l'authentification...
            </div>
        );
    }

    const subscriptionStatus: SubscriptionTier = subscription;

    // --- Composant Carte d'Action Réutilisable ---
    const ActionCard = ({ title, description, icon: Icon, href }: { title: string, description: string, icon: React.ElementType, href: string }) => (
        <Link href={href} passHref>
            <div className="flex items-center justify-between bg-neutral-800 p-6 rounded-lg shadow-md hover:bg-neutral-700/80 transition duration-200 cursor-pointer border-l-4 border-yellow-500">
                <div className="flex items-center">
                    <Icon className="w-6 h-6 mr-4 text-yellow-500" />
                    <div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{description}</p>
                    </div>
                </div>
                <IconChevronRight className="w-5 h-5 text-gray-400" />
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-8 lg:p-12">
            <h1 className="text-4xl font-bold mb-2">Espace Client</h1>
            <p className="text-gray-400 mb-8">Gérez votre compte et vos abonnements, **{userName}**.</p>

            {/* --- Statut Actuel et Informations de Base --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                
                {/* Statut de l'Abonnement */}
                <div className="bg-neutral-800 p-6 rounded-lg shadow-md border-t-4 
                    // Changement de couleur dynamique en fonction du statut
                    border-red-500 
                    // {subscriptionStatus === 'Premium' ? 'border-green-500' : subscriptionStatus === 'Pro' ? 'border-yellow-500' : 'border-red-500'} 
                    lg:col-span-1"
                >
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                        <IconAward className="w-5 h-5 mr-2 text-yellow-500" />
                        Abonnement
                    </h2>
                    <p className="text-sm text-gray-300">Statut actuel : 
                        <span className={`font-bold ml-1 
                            ${subscriptionStatus === 'Premium' ? 'text-green-400' : subscriptionStatus === 'Pro' ? 'text-yellow-400' : 'text-red-400'}`}
                        >
                            {subscriptionStatus}
                        </span>
                    </p>
                    {subscriptionStatus === 'Gratuit' && (
                        <p className="text-xs text-gray-500 mt-1">Vous bénéficiez de l'accès aux fonctionnalités de base d'AI-Stock.</p>
                    )}
                </div>
                
                {/* Informations de l'utilisateur */}
                <div className="bg-neutral-800 p-6 rounded-lg shadow-md lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                        <IconUser className="w-5 h-5 mr-2 text-yellow-500" />
                        Mes Informations
                    </h2>
                    <div className="space-y-1 text-sm">
                        <p>Nom d'utilisateur : <span className="font-medium text-white">{userName}</span></p>
                        <p>Email : <span className="font-medium text-white">{email}</span></p>
                    </div>
                </div>
            </div>


            {/* --- Cartes d'Action (Fonctionnalités du Dashboard) --- */}
            <h2 className="text-2xl font-bold mt-10 mb-6 border-b border-neutral-700 pb-2">Actions Rapides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Gérer l'abonnement */}
                <ActionCard 
                    title="Gérer l'abonnement"
                    description={`Votre statut est : ${subscriptionStatus}. Cliquez pour explorer nos plans Premium.`}
                    icon={IconCreditCard}
                    href="/pricing"
                />

                {/* 2. Modifier les informations */}
                <ActionCard 
                    title="Modifier mes informations"
                    description="Mettez à jour votre nom, mot de passe ou adresse e-mail."
                    icon={IconSettings}
                    href="/account/settings"
                />
            </div>
            
            {/* Pied de page */}
            <div className="mt-12 text-center text-gray-500 text-sm border-t border-neutral-800 pt-6">
                <p>Besoin d'aide ? <Link href="/contact" className="text-yellow-400 hover:underline">Contactez le support</Link>.</p>
            </div>
        </div>
    );
};

export default DashboardPage;