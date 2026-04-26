'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBasket, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@egrocery.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      alert('Invalid email or password! Tip: admin@egrocery.com / admin123');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#F3F4F6',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        backgroundColor: 'white', 
        borderRadius: '24px', 
        padding: '50px 40px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'var(--primary)', padding: '12px', borderRadius: '16px', marginBottom: '20px' }}>
            <ShoppingBasket size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Admin Login</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input 
                type="email" 
                required 
                placeholder="admin@egrocery.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '14px 16px 14px 48px', 
                  borderRadius: '12px', 
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                  fontSize: '16px'
                }} 
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600' }}>Password</label>
              <a href="#" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '600' }}>Forgot?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '14px 48px', 
                  borderRadius: '12px', 
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                  fontSize: '16px'
                }} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="remember" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            <label htmlFor="remember" style={{ fontSize: '14px', color: '#4B5563', cursor: 'pointer' }}>Remember me for 30 days</label>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '16px', borderRadius: '12px', justifyContent: 'center', fontSize: '16px' }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
