'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@egrocery.com' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        router.push('/admin');
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '16px 16px 16px 50px', borderRadius: '16px',
    border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none',
    fontSize: '15px', fontWeight: '600', transition: 'var(--transition)'
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#F8FAFC', padding: '24px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background Blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(120px)', background: 'rgba(27,67,50,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(100px)', background: 'rgba(163,147,106,0.08)', pointerEvents: 'none' }} />

      <div style={{ 
        width: '100%', maxWidth: '460px', background: 'white', borderRadius: '32px',
        padding: '56px 48px', boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 1,
        border: '1px solid #F1F5F9'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            color: 'white', boxShadow: '0 8px 24px rgba(27,67,50,0.3)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Admin Portal</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Secure access for eGrocery management.</p>
        </div>

        {error && (
          <div style={{ 
            padding: '14px 20px', background: '#FEF2F2', border: '1px solid #FECACA',
            borderRadius: '16px', color: '#DC2626', fontWeight: '700', fontSize: '13px',
            textAlign: 'center', marginBottom: '24px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', paddingLeft: '4px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1' }} />
              <input 
                type="email" required placeholder="admin@egrocery.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingLeft: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Password</label>
              <button type="button" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Forgot?</button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1' }} />
              <input 
                type={showPassword ? 'text' : 'password'} required placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '50px' }}
              />
              <button 
                type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px' }}>
            <input type="checkbox" id="remember" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            <label htmlFor="remember" style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', cursor: 'pointer' }}>Stay logged in for 30 days</label>
          </div>

          <button 
            type="submit" disabled={isLoading}
            style={{ 
              width: '100%', padding: '18px', background: 'var(--primary)', color: 'white',
              borderRadius: '18px', border: 'none', fontWeight: '800', fontSize: '15px',
              cursor: isLoading ? 'wait' : 'pointer', 
              boxShadow: '0 6px 20px rgba(27,67,50,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              opacity: isLoading ? 0.7 : 1, transition: 'var(--transition)'
            }}
          >
            {isLoading ? 'Signing in...' : <>Enter Dashboard <ArrowRight size={18} /></>}
          </button>
        </form>

        <p style={{ marginTop: '36px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', letterSpacing: '0.5px' }}>
          Hint: admin@egrocery.com / admin123
        </p>
      </div>
    </div>
  );
}
