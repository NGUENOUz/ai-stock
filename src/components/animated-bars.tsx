"use client";
import { motion } from "framer-motion";

export function AnimatedDashboardBars() {
  const heights = [40, 50, 30, 60, 80, 50, 40, 70, 90, 100, 60, 80, 40, 50];
  
  return (
    <div className="h-24 w-full flex items-end justify-between gap-1 opacity-50 overflow-hidden">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-full bg-blue-200 dark:bg-blue-800 rounded-t-sm"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
