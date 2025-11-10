// src/app/formations/[trainingId]/lesson/[lessonId]/page.tsx
"use client";
import React from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Clock, Video, ListChecks, Lock, ArrowLeft, ArrowRight, BookOpen, Crown } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Training, Lesson, Instructor } from '@/types/training'; // Assurez-vous d'importer les types

// --- DONNÉES DE DÉMONSTRATION (RÉUTILISÉES) ---
const DUMMY_INSTRUCTOR: Instructor = {
    id: 'instr1',
    name: 'Alex Dupont',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    bio: "Expert en IA et développement web."
};

const getImageUrl = (seed: number) => `https://picsum.photos/seed/${seed}/800/450`; 

const LESSONS_PROMPT: Lesson[] = [
    { id: 'l1', title: 'Introduction au Prompt Engineering', duration: '05:30', isFreePreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',  },
    { id: 'l2', title: 'Comprendre le Rôle et l\'Audience', duration: '12:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/x8H6pUuQYpM?rel=0' },
    { id: 'l3', title: 'Les 5 Techniques Avancées de Cadrage', duration: '20:15', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/1k8KtN_4xGw?rel=0' },
    { id: 'l4', title: 'Workshop: Création de 10 Prompts Ciblés', duration: '45:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/kI-W9mQ8wX0?rel=0' },
];

const ALL_TRAININGS: Training[] = [
    { id: 't1', title: 'Maîtriser le Prompt Engineering (Niveau Expert)', imageUrl: getImageUrl(10), category: 'IA & Prompt', language: 'Français', price: 0, durationMinutes: 180, numberOfVideos: 15, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Apprenez les techniques de prompt.', longDescription: 'Description longue...', lessons: LESSONS_PROMPT, isPremium: true },
    { id: 't2', title: 'SEO 2025: Les Secrets de Google RankBrain', imageUrl: getImageUrl(20), category: 'Marketing', language: 'Français', price: 0, durationMinutes: 120, numberOfVideos: 10, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Découvrez comment optimiser votre site.', longDescription: 'Description longue...', lessons: LESSONS_PROMPT, isPremium: false },
];
// --- FIN DONNÉES DE DÉMONSTRATION ---


interface LessonPageProps {
    params: 
       any
    ;
}

// Composant utilitaire pour la navigation
const LessonNavigation: React.FC<{ lesson: Lesson, index: number, total: number, trainingId: string, hasAccess: boolean }> = ({ lesson, index, total, trainingId, hasAccess }) => (
    <div className="flex justify-between items-center py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-sm">
            <span className="font-semibold mr-2">{index + 1}.</span>
            <span className="text-gray-600 dark:text-gray-400">{lesson.title}</span>
            {!lesson.isFreePreview && !hasAccess && (
                <Lock className="w-4 h-4 ml-2 text-red-500" />
            )}
        </div>
        {lesson.isFreePreview || hasAccess ? (
            <Link 
                href={`/formations/${trainingId}/lesson/${lesson.id}`}
                className="text-yellow-600 dark:text-yellow-400 font-bold hover:underline"
            >
                Voir
            </Link>
        ) : (
            <span className="text-red-500 font-bold flex items-center">
                <Crown className="w-4 h-4 mr-1" /> Premium
            </span>
        )}
    </div>
);


export default function LessonPage({ params }: LessonPageProps) {
    const { trainingId, lessonId } = params;
    const router = useRouter();
    const { isLoggedIn, subscription } = useAppStore();
    
    const training = ALL_TRAININGS.find(t => t.id === trainingId);
    
    if (!training) {
        notFound();
    }

    const lessonIndex = training.lessons.findIndex(l => l.id === lessonId);
    const lesson = training.lessons[lessonIndex];

    if (!lesson) {
        notFound();
    }

    const isPremiumMember = subscription === 'Premium' || subscription === 'Pro';
    const isPremiumTraining = training.isPremium;

    // 🌟 LOGIQUE D'ACCÈS
    // L'accès à la leçon est donné si :
    // 1. C'est un aperçu gratuit.
    // 2. L'utilisateur a l'accès complet au cours (Gratuit/Payant Standard + Connecté OU Premium + Abonné Premium).
    const HAS_FULL_ACCESS_TO_COURSE = 
        (!isPremiumTraining && isLoggedIn) || 
        (isPremiumTraining && isPremiumMember);
        
    const HAS_ACCESS_TO_LESSON = lesson.isFreePreview || HAS_FULL_ACCESS_TO_COURSE;
    
    const previousLesson = training.lessons[lessonIndex - 1];
    const nextLesson = training.lessons[lessonIndex + 1];

    const handlePremiumRedirect = () => {
        router.push('/premium');
    };
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-800 py-12">
            <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Colonne Principale (Vidéo et Contenu de la Leçon) - 3/4 */}
                <main className="lg:col-span-3">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                        {training.title}
                    </h1>
                    <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-6">
                        Leçon {lessonIndex + 1}: {lesson.title}
                    </h2>

                    {/* Lecteur Vidéo */}
                    <div className="relative aspect-video bg-black rounded-xl shadow-2xl mb-8 overflow-hidden">
                        {HAS_ACCESS_TO_LESSON ? (
                            // 1. Affiche la vidéo si l'utilisateur a accès
                            <iframe
                                src={lesson.videoUrl}
                                title={lesson.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full border-0"
                            ></iframe>
                        ) : (
                            // 2. Affiche l'overlay de verrouillage si pas d'accès
                            <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white z-10">
                                <Lock className="w-16 h-16 mb-4 text-red-500" />
                                <h3 className="text-3xl font-bold mb-2">Leçon Verrouillée</h3>
                                <p className="text-gray-300 text-center max-w-sm mb-6">
                                    Cette leçon est réservée aux membres **Premium**. Pour la débloquer, veuillez souscrire.
                                </p>
                                <button 
                                    onClick={handlePremiumRedirect}
                                    className="py-3 px-8 bg-red-600 text-white rounded-lg font-bold flex items-center hover:bg-red-700 transition-colors"
                                >
                                    <Crown className="w-6 h-6 mr-3" />
                                    Accéder au Contenu Premium
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Contenu et Navigation */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                        <h3 className="text-2xl font-bold dark:text-white mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-3 text-yellow-500" /> Notes de la Leçon
                        </h3>
                       

                        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            {previousLesson && (
                                <Link
                                    href={`/formations/${trainingId}/lesson/${previousLesson.id}`}
                                    className={`flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 transition-colors ${!previousLesson.isFreePreview && !HAS_FULL_ACCESS_TO_COURSE ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    {previousLesson.title}
                                </Link>
                            )}
                            {nextLesson && (
                                <Link
                                    href={`/formations/${trainingId}/lesson/${nextLesson.id}`}
                                    className={`flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 transition-colors ml-auto ${!nextLesson.isFreePreview && !HAS_FULL_ACCESS_TO_COURSE ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    {nextLesson.title}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            )}
                        </div>
                    </div>
                </main>

                {/* Colonne Latérale (Liste des Leçons) - 1/4 */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6">
                        <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center">
                            <ListChecks className="w-5 h-5 mr-3 text-yellow-500" />
                            Plan du Cours
                        </h3>
                        <nav>
                            {training.lessons.map((l, index) => (
                                <LessonNavigation 
                                    key={l.id}
                                    lesson={l}
                                    index={index}
                                    total={training.lessons.length}
                                    trainingId={trainingId}
                                    hasAccess={HAS_FULL_ACCESS_TO_COURSE}
                                />
                            ))}
                        </nav>
                        {/* Lien de retour à la formation */}
                        <Link 
                            href={`/formations/${trainingId}`}
                            className="mt-4 block text-center text-sm text-gray-500 dark:text-gray-400 hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4 inline mr-1" /> Retour à la description du cours
                        </Link>
                    </div>
                </aside>

            </div>
        </div>
    );
}