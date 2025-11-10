// src/app/formations/[id]/page.tsx
"use client";
import React from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation'; // 🌟 Import du routeur
import { Training, Lesson,Instructor } from '@/types/training';
// 🌟 Import de useAppStore
import { useAppStore, SubscriptionTier } from '@/store/useAppStore'; 
// 🌟 Ajout des icônes nécessaires
import { Clock, Video, DollarSign, User, Zap, ListChecks, Lock, Crown, LogIn, UserPlus } from 'lucide-react'; 

// --- DONNÉES DE DÉMONSTRATION (Assurez-vous qu'elles correspondent à vos types) ---
const DUMMY_INSTRUCTOR: Instructor = {
    id: 'instr1',
    name: 'Alex Dupont',
    avatarUrl: 'https://i.pravatar.cc/150?img=1', // Placeholder avatar
    bio:"ygsfg fghsfh fhsfhs sgdsdg sdgsgd"
};


const getImageUrl = (seed: number) => `https://picsum.photos/seed/${seed}/800/450`; 

// Leçons de démo pour une seule formation
const LESSONS_PROMPT: Lesson[] = [
    { id: 'l1', title: 'Introduction au Prompt Engineering', duration: '05:30', isFreePreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0' },
    { id: 'l2', title: 'Comprendre le Rôle et l\'Audience', duration: '12:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2?rel=0' },
    { id: 'l3', title: 'Les 5 Techniques Avancées de Cadrage', duration: '20:15', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3?rel=0' },
    { id: 'l4', title: 'Workshop: Création de 10 Prompts Ciblés', duration: '45:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_4?rel=0' },
];

// Leçons de démo pour une autre formation
const LESSONS_SEO: Lesson[] = [
    { id: 'l5', title: 'Analyse sémantique (Module 1)', duration: '15:00', isFreePreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0' },
    { id: 'l6', title: 'Optimisation On-Page pour Google', duration: '18:30', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_6?rel=0' },
];


const ALL_TRAININGS: Training[] = [
    { id: 't1', title: 'Maîtriser le Prompt Engineering (Niveau Expert)', imageUrl: getImageUrl(10), category: 'IA & Prompt', language: 'Français', price: 0, durationMinutes: 180, numberOfVideos: 15, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Apprenez les techniques de prompt les plus avancées pour des résultats IA parfaits.', longDescription: 'Description longue et détaillée de la formation Prompt Engineering...', lessons: LESSONS_PROMPT,isPremium:false },
    { id: 't2', title: 'SEO 2025: Les Secrets de Google RankBrain', imageUrl: getImageUrl(20), category: 'Marketing', language: 'Français', price: 0, durationMinutes: 120, numberOfVideos: 10, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Découvrez comment optimiser votre site pour les algorithmes de recherche modernes.', longDescription: 'Description longue et détaillée de la formation SEO...', lessons: LESSONS_SEO ,isPremium:false},
    { id: 't3', title: 'Next.js & Tailwind CSS pour Développeurs', imageUrl: getImageUrl(30), category: 'Développement Web', language: 'Anglais', price: 0, durationMinutes: 300, numberOfVideos: 25, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Construisez des applications web rapides et modernes avec le stack de développement du moment.', longDescription: 'Description longue et détaillée de la formation Next.js...', lessons: LESSONS_PROMPT,isPremium:false },
    { id: 't4', title: 'Stratégie de Contenu avec ChatGPT', imageUrl: getImageUrl(40), category: 'IA & Prompt', language: 'Français', price: 0, durationMinutes: 90, numberOfVideos: 8, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Utilisez ChatGPT comme un véritable coéquipier pour générer du contenu percutant.', longDescription: 'Description longue et détaillée de la formation ChatGPT...', lessons: LESSONS_SEO ,isPremium:false},
    { id: 't5', title: 'Photographie Aérienne par Drone', imageUrl: getImageUrl(50), category: 'Création Vidéo', language: 'Français', price: 0, durationMinutes: 240, numberOfVideos: 18, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Maîtrisez le pilotage de drone et la post-production pour des images époustouflantes.', longDescription: 'Description longue et détaillée de la formation Drone...', lessons: LESSONS_PROMPT,isPremium:true },
    { id: 't6', title: 'Création de Business E-commerce', imageUrl: getImageUrl(60), category: 'E-commerce', language: 'Français', price: 0, durationMinutes: 360, numberOfVideos: 30, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Lancez, automatisez et scalez votre propre boutique en ligne rentable.', longDescription: 'Description longue et détaillée de la formation E-commerce...', lessons: LESSONS_SEO ,isPremium:false},
    { id: 't7', title: 'Fundamentaux de l\'Analyse de Données', imageUrl: getImageUrl(70), category: 'Analyse', language: 'Anglais', price:0, durationMinutes: 100, numberOfVideos: 9, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Introduction aux outils et méthodes d\'analyse pour prendre des décisions éclairées.', longDescription: 'Description longue et détaillée de la formation Analyse de Données...', lessons: LESSONS_PROMPT,isPremium:false },
    { id: 't8', title: 'Optimisation de la Productivité', imageUrl: getImageUrl(80), category: 'Productivité', language: 'Français', price: 0, durationMinutes: 60, numberOfVideos: 5, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Des techniques éprouvées pour tripler votre efficacité quotidienne.', longDescription: 'Description longue et détaillée de la formation Productivité...', lessons: LESSONS_SEO,isPremium:false },
    // ... ajoutez d'autres formations ici pour les tests de pagination
    { id: 't9', title: 'Figma pour les Designers UI/UX', imageUrl: getImageUrl(90), category: 'Développement Web', language: 'Anglais', price: 0, durationMinutes: 140, numberOfVideos: 12, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Description courte.', longDescription: 'Description longue.', lessons: LESSONS_SEO ,isPremium:false },
];
// ... (DUMMY_INSTRUCTOR, getImageUrl, LESSONS_PROMPT) ...


// --- FIN DONNÉES DE DÉMONSTRATION ---


interface TrainingDetailsPageProps {
  params: any;
}

// Composant pour l'affichage de la liste des leçons (pas de changement majeur ici, mais on peut ajouter un verrouillage)
const LessonList: React.FC<{ lessons: Lesson[], hasAccess: boolean }> = ({ lessons, hasAccess }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
        <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center">
            <ListChecks className="w-5 h-5 mr-3 text-yellow-500" />
            Contenu de la Formation ({lessons.length} leçons)
        </h3>
        <ul className="space-y-3">
            {lessons.map((lesson, index) => (
                <li 
                    key={lesson.id} 
                    // 🌟 Ajout d'une opacité si le cours est payant et pas d'accès
                    className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                        lesson.isFreePreview 
                            ? 'bg-yellow-50 text-gray-900 dark:bg-gray-700 dark:text-yellow-400 hover:bg-yellow-100'
                            : `bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 ${!hasAccess && !lesson.isFreePreview ? 'opacity-50 cursor-not-allowed' : ''}`
                    }`}
                >
                    <div className="flex items-center text-sm">
                        <span className="font-semibold mr-3 w-5 text-center">{index + 1}.</span>
                        <span>{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-medium">
                        {lesson.isFreePreview && (
                            <span className="text-green-600 dark:text-green-400">Gratuit</span>
                        )}
                        {!hasAccess && !lesson.isFreePreview && (
                            <Lock className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <Clock className="w-3.5 h-3.5 ml-1" />
                        <span>{lesson.duration}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
// ... (Composant InstructorInfo) ...

// Composant pour l'affichage des informations du formateur
const InstructorInfo: React.FC<{ instructor: typeof DUMMY_INSTRUCTOR }> = ({ instructor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mt-6 border-t-4 border-yellow-500">
    <h3 className="text-xl font-bold dark:text-white mb-4">À propos du Formateur</h3>
    <div className="flex items-center mb-4">
        <img 
            src={instructor.avatarUrl} 
            alt={instructor.name} 
            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-yellow-500"
        />
        <span className="text-lg font-semibold dark:text-white">{instructor.name}</span>
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{instructor.bio}</p>
  </div>
);

export default function TrainingDetailsPage({ params }: TrainingDetailsPageProps) {
    const { id } = params;
    const router = useRouter(); // 🌟 Initialisation du router

    // 🌟 Récupération de l'état de l'utilisateur
    const { isLoggedIn, subscription } = useAppStore();
    const isPremiumMember = subscription === 'Premium' || subscription === 'Pro';

    const training = ALL_TRAININGS.find(t => t.id === id);

    if (!training) {
        notFound(); 
    }
    
    const { title, longDescription, price, durationMinutes, numberOfVideos, instructor, lessons, isPremium } = training;
    
    // 🌟 LOGIQUE D'ACCÈS
    // L'accès complet est donné si :
    // 1. Ce n'est pas Premium (donc gratuit public ou payant standard) ET l'utilisateur est connecté (pour le suivi)
    // 2. C'est Premium ET l'utilisateur est Premium
    const HAS_FULL_ACCESS = 
        (!isPremium && isLoggedIn) || 
        (isPremium && isPremiumMember);
        
    // L'aperçu vidéo est verrouillé si c'est une formation Premium ET l'utilisateur n'est pas Premium
    const IS_PREVIEW_LOCKED = isPremium && !isPremiumMember; 
    
    // Affichage du prix (pour le CTA si payant standard)
    const priceDisplay = price === 0 ? "Gratuit" : `${price} €`;
    const formattedDuration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;
    const previewVideoUrl = lessons.find(l => l.isFreePreview)?.videoUrl || lessons[0]?.videoUrl;

    
    // 🌟 LOGIQUE DU BOUTON CTA
    let ctaLabel: string;
    let ctaIcon: React.ReactNode;
    let ctaAction: 'LOGIN' | 'SIGNUP' | 'GO_TO_TRAINING' | 'GO_TO_PREMIUM';
    let ctaColor: string;
    let showSignupOption = false;

    if (HAS_FULL_ACCESS) {
        // Accès complet
        ctaLabel = "Commencer la Formation";
        ctaIcon = <Zap className="w-5 h-5 mr-3" />;
        ctaAction = 'GO_TO_TRAINING';
        ctaColor = 'bg-black text-white hover:bg-gray-700';

    } else if (isPremium && !isPremiumMember) {
        // Formation Premium, utilisateur non Premium (même s'il est connecté)
        ctaLabel = "Débloquez l'Accès Premium";
        ctaIcon = <Crown className="w-5 h-5 mr-3" />;
        ctaAction = 'GO_TO_PREMIUM';
        ctaColor = 'bg-red-600 text-white hover:bg-red-700';

    } else if (!isLoggedIn) {
        // Non connecté (pour les formations gratuites publiques ou pour le suivi)
        ctaLabel = "Connectez-vous pour Accéder";
        ctaIcon = <LogIn className="w-5 h-5 mr-3" />;
        ctaAction = 'LOGIN';
        ctaColor = 'bg-black text-white hover:bg-gray-700';
        showSignupOption = true; // Proposer l'inscription

    } else {
        // Cas par défaut/Fallback (ex: payant standard non géré, on redirige vers l'achat)
        ctaLabel = `Acheter pour ${priceDisplay}`;
        ctaIcon = <DollarSign className="w-5 h-5 mr-3" />;
        ctaAction = 'GO_TO_PREMIUM'; 
        ctaColor = 'bg-blue-600 text-white hover:bg-blue-700';
    }

    const handleCtaClick = () => {
        switch (ctaAction) {
            case 'LOGIN':
                router.push('/signup'); // Remplacez par votre route de connexion
                break;
            
            case 'GO_TO_PREMIUM':
                router.push('/premium'); // Redirige vers la page d'abonnement/achat
                break;
            case 'GO_TO_TRAINING':
                // Redirige vers la première leçon du cours
                if (lessons.length > 0) {
                    router.push(`/formations/${id}/lesson/${lessons[0].id}`); 
                }
                break;
            default:
                console.warn("Action CTA non définie:", ctaAction);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-800 py-12">
            <div className="container mx-auto px-4 max-w-7xl">

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center lg:text-left">
                    {title}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Colonne Principale (Vidéo, Description, Formateur) - 2/3 */}
                    <main className="lg:col-span-2">

                        {/* Lecteur Vidéo (Iframe pour YouTube/Vimeo) */}
                        <div className="relative aspect-video bg-black rounded-xl shadow-2xl mb-8 overflow-hidden">
                            {previewVideoUrl ? (
                                <iframe
                                    src={previewVideoUrl}
                                    title={`Aperçu de la formation : ${title}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    // 🌟 Ajout de la classe de flou
                                    className={`w-full h-full border-0 transition-all duration-500 ${IS_PREVIEW_LOCKED ? 'filter blur-lg' : ''}`} 
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50">
                                    [Image de la couverture de la formation]
                                    Aucune vidéo d'aperçu disponible.
                                </div>
                            )}

                            {/* 🌟 NOUVEAU : Overlay de Verrouillage */}
                            {IS_PREVIEW_LOCKED && (
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white z-10">
                                    <Lock className="w-12 h-12 mb-4 text-red-500" />
                                    <h3 className="text-2xl font-bold mb-2">Accès Premium Requis</h3>
                                    <p className="text-gray-300 text-center max-w-sm">
                                        Cette formation est réservée aux membres **Premium**. Débloquez le contenu complet immédiatement.
                                    </p>
                                    <button 
                                        onClick={() => router.push('/premium')} 
                                        className="mt-4 py-2 px-6 bg-red-600 text-white rounded-lg font-bold flex items-center hover:bg-red-700 transition-colors"
                                    >
                                        <Crown className="w-5 h-5 mr-2" />
                                        Voir les Offres Premium
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Résumé des Informations Clés */}
                        {/* 🌟 Afficher clairement le statut Premium ici aussi */}
                        <div className="flex flex-wrap justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-8 text-gray-700 dark:text-gray-300 font-medium">
                            {/* ... (Durée & Vidéos) ... */}
                            <div className="flex items-center m-2">
                                <Clock className="w-5 h-5 mr-2 text-yellow-500" /> Durée Totale: **{formattedDuration}**
                            </div>
                            <div className="flex items-center m-2">
                                <Video className="w-5 h-5 mr-2 text-yellow-500" /> Nombre de Vidéos: **{numberOfVideos}**
                            </div>

                            {/* Statut / Prix */}
                            <div className="flex items-center m-2">
                                {isPremium ? (
                                    <>
                                        <Crown className="w-5 h-5 mr-2 text-red-500" /> 
                                        <span className="ml-1 font-extrabold text-lg text-red-500">ACCÈS PREMIUM</span>
                                    </>
                                ) : (
                                    <>
                                        <DollarSign className="w-5 h-5 mr-2 text-yellow-500" /> 
                                        <span className="ml-1 font-extrabold text-lg text-yellow-500">{priceDisplay}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {/* Description Longue */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold dark:text-white mb-4">Description de la Formation</h2>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{longDescription}</p>
                        </div>
                        
                        {/* Informations sur le Formateur */}
                        <InstructorInfo instructor={instructor} />
                        
                    </main>
                    
                    {/* Colonne Latérale (Liste des Leçons & CTA) - 1/3 */}
                    <aside className="lg:col-span-1">
                        
                        {/* Carte d'Action (Call to Action) */}
                        <div className="sticky top-6 bg-yellow-500 text-black p-6 rounded-xl shadow-2xl mb-8">
                            <p className="text-xl font-extrabold mb-4">
                                {/* Affichage conditionnel de l'en-tête du CTA */}
                                {HAS_FULL_ACCESS ? "Vous avez un accès complet !" : (isPremium && !isPremiumMember ? "Accédez à vie en devenant Premium" : ctaLabel)}
                            </p>
                            
                            <button 
                                onClick={handleCtaClick}
                                className={`w-full py-3 rounded-lg text-lg font-bold flex items-center justify-center transition-colors ${ctaColor}`}
                            >
                                {ctaIcon}
                                {ctaLabel}
                            </button>

                            {/* Option S'inscrire (visible si non connecté) */}
                            {showSignupOption && (
                                <p className="text-center text-sm mt-3 text-black">
                                    Pas encore membre ? <button onClick={() => router.push('/signup')} className="underline font-bold hover:text-gray-800">Créez un compte</button>
                                </p>
                            )}
                        </div>

                        {/* Liste des Leçons */}
                        <LessonList lessons={lessons} hasAccess={HAS_FULL_ACCESS} />
                        
                    </aside>
                </div>
            </div>
        </div>
    );
}