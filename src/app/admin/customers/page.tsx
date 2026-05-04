'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Mail, Phone, MoreVertical, UserCheck, UserMinus, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const CUSTOMERS = [
  { id: 1, name: 'Sahil Hode', email: 'sahil@example.com', phone: '+91 98765 43210', orders: 12, totalSpent: '₹12,450', status: 'Active', joined: '12 Jan 2026' },
  { id: 2, name: 'John Doe', email: 'john@example.com', phone: '+91 91234 56789', orders: 5, totalSpent: '₹4,200', status: 'Active', joined: '05 Feb 2026' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 99887 76655', orders: 28, totalSpent: '₹35,600', status: 'Premium', joined: '20 Dec 2025' },
  { id: 4, name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91 90000 11111', orders: 0, totalSpent: '₹0', status: 'Inactive', joined: '15 Apr 2026' },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand tracking-tight font-heading">Customer Management</h1>
          <p className="text-slate-500 font-medium">View and manage your registered user base.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 bg-brand/5 text-brand rounded-xl font-bold flex items-center gap-2 hover:bg-brand/10 transition-all">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>
          <button className="h-12 px-6 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-brand transition-all flex items-center gap-2 font-bold text-sm">
            <Filter size={18} />
            Advanced Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Contact</th>
                <th className="px-8 py-6">Activity</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Joined</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="group hover:bg-slate-50/30 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-black">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-brand dark:text-white text-sm">{customer.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: #{customer.id}293</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Mail size={12} /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Phone size={12} /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-black text-brand dark:text-white text-sm">{customer.orders} Orders</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Spent: {customer.totalSpent}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      customer.status === 'Premium' ? "bg-brand text-white" :
                      customer.status === 'Active' ? "bg-emerald-500/10 text-emerald-600" :
                      "bg-slate-100 text-slate-400"
                    )}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {customer.joined}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
