'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type OrderStatus = 'Delivered' | 'Pending' | 'Cancelled' | 'Active' | 'Inactive';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    Delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
    Inactive: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap",
      variants[status] || "bg-slate-100 text-slate-700",
      className
    )}>
      {status}
    </span>
  );
}
