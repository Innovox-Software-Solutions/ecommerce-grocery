'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
  bgClassName?: string;
  iconColor?: string;
}

export function StatCard({ 
  label, 
  value, 
  icon, 
  trend, 
  className,
  bgClassName,
  iconColor
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border hover:-translate-y-1 hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
          bgClassName || "bg-brand/10"
        )} style={{ color: iconColor }}>
          {icon}
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
          <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1.5 pt-2 border-t border-border mt-2">
          <span className={cn(
            "flex items-center text-xs font-bold px-2 py-0.5 rounded-full",
            trend.isUp ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" : "text-rose-600 bg-rose-50 dark:bg-rose-500/10"
          )}>
            {trend.isUp ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />}
            {trend.value}%
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">vs last month</span>
        </div>
      )}
    </div>
  );
}
