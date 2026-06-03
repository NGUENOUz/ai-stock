"use client";

import React, { use } from "react";
import { useRouter, notFound } from "next/navigation";
import { Lesson, Training, Instructor } from "@/types/training";
import { useAppStore } from "@/store/useAppStore";
import { Lock, ArrowLeft, Clock, ListChecks, ChevronLeft, ChevronRight, Crown } from "lucide-react";

// === Données de démonstration (inchangées) ===
const DUMMY_INSTRUCTOR: Instructor = {
    id: "instr1",
    name: "Alex Dupont",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    bio: "Expert IA et formateur depuis 10 ans."
};
const getImageUrl = (seed: number) => `https://picsum.photos/seed/${seed}/800/450`;
const LESSONS_PROMPT: Lesson[] = [
    { id: "l1", title: "Introduction au Prompt Engineering", duration: "05:30", isFreePreview: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" },
    { id: "l2", title: "Comprendre le Rôle et l'Audience", duration: "12:00", isFreePreview: false, videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2?rel=0" },
    { id: "l3", title: "Les 5 Techniques Avancées de Cadrage", duration: "20:15", isFreePreview: false, videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3?rel=0" },
    { id: "l4", title: "Workshop: Création de 10 Prompts Ciblés", duration: "45:00", isFreePreview: false, videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4?rel=0" }
];
const ALL_TRAININGS: Training[] = [
    {
        id: "t1",
        title: "Maîtriser le Prompt Engineering (Niveau Expert)",
        imageUrl: getImageUrl(10),
        category: "IA & Prompt",
        language: "Français",
        price: 0,
        durationMinutes: 180,
        numberOfVideos: 15,
        instructor: DUMMY_INSTRUCTOR,
        shortDescription: "Apprenez les techniques de prompt les plus avancées.",
        longDescription: "Description longue et détaillée de la formation Prompt Engineering...",
        lessons: LESSONS_PROMPT,
        isPremium: false
    },
    {
        id: "t2",
        title: "Photographie Aérienne par Drone (Premium)",
        imageUrl: getImageUrl(20),
        category: "Création Vidéo",
        language: "Français",
        price: 0,
        durationMinutes: 240,
        numberOfVideos: 18,
        instructor: DUMMY_INSTRUCTOR,
        shortDescription: "Maîtrisez le pilotage de drone et la post-production.",
        longDescription: "Formation Drone Premium...",
        lessons: LESSONS_PROMPT,
        isPremium: true // Exemple de formation Premium
    },
];
// === Fin des données démo ===

// 💎 Style Gold CTA pour les boutons de navigation
const GOLD_NAV_CLASSES = `
    flex items-center text-sm font-bold py-3 px-4 rounded-xl transition-all duration-500
    bg-gradient-to-br from-purple-500 to-blue-600 text-white
    shadow-[0_4px_15px_rgba(139,92,246,0.35)]
    hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] hover:-translate-y-0.5
`;

// 💎 Style Glassmorphism pour le conteneur
const GLASS_CONTAINER_CLASSES = `
    p-6 rounded-3xl sticky top-6
    bg-white/15 dark:bg-neutral-900/25
    backdrop-blur-3xl
    border border-white/20 dark:border-white/10
    shadow-[0_8px_35px_rgba(0,0,0,0.3)]
`;

interface LessonPageProps {
    params: Promise<{ id: string; lessonId: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
    const { id, lessonId } = use(params);
    const router = useRouter();
    const { isLoggedIn, subscription } = useAppStore();

    const training = ALL_TRAININGS.find((t) => t.id === id);
    if (!training) notFound();

    const currentLesson = training.lessons.find((l) => l.id === lessonId);
    if (!currentLesson) notFound();

    const isPremiumMember = subscription === "Premium" || subscription === "Pro";
    const hasAccess =
        (!training.isPremium && isLoggedIn) || (training.isPremium && isPremiumMember);
    
    // Détermine si le contenu de la leçon actuelle est verrouillé
    const isLocked = !currentLesson.isFreePreview && !hasAccess;

    // Trouver la position et la navigation entre leçons
    const currentIndex = training.lessons.findIndex((l) => l.id === lessonId);
    const nextLesson = training.lessons[currentIndex + 1];
    const prevLesson = training.lessons[currentIndex - 1];

    const handleLessonNavigation = (lessonId: string) => {
        router.push(`/formations/${id}/lesson/${lessonId}`);
    };

    return (
        <div className="min-h-screen bg-neutral-900/40 py-12 dark:bg-neutral-900/80">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* 💎 Header Retour */}
                <button
                    onClick={() => router.push(`/formations/${id}`)}
                    className="
                        flex items-center text-sm font-semibold mb-8
                        text-gray-400 hover:text-purple-400 transition-colors duration-300
                    "
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la formation : **{training.title}**
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Colonne Principale (Vidéo, Titre, Navigation) - 2/3 */}
                    <main className="lg:col-span-2">
                        
                        {/* 💎 Lecteur Vidéo (Style Premium) */}
                        <div className="relative aspect-video bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden mb-8 border border-white/20">
                            {/* 💎 Iframe / Contenu vidéo */}
                            {!isLocked ? (
                                <iframe
                                    src={currentLesson.videoUrl}
                                    title={currentLesson.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-0"
                                ></iframe>
                            ) : (
                                // 💎 Overlay de Verrouillage (Premium Lock)
                                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center text-white z-10">
                                    <Lock className="w-14 h-14 mb-4 text-purple-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
                                    <h3 className="text-2xl font-extrabold mb-2">Leçon Verrouillée</h3>
                                    <p className="text-gray-300 text-center max-w-sm">
                                        Cette leçon nécessite l'**Accès Premium** ou l'achat de la formation complète.
                                    </p>
                                    <button
                                        onClick={() => router.push('/premium')}
                                        className="
                                            mt-6 py-3 px-8 rounded-xl font-bold flex items-center
                                            bg-gradient-to-br from-purple-500 to-blue-600
                                            text-white shadow-[0_4px_20px_rgba(139,92,246,0.45)]
                                            hover:shadow-[0_6px_25px_rgba(139,92,246,0.6)] transition-all duration-500
                                        "
                                    >
                                        <Crown className="w-5 h-5 mr-2" />
                                        Débloquer tout le contenu
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Infos sur la leçon */}
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100 dark:text-gray-100 mb-2 tracking-tight">
                            <span className="text-purple-400 text-2xl mr-3">{currentIndex + 1}.</span>
                            {currentLesson.title}
                        </h1>
                        <p className="text-gray-400 flex items-center mb-10 font-medium">
                            <Clock className="w-4 h-4 mr-2 text-purple-400" /> Durée estimée : {currentLesson.duration}
                            {currentLesson.isFreePreview && (
                                <span className="ml-4 px-3 py-0.5 rounded-full bg-emerald-700/50 text-emerald-400 text-xs font-semibold">APERÇU GRATUIT</span>
                            )}
                        </p>

                        {/* 💎 Navigation entre les leçons (Style Gold Edition) */}
                        <div className="flex justify-between items-center mt-6 p-4">
                            {/* Bouton Précédent */}
                            {prevLesson ? (
                                <button
                                    onClick={() => handleLessonNavigation(prevLesson.id)}
                                    className={`${GOLD_NAV_CLASSES}`}
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" /> 
                                    Leçon Précédente
                                </button>
                            ) : (
                                <span className="w-40" /> // Espace réservé pour l'alignement
                            )}

                            {/* Bouton Suivant */}
                            {nextLesson ? (
                                <button
                                    onClick={() => handleLessonNavigation(nextLesson.id)}
                                    // 💎 Si la prochaine leçon est verrouillée, désactiver le style Gold
                                    disabled={!nextLesson.isFreePreview && !hasAccess}
                                    className={`${nextLesson.isFreePreview || hasAccess ? GOLD_NAV_CLASSES : 'px-4 py-2 rounded-xl bg-gray-700 text-gray-400 cursor-not-allowed text-sm font-bold flex items-center opacity-70'}`}
                                >
                                    Leçon Suivante 
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </button>
                            ) : (
                                <span className="w-40" /> // Espace réservé pour l'alignement
                            )}
                        </div>
                    </main>

                    {/* Colonne Latérale (Liste des leçons) - 1/3 */}
                    <aside className="lg:col-span-1">
                        <div className={`${GLASS_CONTAINER_CLASSES}`}>
                            <h3 className="text-xl font-bold flex items-center mb-6 dark:text-gray-100 tracking-wide">
                                <ListChecks className="w-5 h-5 mr-3 text-purple-400 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
                                Programme de la Formation
                            </h3>

                            <ul className="space-y-2">
                                {training.lessons.map((lesson, index) => {
                                    const canNavigate = lesson.isFreePreview || hasAccess;
                                    const isActive = lesson.id === currentLesson.id;
                                    const isNextLocked = !lesson.isFreePreview && !hasAccess;

                                    return (
                                        <li
                                            key={lesson.id}
                                            onClick={() => canNavigate && handleLessonNavigation(lesson.id)}
                                            className={`
                                                flex justify-between items-center p-3 rounded-xl transition-all duration-300
                                                border border-white/10 text-sm font-medium
                                                ${isActive
                                                    ? "bg-purple-600 text-white shadow-inner shadow-purple-800/50"
                                                    : canNavigate
                                                        ? "bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-200 cursor-pointer hover:border-purple-400/50"
                                                        : "bg-white/5 dark:bg-white/2 dark:text-gray-400 opacity-60 cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            <div className="flex items-center">
                                                <span className={`font-bold mr-3 w-5 text-center ${isActive ? 'text-white' : 'text-purple-400'}`}>
                                                    {index + 1}.
                                                </span>
                                                <span className={`${isActive ? 'font-bold' : ''}`}>{lesson.title}</span>
                                            </div>
                                            <div className="flex items-center text-xs space-x-2">
                                                {isNextLocked && <Lock className="w-3.5 h-3.5 text-red-400" />}
                                                <span className={isActive ? 'text-black/70' : 'text-gray-400'}>
                                                    {lesson.duration}
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}