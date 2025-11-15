"use client";
import React from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Training, Lesson, Instructor } from '@/types/training';
import { useAppStore, SubscriptionTier } from '@/store/useAppStore';
import { 
    Clock, 
    Video, 
    DollarSign, 
    Zap, 
    ListChecks, 
    Lock, 
    Crown, 
    LogIn, 
    UserPlus, 
    ChevronRight 
} from 'lucide-react';

// --- DONNÉES DE DÉMONSTRATION (Gardées pour la fonctionnalité) ---
const DUMMY_INSTRUCTOR: Instructor = {
    id: 'instr1',
    name: 'Alex Dupont',
    avatarUrl: 'https://i.pravatar.cc/150?img=1', // Placeholder avatar
    bio: "Développeur Full Stack passionné et formateur avec plus de 10 ans d'expérience. Je crois que la meilleure façon d'apprendre est de construire de vrais projets. Mon expertise s'étend de React à Next.js, en passant par l'IA et les meilleures pratiques de code."
};
const getImageUrl = (seed: number) => `https://picsum.photos/seed/${seed}/800/450`;
const LESSONS_PROMPT: Lesson[] = [
    { id: 'l1', title: 'Introduction au Prompt Engineering', duration: '05:30', isFreePreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0' },
    { id: 'l2', title: 'Comprendre le Rôle et l\'Audience', duration: '12:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2?rel=0' },
    { id: 'l3', title: 'Les 5 Techniques Avancées de Cadrage', duration: '20:15', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3?rel=0' },
    { id: 'l4', title: 'Workshop: Création de 10 Prompts Ciblés', duration: '45:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_4?rel=0' },
];
const LESSONS_SEO: Lesson[] = [
    { id: 'l5', title: 'Analyse sémantique (Module 1)', duration: '15:00', isFreePreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0' },
    { id: 'l6', title: 'Optimisation On-Page pour Google', duration: '18:30', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_6?rel=0' },
];

const ALL_TRAININGS: Training[] = [
    { id: 't1', title: 'Maîtriser le Prompt Engineering (Niveau Expert)', imageUrl: getImageUrl(10), category: 'IA & Prompt', language: 'Français', price: 0, durationMinutes: 180, numberOfVideos: 15, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Apprenez les techniques de prompt les plus avancées pour des résultats IA parfaits.', longDescription: "Plongez dans l'art et la science de l'ingénierie des prompts. Ce cours de niveau expert vous mènera au-delà des bases pour vous apprendre à créer des requêtes nuancées, contextuelles et ultra-efficaces pour les modèles d'IA générative comme ChatGPT et Midjourney.\n\nVous apprendrez à : \n- Utiliser la technique de la pensée en chaîne (Chain-of-Thought).\n- Créer des personas d'IA complexes.\n- Gérer des scénarios multi-étapes.\n\nCe que vous obtiendrez :\n- 15 leçons vidéo HD.\n- Plus de 50 templates de prompts à réutiliser.\n- Accès à une communauté privée d'experts.", lessons: LESSONS_PROMPT, isPremium: false },
    { id: 't2', title: 'SEO 2025: Les Secrets de Google RankBrain', imageUrl: getImageUrl(20), category: 'Marketing', language: 'Français', price: 0, durationMinutes: 120, numberOfVideos: 10, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Découvrez comment optimiser votre site pour les algorithmes de recherche modernes.', longDescription: 'Description longue et détaillée de la formation SEO...', lessons: LESSONS_SEO, isPremium: false },
    { id: 't5', title: 'Photographie Aérienne par Drone', imageUrl: getImageUrl(50), category: 'Création Vidéo', language: 'Français', price: 0, durationMinutes: 240, numberOfVideos: 18, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Maîtrisez le pilotage de drone et la post-production pour des images époustouflantes.', longDescription: "Devenez un maître de la prise de vue aérienne. Ce cours Premium couvre tout, du choix de l'équipement aux réglementations, en passant par les techniques cinématographiques avancées. Créez des vidéos à couper le souffle qui se démarquent sur n'importe quelle plateforme.", lessons: LESSONS_PROMPT, isPremium: true },
];
// --- FIN DONNÉES DE DÉMONSTRATION ---


// 💎 Composant de la liste des leçons (refactorisé en style premium)
const LessonList: React.FC<{ lessons: Lesson[], hasAccess: boolean }> = ({ lessons, hasAccess }) => (
    <div
        className="
            p-6 rounded-3xl
            bg-white/15 dark:bg-neutral-900/25
            backdrop-blur-3xl
            border border-white/20 dark:border-white/10
            shadow-[0_8px_35px_rgba(0,0,0,0.2)]
        "
    >
        <h3 className="text-xl font-bold dark:text-gray-100 mb-6 flex items-center tracking-wide">
            <ListChecks className="w-5 h-5 mr-3 text-yellow-400 drop-shadow-[0_0_5px_rgba(255,215,120,0.5)]" />
            Contenu de la Formation ({lessons.length} leçons)
        </h3>
        <ul className="space-y-3">
            {lessons.map((lesson, index) => {
                // Détermine si l'utilisateur peut voir la leçon complète
                const canView = hasAccess || lesson.isFreePreview;
                
                return (
                    <li
                        key={lesson.id}
                        // Style Glassmorphism pour chaque leçon
                        className={`
                            flex justify-between items-center p-4 rounded-xl transition-all duration-300
                            ${canView ? 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 cursor-pointer' : 'bg-white/5 dark:bg-white/2 opacity-70'}
                            border border-white/10
                        `}
                    >
                        <div className="flex items-center text-sm font-medium">
                            <span className={`font-bold mr-3 w-5 text-center ${lesson.isFreePreview ? 'text-yellow-400' : 'dark:text-gray-300'}`}>{index + 1}.</span>
                            <span className={`${canView ? 'dark:text-gray-100' : 'dark:text-gray-400'}`}>{lesson.title}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs font-medium">
                            {lesson.isFreePreview && (
                                <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,163,0.5)]">Gratuit</span>
                            )}
                            {!canView && (
                                <Lock className="w-3.5 h-3.5 text-red-400" />
                            )}
                            <div className="flex items-center dark:text-gray-400">
                                <Clock className="w-3.5 h-3.5 mr-1" />
                                <span>{lesson.duration}</span>
                            </div>
                            {canView && <ChevronRight className='w-4 h-4 dark:text-yellow-400' />}
                        </div>
                    </li>
                );
            })}
        </ul>
    </div>
);

// 💎 Composant des informations du formateur (refactorisé en style premium)
const InstructorInfo: React.FC<{ instructor: typeof DUMMY_INSTRUCTOR }> = ({ instructor }) => (
    <div
        className="
            p-6 rounded-3xl mt-8
            bg-white/15 dark:bg-neutral-900/25
            backdrop-blur-3xl
            border border-white/20 dark:border-white/10
            shadow-[0_8px_35px_rgba(0,0,0,0.2)]
        "
    >
        <h3 className="text-xl font-bold dark:text-gray-100 mb-6 flex items-center tracking-wide">
            <Zap className="w-5 h-5 mr-3 text-yellow-400 drop-shadow-[0_0_5px_rgba(255,215,120,0.5)]" />
            À propos du Formateur
        </h3>
        <div className="flex items-start mb-4">
            <img
                src={instructor.avatarUrl}
                alt={instructor.name}
                className="
                    w-16 h-16 rounded-full object-cover mr-4
                    border-2 border-[#FFD86A] shadow-[0_0_15px_rgba(255,215,100,0.5)]
                    transition-all duration-500 hover:scale-105
                "
            />
            <div>
                <span className="text-lg font-bold dark:text-gray-100 block">{instructor.name}</span>
                <span className="text-sm text-yellow-400 font-semibold">Expert Certifié</span>
            </div>
        </div>
        <p className="text-gray-300 dark:text-gray-400 text-sm mt-3 border-t border-white/10 pt-4">
            {instructor.bio}
        </p>
    </div>
);

interface TrainingDetailsPageProps {
    params: 
         any;
    
}

export default function TrainingDetailsPage({ params }: TrainingDetailsPageProps) {
    const { id } = params;
    const router = useRouter();
    const { isLoggedIn, subscription } = useAppStore();
    const isPremiumMember = subscription === 'Premium' || subscription === 'Pro';

    const training = ALL_TRAININGS.find(t => t.id === id);

    if (!training) {
        notFound();
    }

    const { title, longDescription, price, durationMinutes, numberOfVideos, instructor, lessons, isPremium } = training;

    // LOGIQUE D'ACCÈS
    const HAS_FULL_ACCESS =
        (!isPremium && isLoggedIn) ||
        (isPremium && isPremiumMember);

    const IS_PREVIEW_LOCKED = isPremium && !isPremiumMember;

    const priceDisplay = price === 0 ? "Gratuit" : `${price} €`;
    const formattedDuration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;
    const previewVideoUrl = lessons.find(l => l.isFreePreview)?.videoUrl || lessons[0]?.videoUrl;

    // LOGIQUE DU BOUTON CTA
    let ctaLabel: string;
    let ctaIcon: React.ReactNode;
    let ctaAction: 'LOGIN' | 'SIGNUP' | 'GO_TO_TRAINING' | 'GO_TO_PREMIUM';
    let ctaClasses: string;
    let showSignupOption = false;

    // Classes de base du CTA (Style Gold Edition)
    const GOLD_CTA_CLASSES = `
        w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-500
        bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
        text-black shadow-[0_4px_20px_rgba(255,215,120,0.45)]
        hover:shadow-[0_6px_25px_rgba(255,225,150,0.7)]
        hover:-translate-y-0.5
    `;

    if (HAS_FULL_ACCESS) {
        // Accès complet
        ctaLabel = "Commencer la Formation";
        ctaIcon = <Zap className="w-5 h-5 mr-3 text-black" />;
        ctaAction = 'GO_TO_TRAINING';
        ctaClasses = GOLD_CTA_CLASSES;

    } else if (isPremium && !isPremiumMember) {
        // Formation Premium, utilisateur non Premium
        ctaLabel = "Débloquez l'Accès Premium";
        ctaIcon = <Crown className="w-5 h-5 mr-3 text-black" />;
        ctaAction = 'GO_TO_PREMIUM';
        ctaClasses = GOLD_CTA_CLASSES;

    } else if (!isLoggedIn) {
        // Non connecté (pour les formations gratuites/payantes)
        ctaLabel = "Connectez-vous pour Accéder";
        ctaIcon = <LogIn className="w-5 h-5 mr-3 text-black" />;
        ctaAction = 'LOGIN';
        ctaClasses = GOLD_CTA_CLASSES;
        showSignupOption = true;

    } else {
        // Fallback (ex: achat unique standard non géré, mais on utilise le CTA Gold)
        ctaLabel = `Acheter pour ${priceDisplay}`;
        ctaIcon = <DollarSign className="w-5 h-5 mr-3 text-black" />;
        ctaAction = 'GO_TO_PREMIUM';
        ctaClasses = GOLD_CTA_CLASSES;
    }

    const handleCtaClick = () => {
        switch (ctaAction) {
            case 'LOGIN':
                router.push('/login'); // Corrigé : Utiliser '/login'
                break;

            case 'GO_TO_PREMIUM':
                router.push('/premium');
                break;
            case 'GO_TO_TRAINING':
                if (lessons.length > 0) {
                    router.push(`/formations/${id}/lesson/${lessons[0].id}`);
                }
                break;
            default:
                console.warn("Action CTA non définie:", ctaAction);
        }
    };


    return (
        <div className="min-h-screen bg-neutral-900/40 py-16 dark:bg-neutral-900/80">
            <div className="container mx-auto px-4 max-w-7xl">

                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-100 mb-4 text-center lg:text-left tracking-tight drop-shadow-[0_0_10px_rgba(255,230,150,0.2)]">
                    {title}
                </h1>
                <p className="text-xl dark:text-gray-400 mb-12 text-center lg:text-left">
                    {training.shortDescription}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Colonne Principale (Vidéo, Description, Formateur) - 2/3 */}
                    <main className="lg:col-span-2">

                        {/* Lecteur Vidéo & Verrouillage Premium (Style VisionOS) */}
                        <div className="relative aspect-video bg-neutral-900 rounded-3xl shadow-2xl mb-10 overflow-hidden border border-white/20">
                            {previewVideoUrl ? (
                                <iframe
                                    src={previewVideoUrl}
                                    title={`Aperçu de la formation : ${title}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={`w-full h-full border-0 transition-all duration-700 ${IS_PREVIEW_LOCKED ? 'filter blur-xl' : ''}`}
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50">
                                    [Image de la couverture de la formation]
                                </div>
                            )}

                            {/* 💎 Overlay de Verrouillage (Design premium) */}
                            {IS_PREVIEW_LOCKED && (
                                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center text-white z-10 transition-opacity duration-700">
                                    <Lock className="w-14 h-14 mb-4 text-[#FFD86A] drop-shadow-[0_0_15px_rgba(255,215,120,0.6)]" />
                                    <h3 className="text-3xl font-extrabold mb-2">Accès Premium Requis</h3>
                                    <p className="text-gray-300 text-center max-w-sm">
                                        Cette formation est exclusivement réservée aux membres **Gold Edition**. Débloquez le contenu complet maintenant.
                                    </p>
                                    <button
                                        onClick={() => router.push('/premium')}
                                        className="
                                            mt-6 py-3 px-8 rounded-xl font-bold flex items-center
                                            bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
                                            text-black shadow-[0_4px_20px_rgba(255,215,120,0.45)]
                                            hover:shadow-[0_6px_25px_rgba(255,225,150,0.7)] transition-all duration-500
                                        "
                                    >
                                        <Crown className="w-5 h-5 mr-2" />
                                        Voir les Offres Premium
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 💎 Résumé des Informations Clés (Style Glassmorphism) */}
                        <div
                            className="
                                flex flex-wrap justify-around items-center p-6 rounded-3xl mb-10
                                bg-white/15 dark:bg-neutral-900/25
                                backdrop-blur-3xl
                                border border-white/20 dark:border-white/10
                                shadow-[0_8px_35px_rgba(0,0,0,0.2)]
                                text-gray-200 font-medium
                            "
                        >
                            {/* Durée */}
                            <div className="flex items-center m-2">
                                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                                Durée Totale: <strong className='ml-1 text-white'>{formattedDuration}</strong>
                            </div>
                            {/* Vidéos */}
                            <div className="flex items-center m-2">
                                <Video className="w-5 h-5 mr-2 text-yellow-400" />
                                Vidéos: <strong className='ml-1 text-white'>{numberOfVideos}</strong>
                            </div>

                            {/* Statut / Prix */}
                            <div className="flex items-center m-2">
                                {isPremium ? (
                                    <>
                                        <Crown className="w-5 h-5 mr-2 text-[#FFD86A] drop-shadow-[0_0_8px_rgba(255,215,100,0.7)]" />
                                        <span className="ml-1 font-extrabold text-lg text-[#FFD86A]">PREMIUM</span>
                                    </>
                                ) : (
                                    <>
                                        <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                                        <span className="ml-1 font-extrabold text-lg text-yellow-400">{priceDisplay}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* 💎 Description Longue (Style Glassmorphism) */}
                        <div
                            className="
                                p-8 rounded-3xl mb-8
                                bg-white/15 dark:bg-neutral-900/25
                                backdrop-blur-3xl
                                border border-white/20 dark:border-white/10
                                shadow-[0_8px_35px_rgba(0,0,0,0.2)]
                            "
                        >
                            <h2 className="text-2xl font-bold dark:text-gray-100 mb-4 border-b border-white/10 pb-3 tracking-wide">
                                Description de la Formation
                            </h2>
                            <p className="text-gray-300 dark:text-gray-400 whitespace-pre-line leading-relaxed">{longDescription}</p>
                        </div>

                        {/* Informations sur le Formateur */}
                        <InstructorInfo instructor={instructor} />

                    </main>

                    {/* Colonne Latérale (Liste des Leçons & CTA) - 1/3 */}
                    <aside className="lg:col-span-1">

                        {/* 💎 Carte d'Action (Call to Action - Sticky) */}
                        <div
                            className="
                                sticky top-6 p-6 rounded-3xl mb-10
                                bg-white/15 dark:bg-neutral-900/25
                                backdrop-blur-3xl
                                border border-white/20 dark:border-white/10
                                shadow-[0_8px_35px_rgba(0,0,0,0.3)]
                                transition-all duration-700
                            "
                        >
                            <p className="text-xl font-extrabold mb-5 dark:text-gray-100 text-center">
                                {HAS_FULL_ACCESS ? "Vous avez un accès complet !" : (isPremium && !isPremiumMember ? "Accès Gold Edition" : "Prêt à commencer ?")}
                            </p>

                            <button
                                onClick={handleCtaClick}
                                className={ctaClasses}
                            >
                                {ctaIcon}
                                {ctaLabel}
                            </button>

                            {/* Option S'inscrire (visible si non connecté) */}
                            {showSignupOption && (
                                <p className="text-center text-sm mt-3 dark:text-gray-400">
                                    Pas encore membre ? <button onClick={() => router.push('/signup')} className="underline font-bold text-yellow-400 hover:text-[#FFE79A] transition-colors">Créez un compte</button>
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