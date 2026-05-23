"use client";
import React, { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Training } from '@/types/training';
import { useAppStore } from '@/store/useAppStore';
import { apiClient } from '@/lib/api-client';
import { 
    Clock, 
    Video, 
    DollarSign, 
    Zap, 
    ListChecks, 
    Lock, 
    Crown, 
    LogIn, 
    ChevronRight 
} from 'lucide-react';

const LessonList: React.FC<{ lessons: any[], hasAccess: boolean, trainingId: string }> = ({ lessons, hasAccess, trainingId }) => (
    <div className="framer-card p-6">
        <h3 className="text-xl font-bold text-black mb-6 flex items-center">
            <ListChecks className="w-5 h-5 mr-3 text-primary" />
            Contenu de la Formation ({lessons.length} leçons)
        </h3>
        <ul className="space-y-3">
            {lessons.map((lesson: any, index: number) => {
                const canView = hasAccess || lesson.isFreePreview;
                
                return (
                    <li
                        key={lesson.id}
                        className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 border ${
                            canView 
                                ? 'bg-neutral-50 hover:bg-neutral-100 cursor-pointer border-neutral-200 hover:border-primary' 
                                : 'bg-neutral-50/50 opacity-60 border-neutral-200'
                        }`}
                        onClick={() => {
                            if (canView) {
                                window.location.href = `/formations/${trainingId}/lesson/${lesson.id}`;
                            }
                        }}
                    >
                        <div className="flex items-center text-sm font-medium">
                            <span className={`font-bold mr-3 w-5 text-center ${lesson.isFreePreview ? 'text-primary' : 'text-neutral-600'}`}>{index + 1}.</span>
                            <span className={`${canView ? 'text-black' : 'text-neutral-400'}`}>{lesson.title}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs font-medium">
                            {lesson.isFreePreview && (
                                <span className="badge-success">Gratuit</span>
                            )}
                            {!canView && (
                                <Lock className="w-3.5 h-3.5 text-error" />
                            )}
                            <div className="flex items-center text-neutral-500">
                                <Clock className="w-3.5 h-3.5 mr-1" />
                                <span>{lesson.duration}</span>
                            </div>
                            {canView && <ChevronRight className='w-4 h-4 text-primary' />}
                        </div>
                    </li>
                );
            })}
        </ul>
    </div>
);

const InstructorInfo: React.FC<{ instructor: any }> = ({ instructor }) => (
    <div className="framer-card p-6 mt-8">
        <h3 className="text-xl font-bold text-black mb-6 flex items-center">
            <Zap className="w-5 h-5 mr-3 text-primary" />
            À propos du Formateur
        </h3>
        <div className="flex items-start mb-4">
            <img
                src={instructor.avatarUrl}
                alt={instructor.name}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary shadow-md transition-all duration-300 hover:scale-105"
            />
            <div>
                <span className="text-lg font-bold text-black block">{instructor.name}</span>
                <span className="text-sm text-primary font-semibold">Expert Certifié</span>
            </div>
        </div>
        <p className="text-neutral-600 text-sm mt-3 border-t border-neutral-200 pt-4">
            {instructor.bio}
        </p>
    </div>
);

interface TrainingDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default function TrainingDetailsPage({ params }: TrainingDetailsPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { isLoggedIn, subscription } = useAppStore();
    const isPremiumMember = subscription === 'Premium' || subscription === 'Pro';

    const [training, setTraining] = useState<Training | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTraining = async () => {
            setIsLoading(true);
            try {
                const data = await apiClient.getTrainingById(id);
                setTraining(data);
            } catch (error) {
                console.error('Erreur lors du chargement de la formation:', error);
                notFound();
            } finally {
                setIsLoading(false);
            }
        };

        fetchTraining();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 py-16 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!training) {
        notFound();
    }

    const { title, longDescription, price, durationMinutes, numberOfVideos, instructor, lessons, isPremium } = training;

    const HAS_FULL_ACCESS = (!isPremium && isLoggedIn) || (isPremium && isPremiumMember);
    const IS_PREVIEW_LOCKED = isPremium && !isPremiumMember;
    const priceDisplay = price === 0 ? "Gratuit" : `${price} €`;
    const formattedDuration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;
    const previewVideoUrl = lessons.find((l: any) => l.isFreePreview)?.videoUrl || lessons[0]?.videoUrl;

    let ctaLabel: string;
    let ctaIcon: React.ReactNode;
    let ctaAction: 'LOGIN' | 'GO_TO_TRAINING' | 'GO_TO_PREMIUM';
    let showSignupOption = false;

    if (HAS_FULL_ACCESS) {
        ctaLabel = "Commencer la Formation";
        ctaIcon = <Zap className="w-5 h-5 mr-3" />;
        ctaAction = 'GO_TO_TRAINING';
    } else if (isPremium && !isPremiumMember) {
        ctaLabel = "Débloquez l'Accès Premium";
        ctaIcon = <Crown className="w-5 h-5 mr-3" />;
        ctaAction = 'GO_TO_PREMIUM';
    } else if (!isLoggedIn) {
        ctaLabel = "Connectez-vous pour Accéder";
        ctaIcon = <LogIn className="w-5 h-5 mr-3" />;
        ctaAction = 'LOGIN';
        showSignupOption = true;
    } else {
        ctaLabel = `Acheter pour ${priceDisplay}`;
        ctaIcon = <DollarSign className="w-5 h-5 mr-3" />;
        ctaAction = 'GO_TO_PREMIUM';
    }

    const handleCtaClick = () => {
        switch (ctaAction) {
            case 'LOGIN':
                router.push('/login');
                break;
            case 'GO_TO_PREMIUM':
                router.push('/premium');
                break;
            case 'GO_TO_TRAINING':
                if (lessons.length > 0) {
                    router.push(`/formations/${id}/lesson/${lessons[0].id}`);
                }
                break;
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-16">
            <div className="container mx-auto px-6 max-w-7xl">
                <h1 className="text-3xl md:text-5xl font-black text-black mb-4 text-center lg:text-left">
                    {title}
                </h1>
                <p className="text-xl text-neutral-600 mb-12 text-center lg:text-left">
                    {training.shortDescription}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <main className="lg:col-span-2">
                        <div className="relative aspect-video bg-black rounded-2xl shadow-xl mb-10 overflow-hidden border border-neutral-200">
                            {previewVideoUrl ? (
                                <iframe
                                    src={previewVideoUrl}
                                    title={`Aperçu de la formation : ${title}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={`w-full h-full border-0 transition-all duration-300 ${IS_PREVIEW_LOCKED ? 'filter blur-xl' : ''}`}
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center h-full text-neutral-400">
                                    [Image de la couverture de la formation]
                                </div>
                            )}

                            {IS_PREVIEW_LOCKED && (
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white z-10">
                                    <Lock className="w-14 h-14 mb-4 text-primary" />
                                    <h3 className="text-3xl font-black mb-2">Accès Premium Requis</h3>
                                    <p className="text-neutral-300 text-center max-w-sm mb-6">
                                        Cette formation est exclusivement réservée aux membres Premium. Débloquez le contenu complet maintenant.
                                    </p>
                                    <button
                                        onClick={() => router.push('/premium')}
                                        className="btn-primary"
                                    >
                                        <Crown className="w-5 h-5 mr-2" />
                                        Voir les Offres Premium
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="framer-card p-6 mb-10">
                            <div className="flex flex-wrap justify-around items-center gap-4">
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-primary" />
                                    <span className="text-neutral-600">Durée: <strong className='text-black'>{formattedDuration}</strong></span>
                                </div>
                                <div className="flex items-center">
                                    <Video className="w-5 h-5 mr-2 text-primary" />
                                    <span className="text-neutral-600">Vidéos: <strong className='text-black'>{numberOfVideos}</strong></span>
                                </div>
                                <div className="flex items-center">
                                    {isPremium ? (
                                        <>
                                            <Crown className="w-5 h-5 mr-2 text-primary" />
                                            <span className="font-bold text-lg text-primary">PREMIUM</span>
                                        </>
                                    ) : (
                                        <>
                                            <DollarSign className="w-5 h-5 mr-2 text-success" />
                                            <span className="font-bold text-lg text-success">{priceDisplay}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="framer-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-black mb-4 border-b border-neutral-200 pb-3">
                                Description de la Formation
                            </h2>
                            <p className="text-neutral-600 whitespace-pre-line leading-relaxed">{longDescription}</p>
                        </div>

                        <InstructorInfo instructor={instructor} />
                    </main>

                    <aside className="lg:col-span-1">
                        <div className="framer-card p-6 mb-10 sticky top-6">
                            <p className="text-xl font-bold mb-5 text-black text-center">
                                {HAS_FULL_ACCESS ? "Vous avez un accès complet !" : (isPremium && !isPremiumMember ? "Accès Premium" : "Prêt à commencer ?")}
                            </p>

                            <button onClick={handleCtaClick} className="btn-primary w-full">
                                {ctaIcon}
                                {ctaLabel}
                            </button>

                            {showSignupOption && (
                                <p className="text-center text-sm mt-3 text-neutral-600">
                                    Pas encore membre ? <button onClick={() => router.push('/signup')} className="underline font-bold text-primary hover:text-primary-600 transition-colors">Créez un compte</button>
                                </p>
                            )}
                        </div>

                        <LessonList lessons={lessons} hasAccess={HAS_FULL_ACCESS} trainingId={id} />
                    </aside>
                </div>
            </div>
        </div>
    );
}
