"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderOpen, FileText, FileCode2, Layers } from "lucide-react";

export default function ResourcesIllustration() {
  return (
    <div className="relative w-full h-[180px] hidden md:flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Main Floating Folder */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotateX: [10, -5, 10],
          rotateY: [-10, 5, -10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-40 h-32 bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-[1.5rem] pointer-events-none" />
        
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transform: "translateZ(30px)" }}
        >
          <FolderOpen className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        {/* Flying Documents */}
        <motion.div
          animate={{
            y: [0, -50, -30, 0],
            x: [0, -30, -15, 0],
            rotateZ: [0, -20, -10, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.8, 1]
          }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-xl"
          style={{ transform: "translateZ(-10px)" }}
        >
          <FileText className="w-6 h-6 text-emerald-500" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -70, -40, 0],
            x: [0, 40, 15, 0],
            rotateZ: [0, 25, 10, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
            times: [0, 0.3, 0.8, 1]
          }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-xl border border-teal-200 dark:border-teal-800 shadow-xl"
          style={{ transform: "translateZ(40px)" }}
        >
          <FileCode2 className="w-6 h-6 text-teal-500" />
        </motion.div>
        
        {/* Floating Layers Icon */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 right-0 bg-white dark:bg-slate-800 p-2 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-xl"
          style={{ transform: "translateZ(50px)" }}
        >
          <Layers className="w-4 h-4 text-emerald-500" />
        </motion.div>

      </motion.div>
    </div>
  );
}
