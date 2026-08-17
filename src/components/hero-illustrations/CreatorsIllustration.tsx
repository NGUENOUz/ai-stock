"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Star, Users, Zap } from "lucide-react";
import Image from "next/image";

export default function CreatorsIllustration() {
  return (
    <div className="relative w-full h-[220px] hidden md:flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Floating Container — podium central */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-36 h-36 bg-white/30 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] flex flex-col items-center justify-center gap-2 shadow-2xl shadow-blue-500/20"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-[2rem] pointer-events-none" />

        {/* Crown Icon */}
        <motion.div
          animate={{ rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-amber-400/20 p-3 rounded-2xl border border-amber-400/30 shadow-inner"
          style={{ transform: "translateZ(30px)" }}
        >
          <Crown className="w-9 h-9 text-amber-500 dark:text-amber-400" />
        </motion.div>

        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 relative z-10">
          Top Créateurs
        </span>
      </motion.div>

      {/* Orbiting Avatar 1 — haut droite */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 right-14 bg-white dark:bg-slate-800 p-1.5 rounded-full border-2 border-blue-300 dark:border-blue-700 shadow-xl"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image src="https://i.pravatar.cc/150?img=10" alt="creator" fill className="object-cover" />
        </div>
        <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-[9px] font-black text-white rounded-full w-4 h-4 flex items-center justify-center">1</span>
      </motion.div>

      {/* Orbiting Avatar 2 — gauche milieu */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-1.5 rounded-full border-2 border-indigo-300 dark:border-indigo-700 shadow-xl"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden">
          <Image src="https://i.pravatar.cc/150?img=11" alt="creator" fill className="object-cover" />
        </div>
        <span className="absolute -top-1.5 -right-1.5 bg-slate-400 text-[9px] font-black text-white rounded-full w-4 h-4 flex items-center justify-center">2</span>
      </motion.div>

      {/* Stats bubble — bas gauche */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-2 left-12 bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2"
      >
        <Users className="w-4 h-4 text-blue-500" />
        <span className="text-xs font-black text-slate-900 dark:text-white">50K+</span>
        <span className="text-[10px] text-slate-400 font-medium">abonnés</span>
      </motion.div>

      {/* Star badge — haut gauche */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-4 left-20 bg-amber-400/20 p-2 rounded-full border border-amber-400/40 shadow-lg"
      >
        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
      </motion.div>

      {/* Zap badge — bas droite */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 right-12 bg-blue-500/20 p-2 rounded-full border border-blue-400/40 shadow-lg"
      >
        <Zap className="w-4 h-4 text-blue-500 fill-blue-400" />
      </motion.div>
    </div>
  );
}
