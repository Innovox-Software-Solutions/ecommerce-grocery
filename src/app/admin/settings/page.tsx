'use client';

import React from 'react';
import { User, Lock, Bell, Globe, CreditCard, ShieldCheck, ChevronRight, Save } from 'lucide-react';

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
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Configure your admin environment and store preferences.</p>
        </div>
        <button style={{ 
          height: '48px', padding: '0 28px', background: 'var(--primary)', color: 'white',
          borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px',
          boxShadow: '0 4px 14px rgba(27,67,50,0.3)'
        }}>
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', paddingLeft: '8px' }}>{section.title}</h3>
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid #F1F5F9' }}>
              {section.items.map((item, i) => (
                <div key={i} className="setting-row" style={{ 
                  padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', transition: 'var(--transition)',
                  borderTop: i > 0 ? '1px solid #F8FAFC' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '16px', background: '#F8FAFC',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8',
                      transition: 'var(--transition)'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '15px', marginBottom: '2px' }}>{item.name}</h4>
                      <p style={{ fontSize: '13px', color: '#94A3B8' }}>{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#CBD5E1" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div style={{ background: '#FEF2F2', padding: '28px', borderRadius: '24px', border: '1px solid #FECACA' }}>
          <h4 style={{ fontWeight: '900', color: '#DC2626', marginBottom: '8px' }}>Danger Zone</h4>
          <p style={{ color: '#EF4444', fontSize: '14px', marginBottom: '20px', opacity: 0.8 }}>Permanently delete your store and all associated data. This cannot be undone.</p>
          <button style={{ 
            padding: '12px 24px', background: '#EF4444', color: 'white', 
            borderRadius: '12px', border: 'none', fontWeight: '700', 
            fontSize: '14px', cursor: 'pointer'
          }}>
            Delete Store Account
          </button>
        </div>
      </div>

      <style jsx>{`
        .setting-row:hover { background: #FAFBFC; }
      `}</style>
    </div>
  );
}
