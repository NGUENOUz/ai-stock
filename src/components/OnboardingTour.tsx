// src/components/OnboardingTour.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconCrown, IconCopy, IconSparkles, IconArrowRight, IconLock, IconLogin } from "@tabler/icons-react";

// Importez l'interface si vous la définissez ailleurs, sinon elle est ici
// import { useAppStore } from "@/store/useAppStore"; 
// Note : J'utilise une simulation ici pour l'isolation, mais vous utiliserez le VRAI store
const useAppStore = () => ({
    setHasSeenTour: (page: 'prompts' | 'formations', seen: boolean) => {
        // Logique de votre store Zustand
        console.log(`ZUSTAND: Marque le tour ${page} comme vu.`);
    }
});


// --- Interfaces pour la dynamique ---

export interface SlideData {
    title: string;
    description: string;
    icon: React.FC<any>;
}

export interface OnboardingTourProps {
    slides: SlideData[];
    pageTitle: string; // Ex: "l'Usine à Prompts Gold" ou "la Librairie des Formations"
    pageId: 'prompts' | 'formations'; // Utilisé pour marquer le tour comme vu dans Zustand
}

interface SlideComponentProps extends SlideData {
    index: number;
    totalSlides: number;
    onNext: () => void;
    pageId: 'prompts' | 'formations';
}

// --- Composant Slide (Contenu unique de chaque étape) ---
const Slide: React.FC<SlideComponentProps> = ({ index, totalSlides, title, description, icon: Icon, onNext, pageId }) => {
    const isLast = index === totalSlides - 1;
    const { setHasSeenTour } = useAppStore(); // Récupérer l'action du store

    // Fonction pour marquer le tour comme vu avant la navigation
    const handleAction = () => {
        setHasSeenTour(pageId, true);
    };

    return (
        <div className="flex flex-col items-center p-8 text-center">
            <Icon className="w-16 h-16 text-yellow-400 mb-6 drop-shadow-[0_0_10px_rgba(255,215,100,0.7)]" />
            <h2 className="text-3xl font-extrabold text-white mb-4">{title}</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-sm">{description}</p>
            
            {/* Barre de progression des slides */}
            <div className="flex space-x-2 mb-8">
                {Array.from({ length: totalSlides }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            i === index ? 'w-8 bg-yellow-500' : 'w-2 bg-neutral-700'
                        }`}
                    />
                ))}
            </div>

            {/* Boutons de navigation/conversion */}
            <div className="flex flex-col space-y-3 w-full max-w-sm">
                {!isLast ? (
                    <button 
                        onClick={onNext} 
                        className="flex items-center justify-center text-black bg-yellow-500 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition duration-300"
                    >
                        Suivant <IconArrowRight className="w-4 h-4 ml-2" />
                    </button>
                ) : (
                    // Écran final : options de conversion
                    <>
                        {/* Option 1: Essai Gratuit -> Inscription. OnComplete géré par le Link. */}
                        <Link 
                            href="/signup?plan=free" 
                            onClick={handleAction} // Marque le tour comme vu
                            className="flex items-center justify-center bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition duration-300"
                        >
                            Essayer l'Essai Gratuit
                        </Link>
                        
                        {/* Option 2: Abonnement -> Tarification */}
                        <Link 
                            href="/pricing" 
                            onClick={handleAction} // Marque le tour comme vu
                            className="text-white flex items-center justify-center bg-neutral-700 px-6 py-3 rounded-xl font-bold hover:bg-neutral-600 transition duration-300"
                        >
                            Prendre un Abonnement
                        </Link>
                        
                        {/* Option 3: J'ai déjà un compte -> Connexion */}
                        <Link 
                            href="/login" 
                            onClick={handleAction} // Marque le tour comme vu
                            className="flex items-center justify-center text-gray-400 text-sm hover:text-white mt-2 transition duration-200"
                        >
                            <IconLogin className="w-4 h-4 mr-1"/> J'ai déjà un compte
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

// --- Composant Principal OnboardingTour (Modal) ---
const OnboardingTour: React.FC<OnboardingTourProps> = ({ slides, pageTitle, pageId }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const currentSlideData = slides[currentSlide];

    return (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
            <div 
                className="
                    relative rounded-3xl w-full max-w-lg
                    bg-white/10 dark:bg-neutral-900/40
                    backdrop-blur-3xl border border-white/20
                    shadow-[0_20px_60px_rgba(255,215,120,0.3)]
                    p-6
                "
            >
                <Slide 
                    index={currentSlide} 
                    totalSlides={slides.length} 
                    title={currentSlide === 0 ? `Bienvenue sur ${pageTitle}` : currentSlideData.title}
                    description={currentSlideData.description}
                    icon={currentSlideData.icon}
                    onNext={nextSlide}
                    pageId={pageId} // Passe l'ID de la page
                />
            </div>
        </div>
    );
};

export default OnboardingTour;