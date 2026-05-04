'use client';

import React from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Users, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const stats = [
  { label: 'Total Orders', value: '1,280', icon: <ShoppingBag />, color: '#4F46E5', bg: '#EEF2FF' },
  { label: 'Total Revenue', value: '$45,280', icon: <DollarSign />, color: '#10B981', bg: '#ECFDF5' },
  { label: 'Total Products', value: '450', icon: <Package />, color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Total Customers', value: '2,900', icon: <Users />, color: '#8B5CF6', bg: '#F5F3FF' },
  { label: 'Pending Orders', value: '45', icon: <Clock />, color: '#F43F5E', bg: '#FFF1F2' },
  { label: 'Delivered Orders', value: '1,235', icon: <CheckCircle2 />, color: '#059669', bg: '#ECFDF5' },
];

const salesData = [
  { day: 'Mon', sales: 4000 },
  { day: 'Tue', sales: 3000 },
  { day: 'Wed', sales: 2000 },
  { day: 'Thu', sales: 2780 },
  { day: 'Fri', sales: 1890 },
  { day: 'Sat', sales: 2390 },
  { day: 'Sun', sales: 3490 },
];

const categoryData = [
  { name: 'Vegetables', value: 400 },
  { name: 'Fruits', value: 300 },
  { name: 'Meat', value: 200 },
  { name: 'Dairy', value: 100 },
];

const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'];

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>Dashboard Overview</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px' }}>Export PDF</button>
          <button style={{ padding: '8px 16px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '8px', fontSize: '14px' }}>Last 30 Days</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="stat-card" style={{ 
            backgroundColor: 'white', 
            padding: 'clamp(16px, 3vw, 24px)', 
            borderRadius: '16px', 
            border: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: stat.bg, 
              color: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '24px' }}>
        <div className="chart-container" style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Weekly Sales Revenue</h3>
          <div style={{ height: 'clamp(220px, 40vw, 300px)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#F9FAFB'}} />
                <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container" style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Sales by Category</h3>
          <div style={{ height: 'clamp(220px, 40vw, 300px)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1, minWidth: '150px', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categoryData.map((cat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[i] }}></div>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
