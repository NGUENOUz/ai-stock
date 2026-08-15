"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wand2, Sparkles, TerminalSquare } from "lucide-react";

export default function PromptsIllustration() {
  return (
    <div className="relative w-full h-[180px] hidden md:flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-pink-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Main Floating Container */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotateZ: [-5, 5, -5],
          rotateX: [5, -5, 5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-32 h-32 bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-pink-500/20"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-[2rem] pointer-events-none" />
        
        {/* Core Icon */}
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-pink-500/20 p-3 rounded-2xl border border-pink-500/30 shadow-inner"
          style={{ transform: "translateZ(30px)" }}
        >
          <Wand2 className="w-10 h-10 text-pink-600 dark:text-pink-400" />
        </motion.div>

        {/* Orbiting Elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 p-2 rounded-full border border-orange-200 dark:border-orange-800 shadow-xl"
          style={{ transform: "translateZ(50px)" }}
        >
          <Sparkles className="w-4 h-4 text-orange-500" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-pink-200 dark:border-pink-800 shadow-xl flex items-center justify-center"
          style={{ transform: "translateZ(10px)" }}
        >
          <TerminalSquare className="w-5 h-5 text-pink-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}
