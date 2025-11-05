// src/app/login/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore"; // Importation du store Zustand
import { cn } from "@/lib/utils"; // Assurez-vous d'avoir une fonction cn (pour tailwind-merge)

// Composant pour l'affichage des messages d'erreur/succès
const AlertMessage = ({
  message,
  type,
}: {
  message: string;
  type: "error" | "success";
}) => (
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  // Utilisation des actions du store Zustand
  const simulateLogin = useAppStore((state) => state.simulateLogin);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      // Simulation d'une vérification simple (ici, seul l'email compte)
      if (email === "test@ai-stock.com" && password === "123456") {
        // Appel de l'action Zustand
        await simulateLogin("Alice Dupont");

        setMessage({
          text: "Connexion réussie ! Redirection...",
          type: "success",
        });

        // Redirection après un court délai
        setTimeout(() => {
          router.push("/dashboard"); // Rediriger vers un tableau de bord ou la page d'accueil
        }, 1000);
      } else {
        setMessage({
          text: "Erreur de connexion. Veuillez vérifier votre email et mot de passe.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Une erreur inattendue est survenue.",
        type: "error",
      });
      console.error(error);
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

        <form className="space-y-6" onSubmit={handleSubmit}>
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
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black transition-colors",
                // Style du bouton Jaune Vif (comme dans la Navbar)
                "bg-[#FFD007] hover:bg-opacity-90",
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
            className="font-medium text-yellow-600 hover:text-yellow-500 dark:text-[#FFD007] dark:hover:text-[#FFD007]/80"
          >
            Pas encore de compte ? S'inscrire
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
