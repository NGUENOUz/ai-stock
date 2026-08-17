import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage, positive or negative
  trendText?: string;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, trend, trendText, icon }: StatCardProps) {
  const isPositive = trend && trend >= 0;

  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">{title}</h3>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-500">
            {icon}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-3xl font-black text-slate-900 dark:text-white mb-2">{value}</p>
        
        {trend !== undefined && (
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className={cn(
              "flex items-center gap-1",
              isPositive ? "text-emerald-500" : "text-red-500"
            )}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? "+" : ""}{trend}%
            </span>
            {trendText && (
              <span className="text-slate-400 font-medium">{trendText}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
