"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Zap, User, Rocket, Briefcase, Mail, Lock, Code, PenTool, 
  TrendingUp, Search, MessageSquare, MonitorPlay, Check, ChevronRight, ChevronLeft
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useOnboardingStore, OnboardingData } from "@/store/useOnboardingStore";
import { supabase } from "@/lib/supabase/supabaseClient";
import { DEV_MODE, mockSignUp } from "@/lib/supabase/dev-auth";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

const Step1Account = () => {
  const { data, updateData, nextStep } = useOnboardingStore();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Créer votre compte</h2>
        <p className="text-muted-foreground text-sm mt-1">Rejoignez la communauté AI-STOCK</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Nom d'utilisateur</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              className="input pl-10" 
              placeholder="johndoe" 
              value={data.userName || ""}
              onChange={(e) => updateData({ userName: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="email" 
              className="input pl-10" 
              placeholder="john@example.com"
              value={data.email || ""}
              onChange={(e) => updateData({ email: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Mot de passe</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="password" 
              className="input pl-10" 
              placeholder="••••••••"
              value={data.password || ""}
              onChange={(e) => updateData({ password: e.target.value })}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            type="button" 
            onClick={() => updateData({ role: "user" })} 
            className={cn("p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all", data.role === 'user' ? "border-primary bg-primary/5 text-primary" : "border-border text-slate-500 hover:border-slate-300")}
          >
            <User className="w-6 h-6" /> 
            <span className="text-sm font-semibold">Utilisateur</span>
          </button>
          <button 
            type="button" 
            onClick={() => updateData({ role: "contributor" })} 
            className={cn("p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all", data.role === 'contributor' ? "border-primary bg-primary/5 text-primary" : "border-border text-slate-500 hover:border-slate-300")}
          >
            <Rocket className="w-6 h-6" /> 
            <span className="text-sm font-semibold">Contributeur</span>
          </button>
        </div>
      </div>
      
      <button 
        onClick={nextStep}
        disabled={!data.email || !data.password || !data.userName}
        className="btn-primary w-full flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continuer <ChevronRight className="w-4 h-4" />
      </button>

      <div className="mt-6 flex items-center gap-4 text-xs text-slate-400 uppercase font-medium">
        <div className="h-px bg-border flex-1" />Ou avec<div className="h-px bg-border flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button className="btn-outline text-sm">Google</button>
        <button className="btn-outline text-sm">GitHub</button>
      </div>
      
      <p className="text-center text-sm text-slate-500 mt-6">
        Déjà un compte ? <Link href="/login" className="text-primary font-semibold hover:underline">Se connecter</Link>
      </p>
    </div>
  );
};

const Step2Profile = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Parlons de vous</h2>
        <p className="text-muted-foreground text-sm mt-1">Personnalisons votre expérience</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Prénom</label>
            <input 
              type="text" 
              className="input" 
              placeholder="John" 
              value={data.firstName || ""}
              onChange={(e) => updateData({ firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Nom</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Doe" 
              value={data.lastName || ""}
              onChange={(e) => updateData({ lastName: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Fonction</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              className="input pl-10" 
              placeholder="Ex: Product Manager"
              value={data.jobTitle || ""}
              onChange={(e) => updateData({ jobTitle: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Entreprise (Optionnel)</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 flex items-center justify-center">
              <span className="font-serif italic font-bold">@</span>
            </div>
            <input 
              type="text" 
              className="input pl-10" 
              placeholder="Ex: Acme Corp"
              value={data.company || ""}
              onChange={(e) => updateData({ company: e.target.value })}
            />
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mt-8">
        <button onClick={prevStep} className="btn-outline px-4"><ChevronLeft className="w-5 h-5" /></button>
        <button 
          onClick={nextStep}
          disabled={!data.firstName || !data.lastName || !data.jobTitle}
          className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Continuer <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const INTERESTS = [
  { id: 'dev', label: 'Développement', icon: <Code className="w-6 h-6" /> },
  { id: 'design', label: 'Design & UX', icon: <PenTool className="w-6 h-6" /> },
  { id: 'marketing', label: 'Marketing', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'seo', label: 'SEO & Content', icon: <Search className="w-6 h-6" /> },
  { id: 'sales', label: 'Ventes', icon: <MessageSquare className="w-6 h-6" /> },
  { id: 'video', label: 'Vidéo & Audio', icon: <MonitorPlay className="w-6 h-6" /> },
];

const Step3Interests = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  
  const toggleInterest = (id: string) => {
    const current = data.interests || [];
    if (current.includes(id)) {
      updateData({ interests: current.filter(i => i !== id) });
    } else {
      updateData({ interests: [...current, id] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Vos centres d'intérêt</h2>
        <p className="text-muted-foreground text-sm mt-1">Sélectionnez ce qui vous intéresse pour obtenir des recommandations personnalisées.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INTERESTS.map((item) => {
          const isSelected = (data.interests || []).includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleInterest(item.id)}
              className={cn(
                "p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all",
                isSelected 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border text-slate-500 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <div className={cn("p-2 rounded-full", isSelected ? "bg-primary/20" : "bg-slate-100 dark:bg-slate-800")}>
                {item.icon}
              </div>
              <span className="text-xs font-semibold text-center">{item.label}</span>
              {isSelected && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />}
            </button>
          )
        })}
      </div>
      
      <div className="flex gap-3 mt-8">
        <button onClick={prevStep} className="btn-outline px-4"><ChevronLeft className="w-5 h-5" /></button>
        <button 
          onClick={nextStep}
          disabled={!data.interests || data.interests.length === 0}
          className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Continuer <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const EXPERIENCE = [
  { id: 'Debutant', title: 'Débutant', desc: 'Je découvre l\'IA' },
  { id: 'Intermediaire', title: 'Intermédiaire', desc: 'J\'utilise ChatGPT de temps en temps' },
  { id: 'Avance', title: 'Avancé', desc: 'J\'utilise l\'IA tous les jours au travail' },
  { id: 'Expert', title: 'Expert', desc: 'Je construis des workflows et automatise' },
];

const Step4Experience = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Votre niveau en IA</h2>
        <p className="text-muted-foreground text-sm mt-1">Cela nous aidera à vous proposer des outils adaptés à votre niveau.</p>
      </div>

      <div className="space-y-3">
        {EXPERIENCE.map((item) => {
          const isSelected = data.experienceLevel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => updateData({ experienceLevel: item.id })}
              className={cn(
                "w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all text-left",
                isSelected 
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                  : "border-border hover:border-slate-300 bg-background"
              )}
            >
              <div>
                <h4 className={cn("font-bold", isSelected ? "text-primary" : "text-foreground")}>{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", isSelected ? "border-primary bg-primary" : "border-slate-300")}>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </button>
          )
        })}
      </div>
      
      <div className="flex gap-3 mt-8">
        <button onClick={prevStep} className="btn-outline px-4"><ChevronLeft className="w-5 h-5" /></button>
        <button 
          onClick={nextStep}
          disabled={!data.experienceLevel}
          className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Continuer <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const GOALS = [
  'Gagner du temps au quotidien',
  'Créer du contenu plus vite',
  'Automatiser des tâches répétitives',
  'Générer des images & vidéos',
  'Améliorer mon SEO',
  'Apprendre de nouvelles compétences'
];

const Step5Goals = () => {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  
  const toggleGoal = (goal: string) => {
    const current = data.goals || [];
    if (current.includes(goal)) {
      updateData({ goals: current.filter(g => g !== goal) });
    } else {
      updateData({ goals: [...current, goal] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Vos Objectifs</h2>
        <p className="text-muted-foreground text-sm mt-1">Que souhaitez-vous accomplir avec AI-STOCK ?</p>
      </div>

      <div className="space-y-2">
        {GOALS.map((goal) => {
          const isSelected = (data.goals || []).includes(goal);
          return (
            <button
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 flex items-center gap-3 transition-all text-left",
                isSelected 
                  ? "border-primary bg-primary/5 text-primary font-medium" 
                  : "border-border text-slate-600 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 bg-background"
              )}
            >
              <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", isSelected ? "bg-primary border-primary" : "border-slate-300 dark:border-slate-600")}>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              {goal}
            </button>
          )
        })}
      </div>
      
      <div className="flex gap-3 mt-8">
        <button onClick={prevStep} className="btn-outline px-4"><ChevronLeft className="w-5 h-5" /></button>
        <button 
          onClick={nextStep}
          disabled={!data.goals || data.goals.length === 0}
          className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Continuer <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Step6Process = () => {
  const { data } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginFromDb = useAppStore((s) => s.loginFromDb);
  const router = useRouter();

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let authResult;
      
      // MOCK DEV
      if (DEV_MODE) {
        authResult = await mockSignUp(data.email!, data.password!, { 
          user_name: data.userName, 
          role: data.role,
          first_name: data.firstName,
          last_name: data.lastName,
          job_title: data.jobTitle,
          company: data.company,
          interests: data.interests,
          experience_level: data.experienceLevel,
          goals: data.goals
        });
      } else {
        // REAL SUPABASE
        authResult = await supabase.auth.signUp({
          email: data.email!,
          password: data.password!,
          options: { 
            data: { 
              user_name: data.userName, 
              role: data.role,
              first_name: data.firstName,
              last_name: data.lastName,
              job_title: data.jobTitle,
              company: data.company,
              interests: data.interests,
              experience_level: data.experienceLevel,
              goals: data.goals
            } 
          },
        });
        if (authResult.error) throw authResult.error;
        await supabase.auth.signInWithPassword({ email: data.email!, password: data.password! });
        
        // Supabase trigger should automatically insert into public.users but to be safe:
        // await supabase.from('users').update({ ... }).eq('id', authResult.data.user?.id);
      }

      loginFromDb({ userName: data.userName!, email: data.email!, role: data.role!, subscription: "Gratuit" });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la finalisation.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-center py-8">
      <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-soft">
        <Check className="w-10 h-10" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tout est prêt !</h2>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">Votre profil a été configuré avec succès. Nous allons maintenant vous rediriger vers votre dashboard personnalisé.</p>
      </div>

      {error && <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm text-left">{error}</div>}

      <button 
        onClick={handleComplete}
        disabled={isLoading}
        className="btn-primary w-full mt-8 py-3.5 text-base shadow-primary"
      >
        {isLoading ? "Création de votre univers..." : "Accéder à mon espace"}
      </button>
    </div>
  );
};


export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore();
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted dark:bg-background">
      
      {/* Partie Gauche (Branding & Progression) */}
      <div className="w-full md:w-[45%] lg:w-[40%] bg-gradient-to-br from-secondary via-primary to-blue-400 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-lg transition-transform group-hover:scale-105">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">AI-STOCK</span>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="relative z-10 mt-12 md:mt-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Configurez<br/>votre espace<br/>sur mesure.
          </h1>
          <p className="mt-4 text-blue-100 opacity-90 max-w-sm">
            Répondez à quelques questions pour nous permettre de vous recommander les meilleurs outils et prompts IA.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 6) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm font-bold w-12 shrink-0">{currentStep} / 6</span>
            </div>
            <div className="hidden md:flex flex-col gap-4">
               {/* Stepper visuel textuel optionnel */}
               <div className={cn("flex items-center gap-3 transition-opacity", currentStep >= 1 ? "opacity-100" : "opacity-40")}>
                 <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", currentStep > 1 ? "bg-white text-primary" : (currentStep === 1 ? "bg-white text-primary" : "border-2 border-white/40 text-white"))}>
                   {currentStep > 1 ? <Check className="w-3 h-3" /> : 1}
                 </div>
                 <span className="font-semibold text-sm">Compte</span>
               </div>
               <div className={cn("flex items-center gap-3 transition-opacity", currentStep >= 2 ? "opacity-100" : "opacity-40")}>
                 <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", currentStep > 2 ? "bg-white text-primary" : (currentStep === 2 ? "bg-white text-primary" : "border-2 border-white/40 text-white"))}>
                   {currentStep > 2 ? <Check className="w-3 h-3" /> : 2}
                 </div>
                 <span className="font-semibold text-sm">Profil</span>
               </div>
               <div className={cn("flex items-center gap-3 transition-opacity", currentStep >= 3 ? "opacity-100" : "opacity-40")}>
                 <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", currentStep > 3 ? "bg-white text-primary" : (currentStep === 3 ? "bg-white text-primary" : "border-2 border-white/40 text-white"))}>
                   {currentStep > 3 ? <Check className="w-3 h-3" /> : 3}
                 </div>
                 <span className="font-semibold text-sm">Intérêts & Niveau</span>
               </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 hidden md:block mt-8">
          <p className="text-sm text-blue-200">© 2026 AI-STOCK. Tous droits réservés.</p>
        </div>
      </div>

      {/* Partie Droite (Formulaire dynamique) */}
      <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col relative bg-background">
        <div className="hidden md:flex justify-end mb-8 w-full">
           <ThemeToggle />
        </div>
        
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentStep === 1 && <Step1Account />}
              {currentStep === 2 && <Step2Profile />}
              {currentStep === 3 && <Step3Interests />}
              {currentStep === 4 && <Step4Experience />}
              {currentStep === 5 && <Step5Goals />}
              {currentStep === 6 && <Step6Process />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
