"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase/supabaseClient";
import { DEV_MODE, mockSignIn } from "@/lib/supabase/dev-auth";
import { cn } from "@/lib/utils";
import type { UserRole, SubscriptionTier } from "@/store/useAppStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const loginFromDb = useAppStore((s) => s.loginFromDb);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace("/dashboard");
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    console.log('🔄 Début de la connexion:', { email, DEV_MODE });

    try {
      if (DEV_MODE) {
        console.log('🛠️ Mode développement activé');
        // Mode développement - simulation rapide
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier les comptes de test
        const testAccounts: Record<string, { password: string; role: UserRole; userName: string }> = {
          'admin@test.com': { password: 'admin123', role: 'admin', userName: 'Admin Test' },
          'user@test.com': { password: 'user123', role: 'user', userName: 'User Test' },
          'contributor@test.com': { password: 'contrib123', role: 'contributor', userName: 'Contributor Test' }
        };
        
        const testAccount = testAccounts[email];
        console.log('🔍 Compte trouvé:', testAccount);
        
        let userData;
        if (testAccount && testAccount.password === password) {
          console.log('✅ Compte de test valide');
          userData = {
            userName: testAccount.userName,
            email: email,
            role: testAccount.role,
            subscription: "Gratuit" as SubscriptionTier,
            subscriptionEndDate: null,
          };
        } else {
          console.log('🔧 Compte générique');
          userData = {
            userName: "Utilisateur Dev",
            email: email,
            role: "user" as UserRole,
            subscription: "Gratuit" as SubscriptionTier,
            subscriptionEndDate: null,
          };
        }
        
        console.log('📝 Données utilisateur:', userData);
        loginFromDb(userData);
        console.log('✅ Store mis à jour');
        
        // Vérifier l'état du store
        setTimeout(() => {
          const state = useAppStore.getState();
          console.log('🏪 État du store après login:', { 
            isLoggedIn: state.isLoggedIn, 
            userName: state.userName, 
            role: state.role 
          });
        }, 100);
        
        setIsLoading(false);
        
        // Redirection selon le rôle avec vérification
        console.log('🔍 Rôle détecté:', userData.role);
        const redirectPath = userData.role === 'admin' ? '/admin/dashboard' : '/dashboard';
        console.log('🔄 Redirection vers:', redirectPath);
        
        // Attendre un peu avant la redirection pour s'assurer que le store est mis à jour
        setTimeout(() => {
          router.push(redirectPath);
        }, 200);
        return;
      }

      // Mode production - Supabase
      console.log('🌐 Mode production - Supabase');
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError || !data.user) {
        console.error('❌ Erreur auth:', authError);
        setError("Email ou mot de passe incorrect.");
        setIsLoading(false);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (userError || !userData) {
        console.error('❌ Erreur user data:', userError);
        setError("Impossible de récupérer votre profil.");
        setIsLoading(false);
        return;
      }

      loginFromDb({
        userName: userData.user_name || userData.email,
        email: userData.email,
        role: (userData.role as UserRole) || "user",
        subscription: userData.subscription || "Gratuit",
        subscriptionEndDate: userData.subscription_end_date || null,
      });

      const redirectMap: Record<UserRole, string> = {
        admin: "/admin/dashboard",
        contributor: "/dashboard",
        user: "/dashboard",
      };
      
      setIsLoading(false);
      router.push(redirectMap[userData.role as UserRole] || "/dashboard");
    } catch (err) {
      console.error('💥 Erreur login:', err);
      setError("Une erreur technique est survenue.");
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
          <h1 className="text-3xl font-bold text-neutral-900">Bon retour 👋</h1>
          <p className="text-neutral-500 mt-1">Connectez-vous à votre compte</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm">
              <div className="font-semibold mb-1">🛠️ Mode développement</div>
              <div className="text-xs space-y-1">
                <div>• admin@test.com / admin123 (Admin)</div>
                <div>• user@test.com / user123 (Utilisateur)</div>
                <div>• contributor@test.com / contrib123 (Contributeur)</div>
              </div>
            </div>
          )}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-error/10 border border-error/30 text-error text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-neutral-700">
                  Mot de passe
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80 font-medium">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-3 px-6 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-all duration-200",
                "flex items-center justify-center gap-2",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-neutral-500">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:text-primary/80">
            S'inscrire gratuitement
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
