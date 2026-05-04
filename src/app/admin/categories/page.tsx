'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronRight, Filter, Download, Layers } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Vegetables', count: 45, status: 'Active', color: '#10B981' },
  { id: 2, name: 'Fruits', count: 32, status: 'Active', color: '#F43F5E' },
  { id: 3, name: 'Dairy', count: 28, status: 'Active', color: '#0EA5E9' },
  { id: 4, name: 'Meat', count: 15, status: 'Active', color: '#F59E0B' },
  { id: 5, name: 'Bakery', count: 22, status: 'Active', color: '#6366F1' },
  { id: 6, name: 'Beauty', count: 56, status: 'Active', color: '#EC4899' },
  { id: 7, name: 'Wellness', count: 18, status: 'Inactive', color: '#94A3B8' },
  { id: 8, name: 'Baby Care', count: 12, status: 'Active', color: '#F97316' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Product Categories</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Manage and organize your product catalog collections.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            height: '48px', padding: '0 24px', background: 'rgba(27,67,50,0.05)', color: 'var(--primary)',
            borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'
          }}>
            <Download size={18} /> Export
          </button>
          <button style={{ 
            height: '48px', padding: '0 24px', background: 'var(--primary)', color: 'white',
            borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px',
            boxShadow: '0 4px 14px rgba(27,67,50,0.3)'
          }}>
            <Plus size={18} /> New Category
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ 
        background: 'white', borderRadius: '20px', padding: '16px', marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)', border: '1px solid #F1F5F9',
        display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input 
            type="text" placeholder="Search categories..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', padding: '12px 16px 12px 44px', background: '#F8FAFC', 
              border: 'none', borderRadius: '14px', outline: 'none', fontSize: '14px', fontWeight: '500' 
            }}
          />
        </div>
        <button style={{ 
          height: '44px', padding: '0 20px', background: '#F8FAFC', borderRadius: '14px',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          color: '#64748B', fontWeight: '600', fontSize: '13px'
        }}>
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredCategories.map((cat) => (
          <div key={cat.id} style={{ 
            background: 'white', borderRadius: '24px', padding: '28px',
            boxShadow: 'var(--shadow-sm)', border: '1px solid #F1F5F9',
            transition: 'var(--transition)', cursor: 'pointer'
          }} className="cat-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '18px', 
                background: `${cat.color}15`, color: cat.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Layers size={28} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ 
                  padding: '8px', borderRadius: '10px', border: 'none', background: '#F8FAFC',
                  cursor: 'pointer', color: '#94A3B8', transition: 'var(--transition)'
                }}>
                  <Edit2 size={16} />
                </button>
                <button style={{ 
                  padding: '8px', borderRadius: '10px', border: 'none', background: '#FEF2F2',
                  cursor: 'pointer', color: '#F87171', transition: 'var(--transition)'
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '4px' }}>{cat.name}</h3>
            <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{cat.count} Products</p>

            <div style={{ 
              marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #F8FAFC',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <span style={{ 
                padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '800',
                textTransform: 'uppercase', letterSpacing: '1px',
                background: cat.status === 'Active' ? '#ECFDF5' : '#F1F5F9',
                color: cat.status === 'Active' ? '#059669' : '#94A3B8'
              }}>
                {cat.status}
              </span>
              <button style={{ 
                border: 'none', background: 'none', cursor: 'pointer',
                color: 'var(--primary)', fontWeight: '800', fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                View <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div style={{ 
          minHeight: '220px', borderRadius: '24px', 
          border: '2px dashed #E2E8F0', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          gap: '16px', cursor: 'pointer', transition: 'var(--transition)'
        }} className="cat-card">
          <div style={{ 
            width: '56px', height: '56px', borderRadius: '50%', background: '#F8FAFC',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8'
          }}>
            <Plus size={28} />
          </div>
          <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Create New</span>
        </div>
      </div>

      <style jsx>{`
        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
}
