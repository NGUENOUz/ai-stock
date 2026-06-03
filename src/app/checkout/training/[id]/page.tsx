"use client";
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Training } from '@/types/training';
import { apiClient } from '@/lib/api-client';
import { CreditCard, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';

interface CheckoutPageProps {
    params: Promise<{ id: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [training, setTraining] = useState<Training | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTraining = async () => {
            try {
                const data = await apiClient.getTrainingById(id);
                setTraining(data);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTraining();
    }, [id]);

    const handlePayment = () => {
        // TODO: Intégrer Stripe ou autre solution de paiement
        alert('Paiement en cours d\'intégration...');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!training) {
        return <div>Formation introuvable</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center text-neutral-600 hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Retour
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="framer-card p-8">
                        <h2 className="text-2xl font-bold text-black mb-6">Détails de la commande</h2>
                        
                        <div className="flex gap-4 mb-6">
                            <img 
                                src={training.imageUrl} 
                                alt={training.title}
                                className="w-32 h-20 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-black">{training.title}</h3>
                                <p className="text-sm text-neutral-600">{training.instructor.name}</p>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 pt-4 space-y-3">
                            <div className="flex justify-between text-neutral-600">
                                <span>Prix</span>
                                <span className="font-bold text-black">{training.price} €</span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                                <span>Durée</span>
                                <span>{Math.floor(training.durationMinutes / 60)}h {training.durationMinutes % 60}m</span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                                <span>Vidéos</span>
                                <span>{training.numberOfVideos}</span>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 mt-4 pt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">{training.price} €</span>
                            </div>
                        </div>
                    </div>

                    <div className="framer-card p-8">
                        <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                            <Lock className="w-6 h-6 mr-2 text-primary" />
                            Paiement sécurisé
                        </h2>

                        <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-black mb-2">Numéro de carte</label>
                                <input 
                                    type="text" 
                                    placeholder="1234 5678 9012 3456"
                                    className="input w-full"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">Expiration</label>
                                    <input 
                                        type="text" 
                                        placeholder="MM/AA"
                                        className="input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">CVV</label>
                                    <input 
                                        type="text" 
                                        placeholder="123"
                                        className="input w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-2">Nom sur la carte</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe"
                                    className="input w-full"
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full">
                                <CreditCard className="w-5 h-5 mr-2" />
                                Payer {training.price} €
                            </button>
                        </form>

                        <div className="mt-6 flex items-start gap-2 text-xs text-neutral-600">
                            <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                            <p>Paiement 100% sécurisé. Vos données sont cryptées.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
