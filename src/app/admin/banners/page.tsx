'use client';

import React from 'react';
import { Plus, Image as ImageIcon, Edit2, Trash2, Tag, Calendar, Eye, Power } from 'lucide-react';

const BANNERS = [
  { id: 1, title: 'Summer Fresh Sale', type: 'Main Hero', discount: '50% OFF', status: 'Active', clicks: 1240 },
  { id: 2, title: 'Organic Veggie Bundle', type: 'Side Banner', discount: '₹100 Cashback', status: 'Active', clicks: 850 },
  { id: 3, title: 'Early Bird Breakfast', type: 'Popup', discount: 'Free Delivery', status: 'Inactive', clicks: 0 },
];

export default function BannersPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Banners & Offers</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Create and manage marketing campaigns.</p>
        </div>
        <button style={{ 
          height: '48px', padding: '0 24px', background: 'var(--primary)', color: 'white',
          borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px',
          boxShadow: '0 4px 14px rgba(27,67,50,0.3)'
        }}>
          <Plus size={18} /> Create Campaign
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '28px' }}>
        {BANNERS.map((banner) => (
          <div key={banner.id} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid #F1F5F9' }} className="banner-card">
            {/* Image Placeholder */}
            <div style={{ 
              height: '180px', background: '#F8FAFC', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
              gap: '8px', position: 'relative', overflow: 'hidden'
            }}>
              <ImageIcon size={48} color="#CBD5E1" />
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Preview Image</span>
              
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                <button style={{ width: '38px', height: '38px', background: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: 'var(--shadow-sm)' }}><Edit2 size={16} /></button>
                <button style={{ width: '38px', height: '38px', background: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', boxShadow: 'var(--shadow-sm)' }}><Trash2 size={16} /></button>
              </div>
              
              <span style={{ 
                position: 'absolute', bottom: '16px', left: '16px',
                padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '800',
                textTransform: 'uppercase', letterSpacing: '1px',
                background: banner.status === 'Active' ? 'var(--primary)' : '#94A3B8', color: 'white',
                boxShadow: 'var(--shadow-md)'
              }}>{banner.status}</span>
            </div>
            
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '6px' }}>{banner.title}</h3>
                  <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={12} /> {banner.type} • {banner.discount}
                  </p>
                </div>
                <button style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                  <Power size={18} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '20px 0', borderTop: '1px solid #F8FAFC', borderBottom: '1px solid #F8FAFC' }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Clicks</p>
                  <p style={{ fontWeight: '900', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Eye size={16} color="#CBD5E1" /> {banner.clicks.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Duration</p>
                  <p style={{ fontWeight: '900', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} color="#CBD5E1" /> Ends in 4d
                  </p>
                </div>
              </div>

              <button style={{ 
                width: '100%', marginTop: '20px', padding: '14px', background: 'rgba(27,67,50,0.04)', 
                borderRadius: '14px', border: 'none', cursor: 'pointer',
                fontWeight: '800', fontSize: '12px', color: 'var(--primary)', 
                textTransform: 'uppercase', letterSpacing: '1.5px'
              }}>Analytics Details</button>
            </div>
          </div>
        ))}

        {/* Add New */}
        <div style={{ 
          minHeight: '400px', border: '2px dashed #E2E8F0', borderRadius: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '16px', cursor: 'pointer', transition: 'var(--transition)'
        }} className="banner-card">
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
            <Plus size={28} />
          </div>
          <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Create New</span>
        </div>
      </div>

      <style jsx>{`
        .banner-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
      `}</style>
    </div>
  );
}
