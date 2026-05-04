'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Download, Filter, TrendingUp, DollarSign, Wallet, CreditCard, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 4500, orders: 120 },
  { month: 'Feb', revenue: 5200, orders: 150 },
  { month: 'Mar', revenue: 4800, orders: 140 },
  { month: 'Apr', revenue: 6100, orders: 180 },
  { month: 'May', revenue: 5900, orders: 175 },
  { month: 'Jun', revenue: 7500, orders: 220 },
];

export default function RevenuePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand tracking-tight font-heading">Financial Overview</h1>
          <p className="text-slate-500 font-medium">Track your revenue, order volume, and payment distributions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 bg-brand/5 text-brand rounded-xl font-bold flex items-center gap-2 hover:bg-brand/10 transition-all">
            <Filter size={18} />
            May 2026
          </button>
          <button className="h-12 px-6 bg-brand text-white rounded-xl font-bold flex items-center gap-2 hover:bg-brand-light transition-all">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', value: '₹4,52,280', trend: '+12.5%', icon: <DollarSign size={24} />, color: 'bg-emerald-500/10 text-emerald-600' },
          { label: 'Avg. Order Value', value: '₹840', trend: '+2.4%', icon: <Wallet size={24} />, color: 'bg-brand/10 text-brand' },
          { label: 'Online Payments', value: '85%', trend: '+5.0%', icon: <CreditCard size={24} />, color: 'bg-sky-500/10 text-sky-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={10} />
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-brand dark:text-white tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-brand dark:text-white tracking-tight">Monthly Revenue</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Growth over last 6 months</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B4332', borderRadius: '12px', border: 'none', padding: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#A3936A', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1B4332" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-brand dark:text-white tracking-tight">Order Volume</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Successful deliveries per month</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B4332', borderRadius: '12px', border: 'none', padding: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#A3936A', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Bar dataKey="orders" fill="#A3936A" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
