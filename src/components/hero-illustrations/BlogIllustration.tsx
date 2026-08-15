"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Rss, Image as ImageIcon } from "lucide-react";

export default function BlogIllustration() {
  return (
    <div className="relative w-full h-[180px] hidden md:flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Main Floating Tablet */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotateX: [15, 5, 15],
          rotateY: [-20, -10, -20],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-36 h-48 bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border-2 border-white/80 dark:border-slate-700/80 rounded-3xl flex flex-col p-4 shadow-2xl shadow-blue-500/20 overflow-hidden"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 pointer-events-none" />
        
        {/* Tablet Header / Screen Image */}
        <div className="w-full h-16 bg-white/50 dark:bg-slate-900/50 rounded-xl mb-4 relative overflow-hidden border border-white/50 dark:border-slate-700/50 shadow-inner">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <ImageIcon className="w-6 h-6 text-blue-400/50" />
          </motion.div>
        </div>

        {/* Animated Text Lines */}
        <div className="flex flex-col gap-2.5 w-full">
          <motion.div 
            initial={{ width: "20%" }}
            animate={{ width: ["20%", "100%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 bg-blue-500/40 rounded-full"
          />
          <motion.div 
            initial={{ width: "20%" }}
            animate={{ width: ["20%", "80%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="h-2 bg-slate-400/40 dark:bg-slate-600/40 rounded-full"
          />
          <motion.div 
            initial={{ width: "20%" }}
            animate={{ width: ["20%", "90%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="h-2 bg-slate-400/40 dark:bg-slate-600/40 rounded-full"
          />
          <motion.div 
            initial={{ width: "20%" }}
            animate={{ width: ["20%", "60%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="h-2 bg-slate-400/40 dark:bg-slate-600/40 rounded-full"
          />
        </div>

        {/* Orbiting Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-8 bg-white dark:bg-slate-800 p-2 rounded-xl border border-blue-200 dark:border-blue-800 shadow-xl"
          style={{ transform: "translateZ(40px)" }}
        >
          <Rss className="w-4 h-4 text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-4 bottom-8 bg-white dark:bg-slate-800 p-2 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-xl"
          style={{ transform: "translateZ(20px)" }}
        >
          <FileText className="w-4 h-4 text-indigo-500" />
        </motion.div>

      </motion.div>
    </div>
  );
}
