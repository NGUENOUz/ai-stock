"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase/supabaseClient";
import { DEV_MODE } from "@/lib/supabase/dev-auth";
import type { UserRole } from "@/store/useAppStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginFromDb = useAppStore((s) => s.loginFromDb);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace("/dashboard");
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let userData;

      if (DEV_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Simulation de rôles pour tests
        const role = email.includes('admin') ? 'admin' : 'user';
        userData = {
          user_name: "Utilisateur Test",
          email: email,
          role: role,
          subscription: "Gratuit",
          subscription_end_date: null
        };
      } else {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;

        const { data: fetchedData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single();
        
        if (userError || !fetchedData) throw new Error("Profil introuvable");
        userData = fetchedData;
      }

      // Mise à jour du store
      loginFromDb({
        userName: userData.user_name || userData.email,
        email: userData.email,
        role: (userData.role as UserRole) || "user",
        subscription: userData.subscription || "Gratuit",
        subscriptionEndDate: userData.subscription_end_date || null,
      });

      // Redirection logique corrigée
      const role = userData.role as UserRole;
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px]">
        
        {/* Partie Gauche : Branding & Animation */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-float delay-1000" />

          <Link href="/" className="flex items-center gap-2.5 px-2 group w-fit z-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:rotate-6">
              <Zap className="h-5 w-5 fill-indigo-600 text-indigo-600" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">AI-STOCK</span>
          </Link>

          <div className="z-10">
            <h2 className="text-4xl font-bold mb-6 leading-tight animate-fade-up">
              Accédez à votre hub<br />personnel pour plus de<br />clarté et productivité
            </h2>
            <div className="space-y-3">
              {["Gestion intelligente des tâches", "Analyse de données", "Collaboration fluide"].map((item, i) => (
                <div key={item} className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 animate-fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="w-2 h-2 rounded-full bg-indigo-300" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-purple-100 opacity-60 text-sm z-10">© 2026 AI-STOCK.</p>
        </div>

        {/* Partie Droite : Formulaire */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
              <p className="text-gray-500 text-sm mt-1">Heureux de vous revoir !</p>
            </div>

            {error && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Adresse email</label>
                <input type="email" required className="input" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Mot de passe</label>
                <input type="password" required className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 mt-2">
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-xs text-gray-400 uppercase font-medium">
              <div className="h-px bg-gray-200 flex-1" />Ou continuer avec<div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {['Be', 'G', 'f'].map((label) => (
                <button key={label} className="py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 font-semibold text-gray-600 transition-colors">{label}</button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Pas encore de compte ? <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;