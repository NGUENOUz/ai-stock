"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase/supabaseClient";
import { cn } from "@/lib/utils";

// Typage clair des alertes
interface AlertMessageProps {
  message: string;
  type: "error" | "success";
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => (
  <div
    className={cn(
      "p-3 rounded-lg text-sm mb-4 border",
      type === "error"
        ? "bg-red-100 border-red-400 text-red-700 dark:bg-red-950 dark:border-red-700 dark:text-red-400"
        : "bg-green-100 border-green-400 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-400"
    )}
  >
    {message}
  </div>
);

type MessageState = { text: string; type: "error" | "success" } | null;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageState>(null);

  const loginFromDb = useAppStore((state) => state.loginFromDb);
  const subscription = useAppStore((state) => state.subscription);
  const router = useRouter();

  // Redirection immédiate si déjà connecté (guard robuste)
  useEffect(() => {
    if (subscription === "Premium" || subscription === "Pro") {
      router.replace("/dashboard");
    }
  }, [subscription, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      // Authentification Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        setMessage({
          text: "Erreur de connexion. Vérifiez votre email et mot de passe.",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      // Récupérer le profil utilisateur depuis la table users
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (userError || !userData) {
        setMessage({
          text: "Connexion impossible au profil utilisateur.",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      // Synchroniser TOUT l'état global
      loginFromDb({
        userName: userData.user_name || userData.email,
        email: userData.email,
        subscription: userData.subscription || "Gratuit",
      });

      setMessage({
        text: "Connexion réussie ! Redirection…",
        type: "success",
      });

      // Redirection
      setTimeout(() => {
        router.replace("/dashboard");
      }, 650);
    } catch (err) {
      setMessage({
        text: "Erreur technique pendant la connexion.",
        type: "error",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-neutral-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl dark:bg-neutral-950">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Connexion à AI-Stock
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Bienvenue, entrez vos informations.
        </p>

        {message && <AlertMessage message={message.text} type={message.type} />}

        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
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
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mot de passe
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
              autoComplete="current-password"
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
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <a
            href="/signup"
            className="font-medium text-yellow-700 hover:text-yellow-500 dark:text-[#FFD007] dark:hover:text-[#FFD007]/80"
          >
            Pas encore de compte ? S'inscrire
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
