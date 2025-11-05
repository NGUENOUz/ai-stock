// src/app/pricing/page.tsx
"use client";

import React from 'react';
import { useAppStore, SubscriptionTier } from '@/store/useAppStore'; // Import du store et du type
import { IconCheck, IconX, IconLock, IconAward } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// --- 1. Définition des Interfaces pour TypeScript ---

// Interface pour les objets de Plan (Plans Data)
interface PlanData {
    tier: SubscriptionTier;
    price: string;
    period: string;
    description: string;
    features: { text: string; included: boolean }[];
    buttonText: string;
    variant: 'current' | 'primary' | 'pro' | 'secondary';
}

// Interface pour les Props du Composant PricingCard (Résout l'erreur de type)
interface PricingCardProps {
    plan: PlanData;
    currentTier: SubscriptionTier;
    onSelectPlan: (newTier: SubscriptionTier) => void;
}

// --- 2. Définition des Données des Plans ---

const plans: PlanData[] = [ // Utilisation de l'interface PlanData
    {
        tier: 'Gratuit',
        price: '0€',
        period: 'Pour toujours',
        description: 'Idéal pour découvrir nos outils d\'IA.',
        features: [
            { text: 'Accès limité aux Prompts Populaires (5/20)', included: true },
            { text: 'Une formation déverrouillée', included: true },
            { text: 'Analyse boursière IA en temps différé (24h)', included: true },
            { text: 'Suivi de portefeuille limité (2 actions)', included: false },
            { text: 'Alertes personnalisées en temps réel', included: false },
        ],
        buttonText: 'Plan Actuel',
        variant: 'current',
    },
    {
        tier: 'Premium',
        price: '19€',
        period: '/mois',
        description: 'Passez à la vitesse supérieure dans l\'analyse IA.',
        features: [
            { text: 'Accès illimité aux Prompts Populaires', included: true },
            { text: 'Toutes les formations déverrouillées', included: true },
            { text: 'Analyse boursière IA en temps réel', included: true },
            { text: 'Suivi de portefeuille complet (20 actions)', included: true },
            { text: 'Alertes personnalisées en temps réel', included: false },
        ],
        buttonText: 'Choisir Premium',
        variant: 'primary',
    },
    {
        tier: 'Pro',
        price: '49€',
        period: '/mois',
        description: 'La puissance maximale pour les investisseurs avancés.',
        features: [
            { text: 'Accès illimité aux Prompts Populaires', included: true },
            { text: 'Toutes les formations déverrouillées', included: true },
            { text: 'Analyse boursière IA en temps réel', included: true },
            { text: 'Suivi de portefeuille illimité', included: true },
            { text: 'Alertes personnalisées en temps réel', included: true },
        ],
        buttonText: 'Choisir Pro',
        variant: 'pro',
    },
];

// --- 3. Composant Carte de Tarification (avec Props typées) ---

const PricingCard = ({ plan, currentTier, onSelectPlan }: PricingCardProps) => {
    const isCurrent = plan.tier === currentTier;

    // Styles conditionnels
    const cardClass = cn(
        "flex flex-col p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.03] border",
        plan.tier === 'Pro' ? "bg-neutral-800 border-yellow-500" : "bg-neutral-800 border-neutral-700",
        isCurrent ? "ring-4 ring-yellow-500/50" : "hover:shadow-yellow-500/20"
    );

    const buttonClass = cn(
        "mt-auto w-full py-3 rounded-lg font-bold transition duration-200",
        isCurrent ? 
            "bg-gray-600 text-gray-400 cursor-not-allowed" : // Actuel
            plan.variant === 'primary' ? "bg-yellow-500 text-black hover:bg-yellow-400" : // Premium
            plan.variant === 'pro' ? "bg-black text-white border-2 border-yellow-500 hover:bg-neutral-900" : // Pro
            "bg-neutral-600 text-white hover:bg-neutral-500" // Gratuit
    );
    
    // Fonctionnalité du bouton
    const handleButtonClick = () => {
        if (!isCurrent) {
            onSelectPlan(plan.tier);
            // Ici, dans une vraie app, on lancerait le processus de paiement
            alert(`Simulation d'abonnement au plan ${plan.tier}. Redirection vers le paiement...`);
        }
    };

    return (
        <div className={cardClass}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{plan.tier}</h3>
                {isCurrent && (
                    <span className="text-xs bg-yellow-500 text-black font-semibold px-3 py-1 rounded-full flex items-center">
                        <IconAward className="w-4 h-4 mr-1" /> Plan Actif
                    </span>
                )}
            </div>

            <p className="text-4xl font-extrabold mb-1">
                {plan.price}
                {plan.period !== 'Pour toujours' && <span className="text-base font-normal text-gray-400">{plan.period}</span>}
            </p>
            <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                        {feature.included ? (
                            <IconCheck className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                        ) : (
                            <IconLock className="w-5 h-5 mr-3 text-red-400 flex-shrink-0" />
                        )}
                        <span className={cn(feature.included ? 'text-gray-300' : 'text-gray-500 line-through')}>
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                className={buttonClass}
                onClick={handleButtonClick}
                disabled={isCurrent}
            >
                {isCurrent ? plan.buttonText : `Sélectionner ${plan.tier}`}
            </button>
        </div>
    );
};

// --- 4. Composant Principal de la Page ---

const PricingPage = () => {
    const { subscription, isLoggedIn, updateSubscription } = useAppStore();

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-8 lg:p-12">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold mb-3">Choisissez votre Plan</h1>
                <p className="text-xl text-gray-400">
                    Débloquez la puissance de l'IA pour vos décisions d'investissement.
                </p>
                {isLoggedIn && (
                    <p className="mt-4 text-lg font-medium text-yellow-500">
                        Votre plan actuel : **{subscription}**.
                    </p>
                )}
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PricingCard 
                        key={plan.tier}
                        plan={plan}
                        currentTier={subscription}
                        onSelectPlan={updateSubscription}
                    />
                ))}
            </div>

            <footer className="text-center mt-16 text-gray-500">
                <p>* Simulation : Cette action met à jour votre statut dans l'application locale.</p>
                {!isLoggedIn && (
                    <p className="mt-2 text-yellow-500">Veuillez <Link href="/login" className="underline">vous connecter</Link> pour sélectionner un plan.</p>
                )}
            </footer>
        </div>
    );
};

export default PricingPage;