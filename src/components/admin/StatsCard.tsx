'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'error' | 'info' | 'purple';
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-green-50 text-green-600',
  error: 'bg-red-50 text-red-600',
  info: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
};

export default function StatsCard({ title, value, icon: Icon, trend, color = 'primary' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-black mb-2">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1">
              <span className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-neutral-400">vs mois dernier</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
