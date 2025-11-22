"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
    useAppStore, 
    SubscriptionTier 
} from '@/store/useAppStore'; 
import { 
    IconSettings, 
    IconCreditCard, 
    IconUser, 
    IconAward, 
    IconChevronRight,
    IconSun, 
    IconMoon,
    IconCalendar, 
    IconRocket,  
    IconBrandDiscord, 
} from '@tabler/icons-react';
import Link from 'next/link';
import clsx from 'clsx'; 

// --- Fonction utilitaire pour formater la date
const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    try {
        // Formatage pour un affichage lisible en français
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return dateString;
    }
};

// --- Classe Glassmorphism commune
const GLASS_CLASS = "bg-white/10 dark:bg-neutral-800/30 backdrop-blur-md shadow-xl border border-white/20 dark:border-neutral-700/50";


// --- Composant Carte Abonnement Expiration ---
const SubscriptionDetailsCard = ({ subscriptionStatus, subscriptionEndDate }: { subscriptionStatus: SubscriptionTier, subscriptionEndDate: string | null }) => {
    
    const isPayingUser = subscriptionStatus === 'Premium' || subscriptionStatus === 'Pro';
    
    // Détermine la couleur de l'abonnement
    let colorClass = 'border-red-500 text-red-400';
    let iconClass = 'text-red-500';

    if (subscriptionStatus === 'Premium') {
        colorClass = 'border-green-500';
        iconClass = 'text-green-500';
    } else if (subscriptionStatus === 'Pro') {
        colorClass = 'border-yellow-500';
        iconClass = 'text-yellow-500';
    }

    return (
        <div className={clsx(
            "p-6 rounded-xl shadow-lg lg:col-span-2 flex flex-col justify-between h-full transition duration-300 transform hover:scale-[1.01]",
            GLASS_CLASS
        )}>
            <h2 className="text-xl font-semibold mb-3 flex items-center text-yellow-400">
                <IconCalendar className="w-6 h-6 mr-3" />
                Détails de l'Abonnement
            </h2>
            
            <div className="space-y-3 text-base">
                <p className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-300">Statut :</span> 
                    <span className={clsx("font-bold", iconClass)}>{subscriptionStatus}</span>
                </p>
                
                <p className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-300">Expire le :</span> 
                    <span className="font-medium text-white">
                        {isPayingUser ? formatDate(subscriptionEndDate) : 'Jamais (Plan Gratuit)'}
                    </span>
                </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
                <Link href="/pricing" passHref>
                    <button className="w-full flex items-center justify-center p-3 font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-500 transition duration-200 text-black shadow-md">
                        <IconRocket className="w-5 h-5 mr-2" />
                        {isPayingUser ? 'Prolonger mon abonnement' : 'Passer à Premium'}
                    </button>
                </Link>
            </div>
        </div>
    );
};

// --- Composant Carte d'Action Glassmorphism Réutilisable ---
const ActionCard = ({ 
    title, 
    description, 
    icon: Icon, 
    href,
    onClick,
}: { 
    title: string, 
    description: string, 
    icon: React.ElementType, 
    href?: string,
    onClick?: () => void,
}) => {
    const content = (
        <div 
            className={clsx(
                "flex items-center justify-between p-6 rounded-xl transition duration-300 cursor-pointer hover:bg-white/20 dark:hover:bg-neutral-700/40 hover:shadow-2xl h-full", 
                GLASS_CLASS,
                "border-l-4 border-yellow-500"
            )}
            onClick={onClick}
        >
            <div className="flex items-center">
                <Icon className="w-7 h-7 mr-4 text-yellow-400 flex-shrink-0" />
                <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{description}</p>
                </div>
            </div>
            {href && <IconChevronRight className="w-6 h-6 text-gray-400 ml-4 flex-shrink-0" />}
        </div>
    );

    return href ? (
        <Link href={href} passHref className="h-full">
            {content}
        </Link>
    ) : (
        <div className="h-full">
            {content}
        </div>
    );
};


// --- Composant Principal du Dashboard ---
const DashboardPage = () => {
    const { 
        isLoggedIn, 
        userName, 
        subscription, 
        subscriptionEndDate, 
        isDarkMode, 
        toggleDarkMode 
    } = useAppStore(); 
    const router = useRouter();

    useEffect(() => {
        // Redirection vers /login si non connecté
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    // Affichage d'un écran de chargement (si l'état n'est pas encore vérifié)
    if (!isLoggedIn) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-900 dark:bg-gray-950 text-white">
                Vérification de l'authentification en cours...
            </div>
        );
    }

    const subscriptionStatus: SubscriptionTier = subscription;

    // Détermine les classes de bordure pour la première carte de statut
    const statusBorderClass = subscriptionStatus === 'Pro' 
        ? 'border-yellow-500' 
        : subscriptionStatus === 'Premium' 
        ? 'border-green-500' 
        : 'border-red-500';

    const statusTextColor = subscriptionStatus === 'Pro' 
        ? 'text-yellow-400' 
        : subscriptionStatus === 'Premium' 
        ? 'text-green-400' 
        : 'text-red-400';

    return (
        <div className="min-h-screen bg-neutral-900 dark:bg-gray-950 text-white p-4 sm:p-8 lg:p-12 pt-10 relative overflow-hidden">
            {/* Arrière-plan flou pour l'effet Glassmorphism (Assurez-vous d'avoir l'animation .animate-blob dans votre CSS global) */}
            <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
                Espace Client AI-Stock
            </h1>
            <p className="text-gray-400 mb-12">
                Gérez votre compte, votre abonnement et votre accès communautaire, **{userName}**.
            </p>

            {/* --- Ligne d'informations principales (Statut + Expiration) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                
                {/* 1. Statut Actuel */}
                <div className={clsx(
                    "p-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.01] flex flex-col justify-between", 
                    GLASS_CLASS,
                    `border-t-4 ${statusBorderClass}`
                )}>
                    <div>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <IconAward className="w-6 h-6 mr-3 text-yellow-400" />
                            Statut de la Communauté
                        </h2>
                        <p className="text-gray-200">
                            Votre plan est : 
                            <span className={clsx("font-bold ml-1", statusTextColor)}>
                                {subscriptionStatus}
                            </span>
                        </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                        {subscriptionStatus === 'Gratuit' ? 'Accès limité. Passez Premium pour débloquer tout le contenu.' : 'Accès complet aux prompts, outils et formations !'}
                    </p>
                </div>
                
                {/* 2. Date de Fin d'Abonnement et Prolongation */}
                <SubscriptionDetailsCard 
                    subscriptionStatus={subscriptionStatus} 
                    subscriptionEndDate={subscriptionEndDate} 
                />
            </div>

            {/* --- Cartes d'Action Rapides (Glassmorphism) --- */}
            <h2 className="text-2xl font-bold mt-10 mb-6 border-b border-neutral-700/50 pb-2 text-white">
                Actions & Accès Rapides
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Modifier le profil */}
                <ActionCard 
                    title="Modifier mon profil"
                    description="Mettez à jour vos informations de base et votre mot de passe."
                    icon={IconSettings}
                    href="/account/settings"
                />

                {/* 2. Communauté Discord (Conditionnel pour Pro) */}
                {(subscriptionStatus === 'Pro') && (
                    <ActionCard 
                        title="Communauté Discord (PRO)"
                        description="Accès exclusif au canal Pro pour le support prioritaire et le networking."
                        icon={IconBrandDiscord}
                        href="/community/discord" // URL locale qui redirige vers le lien Discord
                    />
                )}

                {/* 3. Gérer le thème (Toujours affiché) */}
                <ActionCard 
                    title={isDarkMode ? "Mode Clair" : "Mode Sombre"}
                    description={`Thème actuel: ${isDarkMode ? 'Sombre' : 'Clair'}. Basculer l'apparence.`}
                    icon={isDarkMode ? IconSun : IconMoon}
                    onClick={toggleDarkMode}
                />
                
                {/* Carte de Pricing/Abonnement si l'utilisateur n'est pas Pro (pour maximiser la conversion) */}
                 {(subscriptionStatus !== 'Pro') && (
                    <ActionCard 
                        title="Voir les plans"
                        description="Comparez nos plans et passez au niveau supérieur."
                        icon={IconCreditCard}
                        href="/pricing"
                    />
                )}
            </div>
            
            {/* Pied de page */}
            <div className="mt-16 text-center text-gray-500 text-sm border-t border-neutral-800/50 pt-8">
                <p>Développé avec passion pour la communauté IA. <Link href="/contact" className="text-yellow-400 hover:underline transition-colors duration-200">Contactez le support</Link>.</p>
            </div>
        </div>
    );
};

export default DashboardPage;