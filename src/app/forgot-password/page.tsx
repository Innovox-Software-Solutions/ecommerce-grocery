'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px',
          borderRadius: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}
      >
        <div style={{ 
          width: '64px', 
          height: '64px', 
          background: '#F0FDF4', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: '#16A34A'
        }}>
          <Mail size={32} />
        </div>

        <h1 style={{ fontSize: '24px', color: '#1A1A1A', marginBottom: '12px' }}>Forgot Password? 🔑</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '30px', lineHeight: '1.6' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="email" 
              placeholder="Email address" 
              required
              className="input-field"
            />
          </div>

          <button 
            type="button"
            style={{
              padding: '16px',
              borderRadius: '50px',
              border: 'none',
              background: '#16A34A',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(22, 163, 74, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
          >
            Send Reset Link
          </button>
        </form>

        <div style={{ marginTop: '30px' }}>
          <Link href="/login" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#6B7280', 
            fontSize: '14px',
            fontWeight: '500',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#1A1A1A'}
          onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
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
      `}</style>
    </div>
  );
}
