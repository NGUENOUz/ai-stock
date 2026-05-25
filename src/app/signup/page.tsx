"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabaseClient";
import { DEV_MODE, mockSignUp } from "@/lib/supabase/dev-auth";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/store/useAppStore";

const ROLES: { value: UserRole; label: string; desc: string; icon: string }[] = [
  { value: "user", label: "Utilisateur", desc: "Accédez aux outils, prompts et formations", icon: "👤" },
  { value: "contributor", label: "Contributeur", desc: "Publiez et monétisez vos créations", icon: "🚀" },
];

const SignupPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole>("user");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const loginFromDb = useAppStore((s) => s.loginFromDb);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);
    try {
      let authResult;
      
      if (DEV_MODE) {
        // Mode développement - pas de Supabase
        authResult = await mockSignUp(email, password, { user_name: userName, role });
      } else {
        // Mode production - Supabase
        authResult = await supabase.auth.signUp({
          email,
          password,
          options: { 
            data: { user_name: userName, role },
            emailRedirectTo: undefined
          },
        });
      }

      const { data, error: authError } = authResult;

      if (authError) {
        console.error('Erreur auth:', authError);
        if (authError.message.includes('rate limit')) {
          setError("Trop de tentatives. Veuillez attendre quelques minutes avant de réessayer.");
        } else {
          setError(authError.message || "Erreur lors de la création du compte.");
        }
        setIsLoading(false);
        return;
      }

      if (!data.user) {
        setError("Erreur lors de la création du compte.");
        setIsLoading(false);
        return;
      }

      // Connexion automatique après inscription (seulement en production)
      if (!DEV_MODE) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          console.error('Erreur connexion:', signInError);
        }
      }

      // Simuler la création du profil pour le moment
      loginFromDb({ userName, email, role, subscription: "Gratuit" });
      router.push("/dashboard");
    } catch (err) {
      console.error("Erreur signup:", err);
      if (err instanceof Error && err.message.includes('fetch')) {
        setError("Impossible de se connecter au serveur. Vérifiez votre connexion.");
      } else {
        setError("Une erreur technique est survenue.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-black font-black text-lg">AI</span>
            </div>
            <span className="text-2xl font-black text-neutral-900">AI-STOCK</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Créer un compte</h1>
          <p className="text-neutral-500 mt-1">Rejoignez la communauté IA</p>
        </div>

        <div className="flex items-center gap-2 mb-6 px-2">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all",
                step >= s ? "bg-primary text-black" : "bg-neutral-200 text-neutral-500"
              )}>
                {s}
              </div>
              {s < 2 && <div className={cn("flex-1 h-0.5 transition-all", step > s ? "bg-primary" : "bg-neutral-200")} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-error/10 border border-error/30 text-error text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Quel est votre profil ?
              </h2>
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all flex items-start gap-4",
                    role === r.value
                      ? "border-primary bg-primary/5"
                      : "border-neutral-200 hover:border-neutral-300"
                  )}
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <div className="font-semibold text-neutral-900 flex items-center gap-2">
                      {r.label}
                      {role === r.value && (
                        <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-neutral-500 mt-0.5">{r.desc}</div>
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-2 py-3 px-6 rounded-xl font-semibold text-black bg-primary hover:bg-primary/90 shadow-glow transition-all"
              >
                Continuer →
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Vos informations
              </h2>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  required
                  placeholder="Votre pseudo"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Adresse email
                </label>
                <input
                  type="email"
                  required
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min. 6 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-all"
                >
                  ← Retour
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "flex-1 py-3 px-6 rounded-xl font-semibold text-black bg-primary hover:bg-primary/90 shadow-glow transition-all flex items-center justify-center gap-2",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Création...
                    </>
                  ) : (
                    "Créer mon compte"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center mt-6 text-sm text-neutral-500">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-primary font-semibold hover:text-primary/80">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
