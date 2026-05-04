'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, Edit2, Trash2, Tag, Calendar, Eye, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

const BANNERS = [
  { id: 1, title: 'Summer Fresh Sale', type: 'Main Hero', discount: '50% OFF', status: 'Active', clicks: 1240 },
  { id: 2, title: 'Organic Veggie Bundle', type: 'Side Banner', discount: '₹100 Cashback', status: 'Active', clicks: 850 },
  { id: 3, title: 'Early Bird Breakfast', type: 'Popup', discount: 'Free Delivery', status: 'Inactive', clicks: 0 },
];

export default function BannersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand tracking-tight font-heading">Banners & Offers</h1>
          <p className="text-slate-500 font-medium">Create and manage marketing campaigns and visual assets.</p>
        </div>
        <button className="h-12 px-6 bg-brand text-white rounded-xl font-bold flex items-center gap-2 hover:bg-brand-light transition-all shadow-lg shadow-brand/20">
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {BANNERS.map((banner) => (
          <motion.div 
            key={banner.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-sm border border-slate-100 dark:border-white/5 group"
          >
            <div className="aspect-[21/9] bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden">
               <div className="flex flex-col items-center gap-2 text-slate-300 group-hover:scale-110 transition-transform duration-500">
                 <ImageIcon size={48} />
                 <span className="text-xs font-black uppercase tracking-widest">Preview Image</span>
               </div>
               <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 rounded-xl flex items-center justify-center text-brand shadow-xl"><Edit2 size={16} /></button>
                 <button className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 rounded-xl flex items-center justify-center text-rose-500 shadow-xl"><Trash2 size={16} /></button>
               </div>
               <div className="absolute bottom-4 left-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand text-white shadow-lg",
                    banner.status === 'Inactive' && "bg-slate-500"
                  )}>
                    {banner.status}
                  </span>
               </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-brand dark:text-white tracking-tight mb-1">{banner.title}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Tag size={10} /> {banner.type} • {banner.discount}
                  </p>
                </div>
                <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-brand transition-colors">
                  <Power size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50 dark:border-white/5">
                 <div className="space-y-1">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Performance</p>
                   <p className="font-black text-brand dark:text-white flex items-center gap-2">
                     <Eye size={16} className="text-slate-300" />
                     {banner.clicks.toLocaleString()} Clicks
                   </p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Duration</p>
                   <p className="font-black text-brand dark:text-white flex items-center gap-2">
                     <Calendar size={16} className="text-slate-300" />
                     Ends in 4d
                   </p>
                 </div>
              </div>

              <button className="w-full py-4 bg-brand/5 text-brand rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand/10 transition-all">
                Analytics Details
              </button>
            </div>
          </motion.div>
        ))}

        <button className="min-h-[400px] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] flex flex-col items-center justify-center gap-4 hover:border-brand hover:bg-brand/5 transition-all group">
          <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-brand group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <span className="font-black text-brand dark:text-white uppercase tracking-widest text-sm">Create New Campaign</span>
        </button>
      </div>
    </div>
  );
}
