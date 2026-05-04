'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  ChevronRight,
  Filter,
  Download,
  Eye,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Vegetables', count: 45, status: 'Active', color: 'bg-emerald-500/10 text-emerald-600', icon: 'Leaf' },
  { id: 2, name: 'Fruits', count: 32, status: 'Active', color: 'bg-rose-500/10 text-rose-600', icon: 'Apple' },
  { id: 3, name: 'Dairy', count: 28, status: 'Active', color: 'bg-sky-500/10 text-sky-600', icon: 'Milk' },
  { id: 4, name: 'Meat', count: 15, status: 'Active', color: 'bg-amber-500/10 text-amber-600', icon: 'Beef' },
  { id: 5, name: 'Bakery', count: 22, status: 'Active', color: 'bg-indigo-500/10 text-indigo-600', icon: 'Fish' },
  { id: 6, name: 'Beauty', count: 56, status: 'Active', color: 'bg-pink-500/10 text-pink-600', icon: 'Sparkles' },
  { id: 7, name: 'Wellness', count: 18, status: 'Inactive', color: 'bg-slate-500/10 text-slate-600', icon: 'Pill' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand tracking-tight font-heading">Product Categories</h1>
          <p className="text-slate-500 font-medium">Manage and organize your product catalog collections.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 bg-brand/5 text-brand rounded-xl font-bold flex items-center gap-2 hover:bg-brand/10 transition-all">
            <Download size={18} />
            Export
          </button>
          <button className="h-12 px-6 bg-brand text-white rounded-xl font-bold flex items-center gap-2 hover:bg-brand-light transition-all shadow-lg shadow-brand/20">
            <Plus size={18} />
            New Category
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-brand/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="h-12 px-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-brand transition-all flex items-center gap-2 font-bold text-sm">
            <Filter size={18} />
            Filters
          </button>
          <button className="h-12 px-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-brand transition-all flex items-center gap-2 font-bold text-sm">
            <ArrowUpDown size={18} />
            Sort
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((cat) => (
            <motion.div
              layout
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-white/5 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6", cat.color)}>
                  <Layers size={28} />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-brand dark:text-white tracking-tight">{cat.name}</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{cat.count} Products</p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  cat.status === 'Active' ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-100 text-slate-400"
                )}>
                  {cat.status}
                </span>
                <button className="text-brand dark:text-brand-light text-sm font-black flex items-center gap-1 group/btn">
                  View List
                  <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add New Card */}
        <button className="group h-full min-h-[220px] rounded-[32px] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 hover:border-brand hover:bg-brand/5 transition-all">
          <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <span className="font-black text-brand dark:text-white uppercase tracking-widest text-sm">Create New</span>
        </button>
      </div>
    </div>
  );
}
