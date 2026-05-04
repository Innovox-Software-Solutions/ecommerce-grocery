'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const sections = [
    { title: 'General', items: [
      { name: 'Store Profile', icon: <User size={20} />, desc: 'Configure your store name, logo and contact info.' },
      { name: 'Regional Settings', icon: <Globe size={20} />, desc: 'Manage currency, timezone and language.' },
    ]},
    { title: 'Security', items: [
      { name: 'Password & Auth', icon: <Lock size={20} />, desc: 'Update your admin credentials and 2FA.' },
      { name: 'Permissions', icon: <ShieldCheck size={20} />, desc: 'Manage sub-admin roles and access levels.' },
    ]},
    { title: 'Notifications', items: [
      { name: 'Order Alerts', icon: <Bell size={20} />, desc: 'Configure email and push alerts for new orders.' },
      { name: 'Billing', icon: <CreditCard size={20} />, desc: 'Manage subscription and payout methods.' },
    ]},
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand tracking-tight font-heading">Settings</h1>
          <p className="text-slate-500 font-medium">Configure your admin environment and store preferences.</p>
        </div>
        <button className="h-12 px-8 bg-brand text-white rounded-xl font-bold flex items-center gap-2 hover:bg-brand-light transition-all shadow-lg shadow-brand/20">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">{section.title}</h3>
            <div className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-sm border border-slate-100 dark:border-white/5 divide-y divide-slate-50 dark:divide-white/5">
              {section.items.map((item, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/[0.02] cursor-pointer group transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand flex items-center justify-center transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-brand dark:text-white group-hover:text-brand transition-colors">{item.name}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-rose-50 dark:bg-rose-500/5 p-8 rounded-[32px] border border-rose-100 dark:border-rose-500/20">
           <h4 className="text-rose-600 font-black mb-2">Danger Zone</h4>
           <p className="text-rose-500/70 text-sm mb-6 font-medium">Permanently delete your store and all associated data. This action cannot be undone.</p>
           <button className="px-6 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 transition-all">
             Delete Store Account
           </button>
        </div>
      </div>
    </div>
  );
}
