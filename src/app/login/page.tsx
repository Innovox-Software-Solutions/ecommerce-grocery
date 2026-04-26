'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { PrimaryButton } from '@/components/ui/Buttons';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/');
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FDF5EC',
      padding: '24px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px',
          borderRadius: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', background: 'var(--primary-gradient)', padding: '12px', borderRadius: '50%', marginBottom: '16px', color: 'white' }}>
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>eG</span>
          </div>
          <h1 style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '8px' }}>Welcome Back 👋</h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="email" 
              placeholder="Email address" 
              required
              className="input-field"
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required
              className="input-field"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/forgot-password" style={{ color: '#16A34A', fontSize: '14px', fontWeight: '600' }}>
              Forgot Password?
            </Link>
          </div>

          <PrimaryButton 
            className="w-full justify-center" 
            icon={<ArrowRight size={18} />}
          >
            Login
          </PrimaryButton>
        </form>



        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '14px', color: '#6B7280' }}>
          Don't have an account? <Link href="/register" style={{ color: '#16A34A', fontWeight: 'bold' }}>Sign Up</Link>
        </p>
      </motion.div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 16px 16px 16px 48px;
          border-radius: 50px;
          border: 1px solid rgba(0,0,0,0.1);
          background: white;
          outline: none;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .input-field:focus {
          border-color: #16A34A;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1);
        }
        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: 50px;
          border: 1px solid #E5E7EB;
          background: white;
          font-weight: 600;
          color: #374151;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .social-btn:hover {
          background: #F9FAFB;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
