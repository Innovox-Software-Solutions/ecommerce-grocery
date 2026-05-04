'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Download, Filter, DollarSign, Wallet, CreditCard, ArrowUpRight } from 'lucide-react';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 4500, orders: 120 },
  { month: 'Feb', revenue: 5200, orders: 150 },
  { month: 'Mar', revenue: 4800, orders: 140 },
  { month: 'Apr', revenue: 6100, orders: 180 },
  { month: 'May', revenue: 5900, orders: 175 },
  { month: 'Jun', revenue: 7500, orders: 220 },
];

export default function RevenuePage() {
  const stats = [
    { label: 'Total Revenue', value: '₹4,52,280', trend: '+12.5%', icon: <DollarSign size={24} />, bg: '#ECFDF5', color: '#059669' },
    { label: 'Avg. Order Value', value: '₹840', trend: '+2.4%', icon: <Wallet size={24} />, bg: 'rgba(27,67,50,0.06)', color: 'var(--primary)' },
    { label: 'Online Payments', value: '85%', trend: '+5.0%', icon: <CreditCard size={24} />, bg: '#EFF6FF', color: '#2563EB' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Financial Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Track revenue, order volume, and payment distributions.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ height: '48px', padding: '0 24px', background: 'rgba(27,67,50,0.05)', color: 'var(--primary)', borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Filter size={18} /> May 2026
          </button>
          <button style={{ height: '48px', padding: '0 24px', background: 'var(--primary)', color: 'white', borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: 'white', padding: '28px', borderRadius: '24px', border: '1px solid #F1F5F9', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUpRight size={12} /> {stat.trend}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{stat.label}</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-1px' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '28px' }}>
        <div style={{ background: 'white', padding: '28px', borderRadius: '24px', border: '1px solid #F1F5F9', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '4px' }}>Monthly Revenue</h3>
          <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600', marginBottom: '28px' }}>Growth over last 6 months</p>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1B4332', borderRadius: '12px', border: 'none', padding: '12px' }} itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }} labelStyle={{ color: '#A3936A', fontSize: '10px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#1B4332" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: 'white', padding: '28px', borderRadius: '24px', border: '1px solid #F1F5F9', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '4px' }}>Order Volume</h3>
          <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600', marginBottom: '28px' }}>Deliveries per month</p>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1B4332', borderRadius: '12px', border: 'none', padding: '12px' }} itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }} labelStyle={{ color: '#A3936A', fontSize: '10px' }} />
                <Bar dataKey="orders" fill="#A3936A" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
