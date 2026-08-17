"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Check, ChevronRight, ChevronLeft, Building2, Code, Megaphone, PenTool, Database, Lightbulb, Briefcase, GraduationCap, Loader2, EyeOff, Eye, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase/supabaseClient";
import { DEV_MODE, mockSignUp } from "@/lib/supabase/dev-auth";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AuthBackground } from "@/components/AuthBackground";

// Types pour le formulaire
type ExperienceLevel = "Débutant" | "Intermédiaire" | "Avancé" | "Expert" | "";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  interests: string[];
  experienceLevel: ExperienceLevel;
  goals: string[];
}

const INTEREST_OPTIONS = [
  { id: "marketing", label: "Marketing", icon: <Megaphone className="w-5 h-5" /> },
  { id: "dev", label: "Développement", icon: <Code className="w-5 h-5" /> },
  { id: "content", label: "Création de contenu", icon: <PenTool className="w-5 h-5" /> },
  { id: "design", label: "Design", icon: <Zap className="w-5 h-5" /> },
  { id: "data", label: "Data & Analytics", icon: <Database className="w-5 h-5" /> },
  { id: "productivity", label: "Productivité", icon: <Lightbulb className="w-5 h-5" /> },
  { id: "education", label: "Éducation", icon: <GraduationCap className="w-5 h-5" /> },
  { id: "business", label: "Business", icon: <Briefcase className="w-5 h-5" /> },
];

const EXPERIENCE_OPTIONS = [
  { id: "Débutant", label: "Débutant", desc: "Je découvre l'IA" },
  { id: "Intermédiaire", label: "Intermédiaire", desc: "J'ai quelques connaissances" },
  { id: "Avancé", label: "Avancé", desc: "J'utilise l'IA régulièrement" },
  { id: "Expert", label: "Expert", desc: "Je suis un professionnel de l'IA" },
];

const GOAL_OPTIONS = [
  { id: "time", label: "Gagner du temps et automatiser des tâches" },
  { id: "productivity", label: "Augmenter ma productivité" },
  { id: "skills", label: "Développer mes compétences" },
  { id: "content", label: "Créer du contenu de qualité" },
  { id: "growth", label: "Booster ma croissance" },
];

export default function SignupPage() {
  const router = useRouter();
  const loginFromDb = useAppStore((s) => s.loginFromDb);
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    interests: [],
    experienceLevel: "",
    goals: [],
  });

  const totalSteps = 6;

  const updateForm = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "interests" | "goals", value: string) => {
    setFormData((prev) => {
      const array = prev[field] as string[];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter((i) => i !== value) };
      }
      return { ...prev, [field]: [...array, value] };
    });
  };

  const nextStep = () => {
    setError(null);
    if (step === 1 && (!formData.email || !formData.password)) {
      setError("Veuillez remplir l'email et le mot de passe.");
      return;
    }
    if (step === 2 && (!formData.firstName || !formData.lastName || !formData.jobTitle)) {
      setError("Veuillez remplir les informations obligatoires.");
      return;
    }
    if (step === 3 && formData.interests.length === 0) {
      setError("Veuillez sélectionner au moins un centre d'intérêt.");
      return;
    }
    if (step === 4 && !formData.experienceLevel) {
      setError("Veuillez sélectionner votre niveau d'expérience.");
      return;
    }
    if (step === 5 && formData.goals.length === 0) {
      setError("Veuillez sélectionner au moins un objectif.");
      return;
    }
    setStep(s => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => {
    setError(null);
    setStep(s => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
      return;
    }
    
    setError(null);
    setIsLoading(true);

    try {
      if (DEV_MODE) {
        await mockSignUp(formData);
        loginFromDb({
          userName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          role: "user",
          subscription: "Gratuit",
          subscriptionEndDate: null,
        });
      } else {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (authError) throw authError;

        if (authData.user) {
          const { error: dbError } = await supabase.from("users").insert([
            {
              id: authData.user.id,
              email: formData.email,
              user_name: `${formData.firstName} ${formData.lastName}`,
              onboarding_data: {
                jobTitle: formData.jobTitle,
                company: formData.company,
                interests: formData.interests,
                experienceLevel: formData.experienceLevel,
                goals: formData.goals,
              },
            },
          ]);
          if (dbError) throw dbError;
        }

        loginFromDb({
          userName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          role: "user",
          subscription: "Gratuit",
          subscriptionEndDate: null,
        });
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  // Variantes d'animation pour les étapes
  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0F172A] font-sans">
      
      {/* Partie Gauche : Formulaire Stepper */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 xl:px-32 xl:py-20 overflow-y-auto relative">
        
        {/* Header avec Logo et Bouton Retour */}
        <div className="flex items-center justify-between mb-12">
          {step > 1 ? (
            <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold text-sm">
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
                <Zap className="h-4 w-4 fill-white text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">AI-STOCK</span>
            </Link>
          )}
          
          <div className="text-sm font-bold text-slate-400">
            Étape {step} / {totalSteps}
          </div>
        </div>

        {/* Stepper visuel moderne */}
        <div className="flex gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  i + 1 < step ? "bg-emerald-500" : i + 1 === step ? "bg-blue-600" : "bg-transparent"
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col relative max-w-md w-full mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {error}
                  </div>
                )}

                {/* ETAPE 1: Email & Password */}
                {step === 1 && (
                  <>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Créez votre compte</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Rejoignez +15 000 créateurs sur AI-STOCK.</p>

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <button type="button" className="flex items-center justify-center gap-2 p-3.5 border-2 border-slate-900 dark:border-white rounded-xl text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                      </button>
                      <button type="button" className="flex items-center justify-center gap-2 p-3.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
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

                    <div className="space-y-6">
                      <div className="relative">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Adresse Email</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 pb-3 text-slate-900 dark:text-white font-semibold text-lg focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-600"
                          placeholder="nom@exemple.com"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Mot de Passe</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => updateForm("password", e.target.value)}
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
                    </div>
                  </>
                )}

                {/* ETAPE 2: Infos perso */}
                {step === 2 && (
                  <>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Faisons connaissance</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Parlez-nous un peu de vous.</p>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Prénom</label>
                          <input type="text" value={formData.firstName} onChange={(e) => updateForm("firstName", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 pb-3 text-slate-900 dark:text-white font-semibold text-lg focus:outline-none focus:border-blue-600 transition-colors" placeholder="Jean" />
                        </div>
                        <div className="relative">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Nom</label>
                          <input type="text" value={formData.lastName} onChange={(e) => updateForm("lastName", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 pb-3 text-slate-900 dark:text-white font-semibold text-lg focus:outline-none focus:border-blue-600 transition-colors" placeholder="Dupont" />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Titre de poste / Métier</label>
                        <input type="text" value={formData.jobTitle} onChange={(e) => updateForm("jobTitle", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 pb-3 text-slate-900 dark:text-white font-semibold text-lg focus:outline-none focus:border-blue-600 transition-colors" placeholder="Ex: Designer, CEO..." />
                      </div>
                      <div className="relative">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">Entreprise (optionnel)</label>
                        <input type="text" value={formData.company} onChange={(e) => updateForm("company", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 pb-3 text-slate-900 dark:text-white font-semibold text-lg focus:outline-none focus:border-blue-600 transition-colors" placeholder="Votre entreprise" />
                      </div>
                    </div>
                  </>
                )}

                {/* ETAPE 3: Intérêts */}
                {step === 3 && (
                  <>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Vos centres d'intérêt</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Sélectionnez ce qui vous passionne le plus.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {INTEREST_OPTIONS.map((option) => {
                        const isSelected = formData.interests.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => toggleArrayItem("interests", option.id)}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                              isSelected 
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" 
                                : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            <div className={cn("shrink-0", isSelected ? "text-blue-600" : "text-slate-400")}>
                              {option.icon}
                            </div>
                            <span className="font-bold text-sm">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ETAPE 4: Expérience */}
                {step === 4 && (
                  <>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Votre niveau en IA</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Où vous situez-vous actuellement ?</p>
                    <div className="space-y-3">
                      {EXPERIENCE_OPTIONS.map((option) => {
                        const isSelected = formData.experienceLevel === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => updateForm("experienceLevel", option.id as ExperienceLevel)}
                            className={cn(
                              "w-full flex flex-col p-4 rounded-xl border-2 text-left transition-all",
                              isSelected 
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" 
                                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            <span className={cn("font-bold text-lg mb-1", isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-900 dark:text-white")}>{option.label}</span>
                            <span className="text-sm text-slate-500 font-medium">{option.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ETAPE 5: Objectifs */}
                {step === 5 && (
                  <>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Vos objectifs</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Qu'espérez-vous accomplir avec AI-STOCK ?</p>
                    <div className="space-y-3">
                      {GOAL_OPTIONS.map((option) => {
                        const isSelected = formData.goals.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => toggleArrayItem("goals", option.id)}
                            className={cn(
                              "w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all",
                              isSelected 
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" 
                                : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            <span className="font-bold">{option.label}</span>
                            <div className={cn("w-5 h-5 rounded-md border flex items-center justify-center", isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 dark:border-slate-600 text-transparent")}>
                              <Check className="w-3 h-3" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ETAPE 6: Confirmation */}
                {step === 6 && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Tout est prêt !</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                      Votre profil personnalisé a été configuré. Cliquez ci-dessous pour créer votre compte et accéder au dashboard.
                    </p>
                  </div>
                )}

              </form>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons Footer */}
          <div className="mt-12 flex justify-end">
            {step < totalSteps ? (
              <button 
                type="button"
                onClick={nextStep}
                className="py-4 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-bold rounded-xl text-base transition-all shadow-lg flex items-center gap-2"
              >
                Continuer <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-4 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg transition-all shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Terminer l'inscription"}
              </button>
            )}
          </div>

          {step === 1 && (
            <p className="mt-8 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
              Déjà un compte ? <Link href="/login" className="text-slate-900 dark:text-white underline hover:text-blue-600 transition-colors">Se connecter</Link>
            </p>
          )}

        </div>
      </div>

      {/* Partie Droite : Décorative */}
      <AuthBackground />

    </div>
  );
}