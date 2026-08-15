"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Network } from "lucide-react";

export default function ToolsIllustration() {
  return (
    <div className="relative w-full h-[180px] hidden md:flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Main Floating Container */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotateX: [10, 0, 10],
          rotateY: [-15, 0, -15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-32 h-32 bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/20"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[2rem] pointer-events-none" />
        
        {/* Core Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="bg-blue-500/20 p-3 rounded-2xl border border-blue-500/30 shadow-inner"
          style={{ transform: "translateZ(30px)" }}
        >
          <Cpu className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </motion.div>

        {/* Orbiting Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-[1.5px] border-dashed border-blue-500/30 rounded-full"
          style={{ width: "160%", height: "160%", left: "-30%", top: "-30%", transform: "translateZ(-20px)" }}
        >
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-full border border-blue-200 dark:border-blue-800 shadow-xl"
          >
            <Zap className="w-4 h-4 text-amber-500" />
          </motion.div>
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-full border border-purple-200 dark:border-purple-800 shadow-xl"
          >
            <Network className="w-4 h-4 text-purple-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
