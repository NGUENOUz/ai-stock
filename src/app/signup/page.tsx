"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, User, Rocket } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase/supabaseClient";
import { DEV_MODE, mockSignUp } from "@/lib/supabase/dev-auth";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/store/useAppStore";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginFromDb = useAppStore((s) => s.loginFromDb);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let authResult;
      if (DEV_MODE) {
        authResult = await mockSignUp(email, password, { user_name: userName, role });
      } else {
        authResult = await supabase.auth.signUp({
          email,
          password,
          options: { data: { user_name: userName, role } },
        });
      }

      if (authResult.error) throw authResult.error;
      
      // Connexion automatique après inscription
      if (!DEV_MODE) await supabase.auth.signInWithPassword({ email, password });
      
      loginFromDb({ userName, email, role, subscription: "Gratuit" });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px]">
        
        {/* Partie Gauche : Branding & Info */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <Link href="/" className="flex items-center gap-2.5 z-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="text-xl font-black text-white">AI-STOCK</span>
          </Link>
          <h2 className="text-4xl font-bold z-10">Rejoignez la communauté<br />des créateurs IA.</h2>
          <p className="text-purple-100 opacity-60 text-sm z-10">© 2026 AI-STOCK.</p>
        </div>

        {/* Partie Droite : Formulaire */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
            </div>

            {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required placeholder="Nom d'utilisateur" className="input w-full" value={userName} onChange={(e) => setUserName(e.target.value)} />
              <input type="email" required placeholder="Adresse email" className="input w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" required placeholder="Mot de passe" className="input w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
              
              <div className="grid grid-cols-2 gap-3 py-2">
                <button type="button" onClick={() => setRole("user")} className={cn("p-3 rounded-xl border-2 text-sm flex items-center justify-center gap-2 transition-all", role === 'user' ? "border-indigo-600 bg-indigo-50" : "border-gray-200")}>
                  <User className="w-4 h-4" /> Utilisateur
                </button>
                <button type="button" onClick={() => setRole("contributor")} className={cn("p-3 rounded-xl border-2 text-sm flex items-center justify-center gap-2 transition-all", role === 'contributor' ? "border-indigo-600 bg-indigo-50" : "border-gray-200")}>
                  <Rocket className="w-4 h-4" /> Contributeur
                </button>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg">
                {isLoading ? "Inscription..." : "Créer mon compte"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-xs text-gray-400 uppercase font-medium">
              <div className="h-px bg-gray-200 flex-1" />Ou continuer avec<div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {['Google', 'Behance', 'GitHub'].map((label) => (
                <button key={label} className="py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">{label}</button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Déjà un compte ? <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;