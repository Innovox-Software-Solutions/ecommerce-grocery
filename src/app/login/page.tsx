'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_logged_in', JSON.stringify({ email, name: email.split('@')[0] }));
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '18px 20px 18px 55px',
    borderRadius: '18px',
    border: '1px solid rgba(31, 61, 43, 0.1)',
    background: 'var(--bg-main)',
    fontSize: '16px',
    fontWeight: '600',
    outline: 'none',
    transition: '0.3s'
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'white',
          padding: '50px',
          borderRadius: '40px',
          boxShadow: 'var(--shadow-glow)',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Fresh organic produce is just a login away</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <Link href="/forgot-password" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>

          <button type="submit" style={{ 
            padding: '20px',
            background: 'var(--primary-gradient)',
            color: 'white',
            borderRadius: '18px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px'
          }}>
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ margin: '30px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.05)' }} />
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.05)' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ flex: 1, padding: '15px', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.05)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '700' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#4285F4' }} />
            Google
          </button>
          <button style={{ flex: 1, padding: '15px', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.05)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '700' }}>
            <User size={20} />
            Guest Account
          </button>
        </div>

        <p style={{ marginTop: '40px', color: 'var(--text-muted)', fontWeight: '600' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--secondary)', fontWeight: '800', textDecoration: 'none' }}>Create Account</Link>
        </p>
      </motion.div>
    </main>
  );
}
