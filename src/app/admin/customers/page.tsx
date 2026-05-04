'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Mail, Phone, MoreVertical } from 'lucide-react';

const CUSTOMERS = [
  { id: 1, name: 'Sahil Hode', email: 'sahil@example.com', phone: '+91 98765 43210', orders: 12, totalSpent: '₹12,450', status: 'Active', joined: '12 Jan 2026' },
  { id: 2, name: 'John Doe', email: 'john@example.com', phone: '+91 91234 56789', orders: 5, totalSpent: '₹4,200', status: 'Active', joined: '05 Feb 2026' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 99887 76655', orders: 28, totalSpent: '₹35,600', status: 'Premium', joined: '20 Dec 2025' },
  { id: 4, name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91 90000 11111', orders: 0, totalSpent: '₹0', status: 'Inactive', joined: '15 Apr 2026' },
  { id: 5, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 88776 55443', orders: 18, totalSpent: '₹22,100', status: 'Active', joined: '03 Mar 2026' },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = CUSTOMERS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const statusStyle = (status: string) => ({
    padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' as const,
    textTransform: 'uppercase' as const, letterSpacing: '1px',
    background: status === 'Premium' ? 'var(--primary)' : status === 'Active' ? '#ECFDF5' : '#F1F5F9',
    color: status === 'Premium' ? 'white' : status === 'Active' ? '#059669' : '#94A3B8',
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Customer Management</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>View and manage your registered user base.</p>
        </div>
        <button style={{ 
          height: '48px', padding: '0 24px', background: 'rgba(27,67,50,0.05)', color: 'var(--primary)',
          borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'
        }}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid #F1F5F9' }}>
        {/* Search */}
        <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input 
              type="text" placeholder="Search customers..." 
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 44px', background: '#F8FAFC', border: 'none', borderRadius: '14px', outline: 'none', fontSize: '14px', fontWeight: '500' }}
            />
          </div>
          <button style={{ height: '44px', padding: '0 20px', background: '#F8FAFC', borderRadius: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontWeight: '600', fontSize: '13px' }}>
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#FAFBFC', fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                <th style={{ padding: '18px 24px' }}>Customer</th>
                <th style={{ padding: '18px 24px' }}>Contact</th>
                <th style={{ padding: '18px 24px' }}>Activity</th>
                <th style={{ padding: '18px 24px' }}>Status</th>
                <th style={{ padding: '18px 24px' }}>Joined</th>
                <th style={{ padding: '18px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="table-row" style={{ borderTop: '1px solid #F8FAFC', transition: 'var(--transition)' }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(27,67,50,0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px' }}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '14px' }}>{customer.name}</p>
                        <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>ID: #{customer.id}293</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={12} /> {customer.email}</span>
                      <span style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12} /> {customer.phone}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <p style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '14px' }}>{customer.orders} Orders</p>
                    <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>Spent: {customer.totalSpent}</p>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={statusStyle(customer.status)}>{customer.status}</span>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '13px', color: '#94A3B8', fontWeight: '600' }}>
                    {customer.joined}
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <button style={{ padding: '8px', borderRadius: '10px', border: 'none', background: '#F8FAFC', cursor: 'pointer', color: '#94A3B8' }}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .table-row:hover { background: #FAFBFC; }
      `}</style>
    </div>
  );
}
