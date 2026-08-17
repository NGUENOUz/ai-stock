"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase/supabaseClient";
import { DEV_MODE } from "@/lib/supabase/dev-auth";
import type { UserRole } from "@/store/useAppStore";
import { AuthBackground } from "@/components/AuthBackground";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      loginFromDb({
        userName: userData.user_name || userData.email,
        email: userData.email,
        role: (userData.role as UserRole) || "user",
        subscription: userData.subscription || "Gratuit",
        subscriptionEndDate: userData.subscription_end_date || null,
      });

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
    <div className="min-h-screen flex bg-white dark:bg-[#0F172A] font-sans">
      
      {/* Partie Gauche : Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 xl:p-32 overflow-y-auto">
        
        <Link href="/" className="flex items-center gap-2.5 group w-fit mb-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 fill-white text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">AI-STOCK</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Connectez-vous à votre compte!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Heureux de vous revoir. Accédez à vos outils et ressources.
          </p>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 p-3.5 border-2 border-slate-900 dark:border-white rounded-xl text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 p-3.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              Twitter
            </button>
          </div>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">- OU -</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <div className="relative">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Adresse Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 pb-3 text-slate-900 dark:text-white font-semibold text-lg focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-600"
                placeholder="nom@exemple.com"
              />
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Mot de Passe</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 pb-3 text-slate-900 dark:text-white font-semibold text-lg focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-600 pr-10"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded-md group-hover:border-blue-500 transition-colors">
                  <input type="checkbox" className="opacity-0 absolute w-full h-full cursor-pointer peer" />
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Se souvenir de moi</span>
              </label>
              
              <Link href="/forgot-password" className="text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full sm:w-auto py-4 px-10 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg transition-all shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.35)] hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Se connecter"}
            </button>
          </form>

          <p className="mt-12 text-sm font-semibold text-slate-500 dark:text-slate-400">
            Vous n'avez pas de compte ? <Link href="/signup" className="text-slate-900 dark:text-white underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">S'inscrire</Link>
          </p>

          {/* Footer mini */}
          <div className="mt-auto pt-12 flex gap-4 text-xs font-bold text-slate-400">
            <Link href="#" className="hover:text-slate-800 dark:hover:text-slate-200">Conditions</Link>
            <span>•</span>
            <Link href="#" className="hover:text-slate-800 dark:hover:text-slate-200">Confidentialité</Link>
          </div>

        </div>
      </div>

      {/* Partie Droite : Décorative */}
      <AuthBackground />
      
    </div>
  );
};

export default LoginPage;