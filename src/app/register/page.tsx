'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_logged_in', JSON.stringify({ ...formData }));
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
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' }}>Join the Organic Family</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Get the freshest produce delivered to your door</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <User size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              style={inputStyle}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Mail size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              style={inputStyle}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Phone size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              required 
              style={inputStyle}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              style={inputStyle}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'left', lineHeight: '1.5', padding: '0 10px' }}>
            By creating an account, you agree to eGrocery's <b>Terms of Service</b> and <b>Privacy Policy</b>.
          </p>

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
            Create Account <ArrowRight size={20} />
          </button>
        </form>

        <p style={{ marginTop: '40px', color: 'var(--text-muted)', fontWeight: '600' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--secondary)', fontWeight: '800', textDecoration: 'none' }}>Sign In</Link>
        </p>
      </motion.div>
    </main>
  );
}
