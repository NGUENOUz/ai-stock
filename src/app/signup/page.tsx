"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabaseClient';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Typage du message d’alerte
interface AlertMessageProps {
  message: string;
  type: 'error' | 'success';
}

// Composant d’alerte typé
const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => (
  <div className={cn(
    "p-3 rounded-lg text-sm mb-4 border",
    type === 'error'
      ? "bg-red-100 border-red-400 text-red-700 dark:bg-red-950 dark:border-red-700 dark:text-red-400"
      : "bg-green-100 border-green-400 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-400"
  )}>
    {message}
  </div>
);

type MessageState = { text: string; type: 'error' | 'success' } | null;

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // On type explicitement l’état message :
  const [message, setMessage] = useState<MessageState>(null);

  const updateProfile = useAppStore((state) => state.updateProfile);
  const updateSubscription = useAppStore((state) => state.updateSubscription);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    if (password.length < 6) {
      setMessage({ text: "Le mot de passe doit contenir au moins 6 caractères.", type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      // Inscription Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { userName }
        }
      });

      if (error) {
        setMessage({ text: error.message || "Erreur à la création du compte.", type: 'error' });
        setIsLoading(false);
        return;
      }

      // Ajoute la fiche à la table users si pas de trigger en DB
      if (data.user) {
        const { error: userTableError } = await supabase
          .from("users")
          .insert([{
            id: data.user.id,
            email: data.user.email,
            subscription: "Gratuit"
          }]);
        if (userTableError) {
          setMessage({ text: "Erreur lors de la création du profil utilisateur.", type: "error" });
          setIsLoading(false);
          return;
        }
      }

      // Mise à jour du store (optionnel, car il faut attendre la validation email en réalité)
      if (data.user) {
        updateProfile(userName, email);
        updateSubscription("Gratuit");
      }

      setMessage({ text: "Compte créé avec succès ! Vérifiez votre boîte mail pour activer votre compte.", type: 'success' });

      setTimeout(() => {
        router.push('/dashboard');
      }, 1300);

    } catch (error) {
      setMessage({ text: "Une erreur est survenue lors de la création du compte.", type: 'error' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-neutral-900 pt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl dark:bg-neutral-950">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Créer un compte AI-Stock
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Rejoignez-nous pour accéder à la plateforme Gold Premium.
        </p>
        {message && <AlertMessage message={message.text} type={message.type} />}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nom d'Utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Votre nom ou pseudonyme"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Adresse Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mot de passe (min. 6 caractères)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black transition-colors",
                "bg-gradient-to-r from-[#FFD700] to-[#C89C36] hover:bg-yellow-400",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? 'Inscription en cours...' : "S'inscrire et commencer"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center pt-2">
          <Link
            href="/login"
            className="font-medium text-yellow-700 hover:text-yellow-500 dark:text-[#FFD007] dark:hover:text-[#FFD007]/80"
          >
            J'ai déjà un compte ? Me connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
