'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify-otp');
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
        <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', marginBottom: '30px' }}>
          <ChevronLeft size={18} /> Back to Sign In
        </Link>

        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' }}>Forgot Password?</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>No worries! Enter your email to reset it.</p>
        </div>

        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            Send Reset Code <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    </main>
  );
}
